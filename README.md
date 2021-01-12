
# Mini Cart Free Shipping Bar

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

The **Mini Cart Free Shipping Bar** is a MiniCart.v2 component that adds a progress bar to the minicart in order to display how much progress a customer has to **win** free shipping. 

This block is **only a visual guide**, meaning it will not make any calculation or deduct the shipping amount from your store. You should pair this app with a **Free Shipping Promotion** of the same **amount**
The **amount** value, can be edited inside the **App Settings**

The app is compatible with 5 different languages including: English, Spanish, Italian, Portuguese and Romanian. 

## Settings
The app has one configurable setting under My Apps section inside VTEX Admin.
The setting is the **amount** for free shipping: expects a number.
This will be the amount customers have to reach for the progress bar to completely fill up. 

## Configuration
You should first install the app on the desired **Account**. To install run: `vtex install vtexeurope.minicart-freeshipping-bar@1.x` inside the Toolbelt. 
After that you should declare the app as a **peerDependency** on your **Manifest** inside your store's **Store Theme**:
```
"peerDependencies": { 
    "vtexeurope.minicart-freeshipping-bar": "1.x"
}
```

After this is completed, you should add the block **minicart-bar** inside your **Store-Theme's Header** under the **MiniCart** section:
```
{
  "minicart.v2": {
    "props": {
      "MinicartIcon": "icon-cart#minicart-icon"
    },
    "children": ["minicart-base-content"]
  },
  "icon-cart#minicart-icon": {
    "props": {
      "size": 24
    }
  },
  "minicart-base-content": {
    "blocks": ["minicart-empty-state"],
    "children": ["minicart-product-list", "flex-layout.row#minicart-footer"]
  },
  "flex-layout.row#minicart-footer": {
    "props": {
      "blockClass": "minicart-footer"
    },
    "children": ["flex-layout.col#minicart-footer"]
  },
  "flex-layout.col#minicart-footer": {
    "children": ["minicart-bar","minicart-summary", "minicart-checkout-button"]
  },
  "minicart-product-list": {
    "blocks": ["product-list#minicart"]
  },
  "product-list#minicart": {
    "blocks": ["product-list-content-mobile"]
  },
  "minicart-summary": {
    "blocks": ["checkout-summary.compact#minicart"]
  },

  "checkout-summary.compact#minicart": {
    "children": ["summary-totalizers#minicart"],
    "props": {
      "totalizersToShow": ["Items", "Discounts"]
    }
  },
  "summary-totalizers#minicart": {
    "props": {
      "showTotal": true,
      "showDeliveryTotal": false
    }
  },
  "minicart-empty-state": {
    "children": ["flex-layout.row#empty-state"]
  },
  "flex-layout.row#empty-state": {
    "children": ["flex-layout.col#empty-state"]
  },
  "flex-layout.col#empty-state": {
    "children": [
      "icon-cart#minicart-empty-state",
      "rich-text#minicart-default-empty-state"
    ],
    "props": {
      "horizontalAlign": "center",
      "verticalAlign": "middle",
      "rowGap": 5
    }
  },
  "icon-cart#minicart-empty-state": {
    "props": {
      "size": 64,
      "blockClass": "minicart-empty-state"
    }
  },
  "rich-text#minicart-default-empty-state": {
    "props": {
      "text": "Your cart is empty."
    }
  }
}
```
## Customization
Here is the list of available CSS Handles you can use on the store
| CSS Handles |
| ----------- | 
| `freigthScaleContainer` | 
| `.sliderContainer` | 
| `.barContainer` | 
| `.sliderText` | 
| `.text0` |
| `.text1` |
| `.text2` |
| `.text3` |
| `.text4` |
| `.currencyText` |
