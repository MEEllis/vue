import {
  xiaoshoumingxi, operation, commodity, stock, orders, users, user,
  service, safety, info, fund, finance, finances, verify, remittance
} from '../../Icon/js/Icon';
import toFlat from '../../../utils/helper/toFlat';

const menu = [
  {
    title: '商品与库存',
    link: '/operation',
    unique: 'operation',
    icon: operation,
    children: [
      {
        title: '我的商品',
        unique: 'commodity',
        link: '/operation/commodity',
        icon: commodity,
        children: []
      },
      {
        title: '我的库存',
        unique: 'stock',
        link: '/operation/stock',
        icon: stock,
        children: [
          {
            title: '库存管理',
            unique: 'stockList',
            link: '/operation/stock/list'
          },
          {
            title: '直储帐号管理',
            unique: 'stockDirectAccountList',
            link: '/operation/stock/account'
          },
          {
            title: '卡密管理',
            unique: 'stockCardMgrList',
            link: '/operation/stock/card'
          },
          // {
          //   title: '错卡池',
          //   unique: 'wrongCardList',
          //   link: '/operation/stock/wrongCard'
          // }
        ]
      }
    ]
  },
  {
    title: '供货管理',
    link: '/supply',
    unique: 'subManage',
    icon: users,
    children: [
      {
        title: '供货审核',
        unique: 'subReview',
        link: '/supply/review',
        icon: user,
        children: []
      },
      {
        title: '密价设置',
        unique: 'priceList',
        link: '/supply/price',
        icon: user,
        children: []
      }
    ]
  },
  {
    title: '订单管理',
    unique: 'orderManage',
    link: '/order',
    icon: users,
    children: [
      {
        title: '订单明细',
        unique: 'ordersList',
        link: '/order/detail',
        icon: orders,
        children: []
      },
      {
        title: '销售明细',
        unique: 'salesList',
        link: '/order/sales',
        icon: xiaoshoumingxi,
        children: []
      }
    ]
  },
  {
    title: '售后服务',
    unique: 'salseService',
    link: '/service',
    icon: service,
    children: [
      {
        title: '收到的投诉',
        unique: 'serviceReceiveList',
        link: '/service/receive',
        icon: xiaoshoumingxi,
        children: []
      },
      // {
      //   title: '仲裁处理',
      //   unique: 'serviceLaunchedList',
      //   link: '/service/launched',
      //   icon: xiaoshoumingxi,
      //   children: []
      // }
    ]
  },
  {
    title: '用户中心',
    link: '/user',
    unique: 'user',
    icon: users,
    children: [
      {
        title: '员工帐号',
        unique: 'userList',
        link: '/user/account',
        icon: user,
        children: []
      },
      {
        title: '安全中心',
        unique: 'userSafety',
        link: '/user/safety',
        icon: safety,
        children: []
      },
      {
        title: '基本资料',
        unique: 'userInfo',
        link: '/user/info',
        icon: info,
        children: []
      }
    ]
  },
  {
    title: '财务管理',
    unique: 'finance',
    link: '/finance',
    icon: finances,
    children: [
      {
        title: '我的资金',
        unique: 'financeFund',
        link: '/finance/fund',
        icon: fund,
        children: []
      },
      {
        title: '财务明细',
        unique: 'financeList',
        link: '/finance/detail',
        icon: finance,
        children: []
      },
      {
        title: '资金核算',
        unique: 'financeVerify',
        link: '/finance/verify',
        icon: verify,
        children: []
      },
      {
        title: '提现记录',
        unique: 'FinanceWithDrawList',
        link: '/finance/FinanceWithDrawPage',
        icon: remittance,
        children: []
      }
    ]
  }
];

export default menu;

const flatMenu = toFlat(menu);

export { flatMenu };
