from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

# Inicialización de la puntuación y mejoras
score = 0
upgrades = {
    "upgrade1": {"unlocked": False, "cost": 15000, "bonus": 1}
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/score', methods=['GET'])
def get_score():
    return jsonify({'score': score})

@app.route('/score', methods=['POST'])
def update_score():
    global score
    score += 1
    return jsonify({'score': score})

@app.route('/buy_upgrade', methods=['POST'])
def buy_upgrade():
    global score
    upgrade = request.json.get('upgrade')
    
    if upgrade in upgrades:
        upgrade_info = upgrades[upgrade]
        
        if score >= upgrade_info['cost']:
            score -= upgrade_info['cost']
            upgrade_info['unlocked'] = True
            return jsonify({'success': True, 'score': score})
        else:
            return jsonify({'success': False, 'error': 'Not enough points'}), 400
    else:
        return jsonify({'success': False, 'error': 'Invalid upgrade'}), 400

if __name__ == '__main__':
    app.run(debug=True)
