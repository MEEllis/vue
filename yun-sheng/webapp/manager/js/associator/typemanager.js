$(window).resize(resizeWidth);
function initial(){
	$(".content2").hasClass("hidden")||$(".content2").addClass("hidden");
	$(".nav-tabs>li.active").removeClass("active");//移除激活选项
	$(".tab-content>.active").removeClass("active");//移除激活展示的tab
	$(".nav-tabs>li").addClass("hidden");//隐藏选项卡
}
/*根据选择条目加载选项卡*/
function loadChoseTable(id){
	 $("li.jf").addClass("hidden");
	 $("li.zk").addClass("hidden");
	 $("li.sj").addClass("hidden");
	 $("li.zzfw").addClass("hidden");
	 $("#score-set .grid-wrap").html("<table id='jqGrid_jfsz' class='zxsaastable'></table><div id='jqGridPagerJF'></div>");
	 $("#buget-set .grid-wrap").html("<table id='jqGrid_goodsDiscount' class='zxsaastable'></table><div id='jqGridPagerZK'></div>");
	 $("#upvalue-set .grid-wrap").html("<table id='jqGrid_addService' class='zxsaastable'></table>");
	// $(".tab-content").find(".zk fieldset").removeAttr("disabled");
	 $.request({
	       url: '/manager/member/cardType/selectOne/'+id,
	       type: "POST",
		   datatype : "json",
		   traditional: true,
	       success: function (data) { 
		        	   tableLoad("#score-set",0);
		        	   tableLoad('#buget-set',1);
	   		           tableLoad('#upvalue-set',3);
	   		       if(data.data.cardType.isScore) {   
			         data.data.cardType.isScore == 1 && $("#score-set").removeClass("hidden")&& $("li.jf").removeClass("hidden");
			         data.data.cardType.isScore == 1 && $(".content2").hasClass("hidden")&&$(".content2").removeClass("hidden");
	   		       }
			       //积分设置
			       if(data.data.cardType.isScore==1){
			    	 $("#score-set").find("input[type=text]").val("");
			    	$("#score-set").find("input[type=checkbox]").prop("checked",false);
			    	 if(data.data.cardType.mscore.isScore==1){//促销商品部参加积分
			    	     $("#notTake").prop("checked",true);
			    	 }                    
			    	 if(data.data.cardType.mscore.xamount){ //消费金额xamount
			    	     $("input[name=xamount]").val(data.data.cardType.mscore.xamount);
			    	 }    
			    	 if(data.data.cardType.mscore.xsoure){//对应积分xsoure
			    	     $("input[name=xsoure]").val(data.data.cardType.mscore.xsoure);
			    	 }
			    	 if(data.data.cardType.mscore.isMultiple==1){ //按金额整倍积分isMultiple
			    		 $("input[name=isMultiple]").prop("checked",true);
			    	 }
			    	 if(data.data.cardType.mscore.damount){ //积分抵现  每XX积分damount
			    		 $("input[name=damount]").val(data.data.cardType.mscore.damount);
			    	 }             
			    	 if(data.data.cardType.mscore.dsoure){ //积分抵现  抵XX元dsoure
			    		 $("input[name=dsoure]").val(data.data.cardType.mscore.dsoure);
			    	 }               
			    	   
			       }
			       
			       if(data.data.cardType.isRebate){
			         data.data.cardType.isRebate == 1 && $("#buget-set").removeClass("hidden")&& $("li.zk").removeClass("hidden");
			         data.data.cardType.isRebate == 1 &&$(".content2").hasClass("hidden")&&$(".content2").removeClass("hidden");
			       }
			       //折扣设置
			       if(data.data.cardType.isRebate==1){
			    	   $("#buget-set").find("input[type=text]").val("");
				    	$("#buget-set").find("input[type=checkbox]").prop("checked",false);
				    	 if(data.data.cardType.mrebate.syPrice){//适用价格
				    		  $("select[name=syPrice]").find("option[selected=selected]").removeAttr("selected");
				    		  $("select[name=syPrice]").find("option[value='"+data.data.cardType.mrebate.syPrice+"']").attr("selected","selected");
				    		  $("select[name=syPrice]").val( $("select[name=syPrice]").find("option[selected=selected]").val());
				    	 }                    
				    	 if(data.data.cardType.mrebate.modeFlag){ //统一折扣  按商品类型折扣
				    		 if(data.data.cardType.mrebate.modeFlag==1){
				    			 $("#common").prop("checked",true);
				    		 }
				    		 if(data.data.cardType.mrebate.modeFlag==2){
				    			 $("#byGoods").prop("checked",true);
				    		 }
				    	 }    
				    	 if(data.data.cardType.mrebate.isRebate==1){//促销商品是否允许折扣
				    	     $("input[name=isRebate]").prop("checked",true);
				    	 }
				    	 if(data.data.cardType.mrebate.rate){ //通用折扣率
				    		 $("input[name=rate]").val(data.data.cardType.mrebate.rate);
				    	 }            
			    	   
			       }
			       if(data.data.cardType.isUp){
			         data.data.cardType.isUp == 1 &&  $("#update-set").removeClass("hidden")&& $("li.sj").removeClass("hidden");
			         data.data.cardType.isUp == 1 && $(".content2").hasClass("hidden")&&$(".content2").removeClass("hidden");
			       }
			       //升级设置
			       if(data.data.cardType.isUp==1){
			    	   $("#update-set").find("input[type=text]").val("");
				    	$("#update-set").find("input[type=checkbox]").prop("checked",false);
			    	 if(data.data.cardType.mcardup.timeFlag){//无时限&按时限
			    		 if(data.data.cardType.mcardup.timeFlag==1){//无时限
			    			 $("#noLimit").prop("checked",true);
			    			 $("input[name=tjNum]").val("");
			    			 $("input[name=tjNum]").attr("disabled",true);
			    			 $("input[name=checkDate]").val("");
			    			 $("input[name=checkDate]").attr("disabled",true);
			    			 
			    		 }
			    		 if(data.data.cardType.mcardup.timeFlag==2){//按时限
			    			 $("#byLimit").prop("checked",true);
			    			 
			    		 }
			    	 } 
			    	 if(data.data.cardType.mcardup.tjNum){//统计时间段
			    		 $("input[name=tjNum]").val(data.data.cardType.mcardup.tjNum);
			    	 }
			    	 if(data.data.cardType.mcardup.checkDate){//每年检测日期
			    		 $("input[name=checkDate]").val(data.data.cardType.mcardup.checkDate);
			    	 }
			    	 if(data.data.cardType.mcardup.lastCardtypeId){ //上级类别
			    		  $("select[name=lastCardtypeId]").find("option[value='"+data.data.cardType.mcardup.lastCardtypeId+"']").attr("selected",true);
			    	 }    
			    	 if(data.data.cardType.mcardup.nextCardtypeId){//下级类别
			    		  $("select[name=nextCardtypeId]").find("option[value='"+data.data.cardType.mcardup.nextCardtypeId+"']").attr("selected",true);
			    	 }
			    	 if(data.data.cardType.mcardup.isAutoup==1){ //是否自动升级
			    		 $("input[name=isAutoup]").prop("checked",true);
			    	 }            
			    	 if(data.data.cardType.mcardup.isAutodown==2){ //条件不足时自动降级
			    		 $("input[name=isAutodown]").prop("checked",true);
			    	 }   
			    	 if(data.data.cardType.mcardup.upFlag){//按消费金额升级&按积分升级
			    		 if(data.data.cardType.mcardup.upFlag==1){//按消费金额升级
			    			 $("#byCustomUpGrade").prop("checked",true);
			    		 }else{
			    			 $("#byScoreUpGrade").prop("checked",true);
		    			     //一定要有积分设置的选项卡进行设置
		    			 
			    		 }
			    	 }   
			       }
			    
			     //增值服务勾选
			       if(data.data.cardType.asList.length!=0){
			    	   $(".content2").hasClass("hidden")&&$(".content2").removeClass("hidden");
    		    	   $("li.zzfw").removeClass("hidden");
			       }
		           $("#myTab>li:not(.hidden):first").find("a").tab("show");//显示选项卡
	
			  
		 	},
	       error: function (msg) {
	       }
	   });
	 //$(".tab-content").find(".zk fieldset").attr("disabled",true);
}

