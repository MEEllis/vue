<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>
	<link rel="stylesheet" href="${basePath}/css/inventory/retail/cashier.css?v=${version}"/>
	<script src="${basePath}/js/inventory/retail/cashier.js?v=${version}"></script>
    <title>收银台</title>
    <script>
    	var userSecName = '${user.sectionName}';
    	var userSecId = '${user.sectionId}';
    </script>
<style>
	.none{
		display:none;
	}
</style>
    </head>
<body>
	<div class="none" id="MENU_CODE">LSKD,LSTHD,LSDJD,LSTDD</div>
    <input type="hidden" id="AUTH" data-code="LSKD" />
    <!----------------切换表格---------------------->
    <div class="well">
    	<form id="navFrom" class="form-inline">
   			<div class="form-group col-sm-4">
                <label class="width-25">日期：</label>
                <div class="input-group col-sm-8">
                   	<input type="text" class="dateInp startTime" >一
		      		<input type="text" class="dateInp endTime" >
		      	</div>
		    </div>
		    <div class="form-group col-sm-3">
                <label class="width-25">门店：</label>
                   	<div class="input-group col-sm-8">
                   	<input type="text" class="form-control" id="storeInp" placeholder="请选择门店" />
                </div>
            </div>
            <div class="form-group col-sm-3 tab3">
               <label class="width-25">营业员：</label>
               <div class="input-group col-sm-8">
                   	<input type="text" class="form-control" id="saleInp" placeholder="请选择营业员" />
                  	</div>
               </div>
            <div class="form-group col-sm-3 tab1">
                <label class="width-25">商品类别：</label>
                <div class="input-group col-sm-8">
                   	<input type="text" class="form-control goodsType" value="" />
                </div>
            </div>
            <div class="form-group col-sm-2">
               <label for="isRed"><input type="checkbox" id="isRed" class="isRed" >包含红冲单据</label><br />
               <label for="isDebt" class="spantab1"><input type="checkbox" id="isDebt" class="isDebt" >显示欠款</label>
            </div>
            <div class="form-group col-sm-4 tab1">
               <label class="width-25">商品：</label>
               <div class="input-group col-sm-8">
                  	<input type="text" class="form-control" id="goodsInp" placeholder="多选" />
               	</div>
            </div>  
		    <div class="form-group col-sm-3 tab1">
			    <label class="width-25">搜索：</label>
                <div class="input-group col-sm-8">
                   	<input type="text" class="form-control imeis" placeholder="串号、单号、备注" />
                </div>
		    </div>
		    <div class="form-group col-sm-4 tab3">
			    <label class="width-25">单据信息：</label>
                <div class="input-group col-sm-8">
                   	<input type="text" class="form-control CodeRemark" placeholder="单据号、备注" />
                </div>
		    </div>
		    <div class="form-group col-sm-3">
                <label class="width-25">客户：</label>
                <div class="input-group col-sm-8">
                   	<input type="text" class="form-control names" placeholder="姓名、手机号、会员卡号" />
                </div>
            </div>
			<div class="form-group col-sm-4">
				<label class="width-25">稽核状态：</label>
				<div class="input-group col-sm-8">
					<select id="auditStatus" class="form-control">
						<option value="">所有</option>
						<option value="0">未稽核</option>
						<option value="1">已稽核</option>
					</select>
				</div>
			</div>
            <div class="form-group col-sm-3 tab3"></div>
            <div class="form-group col-sm-2 fr">
        		<button type="button" class="btn search B_LSKD_0002 B_LSTHD_0002 B_LSDJD_0008 B_LSTDD_0009 none" name="1">查询</button>
        		<button type="button" class="btn reset">重置</button>
            </div>
        </form>
    </div>
    
	<div class="ystnav">
		<ul id="myTab" class="nav nav-tabs">
			<li class="active">
				<a href="#Tab1" data-toggle="tab" class="retail">零售单</a>
			</li>
			<li>
				<a href="#Tab2" data-toggle="tab" data-flag="false" class="recede">退货单</a>
			</li>
			<li>
				<a href="#Tab3" data-toggle="tab" data-flag="false" class="handsel">定金单</a>
			</li>
		</ul>
		<div id="myTabContent" class="tab-content pageList">
			<div class="tab-pane in active" id="Tab1">
				<div class="btnNav">
					注：<i class="blue">蓝色数据可操作</i>
					<button type="button"  class="btn retailExport none B_LSKD_0026">导出</button>
					<button type="button" class="btn newRetail none B_LSKD_0007">新开单</button>
		  			<button type="button" class="btn retailReturn none B_LSTHD_0010">本单退货</button>
		  			<button type="button" class="btn debt  none B_LSKD_0015">收回欠款</button>
		  			<button type="button" class="btn retailCope none B_LSKD_0014">复制一单</button>
		  			<button type="button" class="btn retailRed none B_LSKD_0018">红冲</button>
		  			<button type="button" data-auditStatus="1"    data-billsType="45" class="btn listAudit none B_LSKD_0023">稽核</button>
		  			<button type="button" data-auditStatus="0"   data-billsType="45" class="btn listAudit none B_LSKD_0024">取消稽核</button>
					<button type="button" data-menuCode="LSKD" class="btn voucher none B_LSKD_0025">生成凭证</button>
				 </div>
				<div class="jqGrid_wrap">
					<table id="retailGrid" class="zxsaastable"></table> 
    				<div id="jqGridPager_retail"></div>
				</div>
			</div>
			<div class="tab-pane" id="Tab2">
				<div class="btnNav">
					注：<i class="blue">蓝色数据可操作</i>
					<button type="button"  class="btn retailExport none B_LSTHD_0025">导出</button>
					<button type="button" class="btn newRecede none B_LSTHD_0007">新开单</button>
		  			<button type="button" class="btn recedeCope none B_LSTHD_0013">复制一单</button>
		  			<button type="button" class="btn recedeRed none B_LSTHD_0018">红冲</button>
					<button type="button" data-auditStatus="1" data-billsType="46"  class="btn listAudit none B_LSTHD_0022">稽核</button>
					<button type="button" data-auditStatus="0" data-billsType="46"  class="btn listAudit none B_LSTHD_0023">取消稽核</button>
					<button type="button" data-menuCode="LSTHD" class="btn voucher none B_LSDJD_0021">生成凭证</button>
				 </div>
				<div class="jqGrid_wrap">
					<table id="recedeGrid" class="zxsaastable"></table> 
    				<div id="jqGridPager_recede"></div>
				</div>
			</div>
			<div class="tab-pane" id="Tab3">
				<div class="btnNav">
					注：<i class="blue">蓝色数据可操作</i>
					<button type="button"  class="btn retailExport none B_LSDJD_0022">导出</button>
					<button type="button" class="btn newHandsel none B_LSDJD_0012">新开单</button>
		  			<button type="button" class="btn handselReturn none B_LSTDD_0010">本单退定</button>
		  			<button type="button" class="btn handselCopy none B_LSDJD_0016">复制一单</button>
		  			<button type="button" class="btn handselRed none B_LSTDD_0013">红冲退定单</button>
					<button type="button" data-auditStatus="1" data-billsType="48" class="btn listAudit none B_LSTDD_0023">稽核</button>
					<button type="button" data-auditStatus="0"  data-billsType="48" class="btn listAudit none B_LSTDD_0024">取消稽核</button>
					<button type="button" data-menuCode="" class="btn voucher none B_LSTDD_0024">生成凭证</button>
		  			<div class="selectNav" style="right:30px;">
					 	<div>
					 		<i>单据类型：</i>
					 		<select class="handselBill">
					 			<option value="0">所有</option>
					 			<option value="48">定金单</option>
					 			<option value="50">退定单</option>
					 		</select>
					 	</div>
					 	<div>
					 		<i>退定：</i>
					 		<select class="handselRemand">
					 			<option value="0">所有</option>
					 			<option value="1">有退定</option>
					 			<option value="2">无退定</option>
					 		</select>
					 	</div>
					 	<div>
					 		<i>完成：</i>
					 		<select class="handselSure">
					 			<option value="0">所有</option>
					 			<option value="1">已完成</option>
					 			<option value="2">未完成</option>
					 		</select>
					 	</div>
					 </div>
				 </div>
				<div class="jqGrid_wrap">
					<table id="handselGrid" class="zxsaastable"></table> 
    				<div id="jqGridPager_handsel"></div>
				</div>
			</div>
		</div>
	</div>
	<form id="billsModalForm" class="none">
		<input type="hidden" name="auditStatus">
		<input type="hidden" name="orderId">
		<input type="hidden" name="id">
		<input type="hidden" name="billsStatus">
	</form>
