## El patrón

Un equipo construye un piloto en semanas. La demostración sale bien, hay entusiasmo, se aprueba llevarlo a producción. Meses después el proyecto sigue "casi listo" y poco a poco deja de mencionarse.

Las causas se repiten entre organizaciones muy distintas, y casi ninguna tiene que ver con el modelo.

## Causa 1: el piloto se evaluó con datos elegidos

Los datos del piloto los eligió alguien que quería que funcionara. Documentos limpios, casos representativos, preguntas bien escritas.

Producción trae escaneos torcidos, documentos de 2019 con otro formato, campos vacíos, tres idiomas mezclados y usuarios que escriben en abreviaturas.

**Antídoto:** que el piloto incluya desde el principio una muestra aleatoria de datos reales, no seleccionada. Si el equipo se resiste a eso, esa resistencia ya te está diciendo algo.

## Causa 2: nadie definió qué es suficientemente bueno

"Que funcione bien" no es un criterio. Sin un umbral acordado antes de empezar, la conversación al final es sobre impresiones y siempre gana quien tenga más autoridad en la sala.

**Antídoto:** acordar por escrito, antes de construir, el nivel de acierto mínimo, sobre qué conjunto de casos se mide, y qué pasa con los casos que no lo alcanzan. Que un porcentaje falle no es el problema; no haber definido qué hacer con ese porcentaje sí lo es.

## Causa 3: se ignoró el flujo de trabajo real

El piloto es una interfaz separada donde alguien pega texto. En producción, la persona ya trabaja en otro sistema, con sus atajos y su ritmo.

Si usar la nueva herramienta implica cambiar de ventana, el proyecto muere por falta de uso aunque el modelo sea excelente.

**Antídoto:** decidir el punto de integración antes que la arquitectura del modelo. Si no puedes integrarlo donde se trabaja, el proyecto tiene un problema de alcance, no de tecnología.

## Causa 4: no hay dueño operativo

El piloto lo hizo un equipo de innovación o un consultor externo. Nadie del área que lo usará se considera responsable de que siga funcionando.

Cuando el modelo se degrade, cuando cambie el formato de un documento, cuando aparezca un caso nuevo, no habrá quién reaccione.

**Antídoto:** definir desde el inicio quién es responsable de la calidad en operación, con nombre. Si nadie quiere serlo, el proyecto no tiene suficiente respaldo para producción.

## Causa 5: la evaluación no sobrevivió al piloto

Durante el piloto alguien revisaba resultados a diario. En producción nadie mira, hasta que un cliente se queja.

Los sistemas con modelos se degradan de formas silenciosas: cambia la distribución de entradas, se actualiza el modelo del proveedor, alguien edita un prompt sin medir.

**Antídoto:** monitoreo continuo sobre una muestra, no solo métricas de infraestructura. Un porcentaje de casos revisados cada semana, con la tendencia visible para el dueño operativo.

## Causa 6: el costo por caso nunca se calculó

Se aprueba el proyecto con el costo del piloto, que operó con volumen mínimo. Al escalar, el costo por caso resulta comparable o superior al del trabajo manual que reemplaza.

**Antídoto:** calcular el costo por caso con volumen de producción antes de comprometerse. Incluyendo la revisión humana, que rara vez desaparece por completo.

## Causa 7: se prometió autonomía total

Se vendió que el sistema haría el trabajo solo. La realidad es que acierta la mayoría de las veces y necesita supervisión en el resto.

Cuando la expectativa era cien por ciento, un noventa por ciento se percibe como fracaso. Con la expectativa correcta, ese mismo noventa por ciento es un ahorro enorme.

**Antídoto:** presentar el proyecto desde el principio como asistencia con supervisión. La autonomía se gana con datos acumulados, no se promete en la propuesta.

## Una lista de verificación antes de aprobar

- ¿El piloto usó una muestra aleatoria de datos reales?
- ¿Hay un umbral de calidad escrito y acordado?
- ¿Está decidido dónde se integra, en el sistema donde ya se trabaja?
- ¿Hay una persona con nombre responsable en operación?
- ¿Existe medición continua planificada, no solo durante el piloto?
- ¿Está calculado el costo por caso a volumen real?
- ¿La expectativa comunicada es asistencia, no reemplazo?

Si tres o más respuestas son no, el proyecto no está listo para producción independientemente de qué tan bien salió la demostración.

## Cierre

La distancia entre un piloto y un sistema en producción rara vez es técnica. Es de datos reales, criterios acordados, integración, propiedad y medición sostenida.

Los proyectos que sobreviven no son los que tuvieron mejor modelo. Son los que resolvieron esas seis cosas antes de escribir la primera línea.
