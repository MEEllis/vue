$(function () {
 	//批量制卡
    loadmodal({
		TableName:"#jqGrid_mkCardPile",
		celledit:true,
		LoadTableUrl: "/manager/member/cardType/selectAll"
    });

});

function gridDelRow(id){
	var row = $('#jqGrid_mkCardPile').getRowData(id);
    arr[row.cardNum].status = 0;
    $("#jqGrid_mkCardPile").delRowData(id);
    var num = $('#jqGrid_mkCardPile').getDataIDs();
    $('.alMk').val(num.length);
}

var lastrow="";
var lastcell="";
function loadmodal(options){
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
	/*初始化表格参数*/
	var colName = ['操作','卡号','卡类型','制卡部门','制卡人','卡密'];//批量制卡
	var colModel = [
			{name:'deliveryDo',index:'deliveryDo', width:70,align:'center',sortable: false,
                formatter: function(cellvalue, options, rowObjec){
                    return '<a class="btn" onclick="gridDelRow('+ options.rowId +')"><i class="glyphicon glyphicon-trash"></i></a>'
                },
			},
			{name:'cardNum',index:'cardNum', width:100,align:'center',sortable:false,formatoptions:{thousandsSeparator:"", defaulValue:"",decimalPlaces:0}},
			{name:'cardSort',index:'cardSort', width:100,align:'center',sortable:false},
			{name:'cardMkDis',index:'cardDis', width:100,align:'center',sortable:false},
			{name:'cardStaff',index:'cardStaff', width:100,align:'center',sortable:false},
			{name:'cardPsw',index:'cardPsw', width:100,align:'center',sortable:false,editable:true,editoptions:{
                dataEvents:[
                    {type:"blur",fn:function(){
                        var arr = $('#jqGrid_mkCardPile').getCol('cardPsw');
                        var v = $(this).val();
                        if(arr.indexOf(v) !== -1){
                            $(this).val('');
                            $.zxsaas_plus.showalert("提示","卡密重复！");
                        }
                        $('#jqGrid_mkCardPile').saveCell(lastrow,lastcell);
                    }}
                ]
            }}
		];
	var lastsel='';//最后一次选中的行

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
			colNames: colName,
			colModel: colModel,
			cellEdit: true,
			cellsubmit:'clientArray',
			editurl: 'clientArray',
			sortable:true,
			sortorder: 'desc',
			sortname:"id",
			rownumbers:true,
			rowNum: 9999,
			// rowList: [20, 25, 40],
			// pager:options.pager,
			viewrecords: true,
			width:"100%" ,
			height: $(window).height()*0.65,
			autowidth:true,
			rownumWidth: 35,
			shrinkToFit:false,
			multiselect: false,
			multiboxonly:false,
            footerrow: false,
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
		})

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


/*批量制卡*/
/********************************************批量制卡*******************************************************/
/*开始制卡*/
var setTimes=0;    //重制上一张   跳过下一张控制器
var arr={};//预先存储制卡信息(制卡状态、成功后表格的行id)
var sign =0;//初始化之后的当前卡号
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
					    			   var cs= $("#typeNamePiles>option:selected").text();  //卡类型
							      	   var cmd =$(".mkDis").val()||""; //制卡部门
							      	   var cstf=  userName ;          //制卡人
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
						      	   var cs= $("#typeNamePiles>option:selected").text();  //卡类型
						      	   var cmd =$(".mkDis").val()||""; //制卡部门
						      	   var cstf= userName;          //制卡人
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
	var typeid = $('#typeNamePiles').val();
	if(typeid == ''){
        $.zxsaas_plus.showalert("提示","会员类型不能为空！");
        return;
	}

	var objList = [];
	if($("#ornotNum").is(':checked')){//号码卡
		 var count =parseInt($(".overCard").val())-parseInt($(".startCard").val())+1;
		 if(!isNaN(count)){
			 for(var i=0;i<count;i++){
				 var obj={};
				 var num = parseInt($(".startCard").val())+i;
				 obj.cardNum = CardNum(num,parseInt($(".count-card").val()));
				 obj.cardtypeId = $("#typeNamePiles").val();
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
			obj.cardtypeId = $("#typeNamePiles").val();
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
					clearPileCards();//清空批量制卡
					$("#mkCardPileModal").modal('hide');
					$('#grid').trigger('reloadGrid');
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
