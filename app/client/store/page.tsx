'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { 
  Search,
  ShoppingCart,
  Star,
  Filter,
  Grid,
  List,
  Plus,
  Minus,
  X,
  ChevronRight,
  Package,
  Heart,
  Trash2,
  CheckCircle2
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

interface CartItem extends Product {
  quantity: number;
}

// USD to INR conversion rate
const USD_TO_INR = 83;

// Convert USD to INR
const toINR = (usdPrice: number) => {
  return usdPrice * USD_TO_INR;
};

export default function StorePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Load cart and wishlist from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products from FakeStore API
        const productsRes = await fetch('https://fakestoreapi.com/products');
        const productsData = await productsRes.json();
        setProducts(productsData);
        setFilteredProducts(productsData);

        // Fetch categories
        const categoriesRes = await fetch('https://fakestoreapi.com/products/categories');
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching store data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, products]);

  // Cart functions
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Wishlist functions
  const toggleWishlist = (productId: number) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.includes(productId);
  };

  // Checkout function
  const handleCheckout = () => {
    if (cart.length === 0) return;
    router.push('/client/checkout');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Package className="h-8 w-8 md:h-12 md:w-12 text-blue-600 animate-pulse mx-auto mb-3 md:mb-4" />
          <p className="text-sm md:text-base text-slate-600">Loading store...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Spare Parts Store</h1>
          <p className="text-sm md:text-base text-slate-600 mt-1">Browse and order industrial spare parts</p>
        </div>
        <Button
          size="default"
          className="bg-blue-600 hover:bg-blue-700 relative w-full sm:w-auto"
          onClick={() => setShowCart(!showCart)}
        >
          <ShoppingCart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
          Cart
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-4 md:pt-6">
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2.5 md:py-3 text-sm md:text-base border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Category Filter & View Toggle */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3">
              <div className="flex items-center gap-2 flex-1">
                <Filter className="h-4 w-4 md:h-5 md:w-5 text-slate-600 flex-shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-1 px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex border border-slate-300 rounded-lg overflow-hidden w-full sm:w-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 sm:flex-none p-2.5 md:p-3 min-w-[44px] ${
                    viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="h-4 w-4 md:h-5 md:w-5 mx-auto" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 sm:flex-none p-2.5 md:p-3 min-w-[44px] ${
                    viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4 md:h-5 md:w-5 mx-auto" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap items-center gap-2 mt-3 md:mt-4">
            {selectedCategory !== 'all' && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('all')}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery('')}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="text-sm text-slate-600">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="hover:shadow-lg transition overflow-hidden group">
              <div className="relative aspect-square bg-white p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2 left-2 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition"
                >
                  <Heart 
                    className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-slate-400'}`}
                  />
                </button>
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow-sm flex items-center">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-medium ml-1">{product.rating.rate}</span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 
                  className="font-semibold text-sm md:text-base text-slate-900 mb-2 line-clamp-2 cursor-pointer hover:text-blue-600"
                  onClick={() => setSelectedProduct(product)}
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
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map(product => (
            <Card key={product.id} className="hover:shadow-lg transition">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-32 h-32 bg-white p-2 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-contain cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 
                        className="font-semibold text-base md:text-lg text-slate-900 cursor-pointer hover:text-blue-600"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {product.title}
                      </h3>
                      <div className="flex items-center bg-slate-100 px-2 py-1 rounded flex-shrink-0">
                        <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs md:text-sm font-medium ml-1">{product.rating.rate}</span>
                        <span className="text-xs text-slate-600 ml-1">({product.rating.count})</span>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-slate-600 mb-2 md:mb-3 capitalize">{product.category}</p>
                    <p className="text-xs md:text-sm text-slate-700 mb-3 md:mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex flex-wrap items-center justify-between gap-2 md:gap-3">
                      <span className="text-lg md:text-2xl font-bold text-blue-600">
                        {formatCurrency(toINR(product.price))}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleWishlist(product.id)}
                          className={isInWishlist(product.id) ? 'border-red-500 text-red-500' : ''}
                        >
                          <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500' : ''}`} />
                        </Button>
                        <Button
                          onClick={() => addToCart(product)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowCart(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="p-4 md:p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900">Shopping Cart</h2>
                  <button onClick={() => setShowCart(false)}>
                    <X className="h-5 w-5 md:h-6 md:w-6 text-slate-600" />
                  </button>
                </div>
                <p className="text-xs md:text-sm text-slate-600 mt-1">{getTotalItems()} items</p>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-8 md:py-12">
                    <ShoppingCart className="h-12 w-12 md:h-16 md:w-16 text-slate-300 mx-auto mb-3 md:mb-4" />
                    <p className="text-sm md:text-base text-slate-600">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-3 md:gap-4 pb-3 md:pb-4 border-b border-slate-200">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="w-16 h-16 md:w-20 md:h-20 object-contain bg-white p-1"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-900 text-xs md:text-sm line-clamp-2 mb-1 md:mb-2">
                            {item.title}
                          </h3>
                          <p className="text-xs md:text-sm font-bold text-blue-600 mb-1 md:mb-2">
                            {formatCurrency(toINR(item.price))}
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 border border-slate-300 rounded hover:bg-slate-50"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs md:text-sm font-medium w-6 md:w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 border border-slate-300 rounded hover:bg-slate-50"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-4 md:p-6 border-t border-slate-200 bg-slate-50">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className="text-base md:text-lg font-semibold text-slate-900">Total</span>
                    <span className="text-xl md:text-2xl font-bold text-blue-600">
                      {formatCurrency(toINR(getTotalPrice()))}
                    </span>
                  </div>
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-base md:text-lg py-4 md:py-6"
                  >
                    Proceed to Checkout
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => setCart([])}
                  >
                    Clear Cart
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 md:p-4" onClick={() => setSelectedProduct(null)}>
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 md:p-6">
              <div className="flex items-start justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-2xl font-bold text-slate-900 pr-6 md:pr-8">{selectedProduct.title}</h2>
                <button onClick={() => setSelectedProduct(null)}>
                  <X className="h-5 w-5 md:h-6 md:w-6 text-slate-600" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                <div className="bg-white p-4 md:p-8">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    loading="lazy"
                    className="w-full h-auto object-contain"
                  />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4">
                    <div className="flex items-center bg-slate-100 px-2 md:px-3 py-1 rounded">
                      <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm md:text-base font-medium ml-1">{selectedProduct.rating.rate}</span>
                      <span className="text-xs md:text-sm text-slate-600 ml-1">({selectedProduct.rating.count} reviews)</span>
                    </div>
                    <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm capitalize">
                      {selectedProduct.category}
                    </span>
                  </div>

                  <p className="text-3xl font-bold text-blue-600 mb-6">
                    {formatCurrency(toINR(selectedProduct.price))}
                  </p>

                  <h3 className="font-semibold text-slate-900 mb-2">Description</h3>
                  <p className="text-slate-700 mb-6">{selectedProduct.description}</p>

                  <Button
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                      setShowCart(true);
                    }}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
