import React from 'react';
import { Row, Col, Form, Input, Select, Button, Modal, Spin, Table } from 'antd';
import { RangePicker } from 'react-component-date';
import moment from 'moment';
import FL from '../../../utils/FL';
import '../../CardType/less/cardType.less';
import '../../StockList/less/stockList.less';

const createForm = Form.create;
const FormItem = Form.Item;

class WrongCardList extends React.Component {
  state = {
    modalVisible: false,
    ALinkComponent1: '',
    searchList: FL.LINK.WrongCardListterm,
    listForm: {
      ALinkComponent1: [{
        title: '全部',
        indexStatus: ''
      }, {
        title: '未售',
        indexStatus: '1'
      }, {
        title: '已售',
        indexStatus: '2'
      }],
    },
    PostData: {
      beginTime: '',
      cardNumber: '',
      endTime: '',
      orderNo: '',
      pageIndex: 1,
      pageSize: 15,
      status: '',
      stockName: '',
      supplier: ''
    }
  }
  setModalVisible = (modalVisible) => {
    this.setState({ modalVisible });
  }
  onOk = () => {
    this.myNotes.refs.input.value === '' ?
    alert('备注为空！')
    :
    alert("备注为" + this.myNotes.refs.input.value);
    this.setState({ modalVisible: false });
  }
  componentWillMount() {
    const { props } = this;
    // 1、初始化渲染之前触发监听的异步 Action
    props.getWrongCard(this.state.PostData);
  }
  getDate= (dateTime) => {  // 更改date的格式
    const datee = new Date(dateTime);
    const year = datee.getFullYear(),
      month = datee.getMonth() + 1,
      date = datee.getDate(),
      hours = datee.getHours(),
      minutes = datee.getMinutes(),
      seconds = datee.getSeconds();
    return (year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds);
  }
  handleSearch = () => {
    const { props } = this;
    this.props.form.validateFields((err, value) => {
      const postData = this.state.PostData;
      Object.assign(postData, value);
      postData.beginTime = value.tradeTime[0] ? this.getDate(value.tradeTime[0]) : '';
      postData.endTime = value.tradeTime[0] ? this.getDate(value.tradeTime[1]) : '';
      props.getWrongCard(postData);
    });
  }
  handleChangeType(value) {
    this.state.ALinkComponent1 = `${value}`;
  }
  handleReset(){
    this.props.form.resetFields();
    this.setState({
    })
  }
  render() {
    const { props } = this;
    const dataSource = props.WrongCard.Data || [];
    const listForm = this.state.listForm;
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const TotalRecords = props.WrongCard.TotalRecords;
    const pagination = {
      total: TotalRecords,
      showSizeChanger: true,
      pageSize: this.state.PostData.PageSize,
      onShowSizeChange: (current, pageSize) => {
        const postData = this.state.PostData;
        postData.PageIndex = current;
        postData.PageSize = pageSize;
        this.setState({ PostData: postData });
        props.getWrongCard(postData);
      },
      onChange: (current, pageSize) => {
        const postData = this.state.PostData;
        postData.PageIndex = current;
        this.setState({ PostData: postData });
        props.getWrongCard(postData);
      },
    };
    const columns = [{
      title: '所属库存',
      render: (data) =>
        <div>
          {data.StockName}( {data.StockCode} )
        </div>
    }, {
      title: '卡号',
      dataIndex: 'CardNumber'
    }, {
      title: '密码',
      dataIndex: 'Password'
    }, {
      title: '价格',
      render: (data) =>
        <div>
          面值：{data.FaceValue}<br />
          进价：{data.PurchasePrice}
        </div>
    }, {
      title: '订单号',
      dataIndex: 'OrderNo'
    }, {
      title: '标记时间',
      dataIndex: 'CreateTime'
    }, {
      title: '进货商',
      dataIndex: 'Supplier'
    }, {
      title: '状态',
      dataIndex: 'status'
    }, {
      title: '备注',
      dataIndex: 'Memo'
    }, {
      title: '操作',
      render: (data) =>
        <div>
          { data.UpdateUserName ?
            data.UpdateUserName
            :
            <button
              className="ant-btn ant-btn-danger"
              onClick={() => this.setModalVisible(true)}
            >处理</button>
          }
        </div>
    }];
    // 搜索begin
    const Searchlist = this.state.searchList;
    const children = [];
    for (let i = 0; i < Searchlist.SearchText.length; i++) {
      switch(Searchlist.SearchText[i].type) {
        case '0':
          children.push(
            <Col span={8} key={i}>
              <FormItem {...formItemLayout} label={Searchlist.SearchText[i].title}>
                {getFieldDecorator(Searchlist.SearchText[i].ID, {
                  initialValue: ''
                })(
                  <Input type="text" size="default" />
                )}
              </FormItem>
            </Col>);
          break;
        case '1':
          children.push(
            <Col span={8} key={i}>
              <FormItem {...formItemLayout} label={Searchlist.SearchText[i].title}>
                { getFieldDecorator(Searchlist.SearchText[i].ID, {
                  initialValue: ''
                })(
                  <Select size="default" onChange={this.handleChangeType} allowClear>
                    {listForm.ALinkComponent1.map((list, index) =>{
                      return <Option value={list.indexStatus} key={index}>{list.title}</Option>
                    })}
                  </Select>
                )
                }
              </FormItem>
            </Col>);
          break;
        case '2':
          children.push(
            <Col span={8} key={i}>
              <FormItem {...formItemLayout} label={Searchlist.SearchText[i].title}>
                {getFieldDecorator(Searchlist.SearchText[i].ID, {
                  initialValue: []
                })(
                  <RangePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={[{ defaultValue: '00:00:00' }, { defaultValue: '23:59:59' }]}
                  />
                )
                }
              </FormItem>
            </Col>);
      }
    }
    const shownCount = children.length;
    // 搜索end
    return (
      <div>
        <Spin spinning={props.isfetching}>
          <div className="searchdiv" style={{ marginBottom: 10 }} >
            <Form
              className="ant-advanced-search-form"
              onSubmit={this.handleSearch}
            >
              <Row gutter={40}>
                {children.slice(0, shownCount)}
              </Row>
              <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Button type="primary" htmlType="submit">搜索</Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                    重置
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
          <Table rowKey="Id" columns={columns} dataSource={dataSource || []} pagination={pagination} />
        </Spin>
        <Modal
          title="确定要将此卡密标记为已处理状态吗？"
          wrapClassName="vertical-center-modal"
          visible={this.state.modalVisible}
          onOk={() => this.onOk()}
          onCancel={() => this.setModalVisible(false)}
        >
          <Input ref={node => this.myNotes = node} type="textarea" rows={3} placeholder="处理过程备注" />
        </Modal>
      </div>
    );
  }
}

WrongCardList = createForm()(WrongCardList);
export default WrongCardList;
