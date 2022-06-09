import React, { useState } from 'react';
import objectHash from 'object-hash';

import { convert } from '../../apis';
import { currencies } from '../../consts';

import './style.scss';

export const Exchange = function () {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInput, setIsInput] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(1);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [convertResults, setConvertResults] = useState<ConvertResult[]>();

  const onAdd = () => {
    setIsInput(true);
  };

  const onDel = (key: string) => {
    if (convertResults) {
      const filteredConvertResults: ConvertResult[] = convertResults.filter(result => result.to !== key);
      setConvertResults(filteredConvertResults);  
    }
  };

  const onChange = (val: string) => {
    setSelectedCurrency(val);
  };

  const onSubmit = async () => {
    setIsInput(false);
    setIsLoading(true);

    const _convertResult: ConvertResult = await convert('USD', selectedCurrency, amount);
    if (_convertResult) {
      const _convertResults = convertResults ? [...convertResults] : [];
      _convertResults.push(_convertResult);
  
      setConvertResults(_convertResults);  
      setIsLoading(false);
    }
  };

  return (
    <div className='exchange'>
      <div className='card'>
        <div className='card-header'>
          <div className='currency'>USD - United State Dollars</div>
          <div className='amount'>
            <span>USD</span>
            <input type="text" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
          </div>
        </div>
        <div className='card-body'>
          <div className='convert-result-list'>
            {convertResults && convertResults.map((result: ConvertResult) => (
              <div key={`result-${objectHash(result)}`} className='card'>
                <div className='row'>
                  <div className='col-11'>
                    <div className='amount'>
                      <span>{result.to}</span>
                      <span>{result.result}</span>
                    </div>
                    <div className='currency'>{currencies.filter(curr => curr.symbol === result.to).map(curr => `${curr.symbol} - ${curr.name}`)}</div>
                    <div className='base'>1 {result.from} = {result.to} {result.base}</div>
                  </div>
                  <div className='col-1'>
                    <button type='button' className='btn btn-default fillsize' onClick={() => onDel(result.to)}>( - )</button>
                  </div>
                </div>
              </div>
            ))}
            {(!convertResults || convertResults.length === 0) && !isLoading && <span className='warning'>No result</span>}
            {isLoading && <div className='loader'><i className="fa fa-spinner rotate" aria-hidden="true"></i></div>}
          </div>
          <div className='new-currency'>
            <button className={`btn btn-primary${isInput ? ' hidden' : ''}`} onClick={onAdd}>( + ) Add More Currencies</button>
            <div className={`input-group${isInput ? '' : ' hidden'}`}>
              <select className='form-control' onChange={(e) => onChange(e.target.value)}>
                {currencies.map((currency: NameSymbol) => <option key={`curr-${objectHash(currency)}`} value={currency.symbol}>{currency.name}</option>)}
              </select>
              <button type='button' className='btn btn-outline-secondary' onClick={onSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
