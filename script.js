const minInput = document.getElementById('min');
const maxInput = document.getElementById('max');
const btn = document.getElementById('btn');
const resetBtn = document.getElementById('reset');
const resultEl = document.getElementById('result');
const msgEl = document.getElementById('msg');
const infoEl = document.getElementById('info');
const historyEl = document.getElementById('history');

let pool = [];         // numbers that haven't appeared yet
let used = [];         // numbers that have already appeared
let currentRange = ''; // "min-max" state

function buildPool(min, max) {
    pool = [];
    for (let i = min; i <= max; i++) pool.push(i);
    used = [];
}

function updateInfo() {
    infoEl.textContent = pool.length > 0 ? `Numbers left: ${pool.length}` : '';
    historyEl.textContent = used.length ? `Already drawn: ${used.join(', ')}` : '';
}

function resetAll() {
    pool = [];
    used = [];
    currentRange = '';
    resultEl.textContent = '—';
    msgEl.textContent = '';
    btn.disabled = false;
    updateInfo();
}

btn.addEventListener('click', () => {
    msgEl.textContent = '';

    let min = parseInt(minInput.value, 10);
    let max = parseInt(maxInput.value, 10);

    if (isNaN(min) || isNaN(max)) {
        msgEl.textContent = 'Please enter a number in both inputs!';
        return;
    }
    if (min > max) {
        [min, max] = [max, min];
        minInput.value = min;
        maxInput.value = max;
    }
    if (max - min > 1000000) {
        msgEl.textContent = 'Range is too large (maximum 1,000,000).';
        return;
    }

    // If the range changed, start fresh
    const rangeKey = `${min}-${max}`;
    if (rangeKey !== currentRange) {
        currentRange = rangeKey;
        buildPool(min, max);
    }

    if (pool.length === 0) {
        msgEl.textContent = 'All numbers have been drawn! Press "Start over".';
        return;
    }

    // Pick a random number and remove it from the pool
    const idx = Math.floor(Math.random() * pool.length);
    const num = pool.splice(idx, 1)[0];
    used.push(num);

    resultEl.textContent = num;
    updateInfo();

    if (pool.length === 0) {
        msgEl.textContent = 'That was the last number, all have been drawn.';
        msgEl.style.color = '#fbbf24';
    } else {
        msgEl.style.color = '#f87171';
    }
});

resetBtn.addEventListener('click', resetAll);
