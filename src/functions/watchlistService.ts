const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchWatchlist = async () => {
  const token = localStorage.getItem("token");
  const url = `${BASE_URL}/watchlist/get`;
  const response = await fetch(url, {
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
    throw result;
  }
};

const addToWatchlist = async (symbol: string) => {
  const token = localStorage.getItem("token");
  const url = `${BASE_URL}/watchlist/add/${symbol}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  if (response.ok) {
    return result.message;
  } else {
    throw result;
  }
};

const removeFromWatchlist = async (symbol: string) => {
  const token = localStorage.getItem("token");
  const url = `${BASE_URL}/watchlist/delete/${symbol}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  if (response.ok) {
    return result.message;
  } else {
    throw result;
  }
};

const isInWatchlist = async (symbol: string) => {
  const token = localStorage.getItem("token");
  const url = `${BASE_URL}/watchlist/check/${symbol}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  if (response.ok) {
    return result.data;
  } else {
    throw result;
  }
};

export { fetchWatchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
