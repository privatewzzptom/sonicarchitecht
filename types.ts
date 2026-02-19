export interface Product {
  id: string;
  name: string;
  type: 'Sample Kit' | 'Drum Kit' | 'Loop Kit';
  price: number;
  description: string;
  image: string;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  toggleCart: () => void;
  clearCart: () => void;
  cartTotal: number;
}