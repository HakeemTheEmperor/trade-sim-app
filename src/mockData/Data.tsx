interface ChartData {
  id: number;
  symbol: string;
  date: string;
  cp: string;
}

interface UserData {
  created_at: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  phone_number: string | null; // Can be a string or null
  role: string; // You could make this an enum if the values are fixed (e.g., "USER", "ADMIN")
  updated_at: string;
  username: string;
  wallets: WalletProp[];
}

interface StockIntroProp {
  symbol: string;
  image: string;
  company_name: string;
  percentage_change: number;
  current_price: number;
}

interface UserStockItem {
  id: number;
  symbol: string;
  company_name: string;
  image: string;
  quantity: number;
  price: {
    current_price: number;
    percentage_change: number;
  };
}

interface Price {
  current_price: number;
  percentage_change: number;
  previous_price: number;
  id: number;
  symbol: string;
  updated_at: string;
}

interface StockDataShort {
  id: number;
  symbol: string;
  image: string;
  company_name: string;
  price: Price;
}

interface WatchListData {
  id: number;
  symbol: string;
  image: string;
  company_name: string;
  price: number;
  pc: number;
}

interface StockListProp {
  heading: string;
}

interface WalletProp {
  id: number;
  balance: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

interface TransactionHistory {
  id: number;
  user_id: number;
  stock_symbol: string;
  quantity: number;
  price_per_share: number;
  total_value: number;
  currency: string;
  transaction_type: "BUY" | "SELL";
  transaction_category: string;
  from_wallet_id: number;
  to_wallet_id: number | null;
  time: string;
}

interface TransactionDetailProp {
  id: number;
  currency: string;
  from_username: string;
  from_wallet_id: number;
  timestamp: string;
  to_username: string | null;
  to_wallet_id: number | null;
  total_value: number;
  transaction_category: string;
  transaction_type: string;
  user_id: number;
  pps: number | null;
  quantity: number | null;
  stockSymbol: string | null;
  stockImage: string | null;
}

export type {
  ChartData as StockData,
  StockIntroProp,
  UserStockItem,
  StockListProp,
  WalletProp,
  StockDataShort,
  TransactionHistory,
  TransactionDetailProp,
  WatchListData,
  UserData,
};
