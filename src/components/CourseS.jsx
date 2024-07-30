import { Link } from 'react-router-dom';
import Img from '../imgs/Img1.png';
import img2 from '../imgs/star1.png'


const CourseS = ({ courses }) => {
    return (
        <div className='p-4 flex flex-wrap gap-4 w-full justify-center mt-4'>
        {courses.map((course) => (
            <div 
                key={course._id}  
                className='text-center w-80 p-4 bg-white rounded-xl transform transition-all hover:translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0'
            >
                <div className='mb-4'>
                    <img 
                        src={Img} 
                        alt="e-learn" 
                        className='w-full h-48 object-cover rounded-t-xl'
                    />
                </div>
                <div className='p-2'>
                    <h1 className='font-bold text-lg mb-2 text-blue-500'>{course.title}</h1>
                    <p className='text-xl pb-2'>{course.description}</p>
                    <Link 
                        className='font-bold text-sm p-2 bg-yellow-300 rounded-xl text-gray-600 mt-2 w-48 block mx-auto hover:bg-blue-400' 
                        to={`/course/${course._id}`}
                    >
                        View Details
                    </Link>
                    <div className='flex items-center mt-2 gap-1 justify-center'>
                        <img className='w-7' src={img2} alt="rating star" />
                        <img className='w-7' src={img2} alt="rating star" />
                        <img className='w-7' src={img2} alt="rating star" />
                        <img className='w-7' src={img2} alt="rating star" />
                        <img className='w-7' src={img2} alt="rating star" />
                        <p className='font-bold text-xs text-gray-700 ml-2'>Best Rating</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
    
    );
};

export default CourseS;
