var status=0;
function loadmodal(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "/manager/authority/companyInfo/companyList",
		TableName: "#jqGrid_metaData", //显示表格名称。遵照css选择器书写
		pager:"#jqGridPager"
		};
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
			var colNames = ['ID','公司编码','公司名称','管理员工号','重置管理员密码','是否禁用','备注','新增人','新增时间','修改人','修改时间'];
			var JqGridColModel=[
								{name:'id',index:'id', width:100,align:'center', sorttype:'string',hidden:true,key: true,sortable:false},
								{name:'code',index:'code', width:200,align:'center', sorttype:'int',sortable:false},
								{name:'name',index:'name', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'adminLogin',index:'adminLogin', width:150,align:'center', sorttype:'string',sortable:false},
								{name:'pw',index:'pw', width:150,align:'center', sorttype:"string",formatter:rePwd,sortable:false},
								{name:'status',index:'status', width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"1:√;0:"},sortable:false},
								{name:'remark',index:'remark', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'createName',index:'createName', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'addTimeStr',index:'addTimeStr', width:150,align:'center',  sorttype:'string',sortable:false},
								{name:'updateName',index:'updateName', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'updateTimeStr',index:'updateTimeStr', width:150,align:'center', sorttype:'string',sortable:false}
			                ];
			
			loadtable();
			//加载表格
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"GET",
						datatype: "json",
						jsonReader  : {	
								root: "data.company",
								repeatitems: false
									},
						colNames:colNames,          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            viewrecords: true,		           
			            width: "100%" ,
			            height: $(window).height()*0.54,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						loadComplete:function(data){
								
									status = data.data.company[0].status;
							
						}
					})
			}
			//$(options.TableName).trigger("reloadGrid");
			//隐藏/显示操作授权
			$('.shou-checkbox').click(function(){
				if($(this).prop('checked')){
					$(options.TableName).setGridParam().showCol("metaMoneySee");
					$(options.TableName).setGridParam().showCol("metaMoneyUpdate");
					$(options.TableName).setGridParam().showCol("clientSee");
		    	}else{
		    		$(options.TableName).setGridParam().hideCol("metaMoneySee");
					$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
					$(options.TableName).setGridParam().hideCol("clientSee");
		    	}
			});
			
			
			
			$(window).bind('click', function saveEdit(e) {
				var rowId = $(e.target).parent("tr").attr("id");
				if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
					if ($(e.target).closest(options.TableName).length == 0) { 
						$(options.TableName).jqGrid('saveRow', lastsel);						
						lastsel='';
					}
				}
			})
			
			
			//修改密码
			$(document).on('click','.rePwd',function(e){
				var reId = $(this).data('id');//获取删除的行id
				var rePwd=getRandomPassword();
				$.zxsaas_plus.showconfirm("","重置密码将用户密码设置为："+rePwd+"<br />是否确定进行此操作",function(){
					$.request({
					    url:"/manager/authority/companyInfo/rePwd",
					    type: "POST",
					    data: {"rePwd":rePwd},
					    traditional: true,
					    success: function(data) {
						//删除密码操作
						    $.zxsaas_plus.showalert("","重置密码成功!");
					    }
					});
				},function(){
					
				});
			});
			
			
			//列表    重置密码
			function rePwd(cellvalue, options, rowObjec)
			{
				return '<span class="rePwd" data-blocId="' + rowObjec.blocId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">重置密码</span>';
			}
			

		$(document).on("click",".btnbox button[data-eventname='printbtn']",function(event){
			$.zxsaas_plus.showalert("表格打印操作", "表格打印操作咱未完成，敬请期待");
			
		});
		$(document).on("click",".btnbox button[data-eventname='exportTablename']",function(event){
			$.zxsaas_plus.showalert("表格导出操作", "表格导出操作咱未完成，敬请期待");
			
		});
}

//保存
$('.btn-info').click(function(){
	if($('.nameCheck').val().trim() == ''){
		$('.nameCheck').next().html('必填!');
		return;
	}
	var obj=$("#model-body").toJsonObject();
	if(obj.status==null){
		obj.status=0
	}
	obj.code=$('.hide_text').val();
	$.request({
	    url:"/manager/authority/companyInfo/saveCompany",
	    type: "POST",
	    datatype : "json",
	    contentType: "application/json",
	    data: JSON.stringify(obj),
	    traditional: true,
	    success: function(data) {
	    	if(data.result==1){
	    		$.zxsaas_plus.showalert("提示",data.desc);
	    	}else{
	    		$.zxsaas_plus.showalert("错误",data.desc);
	    	}
	    	$("#jqGrid_metaData").trigger("reloadGrid");
	    }
	});
	$('#modalUpdate').modal('hide');
});

$(function(){
	$('.nameCheck').blur(function(){
		$('.nameCheck').next().html('');
	});
});

//修改按钮
$('.updateBloc').click(function(){
	$('#modalUpdate').modal('show');
	$('.nameCheck').next().html('');
	$.request({
	    url:"/manager/authority/companyInfo/companyInfo",
	    datatype : "json",
	    contentType: "application/json",
	    traditional: true,
	    success: function(data) {
		//是否禁用
		(data.data.companyInfo.status ==0) ? ($('.sfjy').prop({'checked':''})) : ($('.sfjy').prop({'checked':'checked'}));
		$("#name").val(data.data.companyInfo.name);	
		$("#code").val(data.data.companyInfo.code);
		$("#remark").val(data.data.companyInfo.remark);
		$(".groupName").val(data.data.groupName);
	
	    }
	});
});

//重置密码
function getRandomPassword(){
	var password="";
	for(var i=0;i<6;i++){  
		password+=Math.floor(Math.random()*10); 
	} 
	return password;
}

$('#qiyong').click(function(){
	if(status==0){
		$.zxsaas_plus.showalert("提示","已经启用");
	}
	else{
		 $.request({
	            type: 'Get',
	            url: '/manager/authority/companyInfo/startCompany/0',
	            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	            success: function (data) {
			 		$.zxsaas_plus.showalert("提示","启用成功");
			 		$("#jqGrid_metaData").trigger("reloadGrid")
	            },
	            error: function (msg) {
	                alert(" 数据加载失败！" + msg);
	            }
	        });
	}
});

$('#jinyong').click(function(){
	if(status==1){
		$.zxsaas_plus.showalert("提示","已经禁用");
	}
	else{
		 $.request({
	            type: 'Get',
	            url: '/manager/authority/companyInfo/startCompany/1',
	            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	            success: function (data) {
			 		$.zxsaas_plus.showalert("提示","禁用成功");
			 		$("#jqGrid_metaData").trigger("reloadGrid")
	            },
	            error: function (msg) {
	                alert(" 数据加载失败！" + msg);
	            }
	        });
	}
});