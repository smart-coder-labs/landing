## Por qué las métricas individuales fallan

Contar líneas de código, commits o tickets cerrados por persona tiene un problema estructural: la gente optimiza lo que se mide.

Si mides líneas, obtendrás código más largo. Si mides tickets cerrados, obtendrás tickets más pequeños y trabajo troceado artificialmente. Si mides velocidad en puntos, obtendrás inflación de estimaciones.

Peor aún, castigan lo valioso: la persona que borra dos mil líneas duplicadas tiene una contribución negativa. La que pasa una tarde ayudando a otros no cierra ningún ticket. La que previene un incidente no aparece en ninguna métrica.

## Mide el sistema, no a las personas

El cambio de perspectiva que resuelve la mayoría de los problemas: las métricas sirven para entender el flujo de trabajo, no para evaluar individuos.

Un equipo tarda tres semanas en llevar un cambio a producción. Eso es información accionable sobre el proceso. Que Juan cerró seis tickets y María cuatro no es información sobre nada.

Cuando las métricas se usan para evaluación individual, dejan de ser útiles como diagnóstico porque todos empiezan a jugarlas.

## Cuatro medidas de flujo que sí sirven

**Frecuencia de despliegue.** Cada cuánto llega código a producción. No porque desplegar mucho sea bueno en sí, sino porque desplegar seguido obliga a lotes pequeños, y los lotes pequeños son más fáciles de revisar, probar y revertir.

**Tiempo de ciclo.** Desde que se empieza a trabajar hasta que está en producción. Es donde se ven los cuellos de botella reales, que casi siempre son esperas: esperando revisión, esperando ambiente, esperando aprobación.

**Tasa de fallos en cambios.** Qué porcentaje de despliegues causa un problema. Si sube al acelerar, el problema es de pruebas, no de velocidad.

**Tiempo de recuperación.** Cuánto se tarda en restaurar el servicio tras un incidente. Suele importar más que la frecuencia de fallos.

Las cuatro describen el sistema y ninguna se puede atribuir a una persona.

## Desglosa el tiempo de ciclo

El número agregado dice poco. Lo útil es dónde se va:

- Tiempo hasta la primera revisión.
- Tiempo en revisión.
- Tiempo esperando ambiente de pruebas.
- Tiempo entre aprobación y despliegue.

Casi siempre hay una etapa que domina, y casi siempre es una espera, no trabajo. Un equipo que descubre que el sesenta por ciento del tiempo de ciclo es esperar revisión tiene una acción clara: acordar un tiempo máximo de respuesta, o reducir el tamaño de los cambios.

## Lo que las métricas no capturan

Ninguna medida de flujo te dice si estás construyendo lo correcto. Un equipo puede desplegar diez veces al día funcionalidades que nadie usa.

Complementa siempre con medidas de resultado: adopción de lo que se lanzó, impacto en la métrica de negocio que se buscaba mover, y si el problema del usuario efectivamente se resolvió.

Y con señales cualitativas. Preguntar al equipo qué le frena, en una encuesta breve y periódica, suele señalar problemas que ningún panel muestra: ambientes inestables, documentación ausente, dependencias de una sola persona.

## Cómo presentarlo sin generar defensividad

La forma de introducir métricas determina si funcionan.

- Explica el propósito antes de mostrar el primer número: entender el flujo, no evaluar personas.
- Comparte los datos con el equipo primero, no con dirección primero.
- No compares equipos entre sí. Contextos distintos producen números distintos sin que signifiquen nada.
- Mira tendencias, no valores absolutos. La pregunta es si mejoró respecto al mes pasado.
- Cuando una métrica empeore, la primera pregunta es qué cambió en el sistema, no quién falló.

## Cuidado con los promedios de equipo

Igual que en latencia, el promedio esconde lo que importa. Un tiempo de ciclo promedio de tres días puede significar que casi todo sale en tres días, o que la mayoría sale en horas y un tipo de cambio concreto tarda tres semanas.

Mira la distribución. Los casos de la cola larga suelen compartir una causa: tocan un módulo sin pruebas, requieren aprobación de alguien externo, o dependen de un ambiente que se rompe seguido. Esa causa es la acción concreta que sale del análisis.

Segmentar por tipo de trabajo también ayuda. Corrección urgente, funcionalidad nueva y mantenimiento tienen perfiles distintos, y mezclarlos produce un número que no describe nada.

## Una señal de alarma

Si alguien pide un ranking de desarrolladores por alguna métrica, la conversación se desvió. Ese uso destruye la utilidad diagnóstica de los datos y deteriora la confianza.

Es mejor no tener métricas que tener métricas usadas para eso.

## Cierre

Mide el flujo del trabajo, desglosa el tiempo de ciclo para encontrar las esperas, complementa con resultados de producto y con lo que el equipo reporta.

El objetivo no es saber quién produce más. Es encontrar qué está frenando al equipo, que casi nunca es la velocidad a la que la gente escribe código.
