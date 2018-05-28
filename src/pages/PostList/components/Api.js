import Communication from '../../../util/Communication';

export default class Api {
  constructor() {
    this.communication = new Communication();
  }

  async getAllResource(query) {
    const url = '/resource/all';
    return this.communication.doJsonGet(url, query);
  }

  async deleteResource(id) {
    const url = '/resource/';
    return this.communication.doJsonDelete(url, { id });
  }

  async getFilterFormData() {
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
