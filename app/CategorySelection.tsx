import React, { createContext, useState, useContext, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, Switch, TouchableOpacity } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { categories } from './data/categories';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Context Definition
interface CategoryContextType {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

export const CategoryContext = createContext<CategoryContextType>({
  selectedCategories: [],
  setSelectedCategories: () => {},
});

// Provider Component
export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCategories, setSelectedCategoriesState] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const saved = await AsyncStorage.getItem('selectedCategories');
      if (saved) {
        setSelectedCategoriesState(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setSelectedCategories = async (categories: string[]) => {
    try {
      await AsyncStorage.setItem('selectedCategories', JSON.stringify(categories));
      setSelectedCategoriesState(categories);
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  };

  if (isLoading) return null;

  return (
    <CategoryContext.Provider value={{ selectedCategories, setSelectedCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Selection Component
const CategorySelection: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { selectedCategories, setSelectedCategories } = useContext(CategoryContext);
  const [localCategories, setLocalCategories] = useState<string[]>(selectedCategories);
  const [showAll, setShowAll] = useState(selectedCategories.length === 0);

  useEffect(() => {
    const loadSelectedCategories = async () => {
      try {
        const storedCategories = await AsyncStorage.getItem('selectedCategories');
        if (storedCategories) {
          const parsedCategories = JSON.parse(storedCategories);
          setSelectedCategories(parsedCategories);
          setLocalCategories(parsedCategories);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    loadSelectedCategories();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      // Set any options here if needed
    });
  }, [navigation]);

  const handleCategorySelect = async (category: string) => {
    const isSelected = localCategories.includes(category);
    const newCategories = isSelected
      ? localCategories.filter(cat => cat !== category)
      : [...localCategories, category];

    setLocalCategories(newCategories);
    try {
      await AsyncStorage.setItem('selectedCategories', JSON.stringify(newCategories));
      setSelectedCategories(newCategories);
    } catch (error) {
      console.error("Error saving categories:", error);
      // Consider providing user feedback or reverting the selection here
    }
  };

  const handleShowAllToggle = async (value: boolean) => {
    setShowAll(value);
    if (value) {
      setLocalCategories([]);
      setSelectedCategories([]);
      await AsyncStorage.setItem('selectedCategories', JSON.stringify([]));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.categoryItem}>
          <FontAwesome6 name="asterisk" size={24} color="black" style={styles.categoryIcon} />
          <Text style={[styles.categoryText, showAll && styles.selectedCategoryText]}>
            Any Category
          </Text>
          <Switch
            value={showAll}
            onValueChange={handleShowAllToggle}
          />
        </View>
        {categories.map(category => (
          <View key={category.name} style={[
            styles.categoryItem,
            showAll && styles.disabledItem
          ]}>
            <FontAwesome6 name={category.icon as any} size={24} color={showAll ? '#ccc' : 'black'} style={styles.categoryIcon} />
            <Text style={[
              styles.categoryText,
              localCategories.includes(category.name) && styles.selectedCategoryText,
              showAll && styles.disabledText
            ]}>
              {category.name}
            </Text>
            <Switch
              value={localCategories.includes(category.name)}
              onValueChange={() => handleCategorySelect(category.name)}
              disabled={showAll}
            />
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.doneButton} onPress={() => navigation.goBack()}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  categoryIcon: { marginRight: 16 },
  categoryText: { flex: 1, fontSize: 16 },
  doneButton: {
    padding: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  doneButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  selectedCategoryText: { fontWeight: 'bold', color: '#007AFF' },
  disabledItem: {
    opacity: 0.6,
  },
  disabledText: {
    color: '#999',
  },
});

export default CategorySelection;
export const useCategories = () => useContext(CategoryContext);
