var emp="";
var giftRule=[];
var isGift=0;
function initial(){
	init();
	Tree();	
	initDataGrid2();
	loadmodal({TableName:"#jqGrid_assoList",TableInfo:"3",LoadTableUrl: "/manager/member/cardType/selectAll"});	//会员清零表格加载
	drawTable("#jqGrid_cardInfo","#jqGridPagercI","0");//会员信息表
 	drawTable("#jqGrid_mkCardPile","#jqGridPagermkCardPile","1");//批量制卡
 	drawTable("#jqGrid_cardChoose","#jqGridPagerjqGrid_cardChoose","2");//类型变更
}

/*global var*/
var newRowId ="";
function loadmodal(options){
	/*初始化表格参数*/
    	var colNamec = [];
		var colName0 = ['id','fid','发卡状态','使用状态','会员卡类型','会员卡号','持卡人','密码','手机号','其他联系方式','微信账号','支付宝账号','证件号','邮箱地址','往来单位','出生日期','发卡日期','生效日期','失效日期','初始积分','累计积分','剩余积分','卡内余额','卡密'];  //会员卡信息
		colNamec[0]=colName0;
		var colName1 = ['操作','卡号','卡类型','制卡部门','制卡人','卡密'];//批量制卡
		colNamec[1]=colName1;
		var colName2 = ['id','会员卡号','持卡人','会员卡类型'];//更改会员卡类型
		colNamec[2]=colName2;
		var colName3 = ['会员卡号','密码','持卡人','手机号'];//积分清零选择会员显示
		colNamec[3]=colName3;
		var JqGridColModelc = [];
		     //会员卡信息
		var JqGridColModel0 =[	
                                {name:'id',index:'id', width:100,align:'center',sortable:true,hidden:true},
                                {name:'fid',index:'fid', width:100,align:'center',sortable:true,hidden:true},
                                {name:'status',index:'status', width:100,align:'center',sortable:true,formatter:'select',editoptions:{value:"1:未发卡;2:已发卡;4:已作废"}},
								{name:'faStatus',index:'fa_status', width:100,align:'center',sortable:true,formatter:'select',editoptions:{value:"1:启用;2:停用;3:挂失"}},
								{name:'typeName',index:'type_name', width:150,align:'center',sorttype:'string'},
								{name:'cardNum',index:'card_num', width:100,align:'center',sortable:true},
								{name:'cardholder',index:'cardholder', width:100,align:'center',sortable:true},
								{name:'cardPassword',index:'card_password', width:100,align:'center',sortable:true},
								{name:'tel1',index:'tel_1', width:200,align:'center',sortable:true},
								{name:'tel2',index:'tel_2', width:200,align:'center',sortable:true},
								{name:'wechat',index:'wechat', width:200,align:'center',sortable:true},
								{name:'alipay',index:'alipay', width:200,align:'center',sortable:true},
								{name:'certificateno',index:'certificateno', width:200,align:'center',sortable:true},
								{name:'email',index:'email', width:200,align:'center',sortable:true},
								{name:'unitName',index:'unit_name', width:200,align:'center',sortable:true},
								{name:'csrq',index:'BIRTH', width:200,align:'center',formatter:'date',sortable:true},//出生日期
						        {name:'fkrq',index:'ISSUING_DATE', width:200,align:'center',sorttype:'string',formatter:'date',sortable:true},//发卡日期
								{name:'ksrq',index:'EFFECTIVE_DATE', width:200,align:'center', sorttype:'string',formatter:'date',sortable:true},//生效日期
								{name:'jsrq',index:'INVALID_DATE', width:200,align:'center', sorttype:'string',formatter:'date',sortable:true},//失效日期
								{name:'score',index:'score', width:200,align:'center', sorttype:'string',sortable:true},
								{name:'tatolScore',index:'tatol_score', width:200,align:'center', sortable:true},
								{name:'surScore',index:'sur_score', width:200,align:'center',sortable:true},
								{name:'amount',index:'amount', width:200,align:'center',sortable:true},
								{name:'cardPwd',index:'card_pwd', width:200,align:'center',sortable:true},
			                ];
		JqGridColModelc[0]=	JqGridColModel0;     
		//批量制卡
		var JqGridColModel1 =[
                                {name:'deliveryDo',index:'deliveryDo', width:70,align:'center',formatter:addAndDelete},
							   	{name:'cardNum',index:'cardNum', width:70,align:'center',sortable:false,formatoptions:{thousandsSeparator:"", defaulValue:"",decimalPlaces:0}},
								{name:'cardSort',index:'cardSort', width:100,align:'center',sortable:false},
								{name:'cardMkDis',index:'cardDis', width:100,align:'center',sortable:false},
								{name:'cardStaff',index:'cardStaff', width:100,align:'center',sortable:false},
								{name:'cardPsw',index:'cardPsw', width:100,align:'center',sortable:false}
			                ];
		JqGridColModelc[1]=	JqGridColModel1;   
		//更改会员卡类型
		var JqGridColModel2 =[
		                        {name:'id',index:'id',width:100,align:'center',sortable:false,hidden:true},
							   	{name:'cardNum',index:'cardNum',width:170,align:'center',sortable:false,formatoptions:{thousandsSeparator:"", defaulValue:"",decimalPlaces:0}},
								{name:'cardholder',index:'cardholder',width:170,align:'center',sortable:false},
								{name:'typeName',index:'typeName',width:170,align:'center',sortable:false}
			                ];
		JqGridColModelc[2]=	JqGridColModel2;   
		
		//积分清零表格
		var JqGridColModel3 =[
								{name:'cardNum',index:'card_num', width:100,align:'center',sortable:true},
								{name:'cardPassword',index:'card_password', width:100,align:'center',sortable:true},
								{name:'cardholder',index:'cardholder', width:100,align:'center',sortable:true},
								{name:'tel1',index:'tel_1', width:200,align:'center',sortable:true}
			                ];
		JqGridColModelc[3]=	JqGridColModel3; 
		
		//全局当前选择的rowid colid
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
		celledit:false
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
							root: "data.rows",
							page: "data.page",
					        total: "data.total",
					        records: "data.records",
							repeatitems: false
						},
						colNames:colNames,          
			            colModel:JqGridColModel,
			            cellEdit:options.celledit,
			            cellsubmit:'clientArray',
			            editurl: 'clientArray',
			            sortable:true,	
			            sortorder: 'desc',
			            sortname:"id",			            
			            rownumbers:true,
			            rowNum: 20,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		       
			            width:"100%" ,
			            height: $(window).height()*0.65,
						autowidth:true,
						rownumWidth: 35,
						shrinkToFit:false, 
						multiselect:options.choose,
						multiboxonly:false,
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
						},
						beforeEditCell:function(rowid,cellname,v,iRow,iCol){
							lastrow = iRow;
							lastcell = iCol;
						},
						onCellSelect:function(id,index,cellcontent,e){
							lastrow = id;
						
						},
						onSelectRow:function(rowid,status){
						},
						beforeSelectRow:function(rowid,e){
                            //单行选择
                           /* 	if($(options.TableName).find("tr.success").hasClass("success")){
                            		$(options.TableName).find("tr.success").find("input:checkbox").prop("checked",false);
                            		$(options.TableName).find("tr.success").removeClass("success");
                            	}
                               return true;*/
                            
						},
						afterInsertRow: function (rowid, aData) { //新增一行之后
                               
						},
						gridComplete: function() {
						},
					
						loadComplete:function(data){
						  if(options.TableName=="#jqGrid_cardInfo"){
							 var h =$(".content2 .right-table").height();
							 $(".content2 .left-tree").css({"height":h});
						  }
						},
						loadError:function(xhr,status,error){
						}
						})
		
		}
			
			  function addAndDelete(cellvalue, options, rowObjec){
					var addAndDel ='<div class="operating" data-id="' + options.rowId + '"><span style="cursor:pointer;margin-right:10px" class="icon-edit" id="icon-edit" title="修改" ></span><span style="cursor:pointer;" class="icon-trash" id="icon-trash" title="删除"></span></div>';
					return addAndDel;
			  }

			
			$(window).bind('click', function saveEdit(e) {
				var rowId = $(e.target).parent("tr").attr("id");
				if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
					if ($(e.target).closest(options.TableName).length == 0) { 
						$(options.TableName).jqGrid('saveRow', lastsel);						
						lastsel='';
					}
				}
			})

            //创建一个input输入框
            function myelem (value, options) {
             var reg =/[^\d\s]/g;
              var el = document.createElement("input");
              el.type="text";
              $(el).on("input propertychange",function(){/*只允许正整数*/
              	   $(this).val($(this).val().replace(reg,''));
              });
              el.value = value;
              return el;
            }
            
            //获取值
            function myvalue(elem) {
              return $(elem).val();
            } 
		   //检测输入的是否为正整数
		  function checkNumber(value, colname) {
				var reg = /^[1-9]\d*$/;
				var arr = [];
				arr = (!reg.test(value)) ? ([false,'请输入数字']) : ([true,""])
				return arr;
			}
}

