import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { requestLogin } from '../store/userSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const dispatch = useDispatch();
    const navigate= useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await dispatch(requestLogin({ email, motDePasse, role }));

            if (response.payload && response.payload.success) {
                setSuccess('Login successful!');
                console.log('Login successful!')
                setError('');
                navigate('/')
            } else {
                setSuccess('');
                setError('Login failed. Please try again.');
                console.log('Login failed. Please try again.')

            }
        } catch (err) {
            setSuccess('');
            setError('An error occurred during login.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div className='bg-white mt-4 px-10 py-20 rounded-3xl border-2 border-gray-200'>
                <h1 className='text-5xl font-semibold'>Welcome Back</h1>
                <p className='font-meduim text-lg text-gray-500 mt-4'>Welcome Back! Please enter your details</p>
                <div className='mt-8 '>
                    <div>
                         <label className='text-lg font-meduim'>Email address</label>

                        <input className='w-full  border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent '
                        type="email"
                        placeholder="Enter a valid email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='text-lg font-meduim'>Password</label>

                        <input  className='w-full  border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        type="password"
                        placeholder="Enter password" 
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        />
                    </div>
                    <div>
                        <select 
                        value={role} 
                        onChange={e => setRole(e.target.value)}
                        className="m-3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="Student">Student</option>
                            <option value="Professor">Professor</option>
                            <option value="Administrator">Administrator</option>
                        </select>
                    </div>
                    <div>
                      <button 
                        type="submit" 
                        className="font-medium text-base p-4 text-white m-2 bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out rounded-md"
                      >
                        Login
                      </button>
                    </div>
                    <div className="text-violet-500 text-xl m-2">
                      <p>
                        Do not have an account? <a href="/Registre" className="text-blue-600 hover:underline">Register</a>
                      </p>
                    </div>

                </div>


            </div>
        </form>
                    
    );
};

export default Login;
