import React, { useEffect, useCallback, useState } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'

import styles from './MinicartFreeshipping.css'

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
        ¡Completa tu pedido para teñer <strong>Envio GRATIS 24!</strong>{' '}
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
          ¡Solo te quedan{' '}
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
          <strong>¡Ganaste envío gratis!</strong>
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
      title: 'Valor mínimo para Frete Grátis',
      type: 'number',
    },
  },
}

export default MinicartFreeshipping
