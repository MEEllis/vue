$(window).resize(resizeWidth);
$(document).on("click",".cancel",function(){
	  window.history.back();
});

$(document).on("blur","td>input",function(){
	saveLstCell();
});

/*切换统一折扣与按商品类型折扣*/
$(document).on("click","input[name=modeFlag]",function(){
	if($(this).val()=="1"){//统一折扣
		$("input[name=rate]").attr("disabled",false);
		$("input[name=rate]").val("100");
	}else{//按商品类型折扣
	  	$('#togglingFormZK').data('bootstrapValidator').enableFieldValidators('rate',true);
		$("input[name=rate]").val("");
		$("input[name=rate]").attr("disabled",true);
	}
});

/*切换升级设置无时限与按时限*/
$(document).on("click","input[name=timeFlag]",function(){
	if($(this).val()=="1"){//无时限
		$('#togglingFormSJ').data('bootstrapValidator').resetField('tjNum', true);
		$("input[name=tjNum] ").val("");
		$("input[name=checkDate]").val("");
		$("input[name=tjNum]").attr("disabled",true);
		$("input[name=checkDate]").attr("disabled",true);
	}else{//按时限
		$("input[name=tjNum]").attr("disabled",false);
		$("input[name=checkDate]").attr("disabled",false);
	}
});

/*点击积分功能*/
$(document).on("click","input[name=isScore]",useJfUp);
function useJfUp(){
	   $("#jfFun").prop("checked")&&$("#byScoreUpGrade").attr("disabled",false);
	   if(!$("#jfFun").prop("checked")){
		   $("#byScoreUpGrade").prop("checked",false);
		   $("#byCustomUpGrade").prop("checked",true);
		   $("#byScoreUpGrade").attr("disabled",true);
	   }
	   
}

$(function(){
	$("#checkDate").datetimepicker({//出生日期
		  lang:"ch",           //语言选择中文
	      format:"m-d",      //格式化日期
	      validateOnBlur:false,//关闭失焦检测
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	});
	 $.request({
         url: '/manager/member/cardType/initType',
         success: function (data) {
		    var obj = $("#tid").val();
		    $(".groupName").val(data.data.companyName);
		   //下级类别
		    $(".nextCardtypeId").html("");
	 		$(".nextCardtypeId").append("<option value=''>--- 不选择下级 ---</option>");
	 		//上级类别
	 		$(".lastCardtypeId").html("");
	 		$(".lastCardtypeId").append("<option value=''>--- 不选择上级 ---</option>");
	 		$(".categoryCode").html("");
			if(data.data.typeList){
		 		//适用范围
			 	for(var i=0;i<data.data.typeList.length;i++){//所属分类
			 		$(".categoryCode").append("<option value='"+data.data.typeList[i].code+"'>"+data.data.typeList[i].content1+"</option>");
			 	}
			}
		 	$(".syjg").html("");
		 	//适用价格
		 	for(var i=0;i<data.data.syjg.length;i++){
		 		$(".syjg").append("<option value='"+data.data.syjg[i].code+"'>"+data.data.syjg[i].content1+"</option>");
		 	}
		 	for(var i=0;i<data.data.cardList.length;i++){//升级设置 
		 		//下级类别
		 		$(".nextCardtypeId").append("<option value='"+data.data.cardList[i].id+"'>"+data.data.cardList[i].typeName+"</option>");
		 		//上级类别
		 		$(".lastCardtypeId").append("<option value='"+data.data.cardList[i].id+"'>"+data.data.cardList[i].typeName+"</option>");
		 	}
		 	/*加载增值服务选项卡*/
		 	$("#myTab>li:not(.hidden):first").find("a").tab("show");//显示选项卡
	           var toggleTab =$("#myTab>li:not(.hidden):first").find("a").attr("href");
		       var idx = $(".nav>li.active").index();
		       tableLoad(toggleTab,idx);//设置表格参数加载表格
		       if(obj!=""){//修改按钮
			    	load_ModifyData($("#tid").val());
			   }
	 	},
         error: function (msg) {
            
         }
     });
	
})


