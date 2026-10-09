## Por qué se rompe

Durante un despliegue hay un periodo, corto o largo, en que conviven la versión vieja y la nueva del código. Si en ese momento el esquema solo sirve a una de las dos, la otra falla.

Renombrar una columna en una sola migración es el ejemplo clásico: en el instante en que se aplica, todas las instancias que aún corren código viejo empiezan a fallar. Con suerte el despliegue tarda treinta segundos. Sin suerte, hay que revertir y el esquema ya cambió.

La regla que evita esto: **cada cambio de esquema debe ser compatible con la versión de código anterior y con la siguiente.**

## Expansión y contracción

El patrón tiene tres fases separadas en despliegues distintos.

**Expansión.** Agregas lo nuevo sin quitar lo viejo. El esquema soporta ambas versiones.

**Migración.** El código nuevo escribe en ambos lugares y lee del nuevo. Se rellenan los datos históricos.

**Contracción.** Cuando nadie usa lo viejo, se elimina.

Es más lento que una sola migración, y esa lentitud es precisamente lo que te permite revertir en cualquier punto.

## Renombrar una columna, en la práctica

Supongamos que "nombre" debe pasar a llamarse "nombre_completo".

**Despliegue 1: agregar la columna nueva.** Nullable, sin restricciones. El código sigue usando la vieja. Cambio inocuo.

**Despliegue 2: escribir en ambas.** El código escribe en las dos columnas y sigue leyendo de la vieja. Si hay que revertir, la columna vieja está al día.

**Rellenar.** Un proceso por lotes copia los valores históricos. Por lotes, no con una sola sentencia que bloquee la tabla entera.

```sql
UPDATE usuarios SET nombre_completo = nombre
WHERE nombre_completo IS NULL AND id IN (
  SELECT id FROM usuarios WHERE nombre_completo IS NULL LIMIT 1000
);
```

**Despliegue 3: leer de la nueva.** Sigue escribiendo en ambas. Ahora la vieja es solo un seguro.

**Despliegue 4: dejar de escribir en la vieja.**

**Despliegue 5: eliminar la columna vieja.** Solo cuando estés seguro de que ningún código, ningún reporte y ningún proceso externo la usa.

Cinco despliegues para un renombre parece excesivo hasta la primera vez que un renombre en un paso te tumba producción en hora pico.

## Operaciones que bloquean

No todas las sentencias de esquema son iguales. Según el motor y la versión, algunas toman un bloqueo que detiene las escrituras sobre la tabla.

Antes de aplicar cualquier migración en una tabla grande, verifica en la documentación de tu motor si esa operación bloquea, y por cuánto. Las que suelen causar problemas: agregar una columna con valor por defecto en motores antiguos, agregar restricciones que requieren validar todas las filas, y crear índices sin la variante concurrente.

Para índices, casi siempre existe una forma concurrente que no bloquea escrituras. Tarda más y vale la pena.

## Restricciones nuevas sobre datos existentes

Si agregas una restricción de no nulo o una clave foránea, el motor tiene que validar todas las filas. En una tabla grande eso puede tardar y bloquear.

El camino seguro: agregar la restricción como no validada, rellenar y corregir los datos que la violan, y validar después en una operación separada que toma un bloqueo más liviano.

## Reglas prácticas

- **Una migración por despliegue.** Si algo falla, sabes qué fue.
- **Toda migración debe poder revertirse**, o estar documentado explícitamente por qué no y qué se hace en su lugar.
- **Nunca borres datos en la misma migración que los deja de usar.** Deja pasar tiempo. Un despliegue que revierte y encuentra la columna borrada no tiene salida.
- **Prueba con volumen realista.** Una migración que tarda dos segundos con mil filas puede tardar veinte minutos con diez millones.
- **Ten un plan para abortar.** Si la migración lleva demasiado tiempo, ¿qué haces? Decidirlo antes es mucho mejor que decidirlo con el servicio degradado.

## El caso de los consumidores externos

Lo que más se olvida: reportes, procesos de análisis, integraciones de terceros y consultas manuales que alguien guardó. Esos no se despliegan contigo.

Antes de la fase de contracción, busca quién más lee esa tabla. Si tienes registro de consultas, revísalo. Si no, avisa con tiempo y espera.

## Cierre

Las migraciones sin interrupción no requieren herramientas especiales. Requieren aceptar que el cambio toma varios despliegues y que durante un tiempo tendrás datos duplicados.

Ese costo temporal compra la capacidad de revertir en cualquier momento, que es lo único que realmente importa cuando algo sale mal.
