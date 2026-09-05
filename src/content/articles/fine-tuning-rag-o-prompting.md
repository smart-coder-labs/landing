## Tres herramientas para problemas distintos

La discusión suele plantearse como si fueran alternativas competidoras. No lo son. Resuelven cosas diferentes y con frecuencia se combinan.

- **Prompting** cambia cómo el modelo aborda la tarea.
- **RAG** le da información que no tiene.
- **Fine-tuning** cambia cómo responde de forma estable.

Elegir mal suele venir de confundir el síntoma. "El modelo no sabe de nuestro producto" es un problema de conocimiento, no de comportamiento, y no se arregla con fine-tuning.

## La pregunta de diagnóstico

Mira una respuesta mala y clasifícala:

**¿Le faltó información?** El modelo no podía saber tu política de devoluciones porque no está en sus datos de entrenamiento. Necesitas RAG. Ninguna cantidad de fine-tuning va a meter datos que cambian cada semana.

**¿Tenía la información pero respondió con el formato o tono equivocado?** Necesitas prompting, y si el patrón es muy consistente y el prompt se vuelve enorme, fine-tuning.

**¿Entendió mal la tarea?** Prompting, casi siempre. Instrucciones más claras y ejemplos.

Esta clasificación sobre veinte respuestas malas reales te dice dónde invertir mejor que cualquier recomendación general.

## Prompting: empieza aquí siempre

Es reversible, instantáneo y gratis de probar. Antes de considerar cualquier otra cosa, agota:

- Instrucciones explícitas sobre formato y límites.
- Entre tres y cinco ejemplos representativos, incluyendo casos difíciles.
- Descomponer la tarea en pasos en lugar de pedir todo de una.

El límite del prompting aparece cuando el prompt crece tanto que se vuelve caro en cada llamada, o cuando necesitas consistencia que los ejemplos no logran.

## RAG: cuando el problema es conocimiento

Úsalo cuando la información es específica de tu organización, cambia con frecuencia, o debe poder citarse.

Su ventaja estructural es la actualización: cambias el documento y la próxima respuesta ya refleja el cambio. Con fine-tuning, cualquier cambio implica reentrenar.

Su costo es que ahora tienes un sistema de datos que mantener: ingesta, índice, sincronización, evaluación de la recuperación. Ese costo es real y permanente.

## Fine-tuning: cuando el problema es comportamiento

Tiene sentido en tres casos concretos:

**Formato de salida muy específico y estable.** Si necesitas siempre una estructura exacta y el prompting falla en un porcentaje inaceptable, entrenar sobre miles de ejemplos correctos es más confiable.

**Estilo o criterio difícil de escribir.** Hay juicios que un experto aplica sin poder explicarlos en reglas. Con suficientes ejemplos etiquetados, el modelo los aproxima.

**Reducir costo.** Un modelo pequeño ajustado puede igualar a uno grande con prompt extenso, a una fracción del precio por llamada. Con volumen alto, esto se paga solo.

Lo que fine-tuning no hace: agregar conocimiento factual confiable. El modelo aprende el patrón de las respuestas, no memoriza hechos de forma recuperable.

## Los costos reales del fine-tuning

Se subestiman sistemáticamente:

- **Datos etiquetados.** Necesitas de cientos a miles de ejemplos de calidad. Producirlos es el grueso del trabajo, no el entrenamiento.
- **Mantenimiento.** Cuando cambie el modelo base o tu producto, hay que rehacerlo.
- **Evaluación propia.** Sin un conjunto de evaluación no sabrás si el ajuste mejoró o solo cambió cosas.
- **Bloqueo.** Quedas atado a un proveedor y a una versión de modelo.

## Un orden que funciona

1. Prompting hasta agotarlo, midiendo con casos reales.
2. Si faltan datos, agrega RAG.
3. Si el formato o el criterio siguen fallando de forma consistente, considera fine-tuning.
4. Si el costo por llamada es el problema y ya tienes calidad, fine-tuning de un modelo pequeño.

Saltarse los pasos uno y dos para ir directo al tres es el error más caro, porque produce meses de trabajo sobre un diagnóstico equivocado.

## Cómo se ve cada decisión en la práctica

Tres situaciones reales para hacerlo concreto.

**Un asistente que responde sobre las políticas internas de una empresa.** Las políticas cambian cada trimestre y deben poder citarse. Es RAG, sin discusión. Entrenar un modelo sobre ellas produciría un sistema que afirma con seguridad una versión vieja y no puede señalar la fuente.

**Un extractor que convierte facturas en asientos contables.** El conocimiento necesario está en la factura misma, así que no hay nada que recuperar. Lo que falla es la consistencia del formato de salida. Empieza con prompting y ejemplos; si tras medir sigue fallando en un porcentaje inaceptable, hay un caso claro de fine-tuning con los ejemplos que ya acumulaste.

**Un clasificador de tickets de soporte por área.** Alto volumen, tarea acotada, criterio propio de la empresa. Aquí fine-tuning de un modelo pequeño suele ganar por costo: iguala la calidad del modelo grande a una fracción del precio, y el volumen amortiza el esfuerzo de etiquetado.

## Se combinan

En sistemas maduros suele haber los tres: RAG para el conocimiento, un modelo ajustado para el formato, y prompting para el control fino. No son excluyentes.

Un patrón frecuente: recuperas los documentos relevantes, un modelo pequeño ajustado extrae los campos con el formato exacto que necesitas, y el prompt controla qué hacer cuando la información no está. Cada pieza resuelve lo que sabe resolver.

## Cierre

La decisión no depende de cuál técnica es mejor, sino de qué está fallando. Diagnostica primero sobre respuestas reales; la herramienta correcta suele volverse obvia.