var lastrow="";
var lastcell=""; 
var storageVal="";
$(document).on("blur","input[role='textbox']",function(){
	 var tId =$(this).parents("table").attr("id");
	 var nowD =$(this).val();
	if(nowD!=""){
		 var j=statusPsw(nowD);
		 if(j){
			 $("#"+tId).restoreRow(lastrow);
			 $("#"+tId).setColProp('cardPsw',{editable:false});
		 }else{
			$("#"+tId).jqGrid('saveRow',lastrow);  
			$("#"+tId).setColProp('cardPsw',{editable:false});
		 }
	}else{
		  $.zxsaas_plus.showalert("提示","卡密不能为空!");
	}
});	

function drawTable(tn,pger,tableinfo){
	if(tableinfo == 0){//会员信息表
	    loadmodal({TableName:tn,pager:pger,TableInfo:tableinfo,LoadTableUrl: "/manager/member/cardInfo/selectCardInfoList",choose:true});
	}
	else if(tableinfo == 1){//批量制卡
		loadmodal({TableName:tn,pager:pger,celledit:true,TableInfo:tableinfo,LoadTableUrl: "/manager/member/cardType/selectAll"});	//空地址
	}
	else if(tableinfo ==2){//更改会员卡类型
		loadmodal({TableName:tn,pager:pger,TableInfo:tableinfo,LoadTableUrl: "/manager/member/cardType/selectAll"});	
	}
}


//删除
$(document).on('click','.deleteCard',function(e){
	var ids = $("#jqGrid_cardInfo").jqGrid('getGridParam','selarrrow');//选中的行id
	var flag=true;
	for(var i=0;i<ids.length;i++){
	   var rowData =$("#jqGrid_cardInfo").jqGrid("getRowData",ids[i]); 
	   if(rowData.status==2||rowData.status=="2"){
		   flag=false;  
		   break;
	   }
	}
	if(flag){
		$.zxsaas_plus.showconfirm("提示","是否确定删除数据?",function(){
			$.request({
		          type: 'GET',	
		          url: '/manager/member/facardInfo/delete',//树结构地址
		          data: {"ids":ids},
				  traditional: true,
		          success: function (data) {
		        	  $.zxsaas_plus.showalert("提示","操作成功！");
		          		 $("#jqGrid_cardInfo").trigger("reloadGrid");
		          },
		          error: function (msg) {
		             
		          }
		      });
		},function(){
			
		});
	}else{
		 $.zxsaas_plus.showalert("提示","已发卡项不可删除！");
		 
	}

});

/*批量制卡*/
/********************************************批量制卡*******************************************************/
/*开始制卡*/
var setTimes=0;    //重制上一张   跳过下一张控制器
var arr={};//预先存储制卡信息(制卡状态、成功后表格的行id)
var  sign =0;//初始化之后的当前卡号
var sig;//标志最后一张卡是否完成
$(document).on("click",".start-mkCard",function(e){
	     e.preventDefault();
	     if($("#ornotNum").is(':checked')){
	    	 var count =parseInt($(".overCard").val())-parseInt($(".startCard").val())+1;
			 if(isNaN(count)){
				$.zxsaas_plus.showalert("提示","卡号必须为数字！");
				return;
			}
	     }
	     
	     var h=$(".startCard").val();
	     var t=$(".overCard").val();
	     //非数字卡（数字部分截取）
	     var h_numformat='';
	     var t_numformat='';
	     //非数字卡（字母部分截取）
	     var h_litformat='';
	     var t_litformat='';
	     var crdPsw=$(".cardPsw").val();
	     var rule =parseInt($.trim($(".count-card").val()))||0;
		   if(h!=""&&t!=""){
		    	 if(rule<18&&rule>-1){
					if(h.length==t.length){//合法的卡号范围 
						 if(judgeCardNumber(h)){
							 if(judgeCardNumber(t)){
								 //判断是全数字？
						           if(judgeAllNumber(h)&&judgeAllNumber(t)){
						        	//开始截止卡号都是数字   
						        	   if(h<=t){
						        		   mkCardPre(h,t);
						        	   }else{
						        		   $.zxsaas_plus.showalert("提示","开始卡号必须小于等于截至卡号！");
						        	   }
						           }else{
						        	//判断是否首部字母相同(字母全部转化成大写之后)
						        	   if(litterHead(h,t)){
						        		   h_litformat=getLit_disp(h);
						        		   h_numformat=getNum_disp(h);
						        		   t_litformat=getLit_disp(t);
						        		   t_numformat=getNum_disp(t);
						        		   if(h_numformat<=t_numformat){
							        		   mkCardPre(h,h_numformat,t,t_numformat,h_litformat);//卡号位数(显示)、开始卡号()、结束卡号()
							        	   }else{
							        		   $.zxsaas_plus.showalert("提示","开始卡号数字部分必须小于等于截至卡号数字！");
							        	   }
						        	   }else{
						        		   $.zxsaas_plus.showalert("提示","开始卡号与截止卡号首字母不匹配！");
						        	   }
						           }
							 }else{
								 $.zxsaas_plus.showalert("提示","截止卡号格式不正确(首字母加数字或数字)！");
							 }
						 }else{
							 $.zxsaas_plus.showalert("提示","卡号开头必须为字母或数字卡号尾号不能为字母！");
						 }

					}else{//非法的卡号范围
					   
					         $.zxsaas_plus.showalert("提示","开始卡号与截至卡号长度必须一致！");
					}
		    	 }else{
		    		  $.zxsaas_plus.showalert("提示","卡号位数为0-17位！");
		    	 }
		     }else{
		    	 if(h==""){
		    	    $.zxsaas_plus.showalert("提示","请输入开始卡号！");
		    	 }
		    	 else if(t==""){
		    		 $.zxsaas_plus.showalert("提示","请输入截至卡号！");  
		    	 }
		    	 
		     }
	  
});
 
