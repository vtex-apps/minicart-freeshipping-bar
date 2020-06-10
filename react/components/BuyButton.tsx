import { ExtensionPoint } from 'vtex.render-runtime'

import React from 'react'
// import { Container } from './styles';

const BuyButton = () => {
  return (
    <div>
      <ExtensionPoint id="rich-text" />
      <ExtensionPoint id="add-to-cart-button" />
    </div>
  )
}

export default BuyButton
