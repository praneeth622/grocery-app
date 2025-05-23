import { Product } from '../components/FeaturedProducts';

export const products: Product[] = [
  {
    id: 1,
    name: "Organic Avocados",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    reviews: 128,
    isOrganic: true,
    inStock: true,
    discount: 25,
    description: "Fresh, ripe avocados perfect for guacamole or your morning toast.",
    category: "fruits-vegetables",
    isNew: false
  },
  {
    id: 2,
    name: "Fresh Strawberries",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.3,
    reviews: 96,
    isOrganic: true,
    inStock: true,
    description: "Sweet and juicy strawberries, locally sourced.",
    category: "fruits-vegetables",
    isNew: true
  },
  {
    id: 3,
    name: "Organic Baby Spinach",
    price: 49.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
    rating: 4.6,
    reviews: 75,
    isOrganic: true,
    inStock: true,
    description: "Fresh and tender baby spinach leaves.",
    category: "fruits-vegetables",
    discount: 15
  },
  {
    id: 4,
    name: "Red Bell Peppers",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1563246367-d5c8ae80b189",
    rating: 4.2,
    reviews: 45,
    isOrganic: false,
    inStock: true,
    category: "fruits-vegetables"
  },

  // Dairy & Eggs
  {
    id: 5,
    name: "Organic Free-Range Eggs",
    price: 129.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f",
    rating: 4.8,
    reviews: 156,
    isOrganic: true,
    inStock: true,
    description: "Farm-fresh organic eggs from free-range chickens.",
    category: "dairy-eggs",
    discount: 15
  },
  {
    id: 6,
    name: "Greek Yogurt",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
    rating: 4.4,
    reviews: 89,
    isOrganic: false,
    inStock: true,
    category: "dairy-eggs",
    isNew: true
  },
  {
    id: 7,
    name: "Artisanal Cheese Selection",
    price: 299.99,
    originalPrice: 349.99,
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862",
    rating: 4.9,
    reviews: 134,
    isOrganic: true,
    inStock: true,
    description: "Curated selection of premium artisanal cheeses.",
    category: "dairy-eggs",
    discount: 15
  },

  // Bakery
  {
    id: 8,
    name: "Sourdough Bread",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1585478259715-4d3f8f7334ed",
    rating: 4.7,
    reviews: 112,
    isOrganic: true,
    inStock: true,
    description: "Freshly baked artisanal sourdough bread.",
    category: "bakery",
    isNew: true
  },
  {
    id: 9,
    name: "Chocolate Croissants",
    price: 89.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb",
    rating: 4.5,
    reviews: 78,
    isOrganic: false,
    inStock: true,
    category: "bakery",
    discount: 10
  },
  {
    id: 10,
    name: "Whole Grain Muffins",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1558401391-7899b4bd5bbf",
    rating: 4.3,
    reviews: 45,
    isOrganic: true,
    inStock: true,
    category: "bakery"
  },

  // Meat & Seafood
  {
    id: 11,
    name: "Fresh Atlantic Salmon",
    price: 399.99,
    originalPrice: 449.99,
    image: "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c",
    rating: 4.6,
    reviews: 89,
    isOrganic: false,
    inStock: true,
    description: "Premium Atlantic salmon fillets.",
    category: "meat-seafood",
    discount: 10
  },
  {
    id: 12,
    name: "Organic Chicken Breast",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791",
    rating: 4.4,
    reviews: 167,
    isOrganic: true,
    inStock: true,
    category: "meat-seafood",
    isNew: true
  },
  {
    id: 13,
    name: "Premium Beef Steak",
    price: 599.99,
    originalPrice: 699.99,
    image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a",
    rating: 4.8,
    reviews: 201,
    isOrganic: false,
    inStock: true,
    description: "Premium cut beef steak, perfect for grilling.",
    category: "meat-seafood",
    discount: 15
  },

  // Organic Products
  {
    id: 14,
    name: "Organic Quinoa",
    price: 199.99,
    originalPrice: 229.99,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    rating: 4.7,
    reviews: 156,
    isOrganic: true,
    inStock: true,
    description: "100% organic quinoa, rich in protein and nutrients.",
    category: "organic",
    discount: 15
  },
  {
    id: 15,
    name: "Organic Honey",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38",
    rating: 4.9,
    reviews: 245,
    isOrganic: true,
    inStock: true,
    category: "organic",
    isNew: true
  },
  {
    id: 16,
    name: "Organic Chia Seeds",
    price: 159.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1514733670139-4d87a1941d55",
    rating: 4.5,
    reviews: 89,
    isOrganic: true,
    inStock: true,
    category: "organic",
    discount: 10
  },
  {
    id: 17,
    name: "Organic Coconut Oil",
    price: 279.99,
    image: "https://images.unsplash.com/photo-1590368746679-a3a34563a365",
    rating: 4.6,
    reviews: 167,
    isOrganic: true,
    inStock: true,
    category: "organic"
  },
  {
    id: 18,
    name: "Organic Green Tea",
    price: 149.99,
    originalPrice: 169.99,
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5",
    rating: 4.4,
    reviews: 134,
    isOrganic: true,
    inStock: true,
    category: "organic",
    discount: 12
  },
  {
    id: 19,
    name: "Organic Almonds",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46",
    rating: 4.7,
    reviews: 178,
    isOrganic: true,
    inStock: true,
    category: "organic",
    isNew: true
  },
  {
    id: 20,
    name: "Organic Acai Powder",
    price: 449.99,
    originalPrice: 499.99,
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5",
    rating: 4.8,
    reviews: 156,
    isOrganic: true,
    inStock: true,
    description: "100% pure organic acai berry powder.",
    category: "organic",
    discount: 10
  },

  // Additional Products
  // Fruits and Vegetables
  {
    id: 21,
    name: "Organic Blueberries",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e",
    rating: 4.7,
    reviews: 89,
    isOrganic: true,
    inStock: true,
    description: "Sweet and juicy organic blueberries packed with antioxidants.",
    category: "fruits-vegetables",
    discount: 20
  },
  {
    id: 22,
    name: "Fresh Kale",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57",
    rating: 4.3,
    reviews: 65,
    isOrganic: true,
    inStock: true,
    description: "Nutrient-rich fresh kale, perfect for salads and smoothies.",
    category: "fruits-vegetables",
    isNew: true
  },
  {
    id: 23,
    name: "Red Onions",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31",
    rating: 4.2,
    reviews: 42,
    isOrganic: false,
    inStock: true,
    description: "Fresh red onions, essential for your everyday cooking needs.",
    category: "fruits-vegetables"
  },
  {
    id: 24,
    name: "Organic Carrots",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979",
    rating: 4.4,
    reviews: 78,
    isOrganic: true,
    inStock: true,
    description: "Sweet and crunchy organic carrots, freshly harvested.",
    category: "fruits-vegetables"
  },
  {
    id: 25,
    name: "Green Apples",
    price: 129.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a",
    rating: 4.5,
    reviews: 91,
    isOrganic: true,
    inStock: true,
    description: "Crisp and tart green apples, perfect for snacking or baking.",
    category: "fruits-vegetables",
    discount: 13
  },

  // Dairy & Eggs
  {
    id: 26,
    name: "Organic Butter",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1589985270958-bf087b2d551b",
    rating: 4.6,
    reviews: 124,
    isOrganic: true,
    inStock: true,
    description: "Creamy organic butter made from grass-fed cow's milk.",
    category: "dairy-eggs",
    isNew: true
  },
  {
    id: 27,
    name: "Mozzarella Cheese",
    price: 179.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d",
    rating: 4.7,
    reviews: 146,
    isOrganic: false,
    inStock: true,
    description: "Fresh Italian mozzarella cheese, perfect for pizzas and salads.",
    category: "dairy-eggs",
    discount: 10
  },
  {
    id: 28,
    name: "Almond Milk",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1600718374662-0483d2b9da44",
    rating: 4.4,
    reviews: 98,
    isOrganic: true,
    inStock: true,
    description: "Silky smooth unsweetened almond milk, a delicious dairy alternative.",
    category: "dairy-eggs"
  },
  {
    id: 29,
    name: "Oat Milk",
    price: 139.99,
    image: "https://images.unsplash.com/photo-1572165872019-acd5cdd54900",
    rating: 4.3,
    reviews: 87,
    isOrganic: true,
    inStock: true,
    description: "Creamy oat milk that's perfect for coffee, cereal, or drinking straight.",
    category: "dairy-eggs",
    isNew: true
  },

  // Bakery
  {
    id: 30,
    name: "Whole Wheat Bread",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1600398137925-79a4e734fb05",
    rating: 4.5,
    reviews: 112,
    isOrganic: true,
    inStock: true,
    description: "Nutritious whole wheat bread, freshly baked daily.",
    category: "bakery"
  },
  {
    id: 31,
    name: "Cinnamon Rolls",
    price: 179.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812",
    rating: 4.8,
    reviews: 156,
    isOrganic: false,
    inStock: true,
    description: "Delicious freshly baked cinnamon rolls with cream cheese frosting.",
    category: "bakery",
    discount: 10
  },
  {
    id: 32,
    name: "Artisanal Baguette",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1568471173242-461f0a730452",
    rating: 4.7,
    reviews: 89,
    isOrganic: false,
    inStock: true,
    description: "Authentic French-style baguette with a crispy crust and soft interior.",
    category: "bakery",
    isNew: true
  },
  {
    id: 33,
    name: "Gluten-Free Bread",
    price: 169.99,
    originalPrice: 189.99,
    image: "https://images.unsplash.com/photo-1586444248732-f703ce9756a3",
    rating: 4.4,
    reviews: 67,
    isOrganic: true,
    inStock: true,
    description: "Delicious gluten-free bread that doesn't compromise on taste or texture.",
    category: "bakery",
    discount: 10
  },

  // Meat & Seafood
  {
    id: 34,
    name: "Grass-Fed Ground Beef",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f",
    rating: 4.6,
    reviews: 134,
    isOrganic: true,
    inStock: true,
    description: "Premium grass-fed ground beef, perfect for burgers and meatballs.",
    category: "meat-seafood",
    isNew: true
  },
  {
    id: 35,
    name: "Fresh Jumbo Prawns",
    price: 599.99,
    originalPrice: 699.99,
    image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9",
    rating: 4.7,
    reviews: 89,
    isOrganic: false,
    inStock: true,
    description: "Plump, juicy jumbo prawns, perfect for grilling or stir-frying.",
    category: "meat-seafood",
    discount: 15
  },
  {
    id: 36,
    name: "Organic Lamb Chops",
    price: 649.99,
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143",
    rating: 4.8,
    reviews: 76,
    isOrganic: true,
    inStock: true,
    description: "Tender organic lamb chops from grass-fed, ethically raised lambs.",
    category: "meat-seafood"
  },
  {
    id: 37,
    name: "Tuna Steaks",
    price: 499.99,
    originalPrice: 549.99,
    image: "https://images.unsplash.com/photo-1515692688679-6e42e69e5a3f",
    rating: 4.5,
    reviews: 92,
    isOrganic: false,
    inStock: true,
    description: "Premium fresh tuna steaks, perfect for grilling or searing.",
    category: "meat-seafood",
    discount: 10
  },
  
  // Snacks & Confectionery
  {
    id: 38,
    name: "Dark Chocolate Bar",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919",
    rating: 4.7,
    reviews: 145,
    isOrganic: true,
    inStock: true,
    description: "Premium 70% dark chocolate bar made with organic cocoa beans.",
    category: "snacks",
    isNew: true
  },
  {
    id: 39,
    name: "Mixed Nuts",
    price: 349.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32",
    rating: 4.6,
    reviews: 108,
    isOrganic: true,
    inStock: true,
    description: "Premium assortment of roasted nuts including almonds, cashews, and walnuts.",
    category: "snacks",
    discount: 12
  },
  {
    id: 40,
    name: "Dried Fruit Mix",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1561059624-ebe92c324e48",
    rating: 4.4,
    reviews: 76,
    isOrganic: true,
    inStock: true,
    description: "Delicious mixture of organic dried fruits, perfect for snacking or baking.",
    category: "snacks"
  },
  
  // Beverages
  {
    id: 41,
    name: "Cold Pressed Orange Juice",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
    rating: 4.8,
    reviews: 134,
    isOrganic: true,
    inStock: true,
    description: "Freshly squeezed organic orange juice with no added sugars or preservatives.",
    category: "beverages",
    isNew: true
  },
  {
    id: 42,
    name: "Coconut Water",
    price: 89.99,
    originalPrice: 109.99,
    image: "https://images.unsplash.com/photo-1536759808940-cc52bcedee88",
    rating: 4.5,
    reviews: 92,
    isOrganic: true,
    inStock: true,
    description: "Pure and refreshing coconut water, a natural source of hydration.",
    category: "beverages",
    discount: 18
  },
  {
    id: 43,
    name: "Kombucha",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1597403491447-3ab08f8e44dc",
    rating: 4.3,
    reviews: 78,
    isOrganic: true,
    inStock: true,
    description: "Fermented probiotic tea with natural flavors, good for gut health.",
    category: "beverages"
  },
  {
    id: 44,
    name: "Artisanal Coffee Beans",
    price: 349.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
    rating: 4.9,
    reviews: 167,
    isOrganic: true,
    inStock: true,
    description: "Premium single-origin coffee beans, freshly roasted for maximum flavor.",
    category: "beverages",
    discount: 12
  },
  
  // Pantry Essentials
  {
    id: 45,
    name: "Extra Virgin Olive Oil",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
    rating: 4.8,
    reviews: 156,
    isOrganic: true,
    inStock: true,
    description: "Cold-pressed extra virgin olive oil from organic olives.",
    category: "pantry",
    isNew: true
  },
  {
    id: 46,
    name: "Himalayan Pink Salt",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1576007467413-61d258ee0127",
    rating: 4.6,
    reviews: 89,
    isOrganic: true,
    inStock: true,
    description: "Pure Himalayan pink salt, rich in minerals and trace elements.",
    category: "pantry"
  },
  {
    id: 47,
    name: "Basmati Rice",
    price: 219.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6",
    rating: 4.7,
    reviews: 124,
    isOrganic: true,
    inStock: true,
    description: "Premium aged basmati rice with a wonderful aroma and texture.",
    category: "pantry",
    discount: 12
  },
  {
    id: 48,
    name: "Organic Pasta",
    price: 169.99,
    image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f",
    rating: 4.5,
    reviews: 78,
    isOrganic: true,
    inStock: true,
    description: "Artisanal organic pasta made with traditional methods and premium ingredients.",
    category: "pantry"
  },
  {
    id: 49,
    name: "Tomato Sauce",
    price: 129.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc",
    rating: 4.4,
    reviews: 67,
    isOrganic: true,
    inStock: true,
    description: "Authentic Italian tomato sauce made with organic tomatoes and herbs.",
    category: "pantry",
    discount: 13
  },
  {
    id: 50,
    name: "Raw Wild Honey",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1471943311424-646960669fbc",
    rating: 4.9,
    reviews: 187,
    isOrganic: true,
    inStock: true,
    description: "Pure, unprocessed wild honey collected from pristine forests.",
    category: "pantry",
    isNew: true
  }
];

export default products;