var slectROW=-1;
function loadmodal(options){
	/*初始化表格参数*/
        var colNamec = [];
		var colName0 = ['ID','类型编码','类型名称','备注','停用','是否需要密码','积分功能','是否打折','是否储值','是否升级','适用范围'];
		colNamec[0]=colName0;
		
		var colName1 = ['隐藏的商品分类ID','分类编码','分类名称','消费金额','对应积分'];//积分设置
		colNamec[1]=colName1;
		
		var colName2 = ['隐藏的商品分类ID','分类编码','分类名称','折扣率%'];//折扣设置
		colNamec[2]=colName2;
		
		var colName4 = ['id','服务名称','是否永久有效','服务期限','是否不限次数','效期内可服务次数','预设定价','收费标准','会员效期内可服务次数','是否关联串号','备注'];//增值服务
		colNamec[4]=colName4;
		var JqGridColModelc = [];
		var JqGridColModel0 =[
		                      	{name:'id',index:'id', width:100,align:'center',sortable:false,hidden:true},
		                      	{name:'typeCode',index:'typeCode', width:150,align:'center',sortable:false},
								{name:'typeName',index:'typeName', width:150,align:'center',sortable:false},
								{name:'remark',index:'remark', width:150,align:'center',sortable:false},
								{name:'isStop',index:'isStop', width:150,align:'center',sortable:false,formatter:'select', editoptions:{value:"1:√;0:"}},
								{name:'isPassword',index:'isPassword', width:150,align:'center',sortable:false,formatter:'select', editoptions:{value:"1:√;0:"}},
								{name:'isScore',index:'isScore', width:150,align:'center',sortable:false,formatter:'select', editoptions:{value:"1:√;0:"}},
								{name:'isRebate',index:'isRebate', width:150,align:'center',sortable:false,formatter:'select', editoptions:{value:"1:√;0:"}},//是否打折
								{name:'isValue',index:'isValue', width:150,align:'center',sortable:false,formatter:'select', editoptions:{value:"1:√;0:"}},
								{name:'isUp',index:'isUp', width:150,align:'center',sortable:false,formatter:'select', editoptions:{value:"1:√;0:"}},//是否升级
								{name:'companyName',index:'companyName', width:200,align:'center',sortable:false}

			                ];
		JqGridColModelc[0]=	JqGridColModel0;     
		//积分设置
		var JqGridColModel1 =[
		                        {name:'goodsclassId',index:'goodsclassId', sortable:false, width:70,align:'center',hidden:true},
								{name:'code',index:'code', width:100,align:'center',  sortable:false},
								{name:'name',index:'name', width:100,align:'center', sortable:false},
								{name:'aomunt',index:'aomunt', width:100,align:'center', sortable:false},
								{name:'score',index:'score', width:100,align:'center', sortable:false},
								
			                ];
		JqGridColModelc[1]=	JqGridColModel1;     
		//折扣设置
		var JqGridColModel2 =[
		                        {name:'goodsclassId',index:'goodsclassId', sortable:false, width:70,align:'center',hidden:true},
								{name:'code',index:'code', width:100,align:'center', sortable:false},
								{name:'name',index:'name', width:100,align:'center', sortable:false},
								{name:'rate',index:'rate', width:100,align:'center', sortable:false}
			                ];
		JqGridColModelc[2]=	JqGridColModel2;    
		//增值服务
			var JqGridColModel4 =[
								{name:'id',index:'id',width:100,align:'center',sortable:false,hidden:true},
								{name:'serviceName',index:'serviceName',width:100,align:'center',sortable:false},//服务名称
								{name:'serviceDue',index:'serviceDue',width:100,align:'center',sortable:false,formatter:'select',editoptions:{value:"0:√"}},//是否永久有效
								{name:'serviceDue',index:'serviceDue',width:100,align:'center',sortable:false},//服务期限qx
								{name:'userNum',index:'userNum',width:100,align:'center',sortable:false,formatter:'select',editoptions:{value:"0:√"}},//是否不限次数
								{name:'userNum',index:'userNum',width:155,align:'center',sortable:false},//效期内可服务次数
								{name:'setPrice',index:'setPrice',width:100,align:'center',sortable:false},//预设定价
								{name:'ssbz',index:'ssbz',width:100,align:'center',sortable:false,formatoptions:{thousandsSeparator:",", defaulValue:"",decimalPlaces:0}},//收费标准feeScale
								{name:'swcs',index:'swcs',width:155,align:'center',sortable:false,formatoptions:{thousandsSeparator:",", defaulValue:"",decimalPlaces:0}}, //会员效期内可服务次数muserNum
								{name:'ifIm',index:'ifIm',width:100,align:'center',sortable:false,formatter:'select', editoptions:{value:"1:√;0:"}},//是否关联串号							
								{name:'remark',index:'remark', width:100,align:'center',sortable:false}//备注
		                      

			                ];
		JqGridColModelc[4]=	JqGridColModel4;    
		
		var defaults = {
		LoadTableUrl: "",
		TableName: "", //显示表格名称。遵照css选择器书写
		pager:"",
		TableInfo:"",
		choose:false,
		parentHeight:$(window).height()*0.65,
		dataRows:"data.rows"
		};
		var options = $.extend(defaults,options);
			$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';//最后一次选中的行
			var rightClickColid="";//右键列id
			var rightClickColIndex=0;//右键index
			var mydata;
			var hid=false;
			var lock=false;
			var myobj=[];
			//var toggleflag=false;//冻结时候切换用
			var c=options.TableInfo;//参数index
			var colNames = colNamec[c];
			var JqGridColModel = JqGridColModelc[c];
			loadtable();
		//加载表格
		 
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"GET",
						datatype: "json",
						jsonReader  : {	
							root: options.dataRows,
							repeatitems: false
								},
						colNames:colNames,          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            rownumbers:true,
			            rowNum:-1,
			            rowList: [10, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		       
			            width: "100%" ,
			            height:options.parentHeight,
						autowidth:true,
						rownumWidth: 35, 
						shrinkToFit:false,  
						multiselect:options.choose,
						multiboxonly:true,
						multiselectWidth:50,
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
			   				
						},
						onCellSelect:function(id,index,e){
							var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
					      	select_name=colName
					      	select_index=index;
							
							//后续可以通过点击的列名称来弹框等
						},
						onSelectRow:function(id,status){
							if(options.TableName=="#jqGrid_blocMessage"){
							   if(status){
								   slectROW=id;
								   console.log(id)
								   loadChoseTable(id);
							   }
							   if(!status){
								   slectROW =-1; 
								   initial();
							   }
							}
							
						},
						beforeSelectRow:function(rowid,e){
                            if(options.TableInfo==0){
                            	  var id=$(options.TableName).jqGrid('getGridParam','selrow');
                            	  if(id==rowid){
                            		  slectROW =-1; 
   								       initial();
   								    $(options.TableName).jqGrid("resetSelection")//设置单选   只选中一行
                            		  return false;
                            	  }else{
                            		  initial();
                            	     $(options.TableName).jqGrid("resetSelection")//设置单选   只选中一行
                            	     return(true);
                            	  }
                            }
						},
						afterInsertRow: function (rowid, aData) { //新增一行之后

						},
						gridComplete: function() {
							var ids=$(options.TableName).jqGrid("getDataIDs");

						},
						loadComplete:function(data){
							var len = 0;
							/*禁用查询页面的积分设置、折扣设置、增值服务的选择列*/
							if(options.TableInfo!=0){
								   
//									 if(options.TableName=="#jqGrid_jfsz"){
//										 len=data.data.cardType.mscoreTssp.length;
//									 }
//									 if(options.TableName=="#jqGrid_goodsDiscount"){
//										 len=data.data.cardType.mrebateTssp.length;
//									 }
//									 if(options.TableName=="#jqGrid_addService"){
//										 len=data.cardType.asList.length;
//										 console.log("*****^^^^^");
//										 console.log(len);
//									 }
//									if(len > 0){
//										for(var i=0; i<len; i++){
//											var j = i+1 ;
//											console.log("每行数据的ID值"+"#jqg_"+options.TableName.replace("#",'')+"_"+j);
//											if(options.TableInfo==4){
//										       $(options.TableName).find("input:checkbox").attr("disabled", true);
//											}else{
//											   $("#jqg_"+options.TableName.replace("#",'')+"_"+j).attr("disabled", true);
//											}
//										}
//									}
							}
							
//							if(options.TableInfo==0){
//								  /*积分功能*/
//								 if(len > 0){
//								    // active();
//									for(var i=0; i<len; i++){
//										if(data.data.rows[i].isScore=="1"){
//											$(".jf").removeClass("hidden");
//											// active();
//										}
//										if(data.data.rows[i].isRebate=="1"){
//											$(".zk").removeClass("hidden");
//                                           // active();
//										}
//										if(data.data.rows[i].isUp=="1"){
//											$(".sj").removeClass("hidden");
//											//active();
//										}
//									}
//								}
//	 
//							}
							
						},
						loadError:function(xhr,status,error){
						
						}
						})
		
			}
			

			
			
			//列表复选框
			function checkBox(cellvalue, options, rowObjec)
			{
				return '<input type="checkbox" class="del" data-blocId="' + rowObjec.blocId + '"  data-id="' + options.rowId + '" />';
			}
			
}
//批量删除
$(document).on('click','.delete',function(e){
	if(slectROW==-1){
		$.zxsaas_plus.showalert("错误","请勾选类型后再删除!");
		return false;
	}else{
		$.zxsaas_plus.showconfirm("提示","是否确定删除选中数据?",function(){
			 $.request({
		            type: 'Get',
		            url: '/manager/member/cardType/deleteType/'+slectROW,//树结构地址
		            dataType: "json", 
		            success: function (data) {
					    if(data.result==1){
				    		$.zxsaas_plus.showalert("提示",data.desc,function(){
				    			window.location.reload();
				    		});
				    	}else{
				    		$.zxsaas_plus.showalert("错误",data.desc);
				    	}
		            },
		            error: function (msg) {
		            	$.zxsaas_plus.showalert("错误","服务器正忙");
		            }
		        });
		},function(){
		
		});
	}
});



