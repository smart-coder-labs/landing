## Monitoreo no es observabilidad

El monitoreo responde preguntas que definiste de antemano: ¿está arriba el servicio? ¿superó el ochenta por ciento de CPU? Son preguntas conocidas con alertas conocidas.

La observabilidad es poder responder preguntas que no anticipaste. "¿Por qué los pedidos de este cliente específico tardan diez veces más desde el martes?" no es una pregunta que hayas configurado. Si tu sistema solo emite promedios agregados, no tienes forma de llegar ahí.

La diferencia práctica está en la cardinalidad y el contexto que conservas.

## Empieza por las cuatro señales que importan

Antes de instrumentar todo, cubre lo básico en cada servicio que atiende peticiones:

- **Tasa**: peticiones por segundo.
- **Errores**: proporción que falla, separando errores del cliente de errores del servidor.
- **Duración**: distribución, no promedio.
- **Saturación**: qué tan cerca está el recurso de su límite.

El promedio de latencia es la métrica que más engaña. Un promedio de 200 ms puede significar que todos esperan 200 ms, o que el noventa y cinco por ciento espera 50 ms y el cinco por ciento espera cuatro segundos. Son sistemas completamente distintos y solo uno tiene un problema. Mide percentiles: la mediana, el 95 y el 99.

## Instrumenta por operación de negocio, no solo por endpoint

Saber que la ruta de procesamiento tarda dos segundos es poco útil si esa ruta hace cinco cosas distintas según los parámetros.

Etiqueta por la operación real: crear pedido, generar factura, exportar reporte. Así puedes ver que la exportación se degradó sin que el promedio del endpoint se mueva.

## Trazas: el contexto que conecta

Una traza sigue una petición a través de todos los servicios que toca. Es lo que convierte "el sistema está lento" en "la lentitud está en la llamada al servicio de inventario, y solo cuando el catálogo supera mil artículos".

Lo mínimo para que sirvan:

- Un identificador de correlación que se propaga por todo el flujo, incluyendo trabajos en segundo plano y colas.
- Ese identificador presente en cada línea de registro.
- El identificador visible para el usuario cuando algo falla, para que soporte pueda buscarlo.

Ese último detalle transforma la atención de incidentes. El cliente reporta un código, tú buscas ese código, y tienes la historia completa.

## Registros: estructurados o no sirven

Un registro en texto libre es imposible de consultar a escala. Escribe eventos estructurados con campos consistentes.

```ts
log.info('pedido.creado', {
  correlacionId,
  pedidoId,
  clienteId,
  articulos: items.length,
  totalCentavos: total,
  duracionMs: Date.now() - inicio,
});
```

La regla que más rinde: **incluye siempre los identificadores que te van a permitir filtrar**. Un evento sin el identificador de cliente es un evento que no puedes usar cuando ese cliente se queja.

Y nunca registres datos personales, tokens ni contenido sensible. Un sistema de registros es una copia de tus datos con permisos más laxos.

## Qué alertar

El error más común es alertar sobre causas en vez de síntomas. Una alerta de "CPU al ochenta por ciento" despierta a alguien aunque nadie esté afectado. Una alerta de "la tasa de error superó el uno por ciento durante cinco minutos" indica un problema real.

Reglas que reducen el ruido:

- Alerta sobre lo que el usuario percibe: errores y latencia.
- Toda alerta debe tener una acción asociada. Si la respuesta es "mirar y esperar", no es una alerta, es un panel.
- Usa ventanas de tiempo para evitar disparos por picos momentáneos.
- Si una alerta se ignora tres veces, o se corrige la condición o se elimina.

Una rotación de guardia con alertas ruidosas produce gente que ignora alertas. Eso es peor que no tener alertas.

## Presupuestos de error

En vez de perseguir disponibilidad perfecta, define cuánto fallo es aceptable. Si el objetivo es 99.9 por ciento mensual, tienes unos 43 minutos de presupuesto.

Eso convierte una discusión subjetiva en una conversación con datos: si consumiste el presupuesto en la primera semana, se congelan los cambios riesgosos y se trabaja en estabilidad. Si va sobrado, se puede acelerar.

## Instrumenta antes de necesitarlo

El peor momento para agregar instrumentación es durante un incidente. Para entonces ya perdiste la información del periodo que te interesa.

El mínimo para un servicio nuevo, desde el primer despliegue: las cuatro señales, identificador de correlación propagado, registros estructurados con identificadores de negocio, y una alerta sobre tasa de error.

Es media jornada de trabajo y cambia por completo la experiencia del primer incidente.

## Cierre

La pregunta para evaluar tu observabilidad no es cuántos paneles tienes. Es: cuando alguien reporte que algo está lento para un cliente específico desde ayer, ¿puedes responder en minutos o necesitas agregar instrumentación primero?

Si es lo segundo, tienes monitoreo, no observabilidad.