function mkCardPre(){
		//数字部分/数字
		var h_num='',
		    t_num='',
		    lit='',
		    flag='';//数字模式(0) 字母数字模式(1)
		if(arguments.length==2){//全数字模式准备制卡
			h_num=arguments[0];
			t_num=arguments[1];
			flag=0;
		}else{//字母+数字模式制卡准备
			h_num=arguments[1];
			t_num=arguments[3];
			lit=arguments[4];
		    flag=1;
		}
		$(".count-card").val(arguments[0].length);//卡号位数
		//开始准备制卡的时候应该将arr清空 ??
		arr ={};
		for(var i = h_num;i<=t_num;i++){//初始化状态(卡号的数字部分)
			   var chgNum = (flag==1?lit+CardNum(i,h_num.length): lit+CardNum(i,parseInt($(".count-card").val())));
			//   var chgNum =  lit+CardNum(i,parseInt($(".count-card").val()));//显示卡号（chgNum）
			   arr[chgNum]={};
			   arr[chgNum].status=0;
			   arr[chgNum].locat=0;
		}
		//var count =parseInt($(".overCard").val())-parseInt($(".startCard").val())+1;//卡号的数字部分
		var count =parseInt(t_num)-parseInt(h_num)+1;//卡号的数字部分
		$(".cardNums").find("input").attr("disabled",true);
		$(".count-card").attr("disabled",true);
		$(".needMk").val(count||0);//需要制卡张树
		$(".start-mkCard").attr("disabled",true);//将点击事件禁用
		
		if($("#ornotNum").prop("checked")){
		    $(".alMk").val($(".needMk").val());
		}else{
			$(".cardPsw").removeAttr("disabled");
			$(".cardPsw").removeAttr("readonly");
			$(".nowCardNum").val($(".startCard").val());//当前卡号
			sign =$(".nowCardNum").val();
			sig=true;
			 setTimes=0;
			 var ids = $("#jqGrid_mkCardPile").jqGrid('getDataIDs')||[];
			 ids.length==0?0:ids.length;
			 $(".alMk").val(ids.length||0);//默认的空卡
			 $(".cardPsw").is(":visible")&&$(".cardPsw").focus();//////////////
		}

}
/*会员卡号判断是否首字母相同*/
function litterHead(value1,value2){
	//没有区分大小写的正则表达式
	var v1_litterformat = value1.match(/([A-Z]*)/g)[0];
	var v2_litterformat = value2.match(/([A-Z]*)/g)[0];
	if(v1_litterformat!=""&&v2_litterformat!=""){
		if(v1_litterformat==v2_litterformat){
			return true;
		}else{
			return false;
		}
	}else{
		$.zxsaas_plus.showalert("提示","会员卡号格式非法！");  
		return false;
	}
}

/*会员卡号格式判断(字母为首+数字结尾或数字)*/
function judgeCardNumber(value){
	var reg = /^[a-zA-Z]*[0-9]{1,17}$|^[0-9]{1,17}$/;
	if(reg.test(value)){
		return true;
	}else{
		return false;
	}
	
}
/*会员卡号是否为全数字*/
function judgeAllNumber(value){
	var reg = /^[0-9]{0,17}$/;
	if(reg.test(value)){
		return true;
	}else{
		return false;
	}
}
/*提取卡号的数字部分*/
function getNum_disp(value){
	if(judgeAllNumber(value)){
		return value;
	}else{
       return value.match(/(\d*)([A-Z]*)/g)[1];
	}
}
/*提取卡号的字母部分*/
function getLit_disp(value){
	if(judgeAllNumber(value)){
		return "";
	}else{
      return value.match(/(\d*)([A-Z]*)/g)[0];
	}
}

/*清空*/
$(document).on("click",".cancel-mkCard",function(){ 
	 var ids =$("#jqGrid_mkCardPile").jqGrid('getDataIDs');
	 if(ids.length>0){
		$.zxsaas_plus.showconfirm("提示","是否清空已制作的卡?",function(){
			clearPileCards();
		},function(){
			
		});
	 }else{
		 clearPileCards(); 
	 }
});

/*卡密(输入卡密开始制卡)*/
$(document).on("keydown",".cardPsw",function(event){
	  if(event.keyCode == 13){
		       var stopCard =$(".overCard").val()|| 0;
		       var stpCard_num = getNum_disp(stopCard);
		       var sign_num= getNum_disp(sign);
		       var sign_lit= getLit_disp(sign);
		    if(sig){
		      if(sign_num<=stpCard_num){
		    	  if($(this).val()==""){
		    		$.zxsaas_plus.showalert("提示","卡密不能为空！");
		    	  }else{//---
		    		  var f=statusPsw($(this).val());
		    		  if(f){//卡密重复
		    				$.zxsaas_plus.showalert("提示","卡密重复！");  
		    		  }else{
					    	if(sign_num == stpCard_num){
					    		if(arr[sign].status==1){
					    			sig =false;
					    			$.zxsaas_plus.showalert("提示","结束制卡！");
					    			$(this).val("");
					    			return;
					    		}else{
					    			$(".nowCardNum").val(sign);
					    			   var cs=$("#typeNamePiles>option:selected").text()||"";  //卡类型
							      	   var cmd =$(".mkDis").val()||""; //制卡部门
							      	   var cstf=  emp ;          //制卡人
							      	   var cpsw =$(".cardPsw").val()||""; //卡密
							           var ids = $("#jqGrid_mkCardPile").jqGrid('getDataIDs');
								       var maxid;
								        maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
								        $("#jqGrid_mkCardPile").jqGrid('addRowData', maxid+1, {"cardNum":$(".nowCardNum").val(),"cardSort":cs,"cardMkDis":cmd,"cardStaff":cstf,"cardPsw":cpsw}, 'last' );
								        arr[$(".nowCardNum").val()].status=1;   //标记制卡成功
								        arr[$(".nowCardNum").val()].locat=maxid+1;   //标记制卡成功后表格位置
								        setTimes=parseInt(setTimes)+1;    
								        $(this).val("");
								        $(".alMk").val(parseInt($(".alMk").val())+1);
								          if(sign_num<stpCard_num){
								        	  
								        	  if(sign_lit==''){//全数字模式
								        		   sign =++sign;
								        	   }else{
								        		   sign =sign_lit+(++sign_num); 
								        	   }
								        	   $(".nowCardNum").val(sign);
								          }
					    			
					    		}
					    	}else{
					    		   $(".nowCardNum").val(sign);
						      	   var cs;           //卡类型
						      	   var cs=$("#typeNamePiles>option:selected").text()||"";  //卡类型
						      	   var cmd =$(".mkDis").val()||""; //制卡部门
						      	   var cstf= emp ;          //制卡人
						      	   var cpsw =$(".cardPsw").val()||""; //卡密
						           var ids = $("#jqGrid_mkCardPile").jqGrid('getDataIDs');
							       var maxid;
							        maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
							        $("#jqGrid_mkCardPile").jqGrid('addRowData', maxid+1, {"cardNum":$(".nowCardNum").val(),"cardSort":cs,"cardMkDis":cmd,"cardStaff":cstf,"cardPsw":cpsw}, 'last' );
							        arr[$(".nowCardNum").val()].status=1;   //标记制卡成功
							        arr[$(".nowCardNum").val()].locat=maxid+1;   //标记制卡成功后表格位置
							        setTimes=parseInt(setTimes)+1;
							        $(this).val("");	        
							        $(".alMk").val(parseInt($(".alMk").val())+1);
							          if(sign_num<stpCard_num){
							        	   if(sign_lit==''){//全数字模式
							        		   sign =CardNum(++sign,parseInt($(".count-card").val()));
							        	   }else{
							        		   sign =sign_lit+CardNum(++sign_num,parseInt($(".count-card").val())-sign_lit.length); 
							        	   }
							        	
							        	   $(".nowCardNum").val(sign);
							        	   //	var chgNum = (flag==1?lit+CardNum(i,h_num.length): lit+CardNum(i,parseInt($(".count-card").val())));
							          }
					    	}
			    	
		    		  }
		      }//---
		      
		      } 
		    }else{
				$.zxsaas_plus.showalert("提示","结束制卡！");
		        $(this).val("");
		        return;
		    }
		 
	  }
	
	}); 

