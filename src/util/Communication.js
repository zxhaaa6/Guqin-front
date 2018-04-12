import axios from 'axios';
import { Feedback } from "@icedesign/base";
import { hashHistory } from 'react-router';
import config from '../config/config';
const Toast = Feedback.toast;

export default class Communication {

  constructor() {
    this.apiHost = config.apiHost;

    this.ajax = axios.create({
      baseURL: this.apiHost,
      timeout: 5000,
      headers: { 'authorization': 'Bearer ' + sessionStorage.getItem('token') }
    });
  }

  doJsonPost(url, jsonData) {
    return this.ajax.post(url, jsonData).then(response => {
      if (response.data.success) {
        return response.data;
      }
      this.handleFieldMsg(response.data);
    }).catch(err => {
      this.handleError(err);
    });
  }

  doJsonGet(url, params) {
    return this.ajax.get(url, { params: params }).then(response => {
      if (response.data.success) {
        return response.data;
      }
      this.handleFieldMsg(response.data);
    }).catch(err => {
      this.handleError(err);
    });
  }

  doJsonDelete(url, params) {
    return this.ajax.delete(url, { params: params }).then(response => {
      if (response.data.success) {
        return response.data;
      }
      this.handleFieldMsg(response.data);
    }).catch(err => {
      this.handleError(err);
    });
  }

  handleFieldMsg(data) {
    Toast.error(data.status + ' ' + data.message);
  }

  handleError(err) {
    if (err.response && err.response.status === 401) {
      sessionStorage.setItem('token', null);
      hashHistory.push('/login');
      return;
    }
    Toast.error(err.stack);
  }
}