//初始化
function load_ModifyData(id){
	 $.request({
       url: '/manager/member/cardType/selectOne/'+id,
       type: "POST",
	   datatype : "json",
	   traditional: true,
       success: function (data) {
		     $(".limit-time").val(data.data.cardType.activeTime);//有效日期
		     $("input[name='typeCode']").val(data.data.cardType.typeCode);//类型编码
		     $("input[name='typeName']").val(data.data.cardType.typeName);//类型名称                                     
		     $("input[name='remark']").val(data.data.cardType.remark);//备注
		     $(".categoryCode>option").each(function(){//会员所属分类
		    	  if($(this).val() == data.data.cardType.categoryCode ){
		    		 $(this).prop("selected",true);  
		    	  }
		     });
		     var isValue =data.data.cardType.isValue||0;
		     if(data.data.cardType.isValue){
		    	if(data.data.cardType.isValue == 1){
		    	    $("input[name='isValue']").prop("checked",true);
		    	}else if(data.data.cardType.isValue == 0){
	    	     	$("input[name='isValue']").prop("checked",false);
		    	}
		     }
		     if(data.data.cardType.isPassword){
			    	if(data.data.cardType.isPassword == 1){
			    	    $("input[name='isPassword']").prop("checked",true);
			    	}else if(data.data.cardType.isPassword == 0){
		    	     	$("input[name='isPassword']").prop("checked",false);
			    	}
			     }
		     if(data.data.cardType.sizeN){//密码位数
		    	        $(".div-three").find("label.tog").removeClass("hidden");
		    	        $("input[name='sizeN']").removeClass("hidden");
			    	    $("input[name='sizeN']").val(data.data.cardType.sizeN); 	
			  }
		       data.data.cardType.isScore == 1 && $("input[name='isScore']").prop("checked",true);
		       $("input[name='isScore']").prop("checked")&&  $("li.jf").removeClass("hidden");//$(".jf").removeClass("hidden");
		       $("input[name='isScore']").prop("checked")&& $("#byScoreUpGrade").attr("disabled",false);
		       //积分设置
		       if(data.data.cardType.isScore==1){
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
		    	             
		    	 tableLoad("#score-set",0); //加载积分设置表格     
		    	   
		       }
		       
		       data.data.cardType.isRebate == 1 && $("input[name='isRebate']").prop("checked",true);//$(".zk").removeClass("hidden");
		       $("input[name='isRebate']").prop("checked")&&  $("li.zk").removeClass("hidden");
		       //折扣设置
		       if(data.data.cardType.isRebate==1){
		    	 if(data.data.cardType.mrebate.syPrice){//适用价格
		    		  $("select[name=syPrice]").find("option[value='"+data.data.cardType.mrebate.syPrice+"']").attr("selected",true);
		    	 }                    
		    	 if(data.data.cardType.mrebate.modeFlag){ //统一折扣  按商品类型折扣
		    		 if(data.data.cardType.mrebate.modeFlag==1){
		    			 $("#common").prop("checked",true);
		    			 $("input[name=rate]").attr("disabled",false);
		    			 $("input[name=rate]").val("100");
		    		 }
		    		 if(data.data.cardType.mrebate.modeFlag==2){
		    			 $("#byGoods").prop("checked",true);
		    			 $("input[name=rate]").val("");
		    			 $("input[name=rate]").attr("disabled",true);
		    		 }
		    	 }    
		    	 if(data.data.cardType.mrebate.isRebate==1){//促销商品是否允许折扣
		    	     $("input[name=isRebate]").prop("checked",true);
		    	 }
		    	 if(data.data.cardType.mrebate.rate){ //通用折扣率
		    		 $("input[name=rate]").val(data.data.cardType.mrebate.rate);
		    	 }            
		    	 tableLoad("#buget-set",1);  //加载折扣设置表格
		       }
		       
		       data.data.cardType.isUp == 1 && $("input[name='isUp']").prop("checked",true);//$(".sj").removeClass("hidden");
		       $("input[name='isUp']").prop("checked")&&  $("li.sj").removeClass("hidden");
		       //升级设置
		       if(data.data.cardType.isUp==1){
		    	 if(data.data.cardType.mcardup.timeFlag){//无时限&按时限
		    		 if(data.data.cardType.mcardup.timeFlag==1){//无时限
		    			 $("#noLimit").prop("checked",true);
		    			 $("input[name=tjNum]").val("");
		    			 $("input[name=tjNum]").attr("disabled",true);
		    			 $("input[name=checkDate]").val("");
		    			 $("input[name=checkDate]").attr("disabled",true);
		    			 
		    		 }
		    		 else if(data.data.cardType.mcardup.timeFlag==2){//按时限
		    			 $("#byLimit").prop("checked",true);
		    			 $("input[name=tjNum]").attr("disabled",false);
		    			 $("input[name=checkDate]").attr("disabled",false);
		    			 
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
		    		 }
		    		 if(data.data.cardType.mcardup.upFlag==2){//按积分升级
		    			 $("#byScoreUpGrade").prop("checked",true);
		    			     //一定要有积分设置的选项卡进行设置
		    			 
		    		 }
		    	 }   
		       }
		       
		       
		       //增值服务勾选
		       if(data.data.cardType.asList.length!=0){
		    	   for(var i=0;i<data.data.cardType.asList.length;i++){
		    		        var dataOne=data.data.cardType.asList[i];
		    		        $("#jqGrid_addService").jqGrid('setSelection',dataOne.id);
				    		$("#jqGrid_addService").jqGrid('setCell',dataOne.id,'ssbz',dataOne.ssbz); //收费标准
				    		 $("#jqGrid_addService").jqGrid('setCell',dataOne.id,'swcs',dataOne.swcs); //会员效期内可服务次数
		    	   }
		       }
		       $("#myTab>li:not(.hidden):first").find("a").tab("show");//显示选项卡
	           var toggleTab =$("#myTab>li:not(.hidden):first").find("a").attr("href");
		       var idx = $(".nav>li.active").index();
		       tableLoad(toggleTab,idx);//设置表格参数加载表格
	 	},
       error: function (msg) {
         
       }
   });
	
}
/*有效时间 、消费金额、对应积分、积分抵现：正整数   /^\\d+$/ */
	 $(".limit-time,.f5,.positive,.calculate-time,.ck-data,input[name='dsoure']").on("input propertychange",function(){
	 	  var v = $(this).val(); 
	 	  var aftv = v.replace(/[^\d\s]/g,'');
		 	  	var nv = parseInt(aftv);//屏掉0XX
		 	  	if(isNaN(nv)){
		 	  		 $(this).val("") ;
		 	  	}else{
		 	  		 $(this).val(nv) ;
		 	  	}
	 	 
	 	
	 });
	
	/*类型编码  ：字母、数字 */
	$(".lxbm").on("input propertychange",function(){
		 var reg =/[\u4e00-\u9fa5]|[\@\#\+\-\^\(\)\*\&\%\$\#\{\}\?\;\:\'\'\"\"\<\>\.]+$/;
		 var v = $(this).val(); 
		 var aftv = v.replace(reg,'');
		  $(this).val(aftv) ;
	});
	
	/*类型名称 ：符号屏掉空格*/
	$(".lxmc").on("input propertychange",function(){
		 var v = $(this).val(); 
		$(this).val(v.trim());
		
	});
	
	 /*储值功能*/
	 $("#storgeVal").on("click",function(){
	 	$(this).prop("checked") && $("#passwordCk").prop("checked",true) && $("#passwordCk").parents(".div-three").find(".hidden").removeClass("hidden");
		$(this).prop("checked") || $("#passwordCk").prop("checked",false);
		$(this).prop("checked") ||	$('#togglingForm').data('bootstrapValidator').resetField('sizeN', true);
		$(this).prop("checked") || $("#passwordCk").parents(".div-three").find(".tog").addClass("hidden");
		$(this).prop("checked") || $("#passwordCk").parents(".div-three").find("input[name='sizeN']").addClass("hidden");
	 });
	 
	 /*是否需要密码验证*/
	  $("#passwordCk").on("click",function(){
	  	$(this).prop("checked") && $("#storgeVal").prop("checked",true);
	  	$(this).prop("checked") && $(this).parents(".div-three").find(".hidden").val("");
	  	$(this).prop("checked") && $(this).parents(".div-three").find(".hidden").removeClass("hidden");
		$(this).prop("checked") ||	$('#togglingForm').data('bootstrapValidator').resetField('sizeN', true);
	  	$(this).prop("checked") || $("#storgeVal").prop("checked",false);
	  	$(this).prop("checked") || $(this).parents(".div-three").find(".tog").val("");
	  	$(this).prop("checked") || $(this).parents(".div-three").find(".tog").addClass("hidden");
	  });
	  
	  function hiddenTab(selctor){
			$(".nav-tabs>"+selctor).removeClass("active");//移除激活选项
			$(".tab-content>"+selctor).removeClass("active");//移除激活展示的tab
			$(".nav-tabs>"+selctor).addClass("hidden");//隐藏选项卡
			$("#myTab>li:not(.hidden):first").find("a").tab("show");//显示选项卡
		}
	  
	  function showTab(selctor){
		  $(".nav-tabs>.active").removeClass("active");
		   $(selctor).removeClass("hidden");
           $(selctor).find("a").tab("show");//显示选项卡
           var toggleTab =$(selctor).find("a").attr("href");
	       var idx = $(".nav>li.active").index();
	       tableLoad(toggleTab,idx);//设置表格参数加载表格
	  }
	  
	  /*积分功能*/
	 $(".points-fct").on("click",function(){
	 	 $(this).prop("checked") && showTab("li.jf");
	 	 $(this).prop("checked") || hiddenTab(".jf");
	 	 $(this).prop("checked") || $(".rdio-points").prop("checked",false)  ;
	 	 $(".rdio-points").prop("checked") || $(".rdio-custom").prop("checked",true) ;
	 });
	 
	   /*打折功能*/
	 $(".sale-fct").on("click",function(){
	 	 $(this).prop("checked") && showTab("li.zk");
	 	 $(this).prop("checked") || hiddenTab(".zk");
	 });
	 
	   /*会员升级*/
	 $(".upgrade-fct").on("click",function(){
		 $(this).prop("checked") && showTab("li.sj");
	 	 $(this).prop("checked") || hiddenTab(".sj");
	 	 selectNotVaculm($(".sjlb"));
	 	 selectNotVaculm($(".xjlb"));
	 });

/*global vari*/
var baseAftEditCellRowId ="";
var baseAftEditCellCellName ="";
var baseAftEditTableName ="";
function loadmodal(options){
	/*初始化表格参数*/
        var colNamec = [];
		var colName1 = ['隐藏的商品分类ID','操作','分类编码','分类名称','消费金额','对应积分'];//积分设置
		colNamec[1]=colName1;
		
		var colName2 = ['隐藏的商品分类ID','操作','分类编码','分类名称','折扣率%'];//折扣设置
		colNamec[2]=colName2;
		
		var colName4 = ['id','服务名称','是否永久有效','服务期限','是否不限次数','效期内可服务次数','预设定价','收费标准','会员效期内可服务次数','是否关联串号','备注'];//增值服务
		colNamec[4]=colName4;
		
		var colName5 = ['ID','商品编码','商品名称','商品类别','商品品牌','商品型号','商品颜色','网络制式','是否管理串号'];
		colNamec[5]=colName5;
					
		var JqGridColModelc = []; 
		//积分设置
		var JqGridColModel1 =[
			                    {name:'goodsclassId',index:'goodsclassId', width:70,align:'center',hidden:true},
							   	{name:'deliveryDo',index:'deliveryDo', width:70,align:'center',formatter:addAndDelete},
								{name:'code',index:'code', width:100,align:'center', sortable:false},
								{name:'name',index:'name', width:100,align:'center',sortable:false},
								{name:'aomunt',index:'aomunt', width:100,align:'center',sortable:false,formatoptions:{thousandsSeparator:",",defaulValue:"",decimalPlaces:0},editable:true,editrules:{required:true,custom:true,custom_func:Digital}},//,edittype:'custom',editoptions:{custom_element:myelem,custom_value:myvalue}
								{name:'score',index:'score', width:100,align:'center',sortable:false,formatoptions:{thousandsSeparator:",",defaulValue:"",decimalPlaces:0},editable:true,editrules:{custom:true,custom_func:Digital}},//,edittype:'custom',editoptions:{custom_element:myelem,custom_value:myvalue}
								
			                ];
		JqGridColModelc[1]=	JqGridColModel1;     
		//折扣设置
		var JqGridColModel2 =[
		                        {name:'goodsclassId',index:'goodsclassId', width:70,align:'center',hidden:true},
		                        {name:'deliveryDo',index:'deliveryDo', width:70,align:'center',formatter:addAndDelete},
								{name:'code',index:'code', width:100,align:'center',sortable:false},
								{name:'name',index:'name', width:100,align:'center',sortable:false},
								{name:'rate',index:'rate', width:100,align:'center',sortable:false,editable:true,editrules:{custom:true,custom_func:Digital_Point}}//,edittype:'custom',editoptions:{custom_element:myelem,custom_value:myvalue}
			                ];
		JqGridColModelc[2]=	JqGridColModel2;    
		//增值服务
		var JqGridColModel4 =[
								{name:'id',index:'id', width:100,align:'center',sortable:false,hidden:true},
								{name:'serviceName',index:'serviceName', width:100,align:'center',sortable:false},//服务名称
								{name:'serviceDue',index:'serviceDue', width:100,align:'center',sortable:false,formatter:'select', editoptions:{value:"0:√"}},//是否永久有效
								{name:'serviceDue',index:'serviceDue', width:100,align:'center',sortable:false},//服务期限
								{name:'userNum',index:'userNum', width:100,align:'center',sortable:false,formatter:'select', editoptions:{value:"0:√"}},//是否不限次数
								{name:'userNum',index:'userNum', width:155,align:'center',sortable:false},//效期内可服务次数
								{name:'setPrice',index:'setPrice', width:100,align:'center',sortable:false},//预设定价
								{name:'ssbz',index:'ssbz', width:100,align:'center',sortable:false,formatoptions:{thousandsSeparator:",", defaulValue:"",decimalPlaces:2},editable:true,editrules:{custom:true,custom_func:Digital_Point_Vacume}},//收费标准
								{name:'swcs',index:'swcs', width:155,align:'center',sortable:false,formatoptions:{thousandsSeparator:",", defaulValue:"",decimalPlaces:0},editable:true,editrules:{required:true,custom:true,custom_func:Digital}}, //会员效期内可服务次数
								{name:'ifIm',index:'ifIm', width:100,align:'center',sortable:false,formatter:'select', editoptions:{value:"1:√;0:"}},//是否关联串号							
							    {name:'remark',index:'remark', width:100,align:'center',sortable:false},//备注
			                ];
		JqGridColModelc[4]=	JqGridColModel4;  
		var JqGridColModel5=[
								{name:'blocId',index:'blocId', width:55,align:'center', sortable:false,hidden:true},
								{name:'codeSP',index:'codeSP', width:100,align:'center', sortable:false},
								{name:'nameSP',index:'nameSP', width:100,align:'center', sortable:false},
								{name:'sortSP',index:'sortSP', width:100,align:'center', sortable:false},
								{name:'brandSP',index:'brandSP', width:100,align:'center', sortable:false},
								{name:'modelSP',index:'modelSP', width:100,align:'center',sortable:false},
								{name:'colorSP',index:'colorSP', width:100,align:'center', sortable:false},
								{name:'networkSP',index:'networkSP', width:100,align:'center',sortable:false},
								{name:'ifName',index:'ifName', width:100,align:'center',sortable:false,formatter:'select', editoptions:{value:"0:√;1:"}}
					        ];
	JqGridColModelc[5]=	JqGridColModel5;  	                
					
		var rowid='';
		var colid='';
		var select_name='';
		var defaults = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../json/associator/typemanager.json",
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		TableName: "", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"",
		TableInfo:"",
		choose:false,
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
			            cellEdit:true,
			            cellsubmit:'clientArray',
			            editurl: 'clientArray',
			            sortable:false,			            
			            rownumbers:true,
			            rowNum: -1,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		       
			            width: "100%" ,
			            height: $(window).height()*0.65,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						multiselect:options.choose,
						multiboxonly:true,
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
						},
						onCellSelect:function(id,index,cellcontent,e){
							var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
					      	select_name=colName
					      	select_index=index;
							
							if(options.TableName=="#jqGrid_jfsz"){
								if(colName=="code"||colName=="name"){
							      $("#jqGrid_jfsz").find("tr#"+id).find("td:eq("+index+")").attr("data-toggle","modal");
							      $("#jqGrid_jfsz").find("tr#"+id).find("td:eq("+index+")").attr("data-target","#goodsch");
								}
							}
							if(options.TableName=="#jqGrid_goodsDiscount"){
								if(colName=="code"||colName=="name"){
								  $("#jqGrid_goodsDiscount").find("tr#"+id).find("td:eq("+index+")").attr("data-toggle","modal");
								  $("#jqGrid_goodsDiscount").find("tr#"+id).find("td:eq("+index+")").attr("data-target","#goodsch");
								}
							}
					     
						},
						beforeEditCell:function(rowid,cellname,v,iRow,iCol){
													lastrow = iRow;
													lastcell = iCol;
						},
						afterEditCell: function(rowid, cellname, value, iRow, iCol){//编辑完cell
							baseAftEditTableName=options.TableName;
							baseAftEditCellRowId =iRow;
							baseAftEditCellCellName = iCol;
						},
						beforeSelectRow:function(rowid,e){
					
                          
                            
						},
						afterInsertRow: function (rowid, aData){ //新增一行之后

						},
						gridComplete: function(){

						},
						loadComplete:function(data){
							var len =0;
							if($("#tid").val()){//修改功能
								 if(options.TableName=="#jqGrid_jfsz"){//积分设置
										 len = data.data.cardType.mscoreTssp.length;
										 if(len ==0){/*没有数据的时候*/
								         	 $(options.TableName).jqGrid('addRowData', "1", {},'first');
								         }
								 }
								 if(options.TableName=="#jqGrid_goodsDiscount"){//折扣设置
									 len = data.data.cardType.mrebateTssp.length;
									 if(len ==0){/*没有数据的时候*/
							         	 $(options.TableName).jqGrid('addRowData', "1", {},'first');
							         }
								 }
						        if(options.TableName=="#jqGrid_addService"){
						        	  var rowIDs=$("#jqGrid_addService").jqGrid('getDataIDs');
								        for(var i=0;i<rowIDs.length;i++){
								        	 var rowData=$("#jqGrid_addService").jqGrid('getRowData',rowIDs[i]);
								        	 $("#jqGrid_addService").jqGrid('setCell',rowIDs[i],'feeScale',rowData.setPrice);
								        	 $("#jqGrid_addService").jqGrid('setCell',rowIDs[i],'muserNum',rowData.cs);
								        }
						        }
							}else{//新增功能
							
								   if(options.TableName=="#jqGrid_jfsz"||options.TableName=="#jqGrid_goodsDiscount"){
									   $(options.TableName).jqGrid('addRowData', 1, {},'last');//积分设置
								   }
								   if(options.TableName=="#jqGrid_addService"){
									   var len1 =data.data.rows.length;
									   for(var i=0; i<len1; i++){
										   var rowData =data.data.rows[i];
										   if(!rowData.ssbz){
										     $(options.TableName).setCell(rowData.id,"feeScale",rowData.setPrice); 
										   }
										   if(!rowData.muserNum){
											   $(options.TableName).setCell(rowData.id,"muserNum",rowData.cs); 
										   }
									   }
									   
								   }
							}
						    
						},
						loadError:function(xhr,status,error){
							//console.log(status)
						}
						})
		
			}
			
			  function addAndDelete(cellvalue, options, rowObjec){
					var addAndDel ='<div class="operating" data-id="' + options.rowId + '"><span style="cursor:pointer;margin-right:10px" class="icon-plus" id="icon-plus" title="添加" ></span><span style="cursor:pointer;" class="icon-trash" id="icon-trash" title="删除"></span></div>';
					return addAndDel;
			  }

               //数字验证(必填)
			 function Digital(value,colname){//会员效期内可服务次数
				 var reg=/^[0-9]*$/;
				  if (reg.test(value)&&value!=""){ 
					    return [true,""];
				  }else {
				         return [false,"值不合法,"+colname+"只允许输入自然数"];
			       }
			 }
			 
				//自然数或者小数验证（必填）
			 function Digital_Point_Vacume(value,colname){//收费标准
				    var reg=/^\d+$|^\d{1,8}(\.\d{1,2})?$/;
				  if (reg.test(value)||value==""){ 
					   return [true,""];
				  }
				  else{ 

					  if(/^\d+$|^\d{1,8}(\.\d{3,})?$/.test(value)||value==""){
						  return [false,colname+"小数点后最多两位"];
					  }
				       return [false,"值不合法,"+colname+"只允许输入自然数或者小数！"];
				  }
				 
			 }
			 //整数或者小数验证（必填）
			 function Digital_Point(value,colname){
				  var reg=/^[0-9]+([.]{1}[0-9]+){0,1}$/;
				  if (reg.test(value)&&value!=""){ 
					   return [true,""];
				  }else{ 
					  if(value==""){
				       return [false,colname+"该项必填"];	
				      }
				       return [false,"值不合法,"+colname+"只允许输入自然数或者小数！"];
				  }
				 
			 }

		   
			//批量删除
			$(document).on('click','.btnDeleteRow',function(e){
				
				var checkedList = [];//存放已勾选行id
				$('.del').each(function (index, domEle) { 
					  // domEle == this 
					($(domEle).prop('checked')) ? (checkedList.push($(domEle).data('id'))) : '';
				});
				
				var len = checkedList.length;
				if(len == 0){
					$.zxsaas_plus.showalert("错误","请勾选集团后再删除!");
					return false;
				}else{
					$.zxsaas_plus.showconfirm("","是否确定删除选中数据?",function(){
						for(var i = 0;i < len;i ++){
							$(options.TableName).jqGrid('delRowData', checkedList[0]);
							checkedList.shift();
						}
					},function(){
					
					});
				}
			});
			
			
		
			
			
	
		//查询
		$(document).on("click",".btn-group button[data-eventname='inquire']",function(event){			
			if(flag==true){
			$.jgrid.GridDestroy(options.TableName);
			loadtable();
			}else{
				flag=true;
			}
			
		});
		

}
		


