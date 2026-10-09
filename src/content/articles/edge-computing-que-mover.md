## Qué resuelve realmente

Ejecutar código en el borde significa correrlo en ubicaciones distribuidas, cerca de quien lo pide, en vez de en una región central.

Lo que gana es tiempo de ida y vuelta. Si tu servidor está en Virginia y el usuario en Bogotá, cada viaje cuesta decenas de milisegundos. Con varios viajes encadenados, eso se nota.

Lo que no gana, y aquí está la confusión más común: **acercar el cómputo no acerca los datos**. Si la función en el borde consulta una base de datos central, el viaje ocurre igual, solo que desde otro punto. A veces incluso empeora.

## La pregunta que decide

Para cada cosa que consideres mover: **¿necesita datos que viven lejos?**

Si no los necesita, el borde es una buena idea. Si los necesita, mover el cómputo sin mover los datos rara vez ayuda.

## Casos que encajan bien

**Redirecciones y reescrituras.** Decidir a dónde va una petición según país, dispositivo o una cookie. No requiere datos, se resuelve al instante.

**Autenticación de token.** Validar la firma de un token es criptografía local. Rechazar una petición no autenticada en el borde evita que un viaje inútil llegue al origen.

**Personalización ligera.** Elegir idioma, moneda o variante de un experimento a partir de la cabecera o una cookie.

**Transformación de respuestas.** Ajustar cabeceras, recortar campos, adaptar formatos.

**Limitación de tasa.** Frenar abuso lo más cerca posible del origen del tráfico.

**Contenido estático y assets.** El caso original, y todavía el de mayor impacto.

## Casos que encajan mal

**Transacciones.** Cualquier cosa que requiera consistencia fuerte necesita coordinación con un punto central. El borde agrega saltos.

**Consultas sobre datos centrales.** Una función en el borde que hace tres consultas a la base en otra región es más lenta que una función junto a la base que hace las mismas tres consultas.

**Procesos largos o pesados.** Los entornos de borde suelen tener límites estrictos de tiempo de ejecución y memoria.

**Lógica que necesita bibliotecas pesadas.** Muchos entornos de borde no ejecutan un Node completo, sino un tiempo de ejecución reducido. Bibliotecas que dependen de módulos nativos no funcionan.

## El estado es el problema difícil

Si tu aplicación necesita estado compartido, el borde lo complica.

Opciones que existen:

- **Sin estado.** Todo el contexto viaja en la petición, en un token firmado. Lo más simple y lo que mejor funciona.
- **Datos replicados de solo lectura.** Configuración, catálogos, reglas. Se replican a todas las ubicaciones y se leen localmente. Excelente para lo que cambia poco.
- **Almacenes distribuidos con consistencia eventual.** Útiles con la ventana de desactualización aceptada explícitamente.
- **Coordinación con un punto autoritativo.** Vuelve el viaje, pero solo cuando hace falta.

Un patrón que funciona bien: leer del borde, escribir al centro. La mayoría del tráfico es lectura, y las escrituras toleran mejor la latencia.

## Los costos que se olvidan

**Depuración distribuida.** Un error que ocurre en una ubicación específica es difícil de reproducir. Necesitas registros centralizados con la ubicación como etiqueta, desde el principio.

**Despliegue no atómico.** La propagación a todas las ubicaciones no es instantánea. Durante unos minutos conviven versiones. Igual que con las migraciones de base de datos, tu código debe tolerarlo.

**Límites del entorno.** Tamaño del paquete, tiempo de ejecución, APIs disponibles. Descubrirlos a mitad de la implementación es caro; revísalos antes.

**Residencia de datos.** Si tienes requisitos sobre dónde pueden procesarse ciertos datos, ejecutar en cualquier ubicación del mundo puede ser un problema de cumplimiento.

## Mide antes de mover

La latencia de red es una parte del tiempo total. Si tu respuesta tarda ochocientos milisegundos y solo sesenta son viaje, moverla al borde mejora poco. El tiempo está en otra parte, probablemente en consultas.

Desglosa: tiempo de red, tiempo de cómputo, tiempo de base de datos. Ese desglose te dice si el borde es la herramienta correcta o si estás optimizando la parte pequeña.

## Cierre

El borde brilla en decisiones rápidas que no necesitan datos remotos: enrutamiento, validación de tokens, personalización ligera, contenido estático.

Para todo lo que dependa de datos centrales, acercar el cómputo sin acercar los datos no resuelve el problema. Mide primero dónde se va el tiempo; la respuesta suele señalar a otro lado.
