import ProductActions from "@modules/products/components/product-actions"
import ProductDetails from "@modules/products/components/product-details"
import React from "react"
import { Product } from "types/medusa"

type ProductInfoProps = {
  product: Product
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="lg:pr-8" id="product-info">
      <div className="flex flex-col gap-y-12 lg:max-w-[440px] ">
        <div>
          <ProductActions product={product} />
        </div>
        <div>
          <ProductDetails product={product} />
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