function initial(data1){
///*默认显示积分设置*/
	/*升级设置*/
	selectNotVaculm($(".sjlb"));
	selectNotVaculm($(".xjlb"));
}

$(document).on("click","a[data-toggle='tab']",function(){
	saveLstCell();
});

function tableLoad(toggleTab,idx){
	//resizeWidth();
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
resizeWidth();
	
}

function drawTable(tn,pger,tableinfo){
	  var id =$("#tid").val()||-1;
		if(tableinfo == 1){//积分设置表格

		loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "/manager/member/cardType/selectOne/"+id,dataRows:"data.cardType.mscoreTssp"});	
	   
		}
		else if(tableinfo == 2){//折扣设置表格
			loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "/manager/member/cardType/selectOne/"+id,dataRows:"data.cardType.mrebateTssp"});	
		}
		else if(tableinfo == 4){//增值服务表格
			loadmodal({TableName:"#jqGrid_addService",TableInfo:tableinfo,LoadTableUrl: '/manager/member/cardType/selectaddServiceList?isStop=0',choose:true});	
		    
		}
}

function setInitalData($this){
	if($this.hasClass("jf")){
		if($(".cks").find(".xfje").val() != "" || $(".cks").find(".xfje").val() != null ||$(".cks").find(".xfje").val() != undefined){
			$("div.jf").find("table").setCell(1,"customCash", $(".cks").find(".xfje").val());
		}
		if($(".cks").find(".dyjf").val() != "" || $(".cks").find(".dyjf").val() != null ||$(".cks").find(".dyjf").val() != undefined){
			$("div.jf").find("table").setCell(1,"points", $(".cks").find(".dyjf").val());
		}
							
	}
}

