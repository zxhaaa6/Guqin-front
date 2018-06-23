import Communication from '../../../util/Communication';

export default class Api {
  constructor() {
    this.communication = new Communication();
  }

  handleLogin(account, password) {
    const url = '/user/login';
    const postData = { account, password };
    return this.communication.doJsonPost(url, postData).then(result => {
      if (result && result.data && result.data.token) {
        sessionStorage.setItem('token', result.data.token);
        return true;
      }
    });
  }
}
