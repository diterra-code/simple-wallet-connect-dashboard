export function formatBalance(value: number, decimals = 2) {
  const balanceFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    minimumIntegerDigits: 1,
    useGrouping: true,
  });

  return balanceFormatter.format(value);
}
