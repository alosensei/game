document.addEventListener('DOMContentLoaded', () => {
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    const tapButton = document.getElementById('tap-button');
    const buyUpgradeButton = document.getElementById('buy-upgrade');

    let score = 0;
    let level = 0;
    let upgradeCost = 100;
    let upgradeIncrement = 1;

    function updateDisplay() {
        scoreElement.textContent = score;
        levelElement.textContent = level;
        buyUpgradeButton.textContent = `Comprar Mejora (${upgradeCost})`;
        if (score >= upgradeCost) {
            buyUpgradeButton.disabled = false;
        } else {
            buyUpgradeButton.disabled = true;
        }
    }

    tapButton.addEventListener('click', () => {
        score += upgradeIncrement;
        updateDisplay();
    });

    buyUpgradeButton.addEventListener('click', () => {
        if (score >= upgradeCost) {
            score -= upgradeCost;
            level += 1;
            upgradeCost = Math.ceil(upgradeCost * 1.15); // Aumento del costo en 15%
            upgradeIncrement = level + 1; // Incremento del nivel
            updateDisplay();
            buyUpgradeButton.classList.add('purchased');
        } else {
            alert('No tienes suficientes puntos para comprar esta mejora.');
        }
    });

    updateDisplay();
});
