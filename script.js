document.addEventListener('DOMContentLoaded', () => {
    const scoreElement = document.getElementById('score');
    const tapButton = document.getElementById('tap-button');
    const buyUpgrade1Button = document.getElementById('buy-upgrade1');
    const buyUpgrade2Button = document.getElementById('buy-upgrade2');

    let score = 0;
    let upgrade1Unlocked = false;
    let upgrade1Active = false;
    let upgrade2Unlocked = false;
    let upgrade2Active = false;
    const upgrade1Cost = 15000;
    const upgrade1UnlockScore = 10000;
    const upgrade2Cost = 30000;
    const upgrade2Bonus = 45000;

    function updateScoreDisplay() {
        scoreElement.textContent = score;
        if (score >= upgrade1UnlockScore && !upgrade1Unlocked) {
            buyUpgrade1Button.disabled = false;
        }
        if (score >= upgrade1Cost) {
            buyUpgrade1Button.classList.add('active');
        } else {
            buyUpgrade1Button.classList.remove('active');
        }
        if (score >= upgrade2Cost) {
            buyUpgrade2Button.disabled = false;
            if (!upgrade2Unlocked) {
                buyUpgrade2Button.classList.add('active');
            }
        } else {
            buyUpgrade2Button.classList.remove('active');
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

            // Start bonus scoring for Upgrade 1
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

    buyUpgrade2Button.addEventListener('click', () => {
        if (score >= upgrade2Cost && !upgrade2Unlocked) {
            score -= upgrade2Cost;
            upgrade2Unlocked = true;
            upgrade2Active = true;
            updateScoreDisplay();

            // Start bonus scoring for Upgrade 2
            const bonusInterval = setInterval(() => {
                if (upgrade2Active) {
                    score += 1;
                    updateScoreDisplay();
                    if (score >= upgrade2Bonus) {
                        clearInterval(bonusInterval);
                        upgrade2Active = false;
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
