// TODO: replace every value below with the real business details before
// deploying. This feeds the LocalBusiness JSON-LD (see
// src/components/local-business-jsonld.tsx) that search engines read —
// shipping placeholder address/hours/phone data to production means Google
// indexes false information about the business, which can also trigger a
// structured-data manual action if it's caught. The values below are
// deliberately obvious placeholders (not real-looking data) so nobody
// mistakes them for the genuine address.
export const businessInfo = {
  name: "Bliss & Bow Gift Wrapping Co.",
  telephone: "(000) 000-0000",
  priceRange: "$$",
  address: {
    streetAddress: "123 Placeholder Street",
    addressLocality: "Placeholder City",
    addressRegion: "XX",
    postalCode: "00000",
    addressCountry: "US",
  },
  // 24-hour time strings. Add/remove days as needed once real hours are known.
  openingHours: [
    { dayOfWeek: "Monday", opens: "09:00", closes: "17:00" },
    { dayOfWeek: "Tuesday", opens: "09:00", closes: "17:00" },
    { dayOfWeek: "Wednesday", opens: "09:00", closes: "17:00" },
    { dayOfWeek: "Thursday", opens: "09:00", closes: "17:00" },
    { dayOfWeek: "Friday", opens: "09:00", closes: "17:00" },
  ],
};
