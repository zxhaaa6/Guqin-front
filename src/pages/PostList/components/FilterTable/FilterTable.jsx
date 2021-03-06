/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import { hashHistory } from 'react-router';
import IceContainer from '@icedesign/container';
import IceLabel from '@icedesign/label';
import FilterForm from './components/FilterForm';
import DeleteBalloon from './components/DeleteBalloon';
import Api from '../Api';

export default class FilterTable extends Component {
  static displayName = 'FilterTable';

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.Api = new Api();

    // 请求参数缓存
    this.queryCache = {};
    this.state = {
      tableData: {
        data: [],
        total: 0,
        pageSize: 10,
        currentPage: 1,
        pageCount: 1,
      },
      filterFormValue: {},
    };
  }

  componentDidMount() {
    this.queryCache.page = 1;
    this.fetchData();
  }

  fetchData = () => {
    this.Api.getAllResource(this.queryCache).then(result => {
      if (result) {
        this.setState({
          tableData: result,
        });
      } else {
        this.setState({
          tableData: {
            data: [],
            total: 0,
            pageSize: 10,
            currentPage: 1,
            pageCount: 1,
          },
        });
      }
    });
  };

  renderTitle = (value, index, record) => {
    return (
      <div style={styles.titleWrapper}>
        <span style={styles.title}>{record.title}</span>
      </div>
    );
  };

  editItem = (record, e) => {
    e.preventDefault();
    hashHistory.push({
      pathname: 'post/create',
      state: {
        type: 'edit',
        record,
      },
    });
  };

  deleteItem = (value, index, record) => {
    this.Api.deleteResource(record._id).then(result => {
      if (result) {
        const { tableData } = this.state;
        tableData.data.splice(index, 1);
        this.setState({
          tableData,
        });
      }
    });
  };

  renderOperations = (value, index, record) => {
    return (
      <div
        className="filter-table-operation"
        style={styles.filterTableOperation}
      >
        <a
          href="#"
          style={styles.operationItem}
          onClick={this.editItem.bind(this, record)}
        >
          编辑
        </a>
        <DeleteBalloon
          handleRemove={() => this.deleteItem(value, index, record)}
        />
      </div>
    );
  };

  renderStatus = value => {
    return (
      <IceLabel inverse={false} status="default">
        {value}
      </IceLabel>
    );
  };

  changePage = currentPage => {
    this.queryCache.page = currentPage;

    this.fetchData();
  };

  filterFormChange = value => {
    this.setState({
      filterFormValue: value,
    });
  };

  filterTable = () => {
    // 合并参数，请求数据
    this.queryCache.page = 1;
    this.queryCache = {
      ...this.queryCache,
      ...this.state.filterFormValue,
    };
    console.log(this.queryCache);
    this.fetchData();
  };

  resetFilter = () => {
    this.queryCache = {};
    this.setState(
      {
        filterFormValue: {},
      },
      () => {
        this.filterTable();
      },
    );
  };

  render() {
    // const tableData = this.props.bindingData.tableData;
    const { filterFormValue, tableData } = this.state;

    return (
      <div className="filter-table">
        <IceContainer title="内容筛选">
          <FilterForm
            value={filterFormValue}
            onChange={this.filterFormChange}
            onSubmit={this.filterTable}
            onReset={this.resetFilter}
          />
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={tableData.data}
            isLoading={tableData.__loading}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column title="标题" cell={this.renderTitle} width={320} />
            <Table.Column title="分类" dataIndex="categoryLaName" width={85} />
            <Table.Column
              title="标签"
              dataIndex="tags"
              width={85}
              cell={this.renderStatus}
            />
            <Table.Column title="作者" dataIndex="authorName" width={85} />
            <Table.Column
              title="发布/最后修改时间"
              dataIndex="dateModified"
              width={135}
            />
            <Table.Column
              title="操作"
              dataIndex="operation"
              width={135}
              cell={this.renderOperations}
            />
          </Table>
          <div style={styles.paginationWrapper}>
            <Pagination
              current={tableData.currentPage}
              pageSize={tableData.pageSize}
              total={tableData.total}
              onChange={this.changePage}
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  filterTableOperation: {
    lineHeight: '28px',
  },
  operationItem: {
    marginRight: '12px',
    textDecoration: 'none',
    color: '#5485F7',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginLeft: '10px',
    lineHeight: '20px',
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
