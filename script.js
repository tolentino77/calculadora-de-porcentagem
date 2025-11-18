const percentInput = document.getElementById('percent');
const resultsCard = document.getElementById('results-card');
const resultsList = document.getElementById('results-list');
const feedbackText = document.getElementById('feedback-text');
const baseForm = document.getElementById('base-form');
const baseValueInput = document.getElementById('base-value');
const baseChips = document.getElementById('base-chips');

const DEFAULT_BASES = [6, 8, 10, 12];
const BASE_KEY = 'cg-base-values';
let baseValues = loadBaseValues();

init();

function init() {
    renderBaseChips();
    updateCalculations(sanitizePercent(percentInput.value || ''));

    percentInput.addEventListener('input', handlePercentInput);
    baseForm.addEventListener('submit', handleBaseSubmit);
    baseChips.addEventListener('click', handleChipClick);
}

function handlePercentInput() {
    const percent = sanitizePercent(percentInput.value);
    updateCalculations(percent);
}

function sanitizePercent(value) {
    const normalized = value.replace(',', '.');
    return parseFloat(normalized);
}

function updateCalculations(percent) {
    if (!isValidPercent(percent)) {
        showEmptyResults();
        feedbackText.textContent = 'Insira um valor entre 0 e 100 para iniciar.';
        resultsCard.classList.remove('show');
        return;
    }

    const results = baseValues.map(base => ({
        base,
        value: (percent / 100) * base
    }));

    renderResults(results, percent);
    updateFeedback(percent);
}

function renderResults(results, percent) {
    resultsList.innerHTML = '';

    results.forEach(({ base, value }, index) => {
        const item = document.createElement('div');
        item.className = 'result-item';

        const label = document.createElement('span');
        label.className = 'result-label';
        label.textContent = `Para ${formatBaseLabel(base)}`;

        const resultValue = document.createElement('span');
        resultValue.className = 'result-value';
        resultValue.textContent = value.toFixed(2);
        resultValue.classList.add(percent < 60 ? 'red' : 'green');
        resultValue.style.animationDelay = `${index * 0.05}s`;

        item.append(label, resultValue);
        resultsList.appendChild(item);
    });

    resultsCard.classList.remove('show');
    void resultsCard.offsetWidth;
    resultsCard.classList.add('show');
}

function showEmptyResults() {
    resultsList.innerHTML = '<p class="empty">Os resultados aparecerão aqui.</p>';
}

function updateFeedback(percent) {
    let message = '';

    if (percent < 40) {
        message = 'Aluno atingiu um resultado abaixo de 40%. Reforçar os estudos!';
    } else if (percent < 60) {
        message = 'Faltou pouco para alcançar 60%.';
    } else if (percent < 80) {
        message = 'Ótimo! Atingiu uma boa porcentagem.';
    } else if (percent < 95) {
        message = 'Excelente desempenho! Mantém o ritmo.';
    } else {
        message = 'Brilhante! Topo do aproveitamento.';
    }

    feedbackText.textContent = message;
}

function handleBaseSubmit(event) {
    event.preventDefault();
    const value = sanitizePercent(baseValueInput.value);

    if (Number.isNaN(value) || value <= 0) {
        baseValueInput.focus();
        return;
    }

    if (baseValues.some(base => Math.abs(base - value) < 0.001)) {
        baseValueInput.value = '';
        baseValueInput.focus();
        return;
    }

    baseValues = [...baseValues, value].sort((a, b) => a - b);
    saveCustomBaseValues();
    renderBaseChips();
    updateCalculations(sanitizePercent(percentInput.value));
    baseValueInput.value = '';
}

function handleChipClick(event) {
    const button = event.target.closest('button[data-remove-base]');
    if (!button) return;

    const base = parseFloat(button.dataset.removeBase);
    if (DEFAULT_BASES.some(defaultBase => Math.abs(defaultBase - base) < 0.001)) {
        return;
    }

    baseValues = baseValues.filter(value => Math.abs(value - base) > 0.001);
    saveCustomBaseValues();
    renderBaseChips();
    updateCalculations(sanitizePercent(percentInput.value));
}

function renderBaseChips() {
    baseChips.innerHTML = '';
    baseValues.forEach(base => {
        const chip = document.createElement('div');
        const isDefault = DEFAULT_BASES.some(defaultBase => Math.abs(defaultBase - base) < 0.001);
        chip.className = 'chip';
        chip.dataset.default = isDefault ? 'true' : 'false';
        chip.innerHTML = `<span>${formatBaseLabel(base)}</span>`;

        if (!isDefault) {
            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.textContent = '×';
            removeButton.dataset.removeBase = base;
            chip.appendChild(removeButton);
        }

        baseChips.appendChild(chip);
    });
}

function loadBaseValues() {
    try {
        const stored = JSON.parse(localStorage.getItem(BASE_KEY)) || [];
        const merged = [...DEFAULT_BASES, ...stored];
        const unique = Array.from(new Set(merged.map(value => Number(value))));
        return unique.filter(value => value > 0 && !Number.isNaN(value)).sort((a, b) => a - b);
    } catch {
        return [...DEFAULT_BASES];
    }
}

function saveCustomBaseValues() {
    const customValues = baseValues.filter(base => !DEFAULT_BASES.some(defaultBase => Math.abs(defaultBase - base) < 0.001));
    localStorage.setItem(BASE_KEY, JSON.stringify(customValues));
}

function isValidPercent(value) {
    return typeof value === 'number' && !Number.isNaN(value) && value >= 0 && value <= 100;
}

function formatBaseLabel(value) {
    return Number.isInteger(value) ? value.toString() : value.toFixed(2);
}
