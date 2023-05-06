import React, { useReducer, useContext, useEffect } from 'react';
import reducer from './reducer';
import axios from 'axios';
import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	REGISTER_USER_BEGIN,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_ERROR,
	LOGIN_USER_BEGIN,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_ERROR,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
	UPDATE_USER_BEGIN,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
	HANDLE_CHANGE,
	CLEAR_VALUES,
	CREATE_JOB_BEGIN,
	CREATE_JOB_SUCCESS,
	CREATE_JOB_ERROR,
	GET_JOBS_BEGIN,
	GET_JOBS_SUCCESS,
	SET_EDIT_JOB,
	DELETE_JOB_BEGIN,
	DELETE_JOB_ERROR,
	EDIT_JOB_BEGIN,
	EDIT_JOB_SUCCESS,
	EDIT_JOB_ERROR,
	SHOW_STATS_BEGIN,
	SHOW_STATS_SUCCESS,
	CLEAR_FILTERS,
	CHANGE_PAGE,
	GET_CURRENT_USER_BEGIN,
	GET_CURRENT_USER_SUCCESS,
} from './actions';

// Remove token, user, userLocation from local Storage since we are now using cookies

// Initial State values
const initialState = {
	// State Values for User model
	// Because we are now using cookies, do the following:
	// Remove token all together from state
	// Set user to null
	// Set userLocation & jobLocation to empty strings
	userLoading: true,
	isLoading: false,
	showAlert: false,
	alertText: '',
	alertType: '',
	user: null,
	userLocation: '',
	showSidebar: false,
	// State values for job model
	// Job state values are set Globally in AppContext (unlike update profile page) because the Add Job page has an edit feature which turns into an Edit Job page
	isEditing: false,
	editJobID: '',
	position: '',
	company: '',
	jobLocation: '',
	jobTypeOptions: ['Full-time', 'Part-time', 'Remote', 'Internship'],
	jobType: 'Full-time',
	statusOptions: ['Interview', 'Declined', 'Pending'],
	status: 'Pending',
	// Get All Jobs State values
	jobs: [],
	totalJobs: 0,
	numOfPages: 1,
	page: 1,
	// State values for Stats
	stats: {},
	monthlyApplications: [],
	// State values for Search
	search: '',
	searchStatus: 'All',
	searchType: 'All',
	// default state for sort
	sort: 'Latest',
	sortOptions: ['Latest', 'Oldest', 'A-Z', 'Z-A'],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// Axios - Setup Instance
	const authFetch = axios.create({
		baseURL: '/api/v1',
	});

	// Axios - Request Interceptor
	// Remove request interceptor since we are now using cookies

	// Axios - Response Interceptor
	authFetch.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			// console.log(error.response);
			// error response only for 401 unauthenticated errors
			if (error.response.status === 401) {
				// if user is unauthenticated (e.g., token expires), log them out
				logoutUser();
				// console.log('Authentication Error');
			}
			return Promise.reject(error);
		}
	);

	const displayAlert = function () {
		dispatch({ type: DISPLAY_ALERT });
		clearAlert();
	};

	const clearAlert = function () {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT });
		}, 3000);
	};

	// Remove addUserToLocalStorage and removeUserFromLocalStorage functions since we are now using cookies

	const registerUser = async function (currentUser) {
		dispatch({ type: REGISTER_USER_BEGIN });
		try {
			const response = await axios.post('/api/v1/auth/register', currentUser);
			// console.log(response);
			// Remove token from response since we are now using cookies
			const { user, location } = response.data;
			dispatch({
				type: REGISTER_USER_SUCCESS,
				// Remove token from payload since we are now using cookies
				payload: {
					user,
					location,
				},
			});
			// Remove addUserToLocalStorage since we are now using cookies
		} catch (error) {
			// console.log(error.response);
			dispatch({
				type: REGISTER_USER_ERROR,
				payload: {
					msg: error.response.data.msg,
				},
			});
		}
		clearAlert();
	};

	const loginUser = async function (currentUser) {
		dispatch({ type: LOGIN_USER_BEGIN });
		try {
			const { data } = await axios.post('/api/v1/auth/login', currentUser);
			// console.log({ data });
			// Remove token from data since we are now using cookies
			const { user, location } = data;
			dispatch({
				type: LOGIN_USER_SUCCESS,
				// Remove token from payload since we are now using cookies
				payload: {
					user,
					location,
				},
			});
			// Remove addUserToLocalStorage since we are now using cookies
		} catch (error) {
			// console.log(error.response);
			dispatch({
				type: LOGIN_USER_ERROR,
				payload: {
					msg: error.response.data.msg,
				},
			});
		}
		clearAlert();
	};

	const toggleSidebar = function () {
		dispatch({ type: TOGGLE_SIDEBAR });
	};

	const logoutUser = async function () {
		await authFetch.get('/auth/logout');
		dispatch({ type: LOGOUT_USER });
		// Remove removeUserToLocalStorage since we are now using cookies
	};

	const updateUser = async function (currentUser) {
		//console.log(currentUser);
		dispatch({ type: UPDATE_USER_BEGIN });
		// Axios with Instance and Interceptors above
		try {
			const { data } = await authFetch.patch('/auth/updateUser', currentUser);
			// console.log(data);
			// Remove token from data since we are now using cookies
			const { user, location } = data;
			dispatch({
				type: UPDATE_USER_SUCCESS,
				// Remove token from payload since we are now using cookies
				payload: { user, location },
			});
			// Remove addUserToLocalStorage since we are now using cookies
		} catch (error) {
			// console.log(error.response);
			// dispatch error if not a 401 unauthenticated error
			if (error.response.status !== 401) {
				dispatch({
					type: UPDATE_USER_ERROR,
					payload: {
						msg: error.response.data.msg,
					},
				});
			}
		}
		clearAlert();
	};

	const handleChange = function ({ name, value }) {
		dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
	};

	const clearValues = function () {
		dispatch({ type: CLEAR_VALUES });
	};

	const createJob = async function () {
		dispatch({ type: CREATE_JOB_BEGIN });
		// Axios with Instance and Interceptors above
		try {
			const { position, company, jobLocation, jobType, status } = state;
			// No need for an axios response because we display jobs in a separate page
			await authFetch.post('/jobs', {
				position,
				company,
				jobLocation,
				jobType,
				status,
			});
			dispatch({ type: CREATE_JOB_SUCCESS });
			// Call function instead of clearValues()
			dispatch({ type: CLEAR_VALUES });
		} catch (error) {
			// if error is unauthenticated, return out of function
			if (error.response.status === 401) return;
			dispatch({
				type: CREATE_JOB_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	const getJobs = async function () {
		const { page, search, searchStatus, searchType, sort } = state;

		let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
		if (search) {
			url = url + `&search=${search}`;
		}

		dispatch({ type: GET_JOBS_BEGIN });
		try {
			const { data } = await authFetch.get(url);
			const { jobs, totalJobs, numOfPages } = data;
			dispatch({
				type: GET_JOBS_SUCCESS,
				payload: { jobs, totalJobs: totalJobs, numOfPages: numOfPages },
			});
		} catch (error) {
			console.log(error.response);
			// if you are getting 404 or 500, there is something wrong with application, so we just logout user
			// no need for GET_JOBS_ERROR action
			// comment out logoutUser for now while developing
			logoutUser();
		}
		// We hide alert in reducer because alert was showing when quickly flipping to All Jobs page from other pages where alert was showing
		// So the clearAlert() is precautionary
		clearAlert();
	};

	const setEditJob = function (id) {
		dispatch({ type: SET_EDIT_JOB, payload: { id } });
		// console.log(`set edit job : ${id}`);
	};

	const editJob = async function () {
		dispatch({ type: EDIT_JOB_BEGIN });
		try {
			const { position, company, jobLocation, jobType, status } = state;
			await authFetch.patch(`/jobs/${state.editJobID}`, {
				company,
				position,
				jobLocation,
				jobType,
				status,
			});
			dispatch({ type: EDIT_JOB_SUCCESS });
			dispatch({ type: CLEAR_VALUES });
		} catch (error) {
			if (error.response.status === 401) return;
			dispatch({
				type: EDIT_JOB_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	const deleteJob = async function (jobID) {
		dispatch({ type: DELETE_JOB_BEGIN });
		try {
			await authFetch.delete(`/jobs/${jobID}`);
			// Once successful, invoke getJobs()
			getJobs();
		} catch (error) {
			console.log(error.response);
			// No more logout user If error
			if (error.response.status === 401) return;
			dispatch({
				type: DELETE_JOB_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	const showStats = async function () {
		dispatch({ type: SHOW_STATS_BEGIN });
		try {
			const { data } = await authFetch.get('/jobs/stats');
			dispatch({
				type: SHOW_STATS_SUCCESS,
				payload: {
					stats: data.defaultStats,
					monthlyApplications: data.monthlyApplications,
				},
			});
		} catch (error) {
			console.log(error.response);
			// If error, logout user
			logoutUser();
		}
		clearAlert();
	};

	const clearFilters = function () {
		dispatch({ type: CLEAR_FILTERS });
	};

	const changePage = function (page) {
		dispatch({ type: CHANGE_PAGE, payload: { page: page } });
	};

	const getCurrentUser = async function () {
		dispatch({ type: GET_CURRENT_USER_BEGIN });
		try {
			const { data } = await authFetch.get('/auth/getCurrentUser');
			const { user, location } = data;

			dispatch({
				type: GET_CURRENT_USER_SUCCESS,
				payload: {
					user,
					location,
				},
			});
		} catch (error) {
			// heaving lifting done by interceptor
			// only 2 options with this request: 200 or 401
			if (error.response.status === 401) return;
			logoutUser();
		}
	};
	useEffect(() => {
		getCurrentUser();
	}, []);

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				registerUser,
				loginUser,
				toggleSidebar,
				logoutUser,
				updateUser,
				handleChange,
				clearValues,
				createJob,
				getJobs,
				setEditJob,
				deleteJob,
				editJob,
				showStats,
				clearFilters,
				changePage,
			}}>
			{children}
		</AppContext.Provider>
	);
};

// create custom hook
const useAppContext = function () {
	return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
