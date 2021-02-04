import React, {
  useEffect,
  useCallback,
  useState,
  FunctionComponent,
} from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useQuery } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'

import styles from './MinicartFreeshipping.css'
import AppSettings from './minicartbarSettings.graphql'

interface SettingsProps {
  settings: Settings
}
interface Settings {
  freeShippingAmount: number
}

const MinimumFreightValue: FunctionComponent<SettingsProps> = ({
  settings,
}) => {
  const [shippingFreePercentage, setShippingFreePercentage] = useState(0)
  const [differenceBetwenValues, setDifferenceBetwenValues] = useState(0)
  const {
    orderForm: { totalizers, value },
  } = useOrderForm()

  const handleUpdateMinicartValue = useCallback(
    val => {
      setShippingFreePercentage(Math.round(val / settings.freeShippingAmount))
      setDifferenceBetwenValues(settings.freeShippingAmount - val / 100)
    },
    [settings.freeShippingAmount]
  )

  const valueWithDiscount = value
    ? Number(totalizers[0]?.value) + Number(totalizers[1]?.value)
    : value

  useEffect(() => {
    handleUpdateMinicartValue(valueWithDiscount)
  }, [handleUpdateMinicartValue, valueWithDiscount])

  return (
    <div className={styles.freigthScaleContainer}>
      {differenceBetwenValues === settings.freeShippingAmount ? (
        <div className={styles.text0}>
          <FormattedMessage id="store/minicartbar.text0" />
          <FormattedCurrency value={Math.max(0, differenceBetwenValues)} />!
        </div>
      ) : (
        <>
          <span>
            <div className={styles.text1}>
              <FormattedMessage id="store/minicartbar.text1" />
              <span className={styles.text2}>
                <FormattedMessage id="store/minicartbar.text2" />
              </span>
            </div>
          </span>
          <div className={styles.sliderContainer}>
            <div
              className={styles.barContainer}
              style={{
                width: `${
                  shippingFreePercentage < 100 ? shippingFreePercentage : 100
                }%`,
              }}
            />
          </div>
          {differenceBetwenValues > 0 ? (
            <p className={styles.sliderText}>
              <span className={styles.text3}>
                <FormattedMessage id="store/minicartbar.text3" />{' '}
              </span>

              <span className={styles.currencyText}>
                <FormattedCurrency
                  value={Math.max(0, differenceBetwenValues)}
                />
                !
              </span>
            </p>
          ) : (
            <p className={styles.text4}>
              <FormattedMessage id="store/minicartbar.text4" />
            </p>
          )}
        </>
      )}
    </div>
  )
}

const MinicartFreeshipping: FunctionComponent = () => {
  const { data } = useQuery(AppSettings, { ssr: false })

  if (!data?.appSettings?.message) return null

  const settings = JSON.parse(data.appSettings.message)

  if (!settings.freeShippingAmount) {
    console.warn('No Free Shipping amount set')

    return null
  }
  return <MinimumFreightValue settings={settings} />
}
export default MinicartFreeshipping
