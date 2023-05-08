import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
// global context and useNavigate later

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	isMember: false,
};

// if possible prefer local state
// global state

function Register() {
	// global context and useNavigate later
	const navigate = useNavigate();
	const [values, setValues] = useState(initialState);

	const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } = useAppContext();

	const toggleMember = function () {
		setValues({ ...values, isMember: !values.isMember });
	};

	const handleChange = function (e) {
		// console.log(e.target);
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmit = function (e) {
		e.preventDefault();
		// console.log(e.target);
		const { firstName, lastName, email, password, isMember } = values;
		if (!email || !password || (!isMember && !firstName) || (!isMember && !lastName)) {
			displayAlert();
			return;
		}

		const currentUser = { firstName, lastName, email, password };
		if (isMember) {
			loginUser(currentUser);
		} else {
			registerUser(currentUser);
		}
	};

	// If user exists, navigate to home page
	useEffect(
		() => {
			if (user) {
				setTimeout(() => {
					navigate('/');
				}, 1000);
			}
		},
		// invoke useEffect on initial render, and every time user or navigate changes
		[user, navigate]
	);

	return (
		<Wrapper className='full-page'>
			<form className='form' onSubmit={onSubmit}>
				<Logo />
				<h3>{values.isMember ? 'Login' : 'Register'}</h3>
				{showAlert && <Alert />}
				{/* First Name input */}
				{!values.isMember && (
					<FormRow
						type='text'
						labelText='First Name'
						name='firstName'
						value={values.firstName}
						handleChange={handleChange}
					/>
				)}
				{/* Last Name input */}
				{!values.isMember && (
					<FormRow
						type='text'
						labelText='Last Name'
						name='lastName'
						value={values.lastName}
						handleChange={handleChange}
					/>
				)}
				{/* Email input */}
				<FormRow type='email' name='email' value={values.email} handleChange={handleChange} />
				{/* Password input */}
				<FormRow
					type='password'
					name='password'
					value={values.password}
					handleChange={handleChange}
				/>
				<button type='submit' className='btn btn-block' disabled={isLoading}>
					Submit
				</button>
				<button
					type='button'
					className='btn btn-block btn-hipster'
					disabled={isLoading}
					onClick={() => {
						loginUser({ email: 'testuser@gmail.com', password: 'secret' });
					}}>
					Test Demo Application
				</button>
				<p>
					{values.isMember ? 'Not a Member yet?' : 'Already a member?'}
					<button type='button' onClick={toggleMember} className='member-btn'>
						{values.isMember ? 'Register' : 'Login'}
					</button>
				</p>
			</form>
		</Wrapper>
	);
}

export default Register;
