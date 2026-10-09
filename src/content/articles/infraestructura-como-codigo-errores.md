## El logro no es tener archivos

Escribir la infraestructura en archivos versionados es el punto de partida, no el objetivo. Lo que cambia el resultado es que esos archivos sean **la única forma** en que la infraestructura cambia.

En cuanto alguien ajusta algo a mano en la consola del proveedor "solo por hoy", tienes dos verdades: la del código y la real. La siguiente aplicación del código va a intentar reconciliarlas, y a veces eso significa borrar lo que alguien puso a mano.

## Error 1: acceso manual de escritura en producción

Mientras exista, la deriva es inevitable. No por mala fe: alguien resuelve un incidente a las tres de la mañana y no vuelve a llevarlo al código.

El control que funciona es quitar el permiso de escritura manual en producción, dejando lectura para diagnóstico. Si hace falta un acceso de emergencia, que sea un procedimiento explícito, temporal, registrado y con una tarea obligatoria de reconciliación después.

Suena estricto. Es lo único que sostiene la propiedad de que el código describe la realidad.

## Error 2: tratar el estado como un detalle

La mayoría de las herramientas mantienen un archivo de estado que mapea el código con los recursos reales. Ese archivo es infraestructura crítica.

Lo mínimo:

- **Remoto y compartido**, nunca en la máquina de alguien.
- **Con bloqueo**, para que dos aplicaciones simultáneas no lo corrompan.
- **Versionado**, para poder volver atrás.
- **Cifrado**, porque suele contener valores sensibles.
- **Separado por ambiente.** Un solo estado para todo significa que un error en desarrollo puede tocar producción.

Perder o corromper el estado convierte una operación rutinaria en una reconstrucción manual muy incómoda.

## Error 3: secretos en el código

Ocurre con más frecuencia de la que se admite, y con un agravante: una vez en el historial de git, quitarlo del archivo no lo elimina.

La regla es que los secretos viven en un gestor de secretos y se referencian, nunca se escriben. Y conviene un escaneo automático en la tubería que falle si detecta un patrón de credencial. Es barato y atrapa el error antes de que sea permanente.

Cuidado también con las salidas: muchas herramientas imprimen valores en el plan de cambios. Marca las variables sensibles como tales.

## Error 4: un solo ambiente parametrizado con condicionales

Empieza inocente: una condición para que producción tenga más instancias. Termina en archivos llenos de condicionales donde nadie sabe qué se aplica dónde.

Un enfoque más limpio: módulos reutilizables con parámetros, y una composición por ambiente que declara valores. La lógica vive en el módulo; el ambiente solo aporta datos.

La prueba de fuego: ¿puedes leer la definición de producción y saber qué existe, sin evaluar condiciones mentalmente?

## Error 5: aplicar sin revisar el plan

La mayoría de las herramientas muestran qué va a cambiar antes de cambiarlo. Saltarse esa revisión es donde ocurren los desastres, porque un cambio aparentemente menor puede implicar recrear un recurso, y recrear una base de datos no es lo mismo que recrear un balanceador.

El plan debe generarse automáticamente en cada propuesta de cambio y quedar visible para quien revisa. Y las operaciones destructivas deberían requerir una aprobación explícita adicional.

Presta atención especial a los cambios que dicen reemplazar en vez de modificar. Ahí es donde se pierde información.

## Error 6: no probar la reconstrucción

Muchos equipos tienen la infraestructura en código pero nunca la han levantado desde cero. El día que haga falta, descubren dependencias implícitas: un recurso creado a mano hace dos años, un valor que alguien puso una vez, un orden que solo funciona porque las cosas ya existían.

Levantar un ambiente completo desde cero, periódicamente, es la única forma de saber que el código está completo. Si es demasiado costoso hacerlo con frecuencia, hazlo al menos una vez y documenta lo que falló.

## Error 7: mezclar cadencias

La infraestructura que cambia rara vez, como redes y bases de datos, no debería vivir en el mismo ciclo que lo que cambia a diario. Separarlos reduce el radio de impacto: un error al desplegar una aplicación no debería poder tocar la red.

Una separación simple por capas, con la de abajo cambiando poco y con aprobaciones más estrictas, evita una categoría entera de incidentes.

## Cierre

La infraestructura como código entrega su valor cuando es la única fuente de verdad, cuando el estado se trata como algo crítico, cuando los secretos nunca entran al repositorio y cuando alguien revisa el plan antes de aplicarlo.

Sin eso, tienes archivos que describen aproximadamente lo que hay, que es una forma de documentación desactualizada con la peligrosa apariencia de ser ejecutable.
