import React from 'react';
import styles from './style.module.scss';
import clsx from 'clsx';

const Button = (props) => {
  const {
    children,
    type = 'button',
    onClick,
    className,
    disabled
  } = props;
  const mainClasses = clsx(
    styles.convertBtn,
    className,
    {'disabled': disabled}
  );

  return (
    <button type={type}
            onClick={onClick}
            className={mainClasses}
            disabled={disabled}
    >
      {children}
    </button>
  )
};

export default Button;

