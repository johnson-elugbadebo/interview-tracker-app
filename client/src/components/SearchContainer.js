import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useState, useMemo } from 'react';

function SearchContainer() {
	// Setup local state variables for Search Requests, doesn't trigger requests to server
	const [localSearch, setLocalSearch] = useState('');

	const {
		isLoading,
		searchStatus,
		searchType,
		sort,
		sortOptions,
		statusOptions,
		jobTypeOptions,
		handleChange,
		clearFilters,
	} = useAppContext();

	const handleSearch = function (e) {
		// if (isLoading) return;
		handleChange({ name: e.target.name, value: e.target.value });
	};

	const handleSubmit = function (e) {
		e.preventDefault();
		setLocalSearch('');
		clearFilters();
	};

	const debounce = function () {
		// console.log('debounce');
		let timeoutID;
		return function (e) {
			setLocalSearch(e.target.value);
			clearTimeout(timeoutID);
			timeoutID = setTimeout(() => {
				handleChange({ name: e.target.name, value: e.target.value });
			}, 1000);
		};
	};

	// useMemo prevents the re-renter every time useState is invoked
	const optimizedDebounce = useMemo(
		() => debounce(),
		// eslint-disable-next-line
		[]
	);

	return (
		<Wrapper>
			<form className='form'>
				<h4>search form</h4>
				<div className='form-center'>
					{/* Search Position	 */}
					<FormRow
						labelText='Search'
						type='text'
						name='search'
						value={localSearch}
						handleChange={optimizedDebounce}
					/>

					{/* Search by Status */}
					<FormRowSelect
						labelText='Job Status'
						name='searchStatus'
						value={searchStatus}
						handleChange={handleSearch}
						list={['All', ...statusOptions]}
					/>

					{/* Search by Type */}
					<FormRowSelect
						labelText='Job Type'
						name='searchType'
						value={searchType}
						handleChange={handleSearch}
						list={['All', ...jobTypeOptions]}
					/>

					{/* Sort */}
					<FormRowSelect
						labelText='Sort'
						name='sort'
						value={sort}
						handleChange={handleSearch}
						list={sortOptions}
					/>
					<button
						type='button'
						className='btn btn-block btn-danger'
						disabled={isLoading}
						onClick={handleSubmit}>
						clear filters
					</button>
				</div>
			</form>
		</Wrapper>
	);
}
export default SearchContainer;