function selectNotVaculm(slct){
	var $this =slct;
	var t = slct.find("option:selected").text();   
	if($this.hasClass("sjlb")){
		if(t==""){
		   $(".notup>input").attr("disabled",true);
	    } 
	}
	if($this.hasClass("xjlb")){
		if(t==""){
		   $(".notdown>input").attr("disabled",true);
	    } 
	}
}
	/*表格弹窗tree + table*/
	var rowId = '';
	/*导入模态框*/
	$(document).on('show.bs.modal', "#goodsch",function (e) {
      var ptId=$(e.relatedTarget).parents("table").attr("id");
		var setting = {  
		        data: {
					simpleData: {
						enable: true,
						idKey: "id",
						pIdKey: "pid",
						rootPId: null
					}
				},
				callback: {
					onClick: function (event, treeId, treeNode, msg) {
						//controllAdd(treeNode.id);//通过id调用对应方法 重构表格

					},
					onDblClick: function(event, treeId, treeNode){
						 if(treeNode.id>-1){
							 
							if(treeNode.obj){
								 var f =checkOrNot(treeNode,"#"+ptId);
								 if(!f){
									   $("#"+ptId).setCell(rowId,'code',treeNode.obj.code)//分类编码treeNode.obj.code
									   $("#"+ptId).setCell(rowId,'name',treeNode.obj.name)//分类编码
									   $("#"+ptId).setCell(rowId,'goodsclassId',treeNode.obj.id)//隐藏的商品分类ID   treeNode.obj.id         
									   $('#goodsch').modal('hide');//关闭商品资料模态框
								 }else{
									 $.zxsaas_plus.showalert("提示","已经选择!");
								 }
							//$("#"+ptId).find("#"+rowId).find("td[aria-describedby="+ptId+"_goodsclassId]").attr("name","goodsclassId");
							}
							
						 }else{
							 $.zxsaas_plus.showalert("提示","不能选择!");
						 }
						
					}
				},
				view: {
					showIcon: false
				}
		    }; 
		    rowId = $(e.relatedTarget).parent("tr").attr("id");
		     $.request({
		            type: 'Get',
		            url: '/manager/Tgoodsclass/findTree2',//树结构地址
		            dataType: "json", 
		            success: function (data1) {
	                   
		                $.fn.zTree.init($("#goodsDataTree"), setting, data1);
		                var zTree1 = $.fn.zTree.getZTreeObj("goodsDataTree");
	                	zTree1.expandAll(true);//展开全部节点
	                	
		            },
		            error: function (msg) {
		            	
		            }
		        });
		     var liidx = $(".phead>li.active").index();
		      drawTable(liidx,"#jqGridTranGoods","#gridpagerTranGoods","5") ;//加载商品表格
	});

	//判断是否选中
	function checkOrNot(treeNode,tn){
		  var ids = $(tn).jqGrid('getDataIDs'); 
		  for(var i=0;i<ids.length;i++){
			  var rowData = $(tn).jqGrid('getRowData',ids[i]);  
			  if(rowData.goodsclassId){
					if(tn=="#jqGrid_jfsz"){//积分设置
						if(rowData.goodsclassId==treeNode.obj.id){
							return true;
						}
						
					}else{//折扣设置
						if(rowData.goodsclassId==treeNode.obj.id){
							return true;
						}
						
					}
			  }
		  }
		  return false;
		
	}