<!-- 单据Modal -->
<div class="modal fade" id="billsModal" tabindex="-1" role="dialog" aria-labelledby="">
  <div class="modal-dialog wmodal" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="">单据编号：<i class="bills"></i><i class="oldbills"></i></h4>
      </div>
      <div class="modal-body">
       	<div class="modalMes">

       		<P><span>业务日期：</span><i class="BbillsDate"></i></P>
			<P><span>往来单位：</span><i class="BunitName"></i></P>
       		<P><span>门店：</span><i class="BsectionName"></i></P>
       		<P><span>营业员：</span><i class="BmanagerName"></i></P>
       		<P><span>客户电话：</span><i class="BmemberTelephone"></i></P>
       		<P><span>客户姓名：</span><i class="BmemberName"></i></P>
       		
       		<div class="mespDiv">
	       		<P class="mescolorp"><font class="billyt">应收</font>：<i class="BtotGoodsAmount"></i></P>
	       		<P>总金额：<i class="BtotAmount"></i></P>
	       		<P>分期贷款金额：<i class="Bbalance"></i></P>
	       		<P>抹零：<i class="Breduce"></i></P>
	       		<P class="mescolorp"><font class="billst">实收</font>：<i class="BtotPayAmount"></i></P>
	       		<P class="mescolorp"><font class="billqk">欠款</font>：<i class="BtotDebtAmount"></i></P>
	       		<P id="memberScore" >积分抵现：<i class="Bprom"></i></P>
	       		<div class="mespay">
	       			
	       		</div>
       		</div>
       	</div>
       	<div class="modalMain">

			<div class="redimg" style="left: 600px;"><img ><img  class="ml10"></div>
       		<div class="payNav">
					<button type="button" class="btn newOrder none B_LSKD_0013 B_LSTHD_0014">新开单</button>
		  			<button type="button" class="btn printCom  none B_LSKD_0021 ">打印</button><%--零售单的打印--%>
		  			<button type="button" class="btn print  none  B_LSTHD_0021">打印</button><%--退货单的打印--%>
		  			<button type="button" class="btn copes none B_LSKD_0014 B_LSTHD_0015">复制</button>
		  			<button type="button" class="btn reds none B_LSKD_0019 B_LSTHD_0019">红冲</button>
					<button type="button" data-auditStatus="1" data-modal="1"  data-billsType="45" class="btn listAudit none B_LSKD_0023">稽核</button>
					<button type="button" data-auditStatus="0" data-modal="1"  data-billsType="45" class="btn listAudit none B_LSKD_0024">取消稽核</button>
					<button type="button" data-auditStatus="1" data-modal="1"  data-billsType="46"  class="btn listAudit none B_LSTHD_0022">稽核</button>
					<button type="button" data-auditStatus="0" data-modal="1"  data-billsType="46"  class="btn listAudit none B_LSTHD_0023">取消稽核</button>
					<button type="button" data-menuCode="LSKD" class="btn voucher none B_LSKD_0025">生成凭证</button>
					<button type="button" data-menuCode="LSTHD" class="btn voucher none B_LSTHD_0024">生成凭证</button>
		  			<div class="payRight">
		  				<i class="billsP none B_LSKD_0003 B_LSTHD_0003" data-code="P">上一单</i>
		  				<i class="billsN none B_LSKD_0004 B_LSTHD_0004" data-code="N">下一单</i>
		  				<i class="billsRemand none B_LSTHD_0011">本单退货</i>
		  			</div>
				</div>
			<div class="modalBox">
				<div class="modalTab mtab1">
					<h4 class="h_b1">商品信息</h4>
					<table id="bills1" class="table table-bordered table-hover kdtab">
		                <thead>
		                    <tr>
		                        <th style="width:50px">序号</th>
		                        <th style="width:50px">赠品</th>
		                        <th>商品信息</th>
		                        <th>串号 / 条码</th>
		                        <th>数量</th>
		                        <th>标价</th>
		                        <th>折扣率(%)</th>
		                        <th>折后单价</th>
		                        <th>折后金额</th>
		                        <th>营业员1</th>
		                        <th>营业员2</th>
		                        <th>合约机</th>
		                        <th>分期</th>
		                        <th>仓库</th>
		                        <th>备注</th>
		                    </tr>
		                </thead>
		                <tbody>
			                <tr>
			                    <td>1</td>
			                    <td ><input type="checkbox" disabled /></td>
			                    <td class="shopMes">
			                    	<div></div>
			                    	<div class="shopMesBox">
			                    		<p class="shopp1">编码 :</p>
			                    		<p class="shopp1">型号 :</p>
			                    		<p class="shopp2">颜色 :</p>
			                    		<p class="shopp2">类别 :</p>
			                    		<p class="shopp2">配置 :</p>
			                    	</div>
			                    </td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td><input type="checkbox" disabled /></td>
			                    <td> </td>
			                    <td></td>
			                </tr>
		                </tbody>
		                <tfoot>
		                  <tr>
		                    <td colspan="2">合计</td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td class="b1_zh"></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                </tr>
		                </tfoot>
		            </table>
	            
	            	<table id="tds1" class="table table-bordered table-hover thtab">
		                <thead>
		                    <tr>
		                        <th style="width:50px">序号</th>
		                        <th style="width:50px">赠品</th>
		                        <th>入库仓库</th>
		                        <th>商品信息</th>
		                        <th>主串号</th>
		                        <th>辅串号</th>
		                        <th>数量</th>
		                        <th>退款金额</th>
		                        <th>营业员1</th>
		                        <th>营业员2</th>
		                        <th>合约机</th>
		                        <th>分期</th>
		                        <th>标价</th>
		                        <th>原单单价</th>
		                        <th>原单金额</th>
		                        <th>备注</th>
		                    </tr>
		                </thead>
		                <tbody>
			                <tr>
			                    <td>1</td>
			                    <td ><input type="checkbox" disabled /></td>
			                    <td></td>
			                    <td class="shopMes">
			                    	<div></div>
			                    	<div class="shopMesBox">
			                    		<p class="shopp1">编码 :</p>
			                    		<p class="shopp1">型号 :</p>
			                    		<p class="shopp2">颜色 :</p>
			                    		<p class="shopp2">类别 :</p>
			                    		<p class="shopp2">配置 :</p>
			                    	</div>
			                    </td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td><input type="checkbox" disabled /></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                </tr>
		                </tbody>
		                <tfoot>
		                  <tr>
		                    <td colspan="2">合计</td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td class="t1_sl"></td>
		                    <td class="t1_je"></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                </tr>
		                </tfoot>
		            </table>
	            
	            <h4 class="h_b2">运营商业务</h4>
	            <table id="bills2" class="table table-bordered table-hover kdtab">
           		 	<thead>
	                   <tr>
	                        <th style="width:50px">序号</th>
	                        <th>运营商往来单位</th>
	                        <th>业务名称</th>
	                        <th>实际收款</th>
						    <th>数量</th>
						    <th>佣金金额</th>
	                        <th>业务号</th>
	                        <th>电话号码</th>
	                        <th>手机串号</th>
	                        <th>扣减保证金</th>
	                        <th>营业员1</th>
	                        <th>营业员2</th>

	                        <th>备注</th>
	                    </tr>
		            </thead>
	                <tbody>
	                </tbody>
	                <tfoot>
	                	<tr>
		                    <td colspan="2">合计</td>
		                    <td></td>
		                    <td class="b2_ss"></td>
							<td class="b2_sl"></td>
							<td class="b2_yj"></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td class="b2_kj"></td>
		                    <td></td>
		                    <td></td>

		                    <td></td>
	                    </tr>
	                </tfoot>
		          </table>
		          
		          <table id="tds2" class="table table-bordered table-hover thtab">
           		 	<thead>
	                   <tr>
	                        <th style="width:50px">序号</th>
	                        <th>运营商往来单位</th>
	                        <th>业务名称</th>
	                        <th>原单收款</th>
	                        <th>退款金额</th>
						   <th class="text-center">数量</th>
						   <th class="text-center">佣金金额</th>
	                        <th>业务号</th>
	                        <th>营业员1</th>
	                        <th>营业员2</th>
	                        <th>电话号码</th>
	                        <th>手机串号</th>
	                        <th>退保证金</th>

	                        <th>备注</th>
	                    </tr>
		            </thead>
	                <tbody>
	                </tbody>
	                <tfoot>
		                <tr>
		                    <td colspan="2">合计</td>
		                    <td></td>
		                    <td></td>
							<td class="t2_je"></td>
							<td class="t2_sj1"></td>
							<td class="t2_sj2"></td>
							<td ></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td class="t2_sj3"></td>
		                    <td></td>
		                </tr>
	                </tfoot>
		          </table>
	            
	            <h4 class="h_b3">增值服务</h4>
	            <table id="bills3" class="table table-bordered table-hover kdtab">
		          	<thead>
	                    <tr>
	                        <th style="width:50px">序号</th>
	                        <th>增值服务名称</th>
	                        <th>营业员1</th>
	                        <th>实际收款</th>
	                        <th>生效日期</th>
	                        <th>商品序号</th>
	                        <th>预设售价</th>
	                        <th>会员价</th>
	                        <th>商品名称</th>
	                        <th>手机串号</th>
	                        <th>有限期限</th>
	                        <th>使用次数</th>
	                        <th>营业员2</th>
	                        <th>备注</th>
	                    </tr>
	                </thead>
		            <tbody>
		            </tbody>
	                <tfoot>
	                    <td colspan="2">合计</td>
	                    <td></td>
	                    <td class="b3_ss"></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                </tfoot>
		        </table>
		        
		        <table id="tds3" class="table table-bordered table-hover thtab">
		          	<thead>
	                    <tr>
	                        <th style="width:50px">序号</th>
	                        <th>增值服务名称</th>
	                        <th>营业员1</th>
	                        <th>退款金额</th>
	                        <th>生效日期</th>
	                        <th>关联序号</th>
	                        <th>原单收款</th>
	                        <th>有效期限</th>
	                        <th>效期内使用次数</th>
	                        <th>商品名称</th>
	                        <th>手机串号</th>
	                        <th>预设售价</th>
	                        <th>会员价</th>
	                        <th>营业员2</th>
	                        <th>服务流水号</th>
	                        <th>备注</th>
	                    </tr>
	                </thead>
		            <tbody>
		            </tbody>
	                <tfoot>
		                <tr>
		                    <td colspan="2">合计</td>
		                    <td></td>
		                    <td class="t3_tk"></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
	                    </tr>
	                </tfoot>
		        </table>
	            
	            <h4 class="h_b4">第三方抵扣</h4>
	            <table id="bills4" class="table table-bordered table-hover kdtab">
		          	<thead>
	                    <tr>
	                        <th style="width:50px">序号</th>
	                        <th>往来单位</th>
	                        <th>活动名称</th>
	                        <th>抵现金额</th>
							<th>结算金额</th>
	                        <th>业务号</th>
	                        <th>营业员1</th>
	                        <th>营业员2</th>
	                        <th>备注</th>
	                    </tr>
	                </thead>
		            <tbody>
		            </tbody>
	                <tfoot>
		                <tr>
		                    <td colspan="2">合计</td>
		                    <td></td>
		                    <td class="b4_dx"></td>
							<td class="b4_js"></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
	                    </tr>
	                </tfoot>
		          </table>
		          
		          <table id="tds4" class="table table-bordered table-hover thtab">
		          	<thead>
	                    <tr>
	                        <th style="width:50px">序号</th>
	                        <th>往来单位</th>
	                        <th>活动名称</th>
	                        <th>原单抵现</th>
	                        <th>退回金额</th>
	                        <th>注销结算金额</th>
	                        <th>业务号</th>
	                        <th>营业员1</th>
	                        <th>营业员2</th>
	                        <th>备注</th>
	                    </tr>
	                </thead>
		            <tbody>
		                
		            </tbody>
	                <tfoot>
	                    <tr>
		                    <td colspan="2">合计</td>
		                    <td></td>
		                    <td class="t4_yd"></td>
		                    <td class="t4_th"></td>
		                    <td class="t4_js"></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                </tr>
	                </tfoot>
		          </table>
	            
	            <h4 class="h_b5">分期业务</h4>
	            <table id="bills5" class="table table-bordered table-hover kdtab">
		          	<thead>
	                    <tr>
	                        <th style="width:50px">序号</th>
	                        <th>分期商名称</th>
	                        <th>业务名称</th>
	                        <th>分期金额</th>
	                        <th>首付金额</th>
	                        <th>分期贷款金额</th>
	                        <th>分期数</th>
	                        <th>预计佣金</th>
	                        <th>合同号</th>
	                        <th>串号</th>
	                        <th>营业员1</th>
	                        <th>营业员2</th>
	                        <th>月供</th>
	                        <th>备注</th>
	                    </tr>
	                </thead>
		            <tbody>
		                
		            </tbody>
	                <tfoot>
	                    <tr>
		                    <td colspan="2">合计</td>
		                    <td></td>
		                    <td class="b5_je"></td>
		                    <td class="b5_sf"></td>
		                    <td class="b5_dk"></td>
		                    <td></td>
		                    <td class="b5_yj"></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                </tr>
	                </tfoot>
		        </table>
	            
	            <table id="tds5" class="table table-bordered table-hover thtab">
		          	<thead>
	                    <tr>
	                        <th style="width:50px">序号</th>
	                        <th>退款方式</th>
	                        <th>分期商名称</th>
	                        <th>业务名称</th>
	                        <th>分期金额</th>
	                        <th>首付金额</th>
	                        <th>分期数</th>
	                        <th>分期贷款</th>
	                        <th>退款金额</th>
	                        <th>预计佣金</th>
	                        <th>营业员1</th>
	                        <th>营业员2</th>
	                        <th>合同号</th>
	                        <th>串号</th>
	                        <th>月供</th>
	                        <th>备注</th>
	                    </tr>
	                </thead>
		            <tbody>
		                
		            </tbody>
	                <tfoot>
	                    <tr>
		                    <td colspan="2">合计</td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td class="t5_sf"></td>
		                    <td></td>
		                    <td class="t5_fq"></td>
		                    <td class="t5_tk"></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                </tr>
	                </tfoot>
		        </table>
	            
            	</div>
            	
			</div>
			
			<div class="modalFoot">
	        	<p><i>备注</i><input type="text" class="form-control billsRemark"/></p>
	        	<div class="mfright">
					<div class="billslog none B_LSKD_0005 B_LSTHD_0005">单据日志
						<div class="billsdetail">
		        			<h4>日志详情</h4>
	        				<h4 style="display: none;">打印次数：<i class="logprint"></i></h4>
		        		</div>
					</div>
					<button type="button" class="btn btn-default savebills none B_LSKD_0016 B_LSTHD_0016">保存修改</button>
				</div>
			</div>
		
       	</div>
      </div>
      
      
    </div>
  </div>
