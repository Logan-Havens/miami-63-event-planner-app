import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import PinITLogo from "../../img/PinIT-logo low-res.png";
import AutoCompleteComponent from "../component/AutoCompleteComponent";
import "../../styles/register.css";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {

	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [problem, setProblem] = useState(null);
	const [location, setLocation] = useState({
		formatted_address: '',
		lat: null,
		lng: null,
	});
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await actions.newUser(email, password, location);
		if (result.ok) {
			console.log('From register.js: user created successfully');
			setProblem(null);
			navigate('/login');
		} else {
			console.log(`From register.js: Error: ${result.msg}`);
			setProblem(`Error: ${result.msg}`);
		}
	};

	return (
		<div className="wrapper">
			<div className="form-box register">
				<h2>Register</h2>
				<form onSubmit={handleSubmit}>
					<div className="input-box">
						<span className="icon"><ion-icon name="mail-outline"></ion-icon></span>
						<input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
						<label>Email</label>
					</div>
					<div className="input-box">
						<span className="icon"><ion-icon name="navigate-outline"></ion-icon></span>
						<AutoCompleteComponent address={location} setAddress={setLocation} />
						<label>Address</label>
					</div>
					<div className="input-box">
						<span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
						<input type="password" placeholder="Set a Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
						<label>Password</label>
					</div>
					<button type="submit" className="btn">Register</button>
					<div className="login-register" style={{ display: "flex" }}>
						<p>Already have an account?</p>
						<Link to="/login" className="register-link">Log in</Link>
					</div>
				</form>
			</div>
			{problem && <p className="problem">{problem}</p>}
		</div>
	);
};
