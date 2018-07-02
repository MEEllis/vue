
var lastrow = ""; 
var lastcell = "";
function loadmodal(options){
	/*初始化表格参数*/
	 var  colNames =[];
     var JqGridColModel =[];
     colNames= ['id',"Excel顺序号",'系统判定结果','员工编码','员工名称','所属部门编码','所属部门名称','职位编码','职位名称','手机号码',
                '性别','员工属性编码','员工属性名称','是否操作员','是否主管','是否可登录APP','在职状态','入职日期',
                '出生日期','民族','政治面貌','文化程度','健康状况','婚姻状况','户籍性质','身份证号','户名','开户行',
                '银行卡号','支付宝账号','QQ号','微信号','紧急联络人','与本人关系','联系电话','现居住地址','户籍地址','备注'];
     JqGridColModel = [
		            {name:'id',index:'id', width:120,align:'center', sorttype:'string',hidden:true},
		           	{name:'orderNo',index:'orderNo', width:100,align:'center',sortable:false},//Excel顺序号
					{name:'results',index:'results', width:300,align:'center', sortable:false,cellattr: addCellColor},
					{name:'empcode',index:'empcode', width:100,align:'center',sortable:false},//员工编码
				    {name:'empname',index:'empname', width:100,align:'center',sortable:false},//员工名称
					{name:'sectionCode',index:'sectionCode', width:100,align:'center',sortable:false},//所属部门编码
					{name:'sectionName',index:'sectionName', width:100,align:'center',sortable:false},//所属部门名称
					{name:'positionCode',index:'positionCode', width:100,align:'center',sortable:false},//职位编码
					{name:'positionName',index:'positionName', width:100,align:'center',sortable:false},//职位名称
					{name:'mobileNum',index:'mobileNum', width:100,align:'center',sortable:false},//手机号码
					{name:'sex',index:'sex', width:100,align:'center',sortable:false},//性别
					{name:'attrCode',index:'attrCode', width:100,align:'center',sortable:false},//员工属性编码
					{name:'attrName',index:'attrName', width:100,align:'center',sortable:false},//员工属性名称
					{name:'isOpr',index:'isOpr', width:100,align:'center',sortable:false},//是否操作员
					{name:'isManager',index:'isManager', width:100,align:'center',sortable:false},//是否操作员
					{name:'isApp',index:'isApp', width:100,align:'center',sortable:false},//是否操作员
					{name:'inStatus',index:'inStatus', width:100,align:'center',sortable:false},//是否操作员
					{name:'entryDay',index:'entryDay', width:100,align:'center',sortable:false},//是否操作员
					{name:'birthDay',index:'birthDay', width:100,align:'center',sortable:false},//是否操作员
					{name:'nation',index:'nation', width:100,align:'center',sortable:false},//是否操作员
					{name:'politicsStatus',index:'politicsStatus', width:100,align:'center',sortable:false},//是否操作员
					{name:'education',index:'education', width:100,align:'center',sortable:false},//是否操作员
					{name:'healthCondition',index:'healthCondition', width:100,align:'center',sortable:false},//是否操作员
					{name:'maritalStatus',index:'maritalStatus', width:100,align:'center',sortable:false},//是否操作员
					{name:'domicileNature',index:'domicileNature', width:100,align:'center',sortable:false},//是否操作员
					{name:'idCardNum',index:'idCardNum', width:100,align:'center',sortable:false},//是否操作员
					{name:'acountName',index:'acountName', width:100,align:'center',sortable:false},//是否操作员
					{name:'bank',index:'bank', width:100,align:'center',sortable:false},//是否操作员
					{name:'bankNumber',index:'bankNumber', width:100,align:'center',sortable:false},//是否操作员
					{name:'alipay',index:'alipay', width:100,align:'center',sortable:false},//是否操作员
					{name:'qqId',index:'qqId', width:100,align:'center',sortable:false},//是否操作员
					{name:'wechatId',index:'wechatId', width:100,align:'center',sortable:false},//是否操作员
					{name:'emergencyContact',index:'emergencyContact', width:100,align:'center',sortable:false},//是否操作员
					{name:'rfWithI',index:'rfWithI', width:100,align:'center',sortable:false},//是否操作员
					{name:'contactNum',index:'contactNum', width:100,align:'center',sortable:false},//是否操作员
					{name:'nowLiveAddr',index:'nowLiveAddr', width:100,align:'center',sortable:false},//是否操作员
					{name:'domicileAddr',index:'domicileAddr', width:100,align:'center',sortable:false},//是否操作员
					{name:'remark',index:'remark', width:100,align:'center',sortable:false},//是否操作员

				 ];
				
		var defaults = {
		LoadTableUrl: "",
		pager:"",
		TableInfo:"",
		multi:"true",
		edit:""
		};
		var options = $.extend(defaults,options);
			$.jgrid.defaults.width = 1400;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';//最后一次选中的行
			var rightClickColid="";//右键列id
			var rightClickColIndex=0;//右键index
			var mydata;
			var hid=false;
			var lock=false;
			var myobj=[];
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
						 pager : options.pager,
						colNames:colNames,          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            rownumbers:true,
			            viewrecords: true,		       
			            width: "100%" ,
			            height: $(window).height()*0.65,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
//						multiselect:true,
//						multiboxonly:true,
						cellEdit:false,
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
			   				
						},
						onCellSelect:function(id,index,e){
                          
						},
						beforeEditCell:function(rowid,cellname,v,iRow,iCol)
						{
						  lastrow = iRow; 
						  lastcell = iCol;
						},
						beforeSelectRow:function(rowid,e){
                            
						},
						afterInsertRow: function (rowid, aData) { //新增一行之后

						},
						gridComplete: function() {
						},
						loadComplete:function(data){
							
						},
						loadError:function(xhr,status,error){
							//console.log(status)
						}
						})
		
			}
		    /*添加颜色*/
	           function  addCellColor(rowId, val, rawObject, cm, rdata){
	        	    return "style='color:red'";
	           }
			
				
				 function Goodsmodel(cellvalue, options, rowObject){
		            if(cellvalue == undefined || cellvalue == ""){
	                	cellvalue = "";
	                }
					return '<span class="goodsSort" style="display: inline-block; width: 89px;height: 16px;" data-toggle="modal" data-target="#goodsch" data-rId="' + options.rowId +'">' + cellvalue + '</span>';     
			}
				
			
				
			
				
			//模糊查询
			$(document).on("click",".search_maybe",function(event){			
				var vl =$(".srch").val();
					 jQuery("#jqGrid_stuffInfo").jqGrid('setGridParam', {  
						    datatype:'json',  
					        postData:{"keyword":vl}, //发送数据  
					    }).trigger("reloadGrid");  
			});
}

