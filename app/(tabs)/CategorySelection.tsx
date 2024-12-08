import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';

const categories = [
  { name: 'Electronics', icon: 'tv' },
  { name: 'Furniture', icon: 'couch' },
  { name: 'Clothing', icon: 'tshirt' },
  { name: 'Books', icon: 'book' },
  { name: 'Toys', icon: 'puzzle-piece' },
  { name: 'Car', icon: 'car' },
  { name: 'Phone', icon: 'mobile' },
  { name: 'House & Living', icon: 'home' },
  { name: 'Motorcycle', icon: 'motorcycle' },
  { name: 'Personal Care', icon: 'heartbeat' },
  { name: 'Mother & Baby', icon: 'baby' },
  { name: 'Hobby & Books', icon: 'book-reader' },
  { name: 'Office & Stationary', icon: 'briefcase' },
  { name: 'Sports & Outdoor', icon: 'futbol' },
  { name: 'Construction Market & Garden', icon: 'tree' },
  { name: 'Pet Shop', icon: 'paw' },
  { name: 'Antique', icon: 'hourglass-half' },
];

const CategorySelection = ({ route, navigation }: { route: any, navigation: any }) => {
  const { selectedCategories, setSelectedCategories } = route.params;

  const handleCategorySelect = (category: string) => {
    setSelectedCategories((prev: string[]) => {
      const updatedSelectedCategories = prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category];
      return updatedSelectedCategories;
    });
  };

  return (
    <ScrollView style={styles.container}>
      {categories.map(category => (
        <TouchableOpacity key={category.name} style={styles.categoryItem} onPress={() => handleCategorySelect(category.name)}>
          <FontAwesome6 name={category.icon as any} size={24} color="black" style={styles.categoryIcon} />
          <Text style={styles.categoryText}>{category.name}</Text>
          <Checkbox
            status={selectedCategories.includes(category.name) ? 'checked' : 'unchecked'}
            onPress={() => handleCategorySelect(category.name)}
          />
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    marginRight: 16,
  },
  categoryText: {
    fontSize: 18,
    flex: 1,
  },
  doneButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  doneButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default CategorySelection;