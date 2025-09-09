export default function TestSidecarPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sidecar-LD Test Page
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            This page is designed for testing the sidecar-ld Chrome extension
          </p>
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
            <p className="text-blue-800">
              <strong>Instructions:</strong> Use the LD Sidecar Chrome extension to select elements and create experiments on this page.
            </p>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Hero Section
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            This is a hero section with various elements you can test with the sidecar-ld extension.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Call to Action Button
          </button>
        </section>

        {/* Product Cards */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Product Showcase
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <img 
                src="https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Product+1" 
                alt="Product 1"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Product One
              </h3>
              <p className="text-gray-600 mb-4">
                This is a description of the first product that you can modify with sidecar-ld.
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Add to Cart
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <img 
                src="https://via.placeholder.com/300x200/059669/FFFFFF?text=Product+2" 
                alt="Product 2"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Product Two
              </h3>
              <p className="text-gray-600 mb-4">
                Another product description that can be easily modified for A/B testing.
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Add to Cart
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <img 
                src="https://via.placeholder.com/300x200/DC2626/FFFFFF?text=Product+3" 
                alt="Product 3"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Product Three
              </h3>
              <p className="text-gray-600 mb-4">
                The third product in our showcase with customizable content.
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Fast Performance
                </h3>
                <p className="text-gray-600">
                  Lightning-fast performance with optimized code and efficient algorithms.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Reliable & Secure
                </h3>
                <p className="text-gray-600">
                  Built with security in mind and tested for reliability across all platforms.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Easy to Use
                </h3>
                <p className="text-gray-600">
                  Intuitive interface designed for both beginners and advanced users.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Customizable
                </h3>
                <p className="text-gray-600">
                  Highly customizable to fit your specific needs and requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4">
              Stay Updated
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <div className="max-w-md mx-auto flex space-x-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600">
          <p className="mb-4">
            This is a test page for sidecar-ld Chrome extension development.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
