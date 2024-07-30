import { Link } from 'react-router-dom';


const CourseS = (props)=> {
    return (
        <div>
            <div>
                <h1>{props.title}</h1>
            </div>
            <div>
                <p>{props.description}</p>
            </div>
            <Link to={`/course/${props.course._id}`}>View Details</Link> 
        </div>
    )
}


export default CourseS;