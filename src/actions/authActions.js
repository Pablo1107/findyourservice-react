import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './types';
const store = require('store')
const axios = require('axios');

export const fetchAuthUser = () => async dispatch => {
  const auth_token = store.get('AUTH_TOKEN');
  if(auth_token) {
    try {
      axios.defaults.headers.common['Authorization'] = 
        `Bearer ${auth_token.token}`;
      const response = await axios.get('/api/user');
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
      })
    } catch(error) {
      console.log(error);
      dispatch({
        type: LOGIN_FAILED,
      })
    }
  } 
};

export const loginUser = (email, password) => async dispatch => {
  dispatch({
    type: LOGIN_REQUEST
  });
  const response = await axios.post('/api/login/',
    {
      email,
      password,
    });
  store.set('AUTH_TOKEN', response.data);
  dispatch(fetchAuthUser());
}

export const logoutUser = () => async dispatch => {
  store.clearAll();
  const response = await axios.get('/api/logout/');
  console.log(response.data);
  dispatch({
    type: LOGOUT
  });
}
