import { clx } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  return (
    <div className="flex flex-col">
      <span
        className={clx("text-2xl font-cormorant font-light text-[#C9A96E]", {
          "text-[#C9A96E]": selectedPrice.price_type === "sale",
        })}
      >
        {!variant && (
          <span className="text-xs tracking-widest text-[#8A8175] uppercase mr-2">Desde</span>
        )}
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </span>
      {selectedPrice.price_type === "sale" && (
        <>
          <p className="mt-1">
            <span className="text-xs text-[#8A8175] tracking-widest uppercase">Original: </span>
            <span
              className="line-through text-[#8A8175] text-sm"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {selectedPrice.original_price}
            </span>
          </p>
          <span className="text-[#C9A96E] text-sm mt-1">
            -{selectedPrice.percentage_diff}%
          </span>
        </>
      )}
    </div>
  )
}
