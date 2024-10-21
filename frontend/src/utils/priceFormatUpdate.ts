export const priceFormatUpdate = (value: number) => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(0)}b`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}m`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}k`;
  } else {
    return value.toString();
  }
};