//判断卡密是否重复
function statusPsw(psw){
	if(psw!=""){
		var ids = jQuery("#jqGrid_mkCardPile").jqGrid('getDataIDs'); 
		if(ids.length>0){
			for(var i=0;i<ids.length;i++){
				var rowData = jQuery("#jqGrid_mkCardPile").jqGrid('getRowData',ids[i]); 
				if(psw===rowData.cardPsw){
				  return true;	
				}
			}
			return false;
		}
	}
}

/*重制上一张*/
$(document).on("click",".restart-mkCard",function(){
	 var over=$(".needMk").val();
	 var nowNum =$(".nowCardNum").val();
	 var nowNum_num =getNum_disp(nowNum);//当前卡号数字部分或者数字
	 var nowNum_lit =getLit_disp(nowNum);//当前卡号字母部分或者空
	 var sNum =$(".startCard").val()
	 var sNum_num =getNum_disp(sNum);//开始卡号数字部分或者数字
	  var stopCard =$(".overCard").val();
	 if(setTimes==over){//最后一张已经跳过或者制作过
		 if(nowNum){
			 if(nowNum == stopCard ){
				 if(arr[nowNum].status==1){
					$.zxsaas_plus.showconfirm("重制上一张","上一张已经制卡完成，确定要重置吗？",function(){
						 sig =true;
						 $("#jqGrid_mkCardPile").jqGrid('delRowData', arr[nowNum].locat);
						 arr[nowNum].status=0;
						 arr[nowNum].locat=0;
						 setTimes=setTimes-1;
						 sign= $(".nowCardNum").val();
						 $(".alMk").val($(".alMk").val()-1);
						 
					},function(){
				
					});
				 }else if(arr[nowNum].status==0){
					 $.zxsaas_plus.showconfirm("提示","上一张卡未制作，确定重新制作吗？",function(){
						 sig =true;
						 setTimes=setTimes-1;
						 $(".nowCardNum").val(nowNum);
						 sign= $(".nowCardNum").val();
					},function(){
				
					}); 
				 }
			 }
		 } 
	 }else{
		 if(nowNum){
			 if(nowNum_num > sNum_num){
				 var nowNum_now=nowNum_num-1;
				 var nowFormat = '';
				 if(nowNum_lit==''){//全数字会员卡号
				    nowFormat = CardNum(nowNum_now,parseInt($(".count-card").val()));//对格式进行转换
				 }else{//字母+数字会员卡号
					 nowFormat=nowNum_lit+CardNum(nowNum_now,parseInt($(".count-card").val())-nowNum_lit.length);//对格式进行转换
				 }
				 if(arr[nowFormat].status==1){
					$.zxsaas_plus.showconfirm("重制上一张","上一张已经制卡完成，确定要重置吗？",function(){
						 sig =true;
						 $("#jqGrid_mkCardPile").jqGrid('delRowData', arr[nowFormat].locat);
						 arr[nowFormat].status==0;
						 setTimes=setTimes-1;
						 $(".nowCardNum").val(nowFormat);
						 sign= $(".nowCardNum").val();
						 $(".alMk").val($(".alMk").val()-1);
						 
					},function(){
				
					});
				 }else if(arr[nowFormat].status==0){
					 $.zxsaas_plus.showconfirm("提示","上一张卡未制作，确定重新制作吗？",function(){
						 sig =true;
						 setTimes=setTimes-1;
						 $(".nowCardNum").val(nowFormat);
						 sign= $(".nowCardNum").val();
					},function(){
				
					}); 
				 }
			 }else {
				$.zxsaas_plus.showalert("提示","本张卡是第一张卡,无法重制上一张！");
			 }

		 }
		 
	 }
	 
});


/*跳过本张*/
$(document).on("click",".skip-thisCard",function(){
	 var jdge =setTimes-1+2;
	 var over=$(".needMk").val();
	  var nowNum=$(".nowCardNum").val();//当前卡号
	    var nowNum_num =getNum_disp(nowNum);//当前卡号数字部分或者数字
		 var nowNum_lit =getLit_disp(nowNum);//当前卡号字母部分或者空
	    var stopCard =$(".overCard").val()|| 0;
	    var stpCard_num = getNum_disp(stopCard);//当前卡号数字部分或者数字
	  if(jdge<over){//没到最后一张
		    if(nowNum){
		    	if(nowNum_num<=stpCard_num){
		    		if(nowNum_num<stpCard_num){
			    		var nowNum_now=nowNum_num-1+2;
		    		     var nowFormat='';
		    		     if(nowNum_lit==''){//全数字会员卡号
						    nowFormat = CardNum(nowNum_now,parseInt($(".count-card").val()));//对格式进行转换
						 }else{//字母+数字会员卡号
							 nowFormat=nowNum_lit+CardNum(nowNum_now,parseInt($(".count-card").val())-nowNum_lit.length);//对格式进行转换
						 }
		    			 $(".nowCardNum").val(nowFormat);
		    			 sign= $(".nowCardNum").val();
		    			 setTimes=setTimes-1+2;
		    		}
		    		else{
		    			 sign= $(".nowCardNum").val();
		    			 setTimes=setTimes-1+2;
		    		}
		    	}else{
		    		$.zxsaas_plus.showalert("提示","本张卡是最后一张卡,无法跳过本张！");
		    	}
	
		   }
	 }else{//到最后一张
		 $.zxsaas_plus.showalert("提示","本张卡是最后一张卡");
	 }
});

//格式化卡号
function CardNum(num,n){
	return (Array(n).join(0) + num).slice(-n);
}

