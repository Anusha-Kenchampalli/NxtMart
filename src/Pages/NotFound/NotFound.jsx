import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
  
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
     
      <h1 className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-9xl font-extrabold text-transparent">
        404
      </h1>

    
      <p className="mt-4 max-w-md text-lg font-medium text-gray-600">
        We are sorry, the page you requested could not be found.
      </p>

      <button 
        type="button"
        onClick={() => navigate('/')} 
        className="mt-8 rounded-md bg-blue-500 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;