var lastrow = "";
var lastcell = "";
//新增保存 
$(document).on("click",".saveType",function(event){	
	saveLstCell();
	var obj=$("#typeMain").toJsonObject();
	if($("#tid").val()!=""){
		obj.id=$("#tid").val();
	}
	//折扣
	if(obj.isRebate==1){
		//valiObj.togglingFormZK=$("#togglingFormZK").data('bootstrapValidator');
		var zk=$("#buget-set").toJsonObject();
		var rowIds1 = $("#jqGrid_goodsDiscount").jqGrid('getDataIDs'); 
		var zkList =[];
		for(var i=0;i<rowIds1.length;i++){
		   var d={};
		   var rowData = $("#jqGrid_goodsDiscount").jqGrid("getRowData",rowIds1[i]);
		   var goodsclassId =rowData.goodsclassId;
		   var rate= rowData.rate;
		   if(goodsclassId!=""&&rate!=""){
			   d.goodsclassId=goodsclassId;
			   d.rate=rate;
			   zkList.push(d);
		   }
		}
		if(zk.modeFlag==2&&zkList.length<1){
		
				$.zxsaas_plus.showalert("提示 ","特殊商品不能为空");
				return;
		}
		obj.mrebate=zk;
		obj.mrebateTssp=zkList;
	}
	
	//积分功能
	if(obj.isScore==1){
		//valiObj.togglingFormJF=$("#togglingFormJF").data('bootstrapValidator');
		var jf=$("#score-set").toJsonObject();
		var list=[];
	  //  var jfList = $("#jqGrid_jfsz").jqGrid("getRowData");
		var jfList =[];
		var rowIds2 = jQuery("#jqGrid_jfsz").jqGrid('getDataIDs'); 
	    for(var i=0;i<rowIds2.length;i++){
			   var d={};
			   var rowData2 = $("#jqGrid_jfsz").jqGrid("getRowData",rowIds2[i]);
			   var goodsclassId =rowData2.goodsclassId;
			   var score=rowData2.score;
			   var amount= rowData2.aomunt;
			   if(goodsclassId!=""&&score!=""&&amount!=""){
				   d.goodsclassId=goodsclassId;
				   d.score=score;
				   d.aomunt=amount;
				   jfList.push(d);
			   }
			}
		obj.mscore=jf;
		obj.mscoreTssp=jfList;
	
	}
	
	//升级
	if(obj.isUp==1){
		//valiObj.togglingFormJF=$("#togglingFormJF").data('bootstrapValidator');
		var sj=$("#update-set").toJsonObject();
		obj.mcardup=sj;
	}
	
	//增值服务
	var zzid = $("#jqGrid_addService").jqGrid('getGridParam','selarrrow');//选中的行id
	var rel =[];
	for(var i=0;i<zzid.length;i++){
		var zzfwobj={};
		var rowData = $("#jqGrid_addService").jqGrid('getRowData',zzid[i]);
		zzfwobj.feeScale=rowData.ssbz;
		zzfwobj.muserNum=rowData.swcs;
		zzfwobj.serviceId=rowData.id;
		if(rowData.ssbz==''){
			zzfwobj.feeScal = 0;
		}
		if(rowData.swcs==''){
			zzfwobj.muserNum = 0;
		}
		rel.push(zzfwobj);
	}
	obj.relList=rel;
	

	//if(sign){
	//判断验证是否通过
	var bootstrapValidator = $("#togglingForm").data('bootstrapValidator'); 
	bootstrapValidator.validate();
	var bootstrapValidatorJF = $("#togglingFormJF").data('bootstrapValidator');
	bootstrapValidatorJF.validate();
	var bootstrapValidatorZK = $("#togglingFormZK").data('bootstrapValidator');
	bootstrapValidatorZK.validate();
	if(bootstrapValidator.isValid()&&bootstrapValidatorJF.isValid()&&bootstrapValidatorZK.isValid()){
	  $.request({
            url: '/manager/member/cardType/saveCardType', 
            type: "POST",
		    datatype : "json",
		    contentType: "application/json",
		    data: JSON.stringify(obj),
		    traditional: true,
            success: function (data) {
				 if(data.result==1){
			    		$.zxsaas_plus.showalert("提示",data.desc);
			    		setTimeout(function(){
				    		   $(window.parent.document).find(".body_right .tabBox a.active").find("span").trigger("click");
				    		},600);
			    		
			    	}else{
			    		$.zxsaas_plus.showalert("错误",data.desc);
			    	}
			    	$("#jqGrid_blocMessage").trigger("reloadGrid");
		          },
            error: function (msg) {
              
            }
        });
	}
});


