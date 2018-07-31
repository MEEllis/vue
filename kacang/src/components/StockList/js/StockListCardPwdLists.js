import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Spin, Table, Tabs } from 'antd';
import '../../CardType/less/cardType.less';

const createForm = Form.create;
const TabPane = Tabs.TabPane;

class Ponents extends React.Component {
  static propTypes = {
    isfetching: PropTypes.bool,
    stock: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Nature: PropTypes.number.isRequired,
      StockStatus: PropTypes.number.isRequired,
      StockType: PropTypes.number.isRequired,
      stockName: PropTypes.string.isRequired,
      Id: PropTypes.string.isRequired,
    }),
  };
  static defaultProps = {
    stock: undefined,
    isfetching: true
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      current: 1,
      postData: {
        PageNumber: 1,
        PageSize: 10,
        Name: props.stock.Name,
        Nature: props.stock.Nature,
        StockStatus: props.stock.StockStatus,
        StockType: props.stock.StockType,
        StockId: props.stock.Id,
        BeginTime: '',
        EndTime: '',
      },
    };
  }
  componentWillMount() {
    const { props } = this;
    props.getPwdcardList(this.state.postData);
  }
  render() {
    const { props } = this;
    if (!props.getPwdcardListResult) {
      return false;
    }
    const dataSource = props.getPwdcardListResult.Data || [];
    const TotalRecords = props.getPwdcardListResult.Total || 0;
    const pagination = {
      total: TotalRecords,
      showSizeChanger: true,
      current: this.state.current,
      onShowSizeChange: (current, pageSize) => {
        const sizePostData = {};
        Object.assign(sizePostData, this.state.postData);
        sizePostData.PageNumber = current;
        sizePostData.PageSize = pageSize;
        const { postData } = this.state;
        postData.PageSize = pageSize;
        props.getPwdcardList(sizePostData);
      },
      onChange: (current) => {
        const numberPostData = {};
        Object.assign(numberPostData, this.state.postData);
        numberPostData.PageNumber = current;
        props.getPwdcardList(numberPostData);
        this.setState({ current });
      },
    };
    const columns = [{
      title: '卡号',
      dataIndex: 'CardNumber',
      width: '10%',
    }, {
      title: '密码',
      dataIndex: 'CardPassword',
      width: '10%',
    }, {
      title: '面值',
      width: '10%',
      dataIndex: 'FaceValue'
    }, {
      title: '进价',
      width: '10%',
      dataIndex: 'Price'
    }, {
      title: '有效期',
      width: '10%',
      dataIndex: 'ExpireDateTime'
    }, {
      title: '导卡时间',
      width: '10%',
      dataIndex: 'CreateTime'
    }, {
      title: '是否已用完',
      width: '10%',
      dataIndex: 'IsUsed',
      render: (text) => (<span>{text ? '已用完' : '未用完'} </span>)
    }, {
      title: '供货商',
      width: '10%',
      dataIndex: 'Supplier'
    }, {
      title: '批次号',
      width: '10%',
      dataIndex: 'BatchCode'
    }];
    return (
      <span>
        <Modal
          title={`${props.stock.stockName} 的卡密列表`}
          visible
          width="80%"
          footer={null}
          onCancel={() => { props.hidePwdCardListModal(); }}
        >
          <Spin spinning={this.props.isfetching}>
            <Tabs
              animated={false}
              onChange={(key) => {
                const { postData } = this.state;
                let IsUsed = '';
                if (key === '2') {
                  IsUsed = true;
                } else if (key === '3') {
                  IsUsed = false;
                } else {
                  IsUsed = '';
                }
                postData.IsUsed = IsUsed;
                props.getPwdcardList(postData);
              }}
            >
              <TabPane tab="全部" key="1" />
              <TabPane tab="已售" key="2" />
              <TabPane tab="未售" key="3" />
            </Tabs>
            <Table
              rowKey="Id"
              columns={columns}
              dataSource={dataSource}
              pagination={pagination}
              scroll={{ y: 400 }}
            />
          </Spin>
        </Modal>
      </span>
    );
  }
}

export default createForm()(Ponents);
