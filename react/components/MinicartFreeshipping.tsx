import React, { useEffect, useCallback, useState } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import styles from './MinicartFreeshipping.css'
import { FormattedMessage } from 'react-intl'

interface Props {
  minFreightValue: number
}

const MinicartFreeshipping: StorefrontFC<Props> = ({ minFreightValue }) => {
  const [shippingFreePercentage, setShippingFreePercentage] = useState(0)
  const [differenceBetwenValues, setDifferenceBetwenValues] = useState(0)

  const {
    orderForm: { value },
  } = useOrderForm()

  useEffect(() => {
    handleUpdateMinicartValue(value)
  }, [value])

  const handleUpdateMinicartValue = useCallback(
    value => {
      setShippingFreePercentage(Math.round(value / minFreightValue))
      setDifferenceBetwenValues(minFreightValue - value / 100)
    },
    [setShippingFreePercentage, setDifferenceBetwenValues]
  )

  return (
    <div className={styles.freigthScaleContainer}>
      <span>
        {' '}
        <div className={styles.text1}>
          <FormattedMessage id="store/minicartbar.text1" />{' '}
          <span className={styles.text2}>
            <FormattedMessage id="store/minicartbar.text2" />
          </span>
        </div>{' '}
      </span>
      <div className={styles.sliderContainer}>
        <div
          className={styles.barContainer}
          style={{
            width: `${shippingFreePercentage < 100 ? shippingFreePercentage : 100}%`
          }}
        />
      </div>
      {differenceBetwenValues > 0 ? (
        <p className={styles.sliderText}>
          <span className={styles.text3}>
            <FormattedMessage id="store/minicartbar.text3" />{' '}
          </span>
          <span className={styles.currencyText}>
            {Math.max(0, differenceBetwenValues).toLocaleString('en-GB', {
              style: 'currency',
              currency: 'EUR',
            })}
            {' '}
          ! </span>
        </p>
      ) : (
          <p className={styles.text4}>

            <FormattedMessage id="store/minicartbar.text4" />
          </p>
        )}
    </div>
  )
}

MinicartFreeshipping.defaultProps = {
  minFreightValue: 200,
}

MinicartFreeshipping.schema = {
  title: 'Minicart Freight Scale',
  description: 'Minicart Freight Scale',
  type: 'object',
  properties: {
    minFreightValue: {
      title: 'Establecer el valor mínimo para envío gratis',
      type: 'number',
    },
  },
}

export default MinicartFreeshipping
