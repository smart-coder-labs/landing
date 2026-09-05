## Dos formas de fallar

Una tubería de integración falla de dos maneras, y ambas terminan igual.

**Es lenta.** Cuarenta minutos para saber si un cambio pasa. La gente empieza a agrupar cambios para no esperar, los lotes crecen, y cuando algo falla no se sabe qué lo causó.

**Es inestable.** Falla a veces sin motivo. La gente aprende a reintentar sin mirar. El día que falle por una razón real, también reintentarán.

La inestabilidad es peor que la lentitud, porque destruye la señal. Una tubería en la que nadie confía es peor que no tenerla, porque da una falsa sensación de seguridad.

## Ataca la inestabilidad primero

Una prueba que falla intermitentemente no es una molestia menor: es un incidente de proceso.

Política que funciona: cuando una prueba falla de forma intermitente, se aísla el mismo día. O se arregla, o se marca como no bloqueante con una tarea asociada y una fecha. Lo que no puede pasar es que siga en la rotación fallando a veces.

Las causas más comunes son pocas:

- Dependencia del tiempo, esperas fijas en vez de esperar una condición.
- Dependencia del orden entre pruebas.
- Estado compartido que no se limpia.
- Llamadas a servicios externos reales.
- Concurrencia sin sincronización en el arranque.

Registra las fallas por prueba a lo largo del tiempo. Casi siempre un puñado de pruebas produce la mayoría del ruido, y arreglar esas cinco cambia la percepción del equipo.

## Acorta el ciclo de retroalimentación

El objetivo no es que todo corra rápido, es que **lo que falla más seguido, falle antes**.

Ordena por costo y probabilidad:

1. Formato y análisis estático: segundos.
2. Verificación de tipos: segundos.
3. Pruebas unitarias: uno o dos minutos.
4. Pruebas de integración: varios minutos.
5. Pruebas de extremo a extremo: las más lentas y frágiles.

Si el formato falla, no tiene sentido haber corrido todo lo demás. Falla rápido y barato.

Y ejecuta en paralelo lo que no depende entre sí. La mayoría de las tuberías lentas lo son porque corren en secuencia cosas independientes.

## Lo que más acelera

**Caché de dependencias.** Instalar dependencias desde cero en cada corrida suele ser una porción grande del tiempo total. Cachear con una llave basada en el archivo de bloqueo es de las mejoras más rentables.

**Ejecutar solo lo afectado.** En un repositorio con varios paquetes, correr todo ante cualquier cambio es desperdicio. Detectar qué cambió y correr solo lo que depende de ello escala mucho mejor.

**Paralelizar las pruebas.** Repartir en varias máquinas es dinero a cambio de tiempo, y a los precios actuales el intercambio suele valer la pena.

**Quitar pruebas de extremo a extremo redundantes.** Son las más lentas y frágiles. Deberían cubrir los caminos críticos del negocio, no todos los caminos. Si tienes ciento veinte, probablemente muchas repiten lo que ya cubren pruebas más baratas.

## Que la tubería sea reproducible localmente

Si la única forma de saber si algo pasa es empujar y esperar, el ciclo es lento por diseño.

Un comando único que corra lo mismo que la tubería, con las mismas versiones, permite verificar antes de empujar. Contenedores ayudan, pero incluso un script bien hecho cambia la experiencia.

## Mide la tubería como mides producción

Datos que deberías tener a la vista:

- Duración, con percentiles, no promedio.
- Tasa de fallo, separando fallos reales de intermitentes.
- Tiempo de espera por un ejecutor disponible.
- Duración por etapa, para saber dónde está el tiempo.

Ese último número suele sorprender. Es frecuente que la mitad del tiempo esté en una etapa que nadie mira.

## Un umbral práctico

Como referencia: por debajo de diez minutos la gente espera el resultado. Por encima de veinte, cambia de tarea y pierde el contexto. Por encima de cuarenta, empieza a agrupar cambios y a saltarse el proceso.

Si tu tubería está en esa última franja, acortarla es probablemente la inversión de productividad con mejor retorno disponible.

## Cierre

Una tubería es infraestructura de producto, no un detalle de configuración. Estabilízala primero, ordena las etapas por costo, cachea las dependencias, y mídela.

El objetivo es que el equipo confíe en el resultado y no tenga que esperarlo. Cuando ambas cosas se cumplen, el resto del proceso de entrega mejora solo.
