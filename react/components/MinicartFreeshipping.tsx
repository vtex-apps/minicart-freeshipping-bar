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
        <FormattedMessage id="minicartbar.text1" />{' '}
        <strong>
          <FormattedMessage id="minicartbar.text2" />
        </strong>{' '}
      </span>
      <div className={styles.sliderContainer}>
        <div
          className={styles.barContainer}
          style={{
            width: `${
              shippingFreePercentage < 100 ? shippingFreePercentage : 100
            }%`,
            background: '#98e501',
            height: 10,
            transition: 'width 1s',
          }}
        />
      </div>
      {differenceBetwenValues > 0 ? (
        <p className={styles.sliderText}>
          <FormattedMessage id="minicartbar.text3" />{' '}
          <strong style={{ fontSize: '14px' }}>
            {Math.max(0, differenceBetwenValues).toLocaleString('pt-br', {
              style: 'currency',
              currency: 'EUR',
            })}
          </strong>{' '}
          !
        </p>
      ) : (
        <p className={styles.sliderText}>
          <strong>
            <FormattedMessage id="minicartbar.text4" />
          </strong>
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
