import Communication from '../../../util/Communication';

export default class Api {

  constructor() {
    this.communication = new Communication();
  }

  async getAllResource(query) {
    const url = '/resource/all';
    return await this.communication.doJsonGet(url, query);
  }
}