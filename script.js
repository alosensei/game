document.addEventListener('DOMContentLoaded', () => {
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    const tapButton = document.getElementById('tap-button');
    const buyUpgradeButton = document.getElementById('buy-upgrade');

    let score = 0;
    let level = 0;
    let upgradeCost = 100;
    let upgradeInterval = null;

    function updateDisplay() {
        scoreElement.textContent = score;
        levelElement.textContent = level;
        buyUpgradeButton.textContent = `Comprar Mejora (${upgradeCost})`;
        buyUpgradeButton.disabled = score < upgradeCost;
    }

    function startScoreIncrease() {
        if (upgradeInterval) {
            clearInterval(upgradeInterval);
        }
        upgradeInterval = setInterval(() => {
            score += level;
            updateDisplay();
        }, 1000);
    }

    tapButton.addEventListener('click', () => {
        score += level + 1; // Incrementa la puntuación por nivel actual
        updateDisplay();
    });

    buyUpgradeButton.addEventListener('click', () => {
        if (score >= upgradeCost) {
            score -= upgradeCost;
            level += 1;
            upgradeCost = Math.ceil(upgradeCost * 1.15); // Incrementa el costo en 15%
            updateDisplay();
            startScoreIncrease(); // Comienza a aumentar la puntuación cada segundo
            buyUpgradeButton.classList.add('purchased'); // Cambia el color del botón
        } else {
            alert('No tienes suficientes puntos para comprar esta mejora.');
        }
    });

    updateDisplay();
});
