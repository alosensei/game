document.addEventListener('DOMContentLoaded', () => {
    const scoreElement = document.getElementById('score');
    const tapButton = document.getElementById('tap-button');
    const buyUpgrade1Button = document.getElementById('buy-upgrade1');

    let score = 0;
    let upgrade1Unlocked = false;
    let upgrade1Active = false;
    const upgrade1Cost = 15000;
    const upgrade1UnlockScore = 10000;

    function updateScoreDisplay() {
        scoreElement.textContent = score;
        if (score >= upgrade1UnlockScore && !upgrade1Unlocked) {
            buyUpgrade1Button.disabled = false;
        }
        if (score < upgrade1Cost) {
            buyUpgrade1Button.disabled = true;
        }
    }

    tapButton.addEventListener('click', () => {
        score += 1;
        updateScoreDisplay();
        if (upgrade1Active) {
            // Increment score by 1 every second
            setTimeout(() => {
                if (upgrade1Active) {
                    score += 1;
                    updateScoreDisplay();
                }
            }, 1000);
        }
    });

    buyUpgrade1Button.addEventListener('click', () => {
        if (score >= upgrade1Cost) {
            score -= upgrade1Cost;
            upgrade1Unlocked = true;
            upgrade1Active = true;
            updateScoreDisplay();

            // Start bonus scoring
            const bonusInterval = setInterval(() => {
                if (upgrade1Active) {
                    score += 1;
                    updateScoreDisplay();
                    if (score >= 2 * upgrade1Cost) {
                        clearInterval(bonusInterval);
                        upgrade1Active = false;
                    }
                } else {
                    clearInterval(bonusInterval);
                }
            }, 1000);
        } else {
            alert('No tienes suficientes puntos para comprar esta mejora.');
        }
    });

    updateScoreDisplay();
});
