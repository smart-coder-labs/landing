---
title: "Introducción práctica a los Transformers en NLP"
image: "/articles/transformers-nlp/images/portada.jpg"
readTime: "15 min"
publicationDate: "2024-07-28"
---

## Introducción

Los modelos Transformer han revolucionado el campo del Procesamiento de Lenguaje Natural (NLP) desde su introducción en el paper "Attention Is All You Need" por Vaswani et al. en 2017. Su capacidad para manejar dependencias de largo alcance en el texto y su eficiencia en la paralelización los han convertido en la base de los modelos de lenguaje más avanzados hasta la fecha, como BERT, GPT y T5.

En este artículo, desglosaremos la arquitectura Transformer, explicaremos el crucial mecanismo de atención y mostraremos un ejemplo práctico de implementación. Prepárate para sumergirte en el corazón de la IA moderna.

## Contenido Principal

### ¿Qué son los Transformers?

Los Transformers son un tipo de arquitectura de red neuronal diseñada inicialmente para tareas de traducción automática, pero que rápidamente demostró ser efectiva en una amplia gama de tareas de NLP. A diferencia de arquitecturas previas como las Redes Neuronales Recurrentes (RNNs) o las Redes Neuronales Convolucionales (CNNs) aplicadas a secuencias, los Transformers no procesan los datos en orden secuencial. En su lugar, se basan casi por completo en un mecanismo llamado **atención** para establecer relaciones entre palabras en diferentes posiciones de la secuencia.

### Componentes Clave de la Arquitectura Transformer

La arquitectura Transformer original consta de dos partes principales: un **Codificador (Encoder)** y un **Decodificador (Decoder)**.

1.  **Embedding de Entrada (Input Embedding):**
    *   Convierte las palabras (tokens) de entrada en vectores numéricos.
    *   Se añade un **Embedding Posicional (Positional Encoding)** a estos vectores para dar al modelo información sobre la posición de cada palabra en la secuencia, ya que el mecanismo de atención por sí solo no considera el orden.

2.  **Codificador (Encoder):**
    *   Compuesto por una pila de N capas idénticas.
    *   Cada capa tiene dos subcapas principales:
        *   **Mecanismo de Multi-Head Self-Attention:** Permite al modelo sopesar la importancia de diferentes palabras de la secuencia de entrada al procesar cada palabra. "Multi-head" significa que se realizan múltiples cálculos de atención en paralelo, cada uno aprendiendo diferentes aspectos de las relaciones entre palabras.
        *   **Red Feed-Forward (Position-wise Feed-Forward Network):** Una red neuronal simple aplicada independientemente a cada posición.
    *   Se utilizan conexiones residuales alrededor de cada una de las dos subcapas, seguidas de normalización de capa.

3.  **Decodificador (Decoder):**
    *   También compuesto por una pila de N capas idénticas.
    *   Cada capa tiene tres subcapas principales:
        *   **Mecanismo de Multi-Head Self-Attention (Enmascarado):** Similar al del codificador, pero modificado para evitar que las posiciones atiendan a posiciones subsiguientes (importante durante la generación de secuencias).
        *   **Mecanismo de Multi-Head Encoder-Decoder Attention:** Permite a cada posición en el decodificador atender a todas las posiciones en la secuencia de salida del codificador. Esto es crucial para mapear la entrada a la salida (e.g., en traducción).
        *   **Red Feed-Forward:** Idéntica a la del codificador.
    *   También utiliza conexiones residuales y normalización de capa.

4.  **Capa Lineal Final y Softmax:**
    *   El decodificador produce un vector de logits. La capa lineal lo transforma en un vector con el tamaño del vocabulario.
    *   La función softmax convierte estos logits en probabilidades, indicando la probabilidad de cada palabra en el vocabulario de ser la siguiente palabra en la secuencia de salida.

### El Mecanismo de Atención (Self-Attention)

La atención es el corazón del Transformer. Permite al modelo sopesar la importancia de diferentes partes de la secuencia de entrada al procesar una parte específica.

Para cada palabra en la secuencia, creamos tres vectores: **Query (Q)**, **Key (K)**, y **Value (V)**. Estos se generan multiplicando el embedding de la palabra por tres matrices de pesos diferentes (Wq, Wk, Wv) que se aprenden durante el entrenamiento.

El puntaje de atención se calcula como:
`Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V`

Donde:
*   `Q * K^T`: Calcula un puntaje de similitud entre cada query y todas las keys.
*   `sqrt(d_k)`: Factor de escalamiento (dimensión de los vectores key). Evita gradientes muy pequeños.
*   `softmax`: Normaliza los puntajes para obtener pesos que suman 1.
*   `* V`: Multiplica los pesos por los vectores Value para obtener una representación ponderada.

