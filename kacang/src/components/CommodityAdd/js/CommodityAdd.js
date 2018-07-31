import React from 'react'
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Radio,
  DatePicker,
  Modal,
  Cascader,
  Checkbox,
  Table,
  Steps,
  message,
  Icon,
  InputNumber,
  Spin
} from 'antd';
import { browserHistory } from 'react-router';
import QueueAnim from 'rc-queue-anim'
import Filter, { FilterItem } from '../../Filter/js/Filter';
import SotckConnectTemplate from '../js/SotckConnectTemplate';
import ChooseTemplate from '../js/ChooseTemplate';
import '../less/commodityAdd'
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;
const Step = Steps.Step;
const CheckboxGroup = Checkbox.Group;
// 关联库存----step3

//组合商品
class CommodityAdd extends React.Component {
  constructor(props) {
    super(props);
    //如果是修改
    if (this.props.location.query['action'] == 'modify') {
      this.state = {
        current: 0, //控制step的当前值
        listItemOne: false,
        listItemTwo: false,
        listItemThree: false,
        listItemFour: false, //控制list4是否显示
        nextBtnOne: false, //控制next按钮1是否显示
        listOneChecked: '', //控制‘选择商品分类’列表1中，当点击时，显示的效果
        listTwoChecked: '', //控制‘选择商品分类’列表2中，当点击时，显示的效果
        listThreeChecked: '', //控制‘选择商品分类’列表3中，当点击时，显示的效果
        listFourChecked: '', //控制‘选择商品分类’列表4中，当点击时，显示的效果
        //第一组
        CategoryCode: '', //传递给后端的参数
        ProductType: '', //传递给后端的参数 -- 设置商品类型
        CategoryId: '', //传递给后端的参数 -- 设置分类
        // 第二组
        // AssociateName:'',  //库存名称
        Name: '', //传递给后端的参数 -- 设置商品名称
        FaceValue: '', //传递给后端的参数  --商品面值
        Price: '', //销售价
        TemplateId: '', // 充值模板ID
        TemplateName: '', // 充值模板Name
        clickTemplateInfo: { // 选择点击确定
          TemplateId: '',
          TemplateName: ''
        },
        SaleStatus: '', // 上下架
        Topupchannel: [], // 传递给后端的参数 -- 设置销售通道
        Content: '', // 传递给后端的参数 -- 设置详情描述
        ProductRelations: [], // 关联库存 --模板数据
        IsReview: true, // 是否需要审核
        TopupMethod: '', // 充值方式
        flag: 0, // 0修改，1新增
        //RelationCtg:'',  //==CategoryId
        RelationList: [],
        refresh: false,
        chargeType4: '',
        chargeType8: '',
        relationflag: false,
        listItemOneData: {
          dataSource: []
        },
        listItemTwoData: {
          dataSource: []
        },
        listItemThreeData: {
          dataSource: []
        },
        listItemFourData: {
          dataSource: []
        },
        // 选择充值模板
        chooiceRechargeTemplateVisible: false,
        // 保存用户选择的充值模板
        chooiceRechargeTemplateList: [],
        // 选择充值模板传递参数
        data: {
          pageNumber: 1, // 传递给后端
          pageSize: 5, // 传递给后端
          templateName: null, // 模板名
          businessName: null, // 运营商
        },
        pageSize: 5,
        // 商品名称
        allCommodityGroupName: '',
        // 第一层placeData
        placeAllData: [],
        // 未发布商品弹出框
        noBuildVisible: false,
        lookTemplateId: '',
        // 关联库存弹框
        stockConnectTemplateVisible: false,
        // 选择模板弹框
        chooceTemplateVisible: false
      }
    } else {
      this.state = {
        current: 0, //控制step的当前值
        listItemOne: false,
        listItemTwo: false,
        listItemThree: false,
        listItemFour: false, //控制list4是否显示
        nextBtnOne: false, //控制next按钮1是否显示
        listOneChecked: '', //控制‘选择商品分类’列表1中，当点击时，显示的效果
        listTwoChecked: '', //控制‘选择商品分类’列表2中，当点击时，显示的效果
        listThreeChecked: '', //控制‘选择商品分类’列表3中，当点击时，显示的效果
        listFourChecked: '', //控制‘选择商品分类’列表4中，当点击时，显示的效果
        //第一组
        CategoryCode: '', //传递给后端的参数
        ProductType: '', //传递给后端的参数 -- 设置商品类型
        CategoryId: '', //传递给后端的参数 -- 设置分类
        // 第二组
        // AssociateName:'',  //库存名称
        Name: '', //传递给后端的参数 -- 设置商品名称
        FaceValue: '', //传递给后端的参数  --商品面值
        Price: '', //销售价
        TemplateId: '', // 充值模板ID
        TemplateName: '', // 充值模板Name
        clickTemplateInfo: { // 选择点击确定
          TemplateId: '',
          TemplateName: ''
        },
        SelectedRows: [], // 用户选择的充值模板数据
        SaleStatus: '', //上下架
        Topupchannel: [], //传递给后端的参数 -- 设置销售通道
        Content: '', //传递给后端的参数 -- 设置详情描述
        ProductRelations: [], //关联库存 --模板数据
        IsReview: true, // 是否需要审核
        SaleNumber: '', //不知道是干嘛的，可能以前有用到，后面删了
        TopupMethod: '', //充值方式
        flag: 1,
        //RelationCtg:'',
        RelationList: [],
        refresh: false,
        chargeType4: '',
        chargeType8: '',
        listItemOneData: {
          dataSource: []
        },
        listItemTwoData: {
          dataSource: []
        },
        listItemThreeData: {
          dataSource: []
        },
        listItemFourData: {
          dataSource: []
        },
        //选择充值模板
        chooiceRechargeTemplateVisible: false,
        //保存用户选择的充值模板
        chooiceRechargeTemplateList: [],
        //选择充值模板传递参数
        data: {
          pageNumber: 1, // 传递给后端
          pageSize: 5, // 传递给后端
          templateName: null, // 模板名
          businessName: null, // 运营商
        },
        pageSize: 5,
        // 商品名称
        allCommodityGroupName: '',
        noBuildVisible: false,
        lookTemplateId: '',
        showBottomInfo: false,
        // 关联库存弹框
        stockConnectTemplateVisible: false,
        // 选择模板弹框
        chooceTemplateVisible: false
      }
    }
  }