//点击保存
$(document).on("click",".plzkSave",function(){
	var objList = [];
	if($("#ornotNum").is(':checked')){//号码卡
			
		 var count =parseInt($(".overCard").val())-parseInt($(".startCard").val())+1;
		 if(!isNaN(count)){
			 for(var i=0;i<count;i++){
				 var obj={};
				 var num = parseInt($(".startCard").val())+i;
				 obj.cardNum = CardNum(num,parseInt($(".count-card").val()));
				 obj.cardtypeId = $("#typeNamePiles>option:selected").val();
				 objList.push(obj);
			 }
			}else{
				$.zxsaas_plus.showalert("提示","卡号必须为数字！");
				return;
			}
		 
	}
	else{     //非号码卡
		var ids = $("#jqGrid_mkCardPile").jqGrid("getDataIDs");
		for(var i=0;i<ids.length;i++){
		    var rowData = $("#jqGrid_mkCardPile").jqGrid("getRowData",ids[i]);
			var obj={};
			obj.cardtypeId = $("#typeNamePiles>option:selected").val();
			obj.cardNum = rowData.cardNum;
			obj.cardPwd = rowData.cardPsw;
			objList.push(obj);
		}
	}
	
	if(objList.length!=0){
	  $.request({
	         url: '/manager/member/cardInfo/saveCardInfo',
	         type: "POST",
			 datatype : "json",
			 contentType: "application/json ",
			 data: JSON.stringify(objList),
			 traditional: true,
	         success: function (data) {
					 if(data.result==1){
				    		$.zxsaas_plus.showalert("提示",data.desc);
				    		$(".plzkSave").attr("disabled",true);
				    	 	$("#jqGrid_cardInfo").trigger("reloadGrid");
				    	 	clearPileCards();//清空批量制卡
				    	 	$("#mkCardPileModal").modal('hide');
				    	 	
				    	}else{
				    		$.zxsaas_plus.showalert("错误",data.desc);
				    	}
		      },
	         error: function (msg) {
	        
	         }
	     });
	}else{
		$.zxsaas_plus.showalert("提示","请输入数据再提交保存！");
	}
});


//键盘事件触发开始制卡
$(document).on("keyup",".overCard",function(){
	if(event.keyCode==13){
		$(".start-mkCard").trigger("click");
		$(".cardPsw").is(":visible")&&$(".cardPsw").focus();
	}
});

/***************************************************************************************************/
/*清空批量制卡模态框的函数*/
function clearPileCards(){
		$(".cardOrnot").prop("checked") && $(".hd").removeClass("hidden"); //号码卡恢复正常
		  $(".startCard").attr("disabled",false);
		  $(".overCard").attr("disabled",false);
		  $(".cardPsw").attr("disabled",false);
		  $(".count-card").attr("disabled",false);
		  $(".startCard").val("");
		  $(".overCard").val("");
		  $(".nowCardNum").val("");
		  $(".cardPsw").val("");
		  $(".cardPsw").attr("disabled",true);
		  $(".cardPsw").attr("readonly","readonly");
		  $(".count-card").val("");
		  $("#ornotNum").prop("checked",false);
		  $(".needMk").val("");
		  $(".alMk").val("");
		  $("#jqGrid_mkCardPile").jqGrid("clearGridData");//清空表格
		  $(".start-mkCard").attr("disabled",false);//启用点击开始制卡事件
		  $(".restart-mkCard").prop("disabled",false);//启用点击重制上一张
		  $(".skip-thisCard").prop("disabled",false);//启用点击跳过本张
		  $("i").addClass("hidden");  
		  $(".plzkSave").attr("disabled",false);
		  
}

/*批量制卡添加清除事件*/
$(document).on("click",".clearMkCardContext",function(){
	clearPileCards();
});

  /*截止卡号*/
$(document).on("input propertychange",".overCard",function(){
  $(this).val($(this).val().toUpperCase());//默认字母转化成大写
  var ls =$.trim($(this).val()).length;
    var rule =$.trim($(".count-card").val());
    var startC =$.trim($(".startCard").val());
    if(rule!=""){
    	 if(parseInt(rule)!=ls){
    	 	  $(this).next("i").removeClass("hidden");   
    	 }
    	 else{
    	 	  $(this).next("i").addClass("hidden");  
    	 }
    }
    else{
    	 if(startC!=""){
    		 if(ls!=startC.length){
    			  $(this).next("i").removeClass("hidden");    
    		 }else{
    			 $(this).next("i").addClass("hidden");
    		 }
    	 }else{
    	    $(this).next("i").addClass("hidden");  
	    	 }
	    }
 });
  
  /*开始卡号*/
  $(document).on("input propertychange",".startCard",function(){
   $(this).val($(this).val().toUpperCase());//默认字母转化成大写
   var ls =$.trim($(this).val()).length;
    var rule =$.trim($(".count-card").val());
    if(rule!=""){
    	 if(parseInt(rule)!=ls){
    	 	  $(this).next("i").removeClass("hidden");   
    	 }
    	 else{
    	 	  $(this).next("i").addClass("hidden");  
    	 }
    }
    else{
    	if(ls == ""){
    		$(".nowCardNum").val("");
    	}
    	 $(this).next("i").addClass("hidden");  
	    }
  	     
  	  
  });
   

/*是否号码卡*/
$(document).on("click",".cardOrnot",function(){
	   //禁用非号码卡功能
	  $(this).prop("checked") && $(".restart-mkCard").prop("disabled",true);
	  $(this).prop("checked") || $(".restart-mkCard").prop("disabled",false);
	  $(this).prop("checked") && $(".skip-thisCard").prop("disabled",true);
	  $(this).prop("checked") || $(".skip-thisCard").prop("disabled",false);
	   //清空非号码卡内容
	  $(".startCard").attr("disabled",false);
	  $(".overCard").attr("disabled",false);
	  $(".cardPsw").attr("disabled",false);
	  $(".startCard").val("");
	  $(".overCard").val("");
	  $(".nowCardNum").val("");
	  $(".cardPsw").val("");
	  $(".count-card").val("");
	  $("#ornotNum").prop("checked",$(this).prop("checked"));
	  $(".needMk").val("");
	  $(".alMk").val("");
	  $("#jqGrid_mkCardPile").jqGrid("clearGridData");//清空表格
	  $(".start-mkCard").attr("disabled",false);//启用点击开始制卡事件
	   /**/
	  $(this).prop("checked") && $(".hd").addClass("hidden"); 
	  $(this).prop("checked") && $(".hd>input").val("");
	   //表格置空
	  $(this).prop("checked") || $(".hd").removeClass("hidden"); 
});


/*卡号位数*/
$(document).on("input propertychange",".count-card",function(){
     var rule =parseInt($.trim($(this).val()))||0;
     var ls ="";
     ls =$.trim($(".startCard").val()).length;
     var lo ="";
     lo =$.trim($(".overCard").val()).length;
     if(rule<18&&rule>-1){
	     if(rule == 0){
	        $(".startCard").next("i").addClass("hidden");
	     	$(".overCard").next("i").addClass("hidden");
	     }
	     if(rule!=ls){
	     	$(".startCard").next("i").removeClass("hidden");
	     }
	     if(rule!=lo){
	     	$(".overCard").next("i").removeClass("hidden");
	     }
	     if(rule == ls){
	     	$(".startCard").next("i").addClass("hidden");
	     	   
	     }
	      if(rule == lo){
	     	    $(".overCard").next("i").addClass("hidden");
	     }
     }else{
    		$.zxsaas_plus.showalert("提示","卡号位数为0至17！"); 
     }
});

