import React from 'react';
import styles from './style.module.scss';
import Select from 'react-select';
import clsx from 'clsx';

const CustomSelect = (props) => {
  const {
    value,
    onChange,
    options,
    label,
    className
  } = props;

  const selectClassnames = clsx(
    styles['select-wrap'],
    className
  )
  return (
    <div className={selectClassnames}>
      {label && (
        <span className={styles["label"]}>
          {label}
        </span>
      )}
      <Select
        value={value}
        onChange={onChange}
        options={options}
        className={styles.select}
      />
    </div>
  )
};

export default CustomSelect;

