"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useI18n } from "@/lib/i18n";

export default function TermsContent() {
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
            {t("policies.terms.title")}
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
                <h1>ОБЩИ УСЛОВИЯ</h1>
                <p>
                  <strong>ЗА ХОТЕЛСКО НАСТАНЯВАНЕ В ХОТЕЛ ДЕМЕТРА</strong>
                </p>

                <h3>1. ИДЕНТИФИКАЦИЯ НА ТЪРГОВЕЦА</h3>
                <p>
                  Настоящите Общи условия уреждат взаимоотношенията между Госта
                  (наричан по-долу &quot;Клиент&quot; или &quot;Гост&quot;) и Хотелиера (наричан
                  по-долу &quot;Хотел&quot; или &quot;Търговец&quot;).
                </p>
                <ul>
                  <li>
                    <strong>Име на фирмата:</strong> КОМВЕРС ЕООД
                  </li>
                  <li>
                    <strong>Адрес на управление:</strong> гр. Берковица 3500,
                    ул. &quot;Владимир Заимов&quot; №6
                  </li>
                  <li>
                    <strong>ЕИК (БУЛСТАТ):</strong> 202564756
                  </li>
                  <li>
                    <strong>Телефон:</strong> +359 895 641 292 / +359 884 430
                    292
                  </li>
                  <li>
                    <strong>Имейл:</strong> comvers@mail.bg
                  </li>
                </ul>

                <h3>2. ПРЕДМЕТ НА УСЛУГАТА</h3>
                <p>
                  Хотелът предлага услуги по настаняване в &quot;Хотел Деметра&quot;
                  (категория 3 звезди), намиращ се в гр. Берковица, България.
                  Основните услуги включват:
                </p>
                <ul>
                  <li>Хотелско настаняване в обзаведени стаи.</li>
                  <li>Ежедневно почистване.</li>
                  <li>Включена закуска.</li>
                  <li>
                    Достъп до плувен басейн (сезонен или целогодишен достъп
                    според графика на хотела).
                  </li>
                  <li>Wi-Fi интернет достъп.</li>
                  <li>
                    <em>
                      Допълнителни услуги, като <strong>Сауна</strong>, са
                      налични срещу допълнително заплащане съгласно ценоразписа
                      на рецепция.
                    </em>
                  </li>
                </ul>

                <h3>3. ПРОЦЕС НА РЕЗЕРВАЦИЯ</h3>
                <p>
                  3.1. Резервации могат да се правят чрез официалния уебсайт на
                  Хотела, по телефон или по имейл.
                </p>
                <p>
                  3.2. Чрез завършване на резервация през уебсайта, Клиентът
                  декларира, че е навършил 18 години и приема настоящите Общи
                  условия.
                </p>
                <p>
                  3.3. Резервацията се счита за потвърдена единствено след като
                  Хотелът изпрати електронно Потвърждение на резервацията
                  (Ваучер) на посочения от Клиента имейл адрес.
                </p>
                <p>
                  3.4. Хотелът запазва правото си да откаже резервация, ако
                  исканите дати са напълно заети или ако Клиентът не спази
                  сроковете за плащане.
                </p>

                <h3>4. ЦЕНИ И ВАЛУТА</h3>
                <p>
                  4.1. Всички цени, посочени на уебсайта, са крайни и са обявени
                  в <strong>EUR (Евро)</strong>.
                </p>
                <p>4.2. Обявената цена включва:</p>
                <ul>
                  <li>Нощувка.</li>
                  <li>Данък добавена стойност (ДДС).</li>
                  <li>Туристически данък.</li>
                  <li>Закуска.</li>
                  <li>Застраховка.</li>
                </ul>
                <p>
                  4.3. Хотелът запазва правото си да променя цените за незаети
                  дати. Въпреки това, цената за вече потвърдени и платени
                  резервации остава непроменена.
                </p>

                <h3>5. НАЧИНИ НА ПЛАЩАНЕ</h3>
                <p>
                  5.1. За да гарантира резервацията, Клиентът трябва да извърши
                  плащане съгласно условията, посочени по време на
                  резервационния процес.
                </p>
                <p>5.2. Приетите начини на плащане включват:</p>
                <ul>
                  <li>
                    <strong>Банков път:</strong> По банковата сметка, посочена в
                    потвърждението на резервацията.
                  </li>
                  <li>
                    <strong>Дебитна/Кредитна карта:</strong> Плащане чрез
                    интегрирания Виртуален ПОС терминал на уебсайта.
                  </li>
                </ul>
                <p>
                  5.3. Избирайки плащане с карта, Клиентът се съгласява данните
                  за плащането да бъдат обработени от Банката, предоставяща
                  услугата Виртуален ПОС. Хотелът не съхранява пълни номера на
                  кредитни карти.
                </p>

                <h3>6. НАСТАНЯВАНЕ И ОСВОБОЖДАВАНЕ</h3>
                <p>
                  6.1. <strong>Настаняване:</strong> След 14:00 часа в деня на
                  пристигане.
                </p>
                <p>
                  6.2. <strong>Освобождаване:</strong> До 12:00 часа (на обяд) в
                  деня на заминаване.
                </p>
                <p>
                  6.3. Ранно настаняване или късно освобождаване зависят от
                  заетостта и може да се таксуват допълнително.
                </p>
                <p>
                  6.4. При настаняване Гостът е длъжен да представи валиден
                  документ за самоличност (Лична карта или Паспорт) за
                  регистрация съгласно българското законодателство.
                </p>

                <h3>7. ПРАВА И ЗАДЪЛЖЕНИЯ НА ГОСТА</h3>
                <p>
                  7.1. Гостът има право да ползва наетата стая и общите части
                  (ресторант, басейн) съгласно тяхното предназначение.
                </p>
                <p>
                  7.2. <strong>Вътрешен ред:</strong>
                </p>
                <ul>
                  <li>
                    <strong>Пушене:</strong> Пушенето е строго забранено във
                    всички закрити помещения, включително стаите за гости и
                    ресторанта, съгласно българското законодателство. Налични са
                    обозначени места за пушене на открито.
                  </li>
                  <li>
                    <strong>Часове за почивка:</strong> Гостите се очаква да
                    уважават спокойствието на останалите и да пазят тишина между
                    22:00 и 08:00 часа.
                  </li>
                  <li>
                    <strong>Грижа за собствеността:</strong> Гостът е отговорен
                    за поддържането на хигиената и целостта на имуществото.
                  </li>
                </ul>
                <p>
                  7.3. <strong>Щети:</strong> Гостът носи материална отговорност
                  за всички щети, причинени на хотелския инвентар или имущество
                  от него или неговите придружители. Щетите се заплащат на
                  рецепция преди напускане.
                </p>

                <h3>8. ПРАВА И ЗАДЪЛЖЕНИЯ НА ХОТЕЛА</h3>
                <p>
                  8.1. Хотелът е длъжен да предостави услугите, отговарящи на
                  категорията на обекта (3 звезди) и потвърдената резервация.
                </p>
                <p>
                  8.2. Хотелът осигурява безопасността и сигурността на Гостите,
                  но не носи отговорност за пари, бижута и ценности, оставени
                  без надзор в стаите или общите части.
                </p>
                <p>
                  8.3. Хотелът запазва правото си да прекрати престоя на всеки
                  Гост, който грубо нарушава вътрешния ред, безпокои другите
                  гости или нанася щети на имуществото, без възстановяване на
                  сумата за оставащите нощувки.
                </p>

                <h3>9. НЕПРЕОДОЛИМА СИЛА (ФОРСМАЖОР)</h3>
                <p>
                  Хотелът не носи отговорност за неизпълнение на задълженията си
                  в случаи на непреодолима сила (събития извън контрола на
                  Хотела), включително, но не само: природни бедствия, стачки,
                  военни действия или прекъсване на комунални услуги (ток,
                  вода), причинени от трети страни доставчици.
                </p>

                <h3>10. ПРИЛОЖИМО ПРАВО</h3>
                <p>
                  За всички въпроси, неуредени в настоящите Общи условия, се
                  прилага действащото законодателство на Република България.
                  Всички спорове се решават чрез взаимни преговори или, ако това
                  е невъзможно, от компетентните български съдилища.
                </p>
              </div>
            )}

            {/* English Content */}
            {language === "en" && (
              <div className="policy-content">
                <h1>GENERAL TERMS AND CONDITIONS</h1>
                <p>
                  <strong>FOR ACCOMMODATION SERVICES AT HOTEL DEMETRA</strong>
                </p>

                <h3>1. MERCHANT IDENTIFICATION</h3>
                <p>
                  These General Terms and Conditions govern the relationship
                  between the Guest (hereinafter referred to as &quot;Client&quot; or
                  &quot;Guest&quot;) and the Hotel Operator (hereinafter referred to as
                  &quot;Hotel&quot; or &quot;Merchant&quot;).
                </p>
                <ul>
                  <li>
                    <strong>Company Name:</strong> COMVERS LTD (КОМВЕРС ЕООД)
                  </li>
                  <li>
                    <strong>Headquarters/Management Address:</strong> 6 Vladimir
                    Zaimov St., 3500 Berkovitsa, Bulgaria
                  </li>
                  <li>
                    <strong>UIC (EIK):</strong> 202564756
                  </li>
                  <li>
                    <strong>Phone:</strong> +359 895 641 292 / +359 884 430 292
                  </li>
                  <li>
                    <strong>Email:</strong> comvers@mail.bg
                  </li>
                </ul>

                <h3>2. SCOPE OF SERVICES</h3>
                <p>
                  The Hotel offers accommodation services in &quot;Hotel Demetra&quot;
                  (3-star category), located in Berkovitsa, Bulgaria. The core
                  services include:
                </p>
                <ul>
                  <li>Hotel accommodation in furnished rooms.</li>
                  <li>Daily housekeeping.</li>
                  <li>Complimentary Breakfast.</li>
                  <li>
                    Access to the swimming pool (seasonal/year-round
                    availability as per hotel schedule).
                  </li>
                  <li>Wi-Fi Internet access.</li>
                  <li>
                    <em>
                      Additional services such as the <strong>Sauna</strong> are
                      available for an extra fee according to the current price
                      list at the reception.
                    </em>
                  </li>
                </ul>

                <h3>3. RESERVATION PROCESS</h3>
                <p>
                  3.1. Reservations can be made via the Hotel&apos;s official
                  website, by phone, or by email.
                </p>
                <p>
                  3.2. By completing a booking through the website, the Client
                  declares that they are at least 18 years of age and accepts
                  these General Terms and Conditions.
                </p>
                <p>
                  3.3. The reservation is considered confirmed only after the
                  Hotel sends an electronic Booking Confirmation (Voucher) to
                  the email address provided by the Client.
                </p>
                <p>
                  3.4. The Hotel reserves the right to refuse a reservation if
                  the requested dates are fully booked or if the Client does not
                  adhere to the payment deadlines.
                </p>

                <h3>4. PRICES AND CURRENCY</h3>
                <p>
                  4.1. All prices listed on the website are final and are
                  expressed in <strong>EUR (Euro)</strong>.
                </p>
                <p>4.2. The listed price includes:</p>
                <ul>
                  <li>The cost of the overnight stay.</li>
                  <li>Value Added Tax (VAT).</li>
                  <li>Tourist Tax/City Tax.</li>
                  <li>Breakfast.</li>
                  <li>Insurance.</li>
                </ul>
                <p>
                  4.3. The Hotel reserves the right to change prices for unsold
                  dates. However, the price for already confirmed and paid
                  reservations remains unchanged.
                </p>

                <h3>5. PAYMENT METHODS</h3>
                <p>
                  5.1. To guarantee a reservation, the Client must make a
                  payment according to the terms specified during the booking
                  process.
                </p>
                <p>5.2. Accepted methods of payment include:</p>
                <ul>
                  <li>
                    <strong>Bank Transfer:</strong> To the bank account
                    specified in the booking confirmation.
                  </li>
                  <li>
                    <strong>Debit/Credit Card:</strong> Payment via the
                    integrated Virtual POS terminal on the website.
                  </li>
                </ul>
                <p>
                  5.3. By choosing to pay by card, the Client consents to their
                  payment data being processed by the Bank providing the Virtual
                  POS service. The Hotel does not store full credit card
                  numbers.
                </p>

                <h3>6. CHECK-IN AND CHECK-OUT</h3>
                <p>
                  6.1. <strong>Check-in time:</strong> After 14:00 hours on the
                  day of arrival.
                </p>
                <p>
                  6.2. <strong>Check-out time:</strong> By 12:00 hours (noon) on
                  the day of departure.
                </p>
                <p>
                  6.3. Early check-in or late check-out is subject to
                  availability and may incur an additional fee.
                </p>
                <p>
                  6.4. Upon check-in, the Guest is required to present a valid
                  identity document (ID card or Passport) for registration in
                  accordance with Bulgarian legislation.
                </p>

                <h3>7. RIGHTS AND OBLIGATIONS OF THE GUEST</h3>
                <p>
                  7.1. The Guest has the right to use the rented room and common
                  areas (restaurant, pool) in accordance with their intended
                  purpose.
                </p>
                <p>
                  7.2. <strong>House Rules:</strong>
                </p>
                <ul>
                  <li>
                    <strong>Smoking:</strong> Smoking is strictly prohibited in
                    all indoor areas, including guest rooms and the restaurant,
                    in accordance with Bulgarian law. Designated outdoor smoking
                    areas are available.
                  </li>
                  <li>
                    <strong>Quiet Hours:</strong> Guests are expected to respect
                    the comfort of others and maintain silence between 22:00 and
                    08:00.
                  </li>
                  <li>
                    <strong>Property Care:</strong> The Guest is responsible for
                    maintaining the hygiene and integrity of the property.
                  </li>
                </ul>
                <p>
                  7.3. <strong>Damages:</strong> The Guest is financially liable
                  for any damages caused to the hotel inventory or property by
                  themselves or their companions. Damages must be paid for at
                  the reception before departure.
                </p>

                <h3>8. RIGHTS AND OBLIGATIONS OF THE HOTEL</h3>
                <p>
                  8.1. The Hotel is obliged to provide the services
                  corresponding to the category of the property (3-star) and the
                  confirmed booking.
                </p>
                <p>
                  8.2. The Hotel ensures the safety and security of the Guests
                  but is not liable for money, jewelry, and valuables left
                  unattended in the rooms or common areas.
                </p>
                <p>
                  8.3. The Hotel reserves the right to terminate the stay of any
                  Guest who flagrantly violates the House Rules, disturbs other
                  guests, or causes damage to the property, without
                  reimbursement for the remaining nights.
                </p>

                <h3>9. FORCE MAJEURE</h3>
                <p>
                  The Hotel is not liable for failure to perform its obligations
                  in cases of force majeure (events beyond the control of the
                  Hotel), including but not limited to: natural disasters,
                  strikes, military actions, or interruption of public utility
                  supplies (electricity, water) caused by third-party providers.
                </p>

                <h3>10. APPLICABLE LAW</h3>
                <p>
                  For all matters not covered by these General Terms and
                  Conditions, the current legislation of the Republic of
                  Bulgaria applies. Any disputes shall be resolved through
                  mutual negotiation or, if impossible, by the competent
                  Bulgarian courts.
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






