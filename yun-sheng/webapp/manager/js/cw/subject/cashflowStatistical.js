/********* 现金流量统计  *********/
$(document).ready(function(){ 
	
	//初始化
	$.ajax({
		url:  '/manager/cw/accountQuery/cash/init',
		type : "post",
		success:function(data){
			var account=data.data.account;
			var type=data.data.type;
			var code=data.data.code;
			
			//项目分类
			for(var i=0;i<type.length;i++){
				$("#flowType").append("<option value='"+type[i].flowTypeName+"'>"+type[i].flowTypeName+"</option>");
			}
			//项目code
			for(var i=0;i<code.length;i++){
				$("#beginCode").append("<option value='"+code[i].flowItemCode+"'>"+code[i].flowItemCode+"</option>");
				$("#endCode").append("<option  value='"+code[i].flowItemCode+"'>"+code[i].flowItemCode+"</option>");
			}
			//会计期间
			for(var i=0;i<account.length;i++){
				$("#beginTime").append("<option value='"+account[i].currentAccountingYear+account[i].currentAccountingMonth+"'>"+account[i].currentAccountingYear+"-"+account[i].currentAccountingMonth+"</option>");
				$("#endTime").html("");
				$("#beginTime option").each(function () {
			        var val = $(this).val().substring(0,4); //获取单个value
			        if(val==$("#beginTime").val().substring(0,4)){
			        	  $("#endTime").append("<option value='"+$(this).val()+"'>"+
			        			  $(this).text()+"</option>");
			        }
			    });
			}
		}});
});

$('.sure').click(function(){
	$('#shade').css({"display":"none"});
	$(function(){
		threeGroupHeaders();
	});
});

/**
 * 会计区间不允许跨年
 */
function onSelectYear(){
	if($("#beginTime").val().substring(0,4)!=$("#endTime").val().substring(0,4)){
		 $("#endTime").html("");
			$("#beginTime option").each(function () {
		        var val = $(this).val().substring(0,4); //获取单个value
		        if(val==$("#beginTime").val().substring(0,4)){
		        	  $("#endTime").append("<option value='"+$(this).val()+"'>"+
		        			  $(this).text()+"</option>");
		        }
		    });
	}
}


/**
 * 动态生成表格
 * @return
 */
function threeGroupHeaders(){
	var obj=$("#shade").toJsonObject();
	obj.beginMonth=obj.beginTime.substring(4);
	obj.endMonth=obj.endTime.substring(4);
	obj.year=obj.beginTime.substring(0,4)
	obj.check=0;
	if($("#checkFlow").is(":checked")==false){
		obj.isContainsCheck=1;
	}
	if($("#ifContainNotAccount").is(":checked")==false){
		obj.accountCheck=1;
	}
	//jQuery("#jqGrid_subjectBal").jqGrid('destroyGroupHeader', false);//清除原有表头合并
	$.jgrid.gridUnload("cashTable");
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	
	jQuery("#cashTable").jqGrid({
		url:  '/manager/cw/accountQuery/cash/detail',
		datatype : "json",
	/*datastr:dataList,*/
    colNames:['序号','现金流量项目类别', '现金流量项目编码','现金流量项目名称','方向','金额'],
    colModel:[
              	{name:'id',index:'id',width:150,align:'left',sorttype:'int'},
				{name:'type',index:'type',width:150,align:'left',sorttype:'string'},
				{name:'code',index:'code',width:150,align:'left',sorttype:'string'},
				{name:'name',index:'name', width:150, align:"left",sorttype:"string"},
                {name:'dir',index:'dir', width:150, align:"left",sorttype:"string"},
                {name:'money',index:'money', width:150, align:"left",sorttype:"double"},
           ],
        styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式  
        mtype: "POST",
        viewrecords : true,
        autowidth : true,
        multiselect : false,		
        multiboxonly : true,
        forceFit:true,
        height: $(window).height()*0.66,
        width:$(window).width()*0.9,
        caption : "",
        postData:obj,
        loadComplete:function(data){
		 for(var i=0;i<data.rows.length;i++){
  		   if(data.rows[i].sumDir!=null){
  			   var dataRowYear = {    
					        id: "",  
					        type:"("+data.rows[i].type+")小计：",  
					        code:"",  
					        name:"",  
					        dir:data.rows[i].sumDir,  
					        money:data.rows[i].sumMoney,  
					    };
         	   $("#cashTable").jqGrid("addRowData", 'bgFFF7AD', dataRowYear, "after",data.rows[i].id);
  		   }
  	   }
           }
        });
}