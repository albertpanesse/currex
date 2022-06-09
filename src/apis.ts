export const convert = async function(from: string, to: string, amount: number): Promise<ConvertResult> {
  const baseResponse: any = await fetch(`${process.env.REACT_APP_EXCHANGE_API_URL}/convert?from=${from}&to=${to}&amount=1`, {
    headers: {
      apikey: `${process.env.REACT_APP_EXCHANGE_API_KEY}`
    }
  });
  const baseResult: ApiConvertResponse = await baseResponse.json();

  const customResponse: any = await fetch(`${process.env.REACT_APP_EXCHANGE_API_URL}/convert?from=${from}&to=${to}&amount=${amount}`, {
    headers: {
      apikey: `${process.env.REACT_APP_EXCHANGE_API_KEY}`
    }
  });
  const customResult: ApiConvertResponse = await customResponse.json();

  return {
    from: customResult.query.from,
    to: customResult.query.to,
    amount: customResult.query.amount,
    result: customResult.result,
    base: baseResult.result,
  };
};
