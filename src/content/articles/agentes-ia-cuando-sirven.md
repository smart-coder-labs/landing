## Qué es realmente un agente

Descontando el marketing, un agente es un bucle: el modelo decide una acción, se ejecuta esa acción, el resultado vuelve al modelo, y se repite hasta terminar. Eso es todo. Lo que lo distingue de una llamada normal es que el número de pasos y la secuencia no están decididos de antemano.

Esa propiedad, no saber de antemano la secuencia, es exactamente donde está el valor y también todo el costo.

## La pregunta que decide

Antes de construir un agente, respóndete: **¿puedo escribir el flujo de antemano?**

Si la respuesta es sí, escríbelo. Un flujo fijo con tres llamadas al modelo es más rápido, más barato, más fácil de depurar y más fácil de probar que un agente que descubre esos mismos tres pasos en tiempo de ejecución.

La mayoría de los casos que se implementan como agentes son en realidad flujos fijos disfrazados. "Extrae los datos de la factura, valídalos contra el catálogo, genera el asiento contable" es una secuencia conocida. No necesita autonomía, necesita tres funciones.

## Cuándo un agente sí aporta

Hay tres situaciones donde la autonomía paga su costo:

**El espacio de acciones es grande y la ruta depende de los datos.** Un asistente de análisis que puede consultar cinco fuentes distintas y no sabe cuál necesita hasta ver la pregunta. Codificar todas las combinaciones sería peor que dejar que decida.

**El número de pasos es variable por naturaleza.** Depurar un fallo, refinar una búsqueda hasta encontrar algo, negociar con una API que devuelve resultados parciales. No sabes si tomará dos o doce iteraciones.

**El resultado se puede verificar automáticamente.** Este es el que más se ignora y el que más importa. Un agente que escribe código puede ejecutarlo y ver si pasa las pruebas. Ese ciclo de verificación es lo que hace que la autonomía converja en vez de divagar. Sin verificación, un agente es un generador de texto con pasos extra.

## Lo que cuesta

Sé explícito sobre el precio antes de decidir:

- **Latencia multiplicada.** Cada iteración es una llamada completa. Un agente de seis pasos con dos segundos por paso son doce segundos. Para un flujo interno puede estar bien. Para una interfaz donde alguien espera, no.
- **Costo impredecible.** No puedes estimar el costo por operación porque no sabes cuántos pasos tomará. Necesitas un límite duro de iteraciones y de presupuesto, siempre.
- **Depuración difícil.** Cuando falla el paso nueve, reproducir el estado exacto que llevó ahí es trabajo. Sin trazas completas de cada decisión, cada entrada y cada salida, estás ciego.
- **Fallas compuestas.** Si cada paso acierta el noventa y cinco por ciento de las veces, diez pasos encadenados aciertan el sesenta por ciento. La confiabilidad se degrada rápido con la longitud.

## Diseño defensivo

Si decides que sí necesitas un agente, tres decisiones que ahorran dolor:

**Límites duros.** Máximo de iteraciones, máximo de tokens, tiempo máximo. Sin excepción. Un agente sin límite es un incidente esperando ocurrir.

**Herramientas de alcance reducido.** Una herramienta que ejecuta consultas arbitrarias contra la base de datos es una superficie de ataque y una fuente de errores. Herramientas específicas, con parámetros validados y permisos mínimos, hacen que las decisiones malas del modelo tengan consecuencias acotadas.

```ts
// Demasiado amplio: cualquier consulta, cualquier tabla.
const ejecutarSQL = (consulta: string) => db.query(consulta);

// Acotado: una intención, parámetros validados, permisos claros.
const buscarPedidosDeCliente = (clienteId: string, desde: string) =>
  db.pedidos.buscar({ clienteId, desde, limite: 50 });
```

**Puntos de control humanos.** Para acciones con consecuencias reales, enviar un correo, mover dinero, borrar datos, el agente propone y una persona confirma. La autonomía completa se gana con evidencia, no se asume.

## Una prueba práctica

Antes de construir, haz el ejercicio manualmente. Toma diez casos reales y resuélvelos tú, anotando qué pasos diste.

Si los diez casos siguieron la misma secuencia, no necesitas un agente. Si cada caso fue distinto y tuviste que decidir sobre la marcha, tal vez sí.

Este ejercicio toma una tarde y ahorra semanas.

## Cierre

Los agentes son una herramienta legítima para problemas donde la secuencia no se puede predecir y el resultado se puede verificar. Fuera de esas condiciones, casi siempre pierdes contra un flujo explícito.

La pregunta útil no es si puedes construir un agente. Es si el problema realmente requiere que la secuencia se decida en tiempo de ejecución.