/*发卡*/
/********************************************发卡*******************************************************/


/**
 * 树结构
*/
function Tree(){
	var ptId = $(this).parents("table").attr("id");
	var setting = {  
	      /*  data: {
				simpleData: {
					enable: true,
					idKey: "id",
					pIdKey: "pid",
					rootPId: null
				}
			},*/
			callback: {
				onClick: function (event, treeId, treeNode, msg) {
		                if(treeNode.objType=="会员类型"){
		                	$("#jqGrid_cardInfo").jqGrid('setGridParam',{  
						        datatype:'json',
								page: "1",
						        postData:{"cardtypeId":treeNode.id,"categoryCode":-1}
						    }).trigger("reloadGrid"); //重新载入
		                }
		                if(treeNode.objType=="会员类型所属分类"){
		                	var num = 0;
		                	if(treeNode.name=="电子会员"){
		                		num=2;
		                	}
		                	else{
		                		num=1;
		                	}
		                	$("#jqGrid_cardInfo").jqGrid('setGridParam',{  
						        datatype:'json',
								page: "1",
						        postData:{"cardtypeId":-1,"categoryCode":num}
						    }).trigger("reloadGrid"); //重新载入
		                }
				},
				onDblClick: function(event, treeId, treeNode){
			}
			},
			view: {
				showIcon: false
			}
	    }; 
	     $.request({
	            type: 'Get',
	            url: '/manager/member/cardInfo/initCardInfoTree',//树结构地址
	            dataType: "json", 
	            success: function (data) {
	                $.fn.zTree.init($("#sort-tree"), setting, data);
	                var zTree1 = $.fn.zTree.getZTreeObj("sort-tree");
                	zTree1.expandAll(true);//展开全部节点
                	
	            },
	            error: function (msg) {
	            
	            }
	        });
}

//初始化数据
function init(){
	  $.request({
          type: 'Get',
          url: '/manager/member/cardInfo/initCardInfo',//树结构地址
          dataType: "json", 
          success: function (data) {
          		$(".sectionName").val(data.data.sectionName);
          		$(".typeNamePiles").html("");
          		$("#ywy").html("");
          		for(var i=0;i<data.data.empList.length;i++){
          			$("#ywy").append("<option value='"+data.data.empList[i].id+"'>"+data.data.empList[i].code+"-"+data.data.empList[i].name+"</option>");
          		}
          		emp=data.data.perName;
          		for(var i=0;i<data.data.clist.length;i++){
          			$(".typeNamePiles").append("<option value='"+data.data.clist[i].id+"'>"+data.data.clist[i].typeName+"</option>");
          		}
          },
          error: function (msg) {
              
          }
      });
}


$(document).on("click",".fk",function(){
	var ids = $("#jqGrid_cardInfo").jqGrid('getGridParam','selarrrow');//选中的行id
	var len = ids.length;
	if(len <= 1){
		//if(len==0){window.location.href='/manager/member/facardInfo/tofaCard/-1';}
		//else{window.location.href='/manager/member/facardInfo/tofaCard/'+ids;}
		if(len ==0){
			$.zxsaas_plus.showalert("提示","请选择需要发卡项！");
		}else{
			//window.location.href='/manager/member/facardInfo/tofaCard/'+ids;
			var rowData = $("#jqGrid_cardInfo").jqGrid('getRowData',ids[0]);
			
			if(rowData.status=='4'||rowData.status==4){
				$.zxsaas_plus.showalert("提示","已作废,不能发卡！");
			}else{
			   window.parent.openWorkBoxByMenutext(rowData.cardNum+'发卡','/manager/member/facardInfo/tofaCard/'+ids);
			}
		}
	}
	else{
		   $.zxsaas_plus.showalert("提示","最多只能选择一张卡");
	}
});



$(document).on("click",".caozuo",function(e){
	  var id=e.target.id;
	  var list= $("#jqGrid_cardInfo").jqGrid('getGridParam','selarrrow');//获取选中行的id
	  if(list.length>0){
		  for(var i=0;i<list.length;i++){
			  var rowData = $("#jqGrid_cardInfo").jqGrid('getRowData',list[i]);
			  if(id==4&&rowData.fid!=''){//作废
				  $.zxsaas_plus.showalert("提示","请选择未发卡进行作废操作！");
				  return false;
			  }else if(id==1&&rowData.status=="4"){//启用
				  $.zxsaas_plus.showalert("提示","作废卡不能进行启用操作！");
				  return false;
			  }else if(id==2&&rowData.status=="4"){//停用
				  $.zxsaas_plus.showalert("提示","作废卡不能进行停用操作！");
				  return false;
			  }else if(id==3&&rowData.status=="4"){//挂失
				  $.zxsaas_plus.showalert("提示","作废卡不能进行挂失操作！");
				  return false;
			  }else if(id==3&&rowData.status=="1"){
				  $.zxsaas_plus.showalert("提示","未发卡不能进行挂失操作！");
				  return false;
			  }
		  }
		    $.request({
		         url: '/manager/member/facardInfo/status',
		         type: "POST",
				 data: {"list": list,"status":id},
				 traditional: true,
		         success: function(data){
						 if(data.result==1){
					    		$.zxsaas_plus.showalert("提示","操作成功！");
					    	}else{
					    		$.zxsaas_plus.showalert("错误","操作失败！");
					    	}
					    	$("#jqGrid_cardInfo").trigger("reloadGrid");
				          },
		         error: function (msg) {
		            
		         }
		     });
	  }
	  else{
		  $.zxsaas_plus.showalert("提示","请选择卡片进行操作！");
	  }
});


$(document).on("click",".huanka",function(e){
	  var check=true;
	  var list= $("#jqGrid_cardInfo").jqGrid('getGridParam','selarrrow');
	  if(list.length==1){
		  var rowData = $("#jqGrid_cardInfo").jqGrid('getRowData',list[0]);
			  if(rowData.fid){//持卡人
				  $("#chgeCardModal").modal();  
				  $("#ckr").val(rowData.cardholder);
				  $("#ykh").val(rowData.cardNum);
				  $("#zjh").val(rowData.certificateno);
				//换卡的时候将未发卡的卡显示出来
					 $.request({
				         url: '/manager/member/facardInfo/noUseCardInfo',
				         type: "POST",
				         data: {"id": rowData.fid},
						 traditional: true,
				         success: function (data) {
						 $("#newCard").html("");
							 for(var i=0;i<data.data.cardList.length;i++){
								 $("#newCard").append("<option value='"+data.data.cardList[i].id+"'>"+data.data.cardList[i].cardNum+"</option>");
							 }
				         },
				         error: function (msg) {
				          
				         }
				     });
			  }else{
				  $.zxsaas_plus.showalert("提示","本卡未发放！");
			  }
		      
       }
	  else{
		 
		  $.zxsaas_plus.showalert("提示","请选择一张卡");
	  }
	  
});

//换卡
$(document).on("click",".hkSave",function(e){
	 var list= $("#jqGrid_cardInfo").jqGrid('getGridParam','selarrrow');
	 $.request({
        url: '/manager/member/facardInfo/hkSave',
        type: "POST",
        data: {"id": list[0],"newId":$("#newCard").val()},
        success: function (data) {
        	 $("#jqGrid_cardInfo").trigger("reloadGrid");
        	 $("#chgeCardModal").modal('hide');
        	 $.zxsaas_plus.showalert("提示","操作成功！");
	 },
        error: function (msg) {
        }
    });
});

