import type { FunctionComponent } from 'react'
import React, { useEffect, useCallback, useState } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useRuntime } from 'vtex.render-runtime'
import { useQuery } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'
import { useRenderSession } from 'vtex.session-client'
import styles from './MinicartFreeshipping.css'
import AppSettings from './minicartbarSettings.graphql'

interface SettingsProps {
  settings: BindingBoundedSettings
}

interface BindingBoundedSettings extends Settings {
  bindingBounded?: boolean
  freeShippingTradePolicies: [freeShippingProps]
  settings?: [Settings]
}
interface freeShippingProps {
  freeShippingAmount: number
  tradePolicy: string
}
interface Settings {
  bindingId: string
  freeShippingAmount: number
}

type ValueTypes = 'Discounts' | 'Items'

const MinimumFreightValue: FunctionComponent<SettingsProps> = ({
  settings,
}) => {
  const { binding } = useRuntime()
  const { session } = useRenderSession()
  const [shippingFreePercentage, setShippingFreePercentage] = useState(0)
  const [differenceBetwenValues, setDifferenceBetwenValues] = useState(0)
  const [freeShippingAmount, setFreeShippingAmount] = useState(0)
  const {
    orderForm: { totalizers },
  } = useOrderForm()

  const getChannel = async (salesChannel) => {
    settings.freeShippingTradePolicies.map(({freeShippingAmount, tradePolicy}) => {
      if (salesChannel === tradePolicy) {
        setFreeShippingAmount(freeShippingAmount)
      }
    })
  }

  useEffect(() => {
    if (settings.bindingBounded) {
      const findAmountForBinding = settings.settings?.find(
        item => item.bindingId === binding?.id
      )?.freeShippingAmount

      if (findAmountForBinding) setFreeShippingAmount(findAmountForBinding)
    } else {
      if (session?.namespaces) {
        getChannel(session?.namespaces?.store?.channel?.value)
      }
    }
  }, [binding, session])

  const handleUpdateMinicartValue = useCallback(
    val => {
      setShippingFreePercentage(Math.round(val / freeShippingAmount))
      setDifferenceBetwenValues(freeShippingAmount - val / 100)
    },
    [freeShippingAmount]
  )

  const getValues = (idValue: ValueTypes): number =>
    totalizers?.find(({ id }) => id === idValue)?.value ?? 0

  const finalValue = getValues('Items') + getValues('Discounts')

  useEffect(() => {
    handleUpdateMinicartValue(finalValue)
  }, [handleUpdateMinicartValue, finalValue])

  return (
    <div className={styles.freigthScaleContainer}>
      {differenceBetwenValues === freeShippingAmount ? (
        <div className={styles.text0}>
          <FormattedMessage id="store/minicartbar.text0" />
          <FormattedCurrency value={Math.max(0, differenceBetwenValues)} />!
        </div>
      ) : (
        <>
          {differenceBetwenValues > 0 ? (
            <span>
              <div className={styles.text1}>
                <FormattedMessage id="store/minicartbar.text1" />
                <span className={styles.text2}>
                  <FormattedMessage id="store/minicartbar.text2" />
                </span>
              </div>
            </span>
          ) : null}
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
  const { binding } = useRuntime()

  if (!data?.appSettings?.message) return null
  const settings = JSON.parse(data.appSettings.message)

  if (!settings.bindingBounded && !settings.freeShippingTradePolicies[0].freeShippingAmount) {
    console.warn('No Free Shipping amount set')

    return null
  }
  const isAmountSetForBinding = settings?.settings?.find(
    item => item.bindingId === binding?.id
  )?.freeShippingAmount

  if (settings.bindingBounded && !isAmountSetForBinding) {
    console.warn('No Free Shipping amounts for multi binding store set')

    return null
  }

  return <MinimumFreightValue settings={settings} />
}

export default MinicartFreeshipping
