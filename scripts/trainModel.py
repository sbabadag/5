import json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pickle

# Load user data
with open('c://RN//5//scripts//userData.json', 'r') as f:
    user_data = json.load(f)

# Prepare data
views = user_data.get('views') or {}
purchases = user_data.get('purchases') or {}
ratings = user_data.get('ratings') or {}

# Convert data to DataFrame
views_df = pd.DataFrame([
    {'user_id': user_id, 'product_id': product_id, 'view_count': data['viewCount']}
    for user_id, products in views.items()
    for product_id, data in products.items()
])

purchases_df = pd.DataFrame([
    {'user_id': user_id, 'product_id': product_id, 'purchase_count': data['purchaseCount']}
    for user_id, products in purchases.items()
    for product_id, data in products.items()
])

ratings_df = pd.DataFrame([
    {'user_id': user_id, 'product_id': product_id, 'rating': data['rating']}
    for user_id, products in ratings.items()
    for product_id, data in products.items()
])

# Ensure DataFrames have the necessary columns
if views_df.empty:
    views_df = pd.DataFrame(columns=['user_id', 'product_id', 'view_count'])

if purchases_df.empty:
    purchases_df = pd.DataFrame(columns=['user_id', 'product_id', 'purchase_count'])

if ratings_df.empty:
    ratings_df = pd.DataFrame(columns=['user_id', 'product_id', 'rating'])

# Merge data
data = views_df.merge(purchases_df, on=['user_id', 'product_id'], how='outer').merge(ratings_df, on=['user_id', 'product_id'], how='outer').fillna(0).infer_objects(copy=False)

# Create user-product matrix
user_product_matrix = data.pivot_table(index='user_id', columns='product_id', values=['view_count', 'purchase_count', 'rating']).fillna(0).infer_objects(copy=False)

# Calculate similarity matrix
similarity_matrix = cosine_similarity(user_product_matrix)

# Save the model
with open('recommendation_model.pkl', 'wb') as f:
    pickle.dump(similarity_matrix, f)

print('Model trained and saved successfully.')
