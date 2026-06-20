export default function UrbanNestSolutionsWebsite() {
  const products = [
    {
      name: 'Premium Storage Container Set',
      price: '₹799',
      image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=1200&auto=format&fit=crop'
    },
    {
      name: 'Modern Kitchen Organizer',
      price: '₹1,299',
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop'
    },
    {
      name: 'Smart Cleaning Brush Kit',
      price: '₹499',
      image: 'https://images.unsplash.com/photo-1583947582886-f40ec95dd752?q=80&w=1200&auto=format&fit=crop'
    },
    {
      name: 'Multipurpose Spice Rack',
      price: '₹999',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop'
    }
  ]

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Urban Nest Solutions</h1>
            <p className="text-sm text-gray-500">Modern Home & Kitchen Essentials</p>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#home" className="hover:text-black transition">Home</a>
            <a href="#products" className="hover:text-black transition">Products</a>
            <a href="#about" className="hover:text-black transition">About</a>
            <a href="#contact" className="hover:text-black transition">Contact</a>
          </nav>

          <button className="bg-black text-white px-5 py-2 rounded-xl hover:scale-105 transition-all shadow-lg">
            Shop Now
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-white"
      >
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 rounded-full bg-black text-white text-xs font-semibold tracking-wide mb-6 shadow-md">
              Premium Home Utility Store
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Smart Products for Modern Living
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
              Discover stylish, practical, and affordable kitchen & home utility products designed to simplify your everyday lifestyle.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-black text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all shadow-xl">
                Explore Collection
              </button>

              <button className="border border-gray-300 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all">
                View Best Sellers
              </button>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1200&auto=format&fit=crop"
              alt="Kitchen"
              className="rounded-3xl shadow-2xl w-full h-[520px] object-cover"
            />

            <div className="absolute -bottom-6 -left-6 bg-white rounded-3xl shadow-xl p-6 w-60">
              <h3 className="text-3xl font-bold">10K+</h3>
              <p className="text-gray-500 mt-1">Happy Customers Across India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Premium Quality',
                desc: 'Durable and reliable products crafted for everyday use.'
              },
              {
                title: 'Affordable Pricing',
                desc: 'Best value products without compromising on quality.'
              },
              {
                title: 'Fast Delivery',
                desc: 'Quick shipping and secure packaging across India.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-black rounded-2xl mb-6"></div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">
                Featured Collection
              </p>
              <h2 className="text-4xl font-bold">Best Selling Products</h2>
            </div>

            <button className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-white transition-all font-medium">
              View All Products
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all group"
              >
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-72 w-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold">{product.price}</span>
                    <button className="bg-black text-white px-4 py-2 rounded-xl hover:scale-105 transition-all">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop"
              alt="Home Interior"
              className="rounded-3xl shadow-2xl"
            />
          </div>

          <div>
            <p className="uppercase tracking-widest text-gray-500 text-sm mb-3">
              About Urban Nest Solutions
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Bringing Simplicity & Style Into Every Home
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              Urban Nest Solutions focuses on providing innovative home utility and kitchen products that improve convenience, organization, and lifestyle quality.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              From smart storage solutions to elegant kitchen accessories, our products are carefully selected to match modern Indian homes.
            </p>

            <button className="bg-black text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all shadow-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Get Exclusive Offers & Updates
          </h2>

          <p className="text-gray-300 text-lg mb-10">
            Subscribe to receive the latest product launches, deals, and home improvement ideas.
          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-2xl text-black outline-none"
            />

            <button className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4">Urban Nest Solutions</h3>
            <p className="text-gray-600 leading-relaxed">
              Your trusted destination for modern home utility and kitchen essentials.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#home">Home</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <p className="text-gray-600">support@urbannestsolutions.com</p>
            <p className="text-gray-600 mt-2">+91 98765 43210</p>
            <p className="text-gray-600 mt-2">India</p>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-10 pt-6 text-center text-gray-500 text-sm px-6">
          © 2026 Urban Nest Solutions. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
