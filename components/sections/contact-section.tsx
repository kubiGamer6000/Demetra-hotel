"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useState, FormEvent } from "react";
import { useI18n } from "@/lib/i18n";

// Replace with your Web3Forms access key
// Sign up at https://web3forms.com to get your free access key
const WEB3FORMS_ACCESS_KEY = "773a93f0-685a-4bd4-96f2-e8a5744033c2";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactSection() {
  const { t } = useI18n();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("contact.errors.nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("contact.errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("contact.errors.emailInvalid");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contact.errors.messageRequired");
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("contact.errors.messageTooShort");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          message: formData.message,
          subject: `New Contact Form Submission from ${formData.name}`,
          from_name: "Hotel Demetra Website",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section
      id="contact-section"
      className="py-16 sm:py-24 bg-gradient-to-b from-[var(--brand-beige)]/10 to-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-cormorant mb-4 text-[var(--brand-brown)]">
            {t("contact.title")}
          </h2>
          <p className="text-[var(--brand-brown)]/70 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-[var(--brand-brown)] text-white p-6 sm:p-8 rounded-2xl h-full">
                <h3 className="text-2xl font-cormorant mb-6">
                  {t("contact.info.title")}
                </h3>

                <div className="space-y-5">
                  <a
                    href="https://maps.app.goo.gl/EkFdwLRJrLgo9PbC8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60 mb-1">
                        {t("contact.info.address")}
                      </p>
                      <p className="text-white group-hover:text-[var(--brand-beige)] transition-colors">
                        {t("footer.contact.address")}
                      </p>
                    </div>
                  </a>

                  <a
                    href="tel:+359895641292"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60 mb-1">
                        {t("contact.info.phone")}
                      </p>
                      <p className="text-white group-hover:text-[var(--brand-beige)] transition-colors">
                        +359 895 641 292
                      </p>
                      <p className="text-white group-hover:text-[var(--brand-beige)] transition-colors">
                        +359 884 430 292
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:comvers@mail.bg"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60 mb-1">
                        {t("contact.info.email")}
                      </p>
                      <p className="text-white group-hover:text-[var(--brand-beige)] transition-colors">
                        comvers@mail.bg
                      </p>
                    </div>
                  </a>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-sm text-white/70 italic">
                    {t("contact.info.responseTime")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-[var(--brand-brown)]/5">
                <AnimatePresence mode="wait">
                  {submitStatus === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-cormorant text-[var(--brand-brown)] mb-3">
                        {t("contact.success.title")}
                      </h3>
                      <p className="text-[var(--brand-brown)]/70 mb-6">
                        {t("contact.success.message")}
                      </p>
                      <button
                        onClick={() => setSubmitStatus("idle")}
                        className="text-[var(--brand-brown)] underline underline-offset-4 hover:text-[var(--brand-brown)]/70 transition-colors"
                      >
                        {t("contact.success.sendAnother")}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {submitStatus === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
                        >
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          <p className="text-sm">
                            {t("contact.error.message")}
                          </p>
                        </motion.div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-[var(--brand-brown)] mb-2"
                          >
                            {t("contact.form.name")}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            className={`w-full px-4 py-3 rounded-xl border ${
                              errors.name
                                ? "border-red-400 focus:ring-red-200"
                                : "border-[var(--brand-brown)]/20 focus:ring-[var(--brand-beige)]"
                            } focus:outline-none focus:ring-2 transition-all bg-[var(--brand-beige)]/5`}
                            placeholder={t("contact.form.namePlaceholder")}
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-[var(--brand-brown)] mb-2"
                          >
                            {t("contact.form.email")}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            className={`w-full px-4 py-3 rounded-xl border ${
                              errors.email
                                ? "border-red-400 focus:ring-red-200"
                                : "border-[var(--brand-brown)]/20 focus:ring-[var(--brand-beige)]"
                            } focus:outline-none focus:ring-2 transition-all bg-[var(--brand-beige)]/5`}
                            placeholder={t("contact.form.emailPlaceholder")}
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-[var(--brand-brown)] mb-2"
                        >
                          {t("contact.form.phone")}{" "}
                          <span className="text-[var(--brand-brown)]/50">
                            ({t("contact.form.optional")})
                          </span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="w-full px-4 py-3 rounded-xl border border-[var(--brand-brown)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--brand-beige)] transition-all bg-[var(--brand-beige)]/5"
                          placeholder={t("contact.form.phonePlaceholder")}
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-[var(--brand-brown)] mb-2"
                        >
                          {t("contact.form.message")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.message
                              ? "border-red-400 focus:ring-red-200"
                              : "border-[var(--brand-brown)]/20 focus:ring-[var(--brand-beige)]"
                          } focus:outline-none focus:ring-2 transition-all bg-[var(--brand-beige)]/5 resize-none`}
                          placeholder={t("contact.form.messagePlaceholder")}
                        />
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 py-3.5 bg-[var(--brand-brown)] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[var(--brand-brown)]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>{t("contact.form.sending")}</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>{t("contact.form.submit")}</span>
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
