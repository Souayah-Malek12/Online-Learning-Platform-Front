const NotFound = () =>{

    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-5xl text-red-600 font-bold mb-4">Page Not Found</h1>
            <p className="text-lg text-gray-700">The page you are looking for does not exist.</p>
            <a
              href="/"
              className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            >
              Go to Home
            </a>
      </div>
  
        
    );
}


export default  NotFound;
