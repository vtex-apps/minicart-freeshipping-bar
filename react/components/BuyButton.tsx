import { ExtensionPoint } from 'vtex.render-runtime'

import React from 'react'
import { intl } from 'react-intl'
// import { Container } from './styles';

const BuyButton: React.FC = () => {
  return (
    <div>
      <ExtensionPoint
        id="add-to-cart-button"
        text={intl.formatMessage({
          id: 'store/add-to-cart-button',
        })}
        textUnavailable={intl.formatMessage({
          id: 'store/add-to-cart-button-unavailable',
        })}
      />
      <ExtensionPoint
        id="add-to-cart-button"
        text={intl.formatMessage({
          id: 'store/buy-button',
        })}
        textUnavailable={intl.formatMessage({
          id: 'store/buy-button-unavailable',
        })}
      />
    </div>
  )
}

export default BuyButton