**Multi-Head Attention:** En lugar de realizar una sola función de atención, los vectores Q, K y V se dividen en múltiples "cabezas" (heads). Cada cabeza realiza la atención de forma independiente. Los resultados de cada cabeza se concatenan y se transforman linealmente. Esto permite al modelo atender a información de diferentes subespacios de representación en diferentes posiciones.

### Diagrama Visual del Mecanismo de Atención

```mermaid
graph LR
    subgraph "Entrada (Embedding + Positional Encoding)"
        X1[Token 1] --> E1[Embedding 1]
        X2[Token 2] --> E2[Embedding 2]
        XN[Token N] --> EN[Embedding N]
    end

    subgraph "Cálculo de Q, K, V para Token 1"
        E1 --> MQ1(Matrix Wq) --> Q1[Query 1]
        E1 --> MK1(Matrix Wk) --> K1[Key 1]
        E1 --> MV1(Matrix Vv) --> V1[Value 1]
    end

    subgraph "Cálculo de Scores (para Query 1)"
        Q1 --> S11{Q1·K1}
        Q1 --> S12{Q1·K2}
        Q1 --> S1N{Q1·KN}
        subgraph "Otros Keys"
            E2 -->|Wk| K2[Key 2]
            EN -->|Wk| KN[Key N]
        end
    end

    S11 --> Scale1[/ sqrt(dk)] --> Soft1(Softmax) --> Wgt1[Peso 1]
    S12 --> Scale2[/ sqrt(dk)] --> Soft1
    S1N --> ScaleN[/ sqrt(dk)] --> Soft1

    Wgt1 --> Sum(Suma Ponderada)
    V1 -->|Multiply| Sum

    subgraph "Otros Values"
        E2 -->|Wv| V2[Value 2]
        EN -->|Wv| VN[Value N]
    end
    V2 -->|Multiply por Peso 2| Sum
    VN -->|Multiply por Peso N| Sum

    Sum --> Z1[Vector de Salida Atendido para Token 1]

    style MQ1 fill:#DDA0DD,stroke:#333,stroke-width:2px
    style MK1 fill:#DDA0DD,stroke:#333,stroke-width:2px
    style MV1 fill:#DDA0DD,stroke:#333,stroke-width:2px
    style E1 fill:#ADD8E6,stroke:#333,stroke-width:2px
    style E2 fill:#ADD8E6,stroke:#333,stroke-width:2px
    style EN fill:#ADD8E6,stroke:#333,stroke-width:2px
```
*Diagrama: Flujo simplificado de Self-Attention para un token.*

### Ejemplo de Implementación con Código (Conceptual usando Python/PyTorch)

```python
import torch
import torch.nn as nn
import math

class PositionalEncoding(nn.Module):
    def __init__(self, d_model, max_len=5000):
        super(PositionalEncoding, self).__init__()
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model))
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        pe = pe.unsqueeze(0).transpose(0, 1)
        self.register_buffer('pe', pe)

    def forward(self, x):
        # x es de shape [seq_len, batch_size, d_model]
        x = x + self.pe[:x.size(0), :]
        return x

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super(MultiHeadAttention, self).__init__()
        assert d_model % num_heads == 0
        self.d_k = d_model // num_heads
        self.num_heads = num_heads
        self.linears = nn.ModuleList([nn.Linear(d_model, d_model) for _ in range(4)]) # Q, K, V, Output
        self.attn = None # Para visualización

    def attention(self, query, key, value, mask=None, dropout=None):
        scores = torch.matmul(query, key.transpose(-2, -1)) / math.sqrt(self.d_k)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9) # Aplicar máscara
        p_attn = torch.softmax(scores, dim=-1)
        if dropout is not None:
            p_attn = dropout(p_attn)
        return torch.matmul(p_attn, value), p_attn

    def forward(self, query, key, value, mask=None):
        # query, key, value: [batch_size, seq_len, d_model]
        # mask: [batch_size, 1, seq_len, seq_len] (para self-attention) o [batch_size, 1, 1, seq_len_key] (para encoder-decoder attention)

        batch_size = query.size(0)

        # 1) Proyecciones lineales y cambio de forma a (batch_size, num_heads, seq_len, d_k)
        query, key, value = \
            [l(x).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
             for l, x in zip(self.linears, (query, key, value))]

        # 2) Aplicar atención en todas las cabezas
        x, self.attn = self.attention(query, key, value, mask=mask) # self.attn es [batch_size, num_heads, seq_len, seq_len_key]

        # 3) Concatenar cabezas y aplicar proyección final
        x = x.transpose(1, 2).contiguous().view(batch_size, -1, self.num_heads * self.d_k)
        return self.linears[-1](x)


# Ejemplo de uso (muy simplificado)
# d_model = 512
# num_heads = 8
# vocab_size = 10000
# num_layers = 6

# embedding = nn.Embedding(vocab_size, d_model)
# pos_encoder = PositionalEncoding(d_model)
# multihead_attn = MultiHeadAttention(d_model, num_heads)
# transformer_encoder_layer = nn.TransformerEncoderLayer(d_model, num_heads)
# transformer_encoder = nn.TransformerEncoder(transformer_encoder_layer, num_layers)

# src_tokens = torch.randint(0, vocab_size, (1, 10)) # (batch_size, seq_len)
# src_embedded = embedding(src_tokens) * math.sqrt(d_model)
# src_positioned = pos_encoder(src_embedded.transpose(0,1)) # Transformer espera (seq, batch, feature)
# encoded_src = transformer_encoder(src_positioned)

# print(encoded_src.shape) # Debería ser (10, 1, 512)
```

