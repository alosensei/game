document.addEventListener('DOMContentLoaded', () => {
    const scoreSpan = document.getElementById('score');
    const tapButton = document.getElementById('tap-button');
    const buyUpgrade1Button = document.getElementById('buy-upgrade1');
    
    function updateScore() {
        fetch('/score')
            .then(response => response.json())
            .then(data => {
                scoreSpan.textContent = data.score;
            });
    }

    tapButton.addEventListener('click', () => {
        fetch('/score', { method: 'POST' })
            .then(() => updateScore());
    });

    buyUpgrade1Button.addEventListener('click', () => {
        fetch('/buy_upgrade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ upgrade: 'upgrade1' })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateScore();
                startUpgradeBonus();
            } else {
                alert(data.error);
            }
        });
    });

    function startUpgradeBonus() {
        if (buyUpgrade1Button.disabled) return;
        buyUpgrade1Button.disabled = true;

        const interval = setInterval(() => {
            fetch('/score', { method: 'POST' })
                .then(() => updateScore());
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
            buyUpgrade1Button.disabled = false;
        }, 30000); // Bonus duration, adjust as needed
    }
});
