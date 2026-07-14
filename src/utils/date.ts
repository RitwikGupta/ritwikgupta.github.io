const utcDateFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
});

export const formatUtcDate = (date: Date) => utcDateFormatter.format(date);
