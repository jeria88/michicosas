import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 mx-auto border-b border-[#2A2A2A] bg-[#0A0A0A]">
        <nav className="content-container flex items-center justify-between w-full h-full">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="font-cormorant text-lg tracking-[0.25em] text-[#F5F0E8] uppercase hover:text-[#C9A96E] transition-colors duration-300"
              data-testid="nav-store-link"
            >
              Michicosas
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full text-[10px] tracking-[0.2em] uppercase">
              <LocalizedClientLink
                className="text-[#8A8175] hover:text-[#C9A96E] transition-colors duration-300"
                href="/blog"
                data-testid="nav-blog-link"
              >
                Blog
              </LocalizedClientLink>
              <LocalizedClientLink
                className="text-[#8A8175] hover:text-[#C9A96E] transition-colors duration-300"
                href="/account"
                data-testid="nav-account-link"
              >
                Mi cuenta
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="text-[#C9A96E] hover:text-[#E8D5A3] flex gap-2 text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Carrito (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
