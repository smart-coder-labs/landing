## Qué compras y qué pagas

Con eventos, un servicio publica que algo ocurrió y otros reaccionan sin que el emisor sepa quiénes son. Eso compra tres cosas:

- **Desacoplamiento.** Agregar un consumidor nuevo no toca al emisor.
- **Absorción de picos.** La cola amortigua cuando el consumidor va más lento.
- **Tolerancia a fallos.** Si un consumidor está caído, los eventos esperan.

Y paga con otras tres:

- **Flujo difícil de seguir.** Ninguna función muestra la secuencia completa. Sin trazas, entender qué pasó es arqueología.
- **Consistencia eventual.** Hay una ventana donde el sistema está en estados intermedios, y la interfaz tiene que contarlo.
- **Orden y duplicados.** Los eventos pueden llegar desordenados o repetidos, y hay que diseñar para eso.

Si tu sistema son tres servicios que se llaman en secuencia y responden en cien milisegundos, una llamada directa es más simple y más fácil de depurar. No conviertas eso en eventos porque suene moderno.

## Cuándo sí

Tres señales claras:

**Muchos interesados en el mismo hecho.** "Se creó un pedido" dispara facturación, inventario, notificación y análisis. Con llamadas directas, el servicio de pedidos conoce a los cuatro y falla si uno falla.

**Trabajo que no debe bloquear la respuesta.** Generar un PDF, enviar un correo, recalcular un reporte. El usuario no tiene por qué esperarlo.

**Picos que no quieres propagar.** Una carga masiva que satura al consumidor lento. La cola convierte un pico en un flujo sostenido.

## Eventos, no comandos disfrazados

Un error de diseño frecuente: publicar "generar factura". Eso es un comando con otro nombre. El emisor sigue sabiendo qué debe pasar después, y el acoplamiento no desapareció, solo se volvió indirecto.

Un evento describe **algo que ya ocurrió**, en pasado, sin decir qué hacer: "pedido confirmado". Quién reacciona y cómo no es asunto del emisor.

Esa distinción decide si realmente ganas desacoplamiento.

## Qué poner dentro del evento

Dos escuelas, con un intercambio real.

**Evento delgado.** Solo identificadores. El consumidor consulta lo que necesita. Ventaja: el contrato es pequeño y estable. Desventaja: cada consumidor hace una llamada de vuelta, y ese servicio se vuelve un cuello de botella.

**Evento gordo.** Lleva los datos relevantes. Ventaja: el consumidor es autónomo. Desventaja: el contrato es mayor y los datos son una foto del momento.

Un punto medio que funciona: identificadores más los campos que casi todos los consumidores necesitan, más la versión del recurso para que quien requiera el detalle completo pueda pedirlo sabiendo de qué momento habla.

## Entrega al menos una vez, siempre

Prácticamente todas las infraestructuras de mensajería garantizan al menos una vez. Eso significa que **tus consumidores van a recibir duplicados**, con certeza, no como caso raro.

Cada consumidor debe ser idempotente. El patrón más simple: cada evento lleva un identificador único, y el consumidor registra los procesados.

```ts
async function manejar(evento: Evento) {
  if (await yaProcesado(evento.id)) return;
  await procesar(evento);
  await marcarProcesado(evento.id);
}
```

El orden también es problema tuyo, no de la infraestructura. Si un consumidor necesita orden, particiona por la llave que lo garantiza, o incluye un número de secuencia y descarta lo viejo.

## La transacción y la publicación

Un fallo clásico: guardas en la base de datos y publicas el evento. Si la publicación falla, tienes un pedido sin notificar. Si publicas primero y falla el guardado, notificaste algo que no existe.

La solución estándar es la bandeja de salida: en la misma transacción que cambia el estado, insertas el evento en una tabla. Un proceso aparte lee esa tabla y publica.

Así el evento se publica si y solo si el cambio se guardó, que es exactamente la garantía que necesitas.

## Sin trazas estás ciego

Es el punto donde más equipos sufren. Un flujo de seis eventos entre cuatro servicios, cuando falla, sin correlación, es imposible de reconstruir.

Cada evento debe llevar un identificador de correlación que se propague por toda la cadena y aparezca en todos los registros. No es opcional en un sistema de eventos: es la diferencia entre depurar y adivinar.

Y necesitas cola de mensajes fallidos con visibilidad. Los eventos que no se pudieron procesar no pueden desaparecer en silencio; alguien tiene que verlos y decidir.

## Empieza pequeño

No hace falta convertir todo. Un patrón de adopción sensato: mantén las llamadas directas donde el flujo es simple y síncrono, e introduce eventos solo donde tengas varios interesados o trabajo que no debe bloquear.

Un sistema híbrido bien delimitado es mejor que una migración completa hecha por convicción arquitectónica.

## Cierre

Los eventos son una herramienta para desacoplar y absorber carga, con un costo real en trazabilidad y complejidad. Adóptalos donde tengas varios consumidores del mismo hecho o trabajo diferible.

Y si lo haces, la idempotencia, la bandeja de salida y la correlación no son mejoras posteriores. Son parte del costo de entrada.
