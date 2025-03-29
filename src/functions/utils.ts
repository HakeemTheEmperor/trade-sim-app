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

export {
  truncateDescription,
  shortenDescription,
  formatMarketCap,
  formatNumber,
};
