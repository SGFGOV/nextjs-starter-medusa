import { Product } from "@medusajs/medusa"
import isEqual from "lodash/isEqual"
import { useEffect, useMemo, useState } from "react"

export const useProductSelect = (
  product: Pick<Product, "options" | "variants">
) => {
  const [options, setOptions] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const { variants } = product

  useEffect(() => {
    const optionObj: Record<string, string> = {}
    for (const option of product.options) {
      Object.assign(optionObj, { [option.id]: undefined })
    }
    setOptions(optionObj)
  }, [product])

  const variantMap = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}

    for (const variant of variants) {
      const tmp: Record<string, string> = {}

      for (const option of variant.options) {
        tmp[option.option_id] = option.value
      }

      map[variant.id] = tmp
    }

    return map
  }, [variants])

  const variant = useMemo(() => {
    let variantId: string | undefined = undefined

    for (const key of Object.keys(variantMap)) {
      if (isEqual(variantMap[key], options)) {
        variantId = key
      }
    }

    return product.variants.find((v) => v.id === variantId)
  }, [options, variantMap, product.variants])

  const updateOptions = (update: Record<string, string>) => {
    setOptions({ ...options, ...update })
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity - 1 > 0) {
      setQuantity(quantity - 1)
    }
  }

  const resetOptions = () => {
    const optionObj = {}
    for (const option of product.options) {
      Object.assign(optionObj, { [option.id]: undefined })
    }
    setOptions(optionObj)
    setQuantity(1)
  }

  return {
    variant,
    options,
    quantity,
    actions: {
      updateOptions,
      increaseQuantity,
      decreaseQuantity,
      resetOptions,
    },
  }
}
