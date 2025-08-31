const FailureView = ({ onRetry }) => {
  return (
    <div className="text-center mt-[50px]">
      <img
        src="https://res.cloudinary.com/dzpcirnqq/image/upload/v1756641885/Screenshot_2025-08-31_173423_d8wtjp.png" 
        alt="failure"
        className="mx-auto mb-4" 
      />
      <h3 className="text-xl font-semibold">Oops! Something went wrong</h3>
      <p className="mt-2 text-gray-600">We are having some trouble.</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-[15px] cursor-pointer rounded-[5px] border-none bg-[#2196f3] py-[10px] px-[20px] text-white transition-colors hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
  );
};

export default FailureView;