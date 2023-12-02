import React from 'react';
import flags from '../../consts/flags';
import styles from './styles.module.scss';
import styled from 'styled-components';

const CurrencyFlag = (props) => {
  const {
    currency,
    width,
    height
  } = props;

  const StyledImg = styled.div`
    width: ${props => props.$width || 16}px;
    height: ${props => props.$height || 10}px;
  `;
  return (
    <StyledImg $width={width} $height={height} className={styles['currencyFlag']}>
      <img src={flags[currency.toLowerCase()]} alt="Currency Flag"/>
    </StyledImg>
  )
};

export default CurrencyFlag;

