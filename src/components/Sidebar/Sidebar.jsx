import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ categories, selectedCategory, onCategoryClick }) => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileCategorySelect = (category) => {
    onCategoryClick(category);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      
      <aside className="hidden h-full w-52 border-r border-gray-500 p-2.5 md:block fixed  left-0 bg-gray-50 relative md:mr-8">
    
        <h2 className='mb-4 text-center text-xl font-bold text-green-700'>
          Categories
        </h2>
        {/* Category List for Desktop */}
        <nav>
          {categories.map(category => (
            <div
              key={category}
              role="button"
              tabIndex={0}
              onClick={() => onCategoryClick(category)}
              className={`mb-1 cursor-pointer rounded-md p-3 font-semibold transition-colors ${
                category === selectedCategory
                  ? 'bg-green-600 text-white'
                  : 'hover:bg-green-600 hover:text-white'
              }`}
            >
              {category}
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Category Dropdown */}
      <div className="border-b bg-gray-50 p-3 mt-16 md:hidden">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex w-full items-center justify-between rounded-md border bg-white p-3 text-left font-semibold text-gray-800 shadow-sm"
        >

          <span>{selectedCategory}</span>
          <FontAwesomeIcon icon={faChevronDown} className="text-gray-500" />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 flex flex-col bg-black bg-opacity-50 md:hidden"
   
          role="dialog"
          aria-modal="true"
        >
         
          <div className="flex-grow" onClick={() => setIsMobileMenuOpen(false)} />

 

        {/* Mobile Category Menu */}
          <div className="rounded-t-lg bg-white p-4">
          
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-green-700">All Categories</h3>
              <button type="button" onClick={() => setIsMobileMenuOpen(false)}>
                <FontAwesomeIcon icon={faTimes} size="lg" className="text-gray-600" />
              </button>
            </div>
          
            <div className="max-h-[50vh] overflow-y-auto">
              {categories.map(category => (
                <div
                  key={category}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleMobileCategorySelect(category)}
                  className={`mb-2 cursor-pointer rounded-md p-3 font-semibold transition-colors ${
                    category === selectedCategory ? 'bg-green-600 text-white' : 'hover:bg-green-600 hover:text-white'
                  }`}
                >
                  {category}
                </div>
              ))}
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;