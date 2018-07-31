import React from 'react';
import PropTypes from 'prop-types';
import '../less/icon.less';
import logo from '../images/kacang.svg';

// Menu Icon
import product from '../images/product.svg';
import cloud from '../images/cloud.svg';
import tmall from '../images/tmall.svg';
import card from '../images/card.svg';
import purchase from '../images/purchase.svg';

import operation from '../images/operation.svg';
import commodity from '../images/commodity.svg';
import stock from '../images/stock.svg';
import sup from '../images/sup.svg';
import orders from '../images/orders.svg';
import report from '../images/report.svg';
import service from '../images/service.svg';

import users from '../images/users.svg';
import user from '../images/user.svg';
import safety from '../images/safety.svg';
import info from '../images/info.svg';
import kuaisucaigou from '../images/kuaisucaigou.svg';
import finances from '../images/finances.svg';
import fund from '../images/fund.svg';
import finance from '../images/finance.svg';
import verify from '../images/verify.svg';
import remittance from '../images/remittance.svg';
import pay from '../images/pay.svg';

// 首页 Icon
import triangle from '../images/triangle.svg';
import fold from '../images/fold.svg';
import retract from '../images/retract.svg';

import search from '../images/search.svg';

import mail from '../images/mail.svg';
import message from '../images/message.svg';
import username from '../images/username.svg';
import balance from '../images/balance.svg';

// 表格项操作图标
import iGrounding from '../images/shangjia.svg';          // 上架
import iUndercarriage from '../images/xiajia.svg';          // 下架
import iAdd from '../images/add.svg';             // 增加
import iDelete from '../images/delete.svg';       // 删除
import iEdit from '../images/edit.svg';           // 编辑
import iView from '../images/view.svg';           // 查看
import iImport from '../images/import.svg';       // 导入
import iExport from '../images/export.svg';       // 导出
import iEnabled from '../images/enabled.svg';     // 启用
import iDisabled from '../images/disabled.svg';   // 禁用
import iShelve from '../images/shelve.svg';       // 上架
import iUnshelve from '../images/unshelve.svg';   // 下架
import iConnect from '../images/connect.svg';     // 对接
import iUnconnect from '../images/unconnect.svg'; // 断开对接
import iConnectRecover from '../images/connect-recover.svg';  // 恢复对接
import iSetting from '../images/setting.svg';     // 设置
import iRelevance from '../images/relevance.svg'; // 关联
import iViewList from '../images/view-list.svg';  // 列表
import iComplain from '../images/complain.svg';   // 投诉
import iApply from '../images/apply.svg';     // 申请
import iBatch from '../images/batch.svg';     // 批量处理
import iPost from '../images/post.svg';       // 发布到新商品
import iPostTo from '../images/postto.svg';   // 发布到已有商品
import iComplainFailed from '../images/complain-failed.svg'; // 投诉失败
import iComplainComplete from '../images/complain-complete.svg'; // 投诉已完成
import iComplainFreeze from '../images/complain-freeze.svg'; // 投诉冻结
import iApplyPurchase from '../images/apply-purchase.svg'; // 已申请进货
import iAgreePurchase from '../images/agree-purchase.svg'; // 同意供货

import buchong from '../images/buchong.svg'; // 补充
import chakan from '../images/chakan.svg'; // 查看
import chuli from '../images/chuli.svg'; // 处理
import chulizhong from '../images/chulizhong.svg'; // 处理中
import weichuli from '../images/weichuli.svg'; // 未处理
import zaicitousu from '../images/zaicitousu.svg'; // 再次投诉
import shezhimijia from '../images/shezhimijia.svg'; // 设置密价
import qingchumijia from '../images/qingchumijia.svg'; // 清除密价
import daozhanghao from '../images/daozhanghao.svg'; // 导帐号
import zhanghaoliebiao from '../images/zhanghaoliebiao.svg'; // 帐号列表
import daokami from '../images/daokami.svg'; // 导卡密
import kamiliebiao from '../images/kamiliebiao.svg'; // 卡密列表
import daorukucun from '../images/daorukucun.svg'; // 导入库存
import quyuliebiao from '../images/quyuliebiao.svg'; // 区域列表
import guanbi from '../images/guanbi.svg'; // 关闭
import kaiqi from '../images/kaiqi.svg'; // 开启
import kuanxiang from '../images/kuanxiang.svg'; // 款项
import chushihuamisi from '../images/chushihuamisi.svg'; // 初始化秘钥
import yonghuxiangqing from '../images/yonghuxiangqing.svg'; // 用户详情

