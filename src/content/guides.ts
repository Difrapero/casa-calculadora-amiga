export interface GuideSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  readingTime: string;
  updatedAt: string;
  sections: GuideSection[];
}

export const guides: Guide[] = [
  {
    slug: "como-calcular-una-hipoteca",
    title: "Cómo se calcula una hipoteca: cuota, TIN, TAE e intereses",
    description: "Entiende la fórmula de la cuota hipotecaria, qué datos necesita y por qué el coste total importa tanto como el pago mensual.",
    readingTime: "7 min",
    updatedAt: "6 de agosto de 2026",
    sections: [
      {
        title: "Los cuatro datos que determinan la cuota",
        paragraphs: [
          "Una simulación básica necesita el capital prestado, el plazo, el tipo de interés y la frecuencia de pago. El capital no es necesariamente el precio de la vivienda: es el precio menos la entrada que aportas. Los impuestos y otros gastos suelen pagarse con ahorros y conviene mostrarlos fuera del préstamo.",
          "En una hipoteca a tipo fijo con pagos mensuales se suele utilizar el sistema francés. La cuota permanece constante mientras no cambie el tipo, pero su composición evoluciona: al principio se pagan más intereses y menos capital; con el tiempo ocurre lo contrario.",
        ],
      },
      {
        title: "TIN y TAE no significan lo mismo",
        paragraphs: [
          "El TIN es el porcentaje nominal que se aplica al capital pendiente. Es el dato que usamos para estimar la cuota cuando el tipo permanece constante. La TAE intenta expresar el coste efectivo anual e incorpora la frecuencia de los pagos y determinados gastos o comisiones.",
          "Para comparar ofertas, la cuota ayuda a saber si el pago cabe en tu presupuesto, mientras que la TAE y el coste total ayudan a saber qué oferta es más cara. Una cuota menor puede esconder un plazo más largo y muchos más intereses.",
        ],
      },
      {
        title: "Qué cambia en una hipoteca variable o mixta",
        paragraphs: [
          "En una hipoteca variable, el tipo se revisa según el índice y diferencial previstos en el contrato. Una calculadora solo puede crear escenarios, no predecir el índice futuro. Conviene probar una subida y comprobar si el presupuesto seguiría teniendo margen.",
          "Las hipotecas mixtas combinan un periodo inicial fijo con otro variable. Para compararlas correctamente hay que separar ambas fases y no asumir que la primera cuota se mantendrá durante toda la vida del préstamo.",
        ],
      },
      {
        title: "Cómo utilizar el resultado con prudencia",
        paragraphs: ["Antes de tomar una decisión, conserva margen para gastos recurrentes, mantenimiento y situaciones imprevistas. La cifra de una calculadora es un punto de partida para hacer preguntas mejores, no una aprobación bancaria."],
        bullets: [
          "Compara el coste sin bonificaciones y con productos vinculados.",
          "Revisa la TAE y el importe total que terminarías pagando.",
          "Prueba un plazo más corto y un escenario de tipos más altos.",
          "No destines todos tus ahorros a la firma: conserva un fondo de emergencia.",
        ],
      },
    ],
  },
  {
    slug: "gastos-de-comprar-vivienda",
    title: "Gastos de comprar una vivienda: cuánto ahorro necesitas",
    description: "Diferencia entrada, impuestos, tasación, notaría y otros gastos para saber cuánto efectivo necesitas antes de firmar.",
    readingTime: "8 min",
    updatedAt: "6 de agosto de 2026",
    sections: [
      {
        title: "La entrada es solo una parte del ahorro",
        paragraphs: [
          "Si una entidad financia un porcentaje del menor valor entre compraventa y tasación, la diferencia debe salir de tus ahorros. Por ejemplo, con una financiación del 80 %, la entrada de referencia sería el 20 % del precio, siempre que la tasación no sea inferior.",
          "A esa entrada hay que sumar impuestos y costes que pueden variar por comunidad autónoma, tipo de vivienda, precio y situación del comprador. Por eso nuestra calculadora permite ajustar los porcentajes en lugar de ocultarlos dentro de una cifra fija.",
        ],
      },
      {
        title: "Segunda mano y obra nueva",
        paragraphs: [
          "La vivienda usada suele tributar mediante el Impuesto sobre Transmisiones Patrimoniales. La obra nueva suele incorporar IVA y Actos Jurídicos Documentados. Existen tipos reducidos y particularidades territoriales, por lo que debes verificar el porcentaje aplicable a tu caso en la administración correspondiente.",
          "No confundas los gastos de compraventa con los gastos de formalización del préstamo. Aunque sucedan alrededor de la misma fecha, pueden tener responsables de pago y tratamiento distintos.",
        ],
      },
      {
        title: "Otros importes que conviene presupuestar",
        paragraphs: ["Además de la entrada y los impuestos, prepara un escenario que incluya los costes conocidos y una reserva razonable para los que todavía no estén cerrados."],
        bullets: [
          "Tasación de la vivienda.",
          "Notaría, registro o gestoría asociados a la compraventa.",
          "Honorarios de intermediación si corresponden al comprador.",
          "Mudanza, altas de suministros y pequeñas reparaciones.",
          "Seguro, comunidad e impuesto municipal una vez seas propietario.",
        ],
      },
      {
        title: "Una regla práctica útil",
        paragraphs: [
          "Calcula primero el ahorro mínimo para firmar y después separa un fondo de emergencia. Si la compra consume todo tu efectivo, la operación puede ser frágil aunque la cuota mensual parezca cómoda.",
          "El límite final debería ser el menor entre lo que permite tu cuota y lo que permiten tus ahorros. Esa es la lógica utilizada en nuestra calculadora de precio máximo.",
        ],
      },
    ],
  },
  {
    slug: "cuanto-puedo-pagar",
    title: "Cuánto puedes pagar por una vivienda sin ahogar tu presupuesto",
    description: "Cruza ingresos, deudas, ahorros y financiación máxima para estimar un precio de compra prudente.",
    readingTime: "7 min",
    updatedAt: "6 de agosto de 2026",
    sections: [
      {
        title: "No existe un único límite",
        paragraphs: [
          "El precio máximo depende de dos restricciones diferentes. La primera es mensual: cuánto pago puedes asumir después de considerar otras deudas. La segunda es inicial: cuánto dinero necesitas para la entrada y los gastos.",
          "Si solo observas los ingresos puedes obtener un precio imposible por falta de ahorros. Si solo observas los ahorros, puedes terminar con una cuota que no deja margen para vivir. El resultado prudente es el menor de los dos límites.",
        ],
      },
      {
        title: "Ingresos, esfuerzo y otras deudas",
        paragraphs: [
          "El esfuerzo hipotecario compara las cuotas de deuda con los ingresos netos del hogar. No es un permiso para gastar hasta el límite, sino una señal de riesgo. Antes de calcular la cuota disponible se deben restar préstamos personales, financiación de vehículos, tarjetas u otras obligaciones recurrentes.",
          "Dos hogares con el mismo ingreso pueden soportar cuotas muy distintas si uno tiene gastos familiares elevados, empleo más inestable o menor capacidad de ahorro. Ajusta la tasa de esfuerzo a tu presupuesto real.",
        ],
      },
      {
        title: "Financiación y tasación",
        paragraphs: [
          "La financiación máxima se expresa como porcentaje del valor considerado por el banco. Cuanto menor sea el porcentaje financiado, mayor será la entrada necesaria. Una tasación inferior al precio pactado también aumenta la cantidad que tendrás que aportar.",
          "Nuestra herramienta permite modificar ese porcentaje porque no todas las operaciones parten del mismo 80 %. El resultado sigue siendo orientativo: cada entidad aplica sus criterios de riesgo y garantías.",
        ],
      },
      {
        title: "Construye tres escenarios",
        paragraphs: ["En lugar de buscar una cifra exacta, crea un rango que te permita comparar viviendas con margen."],
        bullets: [
          "Escenario cómodo: esfuerzo reducido y ahorro de emergencia intacto.",
          "Escenario central: valores realistas de interés, gastos y financiación.",
          "Escenario de tensión: tipos más altos, menos ingresos o gastos inesperados.",
          "Si el escenario de tensión rompe el presupuesto, reduce el precio objetivo.",
        ],
      },
    ],
  },
];

export const findGuide = (slug?: string) => guides.find((guide) => guide.slug === slug);