//充值
$(document).on("click",".addCash",function(){
	 var ids=$("#jqGrid_cardInfo").jqGrid('getGridParam','selarrrow');
	 if(ids.length!=0){
		 if(ids.length!=1){
			 $.zxsaas_plus.showalert("提示 ","请选择一张会员卡进行充值！"); 
		 }else{
			    var rowData=$("#jqGrid_cardInfo").jqGrid('getRowData',ids);	
			    if(rowData.cardholder){//是否有持卡人
			       $("#addCashModal").modal("show");
			    }else{
			       $.zxsaas_plus.showalert("提示 ","无持卡人不能充值！");
			    }
		 }
	   }else{
			$.zxsaas_plus.showalert("提示 ","请至少选择一张会员卡进行充值！");
	   }
});

//充值弹窗弹出后数据加载
$("#addCashModal").on("show.bs.modal",function(e){
	var id=$("#jqGrid_cardInfo").jqGrid('getGridParam','selrow');
	var rowData=$("#jqGrid_cardInfo").jqGrid('getRowData',id);	
	$("#cardNum").val(rowData.cardNum);    //会员卡号
	$("#cardType").val(rowData.typeName);  //会员类型
	                                       //充值金额(判断)
	                                       //赠送金额(判断)
	$(".currentCash").val(rowData.amount);//当前余额
	var myDate = new Date();
    $("#czrq").val(myDate.toLocaleDateString().replaceAll("/","-")); //充值日期
	                                       //收款余额
					                       //备注
	 $.request({
	      url: "/manager/member/cardInfo/rechargeGift",
	      type: "POST",
		  data:{"id":id},
		  traditional: true,
	      success: function (data) {
		      giftRule=data.data.rows;
		      isGift= data.data.isGift;
		      $("#ywy").val(data.data.ywy); //业务员
		      $("#jqGrid_cardInfo").trigger("reloadGrid");
		 },
	      error: function (msg) {
	        
	      }
	  });
});

var ids=[];
//更改类型显示
$(document).on("click",'.lxbg',function(){
	  $("#jqGrid_cardChoose").jqGrid('clearGridData');
	   ids= $("#jqGrid_cardInfo").jqGrid('getGridParam','selarrrow');  
	   if(ids.length!=0){
		   $("#sortChangeModal").modal("show");
	   }else{
			$.zxsaas_plus.showalert("提示 ","请至少选择一张会员卡进行变更！");
	   }
});

//更改类型表格样式调整
$("#sortChangeModal").on("shown.bs.modal",function(){
	var w=$(this).find(".grid-wrap").width();
	var h=$(this).find(".grid-wrap").height();
	$("#jqGrid_cardChoose").jqGrid("setGridWidth",w);
	$("#jqGrid_cardChoose").jqGrid("setGridHeight",h);
});

/*会员卡变更模态框打开后*/
$("#sortChangeModal").on('show.bs.modal', function (e) {
	ids= $("#jqGrid_cardInfo").jqGrid('getGridParam','selarrrow');
   	for(var i=0;i<ids.length;i++){
	    var rowData =$("#jqGrid_cardInfo").jqGrid('getRowData',ids[i]);
	    $("#jqGrid_cardChoose").jqGrid('addRowData',i+1,rowData);
    } 
});

//更改类型
$(document).on("click",".lxbgSave",function(e){
	 $.request({
       url: '/manager/member/cardInfo/updateType',
       type: "POST",
       data: {"ids": ids,"typeId":$("#updateType").val()},
       traditional: true,
       success: function (data) {
    	   $.zxsaas_plus.showalert("提示","操作成功！");
    	   $("#jqGrid_cardInfo").trigger("reloadGrid");
	   },
       error: function (msg) {
		   $.zxsaas_plus.showalert("提示","操作有误！");
       }
   });
});

//点击积分清零
$(".clearToZero").on("click",function(){
	var ids= $("#jqGrid_cardInfo").jqGrid('getGridParam','selarrrow');
	if(ids.length>0){
	   $("#soreClearModal").modal('show');
	}else{
	   $.zxsaas_plus.showalert("提示","请选择已发会员卡！");
	}
});

//积分清零模态框显示
$(document).on("show.bs.modal","#soreClearModal",function(){
	$("#jqGrid_assoList").setGridWidth($(this).find(".grid-wrap").width());
	$("#jqGrid_assoList").setGridHeight($(this).find(".grid-wrap").height());
//	loadmodal({TableName:"#jqGrid_assoList",TableInfo:"3",LoadTableUrl: "/manager/member/cardType/selectAll"});	
    $("#qlyy").val("");//情况清零原因
	var ids= $("#jqGrid_cardInfo").jqGrid('getGridParam','selarrrow');
	if(ids.length>0){
	   	for(var i=0;i<ids.length;i++){
		    var rowData =$("#jqGrid_cardInfo").jqGrid('getRowData',ids[i]);
		    if(rowData.status == "2"){
		       $("#jqGrid_assoList").jqGrid('addRowData',i+1,rowData);
		    }
	    } 
	}
	
});

$(document).on("hidden.bs.modal","#soreClearModal",function(){
	$(this).find(".grid-wrap").html("<table id='jqGrid_assoList' class='zxsaastable'></table>");
	loadmodal({TableName:"#jqGrid_assoList",TableInfo:"3",LoadTableUrl: "/manager/member/cardType/selectAll"});	//会员清零表格加载
});

//积分清零
$(document).on("click",".jfqlSave",function(e){
	 var checkId=[];
	 checkId = $("#jqGrid_cardInfo").jqGrid('getGridParam','selarrrow'); 
	 $.request({
      url: '/manager/member/scoreUpdate/cleanScore',
      type: "POST",
      data: {"cause":$("#qlyy").val(),"checkId":checkId},
      traditional: true,
      success: function (data) {
    	  $.zxsaas_plus.showalert("提示","操作成功！");
		    $("#soreClearModal").modal('hide');
		
	 },
      error: function (msg) {
		 $.zxsaas_plus.showalert("提示","操作有误");
      }
  });
});


//模糊查询
$(document).on("click",".find-out",function(event){			
	var vl =$(".qick-ipt").val();
		 jQuery("#jqGrid_cardInfo").jqGrid('setGridParam', {  
			    datatype:'json',  
		        postData:{"keyword":vl}, //发送数据  
		    }).trigger("reloadGrid");  
});


//升级或降级
function upAndDown(obj){
	 var ids =[];
	 ids = $("#jqGrid_cardInfo").jqGrid('getGridParam','selarrrow');
	 if(ids.length>0){
		 $.request({
		      url: '/manager/member/cardInfo/upAndDown/'+obj,
		      type: "get",
		      data: {"ids":ids},
		      traditional: true,
		      success: function (data) {
		    		$.zxsaas_plus.showalert("提示","操作成功！");
		    		 $("#jqGrid_cardInfo").trigger("reloadGrid");
			 },
		      error: function (msg) {
				 $.zxsaas_plus.showalert("提示","操作有误");
		      }
		  });
	 }
	 else{
		 $.zxsaas_plus.showalert("提示","请选择需要进行操作的会员");
	 }
}