  componentWillMount() {
    const { props } = this;
    if (this.props.location.query['action'] == 'modify') {
      const current = this.state.current + 1;
      this.setState({ current });

      const pid = props.location.query['pid']
      props.getProductdetail({ Id: pid })
      // if (this.state.ProductRelations.length == 0) {
      //   props.getProductRelation({pid: props.location.query['pid']})
      // }
    } else {
      props.getSubcategoryList({ parentId: '' })
    }
  }
  componentWillReceiveProps(nextProps) {
    //     const {props} = this;
    const { props } = this;
    const {
      getProductdetailResult,
      getSubcategoryListResult,
      getSubcategoryListTwoResult,
      getSubcategoryListThreeResult,
      getSubcategoryListFourResult,
      getParentCategoriesResult,
      createProductResult,
      updateProductResult,
      getSingTemplateResult
    } = nextProps;
    if (getSubcategoryListResult !== props.getSubcategoryListResult) {
      this.setState({ listItemOneData: getSubcategoryListResult })
    }
    if (getSubcategoryListTwoResult !== props.getSubcategoryListTwoResult) {
      this.setState({ listItemTwoData: getSubcategoryListTwoResult })
    }
    if (getSubcategoryListThreeResult !== props.getSubcategoryListThreeResult) {
      this.setState({ listItemThreeData: getSubcategoryListThreeResult })
    }
    if (getSubcategoryListFourResult !== props.getSubcategoryListFourResult) {
      this.setState({ listItemFourData: getSubcategoryListFourResult })
    }
    let clickTemplateInfo = this.state.clickTemplateInfo;
    if (getProductdetailResult !== props.getProductdetailResult && this.props.location.query['action'] == 'modify') {

      clickTemplateInfo.TemplateId = getProductdetailResult.Data.TemplateId;
      this.setState({
        Name: getProductdetailResult.Data.Name,
        FaceValue: getProductdetailResult.Data.FaceValue,
        Price: getProductdetailResult.Data.Price,
        ProductType: getProductdetailResult.Data.ProductType,
        SaleStatus: getProductdetailResult.Data.SaleStatus,
        // shelvesSelect :props.getSingleproduct.,
        Content: getProductdetailResult.Data.Content,
        CategoryId: getProductdetailResult.Data.CategoryId,
        ProductRelations: getProductdetailResult.Data.Relations,
        IsReview: getProductdetailResult.Data.IsReview,
        clickTemplateInfo,
        TopupMethod: getProductdetailResult.Data.TopupMethod
      })
      if (getProductdetailResult.Data.TemplateId !== '') {
        this.props.getSingTemplate({ Id: getProductdetailResult.Data.TemplateId });

      }
    }
    if (getSingTemplateResult != props.getSingTemplateResult) {
      clickTemplateInfo.TemplateName = getSingTemplateResult.Data.Name;
    }
    if (getParentCategoriesResult !== props.getParentCategoriesResult) {
      this.setState({ RelationList: getParentCategoriesResult });
    }

    if (createProductResult !== props.createProductResult) {
      if (createProductResult.Status === 200) {
        setTimeout(function () {
          browserHistory.push({ pathname: '/operation/commodity' });
        }, 5000)
      }
    }
    if (updateProductResult !== props.updateProductResult) {
      if (updateProductResult.Status === 200) {
        setTimeout(function () {
          browserHistory.push({ pathname: '/operation/commodity' });
        }, 5000)
      }
    }
  }
  componentDidUpdate() { }

