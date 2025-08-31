import Header from '../../components/Header/Header';
import { useState } from 'react';
import { loadCartFromLocalStorage, saveCartToLocalStorage } from '../../Utils/localStorageUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const [cart, setCart] = useState(loadCartFromLocalStorage());

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
 
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const updateQuantity = (id, qty) => {
    const updated = { ...cart };
    if (qty > 0) {
      updated[id].quantity = qty;
    } else {
      delete updated[id];
    }
    setCart(updated);
    saveCartToLocalStorage(updated);
  };

  const getTotal = () =>
    Object.values(cart).reduce((sum, item) => {
      const priceString = String(item.price).replace(/[^\d.]/g, '');
      const priceNumber = parseFloat(priceString);
      return !isNaN(priceNumber) ? sum + priceNumber * item.quantity : sum;
    }, 0);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    setIsPaymentSuccessful(true);
  };

  const handleCloseSuccessModal = () => {
    setCart({});
    saveCartToLocalStorage({});
    setIsPaymentModalOpen(false);
    setIsPaymentSuccessful(false);
  };
  
  const cartItems = Object.values(cart);
  const totalAmount = getTotal();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 mt-16">
        <div className="mx-auto max-w-3xl p-4 pt-8 pb-24">
 

          {cartItems.length === 0 ? (
            <div className="mt-16 flex flex-col items-center justify-center text-center">
              <img src="https://res.cloudinary.com/dzpcirnqq/image/upload/v1753966735/Logo-1_bhe8bf.png" alt="Empty Cart" className="h-48 w-48 opacity-50" />
              <h2 className="mt-6 text-2xl font-semibold text-gray-700">Your cart is empty.</h2>
              <p className="mt-2 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <ul className="divide-y divide-gray-200">
               
                {cartItems.map(item => (
                  <li key={item.id} className="flex items-center gap-4 p-4 sm:gap-6">
                    <img src={item.image} alt={item.name} className="h-20 w-20 flex-shrink-0 rounded-md border object-contain sm:h-24 sm:w-24" />
                    <div className="flex-grow">
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-gray-600">{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white transition hover:bg-green-700">-</button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white transition hover:bg-green-700">+</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 bg-gray-50 p-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                  Total: ₹{totalAmount.toFixed(2)}
                </h3>
                <button 
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="rounded-md bg-green-600 px-5 py-2 font-semibold text-white transition hover:bg-green-700"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* --- PAYMENT MODAL --- */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
         
            <button 
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
            
            {!isPaymentSuccessful ? (
              // PAYMENT FORM 
              <>
                <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">Enter Payment Details</h2>
                <form onSubmit={handlePaymentSubmit}>
                 
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input type="text" id="cardNumber" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                      <input type="text" id="expiryDate" placeholder="MM/YY" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                      <input type="text" id="cvv" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
                    </div>
                  </div>
                  <button type="submit" className="w-full rounded-md bg-green-600 py-2.5 font-semibold text-white transition hover:bg-green-700">
                    Pay ₹{totalAmount.toFixed(2)}
                  </button>
                </form>
              </>
            ) : (
              // PAYMENT SUCCESS CARD
              <div className="text-center">
                <FontAwesomeIcon icon={faCheckCircle} className="text-6xl text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
                <p className="mt-2 text-gray-600">Thank you for your purchase.</p>
                <button 
                  onClick={handleCloseSuccessModal}
                  className="mt-6 w-full rounded-md bg-green-600 py-2.5 font-semibold text-white transition hover:bg-green-700"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;