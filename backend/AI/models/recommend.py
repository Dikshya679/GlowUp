import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

skin_types = ["oily", "dry", "combination", "sensitive", "acne"]

products = {
    "Oil Control Gel":       [1, 0, 0, 0, 1],
    "Hydrating Cream":      [0, 1, 0, 1, 0],
    "Combo Skin Lotion":    [0, 0, 1, 0, 0],
    "Sensitive Care Serum": [0, 0, 0, 1, 0],
}


def encode_user_skin(user_skin_list):
    vector = [1 if skin in user_skin_list else 0 for skin in skin_types]
    return np.array(vector).reshape(1, -1)

 # user_skin = ["oily", "sensitive"]
    # user_vector = encode_user_skin(user_skin)

def recommend_products(user_vector, products):
    recommendations = []

    for product_name, product_vector in products.items():
        product_vector = np.array(product_vector).reshape(1, -1)
        score = cosine_similarity(user_vector, product_vector)[0][0]
        recommendations.append((product_name, score))
   

    recommendations.sort(key=lambda x: x[1], reverse=True)
    return recommendations

    # results = recommend_products(user_vector, products)

    # for product, score in results:
    #    print(f"{product}: {score:.2f}")
