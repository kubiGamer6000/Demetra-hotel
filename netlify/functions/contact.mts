declare const Netlify: {
  env: {
    get(name: string): string | undefined;
  };
};

interface ContactRequest {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  website?: unknown;
  language?: unknown;
}

interface Enquiry {
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Site language the guest was using, so staff know how to reply. */
  language: "bg" | "en";
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_RECIPIENT = "comvers@mail.bg";
const PROVIDER_TIMEOUT_MS = 10_000;

const json = (body: Record<string, unknown>, status: number) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const subjectFor = (enquiry: Enquiry) =>
  `Запитване от сайта hotel-demetra.com – ${enquiry.name}`;

const receivedAt = () =>
  new Intl.DateTimeFormat("bg-BG", {
    timeZone: "Europe/Sofia",
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

const languageNote = (enquiry: Enquiry) =>
  enquiry.language === "en" ? "Гостът пише от английската версия на сайта." : "";

// Guest name made safe for use as an email display name.
const displayName = (enquiry: Enquiry) =>
  enquiry.name.replace(/["<>\r\n\\]/g, "").trim().slice(0, 60);

// Display name for Reply-To, so mail.bg shows who the reply goes to.
const replyTo = (enquiry: Enquiry) => {
  const name = displayName(enquiry);
  return name ? `"${name}" <${enquiry.email}>` : enquiry.email;
};

// Show the guest's name in the inbox's From column; the address itself must
// stay on our verified domain (e.g. "Мария Иванова чрез hotel-demetra.com").
const fromHeader = (configured: string, enquiry: Enquiry) => {
  const address = configured.match(/<([^>]+)>/)?.[1] ?? configured.trim();
  const name = displayName(enquiry);
  return name ? `"${name} чрез hotel-demetra.com" <${address}>` : configured;
};

const textBody = (enquiry: Enquiry) =>
  [
    "Ново запитване от сайта hotel-demetra.com",
    "",
    `Име: ${enquiry.name}`,
    `Имейл: ${enquiry.email}`,
    `Телефон: ${enquiry.phone || "не е посочен"}`,
    `Получено: ${receivedAt()}`,
    languageNote(enquiry),
    "",
    "Съобщение:",
    enquiry.message,
    "",
    "—",
    "За да отговорите на госта, просто натиснете „Отговор“.",
  ]
    .filter((line, index, lines) => line !== "" || lines[index - 1] !== "")
    .join("\n");

const row = (label: string, value: string) => `
        <tr>
          <td style="padding:6px 0;width:96px;color:#8a7f75;font-size:14px;vertical-align:top">${label}</td>
          <td style="padding:6px 0;color:#4A3F35;font-size:15px">${value}</td>
        </tr>`;

const htmlBody = (enquiry: Enquiry) => {
  const name = escapeHtml(enquiry.name);
  const email = escapeHtml(enquiry.email);
  const phone = escapeHtml(enquiry.phone);
  const note = languageNote(enquiry);
  return `<!doctype html>
<html lang="bg">
<body style="margin:0;padding:0;background:#F6F3EE">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F3EE;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;font-family:Arial,Helvetica,sans-serif;line-height:1.5">
        <tr><td style="padding:28px 28px 8px">
          <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#8a7f75">Хотел Деметра · hotel-demetra.com</p>
          <h1 style="margin:6px 0 0;font-size:22px;font-weight:normal;color:#4A3F35">Ново запитване от ${name}</h1>
        </td></tr>
        <tr><td style="padding:12px 28px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${row("Име", name)}${row(
            "Имейл",
            `<a href="mailto:${email}" style="color:#4A3F35">${email}</a>`,
          )}${row(
            "Телефон",
            phone
              ? `<a href="tel:${escapeHtml(enquiry.phone.replace(/[^\d+]/g, ""))}" style="color:#4A3F35">${phone}</a>`
              : `<span style="color:#8a7f75">не е посочен</span>`,
          )}${row("Получено", escapeHtml(receivedAt()))}
          </table>
          ${note ? `<p style="margin:8px 0 0;font-size:13px;color:#8a7f75">${note}</p>` : ""}
        </td></tr>
        <tr><td style="padding:8px 28px 4px">
          <p style="margin:0 0 8px;font-size:14px;color:#8a7f75">Съобщение</p>
          <div style="white-space:pre-wrap;padding:16px 18px;background:#F6F3EE;border-radius:8px;color:#4A3F35;font-size:15px">${escapeHtml(enquiry.message)}</div>
        </td></tr>
        <tr><td style="padding:20px 28px 28px">
          <p style="margin:0;font-size:13px;color:#8a7f75">За да отговорите на госта, просто натиснете „Отговор“ – писмото ще отиде директно до ${email}.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
};

// Each sender returns null on success or a short reason for the logs on failure.
type Sender = (enquiry: Enquiry, recipient: string) => Promise<string | null>;

const sendWithResend: Sender = async (enquiry, recipient) => {
  const apiKey = Netlify.env.get("RESEND_API_KEY");
  const from = Netlify.env.get("CONTACT_FROM_EMAIL");
  if (!apiKey || !from) return "not configured";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromHeader(from, enquiry),
      to: [recipient],
      reply_to: replyTo(enquiry),
      subject: subjectFor(enquiry),
      text: textBody(enquiry),
      html: htmlBody(enquiry),
    }),
    signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
  });

  if (response.ok) return null;
  return `HTTP ${response.status}: ${(await response.text()).slice(0, 300)}`;
};

const sendWithEmailJs: Sender = async (enquiry, recipient) => {
  const serviceId = Netlify.env.get("EMAILJS_SERVICE_ID");
  const templateId = Netlify.env.get("EMAILJS_TEMPLATE_ID");
  const publicKey = Netlify.env.get("EMAILJS_PUBLIC_KEY");
  const privateKey = Netlify.env.get("EMAILJS_PRIVATE_KEY");
  if (!serviceId || !templateId || !publicKey || !privateKey) {
    return "not configured";
  }

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        title: subjectFor(enquiry),
        to_email: recipient,
        reply_to: enquiry.email,
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone || "-",
        message: enquiry.message,
      },
    }),
    signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
  });

  if (response.ok) return null;
  // EmailJS explains failures in plain text (e.g. "API calls are disabled for
  // non-browser applications"), which is the only way to diagnose them.
  return `HTTP ${response.status}: ${(await response.text()).slice(0, 300)}`;
};

const providers: [string, Sender][] = [
  ["Resend", sendWithResend],
  ["EmailJS", sendWithEmailJs],
];

export default async (request: Request) => {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return json({ error: "Request too large" }, 413);
  }

  let body: ContactRequest;
  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  // Silently accept bot submissions caught by the honeypot.
  if (typeof body.website === "string" && body.website.trim()) {
    return json({ success: true }, 200);
  }

  const enquiry: Enquiry = {
    name: typeof body.name === "string" ? body.name.trim() : "",
    email: typeof body.email === "string" ? body.email.trim() : "",
    phone: typeof body.phone === "string" ? body.phone.trim() : "",
    message: typeof body.message === "string" ? body.message.trim() : "",
    language: body.language === "en" ? "en" : "bg",
  };

  if (
    !enquiry.name ||
    enquiry.name.length > 120 ||
    !EMAIL_PATTERN.test(enquiry.email) ||
    enquiry.email.length > 254 ||
    enquiry.phone.length > 50 ||
    enquiry.message.length < 10 ||
    enquiry.message.length > 5_000
  ) {
    return json({ error: "Invalid form fields" }, 400);
  }

  const recipient = Netlify.env.get("CONTACT_TO_EMAIL") || DEFAULT_RECIPIENT;
  const failures: string[] = [];

  // Try each configured provider in order so one outage doesn't lose the enquiry.
  for (const [providerName, send] of providers) {
    try {
      const failure = await send(enquiry, recipient);
      if (failure === null) {
        if (failures.length) {
          console.warn(`Contact email sent via ${providerName} after: ${failures.join(" | ")}`);
        }
        return json({ success: true }, 200);
      }
      failures.push(`${providerName}: ${failure}`);
    } catch (error) {
      failures.push(
        `${providerName}: ${error instanceof Error ? error.message : "unknown error"}`,
      );
    }
  }

  console.error(`Contact email delivery failed. ${failures.join(" | ")}`);
  return json({ error: "Email delivery failed" }, 502);
};

export const config = {
  path: "/api/contact",
  method: "POST",
};
