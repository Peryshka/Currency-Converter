import styles from './styles.module.scss';
import Button from "../components/button";
import {useState, useEffect} from 'react';
import CustomSelect from "../components/select/index";
import EnterAmount from "../components/enterAmount";
import {IoMdSwap} from "react-icons/io";
import Result from "../components/result";
import {REQUEST_HEADERS} from "../api/endpoints";
import {API} from '../api/endpoints';
import clsx from 'clsx';

function App() {
  const [fromOption, setFromOption] = useState(null);
  const [toOption, setToOption] = useState(null);
  const [symbolsOptions, setSymbolsOptions] = useState([]);
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSwap = () => {
    setFromOption(toOption);
    setToOption(fromOption);
  };
  const getSymbols = async () => {
    const res = await fetch(API.CURRENCY.symbols, REQUEST_HEADERS);
    const data = await res.json();
    return data.symbols;
  }

  const transformSymbolsDataToOptions = (symbolObj) => {
    return Object.keys(symbolObj).map(item => {
      return {
        value: item,
        label: item
      }
    })
  }

  const handleConvertCurrency = async() => {
    if(!amount || !toOption || !fromOption){
     setError('Please fill in fields amount, from and to!');
      return;
    } else {
      setError('');
    }
    setIsLoading(true);
    try {
      const res = await fetch(API.CURRENCY.convert(toOption.value, fromOption.value, amount), REQUEST_HEADERS)
      const data = await res.json()
      setIsLoading(false);
      setResult({
        amount: data.query.amount,
        result: data.result,
        from: data.query.from,
        to: data.query.to,
      })
    }catch(err) {
     setError(err);
    }
  }

  const isBtnDisabled = amount === '' || fromOption === null || toOption === null;
  useEffect(() => {
    (async() => {
      const symbols = await getSymbols();
      const options = transformSymbolsDataToOptions(symbols);
      setSymbolsOptions(options);
    })()
  }, [])
  return (
    <div className={styles['currency-converter-wrap']}>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>Currency Converter</h1>
      </div>
      <EnterAmount
        type="number"
        label="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className={styles.amountInput}
      />
      <div className={styles.selectWrap}>
        <CustomSelect
          label="From"
          value={fromOption}
          onChange={val => setFromOption(val)}
          options={symbolsOptions}
        />
        <div className={styles.iconWrap} onClick={handleSwap}>
          <IoMdSwap className={styles.swapIcon}/>
        </div>
        <CustomSelect
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
      {error && (
        <h3 className={styles.error}>{error}</h3>
      )}
      <Button
        onClick={handleConvertCurrency}
        className={clsx(styles['convert-btn'], {'disabled': isBtnDisabled})}
        disabled={isBtnDisabled}
      >
        {isLoading && (
          <i className ="fa fa-spinner fa-spin" ></i>
        )}
        Convert
      </Button>
    </div>
  );
}
export default App;



