import axios from 'axios';
import { Feedback } from "@icedesign/base";
import config from '../config/config';
const Toast = Feedback.toast;

export default class Communication {
  constructor() {
    this.apiHost = config.apiHost;

  }

  doJsonPost(url, jsonData) {
    return axios.post(this.apiHost + url, jsonData).then(response => {
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