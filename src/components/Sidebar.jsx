
import { useState } from 'react';
import { NavLink } from 'react-router-dom'


function Sidebar() {
const [isVisible, setIsVisible]=useState(false);

const toggleSidebar = ()=>  {
  setIsVisible(!isVisible);
}
  
  return (
    <div className="absolute mt-10 ">
        <button
          onClick={toggleSidebar}
          className="relative top-30 left-4 z-50 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          {isVisible ? 'Hide' : 'Menu'}
        </button>
        <nav
          className={`z-30 fixed top-23 left-0 h-full w-64 bg-blue-800 text-white flex flex-col items-center py-7 transition-transform transform ${
            isVisible ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <ul className="w-full">
            <li className="w-full">
              <NavLink
                to="/getCourses"
                className="flex items-center px-6 py-3 hover:bg-blue-700 w-full"
                activeClassName="bg-blue-700" 
              >
                <i className="fa fa-home mr-3"></i>
                <span className="nav-text">Courses</span>
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to="/discussion"
                className="flex items-center px-6 py-3 hover:bg-blue-700 w-full"
                activeClassName="bg-blue-700"
              >
                <i className="fa fa-comments mr-3"></i>
                <span className="nav-text">Discussion</span>
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to="/chatbot"
                className="flex items-center px-6 py-3 hover:bg-blue-700 w-full"
                activeClassName="bg-blue-700"
              >
                <i className="fa fa-robot mr-3"></i>
                <span className="nav-text">Chatbot</span>
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to="/"
                className="flex items-center px-6 py-3 hover:bg-blue-700 w-full"
                activeClassName="bg-blue-700"
              >
                <i className="fa fa-user mr-3"></i>
                <span className="nav-text">Profile</span>
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to="/createCourse"
                className="flex items-center px-6 py-3 hover:bg-blue-700 w-full"
                activeClassName="bg-blue-700" 
              >
                <i className="fa fa-home mr-3"></i>
                <span className="nav-text">Create Course</span>
              </NavLink>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default Sidebar
