// const ProductCard = ({ item }) => {

//     ////////////////////// truncate description
//     function truncateText(text, maxLength) {
//         if (text.length >= maxLength) {
//             return text.slice(0, maxLength - 3) + "...";
//         } else {
//             return text;
//         }
//     }


//     return (
//         <>
//             <div key={item?.id} className="h-[380px]  relative w-[260px] rounded-lg overflow-hidden flex flex-col items-center justify-center">

//                 <div className="menu1 absolute top-1 w-full flex justify-center">
//                     {/* image */}
//                     <div className="image w-40 h-40 overflow-hidden rounded-full relative z-10 border border-gray-300">
//                         {/* <img src="https://image.made-in-china.com/202f0j00EYHqvVPIsBkR/Latest-Design-Kids-Sneakers-Leather-Face-Mesh-Cotton-Shoes-Boys-Shoes.jpg" alt="Menu" className="w-full h-full object-cover transform transition duration-300 hover:scale-110" /> */}
//                         <img src={item.imagePath} alt="Menu" className="   w-full h-full object-cover transform transition duration-300 hover:scale-110" />
//                     </div>
//                     {/* cart icon */}
//                     <button className="absolute top-4 right-16 bg-[#d69642dc] z-30 p-4 w-10 h-10 transform -translate-y-1/2 flex items-center justify-center hover:p-6 rounded-full" style={{ borderRadius: "11% 10% 87% 10% / 17% 12% 71% 10%" }}>
//                         <i className="fa-solid fa-cart-shopping text-white"></i>
//                     </button>
//                 </div>

//                 {/* section 2 */}
//                 <div className="absolute h-[290px] flex items-end bottom-4 w-full bg-gray-200 rounded-[20px]">
//                     <div className="  flex flex-col items-center justify-between h-[70%] p-2 mb-2 ">
//                         <h2 className="text-xl text-left capitalize w-88  p-2 font-bold">{truncateText(item.pname, 30)}</h2>
//                         {/* <div> */}
//                         <p className="text-center mt-2 px-4">{truncateText(item.pdescription, 50)}</p>
//                         <p className=" font-bold">Price : {item.pprice}/Rs</p>
//                         <a href="#" className="mt-2 bg-[#d69642dc] text-white py-1 px-6 rounded-full text-sm hover:bg-black transition duration-300 ease-in-out">Buy Now</a>
//                         {/* </div> */}
//                     </div>
//                 </div>

//             </div>
//         </>
//     )
// }

// export default ProductCard







import React, { useState } from 'react';

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
            {features.map((feature, i) => (
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

const ProductList = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const products = [
    {
      image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp",
      title: "Quant trident shirts",
      rating: 5,
      reviews: 310,
      features: ["100% cotton", "Light weight", "Best finish", "Unique design", "For men", "Casual"],
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      price: 13.99,
      oldPrice: 20.99,
    },
    {
      image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp",
      title: "Quant olap shirts",
      rating: 4,
      reviews: 289,
      features: ["100% cotton", "Light weight", "Best finish", "Unique design", "For men", "Casual"],
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      price: 14.99,
      oldPrice: 21.99,
    },
    {
      image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(5).webp",
      title: "Quant ruybi shirts",
      rating: 4,
      reviews: 145,
      features: ["100% cotton", "Light weight", "Best finish", "Unique design", "For women", "Casual"],
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      price: 17.99,
      oldPrice: 25.99,
    },
  ];

  return (
    <section className="bg-gray-100 py-5 flex relative max-h-[64vh]">
      <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)}></div>
      <div className={`z-10 rounded sidebar fixed lg:static inset-y-0 lg:inset-auto top-0 bottom-0 left-0 w-[350px] bg-white p-4 transition-transform transform lg:translate-x-0 ${sidebarOpen ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' : '-translate-x-full'}`}>
        <button className="mb-4 lg:hidden" onClick={() => setSidebarOpen(false)}>Close</button>
        {/* Filters go here */}
      </div>

      <div className=" w-[96vw] lg:w-2/3 mx-auto px-4 overflow-auto ">
        <button className="bg-blue-500 text-white py-1 px-4 rounded mb-4 lg:hidden" onClick={() => setSidebarOpen(true)}>Filters</button>
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>

  );
};

export default ProductList;
