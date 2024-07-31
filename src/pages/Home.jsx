import video from '../videos/vid1.mp4'

const Home= ()=> {

    return (
        <div className=' flex items-center justify-center min-h-screen '>
            <div className='absolute top-20 left-1/2 transform -translate-x-1/2'>
                <h1 className="text-xl font-bold text-center mb-6 mt-12 text-violet-100">Welcome to Online Learning Platform</h1>
            </div>
            <div className='w-full max-w-4xl h-96 bg-white shadow-lg rounded-lg overflow-hidden'>
                <iframe
                    className="w-full h-full"
                    src={video}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    

    )
}


export  default Home;