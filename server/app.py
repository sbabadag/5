from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load the model
model_path = os.path.join(os.path.dirname(__file__), 'recommendation_model.pkl')
with open(model_path, 'rb') as f:
    similarity_matrix = pickle.load(f)

@app.route('/recommend', methods=['POST'])
def recommend():
    user_id = request.json['user_id']
    user_index = int(user_id)  # Assuming user_id is an integer

    # Get similarity scores for the user
    similarity_scores = similarity_matrix[user_index]

    # Get top N recommendations
    top_n_indices = np.argsort(similarity_scores)[::-1][:10]
    recommendations = top_n_indices.tolist()

    return jsonify(recommendations)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)  # Disable debug mode for production
