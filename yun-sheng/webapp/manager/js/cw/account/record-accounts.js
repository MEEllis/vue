
$(function(){

	//注册事件
	$(window).resize(wResize);
	wResize();
	
	initTree();
	initGrid();
	
	$(document).keydown(function(event){ 
		console.log(event.keyCode); 
		if(event.keyCode == 67 && event.ctrlKey && event.altKey){
			//查询反记账月份
			recordAccounts.findCanCanelRecordMonth(gl_CurrCompanyId,gl_CurrYear,function(data){
				if(data.result == 1){
					$("#dialog2").modal('show');
					$("#userPassword").val("");
					$("#canCanelRecordMonth").html(data.data.canCanelRecordMonth);
				}else{
					$.MsgBox('出错提示',data.desc);
				}
			});
		}
	}); 

});
//预记账
function assistRecord(){
	
	var para = $("#qiJianParar").toJsonObject();
	console.log(para);
	var min = para.minAccountAnnual.split(".")[1];
	var max = para.maxAccountAnnual.split(".")[1];
	if(parseInt(min)>parseInt(max)){
		alert("最大期间不能比最小期间小");
	}else{
		var list = [];
		for ( var i = min; i <= max; i++) {
			list.push(i);
		}
		recordAccounts.assistRecord(gl_CurrCompanyId,gl_CurrYear,list,para.userPassword,function(data){
			if(data.result == 1){
				$.MsgBox('提示消息',"预记账成功");
			}else{
				$.MsgBox('出错提示',data.desc);
			}
		});
	}
	
}
//记账
function canelRecord(){
	recordAccounts.cancelRecord(gl_CurrCompanyId,gl_CurrYear,$("#userPassword").val(),function(data){
		if(data.result == 1){
			$("#dialog2").modal('hide');
			$("#grid").bootgrid("reload");
			$.MsgBox('提示消息',"反记账成功");
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	});
	
}
//初始化待记账凭证月份统计表格
function initGrid(){
	$("#grid").bootgrid({
        ajax: true,
        post: function ()
        {
            /* parameter object */
            return {
               
            };
        },
        url: basePath+"/cw/recordAccounts/findGroupListByNoPost/"+gl_CurrCompanyId+"/"+gl_CurrYear,
        formatters: {
            "commands": function(column, row)
            {   
        		if(row.canRecord){
        			return "<button type=\"button\" class=\"btn btn-xs btn-default command-edit\" onclick = 'javascript:record("+gl_CurrCompanyId+","+gl_CurrYear+","+row.MONTH+");' >记账</button> ";
        		}else{
        			return row.canRecordMsg;
        		}
            }
        },
        rowCount: [-1, 10, 50, 75]
    });
    $(".actionBar").hide();
}
//记账
function record(companyId,year,month){
	recordAccounts.record(companyId,year,month,function(data){
		if(data.result == 1){
			$("#grid").bootgrid("reload");
			$.MsgBox('提示消息',"记账成功");
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	});
}
//窗口大小改变事件
function wResize(){
	$("#mainDIV").css({'width':($(window).width()-300)+ 'px'});
}
//初始化树
function initTree(){
	//初始化树菜单
	$.fn.zTree.init($("#treeDemo"), 
			       {
		             data: {simpleData: {enable: true}},
				     callback: {onClick: function(event, treeId, treeNode){
					    $("#"+treeNode.view).modal('show')
					    if(treeNode.view == "dialog22"){
							//查询反记账月份
							recordAccounts.findCanCanelRecordMonth(gl_CurrCompanyId,gl_CurrYear,function(data){
								if(data.result == 1){
									$("#dialog2").modal('show');
									$("#userPassword").val("");
									$("#canCanelRecordMonth").html(data.data.canCanelRecordMonth);
								}else{
									$.MsgBox('出错提示',data.desc);
								}
							});	
					    }
					 }}
		           }, 
				  [{ id:1, pId:0, name:"记账功能",open:true,view:'api0'},
				  { id:2, pId:1, name:"记账",view:'dialog1'},
				  { id:3, pId:1, name:"反记账(Ctrl+Alt+C)",view:'dialog22'},
				  { id:3, pId:1, name:"预记账",view:'dialog3'}]);
}