</div>

<!-- 定金Modal -->
<div class="modal fade" id="payModal" tabindex="-1" role="dialog" aria-labelledby="">
  <div class="modal-dialog wmodal" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="">单据编号：<i class="pay"></i> <i class="oldpay"></i></h4>
      </div>
      <div class="modal-body">
	       <div class="modalMes">
	       		<P><span>业务日期：</span><i class="mCreateDate"></i></P>
	       		<P><span>门店：</span><i class="mSectionName"></i></P>
	       		<P><span>营业员：</span><i class="mSaleManName"></i></P>
	       		<P><span>客户电话：</span><i class="mMemberTelephone"></i></P>
	       		<P><span>客户姓名：</span><i class="mMemberName"></i></P>
	       		
	       		<div class="payMes">
		       		<P><font class="payst">应收</font>：<i class="mTotalYsAmount"></i></P>
		       		<P><font class="payft">实收</font>：<i class="mSsAmount"></i></P>
		       		<div class="paypay">
		       			
		       		</div>
	       		</div>
	       	</div>
	       	<div class="modalMain ">
				<div class="redimg" style="left: 600px;"><img ><img  class="ml10"></div>

	       	  <div class="modalBox">
	       	  	<div class="payNav">
					<button type="button" class="btn newOrder none B_LSDJD_0013 B_LSTDD_0006">新开单</button>
		  			<button type="button" class="btn print none B_LSDJD_0018 B_LSTDD_0022">打印</button>
		  			<button type="button" class="btn copes none B_LSDJD_0014 B_LSTDD_0019">复制</button>
		  			<button type="button" class="btn reds none B_LSTDD_0013">红冲</button>
					<button type="button" data-auditStatus="1" data-modal="1"  data-billsType="48" class="btn listAudit none B_LSDJD_0019">稽核</button>
					<button type="button" data-auditStatus="0" data-modal="1"  data-billsType="48" class="btn listAudit none B_LSDJD_0020">取消稽核</button>
					<button type="button" data-auditStatus="1" data-modal="1"  data-billsType="50" class="btn listAudit none B_LSTDD_0023">稽核</button>
					<button type="button" data-auditStatus="0" data-modal="1"  data-billsType="50" class="btn listAudit none B_LSTDD_0024">取消稽核</button>
					<button type="button" data-menuCode="LSDJD" class="btn voucher none B_LSDJD_0021">生成凭证</button>
					<button type="button" data-menuCode="LSTDD" class="btn voucher none B_LSTDD_0025">生成凭证</button>
		  			<div class="payRight">
		  				<i class="payP none B_LSDJD_0009 B_LSTDD_0015" data-code="P">上一单</i>
		  				<i class="payN none B_LSDJD_0010 B_LSTDD_0016" data-code="N">下一单</i>
		  				<i class="payRemand none B_LSTDD_0011">本单退定</i>
		  			</div>
				</div>
				<div class="modalTab">
					<!--定金单-->
					<table id="payTab" class="table table-bordered table-hover">
		                <thead>
		                    <tr >
		                        <th class="w50">序号</th>
		                        <th>商品信息</th>
		                        <th>商品编码</th>
		                        <th>标价</th>
		                        <th>预售价</th>
		                        <th>定单数量</th>
		                        <th>退定数量</th>
		                        <th>原定金</th>
		                        <th>剩余定金</th>
		                        <th>退定金额</th>
		                        <th>营业员</th>
		                        <th>备注</th>
		                    </tr>
		                </thead>
		                <tbody>
			                <tr>
			                    <td>1</td>
			                    <td class="shopMes">
			                    	<div></div>
			                    	<div class="shopMesBox">
			                    		<p class="shopp1">编码 :</p>
			                    		<p class="shopp1">型号 :</p>
			                    		<p class="shopp2">颜色 :</p>
			                    		<p class="shopp2">类别 :</p>
			                    		<p class="shopp2">配置 :</p>
			                    	</div>
			                    </td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                </tr>
		                </tbody>
		                <tfoot>
		                  <tr>
		                    <td>合计</td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td class="paytd"></td>
		                    <td></td>
		                    <td></td>
		                </tr>
		                </tfoot>
		            </table>
	            
	            	<!--退定单-->
					<table id="backTab" class="table table-bordered table-hover">
		                <thead>
		                    <tr >
		                        <th class="w50">序号</th>
		                        <th>商品信息</th>
		                        <th>营业员</th>
		                        <th>标价</th>
		                        <th>数量</th>
		                        <th>退定金额</th>
		                        <th>备注</th>
		                    </tr>
		                </thead>
		                <tbody>
			                <tr>
			                    <td>1</td>
			                    <td class="shopMes">
			                    	<div></div>
			                    	<div class="shopMesBox">
			                    		<p class="shopp1">编码 :</p>
			                    		<p class="shopp1">型号 :</p>
			                    		<p class="shopp2">颜色 :</p>
			                    		<p class="shopp2">类别 :</p>
			                    		<p class="shopp2">配置 :</p>
			                    	</div>
			                    </td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                </tr>
		                </tbody>
		                <tfoot>
		                  <tr>
		                    <td>合计</td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td></td>
		                    <td class="backtd"></td>
		                    <td></td>
		                </tr>
		                </tfoot>
		            </table>
	            
            </div>
        </div> 
        
        <div class="modalFoot">
        	<p><i>备注</i><input type="text" class="form-control payRemark"/></p>
        	<div class="mfright">
				<div class="paylog none B_LSDJD_0011 B_LSTDD_0017">单据日志
					<button type="button" class="btn btn-default savePay none B_LSDJD_0015 B_LSTDD_0020">保存修改</button>
					<div class="paydetail">
						<h4>日志详情</h4>
	        			<h4 style="display: none;">打印次数：<i class="logprint"></i></h4>
	        		</div>
				</div>
			</div>
		</div>
        
      </div>
      
      </div>
    </div>
  </div>
