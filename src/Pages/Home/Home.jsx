import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import FailureView from '../../components/FailureView/FailureView';
import Footer from '../../components/Footer/Footer';
import { saveCartToLocalStorage, loadCartFromLocalStorage } from '../../Utils/localStorageUtils';

const apiUrl = 'https://apis2.ccbp.in/nxt-mart/category-list-details';

const Home = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState(loadCartFromLocalStorage());
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setStatus('loading');
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const localCart = loadCartFromLocalStorage();

      const updatedCategories = data.categories.map(category => ({
        name: category.name,
        products: category.products.map(product => ({
          ...product,
          quantity: localCart[product.id]?.quantity || 0,
        })),
      }));

      setCategoriesData(updatedCategories);
      setSelectedCategory('All');
      setStatus('success');
    } catch (err) {
      console.error('Error fetching:', err);
      setStatus('failure');
    }
  };

  const updateProductQty = (productId, qty) => {
    const updatedCategories = categoriesData.map(category => ({
      ...category,
      products: category.products.map(product =>
        product.id === productId ? { ...product, quantity: qty } : product
      ),
    }));
    setCategoriesData(updatedCategories);

    const updatedProduct = updatedCategories.flatMap(cat => cat.products).find(p => p.id === productId);

    const updatedCart = { ...cartItems };
    if (qty > 0) {
      updatedCart[productId] = updatedProduct;
    } else {
      delete updatedCart[productId];
    }
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };


  const handleAdd = (productId) => {
    updateProductQty(productId, 1);
  };

  if (status === 'loading') return <div className="flex h-screen items-center justify-center"><Loader /></div>;
  if (status === 'failure') return <FailureView onRetry={fetchData} />;

  const allCategoryNames = ['All', ...categoriesData.map(c => c.name)];
  const singleCategoryProducts = categoriesData.find(cat => cat.name === selectedCategory)?.products || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="mx-auto flex w-full max-w-7xl flex-col p-4 md:flex-row md:gap-6">
        <div className="w-full md:w-52 md:flex-shrink-0">
          <div className="md:sticky md:top-16">
            <Sidebar
              categories={allCategoryNames}
              selectedCategory={selectedCategory}
              onCategoryClick={setSelectedCategory}
            />
          </div>
        </div>

        <main className="flex-1">
          {selectedCategory === 'All' ? (
            <div className="space-y-8">
              {categoriesData.map(category => (
                <section key={category.name}>
                  <h2 className="mb-4 text-2xl font-bold text-gray-800">{category.name}</h2>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {category.products.map(product => (
                      <ProductCard key={product.id} product={product} onAdd={handleAdd} onUpdate={updateProductQty} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">{selectedCategory}</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {singleCategoryProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAdd={handleAdd} onUpdate={updateProductQty} />
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;