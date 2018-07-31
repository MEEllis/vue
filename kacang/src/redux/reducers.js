import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { nprogress } from 'redux-nprogress';
import Receive from './Receive';
import account from './account';
import commodityAdd from './commodityAdd';
import commodityList from './commodityList';
import finance from './finance';
import orderSales from './orderSales';
import order from './order';
import productTpl from './productTpl';
import secretPriceSetting from './secretPriceSetting';
import stockAccount from './stockAccount';
import stockCard from './stockCard';
import stockList from './stockList';
import userPermission from './userPermission';
import supplyReview from './supplyReview';
import userAccount from './userAccount';

export default combineReducers({
  routing: routerReducer,
  nprogress,
  Receive,
  account,
  commodityAdd,
  commodityList,
  finance,
  orderSales,
  order,
  productTpl,
  secretPriceSetting,
  stockAccount,
  stockCard,
  stockList,
  userPermission,
  supplyReview,
  userAccount
});
