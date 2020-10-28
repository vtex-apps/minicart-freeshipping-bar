import React, { useEffect, useCallback, useState, FunctionComponent } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import styles from './MinicartFreeshipping.css'
import { useQuery } from 'react-apollo'
import AppSettings from './minicartbarSettings.graphql'
import { FormattedMessage } from 'react-intl'
interface SettingsProps {
  settings: Settings
}
interface Settings {
  freeShippingAmount: number
  currencyFormat: string
  localeSelector: string
}

const MinimumFreightValue: FunctionComponent<SettingsProps> = ({ settings, }) => {
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
      setShippingFreePercentage(Math.round(value / settings.freeShippingAmount))
      setDifferenceBetwenValues(settings.freeShippingAmount - value / 100)
    },
    [setShippingFreePercentage, setDifferenceBetwenValues]
  )
  if (differenceBetwenValues == settings.freeShippingAmount) {
    return (
      <div className={styles.freigthScaleContainer}>
        <div className={styles.text0}>
          <FormattedMessage id="store/minicartbar.text0" />{''}

          <span className={styles.currencyText}>
            {Math.max(0, differenceBetwenValues).toLocaleString(settings.localeSelector, {
              style: 'currency',
              currency: settings.currencyFormat,
            })}
            {' '}
              ! </span>
        </div>

      </div>

    )

  } else {
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
              {Math.max(0, differenceBetwenValues).toLocaleString(settings.localeSelector, {
                style: 'currency',
                currency: settings.currencyFormat,
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

}

const MinicartFreeshipping: FunctionComponent = () => {
  const { data } = useQuery(AppSettings, { ssr: false })

  if (!data?.appSettings?.message) return null

  const settings = JSON.parse(data.appSettings.message)

  if (!settings.freeShippingAmount) {
    console.warn(
      'No Free Shipping amount set'
    )

    return null
  }
  return <MinimumFreightValue settings={settings} />
}
export default MinicartFreeshipping
