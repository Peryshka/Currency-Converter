import React from 'react';
import styles from './style.module.scss';
import clsx from 'clsx';

const Button = (props) => {
  const {
    children,
    className,
    type = 'button',
    onClick
  } = props;

  const mainClasses = clsx(
    styles.button,
    className
  );
  return (
    <button type={type}
            onClick={onClick}
            className={mainClasses}>
      {children}
    </button>
  )
};

export default Button;

