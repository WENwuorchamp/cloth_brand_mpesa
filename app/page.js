'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, AlertCircle, Loader2, X, Plus, Trash2, ShieldCheck, Filter } from 'lucide-react';

const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'AURA Heavyweight Oversized Hoodie',
    category: 'Outerwear',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    description: '450 GSM organic French terry cotton featuring custom dropped shoulders and double-lined hood.',
  },
  {
    id: 'prod-2',
    name: 'Tactical Ripstop Cargo Pants',
    category: 'Bottoms',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80',
    description: 'Durable reinforced cotton blend with deep utility pockets and adjustable ankle cinch toggles.',
  },
  {
    id: 'prod-3',
    name: 'Minimalist Rubberized Graphic Tee',
    category: 'T-Shirts',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    description: '240 GSM combed cotton crewneck showcasing high-density monochromatic branding.',
  },
  {
    id: 'prod-4',
    name: 'Obsidian Matte Utility Vest',
    category: 'Outerwear',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80',
    description: 'Water-resistant nylon shell featuring multi-pocket layout and heavy-duty front zip closure.',
  },
  {
    id: 'prod-5',
    name: 'Vintage Acid Wash Sweatpants',
    category: 'Bottoms',
    price: 2600,
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80',
    description: 'Custom mineral wash fleece with relaxed tapered fit and deep zipper-secured pockets.',
  },
  {
    id: 'prod-6',
    name: 'Chunky Platform High-Top Sneakers',
    category: 'Footwear',
    price: 5200,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    description: 'Premium leather upper with stacked lug sole unit and reinforced metal eyelet lacing system.',
  },
  {
    id: 'prod-7',
    name: 'Heavyweight Drop-Shoulder Long Sleeve',
    category: 'T-Shirts',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
    description: '300 GSM ribbed cuff long-sleeve tee with structural boxy fit and subtle neck embroidery.',
  },
  {
    id: 'prod-8',
    name: 'Structured Canvas Chore Jacket',
    category: 'Outerwear',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80',
    description: 'Rugged cotton canvas coat with soft corduroy collar accents and dual patch hand pockets.',
  },
  /* --- NEW CATALOG ITEMS (Watches & Official Wear) --- */
  {
    id: 'prod-9',
    name: 'Chronograph Matte Black Steel Watch',
    category: 'Watches',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80',
    description: 'Stainless steel casing with scratch-resistant sapphire glass, tachymeter bezel, and Japanese quartz movement.',
  },
  {
    id: 'prod-10',
    name: 'Executive Slim-Fit Double-Breasted Suit',
    category: 'Official Wear',
    price: 14500,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80',
    description: 'Tailored Italian wool blend suit with peak lapels, double back vents, and matching flat-front trousers.',
  },
  {
    id: 'prod-11',
    name: 'Minimalist Automatic Leather Timepiece',
    category: 'Watches',
    price: 11200,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
    description: 'Self-winding mechanical movement visible through an exhibition case back with genuine full-grain leather strap.',
  },
  {
    id: 'prod-12',
    name: 'Oxford Button-Down Crisp Cotton Shirt',
    category: 'Official Wear',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80',
    description: '100% Egyptian long-staple cotton with wrinkle-resistant finish and adjustable barrel cuffs.',
  },
  {
    id: 'prod-13',
    name: 'Handcrafted Leather Derby Dress Shoes',
    category: 'Official Wear',
    price: 9500,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=80',
    description: 'Goodyear-welted full-grain calfskin leather construction with cushioned memory foam orthotic insoles.',
  },
];

