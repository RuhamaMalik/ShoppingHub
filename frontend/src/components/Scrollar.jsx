
const Scroller = ({id, name, image, updateSearch = () => {} }) => {

    
    return (

        <div className="inline-block mx-2 ">
            <div className="relative rounded-full w-40 h-40 flex flex-col items-center   justify-evenly -ml-12 sm:ml-0">
                <img
                    onClick={() => updateSearch(id)}
                    src={image}
                    alt={name}
                    className="rounded-full border border-gray-300 outline outline-orange-400 outline-offset-4 w-24 h-24 object-cover cursor-pointer "
                />
                <p >{name}</p>

            </div>
        </div>
    );
};

export default Scroller;
