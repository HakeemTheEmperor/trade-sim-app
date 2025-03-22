interface StockData {
  id: number;
  symbol: string;
  date: string;
  cp: string;
}

interface StockIntroProp {
  symbol: string;
  image: string;
  company_name: string;
  percentage_change: number;
  current_price: number;
}

const chartData: StockData[] = [
  {
    cp: "245.8300",
    date: "Thu, 20 Feb 2025 06:00:00 GMT",
    id: 1217,
    symbol: "AAPL",
  },
  {
    cp: "245.5500",
    date: "Fri, 21 Feb 2025 06:00:00 GMT",
    id: 2,
    symbol: "AAPL",
  },
  {
    cp: "247.1000",
    date: "Mon, 24 Feb 2025 06:00:00 GMT",
    id: 3,
    symbol: "AAPL",
  },
  {
    cp: "247.0400",
    date: "Tue, 25 Feb 2025 06:00:00 GMT",
    id: 4,
    symbol: "AAPL",
  },
  {
    cp: "240.3600",
    date: "Wed, 26 Feb 2025 06:00:00 GMT",
    id: 5,
    symbol: "AAPL",
  },
  {
    cp: "237.3000",
    date: "Thu, 27 Feb 2025 06:00:00 GMT",
    id: 6,
    symbol: "AAPL",
  },
  {
    cp: "241.8400",
    date: "Fri, 28 Feb 2025 06:00:00 GMT",
    id: 7,
    symbol: "AAPL",
  },
  {
    cp: "238.0300",
    date: "Mon, 03 Mar 2025 06:00:00 GMT",
    id: 8,
    symbol: "AAPL",
  },
  {
    cp: "235.9300",
    date: "Tue, 04 Mar 2025 06:00:00 GMT",
    id: 9,
    symbol: "AAPL",
  },
  {
    cp: "235.7400",
    date: "Wed, 05 Mar 2025 06:00:00 GMT",
    id: 10,
    symbol: "AAPL",
  },
  {
    cp: "235.3300",
    date: "Thu, 06 Mar 2025 06:00:00 GMT",
    id: 11,
    symbol: "AAPL",
  },
  {
    cp: "239.0700",
    date: "Fri, 07 Mar 2025 06:00:00 GMT",
    id: 12,
    symbol: "AAPL",
  },
  {
    cp: "227.4800",
    date: "Mon, 10 Mar 2025 05:00:00 GMT",
    id: 13,
    symbol: "AAPL",
  },
  {
    cp: "220.8400",
    date: "Tue, 11 Mar 2025 05:00:00 GMT",
    id: 14,
    symbol: "AAPL",
  },
  {
    cp: "216.9800",
    date: "Wed, 12 Mar 2025 05:00:00 GMT",
    id: 15,
    symbol: "AAPL",
  },
  {
    cp: "209.6800",
    date: "Thu, 13 Mar 2025 05:00:00 GMT",
    id: 16,
    symbol: "AAPL",
  },
  {
    cp: "213.4900",
    date: "Fri, 14 Mar 2025 05:00:00 GMT",
    id: 17,
    symbol: "AAPL",
  },
  {
    cp: "214.0000",
    date: "Mon, 17 Mar 2025 05:00:00 GMT",
    id: 18,
    symbol: "AAPL",
  },
  {
    cp: "212.6900",
    date: "Tue, 18 Mar 2025 05:00:00 GMT",
    id: 19,
    symbol: "AAPL",
  },
  {
    cp: "215.2400",
    date: "Wed, 19 Mar 2025 05:00:00 GMT",
    id: 20,
    symbol: "AAPL",
  },
  {
    cp: "214.1000",
    date: "Thu, 20 Mar 2025 05:00:00 GMT",
    id: 21,
    symbol: "AAPL",
  },
  {
    cp: "218.2700",
    date: "Fri, 21 Mar 2025 05:00:00 GMT",
    id: 22,
    symbol: "AAPL",
  },
];

const companyData = {
  company_name: "The Goldman Sachs Group, Inc.",
  description:
    "The Goldman Sachs Group, Inc., a financial institution, provides a range of financial services for corporations, financial institutions, governments, and individuals worldwide. It operates through four segments: Investment Banking, Global Markets, Asset Management, and Consumer & Wealth Management. The company's Investment Banking segment provides financial advisory services, including strategic advisory assignments related to mergers and acquisitions, divestitures, corporate defense activities, restructurings, and spin-offs; and middle-market lending, relationship lending, and acquisition financing, as well as transaction banking services. This segment also offers underwriting services, such as equity underwriting for common and preferred stock and convertible and exchangeable securities; and debt underwriting for various types of debt instruments, including investment-grade and high-yield debt, bank and bridge loans, and emerging-and growth-market debt, as well as originates structured securities. Its Global Markets segment is involved in client execution activities for cash and derivative instruments; credit and interest rate products; and provision of equity intermediation and equity financing, clearing, settlement, and custody services, as well as mortgages, currencies, commodities, and equities related products. The company's Asset Management segment manages assets across various classes, including equity, fixed income, hedge funds, credit funds, private equity, real estate, currencies, and commodities; and provides customized investment advisory solutions, as well as invests in corporate, real estate, and infrastructure entities. Its Consumer & Wealth Management segment offers wealth advisory and banking services, including financial planning, investment management, deposit taking, and lending; private banking; and unsecured loans, as well as accepts saving and time deposits. The company was founded in 1869 and is headquartered in New York, New York.",
  id: 30,
  image: "https://images.financialmodelingprep.com/symbol/GS.png",
  industry: "Financial - Capital Markets",
  market_cap: 173350146060,
  price: {
    current_price: 555.4454,
    id: 30,
    percentage_change: -0.047615,
    previous_price: 555.71,
    symbol: "GS",
    updated_at: "2025-03-21T14:43:29.024452+00:00",
  },
  sector: "Financial Services",
  symbol: "GS",
  website: "https://www.goldmansachs.com",
};

const userStock = [
  [
    {
      id: 1,
      quantity: "5.000000",
      symbol: "NVDA",
    },
    {
      id: 2,
      quantity: "3.000000",
      symbol: "AAPL",
    },
    {
      id: 3,
      quantity: "3.000000",
      symbol: "MCD",
    },
    {
      id: 4,
      quantity: "9.000000",
      symbol: "SONY",
    },
    {
      id: 5,
      quantity: "9.000000",
      symbol: "UBER",
    },
    {
      id: 6,
      quantity: "13.000000",
      symbol: "SHOP",
    },
  ],
];

export { chartData, companyData, userStock };

export type { StockData, StockIntroProp };
