import { apiFetch } from "./apiClient";

const fetchUserStock = async () => {
  try {
    const response = await apiFetch(`/stocks/user`, { method: "GET" });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch stocks");
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching user stocks: ", error);
    return [];
  }
};

const fetchPortfolio = async () => {
  try {
    const response = await apiFetch(`/stocks/portfolio`, { method: "GET" });
    const result = await response.json();
    if (response.ok && result.data) {
      return result.data;
    } else {
      console.error("Failed to fetch portfolio data:", result.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return null;
  }
};

const fetchStockData = async (symbol: string) => {
  try {
    const response = await apiFetch(`/stocks/symbol/${symbol}`, {
      method: "GET",
    });
    const result = await response.json();
    if (response.ok && result.data) {
      return result.data;
    } else {
      console.error("Failed to fetch stock data data:", result.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching stock data data:", error);
    return null;
  }
};

const fetchStockPriceHistory = async (symbol: string) => {
  try {
    const response = await apiFetch(`/stocks/stock/history/${symbol}`, {
      method: "GET",
    });
    const result = await response.json();
    if (response.ok && result.data) {
      return result.data;
    } else {
      console.error(
        "Failed to fetch stock price history data:",
        result.message
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching stock price history data:", error);
    return null;
  }
};

const fetchStockQuantity = async (symbol: string) => {
  try {
    const response = await apiFetch(
      `/stocks/user/quantity/${symbol.trim()}`,
      { method: "GET" }
    );
    const result = await response.json();
    if (response.ok && result.data) {
      return result.data;
    } else {
      console.error("Failed to fetch stock data: ", result);
      return null;
    }
  } catch (error) {
    console.error("Error fetching stock data data:", error);
    return null;
  }
};

const buyStockUser = async (reqBody: {
  symbol: string;
  wallet_id: string;
  quantity: number;
}) => {
  const response = await apiFetch(`/stocks/buy`, {
    method: "POST",
    body: JSON.stringify(reqBody),
  });

  const result = await response.json();
  if (response.ok && result.message) {
    return result;
  } else {
    throw result;
  }
};

const sellStockUser = async (reqBody: {
  symbol: string;
  wallet_id: string;
  quantity: number;
}) => {
  const response = await apiFetch(`/stocks/sell`, {
    method: "POST",
    body: JSON.stringify(reqBody),
  });

  const result = await response.json();
  if (response.ok && result.message) {
    return result;
  } else {
    throw result;
  }
};

const stockSearch = async (query: string, searchType: string) => {
  const path =
    searchType === "symbol"
      ? `/stocks/search/symbol/${query}`
      : `/stocks/search/company/${query}`;

  const response = await apiFetch(path, { method: "GET" });
  const result = await response.json();
  if (response.ok && result.data) {
    return result.data;
  } else {
    throw result;
  }
};

const fetchAllStocks = async (
  pageNumber: number,
  sort: string,
  sortOrder: string
) => {
  const path = `/stocks/all?sort=${sortOrder}&page=${pageNumber}&limit=10&sort_by=${sort}`;
  const response = await apiFetch(path, { method: "GET" });
  const result = await response.json();
  if (response.ok && result.data) {
    return result.data;
  } else {
    throw result;
  }
};

export {
  fetchUserStock,
  fetchPortfolio,
  fetchStockData,
  fetchStockPriceHistory,
  fetchStockQuantity,
  buyStockUser,
  sellStockUser,
  stockSearch,
  fetchAllStocks,
};
