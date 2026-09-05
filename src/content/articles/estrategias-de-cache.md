## Antes de cachear, mide

El caché es una optimización, y como toda optimización se aplica después de medir. Añadirlo antes de saber dónde está el costo agrega una fuente de inconsistencia sin beneficio comprobado.

Si una consulta tarda ochenta milisegundos y se ejecuta diez veces al día, cachearla no aporta nada. Si tarda ocho milisegundos pero se ejecuta cinco mil veces por minuto, ahí sí hay algo.

## Dónde puede vivir

Cada nivel tiene un compromiso distinto entre velocidad y dificultad de invalidación.

**En el navegador.** El más rápido y el más difícil de invalidar: no controlas el cliente. Por eso los archivos estáticos llevan un hash en el nombre. Nunca invalidas; cambias la URL.

**En la CDN.** Rápido y con purga programática. Ideal para respuestas idénticas para todos los usuarios. Cuidado absoluto con cachear respuestas personalizadas: es la causa más común de filtrar datos de un usuario a otro.

**En memoria del proceso.** Sin latencia de red, pero cada instancia tiene su copia. Con cinco instancias puedes tener cinco versiones distintas de la verdad. Solo para datos que toleran desactualización.

**En un caché compartido.** Coherente entre instancias, con costo de una llamada de red. El punto de partida razonable para la mayoría de los casos.

## Los tres patrones

**Consultar al lado.** La aplicación busca en el caché; si no está, va a la fuente y guarda. Es el más común y el más simple de razonar. Su punto débil: ante muchas peticiones simultáneas de una llave ausente, todas van a la fuente a la vez.

**Escribir a través.** Cada escritura actualiza fuente y caché juntos. Mantiene coherencia pero encarece las escrituras.

**Escribir detrás.** Se escribe al caché y se persiste después. Rápido y arriesgado: si el caché cae antes de persistir, pierdes datos. Solo para casos donde esa pérdida es tolerable.

## Invalidación: las tres opciones

**Por tiempo de vida.** La más simple y suficiente en más casos de los que se admite. Aceptas que el dato puede estar desactualizado hasta n segundos. Requiere una conversación honesta con negocio sobre cuánta desactualización es tolerable, y la respuesta suele ser más generosa de lo que el equipo técnico supone.

**Explícita.** Cuando cambia el dato, borras la llave. Precisa, y frágil: cada camino que modifica el dato debe acordarse de invalidar. En cuanto alguien agrega un camino nuevo y lo olvida, tienes datos rancios difíciles de diagnosticar.

**Por versión en la llave.** La más robusta. En vez de invalidar, cambias la llave.

```ts
const llave = ["producto", id, producto.actualizadoEn].join(":");
```

Cuando el producto cambia, la llave cambia y el valor viejo queda huérfano hasta expirar. No hay invalidación que olvidar, porque no hay invalidación.

## La estampida

Cuando expira una llave muy solicitada, todas las peticiones concurrentes fallan en el caché a la vez y golpean la fuente juntas. Un caché que debía proteger la base de datos termina causando el pico que la tumba.

Dos mitigaciones:

- **Variación en la expiración.** Si todas las llaves se generan a la vez con el mismo tiempo de vida, expiran a la vez. Suma un margen aleatorio.
- **Recalcular una sola vez.** Que solo la primera petición recalcule y las demás esperen ese resultado, con un bloqueo corto.

## Datos personalizados

La regla que evita el peor incidente posible: **si la respuesta depende de quién pregunta, el identificador del usuario o del inquilino va en la llave del caché.** Sin excepciones.

Y en la CDN, si una respuesta puede ser personalizada, no la caches por defecto. La configuración predeterminada debe ser no cachear, y se habilita explícitamente para lo que es público.

## Observa el caché

Sin métricas no sabes si sirve. Como mínimo: proporción de aciertos, latencia con y sin acierto, y uso de memoria.

Una proporción de aciertos baja significa que el caché agrega latencia sin beneficio. Si está por debajo del cincuenta por ciento, revisa si tiene sentido mantenerlo.

## Cierre

Empieza con expiración por tiempo, que es lo más simple que puede funcionar. Sube a llaves versionadas cuando la desactualización sea inaceptable. Deja la invalidación explícita para cuando no haya alternativa, porque es la que más se olvida.

Y mide antes y después: un caché que nadie mide es una fuente silenciosa de datos incorrectos.
