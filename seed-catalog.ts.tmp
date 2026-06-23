import { 
  ProductService, 
  ProductCategoryService, 
  ShippingProfileService 
} from "@medusajs/medusa";
import { EntityManager } from "typeorm";

/**
 * Script para poblar la base de datos de MedusaJS con el catálogo estratégico de Michicosas.
 * Orientado a SEO, estructurado en 4 categorías maestras.
 */
export default async function seedCatalog(container: any) {
  const productService: ProductService = container.resolve("productService");
  const productCategoryService: ProductCategoryService = container.resolve("productCategoryService");
  const shippingProfileService: ShippingProfileService = container.resolve("shippingProfileService");
  const manager: EntityManager = container.resolve("manager");

  console.log("🐾 Iniciando seeding del catálogo de Michicosas...");

  // Obtener perfil de envío por defecto
  const defaultShippingProfile = await shippingProfileService.retrieveDefault();

  // 1. Crear Categorías
  const categoriesData = [
    { name: "Atracción de Tráfico", handle: "atraccion-trafico", description: "Productos virales para redes sociales" },
    { name: "Venta Cruzada", handle: "venta-cruzada", description: "Complementos ideales para aumentar el AOV" },
    { name: "Alto Margen", handle: "alto-margen", description: "Productos premium tecnológicos para mascotas" },
    { name: "Ingresos Recurrentes", handle: "ingresos-recurrentes", description: "Consumibles de compra periódica" }
  ];

  const categoryMap = new Map();
  await manager.transaction(async (transactionManager) => {
    for (const cat of categoriesData) {
      const created = await productCategoryService.withTransaction(transactionManager).create(cat);
      categoryMap.set(cat.handle, created.id);
    }
  });

  // 2. Definir Productos
  const products = [
    // --- CATEGORÍA 1: Atracción de Tráfico ---
    {
      title: "Cepillo de Vapor 3 en 1 para Gatos",
      subtitle: "Elimina pelo muerto y masajea",
      description: "El cepillo de vapor revolucionario que todos los gatos aman. Suaviza el pelaje, reduce la caída de pelo en casa y ofrece un masaje relajante. ¡Perfecto para tu rutina de aseo diaria!",
      handle: "cepillo-vapor-gatos",
      is_giftcard: false,
      discountable: true,
      options: [{ title: "Color" }],
      categories: [{ id: categoryMap.get("atraccion-trafico") }],
      tags: [{ value: "Aseo" }, { value: "Viral" }, { value: "Gatos" }],
      variants: [
        {
          title: "Verde Menta",
          prices: [{ amount: 1499, currency_code: "usd" }], // $14.99
          inventory_quantity: 100,
        }
      ]
    },
    {
      title: "Juguete Interactivo Pájaro Volador",
      subtitle: "Estimula el instinto cazador",
      description: "Mantén a tu michi activo durante horas. Este juguete simula el vuelo errático de un pájaro, despertando el instinto natural de caza de tu felino y combatiendo el sedentarismo.",
      handle: "juguete-pajaro-volador",
      options: [{ title: "Modelo" }],
      categories: [{ id: categoryMap.get("atraccion-trafico") }],
      tags: [{ value: "Juguetes" }, { value: "Interactivo" }],
      variants: [{ title: "Águila", prices: [{ amount: 1299, currency_code: "usd" }], inventory_quantity: 50 }]
    },
    {
      title: "Collar Láser Automático",
      subtitle: "Diversión manos libres",
      description: "Collar ajustable con puntero láser integrado. Tu gato perseguirá el punto de luz persiguiendo sus propios movimientos. Ideal para gatos con mucha energía.",
      handle: "collar-laser-automatico",
      options: [{ title: "Talla" }],
      categories: [{ id: categoryMap.get("atraccion-trafico") }],
      tags: [{ value: "Juguetes" }, { value: "Tecnología" }],
      variants: [{ title: "Única", prices: [{ amount: 1999, currency_code: "usd" }], inventory_quantity: 80 }]
    },

    // --- CATEGORÍA 2: Venta Cruzada ---
    {
      title: "Rodillo Removedor de Pelo Reutilizable",
      subtitle: "Ropa y sofás impecables",
      description: "Atrapa pelos mágicamente sin necesidad de cintas adhesivas. Pásalo por sofás, alfombras y ropa, y vacía el depósito en la basura. Ecológico y duradero.",
      handle: "rodillo-removedor-pelo",
      options: [{ title: "Color" }],
      categories: [{ id: categoryMap.get("venta-cruzada") }],
      tags: [{ value: "Limpieza" }, { value: "Hogar" }],
      variants: [{ title: "Blanco/Rojo", prices: [{ amount: 999, currency_code: "usd" }], inventory_quantity: 200 }]
    },
    {
      title: "Guantes de Silicona para Aseo",
      subtitle: "Mimos que limpian",
      description: "Acaricia a tu mascota mientras retiras el exceso de pelo. Diseño de 5 dedos para llegar a todas partes. Suave con la piel y muy fácil de limpiar.",
      handle: "guantes-silicona-aseo",
      options: [{ title: "Mano" }],
      categories: [{ id: categoryMap.get("venta-cruzada") }],
      tags: [{ value: "Aseo" }, { value: "Perros" }, { value: "Gatos" }],
      variants: [{ title: "Par (Izquierda y Derecha)", prices: [{ amount: 899, currency_code: "usd" }], inventory_quantity: 150 }]
    },
    {
      title: "Alfombrilla para Lamer (Lick Mat)",
      subtitle: "Reduce la ansiedad y el aburrimiento",
      description: "Unta paté, yogur o premios húmedos. Lamer libera endorfinas que relajan a tu mascota, ideal para momentos de estrés como baños o tormentas.",
      handle: "alfombrilla-lamer",
      options: [{ title: "Diseño" }],
      categories: [{ id: categoryMap.get("venta-cruzada") }],
      tags: [{ value: "Salud Mental" }, { value: "Alimentación" }],
      variants: [{ title: "Cuadrada Azul", prices: [{ amount: 1199, currency_code: "usd" }], inventory_quantity: 120 }]
    },
    {
      title: "Protector Antirrasguños para Sofás",
      subtitle: "Salva tus muebles",
      description: "Láminas transparentes y adhesivas de alta resistencia. Protege esquinas de sofás, sillas y puertas sin arruinar la estética de tu hogar.",
      handle: "protector-antirrasgunos",
      options: [{ title: "Pack" }],
      categories: [{ id: categoryMap.get("venta-cruzada") }],
      tags: [{ value: "Hogar" }, { value: "Protección" }],
      variants: [{ title: "Pack de 4", prices: [{ amount: 1499, currency_code: "usd" }], inventory_quantity: 100 }]
    },

    // --- CATEGORÍA 3: Alto Margen ---
    {
      title: "Fuente de Agua Inteligente de Acero Inoxidable",
      subtitle: "Agua fresca y purificada 24/7",
      description: "Fomenta la hidratación con agua en movimiento. Material higiénico que previene el acné felino, bomba ultra silenciosa y sistema de filtración multicapa.",
      handle: "fuente-agua-inteligente",
      options: [{ title: "Capacidad" }],
      categories: [{ id: categoryMap.get("alto-margen") }],
      tags: [{ value: "Tecnología" }, { value: "Alimentación" }, { value: "Premium" }],
      variants: [{ title: "2 Litros", prices: [{ amount: 4999, currency_code: "usd" }], inventory_quantity: 40 }]
    },
    {
      title: "Cama Ortopédica Tipo Donut",
      subtitle: "El mejor sueño para sus articulaciones",
      description: "Diseño redondo con bordes elevados que proporcionan soporte para la cabeza y el cuello. Felpa ultra suave que imita el calor materno para un sueño profundo.",
      handle: "cama-ortopedica-donut",
      options: [{ title: "Tamaño" }],
      categories: [{ id: categoryMap.get("alto-margen") }],
      tags: [{ value: "Descanso" }, { value: "Premium" }],
      variants: [{ title: "Mediana (60cm)", prices: [{ amount: 3999, currency_code: "usd" }], inventory_quantity: 60 }]
    },
    {
      title: "Comedero Automático Wi-Fi con Cámara",
      subtitle: "Alimenta y vigila desde tu celular",
      description: "Programa raciones exactas, graba mensajes de voz y observa a tu mascota en tiempo real con resolución HD. Nunca más te preocupes por sus horarios de comida.",
      handle: "comedero-wifi-camara",
      options: [{ title: "Color" }],
      categories: [{ id: categoryMap.get("alto-margen") }],
      tags: [{ value: "Tecnología" }, { value: "Premium" }],
      variants: [{ title: "Blanco Mate", prices: [{ amount: 8999, currency_code: "usd" }], inventory_quantity: 25 }]
    },

    // --- CATEGORÍA 4: Ingresos Recurrentes ---
    {
      title: "Pack de Filtros de Carbón Activo (6 uds)",
      subtitle: "Repuesto para fuente inteligente",
      description: "Filtros de triple acción que atrapan pelos, sedimentos e impurezas, suavizando el agua. Necesarios cada 2-4 semanas. ¡Suscríbete y ahorra!",
      handle: "pack-filtros-carbon",
      options: [{ title: "Pack" }],
      categories: [{ id: categoryMap.get("ingresos-recurrentes") }],
      tags: [{ value: "Repuestos" }, { value: "Suscripción" }],
      variants: [{ title: "6 Unidades", prices: [{ amount: 1299, currency_code: "usd" }], inventory_quantity: 500 }]
    },
    {
      title: "Snacks Funcionales Liofilizados",
      subtitle: "Premios saludables y naturales",
      description: "Trocitos de salmón y pollo 100% naturales, secados en frío para conservar todos sus nutrientes. Ricos en Omega 3 para un pelaje brillante.",
      handle: "snacks-funcionales",
      options: [{ title: "Sabor" }],
      categories: [{ id: categoryMap.get("ingresos-recurrentes") }],
      tags: [{ value: "Alimentación" }, { value: "Suscripción" }],
      variants: [{ title: "Salmón Salvaje 100g", prices: [{ amount: 899, currency_code: "usd" }], inventory_quantity: 300 }]
    }
  ];

  await manager.transaction(async (transactionManager) => {
    for (const productData of products) {
      const productToCreate = {
        ...productData,
        profile_id: defaultShippingProfile.id,
      };
      
      // En una implementación real de Medusa, aquí se crearían las opciones, el producto y luego las variantes.
      // Esta es la llamada simplificada del servicio.
      await productService.withTransaction(transactionManager).create(productToCreate);
    }
  });

  console.log("✅ Catálogo de Michicosas creado exitosamente.");
}
