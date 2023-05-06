export const DISPLAY_ALERT = 'SHOW_ALERT';
export const CLEAR_ALERT = 'CLEAR_ALERT';

export const REGISTER_USER_BEGIN = 'REGISTER_USER_BEGIN';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export const LOGIN_USER_BEGIN = 'LOGIN_USER_BEGIN';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const LOGOUT_USER = 'LOGOUT_USER';

export const UPDATE_USER_BEGIN = 'UPDATE_USER_BEGIN';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export const HANDLE_CHANGE = 'HANDLE_CHANGE';

export const CLEAR_VALUES = 'CLEAR_VALUES';

export const CREATE_JOB_BEGIN = 'CREATE_JOB_BEGIN';
export const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS';
export const CREATE_JOB_ERROR = 'CREATE_JOB_ERROR';

export const GET_JOBS_BEGIN = 'GET_JOBS_BEGIN';
export const GET_JOBS_SUCCESS = 'GET_JOBS_SUCCESS';
// if you are getting 404 or 500, there is something wrong with application, so we just logout user
// thus, no need for GET_JOBS_ERROR action
export const SET_EDIT_JOB = 'SET_EDIT_JOB';

export const DELETE_JOB_BEGIN = 'DELETE_JOB_BEGIN';
export const DELETE_JOB_ERROR = 'DELETE_JOB_ERROR';
// No Success Action for Delete Jobs because
// If success, you fetch all the jobs to refresh jobs page

export const EDIT_JOB_BEGIN = 'EDIT_JOB_BEGIN';
export const EDIT_JOB_SUCCESS = 'EDIT_JOB_SUCCESS';
export const EDIT_JOB_ERROR = 'EDIT_JOB_ERROR';

export const SHOW_STATS_BEGIN = 'SHOW_STATS_BEGIN';
export const SHOW_STATS_SUCCESS = 'SHOW_STATS_SUCCESS';

export const CLEAR_FILTERS = 'CLEAR_FILTERS';

export const CHANGE_PAGE = 'CHANGE_PAGE';

export const GET_CURRENT_USER_BEGIN = 'GET_CURRENT_USER_BEGIN';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
