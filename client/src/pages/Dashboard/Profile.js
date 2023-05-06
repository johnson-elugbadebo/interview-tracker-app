import { useState } from 'react';
import { FormRow, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

function Profile() {
	const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext();

	// setting up state values locally, not global state through app context
	// using optional chaining "?." because field may be null
	const [firstName, setFirstName] = useState(user?.firstName);
	const [lastName, setLastName] = useState(user?.lastName);
	const [email, setEmail] = useState(user?.email);
	const [location, setLocation] = useState(user?.location);

	const handleSubmit = function (e) {
		e.preventDefault();

		// check for empty values on front end
		// comment out while testing
		if (!firstName || !lastName || !email || !location) {
			displayAlert();
			return;
		}

		updateUser({ firstName, lastName, email, location });
	};

	return (
		<Wrapper>
			<form className='form' onSubmit={handleSubmit}>
				<h3>profile</h3>
				{showAlert && <Alert />}
				<div className='form-center'>
					<FormRow
						type='text'
						labelText='First Name'
						name='firstName'
						value={firstName}
						handleChange={(e) => setFirstName(e.target.value)}
					/>

					<FormRow
						type='text'
						labelText='Last Name'
						name='lastName'
						value={lastName}
						handleChange={(e) => setLastName(e.target.value)}
					/>

					<FormRow
						type='email'
						labelText='Email'
						name='email'
						value={email}
						handleChange={(e) => setEmail(e.target.value)}
					/>

					<FormRow
						type='text'
						labelText='Location'
						name='location'
						value={location}
						handleChange={(e) => setLocation(e.target.value)}
					/>

					<button type='submit' className='btn btn-block' disabled={isLoading}>
						{isLoading ? 'Please wait...' : 'Save Changes'}
					</button>
				</div>
			</form>
		</Wrapper>
	);
}
export default Profile;
