'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { 
  Heart,
  ShoppingCart,
  Star,
  Trash2,
  Plus
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const USD_TO_INR = 83;
const toINR = (usdPrice: number) => usdPrice * USD_TO_INR;

export default function FavoritesPage() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0 && wishlist.length > 0) {
      const favorites = products.filter(p => wishlist.includes(p.id));
      setFavoriteProducts(favorites);
    } else {
      setFavoriteProducts([]);
    }
  }, [products, wishlist]);

  const removeFromWishlist = (productId: number) => {
    const updated = wishlist.filter(id => id !== productId);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const addToCart = (product: Product) => {
    const savedCart = localStorage.getItem('cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      const updated = cart.map((item: any) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updated));
    } else {
      localStorage.setItem('cart', JSON.stringify([...cart, { ...product, quantity: 1 }]));
    }

    // Show feedback
    alert('Added to cart!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Heart className="h-8 w-8 md:h-12 md:w-12 text-red-500 animate-pulse mx-auto mb-3 md:mb-4" />
          <p className="text-sm md:text-base text-slate-600">Loading favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">My Wishlist</h1>
        <p className="text-sm md:text-base text-slate-600 mt-1">{favoriteProducts.length} items saved</p>
      </div>

      {favoriteProducts.length === 0 ? (
        <Card>
          <CardContent className="py-8 md:py-12 text-center">
            <Heart className="h-12 w-12 md:h-16 md:w-16 text-slate-300 mx-auto mb-3 md:mb-4" />
            <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">Your wishlist is empty</h3>
            <p className="text-sm md:text-base text-slate-600 mb-4 md:mb-6">Save your favorite products to buy them later</p>
            <Button
              onClick={() => router.push('/client/store')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Browse Products
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map(product => (
            <Card key={product.id} className="hover:shadow-lg transition overflow-hidden group relative">
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>

              <div className="relative aspect-square bg-white p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={() => router.push('/client/store')}
                />
                <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-full shadow-sm flex items-center">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-medium ml-1">{product.rating.rate}</span>
                </div>
              </div>

              <CardContent className="p-3 md:p-4">
                <h3 
                  className="font-semibold text-sm md:text-base text-slate-900 mb-2 line-clamp-2 cursor-pointer hover:text-blue-600"
                  onClick={() => router.push('/client/store')}
                >
                  {product.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 mb-2 md:mb-3 capitalize">{product.category}</p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-base md:text-xl font-bold text-blue-600">
                    {formatCurrency(toINR(product.price))}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-xs md:text-sm"
                  >
                    <Plus className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
