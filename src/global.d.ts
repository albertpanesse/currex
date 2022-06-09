export {};

declare global {
  interface NameSymbol {
    name: string;
    symbol: string;
  }
  
  interface ApiConvertResponse {
    date: string;
    historical: string;
    info: {
      rate: number;
      timestamp: number;
    };
    query: {
      amount: number;
      from: string;
      to: string;
    };
    result: number;
    success: boolean;
  }

  interface ConvertResult {
    from: string;
    to: string;
    amount: number;
    result: number;
    base: number;
  }
}
