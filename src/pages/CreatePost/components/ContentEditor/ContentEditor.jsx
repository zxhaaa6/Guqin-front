import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import RichEditor from './RichEditor';
import Api from '../Api';

const { Row, Col } = Grid;
const FormItem = Form.Item;

export default class ContentEditor extends Component {
  static displayName = 'ContentEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.Api = new Api();
    this.type =
      this.props.dataSource && this.props.dataSource.type === 'edit'
        ? 'edit'
        : 'create';
    this.oldRecord =
      this.props.dataSource && this.props.dataSource.record
        ? this.props.dataSource.record
        : null;

    this.state = {
      headTitle: this.type === 'create' ? '添加文章' : '修改文章',
      categoryOptions: [],
      tagOptions: [],
      value: {
        title: '',
        categoryLa: '',
        tags: [],
        description: '',
        text: '',
      },
    };
  }

  async componentDidMount() {
    await this.fetchData();
    if (this.type === 'edit') {
      const value = {
        title: this.oldRecord.title,
        categoryLa: this.oldRecord.categoryLaId,
        tags: this.oldRecord.tagId,
        description: this.oldRecord.description,
        text: this.oldRecord.text,
      };
      this.setState({ value });
    }
  }

  fetchData = () => {
    return this.Api.getFormData().then(result => {
      const categoryOptions = this.state.categoryOptions.concat(
        result.category.map(element => {
          // return <Option key={element._id} value={element._id}>{element.name}</Option>;
          return { label: element.name, value: element._id };
        }),
      );
      const tagOptions = this.state.tagOptions.concat(
        result.tag.map(element => {
          // return <Option key={element._id} value={element._id}>{element.name}</Option>;
          return { label: element.name, value: element._id };
        }),
      );
      this.setState({ categoryOptions, tagOptions });
    });
  };

  formChange = value => {
    this.setState({
      value,
    });
  };

  handleSubmit = () => {
    this.postForm.validateAll((errors, values) => {
      if (errors) {
        return false;
      }
      const postData = {
        action: this.type,
        data: values,
      };
      if (this.type === 'create') {
        this.Api.postResource(postData).then(result => {
          if (result) {
            hashHistory.push('post/list');
          }
        });
      } else if (this.type === 'edit') {
        postData.id = this.oldRecord._id;
        this.Api.putResource(postData).then(result => {
          if (result) {
            hashHistory.push('post/list');
          }
        });
      }
    });
  };

  render() {
    const { headTitle, categoryOptions, tagOptions, value } = this.state;
    return (
      <div className="content-editor">
        <IceFormBinderWrapper
          ref={refInstance => {
            this.postForm = refInstance;
          }}
          value={this.state.value}
          onChange={this.formChange}
        >
          <IceContainer>
            <h2 style={styles.title}>{headTitle}</h2>
            <Form labelAlign="top" style={styles.form}>
              <Row>
                <Col span="11">
                  <FormItem label="标题" required>
                    <IceFormBinder name="title" required message="标题必填">
                      <Input placeholder="这里填写文章标题" />
                    </IceFormBinder>
                    <IceFormError name="title" />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="11">
                  <FormItem label="分类" required>
                    <IceFormBinder
                      name="categoryLa"
                      required
                      message="分类必填"
                    >
                      <Select
                        style={styles.cats}
                        placeholder="请选择分类"
                        dataSource={categoryOptions}
                      />
                    </IceFormBinder>
                    <IceFormError name="categoryLa" />
                  </FormItem>
                </Col>
                <Col span="11" offset="2">
                  <FormItem label="标签" required>
                    <IceFormBinder
                      name="tags"
                      required
                      type="array"
                      message="标签必填支持多个"
                    >
                      <Select
                        style={styles.cats}
                        multiple
                        placeholder="请选择标签"
                        dataSource={tagOptions}
                      />
                    </IceFormBinder>
                    <IceFormError
                      name="tags"
                      render={errors => {
                        return (
                          <div>
                            <span style={{ color: 'red' }}>
                              {errors.map(item => item.message).join(',')}
                            </span>
                          </div>
                        );
                      }}
                    />
                  </FormItem>
                </Col>
              </Row>
              <FormItem label="描述">
                <IceFormBinder name="description">
                  <Input multiple placeholder="这里填写简单描述" />
                </IceFormBinder>
              </FormItem>
              <FormItem label="正文" required>
                <IceFormBinder name="text">
                  <RichEditor value={value.text} />
                </IceFormBinder>
              </FormItem>
              <FormItem label=" ">
                <Button type="primary" onClick={this.handleSubmit}>
                  发布文章
                </Button>
              </FormItem>
            </Form>
          </IceContainer>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0px 0px 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  form: {
    marginTop: 30,
  },
  cats: {
    width: '100%',
  },
};
