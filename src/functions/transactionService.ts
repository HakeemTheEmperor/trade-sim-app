const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchUserTransactionHistory = async (
  wallet_id: number,
  currency: string,
  page: number,
  limit = 5
) => {
  const token = localStorage.getItem("token");
  const url = `${BASE_URL}/transactions/history?wallet_id=${wallet_id}&currency=${currency}&page=${page}&limit=${limit}&sort_by=desc`;
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

const fetchTransactionDetails = async (id: string) => {
  const token = localStorage.getItem("token");
  const url = `${BASE_URL}/transactions/transaction/${id}`;
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

export { fetchUserTransactionHistory, fetchTransactionDetails };
