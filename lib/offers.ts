"use client";

import { useEffect, useState } from "react";
import { BedDouble, CalendarDays, CalendarRange } from "lucide-react";

type Localized = { bg: string; en: string };

export interface Offer {
  id: string;
  badge: Localized;
  title: Localized;
  /** Short, punchy statement of the deal, e.g. "Pay for 2 nights – the 3rd is free". */
  headline: Localized;
  /** Large figure shown on the offer artwork. */
  highlight: string;
  description: Localized;
  conditions: { icon: "dates" | "days" | "nights"; text: Localized }[];
  terms: Localized;
  image: string;
  /** Last moment the offer is shown on the site (ISO 8601 with offset). */
  validUntil: string;
  /** Short validity label used on compact cards. */
  validityLabel: Localized;
}

export const offers: Offer[] = [
  {
    id: "autumn-2026",
    badge: { bg: "Есенна оферта", en: "Autumn offer" },
    title: {
      bg: "Есента ти дължи една нощ. Ние я поемаме.",
      en: "Autumn owes you a night. It's on us.",
    },
    headline: {
      bg: "Плащаш 2 нощувки – третата е подарък!",
      en: "Pay for 2 nights – the third one is on us!",
    },
    highlight: "2+1",
    description: {
      bg: "Кога за последно просто спря? Без аларми, без имейли, без бързане. Само планина, свеж въздух, чаша топъл чай и тишина, която наистина се чува. Защото най-хубавите почивки са в делничните дни: по-малко хора, повече спокойствие и цялата есенна красота на Берковица само за вас.",
      en: "When did you last simply stop? No alarms, no emails, no rushing. Just the mountains, fresh air, a cup of warm tea and a silence you can truly hear. The best getaways happen on weekdays: fewer people, more calm, and all of Berkovitsa's autumn beauty just for you.",
    },
    conditions: [
      {
        icon: "dates",
        text: { bg: "От 01.10 до 30.11.2026 г.", en: "1 October – 30 November 2026" },
      },
      {
        icon: "days",
        text: {
          bg: "За престои от неделя до четвъртък",
          en: "For stays from Sunday to Thursday",
        },
      },
      {
        icon: "nights",
        text: {
          bg: "Минимум 3 последователни нощувки",
          en: "Minimum 3 consecutive nights",
        },
      },
    ],
    terms: {
      bg: "Безплатната нощувка е част от същия престой и не се заменя с парична стойност. Офертата важи при налични места и не се комбинира с други промоции и отстъпки.",
      en: "The free night is part of the same stay and cannot be exchanged for cash. Subject to availability; cannot be combined with other promotions or discounts.",
    },
    image:
      "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/2c76d2ab-12d8-432e-6312-9b5741010200/public",
    validUntil: "2026-11-30T23:59:59+02:00",
    validityLabel: { bg: "до 30 ноември", en: "until 30 November" },
  },
];

export const conditionIcons = {
  dates: CalendarRange,
  days: CalendarDays,
  nights: BedDouble,
};

export const BOOKING_PHONE = { display: "0895 641 292", href: "tel:+359895641292" };

/**
 * Offers that haven't expired yet. The page is pre-rendered at build time, so
 * the list is re-checked in the browser against today's date.
 */
export function useActiveOffers() {
  const [active, setActive] = useState(offers);
  useEffect(() => {
    const now = Date.now();
    setActive(offers.filter((offer) => new Date(offer.validUntil).getTime() >= now));
  }, []);
  return active;
}
