import React from 'react';
import { Form, Table, Spin, Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import '../../CardType/less/cardType.less';
import { dateFormat } from '../../../utils';

const createForm = Form.create;

class ShowPrepaidCardList extends React.Component {
  static PropTypes = {
    getZoneStocklist: PropTypes.func.isRequired,
    locationData: PropTypes.string.isRequired,
    hideZoneListModal: PropTypes.func.isRequired,
  };
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      postData: {
        StockId: props.currentStock.Id,
      }
    };
  }
  componentWillMount() {
    const { props } = this;
    props.getStockDetail(this.state.postData);
  }
  render() {
    const { props } = this;
    let dataSource = [];
    if (props.getStockDetailResult) {
      dataSource = props.getStockDetailResult.Data;
    }
    const columns = [
      {
        title: '账号',
        width: '10%',
        dataIndex: 'RechargeUserName'
      }, {
        title: '密码',
        width: '10%',
        dataIndex: 'RechargePassword'
      }, {
        title: '状态',
        width: '10%',
        dataIndex: 'IsUsed',
        render: (IsUsed) => {
          let status = '';
          if (IsUsed) {
            status = '已用完';
          } else {
            status = '未用完';
          }
          return status;
        }
      }, {
        title: '价格',
        width: '10%',
        dataIndex: 'Price'
      }, {
        title: '调用顺序',
        width: '10%',
        dataIndex: 'Sort'
      }, {
        title: '修改时间',
        width: '20%',
        dataIndex: 'CreateTime',
        render: (text) => (dateFormat(text))
      }, {
        title: '修改人',
        width: '10%',
        dataIndex: 'Supplier'
      }, {
        title: '是否使用密保卡',
        width: '10%',
        dataIndex: 'IsNeedSecretCard',
        render: (IsNeedSecretCard) => {
          let status = '';
          if (IsNeedSecretCard) {
            status = '是';
          } else {
            status = '否';
          }
          return status;
        }
      }
    ];
    return (
      <span>
        <Modal
          onCancel={() => { props.hidePrepaidCardModal(); }}
          title="查看直储账号列表"
          visible
          width="80%"
          cancelText="取消"
          footer={
            <Button key="button" type="primary" onClick={() => { props.hidePrepaidCardModal(); }}> 关闭 </Button>
          }
        >
          <Spin spinning={false}>
            <div className="modal-demo-content">
              <Table
                rowKey="Id"
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                scroll={{ y: 390 }}
              />
            </div>
          </Spin>
        </Modal>

      </span>
    );
  }
}

export default createForm()(ShowPrepaidCardList);