</div>
  
  
 <!-- 收回欠款Modal -->
<div class="modal" id="debtModal" tabindex="-1" role="dialog" aria-labelledby="mydebtModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
      	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="mydebtModal">收款</h4>
      </div>
      <div class="modal-body">
        <div class="debtRow">
        	<div class="debtone"><i>日期：</i><input type="text" class="form-control debtTime" /></div>
        	<div class="debtone">
        		<i>收款部门：</i>
	        	<div class="input-group col-sm-8 debtDiv">
					<input type="hidden" name="debtSectionId" />
	        		<input type="text" id="debtSection" name="debtSection" class="form-control" readonly />
        		</div>
        	</div>
        	<div class="debtq">欠款：<i class="debtqi">0.00</i></div>
        </div>
        <div class="debtRow">
        	<i>收款人：</i>
        	<div class="input-group col-sm-8 debtDiv2">
				<input type="hidden" name="debtManId"  />
        		<input type="text" id="debtMan" name="debtMan" class="form-control" readonly />
        	</div>
        	<div class="debts">收款：<i class="debtsi">0.00</i></div>
        </div>
        <div class="debtBox">
	        <div class="debtRows">
	        	<i>现金：</i><input type="text" class="form-control cash inptab" onkeyup="checkInput.checkNum(this,12)" />
	        	<i>POS：</i><input type="text" class="form-control pos" readonly />
	        	<i>支付宝：</i><input type="text" class="form-control alipay inptab" onkeyup="checkInput.checkNum(this,12)" />
	        	<div class="posDiv">
                   <table class="table table-bordered table-hover" id="postab">
                     <thead>
                       <tr>
                         <th>序</th>
                         <th>银行</th>
                         <th>收款金额</th>
                       </tr>
                     </thead>
                     <tbody>
                     </tbody>
                   </table>
                   <div class="posButton">
                   	<button type="button" class="btn btn-info" id="postAmountSure">确定</button>
                   	<button type="button" class="btn btn-default" id="postAmountNone">取消</button>
                   </div>
                   <div class="tableTrangle"></div>
                 </div>
	        </div>
	        <div class="debtRows">
	        	<i>微信：</i><input type="text" class="form-control wechat inptab" onkeyup="checkInput.checkNum(this,12)" />
	        	<i>其他账户：</i><input type="text" class="form-control others" readonly />
	        	<i>抹零：</i><input type="text" class="form-control wipe" onkeyup="checkInput.checkNum(this,12)"/>
	        	<div class="othersDiv">
                   <table class="table table-bordered table-hover" id="otherstab">
                     <thead>
                       <tr>
                         <th>序</th>
                         <th>银行</th>
                         <th>收款金额</th>
                       </tr>
                     </thead>
                     <tbody>
                     </tbody>
                   </table>
                   <div class="posButton">
                   	<button type="button" class="btn btn-info" id="othersAmountSure">确定</button>
                   	<button type="button" class="btn btn-default" id="othersAmountNone">取消</button>
                   </div>
                   <div class="tableTrangle"></div>
                 </div>
	        </div>
	        <div class="debtR">
	        	<i>备注：</i><input type="text" class="form-control debtRemark"  />
	        </div>
	        
	        <button type="button" class="btn btn-default debtSave">结算</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 红冲Modal -->
