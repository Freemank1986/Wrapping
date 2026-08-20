import { describe, expect, it } from "vitest";
import { formatHoursSummary } from "./business-info";

describe("formatHoursSummary", () => {
  it("collapses consecutive identical-hours days into a range", () => {
    const hours = [
      { dayOfWeek: "Monday", opens: "10:00", closes: "16:00" },
      { dayOfWeek: "Tuesday", opens: "10:00", closes: "16:00" },
      { dayOfWeek: "Wednesday", opens: "10:00", closes: "16:00" },
    ];
    expect(formatHoursSummary(hours)).toBe("Mon–Wed, 10am–4pm");
  });

  it("splits into separate groups when hours differ", () => {
    const hours = [
      { dayOfWeek: "Monday", opens: "10:00", closes: "16:00" },
      { dayOfWeek: "Saturday", opens: "09:00", closes: "12:00" },
    ];
    expect(formatHoursSummary(hours)).toBe("Mon, 10am–4pm · Sat, 9am–12pm");
  });

  it("returns an empty string for no hours", () => {
    expect(formatHoursSummary([])).toBe("");
  });

  it("formats a single day without a range dash", () => {
    const hours = [{ dayOfWeek: "Friday", opens: "10:00", closes: "16:00" }];
    expect(formatHoursSummary(hours)).toBe("Fri, 10am–4pm");
  });
});
