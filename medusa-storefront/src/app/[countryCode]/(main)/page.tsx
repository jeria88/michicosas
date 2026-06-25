import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Michicosas — Gadgets y accesorios para gatos",
  description: "Tecnología y confort para tu gato. Envío gratis a LATAM.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  // Producto estrella para el hero
  let featuredProduct = null
  try {
    const { response } = await listProducts({
      countryCode,
      queryParams: { limit: 1 },
    })
    featuredProduct = response.products[0] || null
  } catch {
    // El hero renderiza con placeholder si no hay producto
  }

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero featuredProduct={featuredProduct} />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