<div class="modal fade" id="redModal" tabindex="-1" role="dialog" aria-labelledby="">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="">红冲</h4>
      </div>
      <div class="modal-body">
     	<div class="col-sm-3">
            	时间：
      	</div>
       	<div class="input-group col-sm-8">
               <input type="text" class="form-control redTime" >
      	</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary redSave">确定</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
      </div>
    </div>
  </div>
</div>

<!-- 退定Modal -->
<div class="modal fade" id="exitModal" tabindex="-1" role="dialog" aria-labelledby="">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="">办理退定</h4>
      </div>
      <div class="modal-body">
      	<div class="exitNav form-inline">
	     	<div class="form-group col-sm-4">
	            <label class="width-25">办理人：</label>
	            <div class="input-group col-sm-8">
	               	<input type="text" class="form-control" id="exitMan" value="${user.name}" data-id="${user.id}" readonly >
		      	</div>
		    </div>
		    <div class="form-group col-sm-4">
	            <label class="width-25">业务日期：</label>
	            <div class="input-group col-sm-8">
	                <input type="text" class="form-control exitTime" >
		      	</div>
		   	</div>
		   	<div class="form-group col-sm-4">
	            <label class="width-25">门店：</label>
	            <div class="input-group col-sm-8">
	                <input type="text" class="form-control" id="exitstore" readonly >
		      	</div>
		   	</div>
		   	<div class="form-group col-sm-4">
	            <label class="width-25">客户电话：</label>
	            <div class="input-group col-sm-8">
	                <input type="text" class="form-control exitphone" readonly>
		      	</div>
		   	</div>
		   	<div class="form-group col-sm-4">
	            <label class="width-25">客户姓名：</label>
	            <div class="input-group col-sm-8">
	                <input type="text" class="form-control exitname" readonly >
		      	</div>
		   	</div>
	   </div>
	   
	   <div class="exitMain">
	   		<table id="exitTab" class="table table-bordered table-hover">
                <thead>
                    <tr >
                        <th class="w50">序号</th>
                        <th>商品信息</th>
                        <th>商品编码</th>
                        <th>标价</th>
                        <th>预售价</th>
                        <th>定单数量</th>
                        <th>剩余数量</th>
                        <th>退定数量</th>
                        <th>原定金</th>
                        <th>剩余定金</th>
                        <th>退定金额</th>
                        <th>营业员</th>
                        <th>备注</th>
                    </tr>
                </thead>
                <tbody>
	                <tr>
	                    <td>1</td>
	                    <td class="shopMes">
	                    	<div></div>
	                    	<div class="shopMesBox">
	                    		<p class="shopp1">编码 :</p>
	                    		<p class="shopp1">型号 :</p>
	                    		<p class="shopp2">颜色 :</p>
	                    		<p class="shopp2">类别 :</p>
	                    		<p class="shopp2">配置 :</p>
	                    	</div>
	                    </td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>合计</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </tfoot>
            </table>
	   </div>
	   
	   <div class="exitFoot">
	   		<div class="exitRow">
	        	<div><i>现金：</i><input type="text" class="form-control ecash einptab" onkeyup="checkInput.checkNum(this,12)" /></div>
	        	<div><i>POS：</i><input type="text" class="form-control epos" readonly /></div>
	        	<div><i>支付宝：</i><input type="text" class="form-control ealipay einptab" onkeyup="checkInput.checkNum(this,12)" /></div>
	        	<div><i>微信：</i><input type="text" class="form-control ewechat einptab" onkeyup="checkInput.checkNum(this,12)" /></div>
	        	<div><i>其他账户：</i><input type="text" class="form-control eothers" readonly /></div>
	        </div>
	        
	        <div class="exitRemark">
	        	<i>备注：</i>
	        	<textarea class="exitText"></textarea>
	        </div>
	        
	        <div class="exitRight">
	        	<span class="red">应退：<i class="exitred">0.00</i></span>
	        	<span class="blue">实退：<i class="exitblue">0.00</i></span>
	        	<button type="button" class="btn btn-info" id="exitSure">确定</button>
	        </div>
	        
	        <div class="exitpos">
                   <table class="table table-bordered table-hover" id="exitpostab">
                     <thead>
                       <tr>
                         <th>序</th>
                         <th>银行</th>
                         <th>收款金额</th>
                       </tr>
                     </thead>
                     <tbody>
                     </tbody>
                   </table>
                   <div class="posButton">
                   	<button type="button" class="btn btn-info" id="exitposSure">确定</button>
                   	<button type="button" class="btn btn-default" id="exitposNone">取消</button>
                   </div>
                   <div class="tableTrangle"></div>
                 </div>
                 
                 <div class="exitother">
                   <table class="table table-bordered table-hover" id="exitotherstab">
                     <thead>
                       <tr>
                         <th>序</th>
                         <th>银行</th>
                         <th>收款金额</th>
                       </tr>
                     </thead>
                     <tbody>
                     </tbody>
                   </table>
                   <div class="posButton">
                   	<button type="button" class="btn btn-info" id="exitotherSure">确定</button>
                   	<button type="button" class="btn btn-default" id="exitotherNone">取消</button>
                   </div>
                   <div class="tableTrangle"></div>
                 </div>
                 
	   </div>
	   
      </div>
    </div>
  </div>
</div>
       
<jsp:include  page="../../inventoryInclude/foot.jsp"/>