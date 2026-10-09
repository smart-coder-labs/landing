## El problema de fondo

En software tradicional una prueba tiene una respuesta correcta. En un sistema con modelo de lenguaje, muchas respuestas distintas pueden ser correctas y muchas respuestas parecidas pueden ser inaceptables. Eso rompe la intuición habitual sobre pruebas, y la reacción común es abandonar la medición y confiar en la impresión.

La impresión es un mal instrumento. Es sensible al último ejemplo que viste y ciega a las regresiones.

## Empieza por definir qué es "malo"

Antes de medir nada, escribe qué tipos de falla te importan. No en abstracto: con ejemplos reales de tu producto.

Para un asistente de soporte podrían ser:

- Inventa una política que no existe.
- Responde correcto pero con un tono inapropiado.
- Se niega a responder algo que sí debería responder.
- Responde en el idioma equivocado.
- Filtra información de otro cliente.

Esta lista es específica de tu dominio y es más valiosa que cualquier métrica genérica. Además revela desacuerdos: es frecuente que dos personas del mismo equipo tengan ideas distintas de qué es una respuesta aceptable, y es mejor descubrirlo ahora.

## Construye el conjunto de casos con datos reales

El error más común es inventar las preguntas. Las preguntas inventadas son más limpias, mejor escritas y más predecibles que las reales. Un sistema que funciona con ellas puede fallar completamente con usuarios de verdad, que escriben con errores, contexto implícito y varias preguntas mezcladas.

Fuentes reales que ya tienes: tickets de soporte, búsquedas internas, correos de clientes, mensajes de chat. Toma cien, anonimízalos y úsalos como base.

Incluye deliberadamente:

- Casos frecuentes y aburridos, que son la mayoría del tráfico.
- Casos límite conocidos.
- Casos que el sistema debe rechazar.
- Casos ambiguos donde la respuesta correcta es pedir aclaración.

## Tres niveles de medición, de más barato a más caro

**Nivel 1: reglas determinísticas.** Baratas, rápidas, sin ambigüedad. ¿La respuesta cita una fuente? ¿Está en el idioma correcto? ¿Contiene un número de documento con el formato válido? ¿Excede el largo máximo? Muchas fallas graves se atrapan aquí y no necesitas nada sofisticado.

```ts
const reglas = [
  { nombre: 'cita fuente', ok: (r) => /\[fuente:/.test(r) },
  { nombre: 'sin datos personales', ok: (r) => !/\b\d{6,}\b/.test(r) },
  { nombre: 'largo razonable', ok: (r) => r.length < 2000 },
];
```

**Nivel 2: comparación con referencia.** Para preguntas con respuesta acotada, compara contra la respuesta esperada. Sirve para hechos concretos, no para texto abierto.

**Nivel 3: juicio de un modelo.** Un modelo evalúa la respuesta contra un criterio escrito. Es el más flexible y el más fácil de usar mal. Dos precauciones: define el criterio con ejemplos de aprobado y reprobado, y calibra contra juicio humano en una muestra. Si tu evaluador automático no coincide con una persona en al menos el ochenta por ciento de los casos, estás midiendo ruido.

## Mide componentes, no solo el resultado final

Si tu sistema recupera documentos y luego genera, mide ambas etapas por separado. Una respuesta mala puede venir de una recuperación mala o de una generación mala, y la solución es completamente distinta.

Lo mismo aplica a sistemas con varios pasos. Un agente que llama tres herramientas puede fallar en la elección de herramienta, en los argumentos o en la interpretación del resultado. Un número global no te dice cuál.

## Ejecuta la evaluación en cada cambio

Esto es lo que separa la medición del teatro. Si la evaluación solo corre cuando alguien se acuerda, no te protege de regresiones.

Debe correr automáticamente ante cualquier cambio de prompt, de modelo, de parámetros de recuperación o de versión de una dependencia. Y el resultado debe compararse contra la corrida anterior, no contra un umbral absoluto. Lo que te interesa es la dirección.

Acepta que habrá variación entre corridas. Fija la temperatura donde puedas y corre cada caso varias veces cuando la variabilidad importe.

## Los números que no debes reportar

Cuidado con las métricas que suben sin que nada mejore:

- **Promedios sin distribución.** Un promedio de 4.2 sobre 5 puede esconder que el diez por ciento de los casos falla catastróficamente. En muchos productos, ese diez por ciento es lo único que importa.
- **Precisión sobre casos fáciles.** Si tu conjunto tiene ochenta por ciento de preguntas triviales, el número global se mueve poco aunque los casos difíciles empeoren. Segmenta por dificultad.
- **Métricas sin costo ni latencia.** Una configuración que mejora dos puntos de calidad y triplica el costo puede no ser una mejora en tu contexto.

## Cierre

Evaluar un sistema con LLM no requiere infraestructura sofisticada. Requiere decidir qué es una falla, juntar casos reales, medir por componente y correrlo siempre.

El objetivo no es un número bonito para presentar. Es poder responder con evidencia si el cambio que hiciste ayer mejoró o empeoró el producto.
