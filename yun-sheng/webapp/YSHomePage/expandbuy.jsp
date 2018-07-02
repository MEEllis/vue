<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>
    <script src="<%=basePath%>/js/expandbuy.js"></script>
    <link rel="stylesheet" href="<%=basePath%>/css/expandbuy.css"/>
    <title>体验及购买</title>
</head>
<body>
<jsp:include  page="include/navbar.jsp"/> 
<img id="prBanner" src="<%=basePath%>/img/cpfwban.jpg" alt=""/>
<div class="lg-container">
    <div class="row">
        <div id="freeExp" class="col-md-4">
            <img src="<%=basePath%>/img/pr1.png" alt=""/>
        </div>
        <div id="freeExps" class="col-md-8">
            <div id="freeExpss" class="row">
                <div class="col-md-4 col-xs-4 col-sm-4"><span></span> 不了解具体操作？</div>
                <div class="col-md-4 col-xs-4 col-sm-4"><span></span> 不知道功能是否全面？</div>
                <div class="col-md-4 col-xs-4 col-sm-4"><span></span> 不确定是否适合本企业？</div>
            </div>
            <div class="row">
                <div style="text-align: center" class="col-md-12">没关系，现在来免费体验一下吧！</div>
            </div>
        </div>
    </div>
    <div id="bor" class="row">
        <div class="col-md-5">
            <form action="" id="form1">
                <p>申请试用</p>
                <div class="row">
                    <div class="col-md-2"><label for="">企业名称：</label></div><div class="col-md-10"><input id="business1" name="business" type="text"/></div>
                </div>
                <div class="row">
                    <div class="col-md-2"><label for="">店面数量：</label></div><div class="col-md-10"><input id="shopNum1" name="shopNum" type="number"/></div>
                </div>
                <div class="row">
                    <div class="col-md-2"><label for="">所在地区：</label></div><div class="col-md-10"><input id="regionName1" name="regionName" type="text"/></div>
                </div>
                <div class="row">
                    <div class="col-md-2"><label for="">联 系 人：</label></div><div class="col-md-10"><input id="contacts1" name="contacts" type="text"/></div>
                </div>
                <div class="row">
                    <div class="col-md-2"><label for="">联系电话：</label></div><div class="col-md-10"><input id="telnum1" name="telnum" type="tel"/></div>
                </div>
                 <div class="row">
                    <div class="col-md-12"><button id="apply" type="button" onclick="save(0)">立即申请</button></div>
                </div>
            </form>
        </div>
        <div id="shuxian" class="col-md-2 hidden-sm hidden-xs">
            <img src="<%=basePath%>/img/shuxian.png" alt=""/>
        </div>
        <div id="kefu" class="col-md-5">
            <b>在线申请</b>
            <p>直接联系客服吧！</p>
            <button type="button"><span class="glyphicon glyphicon-headphones"></span> 客服1</button>
            <button type="button"><span class="glyphicon glyphicon-headphones"></span> 客服2</button>
            <button type="button"><span class="glyphicon glyphicon-headphones"></span> 客服3</button>
        </div>
    </div>
