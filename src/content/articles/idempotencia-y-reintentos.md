## El problema que aparece tarde

Un servicio llama a otro. La red falla justo después de que la petición se procesó pero antes de que la respuesta llegue. El cliente reintenta. El servidor procesa de nuevo.

Si esa operación creó un cobro, el cliente pagó dos veces.

Este escenario no es raro ni exótico: es la condición normal de cualquier sistema que atraviesa una red. La pregunta no es si va a pasar, sino qué ocurre cuando pase.

## Los tres niveles de garantía

**Como máximo una vez.** No reintentas. Simple, pero pierdes operaciones cuando hay fallos. Aceptable para métricas, inaceptable para pagos.

**Al menos una vez.** Reintentas hasta confirmar. No pierdes nada, pero puedes duplicar. Es lo que ofrecen casi todas las colas y clientes HTTP con reintentos.

**Exactamente una vez.** Lo que todos quieren. En sistemas distribuidos no existe de forma general: no puedes garantizar atómicamente que la operación ocurrió y que el emisor lo supo.

Lo que sí se puede construir es **al menos una vez más idempotencia**, que produce el mismo resultado observable. Esa es la solución real y es la que debes diseñar.

## Qué significa idempotente

Una operación es idempotente si ejecutarla varias veces con los mismos parámetros deja el sistema en el mismo estado que ejecutarla una vez.

Algunas lo son por naturaleza:

- Asignar un valor: establecer el estado a "pagado" dos veces da lo mismo.
- Borrar por identificador: borrar algo ya borrado no cambia nada.

Otras no lo son en absoluto:

- Incrementar un contador.
- Insertar una fila nueva.
- Enviar un correo.
- Cobrar una tarjeta.

Para estas necesitas hacerlas idempotentes explícitamente.

## La llave de idempotencia

El mecanismo estándar: quien llama genera un identificador único para la operación y lo envía. El servidor lo guarda junto al resultado.

```ts
async function crearCobro(llave: string, datos: DatosCobro) {
  const previo = await repo.buscarPorLlave(llave);
  if (previo) return previo.resultado;

  const resultado = await procesarCobro(datos);
  await repo.guardar({ llave, resultado });
  return resultado;
}
```

Tres detalles que deciden si esto funciona de verdad:

**La llave la genera el cliente, no el servidor.** Si la genera el servidor, cada reintento produce una llave distinta y no sirve de nada.

**El guardado y la operación deben ser atómicos.** Si procesas el cobro y luego falla el guardado de la llave, el siguiente reintento cobra otra vez. Si tu almacén lo permite, misma transacción. Si no, guarda la llave primero con estado "en proceso" y actualiza después.

**La llave debe expirar, pero no demasiado pronto.** Guardarlas para siempre hace crecer la tabla sin límite. Expirarlas en cinco minutos no cubre un reintento manual una hora después. Veinticuatro horas suele ser un punto razonable.

## Reintentar sin empeorar las cosas

Reintentar mal convierte una degradación en una caída. Tres reglas:

**Espera exponencial con variación aleatoria.** Reintentar cada segundo desde mil clientes a la vez mantiene el servicio caído. La variación aleatoria evita que todos reintenten sincronizados.

**No reintentes lo que no se va a arreglar.** Un error de validación o de autorización va a fallar igual la próxima vez. Reintenta ante tiempos de espera agotados, errores de servidor y límites de tasa. No ante errores del cliente.

**Cuenta las capas.** Si tu cliente HTTP reintenta tres veces, tu servicio reintenta tres veces y la cola reintenta tres veces, una petición puede convertirse en veintisiete. Decide en qué capa vive el reintento y quita las demás.

## Cortacircuitos

Cuando un servicio dependiente está caído, seguir enviándole peticiones no ayuda a nadie: consumes tus propios recursos esperando respuestas que no van a llegar.

Un cortacircuito detecta la racha de fallos, deja de intentar durante un periodo, y luego prueba con una petición. Convierte una espera de treinta segundos en un fallo inmediato, que es mucho mejor para quien llama.

## Efectos secundarios externos

Lo más difícil son las acciones que salen de tu sistema. No puedes deshacer un correo enviado.

Dos patrones ayudan:

**Bandeja de salida.** En la misma transacción que cambia el estado, escribes la intención de enviar en una tabla. Un proceso aparte lee esa tabla y envía, marcando lo enviado. Así el envío no se pierde si el proceso muere, y no se duplica si la transacción falla.

**Deduplicación en el destino.** Muchos proveedores aceptan una llave de idempotencia. Úsala.

## Cómo probarlo

Esto no se verifica leyendo el código. Necesitas pruebas que ejecuten la misma operación dos veces con la misma llave y verifiquen que el efecto ocurrió una sola vez.

Y en integración, inyectar fallos: cortar la conexión después de procesar pero antes de responder es exactamente el caso que rompe los sistemas mal diseñados.

## Cierre

Reintentar es la respuesta correcta a un fallo transitorio, pero solo es seguro si la operación tolera repetirse. Decide para cada operación que cruza la red si es idempotente por naturaleza, si necesita una llave, o si requiere una bandeja de salida.

Hacerlo al diseñar cuesta poco. Descubrirlo por un cobro duplicado cuesta bastante más.
