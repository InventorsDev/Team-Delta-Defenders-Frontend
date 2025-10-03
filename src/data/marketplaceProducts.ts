export interface Product {
  name: string;
  price: string;
  location: string;
  rating: string;
  description: string;
  image: string;
}

export const marketplaceProducts: Product[] = [
  {
    name: 'Basket of Tomatoes',
    price: '₦35,000',
    location: 'Ojo, Lagos',
    rating: '4.5',
    description: 'Fresh basket of tomatoes - Farm direct picked fresh from farm, these ripe, juicy red tomatoes are perfect for cooking stew',
    image: '/listing-1.webp'
  },
  {
    name: 'Basket of Fresh Pepper (Atarodo)',
    price: '₦50,000',
    location: 'Ikorodu, Lagos',
    rating: '3.5',
    description: 'Hot and flavorful peppers to spice up your meals. Carefully handpicked and sorted for freshness.',
    image: '/listing-2.webp'
  },
  {
    name: 'Sack of Onions (50kg)',
    price: '₦50,500',
    location: 'Ojo, Lagos',
    rating: '4.0',
    description: 'Firm, aromatic onions ideal for everyday cooking. Long shelf life when stored in a cool, dry place.',
    image: '/listing-3.webp'
  },
  {
    name: 'Sack of Sweet Potatoes (50kg)',
    price: '₦20,000',
    location: 'Kano Municipal, Kano',
    rating: '4.5',
    description: 'Sweet, creamy, and packed with nutrients. Great for roasting, frying, or boiling. Direct from farm to your kitchen.',
    image: '/listing-4.webp'
  },
  {
    name: 'Basket of Garden Eggs',
    price: '₦30,000',
    location: 'Ojo, Lagos',
    rating: '5.0',
    description: 'Fresh green and white garden eggs, perfect for traditional Nigerian dishes and stews.',
    image: '/listing-5.webp'
  },
  {
    name: 'Bunch of Plantain (20–25 pieces)',
    price: '₦35,000',
    location: 'Akwa, Anambra',
    rating: '4.5',
    description: 'Ripe and semi-ripe plantains for frying, boiling, or roasting. Naturally sweet with a firm texture.',
    image: '/listing-6.webp'
  },
  {
    name: '50kg Bag of Local Rice (Ofada)',
    price: '₦55,000',
    location: 'Abeokuta South, Ogun',
    rating: '4.5',
    description: 'Stone-free, aromatic Ofada rice with a rich, earthy flavor. Perfect for local delicacies.',
    image: '/listing-7.webp'
  },
  {
    name: 'Basket of Okra',
    price: '₦21,500',
    location: 'Ojo, Lagos',
    rating: '4.5',
    description: 'Fresh, tender okra pods great for soups and stews. Rich in fiber and vitamins.',
    image: '/listing-8.webp'
  },
  {
    name: 'Bag of Yellow Maize (50kg)',
    price: '₦55,000',
    location: 'Ado-Odo/Ota, Ogun',
    rating: '4.5',
    description: 'Premium dried yellow maize suitable for pap, cornmeal, or animal feed.',
    image: '/listing-9.webp'
  },
  {
    name: 'Basket of Cucumbers',
    price: '₦35,000',
    location: 'Gboko, Benue',
    rating: '4.5',
    description: 'Crisp, refreshing cucumbers perfect for salads, smoothies, or snacking.',
    image: '/listing-10.webp'
  },
  {
    name: 'Groundnuts (Bag, 25kg)',
    price: '₦25,000',
    location: 'Minna, Niger',
    rating: '4.5',
    description: 'Freshly harvested groundnuts, perfect for oil or snacks.',
    image: '/listing-11.webp'
  },
  {
    name: 'Soybeans (50kg Bag)',
    price: '₦33,000',
    location: 'Zaria, Kaduna',
    rating: '4.5',
    description: 'High-protein soybeans, ideal for processing into soy milk.',
    image: '/listing-12.webp'
  },
  {
    name: 'Cashew Nuts (5kg Pack)',
    price: '₦35,000',
    location: 'Ogbomosho North, Oyo',
    rating: '4.5',
    description: 'Handpicked cashew nuts, lightly dried, premium quality.',
    image: '/listing-13.webp'
  },
  {
    name: 'Ugu (Bundle)',
    price: '₦1,000',
    location: 'Jos North, Plateau',
    rating: '4.5',
    description: 'Fresh green ugu leaves, harvested same day.',
    image: '/listing-14.webp'
  },
  {
    name: 'Banana (Bunch)',
    price: '₦40,000',
    location: 'Nsukka, Enugu',
    rating: '4.5',
    description: 'Sweet ripe bananas, naturally grown without chemicals.',
    image: '/listing-15.webp'
  },
  {
    name: 'Pineapple (Each)',
    price: '₦3,000',
    location: 'Eleme, Rivers',
    rating: '4.5',
    description: 'Juicy pineapples, handpicked and extra sweet.',
    image: '/listing-16.webp'
  },
  {
    name: 'Watermelon (Large Size)',
    price: '₦3,500',
    location: 'Bida, Niger',
    rating: '4.5',
    description: 'Fresh, juicy watermelon with deep red flesh.',
    image: '/listing-17.webp'
  },
  {
    name: 'Yam (Tubers, 10pcs)',
    price: '₦35,000',
    location: 'Idah, Kogi',
    rating: '4.0',
    description: 'Big Puna yams, great for pounded yam and porridge.',
    image: '/listing-18.webp'
  },
  {
    name: 'Cassava (50kg Bag)',
    price: '₦35,000',
    location: 'Ughelli North, Delta',
    rating: '3.5',
    description: 'Freshly harvested cassava tubers for processing into garri.',
    image: '/listing-19.webp'
  },
  {
    name: 'Palm Oil (25 Liters Jerrycan)',
    price: '₦35,000',
    location: 'Orlu, Imo',
    rating: '4.5',
    description: 'Locally processed palm oil, rich red color, no additives.',
    image: '/listing-20.webp'
  },
  {
    name: 'Groundnut Oil (5 Liters Bottle)',
    price: '₦8,500',
    location: 'Ilorin South, Kwara',
    rating: '3.5',
    description: 'Pure groundnut oil, cholesterol-free and fresh.',
    image: '/listing-21.webp'
  },
  {
    name: 'Ginger (Sack, 20kg)',
    price: '₦35,000',
    location: 'Kafanchan, Kaduna',
    rating: '3.5',
    description: 'Fresh ginger roots, aromatic and ideal for cooking or tea.',
    image: '/listing-22.webp'
  },
  {
    name: 'Garlic (Bag, 10kg)',
    price: '₦35,000',
    location: 'Maiduguri, Borno',
    rating: '4.0',
    description: 'Organically grown garlic bulbs, strong flavor, long shelf life.',
    image: '/listing-23.webp'
  },
  {
    name: 'Garri (50kg Bag)',
    price: '₦32,000',
    location: 'Sapele, Delta',
    rating: '3.0',
    description: 'Yellow garri, neatly processed and well-dried.',
    image: '/listing-24.webp'
  }
];