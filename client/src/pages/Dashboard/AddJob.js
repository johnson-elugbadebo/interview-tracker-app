import { FormRow, FormRowSelect, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

function AddJob() {
	const {
		isLoading,
		isEditing,
		showAlert,
		displayAlert,
		position,
		company,
		jobLocation,
		jobType,
		jobTypeOptions,
		status,
		statusOptions,
		handleChange,
		clearValues,
		createJob,
		editJob,
	} = useAppContext();

	const handleSubmit = function (e) {
		e.preventDefault();
		// comment out to test out errors on backend
		if (!position || !company || !jobLocation) {
			displayAlert();
			return;
		}
		if (isEditing) {
			// You don't pass any values into function because they are grabbed from state in Add/Edit Job Page
			editJob();
			return;
		}
		createJob();
	};

	const handleJobInput = function (e) {
		const name = e.target.name;
		const value = e.target.value;
		handleChange({ name, value });
	};

	return (
		<Wrapper>
			<form className='form'>
				<h3>{isEditing ? 'edit job' : 'add job'}</h3>
				{showAlert && <Alert />}

				<div className='form-center'>
					{/* Position */}
					<FormRow
						type='text'
						labelText='position'
						name='position'
						value={position}
						handleChange={handleJobInput}
					/>

					{/* Company */}
					<FormRow
						type='text'
						labelText='company'
						name='company'
						value={company}
						handleChange={handleJobInput}
					/>

					{/* Location */}
					<FormRow
						type='text'
						labelText='location'
						name='jobLocation'
						value={jobLocation}
						handleChange={handleJobInput}
					/>

					{/* Job Type */}
					<FormRowSelect
						name='jobType'
						labelText='Job Type'
						value={jobType}
						handleChange={handleJobInput}
						list={jobTypeOptions}
					/>

					{/* Job Status */}
					<FormRowSelect
						name='status'
						labelText='status'
						value={status}
						handleChange={handleJobInput}
						list={statusOptions}
					/>

					{/* Btn Container */}
					<div className='btn-container'>
						{/* Submit Button */}
						<button
							className='btn btn-block submit-btn'
							type='submit'
							onClick={handleSubmit}
							disabled={isLoading}>
							Submit
						</button>
						{/* Clear Button */}
						<button
							className='btn btn-block clear-btn'
							onClick={(e) => {
								e.preventDefault();
								clearValues();
							}}>
							clear
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	);
}
export default AddJob;