### Casos de Uso Prácticos

*   **Traducción Automática:** El caso de uso original. (e.g., Google Translate).
*   **Generación de Texto:** Creación de texto coherente y contextualmente relevante (e.g., GPT-3/4 para escribir artículos, código, etc.).
*   **Resumen de Texto:** Generar resúmenes concisos de documentos largos.
*   **Respuesta a Preguntas (Question Answering):** Encontrar respuestas a preguntas dentro de un texto dado.
*   **Análisis de Sentimiento:** Determinar la emoción o tono de un texto.
*   **Clasificación de Texto:** Categorizar textos según su contenido.
*   **Reconocimiento de Entidades Nombradas (NER):** Identificar y clasificar entidades como personas, organizaciones, lugares.

## Caso Práctico: Traducción simple con un Transformer pre-entrenado (Hugging Face)

La librería `transformers` de Hugging Face facilita enormemente el uso de modelos Transformer pre-entrenados.

**Ejemplo de Traducción Inglés a Alemán:**

```python
from transformers import pipeline

# Cargar un pipeline de traducción pre-entrenado
translator = pipeline("translation_en_to_de", model="Helsinki-NLP/opus-mt-en-de")

# Texto a traducir
text_en = "Hello, how are you today?"

# Realizar la traducción
translation_de = translator(text_en)

print(f"Inglés: {text_en}")
print(f"Alemán: {translation_de[0]['translation_text']}")

# Otro ejemplo
text_en_2 = "Transformers are powerful models for natural language processing."
translation_de_2 = translator(text_en_2)

print(f"Inglés: {text_en_2}")
print(f"Alemán: {translation_de_2[0]['translation_text']}")
```

*Captura de Pantalla (Placeholder):*
`[Insertar captura de pantalla del código anterior ejecutándose y su salida]`

Este ejemplo demuestra cómo, con unas pocas líneas de código, podemos aprovechar el poder de modelos Transformer complejos que han sido entrenados en grandes cantidades de datos.

## Conclusión

Los Transformers han marcado un antes y un después en el NLP. Su arquitectura basada en atención les permite capturar relaciones complejas en el texto y ha llevado a avances significativos en una multitud de tareas lingüísticas. Comprender sus componentes clave, especialmente el mecanismo de atención, es fundamental para cualquiera que trabaje en el campo de la IA y el procesamiento del lenguaje.

Aunque la arquitectura completa puede ser compleja, la disponibilidad de modelos pre-entrenados a través de librerías como Hugging Face Transformers ha democratizado el acceso a esta potente tecnología.

### Próximos Pasos y Recursos Adicionales

*   Lee el paper original: "Attention Is All You Need" (Vaswani et al., 2017).
*   Explora el blog de Jay Alammar: "The Illustrated Transformer" para una excelente explicación visual.
*   Experimenta con la librería `transformers` de Hugging Face.
*   Considera aprender sobre variantes de Transformers como BERT, GPT, T5, ViT (Vision Transformer).

[Enlace al paper "Attention Is All You Need" (Placeholder)]
[Enlace a "The Illustrated Transformer" (Placeholder)]
[Enlace a la documentación de Hugging Face Transformers (Placeholder)]

### Llamado a la Acción

¿Qué aplicación de los Transformers te parece más fascinante? ¡Deja tus ideas en los comentarios!
