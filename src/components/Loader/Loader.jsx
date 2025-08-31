const Loader = () => {
  return (
    <div className="flex items-center justify-center p-12">
      <div
        className="h-10 w-10 animate-spin rounded-full border-[5px] border-solid border-gray-200 border-t-blue-500"
        role="status"
        aria-label="loading"
      />
    </div>
  );
};

export default Loader;