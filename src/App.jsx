import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../index.css'; 
import Login from './pages/login';
import Registre from './pages/Registre';
import CreateCourse from './pages/createCourse';
import GetCourses from './pages/getCourses';
import CourseDetails from './pages/courseDetails';
import EvaluateQ from './pages/evaluateQuiz';
import Chat from './pages/chat';
import Discussion from './pages/discussion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import InsideLayout from './layouts/InsideLayout';
import OutsideLayout from './layouts/OutsideLayout';

function App() {
  return (
    <Router>
      <div className="bg-blue-600 w-full h-screen mt-10 pt-6">
        <Navbar />
        <Sidebar />
        <Routes>

          <Route element={OutsideLayout} >
            <Route path='/login' element={<Login />} />
            <Route path='/registre' element={<Registre />} />
          </Route>
          <Route element={< InsideLayout />} >
            <Route path='/createCourse' element={<CreateCourse />} />
            <Route path='/getCourses' element={<GetCourses />} />
            <Route path='/course/:id' element={<CourseDetails />} />
            <Route path='/evaluateQ' element={<EvaluateQ />} />
            <Route path='/chatbot' element={<Chat />} />
            <Route path='/discussion' element={<Discussion />} />
          </Route>
          <Route>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
