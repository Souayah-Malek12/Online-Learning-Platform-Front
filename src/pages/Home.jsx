import video from '../videos/vid1.mp4'

const Home= ()=> {

    return (
        <div className='flex items-center justify-center min-h-screen relative'>
            <h1 className="absolute top-20 left-1/2 transform -translate-x-1/2 text-xl font-bold">Welcome to Online Learning Platform</h1>
            <div className='w-full max-w-2xl p-4 bg-white shadow-lg rounded-lg'>
            <div className='aspect-w-16 aspect-h-9'>
                <iframe className="w-full h-full" src={video}
                    frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                </iframe>
        </div>
        </div>
</div>

    )
}


export  default Home;