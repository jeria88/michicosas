# CLAUDE.md — Michicosas

> Contexto técnico para Claude. Leer antes de tocar cualquier archivo.

## Modo automático: `codigo` (este repo es 100% técnico)

## Infraestructura en Oracle Cloud (Coolify)

| Servicio | UUID Coolify | URL |
|---|---|---|
| Storefront (Next.js) | `j13is9tj9e34i8vm88on3hk5` | `https://michicosas.146.181.39.4.sslip.io` |
| Backend (Medusa v2) | `g12v9wjzhdffn08704jiw69y` | `https://api.michicosas.146.181.39.4.sslip.io` |
| Admin Medusa | — | `https://api.michicosas.146.181.39.4.sslip.io/app` |
| n8n orquestador | proyecto "agency" | `https://n8n.146.181.39.4.sslip.io` |

## Credenciales críticas (no commitear en código)

- **Admin Medusa**: `admin@michicosas.com` / `AdminMichi2026!` (contraseña reseteada via scrypt en provider_identity)
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
- Auth admin: `POST /auth/admin/emailpass` (NO usar /auth/token/emailpass que retorna token de identidad sin actor_id)
- Contraseñas admin almacenadas con scrypt-kdf en `provider_identity.provider_metadata.password` (base64)
- Precios visibles en store API en `variant.calculated_price.calculated_amount` (no en `variant.prices`)
- `medusa start` debe ejecutarse desde `/app/apps/backend/` (NO via turbo desde la raíz — turbo interfiere con env vars)

### Storefront
- `MEDUSA_BACKEND_URL` (SIN NEXT_PUBLIC_) = IP interna Docker del backend en build time
- La IP del backend cambia en cada redeploy — actualizar `MEDUSA_BACKEND_URL` si cambia
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` = URL pública del backend (actualmente `https://api.michicosas.146.181.39.4.sslip.io`)
- El middleware usa cookies `_medusa_cache_id` — el primer request hace 307, el segundo 200 (comportamiento normal)
- `dynamicParams = true` y `generateStaticParams` con try/catch en pages de categories y collections

### n8n workflows activos
- WF1 (sync stock): ID `YyofTiJODqBIoGRv` — activo, cada hora
- WF2 (precios 2.5x): ID `xFidxV2DNTKz9mBF` — INACTIVO (reemplazado por WF2b)
- WF2b (pricing inteligente): ID `OZNdrKo4Jelitfbg` — ACTIVO, cada 24h
- WF3 (crear pedido CJ): ID `AY9zGdeAvqqN4o6h` — activo, cada 15min
- WF4 (tracking): ID `8k7foFM1bysG3Rwe` — activo, cada 6h
- Todos los workflows usan `https://api.michicosas.146.181.39.4.sslip.io` (corregido 2026-06-25)

### CJ Dropshipping
- Rate limit: 1 req/s → siempre `Wait 1.2s` entre llamadas en n8n
- Auth: `POST /api2.0/v1/authentication/getAccessToken` con email + password
- Precio producto: `GET /api2.0/v1/product/detail?pid={cj_product_id}`
- Flete: `POST /api2.0/v1/logistic/freightCalculate`

## Pendiente prioritario

1. Diseño visual del storefront (actualmente template default de Medusa)
2. Dominio `michicosas.store` (comprar cuando tienda esté lista)
3. SEO longtail: artículos sobre "traductores de mascotas IA"
4. Acceso admin programático: `actor_id` vacío en JWT de `/auth/admin/emailpass`
   → No bloquea — usar el JWT de larga duración (válido hasta 2027-06-25) como workaround
   → JWT: guardado en `project_michicosas.md` en memoria

## Completado (2026-06-25)
- ✅ Precios iniciales cargados en los 12 productos
- ✅ Metadata `cj_product_id` en los 12 productos
- ✅ WF2b activado, WF2 desactivado
- ✅ URLs de todos los workflows corregidas a `api.michicosas.`
- ✅ Automatización dropshipping 100% operativa

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