function initial(){
	loadmodal({TableName:"#jqGrid_stuffInfo",pager:"#jqGridPagerStuffInfo",TableInfo:"0",LoadTableUrl: "/manager/beginning/employee/selectList"});

}



/*浏览(上传)*/
$(document).on("change",".file_ipt",function(){
	     $(".des_file").val($(this).val());
});



/*点击清空*/
$(document).on('click','.clear',function (e) {
	 
	$.zxsaas_plus.showconfirm("清空","是否要清空所有数据?",function(){
		$.request({
            url: '/manager/beginning/employee/deleteAll', 
            type: "POST",
		    traditional: true,
            success: function (data) {
				 if(data.result==1){
			    		$.zxsaas_plus.showalert("提示",data.desc);
			    	}else{
			    		$.zxsaas_plus.showalert("错误",data.desc);
			    	}
			    	$("#jqGrid_stuffInfo").trigger("reloadGrid");
		          },
            error: function (msg) {
            
            }
        });
	},function(){
			//否。。		
	});
	
});


/*点击执行*/
$(document).on('click' ,'.execute',function(){
	$.zxsaas_plus.showconfirm("执行","是否确定执行?",function(){
//		ajax 执行数据 （完成弹出提示：更新成功XX条   更新失败XX条（页面显示失败的条数））
		$.request({
            url: '/manager/beginning/employee/saveInfo', 
            type: "POST",
		    traditional: true,
            success: function (data) {
				 if(data.result==1){
			    		$.zxsaas_plus.showalert("执行完成",data.desc);
				  }else{
			    		$.zxsaas_plus.showalert("错误",data.desc);
			      }
			    	    $("#jqGrid_stuffInfo").trigger("reloadGrid");
		          },
            error: function (msg) {
		        	  $("#jqGrid_stuffInfo").trigger("reloadGrid");
            }
        });
	},function(){
			//否。。		
	});
});

/*模态框弹出后*/

/*导入模态框*/
$("#into").on('show.bs.modal', function (e) {
	 /*清空数据*/
	$(".file_ipt").val("");
	$(".des_file").val("");
	
});


/*导入*/
$(document).on("click",".lead_model",function(e){
	var fileName =$(".des_file").val();
	var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
	if(fileExtension == "xls"){
		$.loading();
	$.ajaxFileUpload({
		url : "/manager/beginning/employee/import",
		secureuri : false,
		fileElementId : "file",
		dataType : "json",
		success : function(data) {
			data.sum = undefined?0:data.sum;
			if(data.message==""){
				$.zxsaas_plus.showalert("导入成功","总共导入："+data.sum);
			}else{
				$.zxsaas_plus.showalert("导入成功","总共导入："+data.sum+"("+data.message+")");
			}
			$("#jqGrid_stuffInfo").trigger("reloadGrid");
			$.loading(true);
		},
		error : function(data) {
			//上传失败
			if($.trim($(".des_file").val())=="")
			{
				$.zxsaas_plus.showalert("导入失败","请选择上传文件！");
				
			}else{
				$.zxsaas_plus.showalert("导入失败","上传文件失败！");
			}
			$.loading(true);
		}
	});
	}else{
		 if($.trim(fileName)=="")
		{
			$.zxsaas_plus.showalert("提示","请选择上传文件！");
			
		}else{
		    $.zxsaas_plus.showalert("错误","请选择xls格式文件上传！");
		}
		
	}
	 e.preventDefault();
});

var format = function(time, format){
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