</div>
<div id="zjgm">
    <div class="lg-container">
        <div class="row">
            <div id="zjImg" class="col-md-6">
                <img src="<%=basePath%>/img/pr2.png" alt=""/>
            </div>
            <div class="col-md-6">
                <form action="" id="form2">
                    <p>申请购买</p>
                   <div class="row">
                    <div class="col-md-2"><label for="">企业名称：</label></div><div class="col-md-10"><input id="business2" name="business" type="text"/></div>
                </div>
                <div class="row">
                    <div class="col-md-2"><label for="">店面数量：</label></div><div class="col-md-10"><input id="shopNum2" name="shopNum" type="number"/></div>
                </div>
                <div class="row">
                    <div class="col-md-2"><label for="">所在地区：</label></div><div class="col-md-10"><input id="regionName2" name="regionName" type="text"/></div>
                </div>
                <div class="row">
                    <div class="col-md-2"><label for="">联 系 人：</label></div><div class="col-md-10"><input id="contacts2" name="contacts" type="text"/></div>
                </div>
                <div class="row">
                    <div class="col-md-2"><label for="">联系电话：</label></div><div class="col-md-10"><input id="telnum2" name="telnum" type="text"/></div>
                </div>
                    <div class="row">
                        <div class="col-md-12"><button id="apply" type="button" onclick="save(1)">立即申请</button></div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<div id="pq" class="lg-container table-responsive">
    <p>产品报价单</p>
    <hr/>
    <b>Product quotation</b>
    <table class="table">
        <thead>
        <tr>
            <td>功能大项</td>
            <td>功能模块</td>
            <td>许可价</td>
            <td>计价类型</td>
        </tr>
        </thead>
        <tbody>
        <tr style="background: #eee;">
            <td rowspan="11">供应链</td>
            <td class="hasSon">采购管理</td>
            <td rowspan="22">供应链+CRM<br />90元/月<br /><br /><br />供应链+财务功能+CRM<br />100元/月</td>
            <td rowspan="22">许可数</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">售后管理</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">价格管理</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">报表中心</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">仓储管理</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">采购管理</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">销售管理</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">零售管理</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">促销管理</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">资金往来</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">会员管理</td>
        </tr>

        <tr style="background: #eee;">
            <td rowspan="3">财务功能</td>
            <td class="hasSon">财务管理</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">固定资产管理</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">费用预算</td>
        </tr>

        <tr style="background: #eee;">
            <td rowspan="8">CRM</td>
            <td class="hasSon">客户查询</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">直销管理</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">渠道管理</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">销售管理</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">客户服务</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">经理工作</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">财务工作</td>
        </tr>
        <tr style="background: #eee;">
            <td class="hasSon">产品管理</td>
        </tr>

        <tr>
            <td rowspan="7">OA协同</td>
            <td class="hasSon">信息交流</td>
            <td rowspan="16">9000元/套</td>
            <td rowspan="16">许可数</td>
        </tr>
        <tr>
            <td class="hasSon">公文档案</td>
        </tr>
        <tr>
            <td class="hasSon">个人事务</td>
        </tr>
        <tr>
            <td class="hasSon">信息发布</td>
        </tr>
        <tr>
            <td class="hasSon">行政管理</td>
        </tr>
        <tr>
            <td class="hasSon">知识管理</td>
        </tr>
        <tr>
            <td class="hasSon">流程管理</td>
        </tr>

        <tr>
            <td rowspan="9">人力资源</td>
            <td class="hasSon">人事档案</td>
        </tr>
        <tr>
            <td class="hasSon">绩效考核</td>
        </tr>
        <tr>
            <td class="hasSon">招聘管理</td>
        </tr>
        <tr>
            <td class="hasSon">合同管理</td>
        </tr>
        <tr>
            <td class="hasSon">考勤管理</td>
        </tr>
        <tr>
            <td class="hasSon">薪资管理</td>
        </tr>
        <tr>
            <td class="hasSon">社保管理</td>
        </tr>
        <tr>
            <td class="hasSon">培训管理</td>
        </tr>
        <tr>
            <td class="hasSon">人事分析</td>
        </tr>
        
        <tr style="background: #eee;">
            <td>盘点机</td>
            <td colspan="2" class="hasSon">1860元/台</td>
            <td>设备数量</td>
        </tr>
        </tbody>
    </table>
    <div id="son" style="display: none;">111</div>
