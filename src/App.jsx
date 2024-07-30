import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../index.css'; // Import your Tailwind CSS file
import Login from './pages/login'
import Registre from './pages/Registre';
import CreateCourse from './pages/createCourse';
import GetCourses from './pages/getCourses';
import CourseDetails from './pages/courseDetails';
import EvaluateQ from './pages/evaluateQuiz';
import Chat from './pages/chat';
import Discussion from './pages/discussion';
import  Navbar  from './components/Navbar';
import Home from './pages/Home'



function App() {
    
    return (
        <div className="bg-blue-600 w-full h-screen mt-10 pt-6">
            <Navbar />
          
              <Router>
                <Routes>
                  
                        <Route path='/login' element={<Login />}  />
                        <Route path='/registre' element={ < Registre/>} />
                 
                    
                        <Route   path='/createCourse' element={ < CreateCourse/>} />
                        <Route path='/getCourses' element={ < GetCourses />} />
                        <Route path='/course/:id' element={ < CourseDetails />} />
                        <Route path='/evaluateQ' element ={< EvaluateQ />}     />
                        <Route path='/chatbot' element={ < Chat/>} />
                        <Route  path='/discussion'  element={ <Discussion />}/>
                        <Route  path='/'  element={ <Home />}/>
                   
                </Routes>
              </Router>


            
        </div>
    );
}

export default App;
