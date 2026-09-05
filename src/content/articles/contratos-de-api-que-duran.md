## El costo de romper

Una API con consumidores externos es una promesa. Cuando la rompes, el costo no lo pagas tú: lo pagan equipos que tienen sus propias prioridades y que se van a enterar cuando algo falle en producción.

Por eso la primera pregunta ante un cambio no es cómo versionarlo, sino si de verdad es incompatible.

## Qué rompe y qué no

Cambios que **no** rompen a un consumidor bien construido:

- Agregar un campo opcional a una respuesta.
- Agregar un parámetro opcional a una petición.
- Agregar un endpoint nuevo.
- Agregar un valor nuevo a un enumerado, **si** el consumidor sabe qué hacer con valores desconocidos.

Cambios que rompen:

- Quitar o renombrar un campo.
- Cambiar el tipo de un campo.
- Volver obligatorio algo que era opcional.
- Cambiar el significado de un campo sin cambiar su nombre. El más traicionero, porque nada falla: los datos simplemente pasan a estar mal.

Ese último merece atención. Si el campo "total" pasa de incluir impuestos a no incluirlos, ningún esquema lo detecta y las cifras de todos quedan mal en silencio.

## Diseña para tolerar lo desconocido

Buena parte de la compatibilidad depende del consumidor, así que dilo explícitamente en tu documentación:

- Ignorar campos que no se reconocen, en vez de fallar.
- Tener un comportamiento definido para valores de enumerado desconocidos.
- No asumir el orden de los elementos salvo que esté especificado.

Del lado del proveedor, dos decisiones ayudan mucho:

**Objetos en vez de valores sueltos.** Devolver un objeto con un campo permite agregar campos después. Devolver una cadena no deja espacio.

**Enumerados con margen.** Documenta desde el principio que pueden aparecer valores nuevos y qué debe hacer el cliente con ellos.

## Cuando sí hay que romper

A veces no hay alternativa. El orden que menos daño hace:

1. **Agrega lo nuevo junto a lo viejo.** Ambos funcionan.
2. **Marca lo viejo como obsoleto** en la documentación y en una cabecera de respuesta, con fecha de retiro.
3. **Mide quién lo sigue usando.** Sin esto estás adivinando.
4. **Contacta a los consumidores que quedan.** Si son internos, directamente.
5. **Retira**, con aviso previo suficiente.

El paso tres es el que más se salta y el más importante. Registra por consumidor y por campo obsoleto. Sin ese dato, el retiro es un salto de fe.

## Versionado: menos de lo que crees

Versionar la API completa por un cambio en un endpoint obliga a todos a migrar por algo que no les afecta, y te deja manteniendo dos versiones enteras.

Alternativas más baratas:

- **Versionar el endpoint**, no la API.
- **Negociación por cabecera**, donde el cliente pide una versión del recurso.
- **Campos aditivos con banderas**, cuando el cambio es de comportamiento.

Reserva la versión mayor global para rediseños reales, que deberían ser raros.

## El esquema es el contrato

Un contrato en prosa se desincroniza del código en semanas. Define el esquema en un formato ejecutable y genera desde ahí la documentación, las validaciones y, si tiene sentido, los clientes.

Y añade una prueba de compatibilidad en tu integración continua: comparar el esquema de la rama contra el publicado, y fallar si detecta un cambio incompatible no declarado. Eso convierte una convención en una garantía.

## Errores que también son contrato

Se documenta el caso exitoso y se olvida el resto. Pero los consumidores programan contra tus errores tanto como contra tus respuestas.

Define y documenta: un formato de error estable, códigos de error propios que no cambien, qué errores merecen reintento y cuáles no, y cómo se comunican los límites de tasa.

Cambiar el formato de un error es un cambio incompatible aunque no lo parezca.

## Paginación y límites desde el día uno

Un endpoint que devuelve una lista sin paginar funciona hasta que un cliente tiene diez mil registros. Agregar paginación después es incompatible, porque cambia la forma de la respuesta.

Pagina desde el principio, aunque hoy siempre quepa. Y documenta el límite máximo, para que nadie diseñe asumiendo que puede pedir todo.

## Cierre

La mayoría de los cambios se pueden hacer de forma compatible si diseñaste para eso: objetos extensibles, enumerados con margen, paginación desde el inicio y errores estables.

Versionar es la salida cuando eso falla, no el punto de partida. Y antes de retirar algo, mide quién lo usa.
