import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestLogin } from '../store/userSlice';
import '../componentsStyle/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const dispatch = useDispatch();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await dispatch(requestLogin({ email, motDePasse, role }));

            if (response.payload && response.payload.success) {
                setSuccess('Login successful!');
                setError('');
            } else {
                setSuccess('');
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            setSuccess('');
            setError('An error occurred during login.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img 
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" 
                                alt="Sample"
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleLogin}>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <i className="fab fa-facebook-f"></i>
                                    </button>
                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <i className="fab fa-twitter"></i>
                                    </button>
                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <i className="fab fa-linkedin-in"></i>
                                    </button>
                                </div>
                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                </div>
                                <div className="form-outline mb-4">
                                    <input 
                                        type="email" 
                                        id="form3Example3" 
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                </div>
                                <div className="form-outline mb-3">
                                    <input 
                                        type="password" 
                                        id="form3Example4" 
                                        className="form-control form-control-lg"
                                        placeholder="Enter password" 
                                        value={motDePasse}
                                        onChange={(e) => setMotDePasse(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>
                                <div>
                                    <select className="form-select" aria-label="Default select example" value={role} onChange={e => setRole(e.target.value)}>
                                        <option value="" disabled>Select Role</option>
                                        <option value="Student">Student</option>
                                        <option value="Professor">Professor</option>
                                        <option value="Administrator">Administrator</option>
                                    </select>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input 
                                            className="form-check-input me-2" 
                                            type="checkbox" 
                                            value="" 
                                            id="form2Example3" 
                                        />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">Forgot password?</a>
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                    >
                                        Login
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Do not t have an account? <a href="#!" className="link-danger">Register</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                    <div className="text-white mb-3 mb-md-0">
                        Copyright © 2020. All rights reserved.
                    </div>
                    <div>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="#!" className="text-white">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
