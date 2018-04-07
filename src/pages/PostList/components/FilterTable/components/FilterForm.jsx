import React, { Component } from 'react';
import { Input, Grid, Select, Button, DatePicker } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

import Api from '../../Api';

const { Row, Col } = Grid;
const { Option } = Select;

export default class FilterForm extends Component {
  static displayName = 'FilterForm';

  constructor(props) {
    super(props);
    this.Api = new Api();
    // 请求参数缓存
    this.state = {
      id: '',
      title: '',
      text: '',
      categoryLa: 'null',
      tag: 'null',
      publishDate: '',
      categoryOptions: [<Option key="null" value="null" disabled>请选择</Option>],
      tagOptions: [<Option key="null" value="null" disabled>请选择</Option>],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.Api.getFilterFormData().then(result => {
      const categoryOptions = this.state.categoryOptions.concat(result.category.map(element => {
        return <Option key={element._id} value={element._id}>{element.name}</Option>;
      }));
      const tagOptions = this.state.tagOptions.concat(result.tag.map(element => {
        return <Option key={element._id} value={element._id}>{element.name}</Option>;
      }));
      this.setState({ categoryOptions, tagOptions });
    });
  };

  resetFormData = () => {
    this.setState({
      id: '',
      title: '',
      text: '',
      categoryLa: 'null',
      tag: 'null',
      publishDate: '',
    });
    this.props.onReset();
  }

  handleInputChange = value => {
    this.setState(value);
    this.props.onChange(value);
  }

  render() {
    const { id, title, text, categoryLa, tag, publishDate, categoryOptions, tagOptions } = this.state;
    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.handleInputChange}
      >
        <div>
          <Row wrap>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>ID</label>
              <IceFormBinder>
                <Input name="id" value={id} />
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>标题</label>
              <IceFormBinder>
                <Input name="title" value={title} />
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>正文</label>
              <IceFormBinder>
                <Input name="text" value={text} />
              </IceFormBinder>
            </Col>

            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>分类</label>
              <IceFormBinder>
                <Select name="categoryLa" placeholder="请选择" style={styles.filterTool} value={categoryLa}>
                  {categoryOptions}
                </Select>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>标签</label>
              <IceFormBinder>
                <Select name="tag" placeholder="请选择" style={styles.filterTool} value={tag}>
                  {tagOptions}
                </Select>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>发布日期</label>
              <IceFormBinder
                valueFormatter={(date, strValue) => {
                  return strValue;
                }}
              >
                <DatePicker name="publishDate" style={styles.filterTool}  value={publishDate} />
              </IceFormBinder>
            </Col>
          </Row>
          <div
            style={{
              textAlign: 'left',
              marginLeft: '12px',
            }}
          >
            <Button onClick={this.resetFormData} type="normal">
              重置
            </Button>
            <Button
              onClick={this.props.onSubmit}
              type="primary"
              style={{ marginLeft: '10px' }}
            >
              确定
            </Button>
          </div>
        </div>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  filterCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },

  filterTitle: {
    width: '68px',
    textAlign: 'right',
    marginRight: '12px',
    fontSize: '14px',
  },

  filterTool: {
    width: '200px',
  },
};