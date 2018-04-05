import axios from 'axios';
import { Feedback } from "@icedesign/base";
import config from '../config/config';
const Toast = Feedback.toast;

export default class Communication {

  constructor() {
    this.apiHost = config.apiHost;

    this.ajax = axios.create({
      baseURL: this.apiHost,
      timeout: 5000,
      headers: { 'Authentication': 'Bearer ' + sessionStorage.getItem('token') }
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

  handleFieldMsg(data) {
    Toast.error(data.status + ' ' + data.message);
  }

  handleError(err) {
    Toast.error(err.stack);
  }
}