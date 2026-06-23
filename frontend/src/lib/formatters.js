export function formatIndianCurrency(value) {
  const amount =
    Number(value) || 0;

  return new Intl.NumberFormat(
    "en-IN",
    {
      maximumFractionDigits: 0
    }
  ).format(amount);
}
