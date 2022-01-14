import type { FunctionComponent } from 'react'
import React, { useEffect, useCallback, useState } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useRuntime } from 'vtex.render-runtime'
import { useQuery } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'
import { IOMessageWithMarkers } from 'vtex.native-types'

import styles from './MinicartFreeshipping.css'
import AppSettings from './minicartbarSettings.graphql'

interface MinicartFreeshippingProps {
  markers?: string[]
  emptyCartMessage?: string
  message?: string
}
interface SettingsProps extends MinicartFreeshippingProps {
  settings: BindingBoundedSettings
}

interface BindingBoundedSettings extends Settings {
  bindingBounded?: boolean
  settings?: [Settings]
}

interface Settings {
  bindingId: string
  freeShippingAmount: number
}

type ValueTypes = 'Discounts' | 'Items'

const MinimumFreightValue: FunctionComponent<SettingsProps> = ({
  settings,
  markers = [],
  emptyCartMessage = "store/minicartbar.text0",
  message = "store/minicartbar.text3"
}) => {
  const { binding } = useRuntime()
  const [shippingFreePercentage, setShippingFreePercentage] = useState(0)
  const [differenceBetwenValues, setDifferenceBetwenValues] = useState(0)
  const [freeShippingAmount, setFreeShippingAmount] = useState(0)
  const {
    orderForm: { totalizers },
  } = useOrderForm()

  useEffect(() => {
    if (settings.bindingBounded) {
      const findAmountForBinding = settings.settings?.find(
        item => item.bindingId === binding?.id
      )?.freeShippingAmount

      if (findAmountForBinding) setFreeShippingAmount(findAmountForBinding)
    } else {
      setFreeShippingAmount(settings.freeShippingAmount)
    }
  }, [binding])

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
          <IOMessageWithMarkers 
                message={emptyCartMessage}
                markers={markers}
                handleBase="currency" 
                values={{
                  diference: (
                    <FormattedCurrency key="text0" value={Math.max(0, differenceBetwenValues)} />
                  )
                }}
              />
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
              <IOMessageWithMarkers 
                message={message}
                markers={markers}
                handleBase="currency" 
                values={{
                  diference: (
                  <span key="text3" className={styles.currencyText}>
                    <FormattedCurrency
                      value={Math.max(0, differenceBetwenValues)}
                    />
                  </span>)
                }}
              />
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

const MinicartFreeshipping: FunctionComponent<MinicartFreeshippingProps> = ({message, emptyCartMessage,markers }) => {
  const { data } = useQuery(AppSettings, { ssr: false })
  const { binding } = useRuntime()

  if (!data?.appSettings?.message) return null

  const settings = JSON.parse(data.appSettings.message)

  if (!settings.bindingBounded && !settings.freeShippingAmount) {
    console.warn('No Free Shipping amount set')

    return null
  }

  const isAmountSetForBinding = settings.settings?.find(
    item => item.bindingId === binding?.id
  )?.freeShippingAmount

  if (settings.bindingBounded && !isAmountSetForBinding) {
    console.warn('No Free Shipping amounts for multi binding store set')

    return null
  }

  return <MinimumFreightValue settings={settings} markers={markers} emptyCartMessage={emptyCartMessage} message={message}/>
}

export default MinicartFreeshipping
