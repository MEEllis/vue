webpackJsonp([17],{1500:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(30),r=n(566),s=n(1616),u=function(e){return e&&e.__esModule?e:{default:e}}(s),a=n(338),o=function(e){return e.userPermission.getSubAccountPermissionListResult||[]},l=(0,r.createSelector)([o],function(e){if(!e.Data)return!1;var t={dataSource:[]};return e.Data.map(function(e){var n={id:e.PermissionId,name:e.PermissionName,parentId:e.Pid,unique:e.Category,isAuth:e.IsAirvable,desc:e.Extend};t.dataSource.push(n)}),t}),c=function(e){return{getSubAccountPermissionListResult:l(e),setSubAccountPermissionResult:e.userPermission.setSubAccountPermissionResult}};t.default=(0,i.connect)(c,{getSubAccountPermissionList:a.getSubAccountPermissionList,setSubAccountPermission:a.setSubAccountPermission})(u.default),e.exports=t.default},1616:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,r,s=(n(67),n(60)),u=_interopRequireDefault(s),a=(n(216),n(172)),o=_interopRequireDefault(a),l=(n(571),n(217)),c=_interopRequireDefault(l),d=n(568),f=_interopRequireDefault(d),p=n(574),m=_interopRequireDefault(p),h=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),v=n(0),y=_interopRequireDefault(v),b=n(4),g=_interopRequireDefault(b),P=n(31),S=n(1677),_=_interopRequireDefault(S),R=n(59),A=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(R);n(1688);var k=(r=i=function(e){function AccountPermission(e){_classCallCheck(this,AccountPermission);var t=_possibleConstructorReturn(this,(AccountPermission.__proto__||Object.getPrototypeOf(AccountPermission)).call(this,e));return t.onHandleChange=function(e,n,i,r){var s=n.target.checked,u=t.state.permissions;u[i.unique]=s,t.setState({permissions:u});var a=t.refs;a[e]&&(a[e].style.display="block"===a[e].style.display?"none":"block"),n.target.checked||(t.cancelChildrenCheck(i),t.permissions=(0,m.default)(t.state.permissions),3===i.level&&t.cancelParentChecked(r),t.setState({permissions:t.permissions})),n.target.checked&&3===i.level&&t.checkParent(r)},t.checkParent=function(e){var n=t.state.permissions;n[e.unique]=!0,n[(0,f.default)(t.props.getSubAccountPermissionListResult.dataSource,{id:e.parentId}).unique]=!0,t.setState({permissions:n})},t.cancelParentChecked=function(e){if(e&&e.children&&e.children.length>0){var n=!0,i=!1,r=void 0;try{for(var s,u=e.children[Symbol.iterator]();!(n=(s=u.next()).done);n=!0){var a=s.value;if(t.permissions[a.unique])return}}catch(e){i=!0,r=e}finally{try{!n&&u.return&&u.return()}finally{if(i)throw r}}t.permissions[e.unique]=!1;var o=(0,f.default)(t.props.getSubAccountPermissionListResult.dataSource,{id:e.parentId});if(o){var l=[],c=!0,d=!1,p=void 0;try{for(var m,h=t.props.getSubAccountPermissionListResult.dataSource[Symbol.iterator]();!(c=(m=h.next()).done);c=!0){var v=m.value;v.parentId===o.id&&l.push(v)}}catch(e){d=!0,p=e}finally{try{!c&&h.return&&h.return()}finally{if(d)throw p}}t.cancelParentChecked({id:o.id,unique:o.unique,children:l})}}},t.handleSubmit=function(){var e=[],n=!0,i=!1,r=void 0;try{for(var s,u=t.props.getSubAccountPermissionListResult.dataSource[Symbol.iterator]();!(n=(s=u.next()).done);n=!0){var a=s.value;t.state.permissions[a.unique]&&e.push(a.id)}}catch(e){i=!0,r=e}finally{try{!n&&u.return&&u.return()}finally{if(i)throw r}}t.props.setSubAccountPermission({RoleId:t.props.params.openid,PermissionIds:e})},t.state={permissions:{},treeData:[],permissinsIcon:{product:A.product,api:A.cloud,user:A.users,financeFund:A.fund,finance:A.finances,financeList:A.finance,financeVerify:A.verify,financeRemittanceList:A.remittance,operation:A.operation,commodity:A.commodity,stock:A.stock,sup:A.sup,ordersList:A.orders,salesList:A.xiaoshoumingxi,salseService:A.shouhoufuwu,userList:A.user,userSafety:A.safety,userInfo:A.info,subManage:A.gonghuoguanli,subReview:A.gonghuoshenghe,priceList:A.shezimijia,orderManage:A.orders,FinanceWithDrawList:A.tixianjilu,visible:!1}},t}return _inherits(AccountPermission,e),h(AccountPermission,[{key:"componentWillMount",value:function(){this.props.getSubAccountPermissionList({RoleId:this.props.params.openid})}},{key:"componentWillReceiveProps",value:function(e){var t=e.getSubAccountPermissionListResult,n=e.setSubAccountPermissionResult;if(t!==this.props.getSubAccountPermissionListResult)if("500"===t.Status)P.browserHistory.push("/user/account");else{var i=t.dataSource;this.permissonTree=(0,_.default)(i,"");var r={},s=!0,u=!1,a=void 0;try{for(var o,l=i[Symbol.iterator]();!(s=(o=l.next()).done);s=!0){var c=o.value;r[c.unique]=c.isAuth}}catch(e){u=!0,a=e}finally{try{!s&&l.return&&l.return()}finally{if(u)throw a}}this.setState({permissions:r})}n!==this.props.setSubAccountPermissionResult&&200===n.Status&&setTimeout(function(){P.browserHistory.push({pathname:"/user/account"})},3e3)}},{key:"cancelChildrenCheck",value:function(e){if(e.children.length>0){for(var t=e.children,n=this.state.permissions,i=0,r=t.length;i<r;i+=1){for(var s in n)n[t[i].unique]=!1;this.refs[t[i].id]&&(this.refs[t[i].id].style.display="none"),this.cancelChildrenCheck(t[i])}this.setState({permissions:n})}}},{key:"childrenList",value:function(e,t,n){var i=this,r=[],s=this.state.permissions;return e.map(function(t){e.length>0&&r.push(y.default.createElement("li",{className:"parent",key:t.id},y.default.createElement(c.default,{checked:s[t.unique],onChange:function(n){i.onHandleChange(t.id,n,t,e)}},t.name),t.desc?y.default.createElement(o.default,{title:y.default.createElement("div",{dangerouslySetInnerHTML:{__html:t.desc}}),placement:"right"}," ",y.default.createElement(A.default,{glyph:A.jinggao})):"",t.children.length>0?i.childrenList(t.children,t.id,t.isAuth):""))}),y.default.createElement("ul",{style:{marginLeft:"20px",display:n?"block":"none"},ref:t},r)}},{key:"findChildren",value:function(e){var t=this;if(e){var n=[];return e.map(function(e){n.push(y.default.createElement("div",{key:e.id,className:"permission-item"},y.default.createElement("div",{className:"firstClass"},y.default.createElement(A.default,{glyph:t.state.permissinsIcon[e.unique]}),y.default.createElement("span",{style:{marginLeft:"20px",fontSize:"15px",fontWeight:"600"}},e.name)),e.children.map(function(e){return y.default.createElement("div",{key:e.id},y.default.createElement("div",null,y.default.createElement("div",{className:"secondClass"},y.default.createElement(A.default,{glyph:t.state.permissinsIcon[e.unique]}),y.default.createElement("span",{style:{marginLeft:"20px"}},e.name))),e.children.map(function(n){return y.default.createElement("ul",{key:n.id,className:"threeClass"},y.default.createElement("li",{className:"parent"},y.default.createElement(c.default,{checked:t.state.permissions[n.unique],onChange:function(i){t.onHandleChange(n.id,i,n,e)}},n.name),n.desc?y.default.createElement(o.default,{title:y.default.createElement("div",{dangerouslySetInnerHTML:{__html:n.desc}}),placement:"right"}," ",y.default.createElement(A.default,{glyph:A.jinggao})):"",n.children.length>0?t.childrenList(n.children,n.id,n.isAuth):""))}))})))}),n}}},{key:"render",value:function(){var e=this.permissonTree;return y.default.createElement("div",{className:"permission"},y.default.createElement("div",{className:"permission-action permission-hd"},y.default.createElement(u.default,{onClick:function(){P.browserHistory.push("/user/account")}},"返回"),y.default.createElement(u.default,{type:"primary",onClick:this.handleSubmit},"保存")),y.default.createElement("div",{className:"permission-bd"},this.findChildren(e)),y.default.createElement("div",{className:"permission-action permission-ft"},y.default.createElement(u.default,{onClick:function(){P.browserHistory.push("/user/account")}},"返回"),y.default.createElement(u.default,{type:"primary",onClick:this.handleSubmit},"保存")))}}]),AccountPermission}(y.default.Component),i.propTypes={getSubAccountPermissionList:g.default.func.isRequired,setSubAccountPermission:g.default.func.isRequired,getSubAccountPermissionListResult:g.default.shape({dataSource:g.default.array.isRequired}),setSubAccountPermissionResult:g.default.shape({Status:g.default.string.isRequired})},i.defaultProps={addSubAccountResult:void 0,getSubAccountPermissionListResult:void 0,setSubAccountPermissionResult:void 0},r);t.default=k,e.exports=t.default},1677:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(574),r=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=function(e,t){var n=(0,r.default)(e);n&&n.length>0&&n[0].sort&&n.sort(function(e,t){if(e.sort&&t.sort){if(e.sort<t.sort)return-1;if(e.sort>t.sort)return 1}return 0});var i={},s=void 0,u=[];for(var a in n)n[a].children=[],i[n[a].id]=a;for(var o in n)s=n[o],s.parentId!==t?n[i[s.parentId]]&&n[i[s.parentId]].children.push(s):u.push(n[o]);return function getLevel(e,t){for(var n in e)e[n].level=t,e[n].children&&e[n].children.length>0&&getLevel(e[n].children,t+1)}(u,1),u},e.exports=t.default},1688:function(e,t){}});