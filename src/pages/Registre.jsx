import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestRegistre } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Registre = () => {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [etablissement, setEtablissement] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [adresse, setAdresse] = useState("");
    const [phone, setPhone] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegistre = async (e) => {
        e.preventDefault();
        dispatch(requestRegistre({ nom, prenom, role, email, etablissement, motDePasse, adresse, phone, navigate }));
    };

    return (
        <section className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center mt-5">
            <div className="container mx-auto p-5">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-semibold mb-6">Registration Form</h3>
                    <form onSubmit={handleRegistre}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                <input 
                                    type="text" 
                                    id="firstName" 
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500"
                                    value={nom} 
                                    onChange={e => setNom(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input 
                                    type="text" 
                                    id="lastName" 
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500"
                                    value={prenom} 
                                    onChange={e => setPrenom(e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <select 
                                id="role" 
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500"
                                value={role} 
                                onChange={e => setRole(e.target.value)}
                            >
                                <option value="" disabled>Select Role</option>
                                <option value="Student">Student</option>
                                <option value="Professor">Professor</option>
                                <option value="Administrator">Administrator</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">Email</label>
                                <input 
                                    type="email" 
                                    id="emailAddress" 
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500"
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label htmlFor="Etablissement" className="block text-sm font-medium text-gray-700">Etablissement</label>
                                <input 
                                    type="text" 
                                    id="Etablissement" 
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500"
                                    value={etablissement} 
                                    onChange={e => setEtablissement(e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="motDePasse" className="block text-sm font-medium text-gray-700">Password</label>
                                <input 
                                    type="password" 
                                    id="motDePasse" 
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500"
                                    value={motDePasse} 
                                    onChange={e => setMotDePasse(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone</label>
                                <input 
                                    type="tel" 
                                    id="phoneNumber" 
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500"
                                    value={phone} 
                                    onChange={e => setPhone(e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">Address</label>
                            <input 
                                type="text" 
                                id="adresse" 
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500"
                                value={adresse} 
                                onChange={e => setAdresse(e.target.value)} 
                            />
                        </div>

                        <div>
                            <button 
                                type="submit" 
                                className="w-full py-3 px-4 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Registre;
