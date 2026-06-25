# Michicosas — Tienda Dropshipping de Mascotas

Tienda e-commerce de dropshipping para el mercado LATAM, nicho mascotas. Stack open-source en Oracle Cloud Free Tier (ARM64) con automatización completa via n8n.

## Estado actual (jun 2026): OPERATIVO

- **Storefront**: `https://michicosas.146.181.39.4.sslip.io`
- **Backend API**: `https://api.michicosas.146.181.39.4.sslip.io`
- **Admin panel**: `https://api.michicosas.146.181.39.4.sslip.io/app`
- **n8n orquestador**: `https://n8n.146.181.39.4.sslip.io`
- **Dominio final**: `michicosas.store` (pendiente de compra)

## Estructura del Proyecto

```
/
├── medusa-backend/     # Backend Medusa v2 (monorepo con apps/backend)
├── medusa-storefront/  # Storefront Next.js SSG
└── n8n-orchestrator/  # Workflows de automatización
```

## Catálogo

12 productos de nicho mascotas con mapping a CJ Dropshipping:

| SKU | Producto | Precio venta | CJ ID |
|---|---|---|---|
| PET-CVG-001 | Cepillo de Vapor 3en1 para Gatos | $62.99 | 2069349045253488641 |
| PET-JPV-002 | Juguete Interactivo Pájaro Volador | $24.99 | 2069266933865611266 |
| PET-CLA-003 | Collar Láser Automático | $36.99 | 2060270988448870401 |
| PET-RPX-004 | Rodillo Removedor de Pelo XL | $15.99 | 2069344490084921345 |
| PET-GSA-005 | Guantes Silicona Aseo Mascotas | $13.99 | 2605230208531604200 |
| PET-LMT-006 | Alfombrilla Lamer (Lick Mat) | $18.99 | 2605080106101616700 |
| PET-PAS-007 | Protector Antirrasguños Sofás | $14.99 | 2061383790831566849 |
| PET-FAI-008 | Fuente de Agua Inteligente Acero | $87.99 | 2069351933217378305 |
| PET-COD-009 | Cama Ortopédica Donut XL | $24.99 | 2605110149301620900 |
| PET-CAW-010 | Comedero Automático Wi-Fi Cámara | $184.99 | 2065624025013186561 |
| PET-FCA-011 | Pack Filtros Carbón Activo | $22.99 | 2602280839581626900 |
| PET-SLC-012 | Snacks Liofilizados Gatos Carne | $17.99 | 2604221236451628800 |

Precios iniciales calculados con fórmula: `(precio_CJ + $5 envío estimado) × 2.083`, redondeados a `.99`.

## Automatización n8n (4 workflows activos)

| Workflow | Trigger | Función |
|---|---|---|
| WF1 - Sync Stock | Cada hora | Sincroniza inventario CJ → Medusa |
| WF2 - Sync Precios (2.5x) | Cada 24h | Margen fijo — REEMPLAZAR por WF2b |
| WF2b - Pricing Inteligente | Cada 24h | CJ precio + flete real → margen 100% mínimo 30% |
| WF3 - Crear Pedido CJ | Cada 15min | Convierte pedidos Medusa pagados a órdenes CJ |
| WF4 - Tracking Fulfillment | Cada 6h | Sincroniza tracking CJ → Medusa |

### Fórmula de pricing (WF2b)

```
costo_real    = precio_CJ + flete_CJ_a_CL × 1.3  (buffer 30% para MX/CO/AR)
precio_venta  = ceil(costo_real × 2 / 0.96) - 0.01  (margen ~100%, redondeado a .99)
margen_mínimo = 30% neto después de fee pasarela 4%
```

La tienda dice "envío gratis" — el costo de envío está absorbido en el precio de venta.

## Variables de entorno críticas

### medusa-backend

| Variable | Valor |
|---|---|
| `DATABASE_URL` | `postgres://postgres:<pass>@hmpwovwaibmaxak6e7mcpjwt:5432/postgres` |
| `JWT_SECRET` | `supersecret` |
| `STORE_CORS` | `https://michicosas.146.181.39.4.sslip.io` |

### medusa-storefront

| Variable | Valor |
|---|---|
| `MEDUSA_BACKEND_URL` | `http://10.0.2.12:9000` (IP interna Docker del backend) |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | `https://michicosas-backend.146.181.39.4.sslip.io` |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | `pk_...` (desde admin > Publishable Keys) |

## Notas técnicas importantes

- **Medusa v2**: usa POST (no PATCH) para actualizar productos. Precios via `price_set`.
- **CJ rate limit**: 1 req/s — siempre añadir `Wait 1.2s` entre llamadas en n8n.
- **Storefront SSG**: `MEDUSA_BACKEND_URL` (sin `NEXT_PUBLIC_`) para build time. Debe apuntar a la IP interna Docker del backend, no la URL pública (hairpin NAT no funciona).
- **Admin build**: el Dockerfile copia `.medusa/client/` → `public/admin/` después del build para que Medusa pueda servir el panel.
- **Arquitectura Docker**: todos los contenedores en red `coolify` (bridge). Backend en `10.0.2.12`, storefront en `10.0.2.10` (IPs pueden cambiar en redeploy).

## Pendiente

1. Añadir metadata `cj_product_id` a los 12 productos via admin API (necesario para WF2b)
2. Desactivar WF2 (2.5x fijo) y activar WF2b una vez verificado
3. Comprar dominio `michicosas.store` y configurar en Cloudflare/Coolify
4. Diseño visual del storefront (actualmente usa template default de Medusa)
5. Blog SEO: artículos sobre "traductores de mascotas IA" (keyword longtail LATAM)