</div>
<div id="sonCon" style="display: none;">
    <p>采购订单  采购入库单  采购退货单  采购换货单  供应商保价单  供应商返利单  委托入库单  委托退货单  委托商品调价单  委托结算单  委托结算单  采购计划申请  补退货需求分析  采购计划申请流程管理</p>
    <P>会员类型  登记管理  积分管理  储值管理  会员促销  会员管理  会员特殊日期提醒  会员短信群发</P>
    <P>同价调拨发货单  变价调拨发货单  公司库存销量上报  公司库存销量统计  退补货需求分析  库存串号变更单  库存周转分析  调拨接收确认  借入转采购  借出还回单  借出转销售  其他出库单  盘点单  报损单  库存警报  售后管理  借入归还单  借出单  移库单  报溢单  借入单</P>
    <p>收款  付款  预收款  预付款  其它收款单  其它付款单  内部转账单  应收应付调整  往来结算</p>
    <p>零售特价促销  零售赠品促销  零售打折促销  零售让利促销  零售商品组合  零售促销优先级控制  批发特价促销  批发赠品促销  批发打折促销  批发让利促销  批发商品组合  促销方案管理  促销组合拆分  批发促销优先级控制</p>
    <p>零售订单  零售单  零售退货单  零售换货单  营业对账缴款单  门店退补货申请  门店库存销量上报</p>
    <p>销售订单  销售单  销售退货单  销售换货单  客户价保单  客户返利单  委托出库单  委托退货单  委托商品调价单  委托结算单</p>

    <p>凭证填制  凭证管理  凭证生成  收入、费用分摊  期间损益结转  记账  预记账  月末结账  会计报表</p>
    <p>费用预算录入  费用预算执行  费用预算查询  费用预算导入和调整  费用预算分析</p>
    <p>新增资产  卡片管理  卡片打印  资产变动单  资产处置  折旧与摊销  资产盘点</p>

    <p>用户管理  组织管理  职务管理  权限管理  流程管理  表单管理  系统设置  回收站  日志管理  短信管理  群组管理  公文设置  报表管理</p>
    <p>电子邮件  内部论坛  调查问卷  内部博客</p>
    <p>收文管理  发文管理  请示管理  档案管理</p>
    <p>工作日记  工作日程  工作任务  个人计划  关注点  我的便笺  通讯录  我的考勤  我的工资  我的档案  我的表现  我的培训  我的客户  我的报表  我的会议</p>
    <p>公告栏  信息发布设置工具</p>
    <p>会议管理  车辆管理  资产管理  图书管理  制度管理  工作督导  责任状  印章管理</p>
    <p>知识管理  我的订阅  我的知识  知识地图  全文检索  知识排行</p>
    <p>发起流程  流程查询  流程监控  流程管理  流程分析  表单应用  内部协同</p>

    <p>客户查询  联系人查询  公共客户池  无效客户池</p>
    <p>在谈代理  终端客户  签约代理  过期代理</p>
    <p>销售机会  销售报价  销售单  执行单  销售合同  工作分析  销售计划</p>
    <p>成交客户审核  成交客户  客服查询  客服管理  回访查询  回访管理</p>
    <p>直销管理  代理管理  终端客户管理  联系人管理  机会管理  员工工作  报价管理  销售单管理  合同管理  执行单管理  计划制定</p>
    <p>出纳收款  应收查询</p>
    <p>产品管理  需求缺陷查询  需求缺陷管理</p>
    <p>客户模型分析  机会模型分析  客户分类  客户行业分布  客户区域分布  产品分析</p>
    <p>属性设置  类型模板</p>
    <p>个人设置</p>

    <p>人事总体分析  员工结构分析  本月员工变动分析  本月员工考勤分析</p>
    <p>培训管理  题库管理  试卷管理  成绩管理</p>
    <p>社保类型  社保计算  社保缴纳  社保人员  社保汇总  社保查询</p>
    <p>工资管理  工资核算  套账设置</p>
    <p>考勤管理  考勤更正  申诉处理  考勤设置</p>
    <p>合同新签  合同操作  合同管理  合同台帐  合同设置  合同报警</p>
    <p>招聘计划查询  招聘计划管理  简历管理  招聘统计  招聘设置</p>
    <p>员工表现录入  员工表现管理  考核查询  考核管理  考核汇总  考核设置</p>
    <p>在职管理  离职管理  异动管理  档案维护  档案统计  档案设置  定岗定编</p>

    <p>盘点单</p>
    <p>调拨发货  调拨接收</p>
    <p>移库单</p>
    <p>会员  零售单  零售换货  零售退货</p>
    <p>实时库存  串号跟踪  库存分布  销售统计  销售排行  营业清单  出入库统计</p>
</div>
<jsp:include  page="include/foot.jsp"/> 





