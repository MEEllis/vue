import React from 'react';
import {
  Row, Col, Form, Input, Select, Modal, message, Spin, Table, Icon
} from 'antd';
import { RangePicker } from 'react-component-date';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import '../less/commodityList.less';
import EditableCell from './EditableCell';
import FL from '../../../utils/FL';
import { A, Button } from '../../Auth/js/Auth';
import Icons, * as icons from '../../Icon/js/Icon';
import '../../CardType/less/cardType.less';
import '../../SearchForm/less/searchForm.less';

const createForm = Form.create;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const FormItem = Form.Item;
const warning = Modal.warning;

class CommodityList extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired
    }).isRequired,
    isfetching: PropTypes.bool,
    getProductlist: PropTypes.func.isRequired,
    getSubcategoryList: PropTypes.func.isRequired,
    deleteProductResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    batchDeleteProductResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    shelvedProductResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    unshelvedProductResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    updateProductNameResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    updateProductPriceResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
    getSubcategoryListResult: PropTypes.shape({
      dataSource: PropTypes.array.isRequired
    }),
    getProductlistResult: PropTypes.shape({
      dataSource: PropTypes.array.isRequired,
      TotalPages: PropTypes.number
    }),
    updateProductName: PropTypes.func.isRequired,
    updateProductPrice: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isfetching: true,
    deleteProductResult: undefined,
    batchDeleteProductResult: undefined,
    shelvedProductResult: undefined,
    unshelvedProductResult: undefined,
    updateProductNameResult: undefined,
    updateProductPriceResult: undefined,
    getSubcategoryListResult: [],
    getProductlistResult: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      commidityType: '',
      stockStatus: '',
      stockDock: '',
      commodityCategy: '',
      saleStatus: '',
      // modalVisible: false,
      expand: false,
      // 头部的Alink数据放此listForm
      RELOAD_SHELVEMULTIPLE: false,
      RELOAD_OFFSHELVEMULTIPLE: false,
      listForm: FL.LINK.COMMODITYLIST, // 展示顶部菜单
      searchList: FL.LINK.CommodityListterm,
      // listForm:FL.LINK.SUPTRANSACTION,
      selectProductId: [], // 表格前面多选框选中的记录
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
      selectedRowKeys: [],
      selectedRows: [],
      CategoryIdSource: [], // 商品分类从接口获取
    };
  }

  componentWillMount() {
    // 加载商品列表
    this.getCommodityList();
    // 加载商品类型
    this.props.getSubcategoryList({ parentId: '' });
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const {
      shelvedProductResult,
      unshelvedProductResult,
      deleteProductResult,
      batchDeleteProductResult,
      updateProductNameResult,
      updateProductPriceResult,
      getSubcategoryListResult,
      getProductlistResult
    } = nextProps;
    const {
      RELOAD_SHELVEMULTIPLE,
      RELOAD_OFFSHELVEMULTIPLE,
    } = this.state;
    // 获取商品分类
    if (getSubcategoryListResult !== props.getSubcategoryListResult) {
      this.setState({ CategoryIdSource: getSubcategoryListResult.dataSource });
    }
    if (deleteProductResult !== props.deleteProductResult) {
      if (deleteProductResult.Status === 200) {
        // 查询分页列表
        this.getCommodityList();
      }
    }
    if (batchDeleteProductResult !== props.batchDeleteProductResult) {
      if (batchDeleteProductResult.Status === 200) {
        // 查询分页列表
        this.getCommodityList();
      }
    }

    if (shelvedProductResult !== props.shelvedProductResult) {
      if (shelvedProductResult.Status === 200) {
        // 查询分页列表
        this.getCommodityList();
        this.setState({ RELOAD_SHELVEMULTIPLE: false });
      }
    }
    if (unshelvedProductResult !== props.unshelvedProductResult) {
      if (unshelvedProductResult.Status === 200) {
        // 查询分页列表
        this.getCommodityList();
        this.setState({ RELOAD_OFFSHELVEMULTIPLE: false });
      }
    }

    if (updateProductNameResult !== props.updateProductNameResult) {
      if (updateProductNameResult.Status === 200) {
        // 查询分页列表
        this.getCommodityList();
      }
    }
    if (updateProductPriceResult !== props.updateProductPriceResult) {
      if (updateProductPriceResult.Status === 200) {
        // 查询分页列表
        this.getCommodityList();
      }
    }

    // 重新对选择的列表数据赋值
    if (getProductlistResult !== props.getProductlistResult) {
      const productList = getProductlistResult.dataSource;
      this.setState({
        dataSource: productList
      });
      const selectedRows = this.state.selectedRows;
      for (let i = 0; i < productList.length; i += 1) {
        for (let j = 0; j < selectedRows.length; j += 1) {
          if (productList[i].Id === selectedRows[j].Id) {
            selectedRows[j] = productList[i];
          }
        }
      }
      this.setState({ selectedRows });
    }
  }
  onCellChange = () => {
    return (value) => { };
  }
  // 查询分页列表
  getCommodityList = () => {
    this.props.getProductlist({
      Id: this.state.Id,
      Name: this.state.Name,
      FaceValue: this.state.FaceValue,
      StockStatus: this.state.StockStatus,
      CategoryId: this.state.CategoryId, // 库存对接
      SaleStatus: this.state.SaleStatus,
      BeginTime: this.state.BeginTime,
      EndTime: this.state.EndTime,
      ProductType: this.state.ProductType,
      PageNumber: this.state.PageNumber, // 传递给后端
      PageSize: this.state.PageSize, // 传递给后端
    });
  }
  getDate = (date) => { // 更改date的格式
    if (date) return date.format('YYYY-MM-DD HH:mm:ss');
  }
  deleteCommodityGroup = (text, record) => {
    if (record.length > 1) {
      let i;
      let len;
      const deleteGroupArr = [];
      for (i = 0, len = record.length; i < len; i += 1) {
        if (record[i].SaleStatus === '已上架') {
          warning({ title: '您勾选的商品中含有已上架商品，请先下架再删除。' });
          return false;
        }
        deleteGroupArr[i] = record[i].Id;
      }
      const that = this;
      if (i === record.length) {
        confirm({
          title: '删除后，所选商品将无法恢复，确认删除吗？',
          onOk: () => {
            that.props.batchDeleteProduct({ ids: deleteGroupArr });
          }
        });
      }
    } else {
      this.deleteCommodity(text[0], record[0]);
    }
  }
  // 点击删除按钮，弹出确认框
  deleteCommodity = (text, record) => {
    const that = this;
    if (record.SaleStatus === '已上架') {
      warning({ title: '所选商品已上架，请先下架再删除。' });
    } else {
      confirm({
        title: '删除后，此商品将无法恢复，确认删除吗？',
        onOk: () => {
          that.props.deleteProduct({ Id: record.Id });
        }
      });
    }
  }
  handleSubmits = () => {
    const { props } = this;
    props.form.validateFields((err, value) => {
      if (err) {
        return;
      }
      let BeginTime = '';
      let EndTime = '';
      if (value.TradeTime) {
        BeginTime = value.TradeTime[0]
          ? this.getDate(value.TradeTime[0])
          : '';
        EndTime = value.TradeTime[1]
          ? this.getDate(value.TradeTime[1])
          : '';
      }
      this.setState({
        BeginTime,
        EndTime,
        Id: value.Id,
        Name: value.Name,
        FaceValue: value.FaceValue,
        CategoryId: value.commodityId,
        ProductType: value.ProductType,
        SaleStatus: value.SaleStatus,
        StockStatus: value.StockStatus,
        PageNumber: 1, // 传递给后端
      }, () => {
        // 加载商品列表
        this.getCommodityList();
      });
    });
  }
  handleShelved = (text, type) => {
    const { props } = this;
    props.shelvedProduct({ ids: text });
    if (type === 1) {
      this.setState({ RELOAD_SHELVEMULTIPLE: true });
    }
  }
  offShelved = (text, type) => {
    const { props } = this;
    confirm({
      title: '下架后，此商品将无法提供代理商进货，确认下架吗？',
      onOk: () => {
        props.unshelvedProduct({ ids: text });
        if (type === 1) {
          this.setState({ RELOAD_OFFSHELVEMULTIPLE: true });
        }
      }
    });
  }
  handleReset = () => {
    this.props.form.resetFields();
    this.setState({
      BeginTime: '',
      EndTime: '',
      Id: '',
      Name: '',
      FaceValue: '',
      CategoryId: '',
      SaleStatus: '',
      StockStatus: ''
    });
  }
  publishProduct = () => {
    browserHistory.push('/operation/commodity/add');
  }
  toggle = () => {
    const { expand } = this.state;
    this.setState({
      expand: !expand
    });
  }
  clickbtn = (ProductId) => {
    const query = {
      action: 'modify',
      pid: ProductId
    };
    browserHistory.push({ pathname: '/operation/commodity/add', query });
  }
  render() {
    const that = this;
    const { isfetching } = this.props;
    const { TotalPages } = this.props.getProductlistResult;
    const { dataSource } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = FL.FORMLAYOUT;
    const { listForm } = this.state;
    const columns = [
      {
        title: '商品',
        dataIndex: 'Name',
        width: 150,
        render: (text, record, index) => (
          <EditableCell
            updateProductName={this.props.updateProductName}
            isProductName
            value={text}
            Id={record.Id}
            onChange={this.onCellChange(index, 'name')}
          />)
      }, {
        title: '商品ID',
        dataIndex: 'Id'
      }, {
        title: '商品类型',
        dataIndex: 'ProductType'
      }, {
        title: '面值',
        dataIndex: 'FaceValue'
      }, {
        title: '售价',
        dataIndex: 'Price',
        render: (text, record, index) => (
          <EditableCell
            isProductPrice
            updateProductPrice={this.props.updateProductPrice}
            value={text}
            Id={record.Id}
            onChange={this.onCellChange(index, 'name')}
          />)
      }, {
        title: '库存状态',
        dataIndex: 'StockStatus',
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
        title: '销售状态',
        dataIndex: 'SaleStatus'
      }, {
        title: '平台审核状态',
        dataIndex: 'ProductStatus',
        render: (text) => {
          let productStatus = '';
          let color = '';
          switch (text) {
            case 1:
              productStatus = '未提交审核';
              color = '#FF6100';
              break;
            case 2:
              productStatus = '已提交审核';
              color = '#FF6100';
              break;
            case 3:
              productStatus = '审核已通过';
              color = 'green';
              break;
            case 4:
              productStatus = '审核已拒绝';
              color = 'red';
              break;
            default:

              break;
          }
          return <span style={{ color }}>{productStatus}</span>;
        }
      }, {
        title: '操作',
        dataIndex: 'Options',
        width: '140px',
        render: (text, record) => (<div>
          {record.SaleStatus === '已上架'
            ? <span
              style={{
                marginRight: 15
              }}
              className="iconp"
            >
              <A
                auth="commodityStatus"
                onClick={() => this.offShelved([record.Id], 2)}
                authOpts={{
                  hint: '下架'
                }}
              >
                <Icons glyph={icons.iUnshelve} />
              </A>
            </span>
            : <span
              className="iconp"
              style={{
                marginRight: 15
              }}
            >
              <A
                auth="commodityStatus"
                onClick={() => this.handleShelved([record.Id], 2)}
                authOpts={{
                  hint: '上架'
                }}
              >
                <Icons glyph={icons.iShelve} />
              </A>
            </span>
          }
          <span
            style={{
              marginRight: 15
            }}
            className="iconp"
          >
            <A
              auth="commodityAddOrEdit"
              onClick={() => this.clickbtn(record.Id)}
              authOpts={{
                hint: '修改'
              }}
            >
              <Icons glyph={icons.iEdit} />
            </A>
          </span>
          <span
            className="iconp"
            style={{
              marginRight: 15
            }}
          >
            <A
              auth="commodityDel"
              onClick={() => this.deleteCommodity(text, record)}
              authOpts={{
                hint: '删除'
              }}
            >
              <Icons glyph={icons.iDelete} />
            </A>
          </span>

        </div>)
      }
    ];
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange(selectedRowKeys, selectedRows) {
        const select = selectedRows.map(selectRow => (selectRow.Id));
        that.setState({ selectProductId: select, selectedRowKeys, selectedRows });
      }
    };
    const pagination = {
      total: TotalPages,
      showSizeChanger: true,
      pageSize: this.state.PageSize,
      current: this.state.PageNumber,
      onShowSizeChange: (current, pageSize) => {
        this.setState({ PageSize: pageSize, PageNumber: current }, () => {
          // 加载商品列表
          this.getCommodityList();
        });
      },
      onChange: (current, pageSize) => {
        this.setState({ PageSize: pageSize, PageNumber: current }, () => {
          // 加载商品列表
          this.getCommodityList();
        });
      }

    };
    // 搜索begin
    const Searchlist = this.state.searchList;

    const children = [];
    for (let i = 0; i < Searchlist.SearchText.length; i += 1) {
      switch (Searchlist.SearchText[i].type) {
        case '0':
          children.push(
            <Col span={8} key={i}>
              <FormItem {...formItemLayout} label={Searchlist.SearchText[i].title}>
                {getFieldDecorator(Searchlist.SearchText[i].ID, { initialValue: '' })(<Input type='text' size='default' />)}
              </FormItem>
            </Col>
          );
          break;
        case '1':
          let lists = '';
          if (Searchlist.SearchText[i].drpdowList === 'ProductType') {
            lists = listForm.productType;
          } else if (Searchlist.SearchText[i].drpdowList === 'StockStatus') {
            lists = listForm.stockStatus;
          } else if (Searchlist.SearchText[i].drpdowList === 'RelationType') {
            lists = listForm.stockDock;
          } else if (Searchlist.SearchText[i].drpdowList === 'commodityId') {
            lists = this.state.CategoryIdSource;
          } else {
            lists = listForm.saleStatus;
          }
          children.push(
            <Col span={8} key={i}>
              <FormItem {...formItemLayout} label={Searchlist.SearchText[i].title}>
                {getFieldDecorator(Searchlist.SearchText[i].ID, { initialValue: '' })(
                  <Select size="default">
                    {lists.map((list) => (
                      <Select.Option key={list.indexStatus} value={list.indexStatus}>{list.title}</Select.Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        case '2':
          children.push(
            <Col span={8} key={i}>
              <FormItem {...formItemLayout} label={Searchlist.SearchText[i].title}>
                {getFieldDecorator(Searchlist.SearchText[i].ID)(
                  <RangePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={[{ defaultValue: '00:00:00' }, { defaultValue: '23:59:59' }]}
                  />)}
              </FormItem>
            </Col>
          );
          break;
        default:
          return '';
      }
    }
    const expand = this.state.expand;
    const shownCount = expand
      ? children.length
      : 2;
    // 搜索end
    let hasSelected = false;
    if (selectedRowKeys !== []) {
      hasSelected = selectedRowKeys.length > 0;
    }
    return (
      <div>
        {/* <Spin spinning={isfetching == false
          ? false
          : true}> */}
        <Spin spinning={isfetching}>
          <div className="searchdiv">
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
              <Row gutter={40}>
                {children.slice(0, shownCount)}
              </Row>
              <Row>
                <Col
                  span={24}
                  style={{
                    textAlign: 'right'
                  }}
                >
                  <Button type="primary" htmlType="submit" onClick={this.handleSubmits}>搜索</Button>
                  <Button
                    style={{
                      marginLeft: 8
                    }}
                    onClick={this.handleReset}
                  >重置</Button>
                  <a
                    style={{
                      marginLeft: 8,
                      fontSize: 12
                    }}
                    onClick={this.toggle}
                  >
                    {expand
                      ? '收起'
                      : ''}更多条件
                    <Icon type={expand ? 'up' : 'down'} />
                  </a>
                </Col>
              </Row>
            </Form>
          </div>

          {/* 上下架 */}
          {<ButtonGroup className="tableOptions" > <Button
            auth="commodityStatus"
            type="primary"
            disabled={!hasSelected}
            authOpts={{
              hint: ''
            }}
            onClick={() => this.handleShelved(this.state.selectProductId, 1)}
          >
            上架</Button>
            <Button
              auth="commodityStatus"
              type="primary"
              disabled={
                !hasSelected
              }
              authOpts={{ hint: '', }}
              style={{ marginRight: 10 }}
              onClick={
                () => this.offShelved(this.state.selectProductId, 1)
              }
            > 下架 </Button>
          </ButtonGroup >
          }
          {
            <Button
              auth="commodityDel"
              type="primary"
              style={{ marginRight: 10 }}
              disabled={
                !hasSelected
              }
              authOpts={{ hint: '' }}
              onClick={
                () => this.deleteCommodityGroup(this.state.selectProductId, this.state.selectedRows)
              }
            >删除</Button>}

          {/* 发布商品 */}
          {<Button
            auth="commodityAddOrEdit"
            type="primary"
            authOpts={{ hint: '' }}
            onClick={
              this.publishProduct
            }
            style={{ marginRight: 10 }}
          >发布商品</Button>}
          <Table
            className="commodityTable"
            columns={columns}
            rowKey="Id"
            dataSource={dataSource || []}
            rowSelection={rowSelection}
            pagination={pagination}
            style={{
              marginTop: 10
            }}
          />
        </Spin>

      </div>
    );
  }
}

export default createForm()(CommodityList);
