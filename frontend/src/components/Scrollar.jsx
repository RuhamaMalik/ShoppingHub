
const Scroller = ({ id, name, image, updateSearch = () => { } }) => {


    return (

        <div className="inline-block mx-2 p-3 group cursor-pointer"   onClick={() => updateSearch(id)}>
            {/* <div className="relative  w-40 h-40 flex flex-col items-center justify-evenly -ml-12 sm:ml-0  group">
                <img
                    onClick={() => updateSearch(id)}
                    src={image}
                    alt={name}
                    className="rounded-full border border-gray-300 outline-offset-4 w-32 h-32 object-cover cursor-pointer rotate-y-360 shadow-2xl p-5 outline outline-gray-300 -outline-offset-3"
                />
                <p className="transition-colors group-hover:text-[var(--base-color)]">{name}</p>
            </div> */}

<div className="relative rounded  w-40 h-40 flex flex-col items-center justify-evenly -ml-12 sm:ml-0 shadow-2xl  ">
                <img
                  
                    src={image}
                    alt={name}
                    className="rounded-full border border-gray-300 outline-offset-4 w-32 h-32 object-cover  rotate-y-360  "
                />
                <p className="transition-colors text-center group-hover:text-[var(--base-color)]">{name.slice(0,16)}</p>
            </div> 

            
            {/* <div className="relative rounded-full w-40 h-40 flex flex-col items-center justify-evenly -ml-12 sm:ml-0 shadow-2xl group">
                <img
                    onClick={() => updateSearch(id)}
                    src={image}
                    alt={name}
                    className="rounded-full border border-gray-300 outline-offset-4 w-24 h-24 object-cover cursor-pointer rotate-y-360"
                />
                <p className="transition-colors group-hover:text-[var(--base-color)]">{name}</p>
            </div> */}

        </div>
    );
};

export default Scroller;
