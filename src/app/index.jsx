import styles from './styles.module.scss';
import Button from "../components/button";
import React, {useState, useEffect} from 'react';
import EnterAmount from "../components/enterAmount";
import {IoMdSwap} from "react-icons/io";
import Result from "../components/result";
import {REQUEST_HEADERS} from "../api/endpoints";
import {API} from '../api/endpoints';
import CurrencySelect from "../components/currency-select/index";
import ContentLoader from "react-content-loader";

function App() {
  const [fromOption, setFromOption] = useState(null);
  const [toOption, setToOption] = useState(null);
  const [symbolsOptions, setSymbolsOptions] = useState([]);
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneralLoading, setIsGeneralLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSwap = () => {
    setFromOption(toOption);
    setToOption(fromOption);
  };


  const getSymbols = async () => {
    try {
      setIsGeneralLoading(true);
      const res = await fetch(API.CURRENCY.symbols, REQUEST_HEADERS);
      const data = await res.json();
      return data.symbols;
    } catch (err) {
      console.log('Ошибка при получении данных:', err);
    } finally {
      setIsGeneralLoading(false);
    }
  }

  useEffect(() => {
    getSymbols();
  }, []);


  const transformSymbolsDataToOptions = (symbolObj) => {
    return Object.keys(symbolObj).map(item => {
      return {
        value: item,
        label: item
      }
    })
  }

  const handleConvertCurrency = async () => {
    if (!amount || !toOption || !fromOption) {
      setError('Please fill in fields amount, from and to!');
      setTimeout(() => {
        setError('');
      }, 4000);
      return;
    } else {
      setError('');
    }
    setIsLoading(true);
    try {
      const res = await fetch(API.CURRENCY.convert(toOption.value, fromOption.value, amount), REQUEST_HEADERS)
      const data = await res.json()
      setResult({
        amount: data.query.amount,
        result: data.result,
        from: data.query.from,
        to: data.query.to,
      })
    } catch (err) {
      console.log('Ошибка при получении данных:', err);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setAmount('');
        setFromOption('');
        setToOption('');
        setResult('');
      }, 7000);
    }
  }
  useEffect(() => {
    (async () => {
      const symbols = await getSymbols();
      const options = transformSymbolsDataToOptions(symbols);
      setSymbolsOptions(options);
    })()
  }, [])
  const isBtnDisabled = amount === '' || fromOption === null || toOption === null ;
  return (
    <div className={styles['currency-converter-wrap']}>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>Currency Converter</h1>
      </div>
      <div className={styles.loading}>
        {isGeneralLoading ? (
          <ContentLoader
            viewBox="0 0 400 160"
            height={160}
            width={400}
            backgroundColor="transparent"
          >
            <circle cx="150" cy="86" r="8" />
            <circle cx="194" cy="86" r="8" />
            <circle cx="238" cy="86" r="8" />
          </ContentLoader>
          ) :
          <div>
            <EnterAmount
              type="number"
              label="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={styles.amountInput}
            />
            <div className={styles.selectWrap}>
              <CurrencySelect
                label="From"
                value={fromOption}
                onChange={val => setFromOption(val)}
                options={symbolsOptions}
              />
              <div className={styles.iconWrap} onClick={handleSwap}>
                <IoMdSwap className={styles.swapIcon}/>
              </div>
              <CurrencySelect
                label="To"
                value={toOption}
                onChange={val => setToOption(val)}
                options={symbolsOptions}
              />
            </div>
            <Result/>
            <div className={styles.result}>
              {result && `${amount} ${result.from} = ${result.result} ${result.to}`}
            </div>
            {
              error && (
                <h3 className={styles.error}>{error}</h3>
              )
            }
            <Button
              onClick={handleConvertCurrency}
              disabled={isBtnDisabled}
            >
              {isLoading && (
                <i className="fa fa-spinner fa-spin"></i>
              )}
              Convert
            </Button>
          </div>
        }
      </div>
    </div>
  );
}

export default App;