//修改信息
$('.updateBloc').click(function(){
	var checkedList = [];//存放已勾选行id
	$('.del').each(function (index, domEle) { 
		($(domEle).prop('checked')) ? (checkedList.push($(domEle).data('id'))) : '';
	});
	var len = checkedList.length;
	var gridData = $(options.TableName).jqGrid("getRowData",checkedList[0]);//获取被选中的一行数据	
	if(len != 1){
		$.zxsaas_plus.showalert("错误","一次只能修改一条信息!");
		return false;
	}else{
		$('.blocId').val(gridData.blocId);
		$('.blocPer').val(gridData.blocPer);
		$('.blocTime').val(gridData.blocTime);
		$('.blocUpdate').val(gridData.blocUpdate);
		$('.blocUpdateTime').val(gridData.blocUpdateTime);
		$('.blocNo').val(gridData.blocNo);
		$('.blocName').val(gridData.blocName);
		$('.blocMark').val(gridData.blocMark);
		$('.blocAdmin').val(gridData.blocAdmin);
		$('.blocPwd').html(gridData.blocPwd);
		//$('.blocDouble').val(gridData.blocDouble);
		if(gridData.blocDouble == '1'){
			//不禁用
			$('.blocDouble').prop({'checked':''});
		}else{
			$('.blocDouble').prop({'checked':'checked'});
		}
		
		return true;
	}
});
		
