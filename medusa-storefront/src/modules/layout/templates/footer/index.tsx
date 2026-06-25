import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-[#2A2A2A] bg-[#0A0A0A] w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-8 xsmall:flex-row items-start justify-between py-24">
          <div>
            <LocalizedClientLink
              href="/"
              className="font-cormorant text-xl tracking-[0.25em] text-[#F5F0E8] uppercase hover:text-[#C9A96E] transition-colors duration-300"
            >
              Michicosas
            </LocalizedClientLink>
            <p className="mt-3 text-[10px] tracking-[0.2em] text-[#8A8175] uppercase max-w-[180px] leading-relaxed">
              Gadgets y accesorios para gatos. Envío gratis a LATAM.
            </p>
          </div>

          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-2">
            {productCategories && productCategories.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-[10px] tracking-[0.2em] text-[#C9A96E] uppercase">
                  Categorías
                </span>
                <ul className="grid grid-cols-1 gap-2" data-testid="footer-categories">
                  {productCategories.slice(0, 6).map((c) => {
                    if (c.parent_category) return null

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li className="flex flex-col gap-2 text-[#8A8175]" key={c.id}>
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-[#C9A96E] transition-colors duration-300 text-xs",
                            children && "text-[#F5F0E8]"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children.map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  className="text-xs text-[#8A8175] hover:text-[#C9A96E] transition-colors duration-300"
                                  href={`/categories/${child.handle}`}
                                  data-testid="category-link"
                                >
                                  {child.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-[10px] tracking-[0.2em] text-[#C9A96E] uppercase">
                  Colecciones
                </span>
                <ul className="grid grid-cols-1 gap-2">
                  {collections.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="text-xs text-[#8A8175] hover:text-[#C9A96E] transition-colors duration-300"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full mb-12 justify-between items-center border-t border-[#2A2A2A] pt-8">
          <p className="text-[10px] tracking-[0.15em] text-[#8A8175] uppercase">
            © {new Date().getFullYear()} Michicosas · Todos los derechos reservados.
          </p>
          <p className="text-[10px] tracking-[0.15em] text-[#2A2A2A] uppercase">
            Hecho con amor para tu gato
          </p>
        </div>
      </div>
    </footer>
  )
}