  next() {
    //下一步按钮
    const { props } = this
    if (this.props.location.query['action'] != 'modify') {
      if (!this.state.nextBtnOne) {
        message.info('请选择价格');
        return;
      }
    }
    const current = this.state.current + 1;
    this.setState({ current });

  }
  nextStepTwo() {
    this.props.form.validateFields((err, values) => {
      this.props.form.validateFields((err, value) => {
        if (err) {
          return;
        }
        const current = this.state.current + 1;
        this.setState({ current });

      })
    });
  }
  prev() {
    //上一步按钮
    const { props } = this
    if (this.props.location.query['action'] == 'modify') {
      if (this.state.CategoryId != '') {
        props.getParentCategories({ Id: this.state.CategoryId })
        this.setState({ refresh: false })
      }
    }
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleSubmit() {
    const { props } = this;
    props.form.validateFields((err, value) => {
      if (err) {
        return;
      }

      let CommodityName = value.CommodityName; //商品名称
      let CommodityValue = value.CommodityValue; //商品面值
      let purchasePrice = value.purchasePrice; //销售价
      let topupchannel = ''; //销售通道
      let shelvesSelect = value.shelvesSelect; //上下架
      let remark = value.remark;
      let ProductType = this.state.ProductType;
      let CategoryId = this.state.CategoryId;
      let TopupMethod = value.chargeType4;
      let isReview = value.isReview === '1'
        ? true
        : false;
      if (this.state.ProductRelations.length <= 0) {
        message.info('请选择关联库存模板！');
        return;
      }
      // 如果商品不是卡密
      if (ProductType !== 1 && ProductType !== '1') {
        if (this.state.clickTemplateInfo.TemplateId === '') {
          message.info('请选择模板！');
          return;
        }
      }
      let relations = [
        {
          associateId: this.state.ProductRelations[0].AssociateId
            ? this.state.ProductRelations[0].AssociateId
            : this.state.ProductRelations[0].Id,
          relationType: 1,
          sort: 1
        }
      ];
      // 修改
      if (this.state.flag == 0) {
        props.updateProduct({
          id: props.location.query['pid'], name: CommodityName, Price: purchasePrice, saleStatus: shelvesSelect, //上下架
          content: remark, //详情描述
          productType: ProductType,
          categoryId: CategoryId,
          relations: relations,
          topupMethod: TopupMethod, // 官方充值还是自己充值
          isReview: isReview, // 是否需要审核 true 需要 false 不需要
          templateId: this.state.clickTemplateInfo.TemplateId
        });

      } else {
        // 新建商品
        props.createProduct({
          name: CommodityName, FaceValue: CommodityValue, Price: purchasePrice, saleStatus: shelvesSelect, //上下架
          content: remark, //详情描述
          productType: ProductType,
          categoryId: CategoryId,
          relations: relations,
          topupMethod: TopupMethod, // 官方充值还是自己充值
          isReview: isReview, // 是否需要审核 true 需要 false 不需要
          templateId: this.state.clickTemplateInfo.TemplateId
        })
      }
    })
  }
  // 取消
  cancelCommodity = () => {
    browserHistory.push({ pathname: '/operation/commodity' });
  }
  // 点击列表1
  listOneClicked = (id) => {
    this.props.getSubcategoryListTwo({ parentId: id });
    this.setState({ listItemFour: false, listItemThree: false, listOneChecked: id, nextBtnOne: false })
  }
  // 点击列表2
  listTwoClicked = (id) => {
    this.props.getSubcategoryListThree({ parentId: id })
    this.setState({ listItemFour: false, listItemThree: true, listTwoChecked: id, nextBtnOne: false })
  }
  // 点击列表3
  listThreeClicked = (id) => {
    this.props.getSubcategoryListFour({ parentId: id })
    this.setState({ listItemFour: true, listThreeChecked: id, nextBtnOne: false })
  }
  //list 4
  listFourClicked = (id, CategoryCode, FaceValue, item) => {
    this.setState({ listItemFour: true, listFourChecked: id, FaceValue, CategoryId: id, nextBtnOne: true });
    let self = this;
    setTimeout(function () {
      self.next();
    }, 10);
  }
  setProductType = (ProductArr) => { //设置关联库存的数组值
    this.setState({ ProductRelations: ProductArr })
  }
  handleChange = (value) => {
    // 如果改变了商品类型为卡密值储
    if (value === '1') {
      let clickTemplateInfo = this.state.clickTemplateInfo;
      clickTemplateInfo.TemplateId = '';
      clickTemplateInfo.TemplateName = '';
      this.setState({ clickTemplateInfo, TopupMethod: '' });
    }
    this.setState({ ProductType: value, showBottomInfo: true });
  }
  listOneInputChange = (e) => {
    const { getSubcategoryListResult } = this.props;
    let itemLists = [];
    for (let k in getSubcategoryListResult.dataSource) {
      if (getSubcategoryListResult.dataSource[k].Name.indexOf(e.target.value) >= 0) {
        itemLists.push(getSubcategoryListResult.dataSource[k]);
      }
    }
    if (e.target.value.length > 0) {
      this.setState({
        listItemOneData: {
          dataSource: itemLists
        }
      });
    } else {
      this.setState({ listItemOneData: getSubcategoryListResult });
    }
  }
  listTwoInputChange = (e) => {
    const { getSubcategoryListTwoResult } = this.props;
    let itemLists = [];
    for (let k in getSubcategoryListTwoResult.dataSource) {
      if (getSubcategoryListTwoResult.dataSource[k].Name.indexOf(e.target.value) >= 0) {
        itemLists.push(getSubcategoryListTwoResult.dataSource[k]);
      }
    }
    if (e.target.value.length > 0) {
      this.setState({
        listItemTwoData: {
          dataSource: itemLists
        }
      });
    } else {
      this.setState({ listItemTwoData: getSubcategoryListTwoResult });
    }
  }
  listThreeInputChange = (e) => {
    const { getSubcategoryListThreeResult } = this.props;
    let itemLists = [];
    for (let k in getSubcategoryListThreeResult.dataSource) {
      if (getSubcategoryListThreeResult.dataSource[k].Name.indexOf(e.target.value) >= 0) {
        itemLists.push(getSubcategoryListThreeResult.dataSource[k]);
      }
    }
    if (e.target.value.length > 0) {
      this.setState({
        listItemThreeData: {
          dataSource: itemLists
        }
      });
    } else {
      this.setState({ listItemThreeData: getSubcategoryListThreeResult });
    }
  }
  listFourInputChange = (e) => {
    const { getSubcategoryListFourResult } = this.props;
    let itemLists = [];
    for (let k in getSubcategoryListFourResult.dataSource) {
      if (getSubcategoryListFourResult.dataSource[k].Name.indexOf(e.target.value) >= 0) {
        itemLists.push(getSubcategoryListFourResult.dataSource[k]);
      }
    }
    if (e.target.value.length > 0) {
      this.setState({
        listItemFourData: {
          dataSource: itemLists
        }
      });
    } else {
      this.setState({ listItemFourData: getSubcategoryListFourResult });
    }
  }
  // 关联库存模态窗
  stockConnectTemplate = () => {
    this.setState({ stockConnectTemplateVisible: true });
  }
  // 隐藏关联库存模态窗
  hideStockConnectTemplate = () => {
    this.setState({ stockConnectTemplateVisible: false });
  }
  // 获取用户选择的关联库存数据
  getStockConnectInfo = (row) => {
    this.setState({ ProductRelations: row });
  }

  // 选择模板弹窗
  chooseTemplate = () => {
    this.setState({ chooceTemplateVisible: true });
  }
  // 隐藏关联库存模态窗
  hideChooseTemplate = () => {
    this.setState({ chooceTemplateVisible: false });
  }
  // 获取用户选择的模板数据
  getChooseTemplateInfo = (row) => {
    let clickTemplateInfo = this.state.clickTemplateInfo;
    clickTemplateInfo.TemplateId = row[0].Id;
    clickTemplateInfo.TemplateName = row[0].Name;
    this.setState({ clickTemplateInfo });
  }
  render() {
    let chargeType4 = this.state.chargeType4 == '' || this.state.chargeType4 == null
      ? ''
      : this.state.chargeType4.toString()
    let chargeType8 = this.state.chargeType8 == '' || this.state.chargeType8 == null
      ? ''
      : this.state.chargeType8.toString()
    const stepsLength = 3;
    const { current } = this.state;
    const { props } = this;
    const { getFieldDecorator } = props.form;
    const { isfetching } = props;
    const formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 12
      }
    };
    const checkboxOptions = [
      {
        label: '一卡通',
        value: '1'
      }, {
        label: '云接口',
        value: '2'
      }
    ];
    // 需求增加 变量名冲突
    const { listItemOneData, listItemTwoData, listItemThreeData, listItemFourData } = this.state;
    const listItemOne = listItemOneData;
    const listItemTwo = listItemTwoData;
    const listItemThree = listItemThreeData;
    const listItemFour = listItemFourData;
    return (
      <div className='stepDiv'>
        <Spin spinning={isfetching}>
          <Steps current={current}>
            <Step title="选择商品分类" />
            <Step title="填写商品信息" />
          </Steps>
          <div className='step-one step-normal' style={{
            display: current == 0
              ? 'block'
              : 'none'
          }}>
            <Row>
              <p className='stepOneTitle stepTitleNormal'>选择商品分类</p>
            </Row>

            {this.state.flag == 0
              ? <Row>
                {this.state.RelationList.map((item, index) => {
                  return <Col span={6} className='stepOneCol stepOneGuid'>
                    <ul>
                      <li>{item}
                        <i></i>
                      </li>
                    </ul>
                  </Col>
                })
                }
              </Row>
              : <Row>
                <Col span={6} className='stepOneCol stepOneGuid'>
                  {listItemOne
                    ? <ul>
                      <div className={'searchtext'}><Input placeholder='搜索类目' onChange={this.listOneInputChange} /></div>
                      <div className='list'>
                        {listItemOne.dataSource.map((item, key) => {
                          return <li key={key} className={this.state.listOneChecked == item.Id
                            ? 'listItemOneactive'
                            : ''}>
                            <a onClick={() => this.listOneClicked(item.Id, item)}>{item.Name}
                              <i></i>
                            </a>
                          </li>
                        })
                        }
                      </div>
                    </ul>
                    : ''
                  }
                </Col>
                <Col span={6} className='stepOneCol stepOneGuid'>
                  {listItemTwo
                    ? <ul>
                      <div className={'searchtext'}><Input placeholder='搜索类目' onChange={this.listTwoInputChange} /></div>
                      <div className='list'>
                        {listItemTwo.dataSource.map((item, key) => {
                          return <li key={key} className={this.state.listTwoChecked == item.Id
                            ? 'listItemOneactive'
                            : ''}>
                            <a onClick={() => this.listTwoClicked(item.Id)}>{item.Name}
                              <i></i>
                            </a>
                          </li>
                        })
                        }
                      </div>
                    </ul>
                    : ''
                  }
                </Col>
                <Col span={6} className='stepOneCol stepOneGuid'>
                  {this.state.listItemThree && listItemThree
                    ? <ul>
                      <div className={'searchtext'}><Input placeholder='搜索类目' onChange={this.listThreeInputChange} /></div>
                      <div className='list'>
                        {listItemThree.dataSource.map((item, key) => {
                          return <li key={key} className={this.state.listThreeChecked == item.Id
                            ? 'listItemOneactive'
                            : ''}>
                            <a onClick={() => this.listThreeClicked(item.Id)}>{item.Name}
                              <i></i>
                            </a>
                          </li>
                        })
                        }
                      </div>
                    </ul>
                    : ''
                  }
                </Col>
                <Col span={6} className='stepOneCol stepOneGuid'>
                  {this.state.listItemFour && listItemFour
                    ? <ul>
                      <div className={'searchtext'}><Input placeholder='搜索类目' onChange={this.listFourInputChange} /></div>
                      <div className='list'>
                        {listItemFour.dataSource.map((item, key) => {
                          return <li key={key} className={this.state.listFourChecked == item.Id
                            ? 'listItemOneactive'
                            : ''}>
                            <a onClick={() => this.listFourClicked(item.Id, item.CatCategoryCode, item.FaceValue, item)}>{item.Name}
                              <i></i>
                            </a>
                          </li>
                        })
                        }
                      </div>
                    </ul>
                    : ''
                  }
                </Col>
              </Row>
            }
          </div>
          <div className='step-two' style={{
            display: current == 1
              ? 'block'
              : 'none'
          }}>
            <div className='step-normal'>
              <p className='stepOneTitle stepTitleNormal'>填写商品信息</p>
              <Form className='stepTwoBody'>
                <FormItem {...formItemLayout} label='商品名称'>
                  {getFieldDecorator('CommodityName', {
                    initialValue: this.state.Name,
                    rules: [
                      {
                        max: 50,
                        message: '商品名称最大长度为50'
                      },
                      {
                        required: true,
                        message: '请输入商品名称'
                      }
                    ]
                  })(<Input type="text" autoComplete="off" />)}
                </FormItem>
                <FormItem {...formItemLayout} label='商品面值'>
                  {getFieldDecorator('CommodityValue', { initialValue: this.state.FaceValue })(<Input type="text" autoComplete="off" disabled={true} />)}
                </FormItem>

                <FormItem label="商品类型" {...formItemLayout}>
                  {getFieldDecorator('ProductType', {
                    initialValue: this.state.ProductType !== ''
                      ? `${this.state.ProductType}`
                      : '',
                    rules: [
                      {
                        required: true,
                        message: '请输入商品类型'
                      }
                    ]
                  })(

                    <Select onChange={this.handleChange} disabled={this.state.flag == 0
                      ? true
                      : false}>
                      <Option value="1">卡密</Option>
                      {/* <Option value="2">手工代充</Option> */}
                      <Option value="2">卡密直储</Option>
                      <Option value="4">在线直储</Option>
                    </Select>

                    )}
                </FormItem>
                {(this.state.showBottomInfo || this.state.flag === 0) && <div>
                  <Row gutter={12}>
                    <Col span={4} style={{
                      textAlign: 'right'
                    }}>
                      <span className='ant-form-item-required'>关联库存:</span>
                    </Col>
                    <Col span={2} style={{
                      textAlign: 'left'
                    }}>
                      <div className='stockTemplate' style={{
                        marginLeft: '0px'
                      }}>
                        {/* <StockConnectModal props= {props}/> */}
                        <a className='stockConnectClick' onClick={this.stockConnectTemplate}></a>
                      </div>
                    </Col>
                    <Col span={3} style={{
                      textAlign: 'left'
                    }}>
                      {this.state.ProductRelations[0] && (this.state.ProductRelations[0].AssociateName
                        ? this.state.ProductRelations[0].AssociateName
                        : this.state.ProductRelations[0].Name)}
                    </Col>
                  </Row>
                  {this.state.ProductType == 2 || this.state.ProductType == 4
                    ? <div>
                      <Row gutter={12}>
                        <Col span={4} style={{
                          textAlign: 'right'
                        }}>
                          <span className='ant-form-item-required'>选择模板:</span>
                        </Col>
                        <Col span={2} style={{
                          textAlign: 'left'
                        }}>
                          <div className='stockTemplate' style={{
                            marginLeft: '0px'
                          }}>
                            {/* <StockConnectModal props= {props}/> */}
                            <a className='choiceTemplateClick' onClick={this.chooseTemplate}></a>
                          </div>
                        </Col>
                        <Col span={3} style={{
                          textAlign: 'left'
                        }}>
                          {this.state.clickTemplateInfo.TemplateName}
                        </Col>
                      </Row>
                      <FormItem label="充值方式" {...formItemLayout}>
                        {getFieldDecorator('chargeType4', {
                          initialValue: this.state.TopupMethod === ''
                            ? '1'
                            : `${this.state.TopupMethod}`,
                          rules: [
                            {
                              required: true,
                              message: '请输入充值方式'
                            }
                          ]
                        })(
                          <RadioGroup>
                            <Radio value='1'>官方充值</Radio>
                            <Radio value='2'>自己充值</Radio>
                          </RadioGroup>
                          )}
                      </FormItem>
                    </div>
                    : ''
                  }
                  <FormItem label="代理商采购是否需要审核" {...formItemLayout}>
                    {getFieldDecorator('isReview', {
                      initialValue: this.state.IsReview
                        ? '1'
                        : '2'
                    })(
                      <RadioGroup>
                        <Radio value='1'>需要审核</Radio>
                        <Radio value='2'>不需要审核</Radio>
                      </RadioGroup>
                      )}
                  </FormItem>
                  <FormItem label="销售价" {...formItemLayout}>
                    {getFieldDecorator('purchasePrice', {
                      initialValue: this.state.Price,
                      rules: [
                        {
                          required: true,
                          message: '请输入销售价格'
                        }, {
                          pattern: /^\d+(?=\.{0,1}\d+$|$)/,
                          message: '销售价只能输入数字，请输入正确的销售价'
                        }
                      ]
                    })(<InputNumber min={0} />)}
                  </FormItem>
                  <FormItem label="上下架" {...formItemLayout}>
                    {getFieldDecorator('shelvesSelect', {
                      initialValue: (this.state.SaleStatus != '' && this.state.SaleStatus != null)
                        ? (this.state.SaleStatus).toString()
                        : '2'
                    })(
                      <RadioGroup>
                        <Radio value='2'>上架</Radio>
                        <Radio value='1'>下架</Radio>
                      </RadioGroup>
                      )}
                  </FormItem>
                  <FormItem label="详情描述" {...formItemLayout}>
                    {getFieldDecorator('remark', { initialValue: this.state.Content })(<Input type="textarea" rows="3" />)}
                  </FormItem>
                </div>
                }
              </Form>
              {/* 关联库存弹框 */}
              {this.state.stockConnectTemplateVisible && < SotckConnectTemplate isfetching={
                this.props.isfetching
              }
                getStockConnectInfo={
                  this.getStockConnectInfo
                }
                hideStockConnectTemplate={
                  this.hideStockConnectTemplate
                }
                getDockStockList={
                  this.props.getDockStockList
                }
                ProductType={
                  this.state.ProductType
                }
                FaceValue={
                  this.state.FaceValue
                }
                getDockStockListResult={
                  this.props.getDockStockListResult
                } />
              }
              {/* 选择模板弹框 */}
              {this.state.chooceTemplateVisible && < ChooseTemplate isfetching={
                isfetching
              }
                getChooseTemplateInfo={
                  this.getChooseTemplateInfo
                }
                getTemplateListResult={
                  this.props.getTemplateListResult
                }
                getTemplateList={
                  this.props.getTemplateList
                }
                hideChooseTemplate={
                  this.hideChooseTemplate
                } />
              }
            </div>
          </div>
          {/* {current == 2
          ? <div className='step-three'>
              <StockConnectComponent props={props} CategoryCode={this.state.CategoryCode} FaceValue={this.state.FaceValue} ProductType={this.state.ProductType} setProductType={this.setProductType}/>
            </div>
          : ''
} */}
          <div className='steps-action'>
            {(this.state.ProductType !== '' && this.state.current !== 0)
              ? <div style={{
                display: 'inline-block'
              }}>
                <Button style={{
                  marginRight: 8
                }} type='primary' onClick={() => this.handleSubmit()}>提交</Button>
                <Button style={{
                  marginRight: 8
                }} type='ghost' onClick={() => this.cancelCommodity()}>取消</Button>
              </div>
              : ''
            }
            {this.state.current > 0 && <Button type='ghost' onClick={() => this.prev()}>上一步</Button>
            }
            {(this.state.current == 0 && this.state.flag === 0) && <Button style={{
              marginLeft: 8
            }} type='primary' onClick={() => this.next()}>下一步</Button>}
          </div>

        </Spin>
      </div>
    )
  }
}
CommodityAdd = createForm()(CommodityAdd);

export default CommodityAdd
