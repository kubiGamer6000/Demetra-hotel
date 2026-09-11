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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: Record<string, unknown>, status: number) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

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

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (
    !name ||
    name.length > 120 ||
    !EMAIL_PATTERN.test(email) ||
    email.length > 254 ||
    phone.length > 50 ||
    message.length < 10 ||
    message.length > 5_000
  ) {
    return json({ error: "Invalid form fields" }, 400);
  }

  const serviceId = Netlify.env.get("EMAILJS_SERVICE_ID");
  const templateId = Netlify.env.get("EMAILJS_TEMPLATE_ID");
  const publicKey = Netlify.env.get("EMAILJS_PUBLIC_KEY");
  const privateKey = Netlify.env.get("EMAILJS_PRIVATE_KEY");

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    console.error("EmailJS environment variables are not fully configured");
    return json({ error: "Email service unavailable" }, 503);
  }

  try {
    const emailJsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          title: `New website enquiry from ${name}`,
          name,
          email,
          phone: phone || "Not provided",
          message,
        },
      }),
    });

    if (!emailJsResponse.ok) {
      console.error("EmailJS rejected contact submission", emailJsResponse.status);
      return json({ error: "Email delivery failed" }, 502);
    }

    return json({ success: true }, 200);
  } catch (error) {
    console.error("EmailJS contact request failed", error instanceof Error ? error.message : "Unknown error");
    return json({ error: "Email delivery failed" }, 502);
  }
};

export const config = {
  path: "/api/contact",
  method: "POST",
};
