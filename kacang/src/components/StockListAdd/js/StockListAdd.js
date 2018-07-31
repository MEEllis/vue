import React from 'react';
import {
  Form,
  Input,
  Spin,
  message,
  Modal,
  Select
} from 'antd';
import FL from '../../../utils/FL';
import * as icons from '../../Icon/js/Icon';
import '../../CardType/less/cardType.less';
import IconComponent from '../../IconComponent/js/IconComponent';

const FormItem = Form.Item;
const Option = Select.Option;
const createForm = Form.create;

class StockListAdd extends React.Component {
  static propTypes = {
     form: PropTypes.shape({
       validateFields: PropTypes.func.isRequired,
       getFieldDecorator: PropTypes.func.isRequired,
       resetFields: PropTypes.func.isRequired,
       setFieldsValue: PropTypes.func.isRequired,
     }).isRequired
   };

   static defaultProps = {
   };
   constructor(props) {
     super(props);
     this.state = {
       modalVisibleDaozhanghao: false,
       stockType: [
         '卡密', '在线'
       ],
       stockTypeVal: '卡密',
       selectedRowKeys: '',
       selectedRows: [],
       PostData: {
         condition: {
           PageIndex: 1,
           PageNumber: 1,
           PageSize: 5
         }
       },
       dataSource: [],
       enablesecret: false,
       reload: false,
       ieditData: {
         UserName: '',
         PassWord: '',
         Region: '',
         Price: '',
         Sequence: '',
         Guestname: '',
         Guestpwd: '',
         Supplier: '',
         EnableSecret: 'false',
         SecretCard: ''
       }
     }
     };
   }
  componentDidUpdate() {
    const {props} = this;
    const {reload} = this.state;
    let that = this;
    if (reload && !this.props.isfetching) {
      switch (props.data.source) {
        case 'ModifyPrepaidAccount':
        case 'AddPrepaidAccount':
          if (props.data.Status == 200) {
            if (props.data.source == 'AddPrepaidAccount') {
              message.success('添加成功');
            } else {
              message.success('修改成功');
            };
            this.props.reload();
          }
          this.setState({reload: false, modalVisibleDaozhanghao: false});
          break;
      }
    };
    if (props.locationData.isSubmit) {
      props.onChange();
    };
  }
  handleSelectChange = (data) => {
    let itemStockType = [];
    switch (data) {
      case '1':
        itemStockType = ['卡密', '在线'];
        break;
      case '2':
        this.props.getStockPackList(this.state.PostData);
        itemStockType = ['卡密'];
        break;
      case '3':
        itemStockType = ['在线'];
        break;
    };
    this.setState({stockType: itemStockType, stockTypeVal: itemStockType[0]})
  }
  removeSetClass = (index, id) => {
    let itemSelectedRows = this.state.selectedRows;
    let itemSelectedRowKeys = this.state.selectedRowKeys;
    itemSelectedRows.splice(index, 1);
    itemSelectedRowKeys.splice(index, 1);

    this.setState({selectedRows: itemSelectedRows, selectedRowKeys: itemSelectedRowKeys});

  }
  setClass = (e, index) => {

    let itemSelectedRows = this.state.selectedRows;
    itemSelectedRows[index].a = e.target.value;
    this.setState({selectedRows: itemSelectedRows});
  }
  handleSelectStockTypeValChange = (data) => {
    this.setState({stockTypeVal: data})
  }
  postData = () => {
    this.props.form.validateFields((err, value) => {
      if (err) {
        return false;
      };
      let postData = {
        url: FL.PATH.API.AddPrepaidAccount,
        source: 'AddPrepaidAccount',
        ownerId: '34CF37F8-356D-4D45-84AE-243C02CF0F7E',
        dto: value
      };
      let {ieditData} = this.props;
      if (ieditData) {
        postData.url = FL.PATH.API.ModifyPrepaidAccount;
        postData.source = 'ModifyPrepaidAccount';
        postData.cardId = ieditData.Id;
      };
      this.props.getData(postData);
      this.setState({reload: true})
      return false;
    });
  }
  selectStock = () => {
    this.props.form.validateFields((err, value) => {
      let postData = this.state.PostData;
      postData.condition.name = value.selectStockName;
      this.props.getStockPackList(this.state.PostData);
      postData.condition.name = '';
    });
  }
  displayAllStock = () => {
    this.props.getStockPackList(this.state.PostData);
  }
  enablesecret = (enablesecret) => {
    enablesecret = enablesecret && enablesecret != 'false'
      ? true
      : false;
    this.setState({enablesecret})
  }
  displayInfo = () => {
    const {props} = this;
    let propsIeditData = props.ieditData;
    let {ieditData} = this.state;
    if (propsIeditData) {
      propsIeditData.EnableSecret = propsIeditData.EnableSecret.toString();
      Object.assign(ieditData, propsIeditData);
      this.setState({ieditData});
    }
    this.setState({modalVisibleDaozhanghao: true, ieditData});
  }
  render() {
    return false;
    const stockType = this.state.stockType;
    const {selectedRowKeys} = this.state;
    const {getFieldDecorator} = this.props.form;
    const stockList = this.props.stockListData.Data || [];
    //const StockIdSelect = stockList.length > 0 ? stockList[0].Id : '';
    // undefined
    let {isfetching} = this.props
    let {props} = this;
    // return false;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys) => {
        // onChange中原本有selectedRows，但是它和selectedRowKeys排列顺序不同？
        let stockPackListData = this.props.stockPackListData.Data;
        let selectedRows = []
        for (let k in selectedRowKeys) {
          selectedRows.push(stockPackListData[selectedRowKeys[k]]);
        }
        this.setState({selectedRowKeys, selectedRows});
      }
    };

    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 17
      }
    };
    return (
      <span>
        <span onClick={() => {
          this.displayInfo()
        }}>
          {this.props.type
            ? <Button type="primary">添加新帐号11</Button>
            : (this.props.ieditData
              ? <IconComponent title='修改' glyphIcon={icons.iEdit}/>
              : <IconComponent title='导账号' glyphIcon={icons.daozhanghao}/>)}
        </span>

        <Modal
          onClose={() => {this.setState({modalVisibleDaozhanghao: false});}}
          title={this.props.locationData.stockName + ' 添加新账号'}
          visible={this.state.modalVisibleDaozhanghao}
          footer={[
            <Button key="submit" type="default" size="large" onClick = {() => {this.setState({modalVisibleDaozhanghao: false});}}
            >
              关闭
            </Button>,
            <Button key="button" type="primary" size="large" onClick={()=>{ this.postData() }}> 提交 </Button>
          ]}>
          <Spin spinning={false}>
            <Form style={{
              marginBottom: 10
            }}>
              <FormItem {...formItemLayout} label='选择库存归属'>
                {getFieldDecorator('StockId', {
                  initialValue: this.props.locationData.Id,
                  disabled: true
                })(
                  <Select id="select" size="large" disabled={true}>
                    <Option value={this.props.locationData.Id}>{this.props.locationData.Name}</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='直储帐号用户名'>

                {getFieldDecorator('Username', {initialValue: this.state.ieditData.UserName})(<Input/>)}
              </FormItem>
              <FormItem {...formItemLayout} label='直储帐号密码'>

                {getFieldDecorator('Password', {initialValue: this.state.ieditData.PassWord})(<Input type='PassWord'/>)}
              </FormItem>
              <FormItem {...formItemLayout} label='所属区域'>

                {getFieldDecorator('Region', {
                  initialValue: this.state.ieditData.Region || '全国'
                })(
                  <Select id="select" size="large">
                    {FL.REGION.map((list, index) => {
                      return <Option key={index} value={list.value}>{list.name}</Option>
                    })}
                  </Select>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label='进货价格'>

                {getFieldDecorator('Price', {
                  rules: [
                    {
                      required: true,
                      message: '请输入价格'
                    }
                  ],
                  initialValue: this.state.ieditData.Price
                })(<Input/>)}
              </FormItem>

              <FormItem {...formItemLayout} label='调用顺序'>

                {getFieldDecorator('Sequence', {
                  rules: [
                    {
                      required: true,
                      message: '请输入调用顺序'
                    }
                  ],
                  initialValue: this.state.ieditData.Sequence
                })(<Input/>)}
              </FormItem>

              <FormItem {...formItemLayout} label='查询账号用户名'>

                {getFieldDecorator('Guestname', {initialValue: this.state.ieditData.Guestname})(<Input/>)}
              </FormItem>

              <FormItem {...formItemLayout} label='查询账号密码'>

                {getFieldDecorator('Guestpwd', {initialValue: this.state.ieditData.Guestpwd})(<Input type='PassWord'/>)}
              </FormItem>
              <FormItem {...formItemLayout} label='是否需要密保卡'>

                {getFieldDecorator('Enablesecret', {initialValue: this.state.ieditData.EnableSecret})(
                  <Select id="select" size="large" onChange={this.enablesecret}>
                    <Option value="false">不需要</Option>
                    <Option value="true">需要</Option>
                  </Select>
                )}
              </FormItem>
              {this.state.enablesecret
                ? <FormItem {...formItemLayout} label='密保卡'>

                    {getFieldDecorator('Secretcard', {initialValue: this.state.ieditData.SecretCard})(<Input/>)}
                  </FormItem>
                : ''
}

              <FormItem {...formItemLayout} label='供应商名称'>

                {getFieldDecorator('Supplier', {initialValue: ''})(<Input/>)}
              </FormItem>

              {/* <FormItem wrapperCol={{ span: 6, offset: 2 }}>
                                <Button className={'mr10'} type="primary" size="large" onClick={this.postData}>提交</Button>
                            </FormItem> */}
            </Form>
          </Spin>
        </Modal>

      </span>
    )
  }
}

export default createForm()(StockListAdd);
