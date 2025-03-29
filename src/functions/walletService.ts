const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchUserWallets = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/wallet/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        Authorization: `Bearer ${token}`,
      },
    });
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
