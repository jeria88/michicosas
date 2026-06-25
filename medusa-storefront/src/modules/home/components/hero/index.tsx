import Image from "next/image"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const CatPaw = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-28 h-28 opacity-40"
    fill="#C9A96E"
    aria-hidden="true"
  >
    {/* Almohadilla principal */}
    <ellipse cx="50" cy="68" rx="22" ry="17" />
    {/* Almohadillas digitales */}
    <ellipse cx="23" cy="50" rx="10" ry="9" />
    <ellipse cx="38" cy="35" rx="10" ry="9" />
    <ellipse cx="62" cy="35" rx="10" ry="9" />
    <ellipse cx="77" cy="50" rx="10" ry="9" />
  </svg>
)

type HeroProps = {
  featuredProduct?: HttpTypes.StoreProduct | null
}

const Hero = ({ featuredProduct }: HeroProps) => {
  const hasImage = !!featuredProduct?.thumbnail

  return (
    <div className="w-full min-h-screen flex flex-col small:flex-row bg-[#0A0A0A]">
      {/* ── Lado izquierdo — texto ── */}
      <div className="flex-1 flex flex-col justify-center px-8 small:px-16 xl:px-24 py-28 small:py-0">
        <span className="text-[9px] tracking-[0.45em] text-[#C9A96E] uppercase mb-8 block">
          Michicosas
        </span>
        <div className="w-10 h-px bg-[#C9A96E] mb-10" />
        <h1 className="font-cormorant text-5xl small:text-6xl xl:text-7xl font-light text-[#F5F0E8] leading-[1.1] mb-8">
          Gadgets y<br />
          accesorios<br />
          <em className="font-light italic">para gatos.</em>
        </h1>
        <p className="text-[#8A8175] text-xs tracking-widest leading-relaxed mb-12 max-w-[280px] uppercase">
          Tecnología y confort.
          <br />
          Envío gratis a LATAM.
        </p>
        <LocalizedClientLink href="/store">
          <span className="inline-flex items-center gap-4 px-8 py-3 border border-[#C9A96E] text-[#C9A96E] text-[10px] tracking-[0.25em] uppercase hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-300 cursor-pointer">
            Explorar tienda
            <span className="text-sm">→</span>
          </span>
        </LocalizedClientLink>
      </div>

      {/* ── Lado derecho — producto estrella ── */}
      <div className="w-full small:w-[45%] bg-[#141414] flex flex-col items-center justify-center min-h-[65vh] small:min-h-screen relative overflow-hidden">
        {/* Marco decorativo */}
        <div className="absolute inset-6 border border-[#2A2A2A] pointer-events-none" />

        {/* Imagen del producto o placeholder */}
        <div className="relative w-56 h-56 small:w-64 small:h-64 xl:w-72 xl:h-72 flex items-center justify-center">
          {hasImage ? (
            <Image
              src={featuredProduct!.thumbnail!}
              alt={featuredProduct?.title || "Producto destacado"}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 224px, 288px"
              priority
            />
          ) : (
            <CatPaw />
          )}
        </div>

        {/* Info del producto */}
        {featuredProduct && (
          <div className="mt-8 text-center px-10">
            <p className="font-cormorant text-lg font-light text-[#F5F0E8] mb-3 leading-snug">
              {featuredProduct.title}
            </p>
            <div className="w-6 h-px bg-[#C9A96E] mx-auto" />
          </div>
        )}

        {/* Badge envío gratis */}
        <span className="absolute bottom-8 right-8 text-[8px] tracking-[0.25em] text-[#C9A96E] uppercase border border-[#2A2A2A] px-3 py-1.5">
          Envío gratis
        </span>

        {/* Número decorativo */}
        <span className="absolute top-8 left-8 font-cormorant text-6xl font-light text-[#141414] select-none pointer-events-none leading-none"
          style={{ color: "#1C1C1C" }}>
          01
        </span>
      </div>
    </div>
  )
}

export default Hero
