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
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                                <form onSubmit={handleRegistre}>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="text" id="firstName" className="form-control form-control-lg" value={nom} onChange={e => setNom(e.target.value)} />
                                                <label className="form-label" htmlFor="firstName">First Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="text" id="lastName" className="form-control form-control-lg" value={prenom} onChange={e => setPrenom(e.target.value)} />
                                                <label className="form-label" htmlFor="lastName">Last Name</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div>
                                            <select className="form-select" aria-label="Default select example" value={role} onChange={e => setRole(e.target.value)}>
                                                <option value="" disabled>Select Role</option>
                                                <option value="Student">Student</option>
                                                <option value="Professor">Professor</option>
                                                <option value="Administrator">Administrator</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <input type="email" id="emailAddress" className="form-control form-control-lg" value={email} onChange={e => setEmail(e.target.value)} />
                                                <label className="form-label" htmlFor="emailAddress">Email</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <input type="text" id="Etablissement" className="form-control form-control-lg" value={etablissement} onChange={e => setEtablissement(e.target.value)} />
                                                <label className="form-label" htmlFor="Etablissement">Etablissement</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <input type="password" id="motDePasse" className="form-control form-control-lg" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} />
                                                <label className="form-label" htmlFor="motDePasse">Password</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <input type="tel" id="phoneNumber" className="form-control form-control-lg" value={phone} onChange={e => setPhone(e.target.value)} />
                                                <label className="form-label" htmlFor="phoneNumber">Phone</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <input type="text" id="adresse" className="form-control form-control-lg" value={adresse} onChange={e => setAdresse(e.target.value)} />
                                                <label className="form-label" htmlFor="adresse">Address</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-2">
                                        <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registre;
