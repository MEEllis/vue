import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Modal, Spin, message, Table, Tabs } from 'antd';
import StockListAdd from '../../../containers/StockListAdd';   // 导入账号
import StockListUserLists from '../../../containers/StockListUserLists'; // 帐号列表
import StockListUpdata from '../../../containers/StockListUpdata'; // 库存 修改
import StockListZoneLists from '../../../containers/StockListZoneLists'; // 区域列表
import StockListImport from '../../../containers/StockListImport'; // 区域库存 导入
import StockListPackLists from '../../../containers/StockListPackLists'; // 库存包 导入
import StockListAddcardpwd from '../../../containers/StockListAddcardpwd'; // 导卡密
import StockListCardPwdLists from '../../../containers/StockListCardPwdLists'; // 卡密列表
import SearchLists from './SearchLists'; // 搜索列表
import Icon, * as icons from '../../Icon/js/Icon';
import '../../CardType/less/cardType.less';
import { A, Link } from '../../Auth/js/Auth';
import { dateFormat } from '../../../utils';

const createForm = Form.create;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;

class StockList extends React.Component {
  static propTypes = {
    isfetching: PropTypes.bool,
    getStockList: PropTypes.func.isRequired,
    deleteStockResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
  };

  static defaultProps = {
    isfetching: true,
    deleteStockResult: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      stockEdit: false,
      importStock: false,
      currentStock: {},
      current: 1,
      commidityType: '',
      stockStatus: '',
      stockDock: '',
      getListAccountPostData: {
        FaceValue: '',
        Name: '',
        PageNumber: 1,
        PageSize: 10,
        StockStatus: '',
        StockType: '',
        Nature: '',
        BeginTime: '',
        EndTime: '',
      },
      source: 'StockList',
      // 倒库存包模态窗
      stockPackList: false,
    };
  }
  componentWillMount() {
    const { props } = this;
    // 1、初始化渲染之前触发监听的异步 Action
    props.getStockList(this.state.getListAccountPostData);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.deleteStockResult !== nextProps.deleteStockResult &&
      nextProps.deleteStockResult.Status === 200) {
      this.props.getStockList(this.state.getListAccountPostData);
    }
  }
  // 点击删除按钮，弹出确认框
  deleteCommodity = (id) => {
    const { props } = this;
    confirm({
      title: '删除库存后，关联此库存的商品将无法正常销售，确认删除吗',
      onOk: () => {
        const postData = { Id: id };
        props.deleteStock(postData);
      },
    });
  }
  search = (value) => {
    const { props } = this;
    const { getListAccountPostData } = this.state;
    getListAccountPostData.PageNumber = 1;
    Object.assign(getListAccountPostData, value);
    this.setState({
      getListAccountPostData
    }, () => {
      props.getStockList(getListAccountPostData);
    });
    // this.setState({ current: 1 });
  }
  // 修改
  handleStockEdit = (stock) => {
    this.setState({ currentStock: stock, stockEdit: true });
  }
  // 新建卡密
  creactePwdCard = (pwdCard) => {
    this.setState({ currentPwdCard: pwdCard, stockPwdCard: true });
  }
  // 导库存包
  showStockPackListModal = (stockPackListInfo) => {
    this.setState({ currentStock: stockPackListInfo, stockPackList: true });
  }
  // 账号列表
  PrepaidCardList = (stock) => {
    this.setState({ currentStock: stock, stockPrepaidList: true });
  }
  // 导入账号
  ImportAccount = (stock) => {
    this.setState({ currentStock: stock, stockImportAccount: true, stockPrepaidList: false });
  }
  // 卡密列表
  pwdCardList = (stock) => {
    this.setState({ currentStock: stock, pwdCardList: true });
  }
  // 区域列表
  zoneListModal = (stock) => {
    this.setState({ currentStock: stock, zoneList: true });
  }
  // 导入库存
  ZoneImport = (stock) => {
    this.setState({ currentStock: stock, importStock: true });
  }

  // 隐藏子组件Modal
  hideStockPackListModal = () => { this.setState({ stockPackList: false }); }
  hidePwdCardModal = () => { this.setState({ stockPwdCard: false }); }
  hideUpdateModal = () => { this.setState({ stockEdit: false }); }
  hidePrepaidModal = () => { this.setState({ stockPrepaidList: false }); }
  hideImportModal = () => { this.setState({ stockImportAccount: false }); }
  hidePwdCardListModal = () => { this.setState({ pwdCardList: false }); }
  hideZoneListModal = () => { this.setState({ zoneList: false }); }
  hideZoneImportModal = () => { this.setState({ importStock: false }); }

  // 导入卡密后，新建直储账号后，刷新库存列表
  refreshStockList = () => {
    this.props.getStockList(this.state.getListAccountPostData);
  }
  render = () => {
    const { props } = this;
    const dataSource = props.getStockListResult.Data || [];
    // return false;
    const TotalRecords = props.getStockListResult.TotalRecords;
    const pagination = {
      total: TotalRecords,
      showSizeChanger: true,
      current: this.state.getListAccountPostData.PageNumber,
      onShowSizeChange: (current, pageSize) => {
        const { getListAccountPostData } = this.state;
        getListAccountPostData.PageSize = pageSize;
        getListAccountPostData.PageNumber = current;
        this.setState({
          getListAccountPostData
        }, () => {
          props.getStockList(getListAccountPostData);
        });
      },
      onChange: (current) => {
        const { getListAccountPostData } = this.state;
        getListAccountPostData.PageNumber = current;
        this.setState({
          getListAccountPostData
        }, () => {
          props.getStockList(getListAccountPostData);
        });
      },
    };
    const columns = [
      {
        title: '库存名称',
        dataIndex: 'stockName'
      }, {
        title: '创建时间',
        dataIndex: 'CreateTime',
        render: (text) => (dateFormat(text))
      }, {
        title: '库存面值',
        dataIndex: 'FaceValue',
        render: (text, record) => {
          let FaceValue = '';
          if (record.Nature === 2) {
            FaceValue = '组合面值';
          } else {
            FaceValue = text;
          }
          return FaceValue;
        }
      }, {
        title: '类型/性质',
        dataIndex: 'TypeAndNature'
      }, {
        title: '库存数量',
        render: (data) => {
          if (data.Nature === 1) {
            return (<div>{data.StockCount}</div>);
          } else if (data.Nature === 2) {
            return (
              <div>
                <span>{data.RelationStockNumber}个</span> + <span>{data.StockCount}张</span>
              </div>
            );
          } else if (data.Nature === 3) {
            return (
              <div>
                <span>{data.RelationStockNumber}区</span> + <span>{data.StockCount}账号</span>
              </div>
            );
          }
        }
      }, {
        title: '报警量',
        dataIndex: 'WarningCount'
      }, {
        title: '状态',
        dataIndex: 'Status',
        render: (text) => {
          let color = '';
          switch (text) {
            case '警报':
              color = '#FF6100';
              break;
            case '充足':
              color = 'green';
              break;
            case '断货':
              color = 'red';
              break;
            default:
              break;
          }
          return <span style={{ color }}>{text}</span>;
        }
      }, {
        title: '操作',
        width: 130,
        fixed: 'right',
        render: (data) =>
          (
            <div>
              {data.Nature === 1 && data.StockType === 2 &&
                <span>
                  <span className={'mr15'}>
                    {/* 库存列表 导入账号*/}
                    <A
                      auth="stockImportAccount"
                      authOpts={{ hint: '导入帐号' }}
                      onClick={() => { this.ImportAccount(data); }}
                    >
                      <Icon glyph={icons.daozhanghao} />
                    </A>
                  </span>
                  <span className={'mr15'}>
                    {/* 库存列表 帐号列表 */}
                    <A
                      auth="stockAccountList"
                      authOpts={{ hint: '帐号列表' }}
                      onClick={() => { this.PrepaidCardList(data); }}
                    >
                      <Icon glyph={icons.iViewList} />
                    </A>
                  </span>
                </span>
              }
              {data.Nature === 1 && data.StockType === 1 &&
                <span>
                  <span className={'mr15'} >
                    {/* 新建卡密 */}
                    <A
                      auth="stockImportCards"
                      authOpts={{ hint: '导卡密' }}
                      onClick={() => { this.creactePwdCard(data); }}
                    >
                      <Icon glyph={icons.daokami} />
                    </A>
                  </span>
                  <span style={{ paddingRight: '15px' }}>
                    {/* 卡密列表 */}
                    <A
                      auth="stockCardList"
                      authOpts={{ hint: '卡密列表' }}
                      onClick={() => { this.pwdCardList(data); }}
                    >
                      <Icon glyph={icons.kamiliebiao} />
                    </A>
                  </span>
                </span>
              }

              {data.Nature === 2 &&
                <span className={'mr15'}>
                  <A
                    auth="stockImportPackage"
                    authOpts={{ hint: '导库存包' }}
                    onClick={() => { this.showStockPackListModal(data); }}
                  >
                    <Icon glyph={icons.iImport} />
                  </A>
                </span>
              }

              {data.Nature === 3 &&
                <span>
                  <span className={'mr15'} >
                    {/* 区域库存  导入库存 */}
                    <A
                      auth="stockImportStock"
                      authOpts={{ hint: '导入库存' }}
                      onClick={() => { this.ZoneImport(data); }}
                    >
                      <Icon glyph={icons.iImport} />
                    </A>
                  </span>
                  <span className={'mr15'} >
                    {/* 区域库存  区域列表 */}
                    <A
                      auth="stockAreaList"
                      authOpts={{ hint: '区域列表' }}
                      onClick={() => { this.zoneListModal(data); }}
                    >
                      <Icon glyph={icons.iViewList} />
                    </A>
                  </span>
                </span>
              }
              <span className={'mr15'} >
                {/* 修改库存信息 */}
                <A
                  auth="stockAddOrEdit"
                  authOpts={{ hint: '修改' }}
                  onClick={() => { this.handleStockEdit(data); }}
                >
                  <Icon glyph={icons.iEdit} />
                </A>
              </span>
              {/* 删除库存 ，渲染次数有问题*/}
              <A auth="stockDel" authOpts={{ hint: '删除' }} onClick={() => { this.deleteCommodity(data.Id); }} >
                <Icon glyph={icons.iDelete} />
              </A>
            </div>
          )
      }
    ];
    const {
      stockEdit,
      currentStock,
      stockPwdCard,
      currentPwdCard,
      stockPackList,
      stockPrepaidList,
      stockImportAccount,
      pwdCardList,
      zoneList,
      importStock,
    } = this.state;
    return (
      <div>
        {/* 修改 */}
        {stockEdit &&
          <StockListUpdata
            change={() => { this.props.getStockList(this.state.getListAccountPostData); }}
            hideUpdateModal={this.hideUpdateModal}
            currentStock={currentStock}
          />
        }
        {/* 导卡密 */}
        {stockPwdCard &&
          <StockListAddcardpwd
            hidePwdCardModal={this.hidePwdCardModal}
            currentStock={currentPwdCard}
            refreshStockList={this.refreshStockList}
          />
        }
        {/* 导库存包 */}
        {stockPackList &&
          <StockListPackLists
            search={this.search}
            currentStock={currentStock}
            hideStockPackListModal={this.hideStockPackListModal}
          />
        }
        {/* 账号列表 */}
        {stockPrepaidList &&
          <StockListUserLists
            stock={currentStock}
            ImportAccount={this.ImportAccount}
            hidePrepaidModal={this.hidePrepaidModal}
          />
        }
        {/* 导入账号 */}
        {stockImportAccount &&
          <StockListAdd
            stock={currentStock}
            hideImportModal={this.hideImportModal}
            refreshStockList={this.refreshStockList}
          />
        }
        {/* 卡密列表 */}
        {pwdCardList &&
          <StockListCardPwdLists
            stock={currentStock}
            hidePwdCardListModal={this.hidePwdCardListModal}
          />
        }
        {/* 区域列表 */}
        {zoneList &&
          <StockListZoneLists
            search={this.search}
            stock={currentStock}
            hideZoneListModal={this.hideZoneListModal}
          />
        }
        {/* 区域列表 导入库存 */}
        {importStock &&
          <StockListImport
            search={this.search}
            stock={currentStock}
            hideZoneImportModal={this.hideZoneImportModal}
          />
        }

        <Spin spinning={this.props.isfetching}>
          <div className="searchdiv">
            <SearchLists change={(value) => { this.search(value); }} />
          </div>
          <ButtonGroup className="tableOptions" >
            <Link
              auth="stockAddOrEdit"
              to="/operation/stock/add"
              style={{ lineHeight: '28px' }}
              className="ant-btn ant-btn-primary"
              authOpts={{ hint: '新增库存', }}
            >
              新增库存
            </Link>
          </ButtonGroup>
          <Tabs
            defaultActiveKey=""
            animated={false}
            onChange={(key) => {
              const { getListAccountPostData } = this.state;
              getListAccountPostData.PageNumber = 1;
              getListAccountPostData.nature = key;
              this.setState({
                getListAccountPostData
              }, () => {
                props.getStockList(getListAccountPostData);
              });
            }}
          >
            <TabPane tab="全部" key="" />
            <TabPane tab="普通库存" key="1" />
            <TabPane tab="库存包" key="2" />
            <TabPane tab="区域库存" key="3" />
          </Tabs>
          <Table columns={columns} dataSource={dataSource || []} pagination={pagination} />
        </Spin>
      </div>
    );
  }
}

export default createForm()(StockList);
