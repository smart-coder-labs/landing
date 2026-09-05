## La decisión que no se revierte fácil

Cuando construyes software que sirve a varios clientes, decides temprano cómo separar sus datos. Esa decisión condiciona el modelo de costos, el proceso de respaldo, el cumplimiento normativo y la superficie de un posible incidente.

Cambiarla después es una migración grande. Vale la pena pensarla bien.

## Los tres modelos

**Base de datos por cliente.** Aislamiento máximo. Un error de programación no puede filtrar datos entre clientes porque la conexión apunta a otra base. Respaldos y restauraciones por cliente son triviales. Cumple con requisitos de residencia de datos sin contorsiones.

El costo: operar cientos de bases. Cada migración de esquema hay que aplicarla en todas, y manejar el caso de que falle en la número ochenta y siete. Las conexiones se multiplican. Las consultas agregadas entre clientes se vuelven incómodas.

**Esquema por cliente.** Una base, un espacio de nombres por cliente. Punto intermedio. Menos conexiones, aislamiento razonable. Las migraciones siguen siendo múltiples y algunos motores se degradan con miles de esquemas.

**Tabla compartida con columna de cliente.** Todo junto, con una columna que identifica a quién pertenece cada fila. Operacionalmente el más simple: una migración, un respaldo, una conexión.

Y el más peligroso, porque el aislamiento depende de que cada consulta filtre correctamente. Una consulta sin el filtro es una fuga.

## Cómo elegir

Preguntas que deciden:

- **¿Hay requisitos normativos de residencia o aislamiento físico?** Si un cliente exige que sus datos estén separados, la tabla compartida queda descartada.
- **¿Cuántos clientes esperas?** Con decenas, base por cliente es manejable. Con decenas de miles, es inviable.
- **¿Cuánta diferencia hay de tamaño entre clientes?** Si uno solo representa la mitad del volumen, aislarlo evita que afecte a los demás.
- **¿Necesitas consultas entre clientes con frecuencia?** Con datos separados, cualquier análisis agregado requiere trabajo extra.

Un patrón que funciona bien: tabla compartida por defecto, con la capacidad de mover un cliente grande o exigente a su propia base. Requiere que la capa de acceso a datos sea agnóstica desde el principio.

## Si eliges tabla compartida, defiende en profundidad

Confiar en que todos los desarrolladores recordarán el filtro no es una estrategia. Necesitas que el olvido sea imposible o al menos detectable.

**Seguridad a nivel de fila en la base de datos.** El motor aplica el filtro, no tu código. Es la defensa más fuerte porque funciona incluso si la consulta lo omite.

```sql
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;

CREATE POLICY aislamiento_cliente ON pedidos
  USING (cliente_id = current_setting('app.cliente_id')::uuid);
```

La aplicación establece la variable de sesión al inicio de cada petición, con el identificador que viene de la sesión autenticada, nunca de un parámetro de la petición.

**Una capa de acceso que exige el contexto.** Que sea imposible construir una consulta sin especificar el cliente, porque la función lo requiere como argumento.

**Pruebas de aislamiento automáticas.** Un conjunto de pruebas que, para cada tabla con datos de clientes, verifica que un usuario de un cliente no puede leer filas de otro. Que corra en cada cambio.

Ese último punto es el que atrapa las regresiones. Alguien agrega una tabla nueva y olvida la política; la prueba lo detecta antes del despliegue.

## El vecino ruidoso

Con recursos compartidos, un cliente puede degradar a los demás: una exportación masiva, un bucle de integración mal configurado, un crecimiento repentino.

Controles útiles:

- Límites de tasa por cliente, no solo globales.
- Colas separadas o con prioridad para trabajos pesados.
- Métricas segmentadas por cliente, para poder identificar quién causa el pico.
- Límites de tamaño en operaciones costosas, como exportaciones.

## Respaldos y borrado

Dos operaciones que la tabla compartida complica:

**Restaurar un cliente.** Si un cliente pide volver al estado de ayer, con base dedicada restauras su respaldo. Con tabla compartida necesitas un proceso específico que extraiga y reemplace solo sus filas, respetando el orden de dependencias.

**Borrar un cliente.** Cuando alguien se va y pide eliminación de datos, tienes que encontrar todas sus filas en todas las tablas. Mantén un inventario de dónde vive el identificador de cliente, y una prueba que falle si aparece una tabla nueva sin registrar.

Ambas se resuelven mejor si las diseñas al principio que si las improvisas cuando el cliente ya las pidió.

## Cierre

No hay un modelo correcto, hay compromisos. La tabla compartida es la más simple de operar y la que exige más disciplina de seguridad. La base por cliente es la más segura y la más costosa de operar.

Elijas lo que elijas, haz que el aislamiento sea una propiedad del sistema, verificada por pruebas, no una convención que alguien podría olvidar.
