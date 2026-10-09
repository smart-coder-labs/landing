## El problema de la conversación habitual

El equipo técnico dice que hay que refactorizar. El área de negocio pregunta qué gana con eso. Nadie tiene una respuesta comparable con la de una funcionalidad nueva, y el refactor se pospone indefinidamente hasta que algo se rompe.

El problema no es que negocio no entienda. Es que "está mal hecho" no es un argumento de priorización.

## No toda deuda tiene el mismo costo

Deuda técnica es código que te cobra intereses. La pregunta clave es **quién paga esos intereses y con qué frecuencia**.

Un módulo horrible que nadie toca desde hace dos años y funciona no te cuesta nada. Puede ser feo, tener cero pruebas y usar una biblioteca vieja; mientras no lo toques y no falle, el interés es cero.

Un módulo mediocre que se modifica cada semana te cuesta en cada modificación: más tiempo, más errores, más revisión.

**La deuda solo importa donde hay cambio.** Ese es el filtro que más ruido elimina.

## Cuatro dimensiones para clasificar

Para cada área candidata, evalúa:

**Frecuencia de cambio.** ¿Cuántas veces se tocó en los últimos seis meses? Tu historial de commits te lo dice sin necesidad de opinión.

**Costo por cambio.** ¿Cuánto tarda una modificación típica comparada con lo que debería tardar? ¿Cuántas veces se rompió algo al tocarla?

**Radio de impacto.** Si falla, ¿afecta a un usuario o a todos? ¿Se detecta de inmediato o pasa desapercibido?

**Riesgo de bloqueo.** ¿Está impidiendo algo que el negocio quiere hacer? Esta es la que traduce mejor a lenguaje de negocio.

Cruzar frecuencia con costo por cambio te da una lista corta y defendible.

## Cómo presentarlo

En vez de "hay que refactorizar el módulo de facturación", el argumento se convierte en:

"El módulo de facturación se modificó veinte veces en seis meses. Cada cambio toma alrededor de tres días porque no hay pruebas y la lógica está duplicada en cuatro lugares. Tres de los últimos cinco incidentes salieron de ahí. Estimamos que dos semanas de trabajo reducen ese ciclo a un día. Se paga en dos meses."

Eso es comparable con una funcionalidad. Puede perder la comparación, y está bien, pero al menos se decide con la misma vara.

## Tres estrategias según el caso

**Pagar.** Refactorizar de verdad. Tiene sentido cuando el área se toca mucho y va a seguir tocándose. Requiere pruebas antes de mover nada.

**Aislar.** Poner una interfaz limpia delante del desastre y no tocarlo por dentro. Muy útil cuando el módulo funciona pero es peligroso, y necesitas construir alrededor sin heredar el problema. Es la opción más subestimada.

**Convivir.** Documentar por qué está así, dejar una nota de advertencia y seguir. Correcta para código estable que nadie toca. Reconocer explícitamente que no vas a arreglarlo evita que la lista de pendientes crezca con cosas que jamás se harán.

Una lista de deuda con cien elementos que nadie va a atacar es ruido. Prefiero una de cinco donde las otras noventa y cinco están marcadas como convivir.

## Integrar el pago en el trabajo normal

Los proyectos de "sprint de refactor" fracasan seguido porque compiten con funcionalidades y siempre pierden.

Lo que funciona mejor es la regla del campamento: cuando toques un archivo para hacer algo, déjalo un poco mejor de lo que estaba. Sin desviarte a reescribir todo, pero sin dejarlo peor.

Y para deuda que requiere trabajo dedicado, tratarla como una funcionalidad más: con estimación, valor esperado y lugar en la misma lista de prioridades. Compitiendo de igual a igual con el argumento del párrafo anterior.

## La deuda que se paga sola

Cuidado con la trampa opuesta: refactorizar código que está por desaparecer. Si una funcionalidad se va a retirar en tres meses, limpiarla es esfuerzo perdido.

Antes de invertir, pregunta si ese código seguirá existiendo en un año. A veces la respuesta convierte un refactor grande en un no hacer nada.

## Cierre

La deuda técnica no es un problema moral sobre código feo. Es una decisión económica sobre dónde inviertes esfuerzo de mantenimiento.

Mide frecuencia de cambio y costo por cambio, presenta el argumento en términos de tiempo y riesgo, y acepta explícitamente que con la mayor parte vas a convivir. Eso hace que la parte que sí atacas se apruebe.