/*点击修改按钮*/
$(document).on("click",".update",function(e){
	e.preventDefault();
	var slctIds =$("#jqGrid_blocMessage").jqGrid("getGridParam",'selarrrow')||[];
	var len =slctIds.length;
	if(len !=0 ){
		if(len == 1){
			window.parent.openWorkBoxByMenutext('修改会员类型',"/manager/member/cardType/toUpdateType/"+slctIds[0]);
		}else{
		   $.zxsaas_plus.showalert("提示","只能选择一条有效数据！");
		}
	}else{
		   $.zxsaas_plus.showalert("提示","请选择一行数据！");
	}
	
});
/*切换参数详情*/
/*------------------------------------------------选项卡切换--------------------------------------------------------------------*/

/*切换设置表格参数加载表格*/
function tableLoad(toggleTab,idx){
	   /*设置表格参数*/
    var tn ="";
    var pger="";
    var tableinfo ="";
    if($(toggleTab).find("table").attr("id") == "jqGrid_jfsz"){//积分设置
    	    tn  ="#jqGrid_jfsz"
    	    pger ="#"+$("#jqGrid_jfsz").next().attr("id");
    }
    else if($(toggleTab).find("table").attr("id") == "jqGrid_goodsDiscount"){//折扣设置
    	    tn  ="#jqGrid_goodsDiscount"
    	    pger ="#"+$("#jqGrid_goodsDiscount").next().attr("id");
    }
    else if($(toggleTab).find("table").attr("id") == "jqGrid_addService"){//增值服务
    	    tn  ="#jqGrid_addService"
    	    pger ="#"+$("#jqGrid_addService").next().attr("id");
    }
   tableinfo =1+idx;//参数索引
   drawTable(tn,pger,tableinfo);
   resizeWidth();//调整表格宽度
	
}

