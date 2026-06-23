# Michicosas Store - Ecosistema Zero-Cost Dropshipping 🐾

Arquitectura Open-Source optimizada para alojarse en la capa **Always Free de Oracle Cloud (ARM64)**, orquestando el modelo de negocio mediante n8n, y diseñado para captar tráfico orgánico.

## 🏗️ Estructura del Proyecto

- `/medusa-backend`: Servidor de e-commerce e inventario (MedusaJS).
- `/medusa-storefront`: Tienda y Blog en Next.js (Optimizado para SEO y carga rápida).
- `/n8n-orchestrator`: Automatización de Dropshipping y Redes Sociales.

## 🚀 Despliegue en Local (Paso a Paso)

### 1. Iniciar los Servicios Base (n8n, PostgreSQL, Redis)
El orquestador está configurado en modo *Queue* para máximo rendimiento.

```bash
cd n8n-orchestrator
docker-compose up -d
```
*n8n estará disponible en `http://localhost:5678`*

### 2. Configurar el Backend (MedusaJS)
Asegúrate de tener Node.js instalado (v18 o v20).

```bash
cd ../medusa-backend
# Inicializar proyecto (si aún no se ha hecho con medusa-cli)
# npm install -g @medusajs/medusa-cli
# medusa new .

# Instalar dependencias
npm install

# Ejecutar el script estratégico para inyectar los 12 productos
npx medusa seed -f ./seed-catalog.ts

# Iniciar backend
npm run dev
```

### 3. Configurar el Storefront (Next.js)
```bash
cd ../medusa-storefront
# Clonar el starter oficial si está vacío:
# npx create-next-app -e https://github.com/medusajs/nextjs-starter-medusa .

# Instalar e iniciar
npm install
npm run dev
```

## 🤖 Workflows en n8n
En la carpeta `/n8n-orchestrator/workflows` encontrarás:
1. `cj-dropshipping-sync.json`: Sincronización automática de inventario.
2. `social-media-autopost.json`: Herramienta de tráfico orgánico (Auto-posts a Pinterest y Twitter basándose en tus productos de Medusa).

*Para usarlos, entra en n8n, haz clic en "Add Workflow" y luego selecciona "Import from File".*

## 🌐 Próximos Pasos (Oracle Cloud)
1. Instalar Docker en la instancia ARM (Ampere A1).
2. Abrir los puertos (80, 443) en las VCN de Oracle.
3. Usar un proxy inverso (como Nginx Proxy Manager o Traefik) frente al `docker-compose` para gestionar los certificados SSL gratuitos de Let's Encrypt.
