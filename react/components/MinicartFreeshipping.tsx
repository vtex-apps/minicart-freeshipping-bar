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

    const handleCloseMinicart = () => {
        const minicartCloseButton: any = document.querySelector(
            '.vtex-minicart-2-x-closeIconButton'
        )

        minicartCloseButton.click()
    }

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
            <div className={styles.sliderContainer}>
                <div
                    style={{
                        width: `${
                            shippingFreePercentage < 100
                                ? shippingFreePercentage
                                : 100
                            }%`,
                        background: 'black',
                        height: 10,
                        transition: 'width 1s',
                    }}
                />
            </div>
            {differenceBetwenValues > 0 ? (
                <p className={styles.sliderText}>
                    Faltam{' '}
                    <strong style={{ fontSize: '20px' }}>
                        {Math.max(0, differenceBetwenValues).toLocaleString(
                            'pt-br',
                            {
                                style: 'currency',
                                currency: 'BRL',
                            }
                        )}
                    </strong>{' '}
                    para ganhar frete grátis
                </p>
            ) : (
                    <p className={styles.sliderText}>
                        <strong>Você ganhou frete grátis</strong>
                    </p>
                )}
            <p className={styles.keepBuyingText} onClick={handleCloseMinicart}>
                continuar comprando
            </p>
        </div>
    )
}

MinicartFreeshipping.defaultProps = {
    minFreightValue: 500,
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
