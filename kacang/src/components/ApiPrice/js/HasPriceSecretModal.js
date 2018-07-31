
import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Spin,
  Modal
} from 'antd';
import SearchFrom from '../../SearchForm';

class HasPriceSecretModal extends React.Component {
  static propTypes = {
    getDetailsFromGroupId: PropTypes.func.isRequired,
    hasPriceSecretGroupId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    isfetching: PropTypes.bool,
    getDetailsFromGroupIdResult: PropTypes.shape({
      dataSource: PropTypes.array.isRequired
    }),
  }
  state = {
    // 已密价商品
    getDetailsFromGroupId: {
      ProductName: '',
      ProductId: ''
    },
    groupId: this.props.hasPriceSecretGroupId,
    pageNumber: 1,
    pageSize: 5,
    total: 0,
    // 已密价商品数据
    dataGetDetailsFromGroupId: [],
    // 已密价商品行
    columnsGetDetailsFromGroupId: [{
      title: '商品',
      dataIndex: 'Name',
      render: (data, record) => {
        return <span>{record.Name}({record.Id})</span>;
      }
    }, {
      title: '商品类型',
      dataIndex: 'ProductType',
      render: (data) => {
        let ProductType = '';
        switch (data) {
          case 1:
            ProductType = '卡密';
            break;
          case 2:
            ProductType = '卡密直储';
            break;
          case 4:
            ProductType = '在线直储';
            break;
          default:
            ProductType = '';
            break;
        }
        return <span>{ProductType}</span>;
      }
    }, {
      title: '所属密价组',
      dataIndex: 'GroupName'
    }, {
      title: '面值',
      width: '50',
      dataIndex: 'FaceValue'
    }, {
      title: '售价',
      width: '50',
      dataIndex: 'Price'
    }, {
      title: '密价',
      width: '50',
      dataIndex: 'SecretPrice'
    }, {
      title: '对接库存名称(编号)',
      dataIndex: 'AssociateName',
      render: (data, record) => {
        return <span>{record.AssociateName}({record.AssociateId})</span>;
      }
    }, {
      title: '库存状态',
      dataIndex: 'StockStatus',
      render: (data) => {
        let color = '';
        let text = '';
        switch (data) {
          case 1:
            color = 'red';
            text = '断货';
            break;
          case 2:
            color = '#FF6100';
            text = '警报';
            break;
          case 3:
            color = 'green';
            text = '充足';
            break;
          default:
            break;
        }
        return <span style={{ color }}>{text}</span>;
      }
    }],
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const {
     getDetailsFromGroupIdResult
     } = nextProps;
    if (props.getDetailsFromGroupIdResult !== getDetailsFromGroupIdResult) {
      this.setState({
        dataGetDetailsFromGroupId: getDetailsFromGroupIdResult.Data,
        total: getDetailsFromGroupIdResult.Total
      });
    }
  }
  getData = () => {
    const { pageNumber, pageSize, groupId } = this.state;
    this.props.getDetailsFromGroupId({
      pageNumber,
      pageSize,
      groupId,
      ...this.state.condition,
    });
  }
  init = (values) => {
    this.setState({ condition: values }, () => { this.getData(); });
  }
  search = (err, values) => {
    if (err) return false;
    this.setState({ condition: values, pageNumber: 1 }, () => { this.getData(); });
  }
  render() {
    const { getDetailsFromGroupId, total, pageNumber, pageSize } = this.state;
    const { isfetching } = this.props;
    // 已密价商品
    const getDetailsFromGroupIdPagination = {
      total,
      showSizeChanger: true,
      current: pageNumber,
      pageSize,
      pageSizeOptions: [
        '3', '5'
      ],
      onShowSizeChange: (current, pageSize) => {
        this.setState({ pageSize, pageNumber: current }, () => {
          this.getData();
        });
      },
      onChange: (current) => {
        this.setState({ pageNumber: current }, () => {
          this.getData();
        });
      }
    };
    return (
      <Modal
        width={950}
        visible
        onClose={this.props.onClose}
        title="已密价商品"
        footer={null}
      >
        <Spin spinning={isfetching}>
          <SearchFrom name="HasPriceSecretList" init={this.init} search={this.search} onChange={this.onChange} />

          <Table rowKey="Id" columns={this.state.columnsGetDetailsFromGroupId} dataSource={this.state.dataGetDetailsFromGroupId} pagination={getDetailsFromGroupIdPagination} />
        </Spin>
      </Modal>
    );
  }
}

export default HasPriceSecretModal;
