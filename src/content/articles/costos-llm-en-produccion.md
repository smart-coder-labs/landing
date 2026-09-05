## La factura sorpresa

El patrón se repite: el piloto costaba poco, se abre a más usuarios, y la factura crece más rápido que el uso. Cuando alguien revisa, el reflejo es buscar un modelo más barato. Casi nunca es ahí donde está el problema.

## Primero, mide por operación

No puedes optimizar lo que ves como un total mensual. Necesitas costo por operación de negocio: por consulta respondida, por documento procesado, por ticket clasificado.

Registra en cada llamada: tokens de entrada, tokens de salida, modelo, latencia, y a qué operación pertenece. Sin ese registro, cualquier optimización es adivinanza.

Cuando lo tengas, casi siempre descubrirás que una parte pequeña de las operaciones consume la mayoría del gasto.

## Fuga 1: contexto inflado

La más común con diferencia. En sistemas con recuperación, la tentación es meter más fragmentos "por si acaso". Pasar de tres a diez fragmentos triplica los tokens de entrada de cada consulta, y con frecuencia empeora la calidad porque el modelo se distrae con material irrelevante.

Mide la calidad con tres, cinco y diez fragmentos. Suele haber un punto donde agregar más no mejora nada y solo suma costo.

Lo mismo aplica al historial de conversación. Enviar los últimos veinte mensajes en cada turno significa que la conversación se vuelve progresivamente más cara. Resumir lo viejo y mantener lo reciente cuesta una llamada barata y ahorra muchas caras.

## Fuga 2: reintentos invisibles

Un cliente configurado con tres reintentos automáticos, ante un error transitorio, cobra tres veces. Si además tienes reintentos en una capa superior, se multiplican.

Revisa cuántas capas de reintento tienes realmente. Y registra los reintentos como eventos separados, porque si se suman al total sin distinción, no verás el problema.

## Fuga 3: reprocesar lo que no cambió

Reindexar el corpus completo cada noche cuando cambió el dos por ciento es gasto puro. Lo mismo con reprocesar documentos idénticos porque no guardaste un hash.

```ts
const hash = sha256(contenido);
if (hash === guardado.hash) return guardado.resultado;
const resultado = await procesar(contenido);
await guardar({ hash, resultado });
```

Diez líneas que eliminan una categoría entera de gasto.

## Fuga 4: usar el modelo grande para todo

No todas las operaciones necesitan el modelo más capaz. Clasificar la intención de un mensaje, decidir si una consulta necesita búsqueda, extraer un campo de un texto corto: son tareas donde un modelo pequeño acierta igual a una fracción del precio.

El patrón útil es enrutar: un modelo barato resuelve los casos simples y escala al grande solo cuando hace falta. Requiere medir en qué porcentaje de casos el pequeño es suficiente, pero ese porcentaje suele ser alto.

## Fuga 5: no cachear lo repetido

En muchos productos, una porción significativa de las consultas se repite casi literalmente. Un caché sobre consultas normalizadas elimina ese gasto por completo.

Cuidado con la invalidación: si la respuesta depende de datos que cambian, el caché necesita una llave que incluya la versión de esos datos.

## Salidas largas cuestan más que entradas largas

Los tokens de salida suelen ser bastante más caros que los de entrada. Una instrucción de brevedad y un límite explícito de tokens de salida tienen efecto directo en la factura, y con frecuencia mejoran la experiencia.

## Un ejemplo de dónde estaba el dinero

Un sistema de soporte con recuperación gastaba una cifra que nadie esperaba. El desglose por operación mostró esto:

- El sesenta por ciento del gasto venía de una sola operación: el resumen de conversación que se ejecutaba en **cada** mensaje, incluso cuando la conversación tenía dos turnos.
- Un veinte por ciento eran reintentos, porque había reintentos en el cliente y también en la capa de servicio.
- El resto se repartía entre consultas reales.

Ninguna de esas fugas se arregla cambiando de modelo. La primera se resolvió ejecutando el resumen solo a partir del sexto turno. La segunda, quitando una de las dos capas de reintento. Entre las dos, el gasto bajó a una fracción sin tocar la calidad.

El punto no son los números concretos, que dependen de cada sistema. Es que sin desglose por operación nadie habría mirado el resumen de conversación, porque no era la funcionalidad principal.

## Controles que evitan sorpresas

Independientemente de la optimización, pon barreras:

- Límite de gasto por usuario y por día.
- Límite de tokens por operación.
- Alerta cuando el costo diario supere el promedio de la semana por un margen.

Una alerta que llega el mismo día es la diferencia entre un ajuste y un problema.

## Cierre

Antes de cambiar de proveedor o de modelo, mide por operación. En la mayoría de los sistemas que revisamos, la mayor parte del ahorro estaba en contexto innecesario, reprocesamiento y ausencia de caché, no en el precio por token.
