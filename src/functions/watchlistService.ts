import { apiFetch } from "./apiClient";

const fetchWatchlist = async () => {
  const response = await apiFetch(`/watchlist/get`, { method: "GET" });
  const result = await response.json();
  if (response.ok && result.data) {
    return result.data;
  } else {
    throw result;
  }
};

const addToWatchlist = async (symbol: string) => {
  const response = await apiFetch(`/watchlist/add/${symbol}`, {
    method: "POST",
  });
  const result = await response.json();
  if (response.ok) {
    return result.message;
  } else {
    throw result;
  }
};

const removeFromWatchlist = async (symbol: string) => {
  const response = await apiFetch(`/watchlist/delete/${symbol}`, {
    method: "DELETE",
  });
  const result = await response.json();
  if (response.ok) {
    return result.message;
  } else {
    throw result;
  }
};

const isInWatchlist = async (symbol: string) => {
  const response = await apiFetch(`/watchlist/check/${symbol}`, {
    method: "GET",
  });
  const result = await response.json();
  if (response.ok) {
    return result.data;
  } else {
    throw result;
  }
};

export { fetchWatchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
