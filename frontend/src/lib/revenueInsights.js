function pad(value) {
  return String(value).padStart(2, "0");
}

function getIsoWeek(date) {
  const utcDate = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
  );

  const day =
    utcDate.getUTCDay() || 7;

  utcDate.setUTCDate(
    utcDate.getUTCDate() + 4 - day
  );

  const yearStart = new Date(
    Date.UTC(
      utcDate.getUTCFullYear(),
      0,
      1
    )
  );

  const week = Math.ceil(
    (
      (
        utcDate - yearStart
      ) / 86400000 + 1
    ) / 7
  );

  return {
    year: utcDate.getUTCFullYear(),
    week
  };
}

function getCurrentPeriodKey(
  period,
  now = new Date()
) {
  const year =
    now.getFullYear();

  if (period === "monthly") {
    return `${year}-${pad(
      now.getMonth() + 1
    )}`;
  }

  if (period === "weekly") {
    const currentWeek =
      getIsoWeek(now);

    return `${currentWeek.year}-W${currentWeek.week}`;
  }

  if (period === "quarterly") {
    return `${year}-Q${
      Math.floor(
        now.getMonth() / 3
      ) + 1
    }`;
  }

  return String(year);
}

export function isIncompletePeriod(
  periodKey,
  period,
  now = new Date()
) {
  return String(periodKey) ===
    getCurrentPeriodKey(
      period,
      now
    );
}

export function getCompletePeriods(
  rows,
  period,
  now = new Date()
) {
  return rows.filter(
    (row) =>
      !isIncompletePeriod(
        row.period,
        period,
        now
      )
  );
}

export function getComparisonInsight(
  rows,
  period,
  now = new Date()
) {
  const hasIncompleteLatest =
    rows.length > 0 &&
    isIncompletePeriod(
      rows[rows.length - 1].period,
      period,
      now
    );

  const completePeriods =
    getCompletePeriods(
      rows,
      period,
      now
    );

  const currentClosed =
    completePeriods[
      completePeriods.length - 1
    ];

  const previousClosed =
    completePeriods[
      completePeriods.length - 2
    ];

  if (
    !currentClosed ||
    !previousClosed
  ) {
    return {
      hasEnoughData: false,
      hasIncompleteLatest,
      currentClosed,
      previousClosed
    };
  }

  const changeAmount =
    currentClosed.revenue -
    previousClosed.revenue;

  const changePercent =
    previousClosed.revenue > 0
      ? (
          changeAmount /
          previousClosed.revenue
        ) * 100
      : null;

  return {
    hasEnoughData: true,
    hasIncompleteLatest,
    currentClosed,
    previousClosed,
    changeAmount,
    changePercent,
    direction:
      changeAmount > 0
        ? "up"
        : changeAmount < 0
          ? "down"
          : "flat"
  };
}

export function getRankedPeriods(
  rows,
  period,
  now = new Date(),
  limit = 3
) {
  const completePeriods =
    getCompletePeriods(
      rows,
      period,
      now
    );

  const sorted =
    [...completePeriods].sort(
      (left, right) =>
        right.revenue - left.revenue
    );

  return {
    best: sorted.slice(0, limit),
    worst: [...sorted]
      .reverse()
      .slice(0, limit)
  };
}

export function getPartialPeriodLabel(
  period
) {
  if (period === "monthly") {
    return "Month-to-date";
  }

  if (period === "weekly") {
    return "Week-to-date";
  }

  if (period === "quarterly") {
    return "Quarter-to-date";
  }

  return "Year-to-date";
}
