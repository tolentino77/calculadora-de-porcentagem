document.getElementById('percent').addEventListener('input', function () {
    // Pega a porcentagem inserida
    let percent = parseFloat(this.value);

    // Se a porcentagem for válida (entre 0 e 100)
    if (!isNaN(percent) && percent >= 0 && percent <= 100) {
        // Calcula os valores
        let result6 = (percent / 100) * 6;
        let result8 = (percent / 100) * 8;

        // Atualiza os resultados na tela
        document.getElementById('result-6').textContent = result6.toFixed(2);
        document.getElementById('result-8').textContent = result8.toFixed(2);

        // Aplica cores baseadas na porcentagem
        let spans = document.querySelectorAll('.result span');
        spans.forEach(span => {
            span.classList.remove('red', 'green');
            if (percent < 60) {
                span.classList.add('red');
            } else {
                span.classList.add('green');
            }
        });
    } else {
        // Se a porcentagem não for válida, limpa os resultados
        document.getElementById('result-6').textContent = '0';
        document.getElementById('result-8').textContent = '0';
        let spans = document.querySelectorAll('.result span');
        spans.forEach(span => span.classList.remove('red', 'green'));
    }
});
