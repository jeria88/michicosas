# CLAUDE.md — Michicosas

> Contexto técnico para Claude. Leer antes de tocar cualquier archivo.

## Modo automático: `codigo` (este repo es 100% técnico)

## Infraestructura en Oracle Cloud (Coolify)

| Servicio | UUID Coolify | URL |
|---|---|---|
| Storefront (Next.js) | `j13is9tj9e34i8vm88on3hk5` | `https://michicosas.146.181.39.4.sslip.io` |
| Backend (Medusa v2) | `g12v9wjzhdffn08704jiw69y` | `https://michicosas-backend.146.181.39.4.sslip.io` |
| Admin Medusa | — | `https://michicosas-backend.146.181.39.4.sslip.io/app` |
| n8n orquestador | proyecto "agency" | `https://n8n.146.181.39.4.sslip.io` |

## Credenciales críticas (no commitear en código)

- **Admin Medusa**: `admin@michicosas.com` / (ver Coolify env JWT_SECRET=supersecret)
- **CJ Dropshipping email**: `fjeriacastro@gmail.com` / API key en Coolify env
- **n8n API key**: en Coolify env del proyecto agency

## Estructura del repo

```
medusa-backend/
  apps/backend/
    medusa-config.ts     # Config principal Medusa v2
    src/                 # Código fuente TypeScript
  Dockerfile             # Multi-stage: npm ci → medusa build → cp admin → start
medusa-storefront/       # Next.js SSG, Medusa starter oficial
n8n-orchestrator/        # Workflows de n8n (importar manualmente)
```

## Reglas técnicas de este proyecto

### Medusa v2
- Precios via `price_set` → `product_variant_price_set` → `price` (no directamente en variante)
- IDs siguen formato ULID con prefijo: `pset_`, `pvps_`, `price_`, `variant_`, etc.
- `medusa build` genera admin en `.medusa/client/`; el Dockerfile lo copia a `public/admin/`
- Actualizar precio via API: `POST /admin/variants/{id}/prices`
- Actualizar producto via API: `POST /admin/products/{id}` (Medusa v2 usa POST no PATCH)

### Storefront
- `MEDUSA_BACKEND_URL` (SIN NEXT_PUBLIC_) = IP interna Docker del backend en build time
- La IP del backend cambia en cada redeploy — actualizar `MEDUSA_BACKEND_URL` si cambia
- `dynamicParams = true` y `generateStaticParams` con try/catch en pages de categories y collections

### n8n workflows activos
- WF1 (sync stock): ID `YyofTiJODqBIoGRv` — activo, cada hora
- WF2 (precios 2.5x): ID `xFidxV2DNTKz9mBF` — REEMPLAZAR por WF2b
- WF2b (pricing inteligente): ID `OZNdrKo4Jelitfbg` — creado, pendiente activar
- WF3 (crear pedido CJ): ID `AY9zGdeAvqqN4o6h` — activo, cada 15min
- WF4 (tracking): ID `8k7foFM1bysG3Rwe` — activo, cada 6h

### CJ Dropshipping
- Rate limit: 1 req/s → siempre `Wait 1.2s` entre llamadas en n8n
- Auth: `POST /api2.0/v1/authentication/getAccessToken` con email + password
- Precio producto: `GET /api2.0/v1/product/detail?pid={cj_product_id}`
- Flete: `POST /api2.0/v1/logistic/freightCalculate`

## Pendiente prioritario

1. Añadir metadata `cj_product_id` a los 12 productos en Medusa (via admin API)
   → Sin esto, WF1 y WF2b no pueden hacer la sincronización
2. Verificar IP del backend Medusa después de cada redeploy y actualizar `MEDUSA_BACKEND_URL` del storefront
3. Activar WF2b y desactivar WF2 una vez que los productos tengan `cj_product_id`
4. Diseño visual del storefront (actualmente template default)
5. Dominio `michicosas.store` (comprar cuando tienda esté lista)

## Fórmula de pricing (negocio)

```
costo_real    = precio_CJ + flete_CJ_a_CL × 1.3
precio_venta  = ceil(costo_real × 2 / 0.96) - 0.01
margen_mínimo = 30% (si < 30%: log alerta, no publicar)
fee_pasarela  = 4% (PayPal/MercadoPago estimado)
```

## SSH al servidor

```bash
ssh -i '/home/nikka/DevTools/oracle-free/ssh/ssh-key-2026-06-14.key' ubuntu@146.181.39.4
```
