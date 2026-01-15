"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useI18n } from "@/lib/i18n";

export default function CancellationContent() {
  const { t, language } = useI18n();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 bg-[var(--brand-brown)]">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl sm:text-6xl font-cormorant text-white mb-4"
          >
            {t("policies.cancellation.title")}
          </motion.h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="flex-grow py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2,
            }}
            className="max-w-4xl mx-auto prose prose-lg prose-brown"
          >
            {/* Bulgarian Content */}
            {language === "bg" && (
              <div className="policy-content">
                <h1>ПОЛИТИКА ЗА АНУЛАЦИЯ И ВРЪЩАНЕ НА СУМИ</h1>
                <p>
                  <strong>
                    УСЛОВИЯ ЗА ОТКАЗ ОТ РЕЗЕРВАЦИЯ В ХОТЕЛ ДЕМЕТРА
                  </strong>
                </p>

                <h3>1. ОБЩИ УСЛОВИЯ</h3>
                <p>
                  Всяка резервация, направена през нашия сайт или по телефон, се
                  счита за гарантирана след заплащане на депозит или пълната
                  сума. Нашата политика цели да балансира интересите на нашите
                  гости с възможността на хотела да реагира при промяна на
                  плановете.
                </p>

                <h3>2. СРОКОВЕ ЗА АНУЛАЦИЯ</h3>
                <p>
                  Гостът има право да анулира резервацията си при следните
                  условия:
                </p>
                <ul>
                  <li>
                    <strong>Безплатна анулация:</strong> Клиентът може да
                    анулира резервацията без неустойка до{" "}
                    <strong>5 (пет) дни</strong> преди датата на настаняване. В
                    този случай, Хотелът възстановява заплатената сума в пълен
                    размер.
                  </li>
                  <li>
                    <strong>Късна анулация:</strong> При анулация, направена{" "}
                    <strong>по-малко от 5 дни</strong> преди датата на
                    настаняване, Хотелът задържа неустойка в размер на{" "}
                    <strong>стойността на първата нощувка</strong>. Остатъкът от
                    сумата (ако има такъв) се възстановява на клиента.
                  </li>
                  <li>
                    <strong>Неявяване (No-Show):</strong> В случай, че гостът не
                    пристигне в деня на настаняването и не е уведомил хотела, се
                    задържа неустойка в размер на{" "}
                    <strong>100% от стойността на първите две нощувки</strong>{" "}
                    (или пълната стойност, ако резервацията е само за една
                    нощувка).
                  </li>
                </ul>

                <h3>3. СПЕЦИАЛНИ ПЕРИОДИ (ПРАЗНИЦИ)</h3>
                <p>
                  За резервации по време на национални празници (Коледа, Нова
                  Година, Великден) и официални почивни дни, срокът за безплатна
                  анулация е <strong>14 дни</strong> преди датата на
                  настаняване. При анулация след този срок се удържа 100% от
                  преведения депозит.
                </p>

                <h3>4. ПРОЦЕДУРА ЗА ВРЪЩАНЕ НА СУМИ (REFUND POLICY)</h3>
                <p>
                  Този раздел е задължителен съгласно изискванията за картови
                  разплащания:
                </p>
                <ul>
                  <li>
                    <strong>Метод на връщане:</strong> В случай че е необходимо
                    възстановяване на сума, заплатена с банкова карта, сумата ще
                    бъде наредена{" "}
                    <strong>
                      единствено по картата, с която е извършено плащането
                    </strong>
                    . Връщане на средства в брой или по друга банкова сметка не
                    е позволено.
                  </li>
                  <li>
                    <strong>Срок:</strong> Възстановяването на сумата се
                    обработва от Хотела в срок до 7 работни дни от датата на
                    потвърждение на анулацията. Времето, за което сумата ще
                    постъпи по Вашата сметка, зависи от обслужващата Ви банка
                    (обикновено 1 до 5 дни).
                  </li>
                </ul>

                <h3>5. ФОРС МАЖОР</h3>
                <p>
                  В случай на форс мажорни обстоятелства (природни бедствия,
                  затваряне на пътища, държавни забрани), хотелът възстановява
                  пълната сума на клиента без начисляване на неустойки,
                  независимо от срока на анулация.
                </p>
              </div>
            )}

            {/* English Content */}
            {language === "en" && (
              <div className="policy-content">
                <h1>CANCELLATION AND REFUND POLICY</h1>
                <p>
                  <strong>
                    TERMS FOR RESERVATION CANCELLATION AT HOTEL DEMETRA
                  </strong>
                </p>

                <h3>1. GENERAL CONDITIONS</h3>
                <p>
                  Every reservation made through our website or by phone is
                  considered guaranteed upon payment of a deposit or the full
                  amount. Our policy aims to balance the interests of our guests
                  with the Hotel&apos;s ability to react to changes in plans.
                </p>

                <h3>2. CANCELLATION DEADLINES</h3>
                <p>
                  The Guest has the right to cancel their reservation under the
                  following conditions:
                </p>
                <ul>
                  <li>
                    <strong>Free Cancellation:</strong> The Client may cancel
                    the reservation without penalty up to{" "}
                    <strong>5 (five) days</strong> before the check-in date. In
                    this case, the Hotel will refund the paid amount in full.
                  </li>
                  <li>
                    <strong>Late Cancellation:</strong> For cancellations made{" "}
                    <strong>less than 5 days</strong> before the check-in date,
                    the Hotel retains a penalty amounting to the{" "}
                    <strong>value of the first night</strong>. The remainder of
                    the sum (if any) will be refunded to the Client.
                  </li>
                  <li>
                    <strong>No-Show:</strong> In the event that the Guest does
                    not arrive on the check-in date and has not notified the
                    Hotel, a penalty amounting to{" "}
                    <strong>100% of the value of the first two nights</strong>{" "}
                    (or the full value if the reservation is for only one night)
                    will be charged.
                  </li>
                </ul>

                <h3>3. SPECIAL PERIODS (HOLIDAYS)</h3>
                <p>
                  For reservations during national holidays (Christmas, New
                  Year, Easter) and official public holidays, the free
                  cancellation period is <strong>14 days</strong> before the
                  check-in date. For cancellations made after this deadline,
                  100% of the transferred deposit will be retained.
                </p>

                <h3>4. REFUND PROCEDURE</h3>
                <p>
                  This section is mandatory in accordance with card payment
                  regulations:
                </p>
                <ul>
                  <li>
                    <strong>Refund Method:</strong> In the event that a refund
                    is necessary for a sum paid by bank card, the amount will be
                    refunded{" "}
                    <strong>
                      solely to the card used for the original payment
                    </strong>
                    . Refunds in cash or to a different bank account are not
                    permitted.
                  </li>
                  <li>
                    <strong>Timeline:</strong> The refund will be processed by
                    the Hotel within 7 working days from the date of
                    cancellation confirmation. The time it takes for the funds
                    to appear in your account depends on your issuing bank
                    (usually 1 to 5 days).
                  </li>
                </ul>

                <h3>5. FORCE MAJEURE</h3>
                <p>
                  In cases of force majeure (natural disasters, road closures,
                  government bans), the Hotel will refund the full amount to the
                  Client without charging any penalties, regardless of the
                  cancellation deadline.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}




