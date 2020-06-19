import { ExtensionPoint } from 'vtex.render-runtime'

import React from 'react'
import { injectIntl } from 'react-intl'

import styles from './BuyButton.css'

const BuyButton = props => {
  return (
    <div className={styles.buyButtonRow}>
      <div className={styles.buyButton}>
        <ExtensionPoint
          id="add-to-cart-button"
          text={props.intl.formatMessage({
            id: 'store/buy-button',
          })}
          unavailableText={props.intl.formatMessage({
            id: 'store/buy-unavailable',
          })}
        />
      </div>
      <div className={styles.addToCartButton}>
        <ExtensionPoint
          id="add-to-cart-button"
          text={props.intl.formatMessage({
            id: 'store/add-to-cart-button',
          })}
          unavailableText={props.intl.formatMessage({
            id: 'store/buy-unavailable',
          })}
        />
      </div>
    </div>
  )
}

export default injectIntl(BuyButton)