function saveLstCell(){

	$(baseAftEditTableName).jqGrid("saveCell",baseAftEditCellRowId,baseAftEditCellCellName);
}
/*调整表格宽度加载*/
function resizeWidth(){
	var w=$(".content2").width();

	  $("#jqGrid_jfsz").setGridWidth(w);

	  $("#jqGrid_goodsDiscount").setGridWidth(w);

	  $("#jqGrid_addService").setGridWidth(w);
}

//选择上下级时触发事件
function selectUpOrDown(obj){
	//如果是上级
	if(obj==1){
		if($(".lastCardtypeId").val()==$(".nextCardtypeId").val()){
			 $.request({
		         url: '/manager/member/cardType/initType',
		         success: function (data) {
				    var obj = $("#tid").val();
				   //下级类别
				    $(".nextCardtypeId").html("");
			 		$(".nextCardtypeId").append("<option value=''>--- 不选择下级 ---</option>");
				 	for(var i=0;i<data.data.cardList.length;i++){//升级设置 
				 		//下级类别
				 		$(".nextCardtypeId").append("<option value='"+data.data.cardList[i].id+"'>"+data.data.cardList[i].typeName+"</option>");
				 	}},
		         error: function (msg) {
		         }
		     });
			$(".nextCardtypeId option[value='"+$(".lastCardtypeId").val()+"']").remove();
		}
	}
	//如果是下级
	else{
		if($(".lastCardtypeId").val()==$(".nextCardtypeId").val()){
			 $.request({
		         url: '/manager/member/cardType/initType',
		         success: function (data) {
				    var obj = $("#tid").val();
				   //下级类别
				    $(".lastCardtypeId").html("");
			 		$(".lastCardtypeId").append("<option value=''>--- 不选择上级 ---</option>");
				 	for(var i=0;i<data.data.cardList.length;i++){//升级设置 
				 		//下级类别
				 		$(".lastCardtypeId").append("<option value='"+data.data.cardList[i].id+"'>"+data.data.cardList[i].typeName+"</option>");
				 	}},
		         error: function (msg) {
		            
		         }
		     });
			 $(".lastCardtypeId option[value='"+$(".nextCardtypeId").val()+"']").remove();
		}
	}
}

