import React from 'react'
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  Table,
  Spin,
  message
} from 'antd';
import { browserHistory, Link } from 'react-router';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;
const createForm = Form.create;

import Icon, { iDelete } from '../../Icon/js/Icon'
import '../../CardType/less/cardType.less'
import IconComponent from '../../IconComponent/js/IconComponent'

class StockAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockType: [
        '卡密', '在线'
      ],
      stockTypeVal: '卡密',
      selectedRowKeys: '',
      selectedRows: [],
      PostData: {
        PageNumber: 1,
        PageSize: 5,
        nature: 1,
        StockType: 1
      },
      dataSource: [],
      selectedRowDatas: [],
      stockListData: [],
      reload: false
    }
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { getStockListResult, createStockResult } = nextProps;
    let that = this;
    //查询库存
    if (getStockListResult !== props.getStockListResult) {
      this.setState({ stockListData: getStockListResult.Data })
    }
    // 添加库存
    if (createStockResult !== props.createStockResult) {
      if (createStockResult.Status === 200) {
        browserHistory.push('/operation/stock/list');
      }
    }
  }
  handleSelectChange = (data) => {
    let itemStockType = [];
    switch (data) {
      case '1':
        itemStockType = ['卡密', '在线'];
        break;
      case '2':
        this.props.getStockList(this.state.PostData);
        this.setState({ reload: true });
        itemStockType = ['卡密'];
        break;
      case '3':
        itemStockType = ['在线'];
        break;
    };
    this.setState({ stockType: itemStockType, stockTypeVal: itemStockType[0] })
  }
  removeSetClass = (index, id) => {
    let selectedRowDatas = this.state.selectedRowDatas;
    let selectedRowKeys = this.state.selectedRowKeys;
    for (let i in selectedRowDatas) {
      if (selectedRowDatas[i].Id == id) {
        selectedRowDatas.splice(i, 1);
        selectedRowKeys.splice(i, 1);
        break;
      }
    };

    this.setState({ selectedRowDatas, selectedRowKeys });
  }
  setClass = (e, id) => {
    let selectedRowDatas = this.state.selectedRowDatas;
    for (let i in selectedRowDatas) {
      if (selectedRowDatas[i].Id == id) {
        selectedRowDatas[i].priority = e.target.value;
        break;
      }
    };
    this.setState({ selectedRowDatas });
  }
  handleSelectStockTypeValChange = (data) => {
    this.setState({ stockTypeVal: data })
  }
  sibmitData = () => {
    this.props.form.validateFields((err, value) => {
      if (err) {
        return false;
      };
      let postData = {
        relationStocks: []
      };
      Object.assign(postData, value);
      if (postData.Nature == 2) {
        Object.assign(postData.relationStocks, this.state.selectedRowDatas);
        let relationStocks = postData.relationStocks;
        if (relationStocks.length === 0) {
          message.success('请选择关联库存');
          return false;
        }
        if (relationStocks.length < 2) {
          message.success('请选择2个以上的库存');
          return false;
        }
        let hash = {};
        for (let k in relationStocks) {
          if (!Number.isInteger(Number(relationStocks[k].priority))) {
            message.success('出库优先级必须为大于0的整数');
            return false;
          }
          if (hash[relationStocks[k].priority]) {
            message.success('出库优先级不能重复');
            return false;
          }
          hash[relationStocks[k].priority] = true;
        }
        // 如果是库存包需要加上默认的面值
        postData.FaceValue = 1;
        postData.WarningCount = 0;
        //
      }

      for (const k in postData.relationStocks) {
        postData.relationStocks[k].relationId = postData.relationStocks[k].Id
      }

      this.props.createStock(postData);
      this.setState({ reload: true });
    });
  }
  selectStock = () => {
    this.props.form.validateFields((err, value) => {
      let postData = this.state.PostData;
      postData.name = value.selectStockName;
      this.props.getStockList(this.state.PostData);
      this.setState({ reload: true });
    });
  }
  displayAllStock = () => {
    let PostData = this.state.PostData;
    PostData.name = '';
    this.props.getStockList(PostData);
    this.setState({
      reload: true,
      PostData: { // 没用啊
        ...PostData,
        name: ''
      }
    });
  }
  render() {
    const stockType = this.state.stockType;
    let columns = [
      {
        title: '库存编号',
        dataIndex: 'Id'
      }, {
        title: '库存名称',
        dataIndex: 'Name'
      }, {
        title: '库存面值',
        width: 70,
        dataIndex: 'FaceValue'
      }
    ];
    let columns1 = [
      {
        title: '库存编号',
        dataIndex: 'Id'
      }, {
        title: '库存名称',
        dataIndex: 'Name'
      }, {
        title: '库存面值',
        dataIndex: 'FaceValue'
      }, {
        title: '设置库存优先级',
        dataIndex: 'CreateTime',
        render: (text, record, index) => <div>
          <Input placeholder="设置库存优先级" onChange={(e) => {
            this.setClass(e, record.Id)
          }} />
        </div>
      }, {
        title: '操作',
        width: 50,
        render: (text, record, index) => <div>
          <span style={{
            paddingRight: '15px'
          }}><IconComponent title='删除' glyphIcon={iDelete} click={() => {
            this.removeSetClass(index, record.Id)
          }} /></span>
        </div>
      }
    ];

    const { selectedRowKeys } = this.state;
    const { getFieldDecorator } = this.props.form;
    // undefined
    let { isfetching } = this.props;

    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys });
        let selectedRowDatas = this.state.selectedRowDatas;

        let newSelectedRowDatas = [];
        let stockPackListData = this.state.stockPackListData;
        for (let k in selectedRowKeys) {
          for (let j in selectedRowDatas) {
            if (selectedRowKeys[k] == selectedRowDatas[j].Id) {
              newSelectedRowDatas.push(selectedRowDatas[j]);
              break;
            } else if (selectedRowDatas.length - 1 == j) {
              for (let i in selectedRows) {
                if (selectedRows[i].Id == selectedRowKeys[k]) {
                  newSelectedRowDatas.push(selectedRows[i]);
                  break;
                }
              }
            }
          }
          if (selectedRowDatas.length < 1) {
            for (let i in selectedRows) {
              if (selectedRows[i].Id == selectedRowKeys[k]) {
                newSelectedRowDatas.push(selectedRows[i]);
                break;
              }
            }
          }
        };
        selectedRowDatas = newSelectedRowDatas;
        this.setState({ selectedRowDatas })
      }
    };
    const TotalRecords = this.props.getStockListResult.Total;
    const pagination = {
      total: TotalRecords,
      showSizeChanger: false,
      pageSize: this.state.PostData.PageSize,
      onChange: (current, pageSize) => {
        let postData = this.state.PostData;
        Object.assign({}, this.state.PostData);
        postData.PageNumber = current;
        this.props.getStockList(postData);
        this.setState({ reload: true });
      }
    };
    return (
      <div>
        <Spin spinning={isfetching}>
          <Form style={{
            marginBottom: 10
          }}>
            <FormItem label="库存名称" labelCol={{
              span: 2
            }} wrapperCol={{
              span: 12
            }}>
              {getFieldDecorator('Name', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请输入库存名称'
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label="库存性质" labelCol={{
              span: 2
            }} wrapperCol={{
              span: 12
            }}>

              {getFieldDecorator('Nature', { initialValue: '1' })(
                <Select id="select" size="large" onChange={this.handleSelectChange}>
                  <Option value='1'>普通库存</Option>
                  <Option value='2'>库存包</Option>
                  <Option value='3'>区域库存</Option>
                </Select>
              )}
            </FormItem>
            {this.state.stockType.length == 1 && this.state.stockType[0] == '卡密'
              ? <Row className={'pb20'}>
                <Col span={12} offset={2}>
                  <Row style={{
                    marginBottom: '10px'
                  }}>
                    <Col span={3} style={{
                      lineHeight: '30px'
                    }}>库存名称</Col>
                    <Col span={10}>
                      {getFieldDecorator('selectStockName', { initialValue: this.state.PostData.name })(<Input />)}
                    </Col>
                    <Col span={4}>
                      <Button type="primary" className={'ml10'} htmlType="button" onClick={this.selectStock}>筛选</Button>
                    </Col>
                    <Col span={7} style={{
                      textAlign: 'right'
                    }}>
                      <Button type="default" htmlType="button" onClick={this.displayAllStock}>显示全部卡密库存</Button>
                    </Col>
                  </Row>
                  <Table rowKey="Id" rowSelection={rowSelection} columns={columns} pagination={pagination} dataSource={this.state.stockListData} className={'mb10'} />
                  <Table rowKey="Id" columns={columns1} dataSource={this.state.selectedRowDatas || []} pagination={false} locale={{
                    emptyText: '您还没有选择库存'
                  }} />
                </Col>
              </Row>
              : ''
            }
            <FormItem label="库存类型" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
              {getFieldDecorator('Type', {
                initialValue: this.state.stockTypeVal === '卡密'
                  ? '1'
                  : '2'
              })(
                <Select id="select" size="large" onChange={this.handleSelectStockTypeValChange}>
                  {stockType.map((list, index) => {
                    return (
                      <Option
                        key={index}
                        value={list === '卡密' ? '1' : '2'}
                      >
                        {list}
                      </Option>
                    );
                  })
                  }
                </Select>
                )}
            </FormItem>
            {this.state.stockType.length == 1 && this.state.stockType[0] == '卡密'
              ? ''
              : <FormItem label="库存面值" labelCol={{
                span: 2
              }} wrapperCol={{
                span: 12
              }}>
                {getFieldDecorator('FaceValue', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '请输入库存面值'
                    },
                    {
                      pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
                      message: '库存面值只能输入数字，请重新输入'
                    }
                  ]
                })(<Input />)}
              </FormItem>
            }
            {this.state.stockType.length !== 2
              ? ''
              : <FormItem label="报警数量" labelCol={{
                span: 2
              }} wrapperCol={{
                span: 12
              }}>
                {getFieldDecorator('WarningCount', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '请输入报警数量'
                    },
                    {
                      pattern: /^[1-9]\d*$/,
                      message: '报警数量只能输入数字，请重新输入'
                    }
                  ]
                })(<Input />)}
              </FormItem>
            }

            <FormItem label="备注说明" labelCol={{
              span: 2
            }} wrapperCol={{
              span: 12
            }}>
              {getFieldDecorator('Remark', { initialValue: '' })(<Input type="textarea" rows={4} />)}
            </FormItem>
            <FormItem wrapperCol={{
              span: 6,
              offset: 2
            }}>
              <Button type="primary" htmlType="button" size="large" onClick={this.sibmitData}>提交</Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    )
  }
}

export default createForm()(StockAdd)
