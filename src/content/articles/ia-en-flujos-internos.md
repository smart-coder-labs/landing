## Dónde está el valor menos glamoroso

Las iniciativas de IA suelen apuntar al producto de cara al cliente, donde el riesgo es alto y el margen de error mínimo. Mientras tanto, los procesos internos, con volumen alto, tolerancia al error razonable y un experto humano ya en el circuito, quedan sin tocar.

Ese es exactamente el terreno donde la IA aplicada rinde primero.

## Cómo reconocer un buen candidato

Cuatro señales, y necesitas las cuatro:

**Alguien hace la tarea muchas veces por semana.** Sin volumen no hay retorno, por bueno que sea el resultado.

**La entrada es texto o documentos poco estructurados.** Si ya está estructurado, probablemente necesitas una consulta o una regla, no un modelo.

**Existe una persona que valida.** Esto es lo que hace el caso seguro. El sistema propone, la persona confirma, y el error se atrapa antes de tener consecuencias.

**El criterio se puede explicar con ejemplos aunque no con reglas.** Si se pudiera escribir como reglas, escríbelas: serán más baratas y predecibles.

Ejemplos que cumplen: clasificar y enrutar tickets, extraer campos de facturas o contratos, resumir llamadas para el CRM, redactar el primer borrador de una respuesta, revisar que un documento cumpla una lista de requisitos.

## El error de diseño más común

Muchos proyectos fracasan por una razón que no tiene que ver con el modelo: **agregan un paso en vez de quitarlo**.

Si el operador ahora tiene que abrir otra herramienta, pegar el texto, copiar el resultado y volver a su sistema, le agregaste trabajo. Aunque el resultado sea bueno, dejará de usarlo en dos semanas.

La integración tiene que ocurrir donde ya se hace el trabajo. El campo se llena solo y la persona corrige si hace falta. El ticket llega ya clasificado. El resumen aparece en la ficha del cliente.

La pregunta de diseño correcta no es "¿dónde ponemos la IA?", sino "¿qué campo deja de llenarse a mano?".

## Empieza por sugerir, no por decidir

Un modelo de adopción que funciona, en tres etapas:

1. **Sugerencia visible.** El sistema propone y la persona acepta o corrige. Mides la tasa de aceptación.
2. **Prellenado.** El valor viene puesto por defecto; corregirlo es un clic. Mides cuántas veces se corrige.
3. **Automático con excepciones.** Cuando la confianza es alta, pasa solo. Los casos dudosos van a revisión.

Cada etapa se gana con datos de la anterior. Saltar directo a la tres, antes de saber la tasa de acierto real, es cómo se pierde la confianza del equipo de forma permanente.

## Las correcciones son el activo

Cada vez que una persona corrige una sugerencia te está dando una etiqueta gratis. Guarda la sugerencia original, la corrección y quién la hizo.

Ese registro sirve para tres cosas: medir la calidad real en producción, encontrar los patrones donde falla, y construir el conjunto de entrenamiento si más adelante decides ajustar un modelo.

Los equipos que no guardan las correcciones tiran a la basura el único dato que su operación genera de forma natural.

## Mide lo que le importa al negocio

"El modelo acierta el ochenta y siete por ciento" no le dice nada a quien aprueba el presupuesto. Traduce:

- Minutos de trabajo por caso, antes y después.
- Casos procesados por persona y por día.
- Tiempo de respuesta al cliente.
- Errores que llegaron al cliente.

Toma la medición base **antes** de implementar nada. Sin ella no podrás demostrar la mejora, y sin demostrarla no habrá segundo proyecto.

## Qué no automatizar todavía

Deja fuera de la primera iteración:

- Decisiones con consecuencia legal o financiera directa.
- Procesos donde el error se detecta tarde o no se detecta.
- Tareas de volumen bajo, por buenas que se vean.
- Casos donde nadie del equipo puede validar el resultado.

Ese último es el más peligroso. Si nadie sabe si la salida es correcta, no estás automatizando: estás generando confianza sin fundamento.

## Cierre

La IA aplicada útil suele ser aburrida: un campo que se llena solo, un ticket que llega al área correcta, un resumen que ya está escrito cuando abres la ficha. No se demuestra bien, pero se paga rápido.

Empieza por el proceso que más veces se repite, integra donde ya se trabaja, y deja a la persona en el circuito hasta que los datos digan que puedes sacarla.