function drawTable(tn,pger,tableinfo){
	    var id =$("#jqGrid_blocMessage").jqGrid("getGridParam","selrow")||-1;
		if(tableinfo == 1){//积分设置表格
		    loadmodal({TableName:tn,TableInfo:tableinfo,parentHeight:$(".jf").find(".btm").height()*0.7,LoadTableUrl: "/manager/member/cardType/selectOne/"+id,dataRows:"data.cardType.mscoreTssp"});	
		}
		else if(tableinfo == 2){//折扣设置表格	
			loadmodal({TableName:tn,TableInfo:tableinfo,parentHeight:$(".zk").find(".btm").height()*0.7,LoadTableUrl: "/manager/member/cardType/selectOne/"+id,dataRows:"data.cardType.mrebateTssp"});	
		}
		else if(tableinfo == 4){//增值服务表格
			///manager/member/cardType/selectaddServiceList
			loadmodal({TableName:"#jqGrid_addService",TableInfo:tableinfo,parentHeight:$(".service-tt").height()*0.71,LoadTableUrl: "/manager/member/cardType/selectOne/"+id,dataRows:"data.cardType.asList"});	
		}
}

/*-----------------------------------------------------------------------------------------------------------------*/

/*调整表格宽度加载*/
var widths=document.body.scrollWidth;
var a=Math.round(($(".grid-wrap").width()/$(document).width())*100);//search_tb某个div
var b=widths*a/100;
function resizeWidth(){
	   $("#jqGrid_jfsz").setGridWidth(b);
}
$(".nav a").on("click",function(){
	var w=$(".content2").width();
	if($(this).attr("href")=="#score-set"){
		  $("#jqGrid_jfsz").setGridWidth(w);
	}
	if($(this).attr("href")=="#buget-set"){
		  $("#jqGrid_goodsDiscount").setGridWidth(w);
	}
	if($(this).attr("href")=="#upvalue-set"){
		  $("#jqGrid_addService").setGridWidth(w);
	}
});
//停用启用
$(document).on('click', '.stopType',function(e){
	var ids = $("#jqGrid_blocMessage").jqGrid('getGridParam','selarrrow');//选中的行id
	var len = ids.length;
	if(len == 0){
		$.zxsaas_plus.showalert("错误","请勾选类型后再操作!");
		return false;
	}else{
			 $.request({
		            type: 'Get',
		            url: '/manager/member/cardType/stopType/'+ids,
		            dataType: "json", 
		            success: function (data) {
					 if(data.result==1){
				    		$.zxsaas_plus.showalert("提示",data.desc);
				    	}else{
				    		$.zxsaas_plus.showalert("错误",data.desc);
				    	}
				    	$("#jqGrid_blocMessage").trigger("reloadGrid");
		            },
		            error: function (msg) {
		            	$.zxsaas_plus.showalert("错误","服务器正忙");
		            }
		});
	}
});