/**********************表格1 开始******************************************/

//切换部门，联动查询收付款账户信息
var currPayreceiptDetailList = [];
function onSectionChange(sectionId){
	//判断部门是否切换
	 $.request({
		url:  '/manager/account/findSectionKsyAccount',
		type : "post",
		dataType : 'json',
		data:{'sectionId':sectionId},
		success:function(data){
			var result = data.data;
			if(data.result != 1){$('#payrecetiptDetailModal').modal('hide');$.MsgBox('错误提示',data.desc);return;};
			if(data.data.dataList.length == 0){$('#payrecetiptDetailModal').modal('hide');$.MsgBox('错误提示','没有给此部门 '+$("input[name='sectionName']").val()+' 绑定资金账户，不能输入');return;};
			
			//处理表格、
			dataGrid2.$grid.jqGrid('clearGridData');
			for(var i = 0; i < data.data.dataList.length; i++) {
				var row = data.data.dataList[i];
				row.accountType = row.accounTypeName;
				row.accountId = row.id;
				row.accountName = row.name;
				getAmount(row);
				//插入空数据的1行
				dataGrid2.$grid.jqGrid('addRowData',MyEiditGrid.getMaxRowid(dataGrid2.$grid)+1,row);
			}
			Summary2();
			function getAmount(row){
				for ( var j = 0; j < currPayreceiptDetailList.length; j++) {
					if(currPayreceiptDetailList[j].accountId == row.id){
						row.payreceiptAmout = currPayreceiptDetailList[j].payreceiptAmout;
					}
				}
			}
		}
	});   		

}

//打开收付款明细录入
function openPayrecetiptDetailModal(){
	$('#payrecetiptDetailModal').modal('show');
	onSectionChange(sectionId);
	$("#dataGrid2").setGridWidth(567);
	$("#dataGrid2").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
}

//初始化表格
var dataGrid2 = null;
function initDataGrid2(){
	//配置
	var paras = {
	    gridId:'dataGrid2', 
	    noShowOp:false,
	    noShowAdd:true,
	    addRow:{accountType:'',accountId:'',accountName:'',remark:''},
	    colNames:['付款类别','账户ID','账户名称','付款金额'],  
	    colModel:
	    	[ 
             {name :'accountType',sortable: false,index : 'accountType',align:'left',editable:false },
             {name :'accountId',index : 'accountId',align:'left',sortable: false,hidden: true}, 
             {name :'accountName',index : 'accountName',align:'left',editable:false,sortable: false},
             {name :'payreceiptAmout',index : 'payreceiptAmout',align:'left',editable:true,sortable:false}
           ]
	};
	//回调函数
	var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
			if(iCol == 2){
				//
				$("#"+iRow+"_accountType option[value='"+val+"']").attr("selected",true);
			}
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
        	
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理
        	Summary2();
        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if($.notEmpty(row.accountType,row.payreceiptAmout,row.accountName)){
		        	delete row["accountName"];
		        	row.payreceiptAmout = parseFloat(row.payreceiptAmout);
		        	return row;
				}
        	});
        }
	};
	dataGrid2 = new MyEiditGrid(paras,callBackList);

}

//点击保存明细事件
function savePayreceiptAmout(){
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	//汇总总金额
	var footerRow = $("#dataGrid2").footerData("get");
	$("#payrecetiptAmount").val(footerRow.payreceiptAmout);
	$('#payrecetiptDetailModal').modal('hide');
	currPayreceiptDetailList = dataGrid2.getGridDataList();
}

//汇总统计
function Summary2(){
	//名称
	var sumAmount = $("#dataGrid2").getCol('payreceiptAmout', false, 'sum');  
	$("#dataGrid2").footerData("set",{index:"合计",payreceiptAmout:sumAmount});
}


/**********************表格1 结束******************************************/


/*************充值赠送******************/
function rechargeGift(){
	if(isGift==1){
		var num = 0;
		for(var i =0;i<giftRule.length;i++){
			if($("#czje").val()>=giftRule[i].reAmount){
				if(num<giftRule[i].gvAmount){
					num=giftRule[i].gvAmount;
				}
			}
		}
		$("#zsje").val(num);
	}
}

/*************保存充值***********/
$(document).on("click","#czSave",function(event){	
	if($("#czje").val()==parseInt($("#payrecetiptAmount").val())){
		 var obj={};
		 obj.czAmount=$("#czje").val();
		 obj.zsAmount=$("#zsje").val();
		 obj.ywId=$("#ywy").val();
		 obj.operDate=$("#czrq").val();
		 var id=$("#jqGrid_cardInfo").jqGrid('getGridParam','selrow');
		 obj.fcardId=id;
		 var list=[];
		 for(var i=0;i<currPayreceiptDetailList.length;i++){
			 var aobj={};
			 if(currPayreceiptDetailList[i].payreceiptAmout>0){
				 aobj.amount=currPayreceiptDetailList[i].payreceiptAmout;
				 aobj.accountId=currPayreceiptDetailList[i].accountId;
				 list.push(aobj);
			 }
		 }
		 obj.accountList=list;
		 $.request({
		      url: '/manager/member/cardInfo/saveRecharge',
		      type: "POST",
		      datatype : "json",
			  contentType: "application/json",
		      data: JSON.stringify(obj),
		      traditional: true,
		      success: function (data) {
		    		$.zxsaas_plus.showalert("提示","操作成功！");
		    		$('#addCashModal').modal('hide');
		    		$('.hycz').val("");
		    		$("#jqGrid_cardInfo").trigger("reloadGrid");
			 },
		      error: function (msg) {
				 $.zxsaas_plus.showalert("提示","操作有误");
		      }
		  });
	}
	else{
		 $.zxsaas_plus.showalert("提示","充值金额和收款金额不相等");
	}
});



//修改一行
$(document).on("click",".icon-edit",function(e){
	//确定相应的表格id
	var tabId =$(this).parent().parents("table").attr("id");
	var rowId = $(this).parent().data('id');
	storageVal=$("#"+tabId).getRowData(rowId).cardPsw;
	$("#"+tabId).setColProp('cardPsw',{editable:true});
	$("#"+tabId).editRow(rowId,true);  
});


//删除一行
$(document).on('click','.icon-trash',function(e){
	var ptId = $(this).parents("table").attr("id");
	var thisTitle = $(this).attr("title");
	var rowId = $(this).parent().data('id');
	var ids =$("#"+ptId).jqGrid('getDataIDs');
	if(thisTitle == "删除"){
			$.zxsaas_plus.showconfirm("提示","是否确定删除本行?",function(){
				$("#"+ptId).jqGrid('delRowData', rowId);
			},function(){
				
			})
	}
});

/*毫秒 转化成正确格式的时间*/
function format(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
	    switch(a){
	        case 'yyyy':
	            return tf(t.getFullYear());
	            break;
	        case 'MM':
	            return tf(t.getMonth() + 1);
	            break;
	        case 'mm':
	            return tf(t.getMinutes());
	            break;
	        case 'dd':
	            return tf(t.getDate());
	            break;
	        case 'HH':
	            return tf(t.getHours());
	            break;
	        case 'ss':
	            return tf(t.getSeconds());
	            break;
	    }
    })
}