//新增一行
	$(document).on("click",".icon-plus",function(e){
		//确定相应的表格id
		var tabId =$(this).parent().parents("table").attr("id")
		if("jqGrid_jfsz"==tabId){//积分设置
		var ids = $("#jqGrid_jfsz").jqGrid('getDataIDs');
		//获得当前最大行号（数据编号）
		var maxid;
		maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
		$("#jqGrid_jfsz").jqGrid('addRowData',maxid+1,{},'last' );
	    return;
		}
		if("jqGrid_goodsDiscount"==tabId){//折扣设置
		var ids1 = $("#jqGrid_goodsDiscount").jqGrid('getDataIDs');
		//获得当前最大行号（数据编号）
		var maxid1;
		maxid1 = (ids1.length ==0 ) ? 0 : Math.max.apply(Math,ids1);
		$("#jqGrid_goodsDiscount").jqGrid('addRowData',maxid1+1,{},'last' );
		return;
		}
		
	});
//删除一行
$(document).on('click','.icon-trash',function(e){
	var ptId = $(this).parents("table").attr("id");
	var thisTitle = $(this).attr("title");
	var rowId = $(this).parent().data('id');
	var ids =$("#"+ptId).jqGrid('getDataIDs');
	if(thisTitle == "删除"){
		if(ids.length>1){
			$.zxsaas_plus.showconfirm("提示","是否确定删除本行?",function(){
				$("#"+ptId).jqGrid('delRowData', rowId);
			},function(){
				
			});
		}else{
			$.zxsaas_plus.showalert("提示","最后一行不可删除！");
			
		}
		
	
	}
});
