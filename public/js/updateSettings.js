import axios from 'axios';
import User from '../../models/userModel';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  // type -> password | data  
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/users/${type === 'password' ? 'updatePassword' : 'updateMe'}`,
      data: data,
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type === 'password'? 'Password': 'Details'} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};