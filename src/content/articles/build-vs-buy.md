## Los dos sesgos

Los equipos técnicos tienden a construir. El trabajo es más interesante, el control es total, y estimar lo propio siempre sale optimista.

Las áreas de compra tienden a comprar. El precio es visible y comparable, y la responsabilidad se transfiere.

Ambos sesgos producen decisiones malas. El marco que sigue intenta neutralizarlos.

## Pregunta 1: ¿esto te diferencia?

La más importante y la que más se salta.

Si el sistema es la razón por la que un cliente te elige, constrúyelo. El motor de recomendaciones de una tienda especializada, el algoritmo de asignación de una empresa de logística, el flujo de aprobación que hace que tu producto sea más rápido que el del competidor.

Si es infraestructura que todos necesitan igual, compra. Autenticación, envío de correo, procesamiento de pagos, monitoreo. Ahí no hay diferenciación posible: el mejor resultado es que funcione y nadie lo note.

La trampa es que casi todo el mundo cree que su caso es especial. Una prueba útil: ¿un cliente pagaría más por esta pieza si supiera cómo está hecha? Si la respuesta es no, es infraestructura.

## Pregunta 2: ¿cuál es el costo total, no el de la primera versión?

Al construir se estima el desarrollo inicial. El costo real incluye:

- Mantenimiento continuo, que en sistemas vivos suele superar al desarrollo inicial en pocos años.
- Actualizaciones de seguridad.
- Documentación y capacitación de quien entre después.
- Guardias y atención de incidentes.
- El costo de oportunidad de lo que ese equipo no hizo mientras tanto.

Al comprar el costo también es mayor que la licencia:

- Integración, que casi siempre se subestima.
- Migración de datos.
- Capacitación.
- Aumentos de precio anuales.
- El costo de salir si no funciona.

Compara ambos a tres años, no a seis meses. Es donde las curvas se cruzan o se separan de verdad.

## Pregunta 3: ¿qué pasa si el proveedor desaparece o sube el precio?

No es paranoia, es planificación. Proveedores cierran, se compran, cambian su modelo de precios o descontinúan productos.

Antes de comprar, responde:

- ¿Puedes exportar tus datos en un formato utilizable?
- ¿Cuánto tardarías en migrar a otra opción?
- ¿Qué parte de tu producto queda inutilizable si el servicio se cae por un día?

Si la respuesta a la última es "todo", necesitas al menos un plan de contingencia, aunque decidas comprar igual.

Una técnica que ayuda: encapsular al proveedor detrás de una interfaz propia. No para poder cambiarlo mañana, sino para que el día que toque, el cambio esté acotado a un lugar.

## Pregunta 4: ¿tienes el equipo para sostenerlo?

Construir no es un proyecto, es un compromiso permanente. Si el sistema lo hace una persona que se va en un año, tienes un problema.

Pregunta concreta: ¿hay al menos dos personas que puedan mantenerlo? Si la respuesta es no, el riesgo de construir es mayor de lo que parece en la hoja de cálculo.

## La opción intermedia que se olvida

No son solo dos opciones. Existe también:

- **Comprar y extender.** Una base comercial con tu lógica específica encima. Común en comercio electrónico y CRM.
- **Código abierto autogestionado.** Sin licencia, con el costo operativo a tu cargo. Tiene sentido si ya operas infraestructura similar.
- **Construir la parte que diferencia, comprar el resto.** Casi siempre la mejor respuesta. Construyes tu motor de asignación, compras la autenticación y los pagos.

La pregunta rara vez es construir o comprar el sistema entero. Es qué pieza de este sistema es tuya.

## Señales de que estás decidiendo mal

- El argumento principal para construir es que las opciones del mercado "no encajan exactamente". Casi nunca encajan exactamente; la pregunta es si la diferencia justifica el costo.
- El argumento principal para comprar es que es más rápido, sin haber revisado el esfuerzo de integración.
- Nadie calculó el costo a tres años.
- La decisión la toma quien no va a mantenerlo.

## Cierre

Construye lo que te diferencia y compra lo que no. Compara costos totales a tres años, no precios iniciales. Y encapsula a cualquier proveedor del que dependas, porque la decisión de hoy no tiene por qué ser permanente.

La peor decisión no es construir o comprar: es tomar cualquiera de las dos sin haber respondido si esa pieza te diferencia.
