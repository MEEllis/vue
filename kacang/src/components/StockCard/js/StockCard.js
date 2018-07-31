import React from 'react';
import PropTypes from 'prop-types';
import { Table, Form, Spin } from 'antd';
import omit from 'object.omit';
import '../../CardType/less/cardType.less';
import '../../StockList/less/stockList.less';
import { dateFormat } from '../../../utils';
import SearchFrom from '../../SearchForm';

const createForm = Form.create;

class StockCard extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
    }).isRequired,
    isfetching: PropTypes.bool,
    getStockCard: PropTypes.func.isRequired,
    getStockCardResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
  }

  static defaultProps = {
    isfetching: true,
    getStockCardResult: undefined,
  }


  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      pageSize: 10,
      stockCards: [],
      total: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const { getStockCardResult } = nextProps;
    if (getStockCardResult !== this.props.getStockCardResult) {
      if (getStockCardResult.Status === 200) {
        this.setState({
          stockCards: getStockCardResult.Data,
          total: getStockCardResult.Total
        });
      }
    }
  }
  getData = () => {
    const { Time } = this.state.condition;
    const { pageNumber, pageSize } = this.state;
    this.props.getStockCard({
      pageNumber,
      pageSize,
      ...omit(this.state.condition, 'Time'),
      BeginTime: Time && Time.length ? dateFormat(Time[0]) : '',
      EndTime: Time && Time.length > 1 ? dateFormat(Time[1]) : ''
    });
  }

  search = (err, values) => {
    if (err) return false;
    this.setState({ condition: values, pageNumber: 1 }, () => { this.getData(); });
  }
  init = (values) => {
    this.setState({ condition: values }, () => { this.getData(); });
  }
  render() {
    const pagination = {
      total: this.state.total,
      showSizeChanger: true,
      pageSize: this.state.pageSize,
      onShowSizeChange: (current, pageSize) => {
        this.setState({
          pageNumber: current,
          pageSize
        }, () => {
          this.getData();
        });
      },
      onChange: (current) => {
        this.setState({
          pageNumber: current
        }, () => {
          this.getData();
        });
      },
    };
    const columns = [
      {
        title: '所属库存',
        dataIndex: 'StockName',
        render: (text, record) => (`${text}(${record.StockId})`)
      },
      {
        title: '卡号',
        dataIndex: 'CardNumber'
      },
      {
        title: '密码',
        dataIndex: 'CardPassword',
        render: (text) => (text && text.length ? `${text[0]}******${text[text.length - 1]}` : '')
      },
      {
        title: '面值',
        dataIndex: 'FaceValue'
      },
      {
        title: '进价',
        dataIndex: 'Price'
      },
      {
        title: '状态',
        dataIndex: 'IsUsed',
        render: (text) => (text ? '已售' : '未售')
      },
      {
        title: '导入时间',
        dataIndex: 'CreateTime',
        render: (text) => (dateFormat(text))
      },
      {
        title: '有效时间',
        dataIndex: 'ExpireDateTime',
        render: (text) => (dateFormat(text))
      },
      {
        title: '进货商',
        dataIndex: 'Supplier'
      }
    ];
    const { isfetching } = this.props;
    const { stockCards } = this.state;

    return (
      <div>
        <Spin spinning={isfetching}>
          <SearchFrom name="StockCardList" init={this.init} search={this.search} />
          <Table
            rowKey="Id"
            columns={columns}
            dataSource={stockCards}
            pagination={pagination}
            style={{ marginTop: '10px' }}
          />
        </Spin>
      </div>
    );
  }
}


export default createForm()(StockCard);
