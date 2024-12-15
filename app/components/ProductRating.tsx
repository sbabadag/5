import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const ProductRating = ({ productId }: { productId: string }) => {
  const [rating, setRating] = useState(0);

  const handleRating = async (newRating: number) => {
    setRating(newRating);
    console.log(`Rating ${newRating} for product ${productId}`); // Add debug log

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const db = getDatabase();
    const userRatingsRef = ref(db, `userRatings/${user.uid}/${productId}`);
    await set(userRatingsRef, {
      productId,
      rating: newRating,
      ratedAt: Date.now(),
    });
    console.log('Rating saved successfully'); // Add debug log
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rate this product:</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <FontAwesome
              name={star <= rating ? 'star' : 'star-o'}
              size={24}
              color="#FFD700"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 8,
  },
  label: {
    marginBottom: 4,
  },
  stars: {
    flexDirection: 'row',
  },
});

export default ProductRating;
