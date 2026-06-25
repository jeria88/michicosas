import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) return null

  return (
    <>
      {price.price_type === "sale" && (
        <span
          className="line-through text-[#8A8175] text-xs"
          data-testid="original-price"
        >
          {price.original_price}
        </span>
      )}
      <span
        className="text-[#C9A96E] text-sm font-medium"
        data-testid="price"
      >
        {price.calculated_price}
      </span>
    </>
  )
}