export default function StoreFront() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');

  const [status, setStatus] = useState('IDLE');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeOrderId, setActiveOrderId] = useState(null);

  // Extract unique categories dynamically from PRODUCTS array
  const categories = ['All', ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!phone || cart.length === 0) return;

    setStatus('SUBMITTING');
    setErrorMessage('');

    try {
      const response = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customerName || 'Valued Customer',
          phone,
          amount: cartTotal,
          items: cart,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setActiveOrderId(data.orderId);
        setStatus('WAITING_FOR_PIN');
      } else {
        setStatus('FAILED');
        setErrorMessage(data.error || 'Unable to trigger STK push prompt.');
      }
    } catch (err) {
      setStatus('FAILED');
      setErrorMessage(err.message || 'Connection timeout. Check your network.');
    }
  };

  useEffect(() => {
    let interval;
    if (status === 'WAITING_FOR_PIN' && activeOrderId) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/orders/${activeOrderId}`);
          const order = await res.json();

          if (order.status === 'COMPLETED') {
            setStatus('COMPLETED');
            setCart([]);
            clearInterval(interval);
          } else if (order.status === 'FAILED') {
            setStatus('FAILED');
            setErrorMessage('Transaction was canceled or timed out on your phone.');
            clearInterval(interval);
          }
        } catch (err) {
          console.error('Polling error:', err);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [status, activeOrderId]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      <nav className="sticky top-0 z-40 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-2xl font-black tracking-tighter text-white">AURA</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2.5 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="bg-white text-emerald-950 font-black px-2 py-0.5 rounded-full text-xs">
              {cart.length}
            </span>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-emerald-950/40 border border-neutral-800 rounded-3xl p-8 md:p-12 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="max-w-2xl">
            <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs uppercase px-3 py-1 rounded-full mb-4">
              Autumn Collection 2026
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              PREMIUM STREET & OFFICIAL WEAR.
            </h1>
            <p className="text-neutral-400 text-base md:text-lg">
              Engineered apparel, luxury timepieces, and formal wear. Automated checkout powered by Safaricom M-Pesa STK Push.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 p-4 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">Instant Payment</p>
              <p className="text-xs text-neutral-400">Direct M-Pesa prompt on phone</p>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="text-xs text-neutral-500 font-semibold">
              Showing {filteredProducts.length} of {PRODUCTS.length} items
            </span>
          </div>
        </section>

        {/* Catalog Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition flex flex-col justify-between"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-neutral-900/90 text-neutral-300 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-md border border-neutral-800">
                    {product.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5">{product.name}</h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{product.description}</p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-neutral-800/80 pt-4">
                    <span className="text-lg font-black text-emerald-400">
                      KES {product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-white hover:bg-neutral-200 text-neutral-950 px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Slide-over Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="bg-neutral-900 w-full max-w-md h-full border-l border-neutral-800 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-400" />
                  Your Bag ({cart.length})
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-neutral-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-3">
                {cart.length === 0 ? (
                  <p className="text-neutral-500 text-center py-12 text-sm">Your shopping bag is empty.</p>
                ) : (
                  cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-neutral-950 border border-neutral-800 p-3.5 rounded-xl"
                    >
                      <div>
                        <p className="text-sm font-bold text-white">{item.name}</p>
                        <p className="text-xs font-semibold text-emerald-400 mt-0.5">
                          KES {item.price.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(idx)}
                        className="text-neutral-500 hover:text-red-400 p-1.5 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t border-neutral-800 pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-neutral-400">Subtotal</span>
                  <span className="text-emerald-400">KES {cartTotal.toLocaleString()}</span>
                </div>

                {status === 'IDLE' && (
                  <form onSubmit={handlePayment} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 mb-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. John Doe"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 mb-1">
                        M-Pesa Mobile Number
                      </label>
                      <input
                        type="text"
                        placeholder="0712345678 or 07XXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                    >
                      Pay KES {cartTotal.toLocaleString()} via M-Pesa
                    </button>
                  </form>
                )}

                {status === 'SUBMITTING' && (
                  <div className="bg-neutral-950 border border-neutral-800 p-6 rounded-xl text-center space-y-3">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-400 mx-auto" />
                    <p className="text-sm font-semibold text-white">Contacting Safaricom Gateway...</p>
                  </div>
                )}

                {status === 'WAITING_FOR_PIN' && (
                  <div className="bg-emerald-950/40 border border-emerald-500/30 p-6 rounded-xl text-center space-y-3">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-400 mx-auto" />
                    <p className="text-sm font-bold text-emerald-300">STK Push Sent!</p>
                    <p className="text-xs text-emerald-400/80">
                      Check phone number <span className="font-bold text-white">{phone}</span> and enter your M-Pesa PIN to complete payment.
                    </p>
                  </div>
                )}

                {status === 'COMPLETED' && (
                  <div className="bg-emerald-950/60 border border-emerald-500/40 p-6 rounded-xl text-center space-y-3">
                    <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                    <p className="text-base font-bold text-white">Payment Confirmed!</p>
                    <p className="text-xs text-neutral-300">
                      Your order status is updated to COMPLETED in Supabase.
                    </p>
                    <button
                      onClick={() => {
                        setStatus('IDLE');
                        setIsCartOpen(false);
                      }}
                      className="w-full bg-white text-neutral-950 font-bold text-xs py-2.5 rounded-xl mt-2"
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}

                {status === 'FAILED' && (
                  <div className="bg-red-950/40 border border-red-500/30 p-6 rounded-xl text-center space-y-3">
                    <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
                    <p className="text-sm font-bold text-red-300">Payment Failed</p>
                    <p className="text-xs text-red-400/80">{errorMessage}</p>
                    <button
                      onClick={() => setStatus('IDLE')}
                      className="w-full bg-red-600 text-white font-bold text-xs py-2.5 rounded-xl mt-2"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
