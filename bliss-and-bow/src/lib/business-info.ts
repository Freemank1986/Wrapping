// Feeds the LocalBusiness JSON-LD (see
// src/components/local-business-jsonld.tsx).
export const businessInfo = {
  name: "Bliss & Bow Gift Wrapping Co.",
  telephone: "(903) 316-2100",
  priceRange: "$$",
  address: {
    streetAddress: "7506 Balson Ave",
    addressLocality: "St. Louis",
    addressRegion: "MO",
    postalCode: "63130",
    addressCountry: "US",
  },
  // 24-hour time strings.
  openingHours: [
    { dayOfWeek: "Monday", opens: "10:00", closes: "16:00" },
    { dayOfWeek: "Tuesday", opens: "10:00", closes: "16:00" },
    { dayOfWeek: "Wednesday", opens: "10:00", closes: "16:00" },
    { dayOfWeek: "Thursday", opens: "10:00", closes: "16:00" },
    { dayOfWeek: "Friday", opens: "10:00", closes: "16:00" },
    { dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
  ],
};

const DAY_ABBR: Record<string, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

function formatTime12h(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12}${period}` : `${hour12}:${String(m).padStart(2, "0")}${period}`;
}

// Collapses consecutive days that share the same open/close time into a
// range (e.g. "Mon–Sat, 10am–4pm") so the displayed hours can never drift
// out of sync with the openingHours data above.
export function formatHoursSummary(
  hours: typeof businessInfo.openingHours = businessInfo.openingHours,
): string {
  if (hours.length === 0) return "";

  const groups: { days: string[]; opens: string; closes: string }[] = [];
  for (const entry of hours) {
    const last = groups[groups.length - 1];
    if (last && last.opens === entry.opens && last.closes === entry.closes) {
      last.days.push(entry.dayOfWeek);
    } else {
      groups.push({ days: [entry.dayOfWeek], opens: entry.opens, closes: entry.closes });
    }
  }

  return groups
    .map((group) => {
      const dayLabel =
        group.days.length > 1
          ? `${DAY_ABBR[group.days[0]]}–${DAY_ABBR[group.days[group.days.length - 1]]}`
          : DAY_ABBR[group.days[0]];
      return `${dayLabel}, ${formatTime12h(group.opens)}–${formatTime12h(group.closes)}`;
    })
    .join(" · ");
}
