import React from 'react';
import { Form, Modal, Spin, Table } from 'antd';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import FL from '../../../utils/FL';
import { A } from '../../Auth/js/Auth';
import Icon, * as icons from '../../Icon/js/Icon';
import '../../CardType/less/cardType.less';

const createForm = Form.create;


class ApiPrice extends React.Component {
  static propTypes = {
    isfetching: PropTypes.bool,
    getAllSecretPriceGroups: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
    getDetailsFromGroupId: PropTypes.func.isRequired,
    getAllSecretPriceGroupsResult: PropTypes.shape({
      dataSource: PropTypes.array.isRequired
    }),
    getSingleSecretPriceGroupsResult: PropTypes.shape({
      ProductCount: PropTypes.number.isRequired
    }),
    getDetailsFromGroupIdResult: PropTypes.shape({
      Status: PropTypes.number
    }),
  }
  static defaultProps = {
    isfetching: true,
    getSubcategoryListResult: [],
    getAllSecretPriceGroupsResult: [],
    getSingleSecretPriceGroupsResult: undefined,
    getProductListPriceGroupsResult: [],
    getDetailsFromGroupIdResult: []
  };
  constructor(props) {
    super(props);
    this.state = {
      CategoryIdSource: [],
      commidityType: '',
      modalVisible: false,
      searchVisible: false,
      setGroupVisible: false,
      modalSetSecretPriveVisible: false,
      modalSetSecretPriveVisibleContents: true,
      reload: true,

      // 获取商品列表查询条件
      postDataGetProductSecretPriceListByGroup: {
        condition: {
          Id: '', // 商品编号
          Name: '', // 商品名称
          ProductType: '', // 商品性质
          CategoryId: '', // 商品类型
          FaceValue: '', //  商品面值
          RelationType: '', // 库存对接
          SaleStatus: '', // 上下架
          StockStatus: '', // 库存状态
          BeginTime: '',
          EndTime: '',
          PageNumber: 1, // 传递给后端
          PageSize: FL.PAGESIZE, // 传递给后端
        }
      },
      // 按组给密价列表查询条件
      getAllSecretPriceGroups: {
        pageNumber: 1,
        pageSize: FL.PAGESIZE
      },
      // 已密价商品
      GetDetailsFromGroupId: {
        pageNumber: 1,
        pageSize: 5,
        GroupId: ''
      },
      columns: [{
        title: '密价组',
        dataIndex: 'Name'
      }, {
        title: '商品总数',
        dataIndex: 'AllProductCount'
      }, {
        title: '已密价商品',
        dataIndex: 'ProductCount',
        render: (text, record) =>
          (<a
            onClick={() => { this.showHasPriceSecretModal(record.Id); }}
          >{text}</a>)
      }, {
        title: '操作',
        render: (data) =>
          (<div>
            <A
              onClick={() => { this.settingsLists(data); }}
              auth="priceSet"
              authOpts={{ noAuthType: 'disabled', noAuthHint: '尚未开通该权限，请联系管理员', hint: '设置密价' }}
            >
              <Icon glyph={icons.shezhimijia} />
            </A>
          </div>)
      }],
      // 按组给密价列表
      dataSource: [],
      dataGetSingleSecretPriceGroup: {},
      // 已密价商品数据
      dataGetDetailsFromGroupId: [],
      // 已密价商品行
      columnsGetDetailsFromGroupId: [{
        title: '商品',
        dataIndex: 'Name',
        render: (data, record) => (
          <span>{record.Name}({record.Id})</span>
        )
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
          return (<span>{ProductType}</span>);
        }
      }, {
        title: '面值',
        dataIndex: 'FaceValue'
      }, {
        title: '售价',
        dataIndex: 'Price'
      }, {
        title: '密价',
        dataIndex: 'SecretPrice'
      }],
      // 设置密价弹出框数据
      dataSourceGetProductSecretPriceListByGroup: [],
      // 用户点击密价组的groupId
      GroupId: '',
      // 已密价商品弹框
      hasPriceSecretModal: false
    };
  }
  componentWillMount() {
    const { props } = this;
    const { getAllSecretPriceGroups } = this.state;
    props.getAllSecretPriceGroups(getAllSecretPriceGroups);
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const {
      getAllSecretPriceGroupsResult,
      getSingleSecretPriceGroupsResult,
      getDetailsFromGroupIdResult
    } = nextProps;
    // 获取按组给密价数据
    if (getAllSecretPriceGroupsResult !== props.getAllSecretPriceGroupsResult) {
      this.setState({
        dataSource: getAllSecretPriceGroupsResult.dataSource
      });
    }
    // 获取商品分类
    if (getSingleSecretPriceGroupsResult !== props.getSingleSecretPriceGroupsResult) {
      this.setState({
        dataGetSingleSecretPriceGroup: getSingleSecretPriceGroupsResult
      });
    }

    // 已密价商品
    if (getDetailsFromGroupIdResult !== props.getDetailsFromGroupIdResult) {
      this.setState({
        dataGetDetailsFromGroupId: getDetailsFromGroupIdResult.Data
      });
    }
  }
  onClose = () => {
    this.setState({
      setGroupVisible: false,
      hasPriceSecretModal: false
    });
  }
  setCommidityType = (newState) => {
    this.setState({
      commidityType: newState,
      searchVisible: !!newState
    });
  }
  // 点击设置密价获取密价信心
  settingsLists = (data) => {
    const query = {
      GroupId: data.Id
    };
    browserHistory.push({ pathname: '/supply/price/groupSearch', query });
  }
  setGroup = () => {
  }
  clearGroup = () => {
    this.props.getData(this.state.postDataGetAccountSecretPriceList);
    this.setState({ reload: true });
  }
  // 展示已密价商品
  showHasPriceSecretModal = (GroupId) => {
    const { GetDetailsFromGroupId } = this.state;
    GetDetailsFromGroupId.pageNumber = 1;
    GetDetailsFromGroupId.GroupId = GroupId;
    // 获取已密价商品
    this.props.getDetailsFromGroupId(
      GetDetailsFromGroupId
    );
    this.setState({
      hasPriceSecretModal: true,
      GetDetailsFromGroupId
    });
  }
  render() {
    const { props } = this;
    const { isfetching,
      getAllSecretPriceGroupsResult,
      getDetailsFromGroupIdResult
    } = props;
    const { getAllSecretPriceGroups,
      GetDetailsFromGroupId } = this.state;
    // 按组给密价的分页
    const getAllSecretPriceGroupsPagination = {
      total: getAllSecretPriceGroupsResult.total,
      showSizeChanger: true,
      current: getAllSecretPriceGroups.pageNumber,
      pageSize: getAllSecretPriceGroups.pageSize,
      onShowSizeChange: (current, pageSize) => {
        getAllSecretPriceGroups.pageSize = pageSize;
        getAllSecretPriceGroups.pageNumber = current;
        this.setState({ getAllSecretPriceGroups }, () => {
          // 查询设置密价弹出框
          this.props.getAllSecretPriceGroups(getAllSecretPriceGroups);
        });
      },
      onChange: (current, pageSize) => {
        getAllSecretPriceGroups.pageSize = pageSize;
        getAllSecretPriceGroups.pageNumber = current;
        this.setState({ getAllSecretPriceGroups }, () => {
          // 查询设置密价弹出框
          this.props.getAllSecretPriceGroups(getAllSecretPriceGroups);
        });
      }
    };
    // 已密价商品
    const getDetailsFromGroupIdPagination = {
      total: getDetailsFromGroupIdResult.Total,
      showSizeChanger: true,
      current: GetDetailsFromGroupId.pageNumber,
      pageSize: GetDetailsFromGroupId.pageSize,
      pageSizeOptions: [
        '3', '5'
      ],
      onShowSizeChange: (current, pageSize) => {
        GetDetailsFromGroupId.pageSize = pageSize;
        GetDetailsFromGroupId.pageNumber = current;
        this.setState({ GetDetailsFromGroupId }, () => {
          // 获取已密价商品
          this.props.getDetailsFromGroupId(
            GetDetailsFromGroupId
          );
        });
      },
      onChange: (current, pageSize) => {
        GetDetailsFromGroupId.pageSize = pageSize;
        GetDetailsFromGroupId.pageNumber = current;
        this.setState({ GetDetailsFromGroupId }, () => {
          // 获取已密价商品
          this.props.getDetailsFromGroupId(
            GetDetailsFromGroupId
          );
        });
      }
    };
    return (
      <div>
        <Spin spinning={isfetching}>
          <Modal
            width={600}
            onClose={this.onClose}
            title="已密价商品"
            visible={this.state.hasPriceSecretModal}
            footer={null}
          >
            <Spin spinning={isfetching}>
              <Table
                rowKey="Id"
                columns={this.state.columnsGetDetailsFromGroupId}
                dataSource={this.state.dataGetDetailsFromGroupId}
                pagination={getDetailsFromGroupIdPagination}
              />
            </Spin>
          </Modal>
          <Table
            rowKey="Id"
            columns={this.state.columns}
            dataSource={this.state.dataSource}
            pagination={getAllSecretPriceGroupsPagination}
          />

        </Spin>
      </div>
    );
  }
}

export default createForm()(ApiPrice);
