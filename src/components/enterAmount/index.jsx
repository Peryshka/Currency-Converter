import React from 'react';
import styles from './amount.module.scss';
import clsx from 'clsx';

const EnterAmount = (props) => {
  const {
    value,
    onChange,
    label,
    className,
    disabled
  } = props;

  const disabledInput = clsx(
    styles.amountInput,
    className,
    {'disabledInput' : disabled}
  );

  return (
    <div className={styles.inputWrap}>
      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}
      <input
        value={value}
        onChange={onChange}
        className={disabledInput}
        disabled={disabled}
      />
    </div>
  )
};

export default EnterAmount;

