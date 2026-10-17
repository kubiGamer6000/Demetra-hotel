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
}

interface Enquiry {
  name: string;
  email: string;
  phone: string;
  message: string;
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
  `Запитване от сайта: ${enquiry.name}`;

const textBody = (enquiry: Enquiry) =>
  [
    `Име: ${enquiry.name}`,
    `Имейл: ${enquiry.email}`,
    `Телефон: ${enquiry.phone || "-"}`,
    "",
    enquiry.message,
    "",
    "--",
    "Изпратено от формата за контакт на hotel-demetra.com",
  ].join("\n");

const htmlBody = (enquiry: Enquiry) => `
  <div style="font-family:Arial,sans-serif;font-size:15px;color:#4A3F35;line-height:1.5">
    <h2 style="margin:0 0 16px">Ново запитване от сайта</h2>
    <p style="margin:0"><strong>Име:</strong> ${escapeHtml(enquiry.name)}</p>
    <p style="margin:0"><strong>Имейл:</strong> <a href="mailto:${escapeHtml(enquiry.email)}">${escapeHtml(enquiry.email)}</a></p>
    <p style="margin:0 0 16px"><strong>Телефон:</strong> ${escapeHtml(enquiry.phone || "-")}</p>
    <div style="white-space:pre-wrap;padding:16px;background:#F6F3EE;border-radius:8px">${escapeHtml(enquiry.message)}</div>
    <p style="margin-top:24px;font-size:12px;color:#8a7f75">Изпратено от формата за контакт на hotel-demetra.com. Отговорете директно на този имейл, за да пишете на госта.</p>
  </div>`;

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
      from,
      to: [recipient],
      reply_to: enquiry.email,
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
