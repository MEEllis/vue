import React from 'react';
import { dateFormat } from '../utils';
import { A } from '../components/Auth/js/Auth';

import Icon, * as icon from '../components/Icon/js/Icon';

const tableColumns = {
  // 供货审核tableColumns
  supplyReviewColumns(that) {
    return [
      {
        title: '申请商品名称',
        dataIndex: 'ProductName',
        render: (value, item) => `${value}(${item.ProductId})`
      },
      {
        title: '商品价格',
        dataIndex: 'Price',
        render: (value, item) => (
          <div>
            <p>面值：{item.FaceValue}</p>
            <p>售价：{value}</p>
          </div>)
      },
      {
        title: '进货商名称/ID',
        dataIndex: 'DealerName',
        render: (value, item) => `${value}(${item.DealerId})`
      },
      {
        title: '申请时间',
        dataIndex: 'CreateTime',
        render: (value) => dateFormat(value)
      },
      {
        title: '供货状态',
        dataIndex: 'PurchaseStatus',
        render: (value) => that.getStatus(value)
      },
      {
        title: '操作',
        width: 140,
        render: (item) => (that.getOper(item))
      }
    ];
  },
  // 销售明细tableColumns
  saleDetailsColumns(that) {
    return [
      {
        title: '订单编号',
        dataIndex: 'OrderId',
        width: 120,
        render: (text, record) => (
          <A
            auth="salesDetail"
            authOpts={{
              hint: ''
            }}
            onClick={() => { that.handleDetailClick(record); }}
          >
            {record.OrderId}
          </A>
        )
      }, {
        title: '商品名称/编号',
        width: 130,
        render: (text) => <span>{text.SupplierProductName}({text.SupplierProductId})</span>
      }, {
        title: '供货商户/编号',
        width: 120,
        render: (text) => <span>{text.DealerSiteName}({text.DealerSiteId})</span>
      }, {
        title: '充值账号',
        width: 120,
        dataIndex: 'TopupAccount'
      }, {
        title: '下单时间',
        width: 120,
        dataIndex: 'ReceiveTime'
      }, {
        title: '数量金额',
        dataIndex: 'TotalCost',
        width: 120,
        render: text => (<div>
          {text[0]}元*{text[1]}个={text[2]}
        </div>)
      }, {
        title: '成本',
        width: 100,
        dataIndex: 'SupplierSaleCost'
      }, {
        title: '利润',
        width: 80,
        dataIndex: 'SupplierSaleProfit'
      }, {
        title: '订单状态',
        width: 120,
        dataIndex: 'TopupStatus'
      }, {
        title: '操作',
        width: 120,
        dataIndex: 'Options',
        render: (text, record) => (
          <A
            auth="salesDetail"
            authOpts={{
              hint: '查看详情'
            }}
            onClick={() => { that.handleDetailClick(record); }}
          >
            <Icon glyph={icon.chakan}></Icon>
          </A>
        )
      }
    ];
  }
};
export default tableColumns;
