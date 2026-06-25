import { clx } from "@medusajs/ui"
import Image from "next/image"
import React from "react"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    <div
      className={clx(
        "relative w-full overflow-hidden bg-[#1A1A1A]",
        className,
        {
          "aspect-[11/14]": isFeatured,
          "aspect-[9/16]": !isFeatured && size !== "square",
          "aspect-[1/1]": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder image={initialImage} size={size} />
    </div>
  )
}

const CatPawPlaceholder = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-12 h-12 opacity-20"
    fill="#C9A96E"
    aria-hidden="true"
  >
    <ellipse cx="50" cy="68" rx="22" ry="17" />
    <ellipse cx="23" cy="50" rx="10" ry="9" />
    <ellipse cx="38" cy="35" rx="10" ry="9" />
    <ellipse cx="62" cy="35" rx="10" ry="9" />
    <ellipse cx="77" cy="50" rx="10" ry="9" />
  </svg>
)

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string }) => {
  return image ? (
    <Image
      src={image}
      alt="Producto"
      className="absolute inset-0 object-cover object-center"
      draggable={false}
      quality={75}
      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
      fill
    />
  ) : (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center">
      <CatPawPlaceholder />
    </div>
  )
}

export default Thumbnail
