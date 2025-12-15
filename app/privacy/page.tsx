"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useI18n } from "@/lib/i18n";

export default function PrivacyPage() {
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
            {t("policies.privacy.title")}
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
                {/* PASTE YOUR BULGARIAN PRIVACY POLICY MARKDOWN HERE */}
                <h1>ПОЛИТИКА ЗА ПОВЕРИТЕЛНОСТ</h1>
                <p>
                  <strong>
                    ПОЛИТИКА ЗА ЗАЩИТА НА ЛИЧНИТЕ ДАННИ НА ХОТЕЛ ДЕМЕТРА
                  </strong>
                </p>

                <h3>1. ИНФОРМАЦИЯ ЗА АДМИНИСТРАТОРА НА ЛИЧНИ ДАННИ</h3>
                <p>
                  Тази Политика за поверителност обяснява как "Хотел Деметра"
                  събира, използва и защитава Вашите лични данни.
                  Администраторът на данни, отговорен за Вашата информация, е:
                </p>
                <ul>
                  <li>
                    <strong>Име на фирмата:</strong> КОМВЕРС ЕООД
                  </li>
                  <li>
                    <strong>ЕИК:</strong> 202564756
                  </li>
                  <li>
                    <strong>Адрес на управление:</strong> ул. "Владимир Заимов"
                    №6, 3500 Берковица, България
                  </li>
                  <li>
                    <strong>Имейл:</strong> comvers@mail.bg
                  </li>
                  <li>
                    <strong>Телефон:</strong> +359 895 641 292
                  </li>
                </ul>

                <h3>2. КАКВИ ДАННИ СЪБИРАМЕ</h3>
                <p>
                  За да предоставим услуги по настаняване и да обработим Вашата
                  резервация, ние събираме следните категории лични данни:
                </p>
                <ul>
                  <li>
                    <strong>Идентификационни данни:</strong> Име, презиме,
                    фамилия.
                  </li>
                  <li>
                    <strong>Данни за контакт:</strong> Телефонен номер и имейл
                    адрес.
                  </li>
                  <li>
                    <strong>Данни за резервацията:</strong> Дати на
                    пристигане/заминаване, брой гости, предпочитания за стая.
                  </li>
                  <li>
                    <strong>Данни за настаняване (Изисквани по закон):</strong>{" "}
                    При настаняване, българското законодателство (Закон за
                    туризма) изисква от нас да съберем данни от лична карта или
                    паспорт (Номер, валидност, гражданство, дата на раждане).
                  </li>
                </ul>

                <h3>3. КАК ИЗПОЛЗВАМЕ ВАШИТЕ ДАННИ</h3>
                <p>
                  Ние обработваме Вашите лични данни за следните конкретни цели:
                </p>
                <ul>
                  <li>
                    <strong>Обработка на резервации:</strong> За управление на
                    Вашата резервация и комуникация с Вас относно престоя Ви.
                  </li>
                  <li>
                    <strong>Обработка на плащания:</strong> За осъществяване на
                    плащания чрез банков превод или кредитна/дебитна карта.
                  </li>
                  <li>
                    <strong>Законови задължения:</strong> За регистрация на
                    гостите в Единната система за туристическа информация (ЕСТИ)
                    към Министерство на туризма.
                  </li>
                  <li>
                    <strong>Счетоводство:</strong> За издаване на фактури и
                    спазване на данъчното законодателство.
                  </li>
                </ul>

                <h3>4. СИГУРНОСТ НА ПЛАЩАНИЯТА (Виртуален ПОС)</h3>
                <p>
                  За онлайн плащания с кредитна/дебитна карта използваме сигурен
                  Виртуален ПОС терминал, предоставен от нашата обслужваща
                  банка.{" "}
                  <strong>
                    Хотел Деметра не съхранява и няма достъп до пълния номер на
                    Вашата карта, CVC код или дата на валидност.
                  </strong>{" "}
                  Тези данни са криптирани и се обработват директно от банката,
                  за да се гарантира максимална сигурност.
                </p>

                <h3>5. СПОДЕЛЯНЕ НА ДАННИ</h3>
                <p>
                  Ние не продаваме Вашите данни на трети страни. Вашите данни се
                  споделят единствено с:
                </p>
                <ul>
                  <li>
                    <strong>Държавни органи:</strong> Министерство на туризма
                    (ЕСТИ), МВР и НАП, стриктно когато това се изисква по закон.
                  </li>
                  <li>
                    <strong>Доставчици на услуги:</strong> Нашето счетоводство
                    (за данъчни цели) и IT поддръжка (за поддръжка на уебсайта),
                    които са обвързани с договори за конфиденциалност.
                  </li>
                </ul>

                <h3>6. СЪХРАНЕНИЕ НА ДАННИ</h3>
                <p>
                  Ние съхраняваме Вашите данни само толкова дълго, колкото е
                  необходимо:
                </p>
                <ul>
                  <li>
                    <strong>Данни за резервации:</strong> Пазят се до
                    приключване на услугата.
                  </li>
                  <li>
                    <strong>Счетоводни документи (Фактури):</strong> Пазят се 10
                    години, както изисква Законът за счетоводството.
                  </li>
                  <li>
                    <strong>Регистър на настанените туристи:</strong> Пази се 5
                    години, както изисква Законът за туризма.
                  </li>
                </ul>

                <h3>7. ВАШИТЕ ПРАВА</h3>
                <p>
                  Съгласно Общия регламент за защита на данните (GDPR), Вие
                  имате право да:
                </p>
                <ul>
                  <li>
                    Изискате достъп до личните данни, които съхраняваме за Вас.
                  </li>
                  <li>Изискате коригиране на неточни данни.</li>
                  <li>
                    Изискате изтриване на Вашите данни („Право да бъдеш
                    забравен“), освен в случаите, когато сме задължени по закон
                    да ги пазим (напр. за данъчни цели или регистрация в
                    МВР/ЕСТИ).
                  </li>
                </ul>
                <p>
                  За да упражните тези права, моля свържете се с нас на{" "}
                  <strong>comvers@mail.bg</strong>.
                </p>

                <h3>8. БИСКВИТКИ (COOKIES)</h3>
                <p>
                  Нашият уебсайт използва "Бисквитки" (Cookies) основно за
                  осигуряване на техническото функциониране на резервационната
                  система (напр. запомняне на избраните от Вас дати). Ние не
                  използваме агресивни проследяващи бисквитки. Използвайки нашия
                  уебсайт и система за резервации, Вие се съгласявате с
                  използването на тези необходими бисквитки.
                </p>

                <h3>9. ПРОМЕНИ В ПОЛИТИКАТА</h3>
                <p>
                  Запазваме си правото да актуализираме тази политика, за да
                  спазваме промените в законодателството. Най-новата версия
                  винаги ще бъде достъпна на тази страница.
                </p>

                <p>
                  <em>Последна актуализация: Декември 2025 г.</em>
                </p>
              </div>
            )}

            {/* English Content */}
            {language === "en" && (
              <div className="policy-content">
                {/* PASTE YOUR ENGLISH PRIVACY POLICY MARKDOWN HERE */}
                <h1>PRIVACY POLICY</h1>
                <p>
                  <strong>
                    PERSONAL DATA PROTECTION POLICY FOR HOTEL DEMETRA
                  </strong>
                </p>

                <h3>1. DATA CONTROLLER INFORMATION</h3>
                <p>
                  This Privacy Policy explains how "Hotel Demetra" collects,
                  uses, and protects your personal data. The data controller
                  responsible for your information is:
                </p>
                <ul>
                  <li>
                    <strong>Company Name:</strong> COMVERS LTD (КОМВЕРС ЕООД)
                  </li>
                  <li>
                    <strong>UIC (EIK):</strong> 202564756
                  </li>
                  <li>
                    <strong>Address:</strong> 6 Vladimir Zaimov St., 3500
                    Berkovitsa, Bulgaria
                  </li>
                  <li>
                    <strong>Email:</strong> comvers@mail.bg
                  </li>
                  <li>
                    <strong>Phone:</strong> +359 895 641 292
                  </li>
                </ul>

                <h3>2. WHAT DATA WE COLLECT</h3>
                <p>
                  To provide accommodation services and process your
                  reservation, we collect the following categories of personal
                  data:
                </p>
                <ul>
                  <li>
                    <strong>Identification Data:</strong> Name, Surname, Family
                    name.
                  </li>
                  <li>
                    <strong>Contact Details:</strong> Phone number and Email
                    address.
                  </li>
                  <li>
                    <strong>Reservation Data:</strong> Arrival/Departure dates,
                    number of guests, room preferences.
                  </li>
                  <li>
                    <strong>Check-in Data (Required by Law):</strong> Upon
                    arrival, Bulgarian legislation (Tourism Act) requires us to
                    collect ID card/Passport data (Number, Expiry, Nationality,
                    Date of Birth).
                  </li>
                </ul>

                <h3>3. HOW WE USE YOUR DATA</h3>
                <p>
                  We process your personal data for the following specific
                  purposes:
                </p>
                <ul>
                  <li>
                    <strong>Booking Processing:</strong> To manage your
                    reservation and communicate with you regarding your stay.
                  </li>
                  <li>
                    <strong>Payment Processing:</strong> To facilitate payments
                    via bank transfer or credit/debit card.
                  </li>
                  <li>
                    <strong>Legal Obligations:</strong> To register guests in
                    the Unified Tourist Information System (ESTI) as required by
                    the Bulgarian Ministry of Tourism.
                  </li>
                  <li>
                    <strong>Accounting:</strong> To issue invoices and comply
                    with tax legislation.
                  </li>
                </ul>

                <h3>4. PAYMENT SECURITY (Virtual POS)</h3>
                <p>
                  For online payments via Credit/Debit card, we use a secure
                  Virtual POS terminal provided by our banking partner.{" "}
                  <strong>
                    Hotel Demetra does not store or have access to your full
                    credit card number, CVC code, or expiry date.
                  </strong>{" "}
                  This data is encrypted and processed directly by the bank to
                  ensure maximum security.
                </p>

                <h3>5. DATA SHARING</h3>
                <p>
                  We do not sell your data to third parties. Your data is only
                  shared with:
                </p>
                <ul>
                  <li>
                    <strong>State Authorities:</strong> Ministry of Tourism
                    (ESTI), Ministry of Interior, and NRA (NAP) strictly when
                    required by law.
                  </li>
                  <li>
                    <strong>Service Providers:</strong> Our accountant (for tax
                    purposes) and our IT/Hosting support (for website
                    maintenance), who are bound by confidentiality agreements.
                  </li>
                </ul>

                <h3>6. DATA RETENTION</h3>
                <p>We store your data only for as long as necessary:</p>
                <ul>
                  <li>
                    <strong>Reservation data:</strong> Kept until the service is
                    completed.
                  </li>
                  <li>
                    <strong>Accounting documents (Invoices):</strong> Kept for
                    10 years as required by the Accounting Act.
                  </li>
                  <li>
                    <strong>Guest Register data:</strong> Kept for 5 years as
                    required by the Tourism Act.
                  </li>
                </ul>

                <h3>7. YOUR RIGHTS</h3>
                <p>
                  Under the General Data Protection Regulation (GDPR), you have
                  the right to:
                </p>
                <ul>
                  <li>
                    Request access to the personal data we hold about you.
                  </li>
                  <li>Request correction of incorrect data.</li>
                  <li>
                    Request deletion of your data ("Right to be forgotten"),
                    except where we are legally required to keep it (e.g., for
                    tax or police registration purposes).
                  </li>
                </ul>
                <p>
                  To exercise these rights, please contact us at{" "}
                  <strong>comvers@mail.bg</strong>.
                </p>

                <h3>8. COOKIES</h3>
                <p>
                  Our website uses "Cookies" primarily to ensure the technical
                  functioning of the booking engine (e.g., remembering your
                  selected dates). We do not use aggressive tracking cookies. By
                  using our website and booking system, you agree to the use of
                  these essential cookies.
                </p>

                <h3>9. CHANGES TO THIS POLICY</h3>
                <p>
                  We reserve the right to update this policy to comply with
                  legal changes. The latest version will always be available on
                  this page.
                </p>

                <p>
                  <em>Last Updated: December 2025</em>
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
