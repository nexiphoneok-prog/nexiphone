
import { Product, Condition, FAQItem } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 13 Pro',
    usdPrice: 750,
    listPriceArs: 850000,
    discountPriceArs: 750000,
    capacity: '128GB',
    color: 'Sierra Blue',
    condition: Condition.New,
    details: '98% Batería, 120 ciclos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhRllz_FCLc64rBxRCsvrFVcnNirK09orxOODqB9tGLEfeOPh2JW4sjH5t4gFLnKtrONfUt3YLdSwpnx9UmDxWpd5P8cHhE8e9sGfj_6yh6HlfGmC-anrlLE9quwq4OXx4Y9ZWwJib0PjFcGdQ5WvbaaEUDo502Bi05u1d89z269tjxdH6j90qGom07_HTYMpAj75lK8rBMGY_HIWB1fUlPZBVfaHd9AAvlBfmeoemHoAyUUFpCfo8boOt-WAyQ7cVKHpOrm6Kv2M',
  },
  {
    id: '4',
    name: 'iPhone 13',
    usdPrice: 650,
    listPriceArs: 740000,
    discountPriceArs: 650000,
    capacity: '256GB',
    color: 'Midnight',
    condition: Condition.New,
    isOffer: true,
    details: 'Equipos sellados en caja',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO6K-c3cnv3Dz_O08EuPKhRAU2MRatgPoN1RRkKiTZ0fOyqO68GRcZjBZt1bJ-ZOXTVK8aPawjXRhup8yT_iVBy4hk0tYgQ4orq_JBJQinTrs04O9I5PIPaqsIZH_esViURAOfdv1hjdUwHM1us_vgeob254dv3-iQdezqGIg-kSs21WHXLxi1X_BkYgEknNE4MVUSkNdRoOYFcYZXoglN458xskQWeKJRoa6iD_VG3fC9SYlr01Ib18GYoM4dmPAb3JBzJrB3-cg',
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 1,
    question: '¿Dónde están ubicados?',
    answer: 'Estamos en el corazón de Nueva Córdoba, en la calle Estrada 18. Puedes visitarnos para ver los equipos personalmente, probar su estado de batería y recibir asesoramiento.',
    icon: 'storefront'
  },
  {
    id: 2,
    question: '¿Cuáles son los medios de pago?',
    answer: 'Ofrecemos múltiples opciones para tu comodidad:\n- Efectivo y Transferencia: Son los medios con mayores beneficios y descuentos.\n- Dólares: Aceptamos dólares billete (sujeto a estado de los billetes).\n- Criptomonedas: Aceptamos pagos en USDT.\n- Tarjetas de Crédito: Podés pagar en 1 a 24 cuotas (consultar recargos financieros según el banco).',
    icon: 'payments'
  },
  {
    id: 3,
    question: '¿Qué garantía tienen los equipos?',
    answer: 'La seguridad de tu compra es nuestra prioridad:\n- Equipos Sellados (Nuevos): Cuentan con 12 meses de garantía oficial de Apple.\n- Equipos Seminuevos: Cuentan con una garantía de 2 a 12 meses brindada por nexiPhone para que tu compra sea segura.',
    icon: 'verified_user'
  },
  {
    id: 4,
    question: '¿Qué significa que un equipo es "Seminuevo"?',
    answer: 'Son equipos usados que pasan por un riguroso control de calidad. Verificamos que sean 100% originales, que no tengan ningún tipo de falla, estén libres de iCloud y empresas. En nuestra lista puedes ver el porcentaje exacto de batería de cada unidad.',
    icon: 'info'
  },
  {
    id: 10,
    question: '¿Cuál es la diferencia entre el estado "Seminuevo" y "Bueno"?',
    answer: 'En nexiPhone garantizamos que todos nuestros equipos funcionan al 100%. La diferencia es únicamente estética para que elijas la opción que mejor se adapte a tu presupuesto:\n\nEstado Seminuevo (Como nuevo): Es un equipo impecable. No tiene marcas profundas ni detalles visibles a simple vista. Puede tener algún detalle mínimo, casi imperceptible, pero luce como si recién lo hubieras sacado de la caja.\n\nEstado Bueno (Detalles mínimos): Es un equipo que presenta algunas señales de uso que solo son visibles si se mira de cerca. Puede tener alguna marca estética leve o micro-rayones que no afectan para nada el funcionamiento de la pantalla o las cámaras. Es la opción ideal para quienes buscan el máximo ahorro con la misma potencia de Apple.',
    icon: 'compare_arrows'
  },
  {
    id: 5,
    question: '¿Hacen envíos?',
    answer: 'Sí, realizamos envíos a todo el país. Los costos y métodos de envío se coordinan directamente por WhatsApp una vez confirmada la disponibilidad del equipo.',
    icon: 'local_shipping'
  },
  {
    id: 6,
    question: '¿Tienen descuentos especiales?',
    answer: '¡Sí! En nuestra lista de precios verás reflejados descuentos exclusivos:\n- 20% OFF en equipos seminuevos pagando de contado/transferencia.\n- 15% OFF en equipos sellados pagando de contado/transferencia.',
    icon: 'percent'
  },
  {
    id: 7,
    question: '¿Cómo contacto con un asesor de ventas?',
    answer: 'Puedes escribirnos directamente a nuestro WhatsApp: 549 351-771-3422. Atendemos de lunes a viernes en horario comercial y sábados por la mañana.',
    icon: 'support_agent'
  },
  {
    id: 8,
    question: '¿Aceptan equipos en parte de pago (Plan Canje)?',
    answer: '¡Sí! Tomamos tu iPhone usado como parte de pago para que puedas renovarte más fácilmente. Para que podamos cotizarlo, el equipo debe ser original y estar en buen estado funcional.\n\nProceso de tasación: La cotización final se realiza de manera presencial en nuestro local de Estrada 18. Allí verificamos el estado estético, la salud de la batería y el funcionamiento de todos sus componentes (Face ID, cámaras, pantalla, etc.).',
    icon: 'phonelink_setup'
  },
  {
    id: 9,
    question: '¿Tienen stock de los últimos modelos?',
    answer: 'Sí, contamos con stock inmediato y preventa de los modelos más nuevos, incluyendo la línea iPhone 16 y iPhone 17 (Air, Pro, Pro Max). Consulta nuestra lista actualizada en tiempo real para ver colores disponibles como el Deep Blue, Orange o Lavender.',
    icon: 'inventory_2'
  }
];
