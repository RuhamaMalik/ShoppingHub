import React from 'react';


const ProductCard = ({ image, title, rating, reviews, features, description, price, oldPrice }) => (
  <div className="max-w-full lg:max-w-4xl mx-auto mb-6 ">
    <div className="bg-white shadow rounded-lg overflow-hidden ">
      <div className="flex  flex-wrap md:flex-nowrap">
        <div className="w-full  ">
          <div className="relative">
            <img src={image} alt={title} className="w-full" />
            <div className="absolute inset-0 bg-black bg-opacity-25 transition-opacity hover:opacity-0"></div>
          </div>
        </div>
        <div className="w-full md:w-2/3 lg:w-1/2 p-4">
          <h5 className="text-lg font-semibold">{title}</h5>
          <div className="flex items-center mt-2 mb-1">
            <div className="text-yellow-500 mr-2">
              {[...Array(rating)].map((_, i) => (
                <i key={i} className="fa fa-star"></i>
              ))}
            </div>
            <span>{reviews}</span>
          </div>
          <div className="text-gray-600 text-sm mb-2">
            {features?.map((feature, i) => (
              <span key={i} className="mr-1">
                {feature} {i < features.length - 1 && <span className="text-primary">•</span>}
              </span>
            ))}
          </div>
          <p className="text-gray-700 text-sm mb-4 truncate">{description}</p>
        </div>
        <div className="w-full mdw-3/6 border-t md:border-t-0 md:border-l p-4">
          <div className="flex items-center mb-4">
            <h4 className="text-lg font-semibold mr-2">${price}</h4>
            <span className="text-red-500 line-through">${oldPrice}</span>
          </div>
          <h6 className="text-green-500 mb-4">Free shipping</h6>
          <div className="flex flex-col space-y-2">
            <button className="bg-orange-500 text-white py-1 px-4 rounded hover:bg-orange-600">Details</button>
            <button className="border text-sm border-orange-500 text-orange-500 py-1 px-4 rounded hover:bg-orange-500 hover:text-white">
              Add to wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);



export default ProductCard;
