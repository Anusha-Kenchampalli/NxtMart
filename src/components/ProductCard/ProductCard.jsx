const ProductCard = ({ product, onAdd, onUpdate }) => {

  const handleIncrease = () => onUpdate(product.id, product.quantity + 1);

  const handleDecrease = () => {
    const newQuantity = product.quantity > 1 ? product.quantity - 1 : 0;
    onUpdate(product.id, newQuantity);
  };

  const buttonBaseClasses = "bg-green-600 text-white border-none cursor-pointer transition-colors hover:bg-green-700";

  return (
    <div className="flex w-full flex-col mt-10 rounded-lg border border-gray-200 bg-white p-3 text-center shadow-sm transition-shadow hover:shadow-md">

      <div className="relative w-full">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-contain"
        />
      </div>

      <div className="flex-grow pt-2">
        <h4 className="font-semibold text-gray-800">{product.name}</h4>
        <p className="text-sm text-gray-500">{product.price}</p>
      </div>

      <div className="mt-auto pt-2">
        {product.quantity > 0 ? (
          <div className="flex items-center justify-center gap-x-2.5">
            <button type="button" onClick={handleDecrease} className={`${buttonBaseClasses} h-8 w-8 rounded-full text-lg`}>-</button>
            <span className="w-8 text-center font-semibold">{product.quantity}</span>
            <button type="button" onClick={handleIncrease} className={`${buttonBaseClasses} h-8 w-8 rounded-full text-lg`}>+</button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onAdd(product.id)}
            className={`${buttonBaseClasses} w-full rounded-md py-1.5 px-3.5 font-semibold`}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;