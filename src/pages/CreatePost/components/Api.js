import Communication from '../../../util/Communication';

export default class Api {

  constructor() {
    this.communication = new Communication();
  }

  async postResource(postData) {
    const url = '/resource/';
    return await this.communication.doJsonPost(url, postData);
  }

  async putResource(postData) {
    const url = '/resource/';
    return await this.communication.doJsonPut(url, postData);
  }

  async getFormData() {
    const category = await this.getAllCategory();
    const tag = await this.getAllTag();
    return { category, tag };
  }

  async getAllCategory() {
    const url = '/category/all';
    const result = await this.communication.doJsonGet(url);
    return result.data;
  }

  async getAllTag() {
    const url = '/tag/all';
    const result = await this.communication.doJsonGet(url);
    return result.data;
  }
}