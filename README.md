# 💻 Calculadora de Porcentagem

Este repositório contém uma aplicação web simples desenvolvida para automatizar o trabalho de diversos professores da Escola Municipal George Chalmers para calcular uma porcentagem específica de **múltiplos valores base** em tempo real, fornecendo feedback visual e textual detalhado com base no valor inserido.

---

## 🌟 Funcionalidades

* **Cálculo em Tempo Real (Múltiplos Valores):** A aplicação calcula e exibe o valor correspondente à porcentagem inserida para uma lista de valores base. Os valores padrão incluem **6, 8, 10 e 12** (exibidos com duas casas decimais).
* **Gerenciamento de Valores Base:** É possível **adicionar e remover** novos valores base personalizados na seção "Valores base" para adequar os cálculos às diferentes necessidades.
* **Feedback Detalhado:** O sistema fornece um feedback textual dinâmico com base na faixa de porcentagem inserida:
    * **< 40%**: Indica a necessidade de reforço nos estudos.
    * **40% a < 60%**: Indica que faltou pouco para alcançar a meta de 60%.
    * **60% a < 80%**: Classifica como uma boa porcentagem.
    * **80% a < 95%**: Elogia o excelente desempenho.
    * **≥ 95%**: Celebra o aproveitamento máximo ("Brilhante!").
* **Feedback Visual:** O valor do resultado muda de cor para indicar o nível da porcentagem:
    * **Vermelho:** Se a porcentagem inserida for **menor que 60%**.
    * **Verde:** Se a porcentagem inserida for **igual ou maior que 60%**.
* **Interface Limpa:** Design moderno, responsivo e com foco na usabilidade, utilizando a fonte 'Segoe UI'.
* **Logo da Equipe:** Inclui a imagem da logo EMGC com o lema "Despertando sonhos, construindo o futuro".

---

## 🛠️ Tecnologias Utilizadas

O projeto é construído exclusivamente com as tecnologias front-end padrão:

* **HTML5:** Estrutura da página (`index.html`).
* **CSS3:** Estilização e layout (`styles.css`).
* **JavaScript (Vanilla JS):** Lógica de cálculo, manipulação do DOM e gerenciamento de valores base (`script.js`).

---

## 🚀 Como Usar

Para visualizar e testar a calculadora:

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd calculadora-de-porcentagem
    ```
3.  **Abra o arquivo `index.html`** no seu navegador de preferência.
4.  Digite um valor de porcentagem (entre 0 e 100) no campo de entrada para ver o resultado em tempo real e o feedback.
5.  Opcionalmente, utilize a seção **"Valores base"** abaixo dos resultados para adicionar novos valores ou remover os valores personalizados da lista de cálculos.

---

## 🔗 Link da Calculadora
https://calculadora-de-porcentagem.vercel.app/
