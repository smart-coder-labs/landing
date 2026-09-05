## Una pieza más de infraestructura

La reacción automática al construir un sistema con recuperación es sumar una base de datos vectorial dedicada. Es un servicio más que desplegar, monitorear, respaldar, asegurar y pagar. A veces vale la pena. Con frecuencia no.

## Qué hace realmente

Guarda vectores y encuentra rápido los más parecidos a uno dado. La parte interesante es "rápido": con pocos miles de vectores, comparar contra todos es trivial. La complejidad de los índices aproximados existe para escalas donde eso ya no es viable.

Si tienes diez mil fragmentos, no tienes un problema de escala. Tienes un problema de calidad de recuperación, que es otra cosa.

## Empieza por lo que ya tienes

**PostgreSQL con pgvector** cubre la enorme mayoría de los casos reales. Ventajas que se subestiman:

- Los vectores viven junto a tus datos relacionales, así que filtrar por permisos, fecha o cliente es una cláusula WHERE normal, no una sincronización entre dos sistemas.
- Transacciones: insertas el documento y su vector de forma atómica.
- Un solo respaldo, un solo modelo de permisos, un solo sistema que monitorear.

```sql
SELECT f.id, f.texto
FROM fragmentos f
JOIN documentos d ON d.id = f.documento_id
WHERE d.cliente_id = $1
  AND d.vigente_hasta > now()
ORDER BY f.embedding <=> $2
LIMIT 5;
```

Ese filtro por cliente y vigencia dentro de la misma consulta es justamente lo que se vuelve incómodo cuando el índice vive aparte.

**Búsqueda léxica.** Antes incluso de los vectores: si tus usuarios buscan por términos exactos, códigos de producto o nombres propios, la búsqueda por texto completo puede ganarle a la semántica. Y lo mejor suele ser combinar ambas.

## Cuándo sí conviene un servicio dedicado

Hay condiciones concretas:

- **Escala grande.** Decenas de millones de vectores con requisitos de latencia estrictos. Los índices especializados y su gestión de memoria marcan diferencia real ahí.
- **Actualización muy frecuente con alta concurrencia.** Cargas donde se insertan y consultan vectores continuamente a un ritmo alto.
- **Funcionalidad específica que necesitas.** Cuantización avanzada, búsqueda multivectorial, reordenamiento integrado.

Si ninguna aplica hoy, agregar el servicio es complejidad adelantada para un problema hipotético.

## Los costos que no aparecen en la comparativa

- **Sincronización.** Dos almacenes significan que pueden discrepar. Un documento borrado en la base principal y vivo en el índice es una fuga de datos esperando ocurrir.
- **Permisos duplicados.** Tienes que replicar tu modelo de autorización en el segundo sistema, o filtrar después de recuperar, que es peor.
- **Un sistema más en la rotación de guardia.** Cuando falle a las tres de la mañana, alguien tiene que saber cómo opera.

## Lo que sí mueve la calidad

Cuando la recuperación es mala, el índice casi nunca es la causa. Lo que suele importar:

- **Cómo fragmentas.** Respetar límites semánticos en vez de cortar cada n caracteres.
- **Qué modelo de embeddings usas** y si es adecuado a tu idioma y dominio.
- **Búsqueda híbrida.** Combinar señal léxica y semántica supera a cualquiera de las dos por separado en la mayoría de los corpus.
- **Reordenamiento.** Recuperar veinte candidatos y reordenarlos con un modelo más preciso mejora más que cambiar de motor.

Todo eso es independiente de dónde guardes los vectores.

## Cómo se ve la migración cuando toca

Si empiezas en tu base relacional y algún día la escala te obliga a mover, el trabajo es acotado porque lo difícil ya está resuelto. Necesitarás:

- Un proceso de reindexado que lea de tu fuente de verdad y escriba al nuevo motor.
- Replicar los filtros que hoy resuelves con una consulta relacional, ahora como metadatos del índice.
- Un periodo de doble escritura mientras validas que los resultados coinciden.
- Tu conjunto de evaluación, para comprobar que la recuperación no empeoró.

Ese último punto es la razón principal para invertir temprano en evaluación: es lo que convierte una migración de infraestructura en una decisión verificable en vez de un salto de fe.

Nada de eso depende del motor que elijas al final. Por eso postergar la decisión rara vez sale caro, mientras que adelantarla te hace pagar complejidad durante meses por un problema que quizá nunca tengas.

## Una regla práctica

Empieza con la base de datos que ya operas. Mide la latencia de recuperación con tu volumen real, no con uno hipotético. Si está dentro de tu presupuesto de tiempo, no cambies nada.

Migrar a un servicio dedicado cuando de verdad lo necesites es un trabajo acotado, porque ya tendrás la ingesta, la evaluación y los metadatos resueltos. Esa es la parte difícil, y no depende del motor.

## Cierre

La pregunta no es qué base vectorial es mejor. Es si tu problema de recuperación es de escala o de calidad. Casi siempre es de calidad, y ahí el motor no ayuda.
