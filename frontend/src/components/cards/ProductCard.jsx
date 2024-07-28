const ProductCard = ({ item }) => {

    ////////////////////// truncate description
    function truncateText(text, maxLength) {
        if (text.length >= maxLength) {
            return text.slice(0, maxLength - 3) + "...";
        } else {
            return text;
        }
    }


    return (
        <>
            <div key={item?.id} className="h-[380px]  relative w-[260px] rounded-lg overflow-hidden flex flex-col items-center justify-center">

                <div className="menu1 absolute top-1 w-full flex justify-center">
                    {/* image */}
                    <div className="image w-40 h-40 overflow-hidden rounded-full relative z-10 border border-gray-300">
                        {/* <img src="https://image.made-in-china.com/202f0j00EYHqvVPIsBkR/Latest-Design-Kids-Sneakers-Leather-Face-Mesh-Cotton-Shoes-Boys-Shoes.jpg" alt="Menu" className="w-full h-full object-cover transform transition duration-300 hover:scale-110" /> */}
                        <img src={item.imagePath} alt="Menu" className="   w-full h-full object-cover transform transition duration-300 hover:scale-110" />
                    </div>
                    {/* cart icon */}
                    <button className="absolute top-4 right-16 bg-[#d69642dc] z-30 p-4 w-10 h-10 transform -translate-y-1/2 flex items-center justify-center hover:p-6 rounded-full" style={{ borderRadius: "11% 10% 87% 10% / 17% 12% 71% 10%" }}>
                        <i className="fa-solid fa-cart-shopping text-white"></i>
                    </button>
                </div>

                {/* section 2 */}
                <div className="absolute h-[290px] flex items-end bottom-4 w-full bg-gray-200 rounded-[20px]">
                    <div className="  flex flex-col items-center justify-between h-[70%] p-2 mb-2 ">
                        <h2 className="text-xl text-left capitalize w-88  p-2 font-bold">{truncateText(item.pname, 30)}</h2>
                        {/* <div> */}
                        <p className="text-center mt-2 px-4">{truncateText(item.pdescription, 50)}</p>
                        <p className=" font-bold">Price : {item.pprice}/Rs</p>
                        <a href="#" className="mt-2 bg-[#d69642dc] text-white py-1 px-6 rounded-full text-sm hover:bg-black transition duration-300 ease-in-out">Buy Now</a>
                        {/* </div> */}
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProductCard
