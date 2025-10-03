export interface Category {
  icon: string;
  name: string;
}

export const marketplaceCategories: Category[] = [
  { icon: '/grains.webp', name: 'Grains' },
  { icon: '/legumes.webp', name: 'Legumes & Nuts' },
  { icon: '/vegetables.svg', name: 'Vegetables' },
  { icon: '/fruits.webp', name: 'Fruits' },
  { icon: '/root-crops.webp', name: 'Root crops' },
  { icon: '/processed-goods.webp', name: 'Processed goods' },
  { icon: '/spices-and-condiments.webp', name: 'Spices & Condiments' }
];

// Function to categorize products based on their names
export const categorizeProduct = (productName: string): string => {
  const name = productName.toLowerCase();
  if (name.includes('rice') || name.includes('maize') || name.includes('garri')) {
    return 'Grains';
  } else if (name.includes('groundnut') || name.includes('soybean') || name.includes('cashew')) {
    return 'Legumes & Nuts';
  } else if (name.includes('tomato') || name.includes('pepper') || name.includes('onion') ||
             name.includes('okra') || name.includes('cucumber') || name.includes('garden egg') ||
             name.includes('ugu')) {
    return 'Vegetables';
  } else if (name.includes('plantain') || name.includes('banana') || name.includes('pineapple') ||
             name.includes('watermelon')) {
    return 'Fruits';
  } else if (name.includes('yam') || name.includes('cassava') || name.includes('sweet potato')) {
    return 'Root crops';
  } else if (name.includes('oil') || name.includes('garri')) {
    return 'Processed goods';
  } else if (name.includes('ginger') || name.includes('garlic')) {
    return 'Spices & Condiments';
  }
  return 'Vegetables';
};