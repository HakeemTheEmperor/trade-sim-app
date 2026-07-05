import { apiFetch } from "./apiClient";

const fetchUserTransactionHistory = async (
  wallet_id: number,
  currency: string,
  page: number,
  limit = 5
) => {
  const path = `/transactions/history?wallet_id=${wallet_id}&currency=${currency}&page=${page}&limit=${limit}&sort_by=desc`;
  const response = await apiFetch(path, { method: "GET" });
  const result = await response.json();
  if (response.ok && result.data) {
    return result.data;
  } else {
    throw result;
  }
};

const fetchTransactionDetails = async (id: string) => {
  const response = await apiFetch(`/transactions/transaction/${id}`, {
    method: "GET",
  });
  const result = await response.json();
  if (response.ok && result.data) {
    return result.data;
  } else {
    throw result;
  }
};

export { fetchUserTransactionHistory, fetchTransactionDetails };
