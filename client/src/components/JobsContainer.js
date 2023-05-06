import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Job from './Job';
import Alert from './Alert';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';

function JobsContainer() {
	const {
		getJobs,
		jobs,
		isLoading,
		page,
		totalJobs,
		search,
		searchStatus,
		searchType,
		sort,
		numOfPages,
		showAlert,
	} = useAppContext();

	// Once component renders,invoke getJobs
	useEffect(() => {
		getJobs();
		// eslint-disable-next-line
	}, [page, search, searchStatus, searchType, sort]);

	// if you're loading, show loading spinner
	if (isLoading) {
		return <Loading center />;
	}

	// if there are no jobs
	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h2>No jobs to display...</h2>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			{showAlert && <Alert />}
			<h5>
				{totalJobs} job{jobs.length > 1 && 's'} found
			</h5>
			<div className='jobs'>
				{jobs.map((job) => {
					return <Job key={job._id} {...job} />;
				})}
			</div>
			{/* Pagination Buttons */}
			{numOfPages > 1 && <PageBtnContainer />}
		</Wrapper>
	);
}
export default JobsContainer;
