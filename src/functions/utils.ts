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
  formatDate,
};