// usercenter and usersafety
import password from '../images/password.svg';
import cellphone from '../images/cellphone.svg';
import hardware from '../images/hardware.svg';
import wechat from '../images/wechat.svg';
import ip from '../images/IP.svg';
// import iAgreePurchase from './images/agree-purchase.svg'
import xiaoshoumingxi from '../images/xiaoshoumingxi.svg';

import jinggao from '../images/jinggao.svg';

// 认证页(Confirmation)
import qq from '../images/qq.svg';             // QQ
import tel from '../images/tel.svg';           // 电话
import warning from '../images/warning.svg';   // 感叹号
import viewPic from '../images/viewPic.svg';   // 放大镜

// const Icon = ({ glyph, className = 'icon', width = 1, height = 1 }) => (
//   <svg className={className} width={width} height={height}>
//     <use xlinkHref={glyph} />
//   </svg>
// );

const Icon = ({ glyph, className, width, height }) => (
  <svg className={className} width={width} height={height} viewBox={glyph.viewBox}>
    <use xlinkHref={`#${glyph.id}`} />
  </svg>);

Icon.propTypes = {
  glyph: PropTypes.shape().isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

Icon.defaultProps = {
  glyph: {},
  className: 'icon',
  width: 1,
  height: 1
};

export { default as gonghuoguanli } from '../images/gonghuoguanli.svg';
export { default as gonghuoshenghe } from '../images/gonghuoshenghe.svg';
export { default as shezimijia } from '../images/shezimijia.svg';
export { default as shouhoufuwu } from '../images/shouhoufuwu.svg';
export { default as tixianjilu } from '../images/tixianjilu.svg';
export { default as gou } from '../images/gou.svg';
export { default as tingzhigonghuo } from '../images/tingzhigonghuo.svg';
export { default as shenhe } from '../images/shenhe.svg';

export { default as qingchu } from '../images/qingchu.svg';
export { default as yidong } from '../images/yidong.svg';
export { default as sanchu } from '../images/sanchu.svg';
export { default as copy } from '../images/copy.svg';
export { default as excel } from '../images/excel.svg';



export {
  logo,
  product,
  cloud,
  tmall,
  card,
  purchase,
  xiaoshoumingxi,
  operation,
  commodity,
  stock,
  sup,
  orders,
  report,
  service,
  users,
  user,
  safety,
  info,

  finances,
  fund,
  finance,
  verify,
  remittance,
  pay,
  kuaisucaigou,
  triangle,
  fold,
  retract,
  search,
  mail,
  message,
  username,
  balance,

  iAdd,
  iDelete,
  iEdit,
  iGrounding,
  iUndercarriage,
  iView,
  iImport,
  iExport,
  iEnabled,
  iDisabled,
  iShelve,
  iUnshelve,
  iConnect,
  iUnconnect,
  iConnectRecover,
  iSetting,
  iRelevance,
  iViewList,
  iComplain,
  iApply,
  iBatch,
  iPost,
  iPostTo,

  iComplainFailed,
  iComplainComplete,
  iComplainFreeze,
  iApplyPurchase,
  iAgreePurchase,

  password,
  cellphone,
  hardware,
  wechat,
  ip,

  buchong,
  chakan,
  chuli,
  chulizhong,
  weichuli,
  zaicitousu,
  shezhimijia,
  qingchumijia,
  daozhanghao,
  zhanghaoliebiao,
  daokami,
  kamiliebiao,
  daorukucun,
  quyuliebiao,
  guanbi,
  kaiqi,
  kuanxiang,
  chushihuamisi,
  yonghuxiangqing,
  jinggao,

  qq,
  tel,
  warning,
  viewPic,

};
export default Icon;
