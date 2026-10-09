## La idea central

Un feature flag separa dos cosas que solemos confundir: **desplegar** código y **lanzar** una funcionalidad.

Con esa separación, el código puede estar en producción, desactivado, durante semanas. Se integra continuamente, se prueba en el ambiente real, y se enciende cuando el negocio decide, no cuando termina el despliegue.

Eso cambia varias cosas a la vez: las ramas largas dejan de ser necesarias, los lanzamientos dejan de ser eventos de riesgo, y apagar algo que salió mal toma segundos en vez de un despliegue de reversión.

## Cuatro tipos, con ciclos de vida distintos

Confundirlos es la causa de casi todos los problemas.

**De lanzamiento.** Ocultan trabajo incompleto. Viven días o semanas y **se eliminan** al lanzar. Son temporales por definición.

**De experimento.** Dividen usuarios para comparar variantes. Viven lo que dura el experimento y luego se eliminan con la variante perdedora.

**Operativos.** Permiten degradar el servicio bajo carga: apagar una funcionalidad costosa, activar un modo de solo lectura. Son permanentes a propósito.

**De permisos.** Habilitan funcionalidad por plan o por cliente. Permanentes, y en realidad son lógica de negocio, no flags. Convendría tratarlos como tal.

Los dos primeros deben morir. Los dos últimos deben estar documentados como permanentes. Mezclarlos produce un código lleno de condicionales que nadie se atreve a tocar.

## La deuda que generan

Cada flag activo es una bifurcación. Con diez flags booleanos independientes tienes, en teoría, más de mil combinaciones de comportamiento, y probaste dos.

Las reglas que mantienen esto bajo control:

- **Fecha de retiro obligatoria** al crear un flag temporal.
- **Un dueño con nombre**, no un equipo.
- **Un inventario visible** con estado, dueño y fecha.
- **Alerta automática** cuando un flag temporal supera su fecha.
- **Regla de no anidar.** Un flag dentro de otro multiplica los caminos y hace imposible razonar.

Y una práctica que funciona: la tarea de eliminar el flag se crea en el mismo momento en que se crea el flag, no después.

## Valores por defecto seguros

Si el servicio de flags no responde, ¿qué pasa? La respuesta debe estar decidida.

Para flags de lanzamiento, el valor por defecto es apagado: ante la duda, el comportamiento viejo y conocido. Para flags operativos de degradación, el valor por defecto suele ser el modo seguro.

Nunca dejes que una falla en el servicio de flags tumbe tu aplicación. Un valor por defecto en el código y un caché local son requisitos.

```ts
function estaActivo(nombre: string, contexto: Contexto): boolean {
  try {
    return cliente.evaluar(nombre, contexto);
  } catch {
    return VALORES_POR_DEFECTO[nombre] ?? false;
  }
}
```

## Despliegue progresivo

El uso más valioso no es encender o apagar, es encender **gradualmente**.

Uno por ciento de usuarios, revisar métricas, cinco por ciento, revisar, veinticinco, cien. En cada paso miras errores, latencia y la métrica de negocio que la funcionalidad debía mover.

Para que esto funcione necesitas dos cosas: que la asignación sea estable, de modo que un usuario no vea la funcionalidad aparecer y desaparecer entre peticiones, y que tus métricas se puedan segmentar por variante. Sin lo segundo estás encendiendo a ciegas.

## Probar con flags

Una pregunta incómoda: si el código tiene dos caminos, ¿cuál pruebas?

La respuesta práctica para flags temporales es probar ambos mientras el flag exista, al menos en las pruebas unitarias del componente afectado. Es trabajo extra, y es una razón más para que el flag dure poco.

Para los permanentes, prueba las combinaciones que realmente ocurren en producción, no todas las teóricas. Si tres flags operativos nunca se activan juntos, no inventes esa prueba.

Lo que sí conviene automatizar es una prueba de humo con todos los flags en su valor por defecto. Es la configuración que verá un usuario nuevo, y es sorprendentemente fácil que se rompa sin que nadie lo note.

## Quién enciende

Una decisión organizativa que conviene explicitar: los flags de lanzamiento y experimento deberían poder encenderlos producto, sin depender de ingeniería. Ese es buena parte del valor.

Los operativos son de ingeniería y de quien esté de guardia.

Y todos los cambios de estado deben quedar registrados: quién, cuándo, de qué a qué. Cuando algo se degrade a las tres de la mañana, la primera pregunta será qué cambió.

## Cierre

Los flags convierten el lanzamiento en una decisión reversible, que es una mejora enorme. A cambio introducen complejidad que crece si nadie la poda.

La disciplina mínima es distinguir los temporales de los permanentes, ponerle dueño y fecha a los primeros, y borrarlos cuando cumplan su función.
