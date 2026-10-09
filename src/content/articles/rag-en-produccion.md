## El prototipo miente

Armar un RAG de demostración toma una tarde. Cargas unos PDFs, generas embeddings, los guardas en un índice vectorial, y las respuestas salen razonables. Esa sensación de "ya está" es exactamente el problema: el prototipo se evaluó con las preguntas que tú inventaste, sobre documentos que tú elegiste, sin nadie más usándolo.

Lo que se rompe después no es el modelo. Es todo lo que rodea al modelo.

## Problema 1: la recuperación es el cuello de botella, no la generación

La intuición común es que la calidad depende del modelo de lenguaje. En la práctica, la mayoría de las respuestas malas vienen de que el fragmento correcto nunca llegó al contexto.

Tres causas dominan:

**Fragmentación arbitraria.** Partir por cada 500 caracteres corta tablas a la mitad, separa un encabezado de su contenido y deja definiciones huérfanas. Un fragmento que dice "esto aplica solo para clientes corporativos" sin decir a qué se refiere "esto" es peor que no tener nada, porque el modelo lo usará igual.

**Consultas que no se parecen a los documentos.** El usuario escribe "cuánto me devuelven si cancelo". El documento dice "política de reembolso por terminación anticipada". La similitud semántica ayuda, pero no siempre alcanza. Una reformulación previa de la consulta, o un índice híbrido que combine búsqueda léxica con vectorial, suele mover más la aguja que cambiar de modelo.

**Falta de filtros.** Si tu corpus mezcla documentos de tres países y cinco años, recuperar por similitud pura traerá la versión equivocada. Los metadatos no son opcionales: fecha, versión, jurisdicción, área. Filtra primero, ordena después.

## Problema 2: la frescura

Un índice vectorial es una copia. En el momento en que alguien edita el documento original, tu copia queda desactualizada, y nada en el sistema te avisa.

Necesitas decidir explícitamente:

- Cada cuánto se reindexará el corpus.
- Qué pasa cuando un documento se elimina, no solo cuando se edita.
- Cómo detectas que un fragmento quedó huérfano.

La forma más simple que funciona es guardar un hash del contenido de cada documento fuente junto a sus fragmentos. En cada corrida de ingesta comparas hashes, y solo reprocesas lo que cambió. Además te da una respuesta clara a la pregunta "¿está el índice al día?", que alguien va a hacer eventualmente.

## Problema 3: nadie sabe si mejoró

Este es el que hunde más proyectos. Alguien ajusta el prompt, prueba tres preguntas, le parece mejor, y hace deploy. Dos semanas después nadie sabe si el sistema está mejor o peor que al principio.

Sin un conjunto de evaluación no estás iterando, estás adivinando.

Lo mínimo viable es un archivo con entre 50 y 100 casos reales: una pregunta, los fragmentos que deberían recuperarse y una respuesta aceptable. Con eso puedes medir dos cosas por separado:

1. **Recuperación**: ¿el fragmento correcto apareció entre los primeros resultados?
2. **Generación**: dado el contexto correcto, ¿la respuesta fue fiel a ese contexto?

Separarlas importa porque las soluciones son distintas. Si falla la recuperación, cambiar de modelo no arregla nada.

```ts
type CasoEvaluacion = {
  pregunta: string;
  fragmentosEsperados: string[];
  respuestaAceptable: string;
};

function recuperacionEnK(caso: CasoEvaluacion, recuperados: string[], k: number) {
  const top = recuperados.slice(0, k);
  return caso.fragmentosEsperados.some((id) => top.includes(id));
}
```

Este archivo se construye una vez y se mantiene. Cada vez que alguien reporta una respuesta mala, ese caso entra al conjunto. En seis meses tienes un activo que vale más que cualquier ajuste de prompt.

## Problema 4: los costos no escalan como esperas

El costo por consulta parece bajo hasta que multiplicas. Y crece por vías que no son obvias:

- Meter más fragmentos "por si acaso" multiplica los tokens de entrada en cada consulta.
- Los reintentos por errores transitorios duplican el gasto silenciosamente.
- Reindexar el corpus completo cada noche, cuando cambió el dos por ciento, es gasto puro.

Antes de optimizar el modelo, mide dónde se va el dinero. Casi siempre es contexto inflado o reprocesamiento innecesario, no el precio por token.

## Problema 5: las respuestas sin fuente no son utilizables

Si el sistema responde sin decir de dónde salió la información, el usuario no puede verificar y tú no puedes depurar. Cuando alguien reporte una respuesta incorrecta, no tendrás forma de saber si el fragmento estaba mal, si no se recuperó, o si el modelo lo interpretó mal.

Citar la fuente no es una función de lujo. Es lo que convierte una herramienta interesante en una herramienta usable en un contexto profesional.

## Qué construir primero

Si estás por empezar, el orden que menos retrabajo genera:

1. Ingesta con metadatos y hashes desde el día uno. Reponerlos después es doloroso.
2. Un conjunto de evaluación mínimo antes de ajustar nada.
3. Recuperación híbrida con filtros por metadatos.
4. Citación de fuentes en cada respuesta.
5. Solo entonces, ajustar el prompt y el modelo.

La mayoría de los equipos hace este orden al revés y pasa meses ajustando prompts sobre una recuperación defectuosa.

## Cierre

RAG no es una técnica difícil. Es un sistema de datos con un modelo de lenguaje al final, y falla por las razones por las que fallan los sistemas de datos: entradas sucias, sincronización, falta de medición y costos que nadie mira.

Si tu prototipo funciona y no sabes por qué, tampoco vas a saber por qué dejó de funcionar.
