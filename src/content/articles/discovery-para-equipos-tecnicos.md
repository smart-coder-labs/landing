## El desperdicio más caro

Un equipo técnico bueno puede construir lo equivocado con excelente calidad. Código limpio, buena cobertura, arquitectura sólida, y una funcionalidad que usa el dos por ciento de los usuarios.

Ese desperdicio es más caro que cualquier deuda técnica, porque además de los meses invertidos, ahora hay que mantenerlo.

## La pregunta que falta

En la mayoría de las conversaciones sobre una funcionalidad nueva se discute **cómo** construirla. Rara vez se pregunta en qué evidencia se apoya que resuelve un problema real.

No es una pregunta de desconfianza; es una pregunta de riesgo. Y con frecuencia la respuesta honesta es "lo pidió un cliente" o "el competidor lo tiene", que son señales débiles.

Un cliente que pide algo casi siempre está describiendo su solución imaginada, no su problema. La labor es llegar al problema.

## Cuatro riesgos, no uno

Antes de construir vale la pena separar qué puede salir mal:

- **Riesgo de valor.** ¿Alguien lo quiere lo suficiente como para usarlo?
- **Riesgo de usabilidad.** ¿Podrán usarlo sin ayuda?
- **Riesgo de viabilidad técnica.** ¿Podemos construirlo con lo que tenemos?
- **Riesgo de negocio.** ¿Encaja con el modelo, el precio, lo legal?

Los equipos técnicos suelen atacar bien el tercero y descuidar el primero. Y el primero es el que produce el desperdicio grande.

## Formas baratas de reducir el riesgo de valor

Ordenadas de más barata a más cara:

**Mirar los datos que ya tienes.** Antes de preguntar nada: ¿cuántos usuarios llegan al punto donde esta funcionalidad ayudaría? ¿Cuántos abandonan ahí? Muchas veces la respuesta descarta la idea en una tarde.

**Hablar con cinco usuarios.** No preguntando si les gustaría la funcionalidad, porque la respuesta siempre es sí. Preguntando cómo resuelven hoy ese problema. Si tienen un apaño elaborado, el problema es real. Si nunca se lo plantearon, no lo es.

**Prototipo sin código.** Una maqueta navegable que se muestra a usuarios reales revela problemas de comprensión en horas, no en meses.

**Versión manual.** Antes de automatizar, hacer el proceso a mano para diez clientes. Si nadie lo valora hecho a mano, tampoco lo valorará automatizado. Y aprendes los casos límite reales.

**Rebanada delgada en producción.** Construir la versión mínima que entrega valor de verdad y medirla, en vez de construir la completa y medir al final.

## Lo que "mínimo" no significa

El malentendido más común: "mínimo" no es la funcionalidad completa con menos calidad. Es la porción más pequeña que permite aprender algo real.

Si estás construyendo un sistema de reportes, el mínimo no es todos los reportes hechos rápido y mal. Es un reporte, el más pedido, bien hecho, para ver si alguien lo usa.

## Define de antemano qué invalidaría la idea

Este es el hábito que más cambia la calidad de las decisiones.

Antes de empezar, escribe qué resultado te haría concluir que la idea no funcionó. "Si menos del quince por ciento de los usuarios activos lo usa en el primer mes, lo retiramos."

Sin ese criterio previo, cualquier resultado se racionaliza como éxito parcial y nada se retira nunca. El producto se llena de funcionalidades que nadie usa y todas hay que mantener.

## El equipo técnico en el discovery

La separación donde producto investiga y luego entrega especificaciones a ingeniería desperdicia información en ambas direcciones.

Cuando alguien de ingeniería escucha directamente al usuario, suele proponer soluciones más baratas: "eso que describes se resuelve con un filtro que ya existe" o "si aceptamos actualizar cada hora en vez de en tiempo real, cuesta una décima parte".

Ese tipo de intercambio solo ocurre si ingeniería está en la conversación, no al final de ella.

## Señales de que estás construyendo a ciegas

- Nadie del equipo ha hablado con un usuario en los últimos tres meses.
- La justificación principal es que un competidor lo tiene.
- No hay una métrica definida para saber si funcionó.
- Nadie sabe qué porcentaje de las funcionalidades existentes se usa.
- Los requisitos llegan como soluciones, no como problemas.

Si reconoces tres o más, el riesgo de valor de tu próxima funcionalidad es alto independientemente de qué tan bien la construyas.

## Cierre

El discovery no es una fase previa ni una responsabilidad ajena. Es reducir el riesgo de construir lo incorrecto, y las técnicas más efectivas son baratas: mirar los datos, hablar con cinco personas, hacerlo a mano primero.

Definir de antemano qué te haría retirar la idea es lo que convierte todo eso en aprendizaje real en vez de en justificación posterior.
