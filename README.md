
# Mini Cart Free Shipping Bar

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

The **Mini Cart Free Shipping Bar** is a MiniCart.v2 component that adds a progress bar to the minicart in order to display how much progress a customer has to **win** free shipping. 

This block is **only a visual guide**, meaning it will not make any calculation or deduct the shipping amount from your store. You should pair this app with a **Free Shipping Promotion** of the same **amount**
The **amount** value, can be edited inside the **App Settings**

The app is compatible with 5 different languages including: English, Spanish, Italian, Portuguese and Romanian. 

## Settings
The app has three configurable settings under my-apps section on VTEX CMS.
The first setting is the **amount** for free shipping: expects a number. 
The second setting is the **currency**: define using ISO currency  codes which currency will be displayed. Example EUR
The third is the **Locale**: how will the currency format will be presented. example es-ES

## Configuration
You should first install the app on the desired **Account**. To install run: `vtex install vtex.minicart-freeshipping-bar@0.x` inside the Toolbelt. 
You can also install it as a **dependency** on your **Manifest** inside your store's **Store Theme**:
```
"dependencies": { 
    "vtex.minicart-freeshipping-bar": "0.x"
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

The first thing that should be present in this section is the sentence below, showing users the recipe pertaining to CSS customization in blocks:

Thereafter, you should add a single column table with the available CSS handles for that block:

| CSS Handles |
| ----------- | 
| `freigthScaleContainer` | 
| `.sliderContainer` | 
| `.barContainer` | 
| `.sliderText` | 
| `.text1` |
| `.text2` |
| `.text3` |
| `.text4` |
| `.currencyText` |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
