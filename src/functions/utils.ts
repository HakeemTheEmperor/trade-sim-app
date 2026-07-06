import numbro from "numbro";

function truncateDescription(description: string, maxLength = 100) {
  return description.length > maxLength
    ? `${description.slice(0, maxLength)}...`
    : description;
}

function shortenDescription(description: string, maxSentences = 3) {
  const sentences = description
    .split(/(?<=\.)\s+/)
    .filter((sentence: string) => sentence.trim() !== "");

  return sentences.length > maxSentences
    ? sentences.slice(0, maxSentences).join(" ") + "..."
    : description;
}

function formatMarketCap(marketCap: number) {
  return numbro(marketCap).format({
    average: true,
    mantissa: 3,
    spaceSeparated: true,
  });
}

function formatNumber(num: number): string {
  return Number(num).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Share quantities can be fractional (up to 6 dp). Show up to 6 decimals with
// trailing zeros trimmed, so 2.500000 -> "2.5" and 0.123456 stays "0.123456".
function formatQuantity(qty: number): string {
  if (qty == null || isNaN(qty)) return "0";
  return parseFloat(Number(qty).toFixed(6)).toString();
}

// Round to the 6 dp share scale the backend uses, to avoid float noise.
function roundQuantity(qty: number): number {
  return Math.round(qty * 1e6) / 1e6;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    " " +
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );
};

export {
  truncateDescription,
  shortenDescription,
  formatMarketCap,
  formatNumber,
  formatQuantity,
  roundQuantity,
  formatDate,
};
