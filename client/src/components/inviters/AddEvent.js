   
const AddEvent = () => { 
    return (
        <div className="flex  flex-col justify-center items-center bg-white mt-5 max-w-7xl mx-auto rounded-3xl p-10">
            <h1 className="text-6xl mb-3 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Welcome to SeaVents</h1>
            <p className="text-xl font-semibold text-gray-700">Click the + sign below to create an event</p>
            <button className="text-6xl rounded-xl border border-black flex justify-center items center py-10 px-20 mt-5 border-dashed border-3">+</button>
        </div>
    );
}

export default AddEvent;