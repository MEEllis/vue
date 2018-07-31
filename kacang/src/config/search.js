import moment from 'moment';

// type 0 input 1 select 2 RangePicker
const beginTime = moment().subtract(10, 'days').format('YYYY-MM-DD 00:00:00');
const endTime = moment().format('YYYY-MM-DD 23:59:59');
export default {
  StockAccountList: [
    {
      name: '库存编号',
      index: '',
      type: 0,
      id: 'Stockid'
    },
    {
      name: '直储帐号',
      index: 1,
      type: 0,
      id: 'RechargeUserName'
    },
    {
      name: '库存名称',
      index: 2,
      type: 0,
      id: 'StockName'
    },
    {
      name: '库存性质',
      index: '3',
      type: 1,
      id: 'Nature',
      defaultValue: '',
      items: [
        {
          name: '全部',
          value: ''
        },
        {
          name: '普通库存',
          value: '1'
        },
        {
          name: '组合库存',
          value: '2'
        },
        {
          name: '区域库存',
          value: '3'
        }
      ]
    }, {
      name: '账号状态',
      index: '4',
      type: 1,
      id: 'IsUsed',
      defaultValue: '',
      items: [
        {
          name: '全部',
          value: ''
        },
        {
          name: '未用完',
          value: 'false'
        },
        {
          name: '已用完',
          value: 'true'
        }
      ]
    },
    {
      name: '库存面值',
      index: '5',
      type: 0,
      id: 'FaceValue'
    },
    {
      name: '添加时间',
      index: '6',
      type: 2,
      id: 'AddTime'
    }
  ],
  StockCardList: [
    {
      name: '卡号',
      index: '',
      type: 0,
      id: 'CardNumber'
    },
    {
      name: '密码',
      index: 1,
      type: 0,
      id: 'CardPassword'
    },
    {
      name: '供应商',
      index: 2,
      type: 0,
      id: 'Supplier'
    },
    {
      name: '库存名称',
      index: '3',
      type: 0,
      id: 'StockName'
    },
    {
      name: '导卡时间',
      index: '4',
      type: 2,
      id: 'Time'
    },
    {
      name: '状态',
      index: '5',
      type: 1,
      id: 'IsUsed',
      defaultValue: '',
      items: [
        {
          name: '全部',
          value: ''
        }, {
          name: '未售',
          value: 'false'
        }, {
          name: '已售',
          value: 'true'
        }
      ]
    }
  ],
  OrderList: [
    {
      name: '订单编号',
      index: '',
      type: 0,
      id: 'OrderId'
    },
    {
      name: '进货商户',
      index: 1,
      type: 0,
      id: 'DealerSiteId'
    },
    {
      name: '商品编号',
      index: '3',
      type: 0,
      id: 'ProductId'
    },
    {
      name: '商品名称',
      index: '4',
      type: 0,
      id: 'ProductName'
    },
    {
      name: '交易时间',
      index: '6',
      type: 2,
      id: 'TradeTime',
      defaultValue: [moment(beginTime), moment(endTime)]
      // defaultValue: [moment().format('YYYY-MM-DD 00:00:00'), moment('2017-05-31')]
    },
    {
      name: '商品类型',
      index: '5',
      type: 1,
      id: 'ProductType',
      defaultValue: '0',
      items: [
        {
          name: '全部',
          value: '0'
        },
        {
          name: '卡密',
          value: '1'
        },
        {
          name: '卡密直储',
          value: '2'
        },
        {
          name: '在线直储',
          value: '4'
        }
      ]
    },
    {
      name: '调用账号',
      index: '9',
      type: 0,
      id: 'ChargeAccount'
    },
    {
      name: '充值账号 ',
      index: '10',
      type: 0,
      id: 'TopupAccount'
    }
  ],
  // 订单销售搜索
  OrderSaleList: [
    {
      name: '订单编号',
      index: '',
      type: 0,
      id: 'OrderId'
    },
    {
      name: '进货商户',
      index: 1,
      type: 0,
      id: 'DealerSiteId'
    },
    {
      name: '商品编号',
      index: '3',
      type: 0,
      id: 'ProductId'
    },
    {
      name: '商品名称',
      index: '4',
      type: 0,
      id: 'ProductName'
    },
    {
      name: '交易时间',
      index: '6',
      type: 2,
      id: 'TradeTime',
      defaultValue: [moment(beginTime), moment(endTime)]
    },
    {
      name: '订单状态',
      index: '5',
      type: 1,
      id: 'Status',
      defaultValue: '0',
      items: [
        {
          name: '全部',
          value: '0'
        },
        {
          name: '交易成功',
          value: '5'
        },
        {
          name: '交易失败',
          value: '6'
        }
      ]
    },
    {
      name: '商品类型',
      index: '5',
      type: 1,
      id: 'ProductType',
      defaultValue: '0',
      items: [
        {
          name: '全部',
          value: '0'
        },
        {
          name: '卡密',
          value: '1'
        },
        {
          name: '卡密直储',
          value: '2'
        },
        {
          name: '在线直储',
          value: '4'
        }
      ]
    },
    {
      name: '调用账号',
      index: '9',
      type: 0,
      id: 'ChargeAccount'
    },
    {
      name: '充值账号 ',
      index: '10',
      type: 0,
      id: 'TopupAccount'
    }
  ],
  SupplyReviewList: [
    { name: '商品名称', index: '', type: 0, id: 'ProductName' },
    { name: '客户名称', index: '1', type: 0, id: 'DealerName' },
    { name: '客户编号', index: '2', type: 0, id: 'DealerId' },
    { name: '商品编号', index: '3', type: 0, id: 'ProductId' },
  ],
  // 已密价商品
  HasPriceSecretList: [
    {
      name: '商品名称',
      index: '',
      type: 0,
      id: 'ProductName'
    },
    {
      name: '商品id',
      index: 1,
      type: 0,
      id: 'ProductId'
    }
  ]
};
