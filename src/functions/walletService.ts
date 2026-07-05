import { apiFetch } from "./apiClient";

const fetchUserWallets = async () => {
  try {
    const response = await apiFetch(`/wallet/all`, { method: "GET" });
    const result = await response.json();
    if (response.ok && result.wallets) {
      return result.wallets;
    } else {
      console.error("Failed to fetch user wallets: ", result);
      return null;
    }
  } catch (error) {
    console.error("Error fetching stock data data:", error);
    return null;
  }
};

export { fetchUserWallets };
