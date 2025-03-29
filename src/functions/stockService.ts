const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchUserStock = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/stocks/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        Authorization: `Bearer ${token}`,
      },
    });

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
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/stocks/portfolio`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        Authorization: `Bearer ${token}`,
      },
    });
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
    console.log("Got here");
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/stocks/symbol/${symbol}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        Authorization: `Bearer ${token}`,
      },
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
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/stocks/stock/history/${symbol}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        Authorization: `Bearer ${token}`,
      },
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
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${BASE_URL}/stocks/user/quantity/${symbol.trim()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      }
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
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/stocks/buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      Authorization: `Bearer ${token}`,
    },
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
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/stocks/sell`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqBody),
  });

  const result = await response.json();
  if (response.ok && result.message) {
    return result;
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
};
