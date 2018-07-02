var jdbmValue = new Array();
$(function () {
	vali();
	valis();
	xx();
	xx2();
	loadGlbm();
    $('#myModalLabel .modal-body').css('height', $(window).height() - 150);
//    $(window).resize(function () {
//        $('#myModalLabel .modal-body').css('height', $(window).height() - 150);
//    })
    $("#isOprAdd").click(function(){
    	if($(this).prop('checked')==true){
    		$("#clerkNonessentialForm").data('bootstrapValidator').destroy();
    		$('#clerkNonessentialForm').data('bootstrapValidator', null);
    		valiss()
    	}else{
    		$("#clerkNonessentialForm").data('bootstrapValidator').destroy();
    		$('#clerkNonessentialForm').data('bootstrapValidator', null);
    		valis()
    	}
    });
    
  //导出
    $("#export").click(function(){
    	    var obj;
    	    if ($('#xsjy').is(':checked')) {
    	        obj = 1
    	    }
    	    else {
    	        obj = 2
    	    }
    	 window.location.href= "/manager/authority/employeeInfo/export?keyWord"+$("#keyWord").val()+"&xsjy="+obj+"&jobId="+$("#selectJobName").val();
    });
})
//初始化数据
;(function () {
    tree();
    $(".telphone,.telphoneUp").focus(function (e) {
        $(this).next().html('');
    });
})();

/*********初始化树以及其它属性***********/
function tree() {
    //ztree
    var setting = {
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pId",
                rootPId: null
            }
        },
        callback: {
            onClick: function (event, treeId, treeNode, msg) {
                //controll(treeNode.id);//通过id调用对应方法 重构表格
                //单击树节点动态加载相应内容
                if (treeNode.id == -1) {
                    $("#jqGrid_blocMessage").jqGrid('setGridParam', {
                        datatype: 'json',
                        postData: {"sectionCode": ""}, //发送数据
                    }).trigger("reloadGrid"); //重新载入
                }
                else {
                    $("#jqGrid_blocMessage").jqGrid('setGridParam', {
                        datatype: 'json',
                        postData: {"sectionCode": treeNode.id}, //发送数据
                    }).trigger("reloadGrid"); //重新载入
                }
            }
        },
        view: {
            showIcon: true
        }
    };
    $.request({
        type: 'Get',
        url: '/manager/authority/employeeInfo/initEmployee',
        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function (data) {
            var obj = [];
            var bumen = {};
            bumen.name = data.data.companyName;
            bumen.id = -1;
            obj.push(bumen);
            //公司
            $(".companyName").val(data.data.companyName);
            //上级部门
			if (data.data.slist) {
				for (var i = 0; i < data.data.slist.length; i++) {
					var bumen = {};
					bumen.id = data.data.slist[i].layerCode;
					bumen.name = data.data.slist[i].name;
					bumen.pId = data.data.slist[i].parentLayerCode;
					obj.push(bumen);
				}
			}
			//可选择部门
			$(".sectionName").html("");
			if(data.data.endList){
				for(var i = 0; i < data.data.endList.length; i++){
					$(".sectionName").append("<option value='" + data.data.endList[i].id + "'>" 
						+data.data.endList[i].code+"-"+ data.data.endList[i].name + "</option>");
				}
			}
			
			
            //职位
            $(".jobName").html("");
            $("#selectJobName").html("");
            $("#selectJobName").append("<option></option>");
			if (data.data.jlist) {
				for (var i = 0; i < data.data.jlist.length; i++) {
					$(".jobName").append("<option value='" + data.data.jlist[i].id + "'>" + data.data.jlist[i].name + "</option>");
					$("#selectJobName").append("<option value='" + data.data.jlist[i].id + "'>" + data.data.jlist[i].name + "</option>");
				}
			}
			
            //在职状态
            $(".YGZT").html("");
			if (data.data.YGZT) {
				for (var i = 0; i < data.data.YGZT.length; i++) {
					$(".YGZT").append("<option value='" + data.data.YGZT[i].code + "'>" + data.data.YGZT[i].content1 + "</option>");
				}
			}
            //健康状况
            $(".JKZK").html("");
            $(".JKZK").append("<option></option>");
			if (data.data.JKZK) {
				for (var i = 0; i < data.data.JKZK.length; i++) {
					$(".JKZK").append("<option value='" + data.data.JKZK[i].code + "'>" + data.data.JKZK[i].content1 + "</option>");
				}
			}
            //文化程度
            $(".WHCD").html("");
            $(".WHCD").append("<option></option>");
			if (data.data.WHCD) {
				for (var i = 0; i < data.data.WHCD.length; i++) {
					$(".WHCD").append("<option value='" + data.data.WHCD[i].code + "'>" + data.data.WHCD[i].content1 + "</option>");
				}
			}
            //政治面貌
            $(".ZZMM").html("");
            $(".ZZMM").append("<option></option>");
			if (data.data.ZZMM) {
				for (var i = 0; i < data.data.ZZMM.length; i++) {
					$(".ZZMM").append("<option value='" + data.data.ZZMM[i].code + "'>" + data.data.ZZMM[i].content1 + "</option>");
				}
			}
            //员工属性
            $(".ATTR").html("");
            $(".ATTR").append("<option></option>");
			if (data.data.alist) {
				for (var i = 0; i < data.data.alist.length; i++) {
					$(".ATTR").append("<option value='" + data.data.alist[i].id + "'>" + data.data.alist[i].name + "</option>");
				}
			}
            //主页面树
            $.fn.zTree.init($("#publicModelTree"), setting, obj);
        },
        error: function (msg) {

        }
    });
}

//主页面
function loadmodal(){
    var options = {
        LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
        LoadTableUrl: "/manager/authority/employeeInfo/selectEmployeeList",
        GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
        DelRowUrl: "", // 删除信息接口地址
        isSub:"",//是否有子级表格
        subLoadTableUrl:"",//子级表格数据来源地址
        TableName: "#jqGrid_blocMessage", //显示表格名称。遵照css选择器书写
        iconJsonUrl:"../json/icon.json",
        btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写
        pager:"#jqGridPager"
    };
    $("#datetimepickerStart").datetimepicker({
        lang:"ch",           //语言选择中文
        format:"Y-m-d",      //格式化日期
        timepicker:false,    //关闭时间选项
        todayButton:false    //关闭选择今天按钮
    });
    $("#datetimepickerEnd").datetimepicker({
        lang:"ch",           //语言选择中文
        format:"Y-m-d",      //格式化日期
        timepicker:false,    //关闭时间选项
        todayButton:false    //关闭选择今天按钮
    });
    $("#datetimepickerBirthday").datetimepicker({
        lang:"ch",           //语言选择中文
        format:"Y-m-d",      //格式化日期
        timepicker:false,    //关闭时间选项
        todayButton:false    //关闭选择今天按钮
    });
    $("#datetimepickerBirthdayUpdate").datetimepicker({
        lang:"ch",           //语言选择中文
        format:"Y-m-d",      //格式化日期
        timepicker:false,    //关闭时间选项
        todayButton:false    //关闭选择今天按钮
    });
    $("#datetimepickerStartUpdate").datetimepicker({
        lang:"ch",           //语言选择中文
        format:"Y-m-d",      //格式化日期
        timepicker:false,    //关闭时间选项
        todayButton:false    //关闭选择今天按钮
    });
    $("#datetimepickerEndUpdate").datetimepicker({
        lang:"ch",           //语言选择中文
        format:"Y-m-d",      //格式化日期
        timepicker:false,    //关闭时间选项
        todayButton:false    //关闭选择今天按钮
    });
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
    var colNames = ['ID','员工编号','员工名称','部门名称','职位名称','在职状态','是否操作员','手机号码','操作','是否启用','是否主管'];
    var JqGridColModel=[
        {name:'id',index:'id', width:100,align:'center', sorttype:'string',hidden:true,sortable:true},
        {name:'code',index:'code', width:200,align:'center', sorttype:'string',sortable:true},
        {name:'name',index:'name', width:200,align:'center', sorttype:'string',sortable:true},
        {name:'sectionName',index:'section_name', width:150,align:'center', sorttype:"string",sortable:true},
        {name:'jobName',index:'job_name', width:150,align:'center', sorttype:"string",sortable:true},
        {name:'inStatus',index:'IN_STATUS', width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"1:在职;2:离职;3:停薪留职;4:带薪留职"},sortable:true},
        {name:'isOpr',index:'IS_OPR', width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:;1:√"},sortable:true},
        {name:'login',index:'login', width:100,align:'center', sorttype:'string',editable:true,sortable:true},
        {name:'oper',index:'oper', width:100,align:'center', sorttype:'string',editable:true,sortable:false},
        {name:'status',index:'status', width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:true},
        {name:'isManager',index:'IS_MANAGER', width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:;1:√"},sortable:true}
    ];
    loadtable();
    //加载表格
    function loadtable() {
        $(options.TableName).jqGrid({
            url: options.LoadTableUrl,
            mtype: "GET",
            datatype: "json",
            jsonReader: {
                root: "data.rows",
                page: "data.page",
                total: "data.total",
                records: "data.records",
                repeatitems: false
            },
            colNames: colNames,
            colModel: JqGridColModel,
            sortable:true,	
            sortorder: 'desc',
            sortname:"id",
            rowNum: 20,
            rowList: [20, 25, 40],
            pager: options.pager,
            viewrecords: true,
            multiselect: true,
            width: "100%",
            height: $(window).height() * 0.65,
            autowidth: true,
            rownumWidth: 35, // the width of the row numbers columns
            shrinkToFit: false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
            ondblClickRow: function (id) {
                //双击进入编辑
                var delid = id;
            },
            onCellSelect: function (id, index, e) {
                var colName = $(options.TableName).jqGrid('getGridParam', 'colModel')[index].name
                select_name = colName
                select_index = index;
                //后续可以通过点击的列名称来弹框等
            },
            onSelectRow: function (id) {
                if (id != lastsel && lastsel != '') {
                    $(options.TableName).jqGrid('saveRow', lastsel, {
                        aftersavefunc: function (rowid, response) {
                        }
                    });
                }
                lastsel = id;
                var rec = $(options.TableName).jqGrid('getRowData', id);

            },

            beforeSelectRow: function (rowid, e) {

            },
            afterInsertRow: function (rowid, aData) { //新增一行之后

            },
            gridComplete: function (id) {
                var ids = $(options.TableName).jqGrid("getDataIDs");
                if(ids.length>0){
	                for(var i=0;i<ids.length;i++){
	                   currencyFmatter(ids[i]);
	                }
                }
            },
            loadComplete: function (data) {
            },
            loadError: function (xhr, status, error) {
            }
        })

    }

    function currencyFmatter (rowId)
    {
    	var isOper = $("#jqGrid_blocMessage").getCell(rowId,"isOpr");
    	if(isOper){
    	   if(isOper==1||isOper=="1"){
    			$("#jqGrid_blocMessage").setCell(rowId,'oper','<span style="text-align:center;color:blue;cursor:pointer" class="resetPsw" data-id="'+rowId+'">重置密码</span>');
    	   }
    	}
    }
    $(document).on("click",".resetPsw",function(){
    	var id =$(this).data("id");
    	if(id){
    		  $.request({
                  type: 'POST',
                  url: '/manager/authority/employeeInfo/updatePwd',
                  data: {"rePwd":"123456","id": id,"isCheckPwd":"0"},
                  success: function (data) {
                      if (data.result == 1) {
                          $.zxsaas_plus.showalert("提示", data.desc);
                      } else {
                          $.zxsaas_plus.showalert("错误", data.desc);
                      }
                      $("#jqGrid_blocMessage").trigger("reloadGrid");
                  },
                  error: function (msg) {
                  }
              });
    	}else{
    		$.zxsaas_plus.showalert("提示","当前操作失败！");	
    	}
    });
    
    $(window).bind('click', function saveEdit(e) {
        var rowId = $(e.target).parent("tr").attr("id");
        if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
            if ($(e.target).closest(options.TableName).length == 0) {
                $(options.TableName).jqGrid('saveRow', lastsel);
                lastsel = '';
            }
        }
    })

//批量删除
    $(document).on('click', '.btnDeleteRow', function (e) {
        var ids = $(options.TableName).jqGrid('getGridParam', 'selarrrow');//选中的行id
        var len = ids.length;
        if (len == 0) {
            $.zxsaas_plus.showalert("错误", "请勾选人员后再删除!");
            return false;
        } else {
            $.zxsaas_plus.showconfirm("", "是否确定删除选中数据?", function () {
                $.request({
                    type: 'Get',
                    url: '/manager/authority/employeeInfo/delete',
                    data: {"ids": ids},
                    traditional: true,
                    success: function (data) {
                        if (data.result == 1) {
                            $.zxsaas_plus.showalert("提示", data.desc);
                        } else {
                            $.zxsaas_plus.showalert("错误", data.desc);
                        }
                        $("#jqGrid_blocMessage").trigger("reloadGrid");
                    },
                    error: function (msg) {
                        alert(" 数据加载失败！" + msg);
                    }
                });
            }, function () {

            });
        }
    });



    //员工属性管理
    $('.empManage').click(function () {
        loadmodalEmpManage();
    });

    //查询按钮
    $(".btn-success").click(function () {
        var obj;
        if ($('#xsjy').is(':checked')) {
            obj = 1
        }
        else {
            obj = 2
        }
        $(options.TableName).jqGrid('setGridParam', {
            datatype: 'json',
            postData: {"keyWord": $("#keyWord").val(), "xsjy": obj, "jobId": $("#selectJobName").val()}, //发送数据
        }).trigger("reloadGrid"); //重新载入
    });


    //新增修改保存
    $(document).on("click", ".addEmployee", function (event) {
        $('#clerkMustForm').bootstrapValidator('resetForm', false);
        $('#clerkMustForm').data('bootstrapValidator').validate();
        $('#clerkNonessentialForm').bootstrapValidator('resetForm', false);
        $('#clerkNonessentialForm').data('bootstrapValidator').validate();
        if (!$('#clerkMustForm').data('bootstrapValidator').isValid()||!$('#clerkNonessentialForm').data('bootstrapValidator').isValid()) {
            return false;
        } else {
            var na = $('.nameCheck').val().trim(),
                ygsx = $('.attrCheck').val();
            if($('.sectionName').val()==null||$('.sectionName').val()==''){
            	$.zxsaas_plus.showalert("warning", "部门未选择!")
            	return false
            };
            if($('.jobName').val()==null||$('.jobName').val()==''){
            	$.zxsaas_plus.showalert("warning", "职位名称未选择!")
            	return false
            };
            var obj = $(".empAddRight").toJsonObject();
            var body = $("#updateEmpBody").toJsonObject();

            var authCode = "";
			obj.isOpr = $("#isOprAdd").prop("checked") ? "1":"0";
			obj.isManager = $("#isManagerAdd").prop("checked") ? "1":"0";
			obj.isNotCompany = $("#isNotCompanyAdd").prop("checked") ? "1":"0";
			obj.isApp = $("#isAppAdd").prop("checked") ? "1":"0";
            if(obj.id==""){
            	  authCode='auth_add';
            	  delete obj.id;
                  delete body.id;
            }else{
            	authCode='auth_update';
            }
            var attrId = body.attrId;
            obj.attrId = attrId;
            obj.temployeeExt = body;
            
            //关联部门
			  if(storageNode.length>0){
				  obj.glbm=[];
			  	for(var i=0; i<storageNode.length; i++){
			  		obj.glbm.push(storageNode[i].id);
			  	}
			  }
            $.request({
                url: '/manager/authority/employeeInfo/saveEmployee/'+authCode,
                type: "POST",
                datatype: "json",
                contentType: "application/json",
                data: JSON.stringify(obj),
                traditional: true,
                success: function (data) {
                    if (data.result == 1) {
                        $.zxsaas_plus.showalert("提示", data.desc);
                        jdbmValue = new Array();
                        $('#myModal').modal('hide');
                        $("#jqGrid_blocMessage").trigger("reloadGrid");
                    } else {
                        $.zxsaas_plus.showalert("错误", data.desc);
                    }
                },
                error: function (msg) {
                	$.zxsaas_plus.showalert("错误","服务器正忙");
                }
            });
        }
    });
 
    $(document).on("show.bs.modal","#myModal",function(e){
    	//刷新树
    	var treeObj = $.fn.zTree.getZTreeObj("empDataPowerTree");
    	treeObj.checkAllNodes(false);
    	$("#relatedSection").val("");
    	$("#relatedSection").attr("title","");
    	 storageNode=[];
    	 showNode=[];
    	if($(e.relatedTarget).hasClass("updateBloc")){
    	  $("#myModal").find("#myModalLabel").html("修改员工");
    	  $('.telphoneUp').next().html('');
          var ids = $(options.TableName).jqGrid('getGridParam', 'selarrrow');//选中的行id
          var len = ids.length;
          if (len != 1) {
              $.zxsaas_plus.showalert("错误", "一次只能修改一条信息!");
              return false;
          } else {
              $.request({
                  url: '/manager/authority/employeeInfo/selectOne',
                  type: "POST",
    			  data:{"id":ids},
    			  traditional: true,
                  success: function (data) {
                      if (data.data.empExt[0].birthDay) {
                          var birthDay = new Date(data.data.empExt[0].birthDay);
                          data.data.empExt[0].birthDay = format(birthDay.getTime(), 'yyyy-MM-dd');
                      }
                      if (data.data.empExt[0].entryDay) {
                          var entryDay = new Date(data.data.empExt[0].entryDay);
                          data.data.empExt[0].entryDay = format(entryDay.getTime(), 'yyyy-MM-dd');
                      }
                      if (data.data.empExt[0].dimissionDay) {
                          var dimissionDay = new Date(data.data.empExt[0].dimissionDay);
                          data.data.empExt[0].dimissionDay = format(dimissionDay.getTime(), 'yyyy-MM-dd');
                      }
                      $("#empupDateTop").writeJson2Dom(data.data.emp);
                      
                      
                      $("#attrId").val(data.data.emp.attrId);
                      $("#updateEmpBody").writeJson2Dom(data.data.empExt[0]);
                      $("#eid").val(data.data.emp.id);
                      $("#extId").val(data.data.empExt[0].id);
                      
                      var bmsx = document.getElementById("attrId").options;
					  for (i=0; i<bmsx.length; i++){
					      if (bmsx[i].value == data.data.emp.attrId)  // 根据option标签的ID来进行判断  测试的代码这里是两个等号
					      {
					    	  bmsx[i].selected = true;
					      }
					   }
                      
                      //借调部门
                       if(data.data.glbm!=undefined){
                    	   if(data.data.glbm.length>0){
                    		  // loadGlbm(data.data.glbm);//加载关联部门树
                    	      	//if(seletedNodes.length>0){
                    	        	   checkLastNodes(data.data.glbm,"empDataPowerTree");
                    	        	    $(".chooseConfirm").trigger("click");
                    	       // }
                    	   }
                    	
                       }
                  },
                  error: function (msg) {
                      alert(" 数据加载失败！" + msg);
                  }
              });
          }
    	}else if($(e.relatedTarget).hasClass("add")){
    
    		$("#myModal").find("#myModalLabel").html("新增员工");
    	    $("input[name='sex']:first").prop("checked",true);
    	    $("input[name='maritalStatus']:first").prop("checked",true);
    	    $("input[name='domicileNature']:first").prop("checked",true);
            $("#eid").val("");
            $("#extId").val("");
            $("#clerkMustForm").data('bootstrapValidator').destroy();
    		$('#clerkMustForm').data('bootstrapValidator', null);
    		$("#clerkNonessentialForm").data('bootstrapValidator').destroy();
    		$('#clerkNonessentialForm').data('bootstrapValidator', null);
    		vali();
    		valis();
            $('.telphone').next().val('');
            $('.clearAll').map(function () {
             $(arguments[1]).val('');
            });
            $('#empAddTop input').val('');
            $('#clerkMustForm input[type=checkbox]').prop('checked',false);
    	}
    });

   
}

//借调部门弹出
//$(document).on("show.bs.modal","#dataPowerModalDialog",function(e){
//	console.log(e.relatedTarget);
//	var reDom = e.relatedTarget;
//	if($(reDom).val()==""){
//		
//	}
//});

//保存借调部门
$(document).on("click",".chooseConfirm",function(){
	saveJdbm();
});
function saveJdbm() {
	storageNode=[];
	showNode=[];
	jdbmValue = new Array();
    var treeObj = $.fn.zTree.getZTreeObj("empDataPowerTree");
    var nodes = treeObj.getCheckedNodes();
    if(nodes.length>0){
	    for (var i = 0; i < nodes.length; i++) {
	    	judge(nodes[i]);
	    }
    }
    if(showNode.length>0){
    	$(".jdbm").val(showNode.join(","));
    	$(".jdbm").attr("title",showNode.join(","));
    }else{
    	$(".jdbm").val("");
    	$(".jdbm").attr("title","");
    }
}

var storageNode=[];//保存有效结点（子节点全选的父节点、父节点半选的子节点）
var showNode=[];//显示叶子节点
function judge(node){
	if(node.halfCheck||node.checked&&node.check_Child_State==0&&!node.halfCheck||node.checked&&node.check_Child_State==1&&!node.halfCheck){//半选
		console.log(node.name+"半选");
	}else{
		console.log(node.name+"全选");
	    if(node.children){//全选有子节点
	    	storageNode.push(node);
	    }else{//全选无子节点
	    	showNode.push(node.name);//存入全选的孩子节点(显示)
			var flag=false;
			for(var i=0; i<storageNode.length; i++){
				if(storageNode[i].id==node.parentId){//父节点已经放入
					flag=true;
					break;
				}
			}
	    	if(!flag){
	    		storageNode.push(node);
	    	}
	    }
	}
	
}
//新增的时候清空关联部门部门
$(document).on('click', '.add', function (e) {
	///loadGlbm([]);//加载关联部门树
    jdbmValue = new Array();
    storageNode=[];
    showNode=[];
});

/*勾选树节点*/
function checkLastNodes(selIdObj,treeId){
	var  treeObj = $.fn.zTree.getZTreeObj(treeId);
	$.each(selIdObj,function(index,item){
		var node = treeObj.getNodeByParam("id", item.valueCode);
		if( node != null ){
			treeObj.checkNode(node, true, true);
		}
	});
}
//关联部门
function loadGlbm(){
	//公司选择树
var setting2 = {
    data: {//数据属性设置
		    	simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "parentId",
				rootPId: ''
			}
    },
    check: {
        enable: true
        // chkboxType : { "Y" : "", "N" : "" }
    },
    async: {//从后台获取数据
        enable: true,
        url: '/manager/inventory/common/getSectionTreeNodeVoList',
        autoParam: [],
        dataFilter: function(treeId, parentNode, responseData){
  	      if(responseData.result==1){
  	    	  $.each(responseData.data.sectionVoList,function(index,item){
  	    		  if(item.parentId==-2||item.parentId=="-2"){//虚拟结点(部门)
  	    			  responseData.data.sectionVoList[index].open=true;
  	    			  responseData.data.sectionVoList[index].nocheck=true;
  	    		  }
  	    		  if(item.chkDisabled==undefined || item.chkDisabled==true ){
  	    			  responseData.data.sectionVoList[index].chkDisabled=false;
  				   }
  	    	  });
                 return responseData.data.sectionVoList;
  	    	
  	      }else{
  	    	  $.zxsaas_plus.showalert("提示", responseData.desc);    
  	      }
        }
    },
    callback: {//回调事件设置
        onClick: function (event, treeId, treeNode, msg) {

        },
        onAsyncSuccess: function (event, treeId, treeNode, msg) {
  
        },
        onCheck: function zTreeOnCheck(event, treeId, treeNode) {
            // alert(treeNode.tId + ", " + treeNode.name + "," + treeNode.checked);
        }

    },
    view: {//样式设置
        showIcon: true
    }
};
$.fn.zTree.init($("#empDataPowerTree"), setting2);
var zTree2 = $.fn.zTree.getZTreeObj("empDataPowerTree");
}
//员工属性管理弹出窗
function loadmodalEmpManage(){
    var options = {
        LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
        LoadTableUrl: "/manager/authority/employeeInfo/selectAttrList",
        GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
        DelRowUrl: "", // 删除信息接口地址
        isSub:"",//是否有子级表格
        subLoadTableUrl:"",//子级表格数据来源地址
        TableName: "#jqGrid_empManage", //显示表格名称。遵照css选择器书写
        iconJsonUrl:"../json/icon.json",
        btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写
        pager:"#jqGridPager_empManage"
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
    //var toggleflag=false;//冻结时候切换用
    var colNames = ['ID','属性编码','属性名称','操作'];
    var JqGridColModel=[
        {name:'id',index:'id', width:100,align:'center', sorttype:'string',hidden:true},
        {name:'code',index:'code', width:150,align:'center', sorttype:'string',sortable:false},
        {name:'name',index:'name', width:150,align:'center', sorttype:'string',sortable:false},
        {name:'storageName',index:'storageName', width:200,align:'center',sortable:false,formatter:manage}
    ];
    loadtable();
    //加载表格
    function loadtable() {
        $(options.TableName).jqGrid({
            url: options.LoadTableUrl,
            mtype: "GET",
            datatype: "json",
            jsonReader: {
                root: "data.rows",
                page: "data.page",
                total: "data.total",
                records: "data.records",
                repeatitems: false
            },
            colNames: colNames,
            colModel: JqGridColModel,
            sortable: false,
            rownumbers: true,
            rowNum: 20,
            rowList: [20, 25, 40],
            pager: options.pager,
            viewrecords: true,
            width: "100%",
            height: $(window).height() * 0.25,
            autowidth: true,
            rownumWidth: 35, // the width of the row numbers columns
            shrinkToFit: false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
            ondblClickRow: function (id) {
                //双击进入编辑
                var delid = id;

            },
            onCellSelect: function (id, index, e) {
                var colName = $(options.TableName).jqGrid('getGridParam', 'colModel')[index].name
                select_name = colName
                select_index = index;
                //后续可以通过点击的列名称来弹框等
            },
            onSelectRow: function (id) {
                if (id != lastsel && lastsel != '') {
                    $(options.TableName).jqGrid('saveRow', lastsel, {
                        aftersavefunc: function (rowid, response) {
                        }
                    });
                }
                lastsel = id;
                var rec = $(options.TableName).jqGrid('getRowData', id);

            },

            beforeSelectRow: function (rowid, e) {

            },
            afterInsertRow: function (rowid, aData) { //新增一行之后

            },
            gridComplete: function () {
                var ids = $(options.TableName).jqGrid("getDataIDs");
              
            },
            loadComplete: function (data) {
            
            },
            loadError: function (xhr, status, error) {
            }
        })

    }

    $(window).bind('click', function saveEdit(e) {
        var rowId = $(e.target).parent("tr").attr("id");
        if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
            if ($(e.target).closest(options.TableName).length == 0) {
                $(options.TableName).jqGrid('saveRow', lastsel);
                lastsel = '';
            }
        }
    })

//删除      根据每行数据的id删除  而不是行id
    $(document).on('click', '.deleteEmpManage', function (e) {
        var dId = $(this).data('id');//获取数据的id
        //调用接口删除数据
        $.zxsaas_plus.showconfirm("", "是否确定删除此条数据?", function () {
            $.request({
                url: '/manager/authority/employeeInfo/deleteAttr',
                type: "POST",
			    data:{"id":dId},
			    traditional: true,
                success: function (data) {
                    tree();
                    $.zxsaas_plus.showalert("提示",data.desc);
                    $("#jqGrid_empManage").trigger("reloadGrid");
                },
                error: function (msg) {
                    alert(" 数据加载失败！" + msg);
                }
            });
        }, function () {

        });

    });

    //修改
    $(document).on('click', '.updateEmpManage', function (e) {
        var id = $(this).data('id');
        var name = $(this).data('name');//获取数据的id
        var code = $(this).data('code');
        $("#aid").val(id);
        $("#aname").val(name);
        $("#acode").val(code);
    });

    //员工属性修改  删除按钮
    function manage(cellvalue, options, rowObjec) {
        return '<span class="updateEmpManage" data-code="' + rowObjec.code + '" data-id="' + rowObjec.id + '" data-name="' + rowObjec.name + '" data-toggle="modal" data-target="#modalEmpManageUpdate" style="color:#00CCFF;cursor:pointer;margin-right:40px;">修改</span><span class="deleteEmpManage" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">删除</span>';
    }

    //员工属性新增保存
}

$(document).on('click', '.isManAdd,.isMan', function (e) {
    if ($('.isManAdd').prop('checked')) {
        $('.msgTelAdd').html('必填');
    } else {
        $('.msgTelAdd').html('');
        $('.telphone').val('');
    }

    if ($('.isMan').prop('checked')) {
        $('.msgTelUp').html('必填');
    } else {
        $('.msgTelUp').html('');
        $('.telphoneUp').val('');
    }
});

//打开部门引用对话框
function selectSectionReferenceOpen() {
    if ($("#slideThree").is(':checked'))return;
    $('#sectionReferenceModal').modal('show');
    callBack = function () {
        if (arguments[0].length == 0) {
            $.MsgBox('提示消息', "未选中任何行");
            $('#sectionReferenceModal').modal('hide');
            return;
        }
        var models = arguments[0];

        //设置编辑器值
        $("input[name='sectionId']").val(model.id);
        $("input[name='sectionName']").val(model.name);
        $('#sectionReferenceModal').modal('hide');
        refreshValidatorField("sectionName");//刷新验证信息
    };
}


$(document).on('click', '.saveAttr', function (e) {
    $('#attrAdd').data('bootstrapValidator').validate();
    if (!$('#attrAdd').data('bootstrapValidator').isValid()) {
        return false;
    } else {
    	$.request({
            type: 'Get',
            url: '/manager/authority/employeeInfo/saveAttr/auth_add',
            type: "POST",
            datatype: "json",
            contentType: "application/json",
            data: JSON.stringify($("#modalEmpManageAdd").toJsonObject()),
            traditional: true,
            success: function (data) {
                if (data.result == 1) {
                    $.zxsaas_plus.showalert("提示", data.desc);
                } else {
                    $.zxsaas_plus.showalert("错误", data.desc);
                }
                tree();
                $("#jqGrid_empManage").trigger("reloadGrid");
                $("#modalEmpManageAdd").cleanAllObj();
                resetBootstrapValidator("#attrAdd");
            },
            error: function (msg) {
                alert(" 数据加载失败！" + msg);
            }
        });
    }
});
function resetBootstrapValidator(formId){
    $(formId).data('bootstrapValidator').destroy();
    $(formId).data('bootstrapValidator', null);
    if(formId=="#attrAdd"){
        xx();	
    }else if(formId=="#attrModify"){
    	xx2();
    }
}
//员工属性修改保存
$(document).on('click', '.updateAttr', function (e) {
	 $('#attrModify').data('bootstrapValidator').validate();
	    if (!$('#attrModify').data('bootstrapValidator').isValid()) {
	        return false;
	    } else {
	    $.request({
	        type: 'Get',
	        url: '/manager/authority/employeeInfo/saveAttr/auth_update',
	        type: "POST",
	        datatype: "json",
	        contentType: "application/json",
	        data: JSON.stringify($("#modalEmpManageUpdate").toJsonObject()),
	        traditional: true,
	        success: function (data) {
	            if (data.result == 1) {
	                $.zxsaas_plus.showalert("提示", data.desc);
	            } else {
	                $.zxsaas_plus.showalert("错误", data.desc);
	            }
	            tree();
	            $("#jqGrid_empManage").trigger("reloadGrid");
	            $("#modalEmpManageUpdate").cleanAll();
	            resetBootstrapValidator("#attrModify");
	        },
	        error: function (msg) {
	            alert(" 数据加载失败！" + msg);
	        }
	    });
	    }
});


//批量启动或禁用
$(document).on('click', '.enableOrDisable', function (e) {
    var id = e.target.id;
    var checkedIdList = $("#jqGrid_blocMessage").jqGrid('getGridParam', 'selarrrow');//获取选中行的id
    if (checkedIdList.length == 0) {
        if (id == 1) {
            $.zxsaas_plus.showalert("提示", "请勾选人员后再禁用!");
        } else {
            $.zxsaas_plus.showalert("提示", "请勾选人员后再启用!");
        }
        return;
    } else {
        $.request({
            url: "/manager/authority/employeeInfo/startEmployee",
            type: "POST",
            data: {"checkedIdList": checkedIdList, "status": id},
            traditional: true,
            success: function (data) {
                if (data.result == 1) {
                    $.zxsaas_plus.showalert("提示", data.desc);
                } else {
                    $.zxsaas_plus.showalert("错误", data.desc);
                }
                $("#jqGrid_blocMessage").trigger("reloadGrid");
            }
        });
    }
});


//显示禁用框
$("#xsjy").click(function () {
    if ($('#xsjy').is(':checked')) {
        $("#jqGrid_blocMessage").jqGrid('setGridParam', {
            datatype: 'json',
            postData: {"keyword": $("#keyWord").val(), "xsjy": 1, "jobId": $("#selectJobName").val()}, //发送数据
        }).trigger("reloadGrid"); //重新载入

    } else {
        $("#jqGrid_blocMessage").jqGrid('setGridParam', {
            datatype: 'json',
            postData: {"keyword": $("#keyWord").val(), "xsjy": 2, "jobId": $("#selectJobName").val()}, //发送数据
        }).trigger("reloadGrid"); //重新载入

    }
});



var format = function (time, format) {
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
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

//新增
function vali(){
	//验证
	$('#clerkMustForm').bootstrapValidator({
	    message: 'This value is not valid',
	    feedbackIcons: {
	        valid: 'glyphicon glyphicon-ok',
	        invalid: 'glyphicon glyphicon-remove',
	        validating: 'glyphicon glyphicon-refresh'
	    },
	    fields: {
	        code: {
	            validators: {
	                regexp: {
	                    regexp: /^[a-zA-Z0-9\u4E00-\u9FA5]+$/,
	                    message: '不允许特殊符号'
	                }
	            },
	        },
	        name: {
	            validators: {
	                notEmpty: {
	                    message: '员工姓名不能为空'
	                },
	                stringLength: {
	                    min: 2,
	                    max: 15,
	                    message: '2-15位'
	                },
	            },
	        }
	    }
	})
}
function valis(){
	$('#clerkNonessentialForm').bootstrapValidator({
	    message: 'This value is not valid',
	    feedbackIcons: {
	        valid: 'glyphicon glyphicon-ok',
	        invalid: 'glyphicon glyphicon-remove',
	        validating: 'glyphicon glyphicon-refresh'
	    },
	    fields: {
	    	mobileNum:{
		       	 validators: {
		             regexp: {
		            	 regexp: /^1\d{10}$/,
		            	 message: '手机号码格式错误'
		             },
	        	}
		   	}
	    }
	})
}
function valiss(){
	$('#clerkNonessentialForm').bootstrapValidator({
	    message: 'This value is not valid',
	    feedbackIcons: {
	        valid: 'glyphicon glyphicon-ok',
	        invalid: 'glyphicon glyphicon-remove',
	        validating: 'glyphicon glyphicon-refresh'
	    },
	    fields: {
	    	mobileNum:{
		       	 validators: {
			    	notEmpty: {
			            message: '手机号码不能为空'
		        	},
		             regexp: {
		            	 regexp: /^1\d{10}$/,
		            	 message: '手机号码格式错误'
		             },
	        	}
		   	}
	    }
	})
}

function xx(){
	$('#attrAdd').bootstrapValidator({
	    message: 'This value is not valid',
	    feedbackIcons: {
	        valid: 'glyphicon glyphicon-ok',
	        invalid: 'glyphicon glyphicon-remove',
	        validating: 'glyphicon glyphicon-refresh'
	    },
	    fields: {
	        name: {
	            validators: {
	                notEmpty: {
	                    message: '属性名称不能为空'
	                }
	            },
	        }
	    }
	})
}

function xx2(){
	$('#attrModify').bootstrapValidator({
	    message: 'This value is not valid',
	    feedbackIcons: {
	        valid: 'glyphicon glyphicon-ok',
	        invalid: 'glyphicon glyphicon-remove',
	        validating: 'glyphicon glyphicon-refresh'
	    },
	    fields: {
	        name: {
	            validators: {
	                notEmpty: {
	                    message: '属性名称不能为空'
	                }
	            },
	        }
	    }
	})
}


/*前端模态框调整勿动*/
$(window).resize(function(){
	var modal=$(".modal:visible");
	if(modal.length>0){
		resizeModal(modal);
	//	HorizontalMiddle(modal);
	}
});

//模态框大小调整
/*新增模态框*/
$(document).on("shown.bs.modal","#myModal",function(){
	resizeModal(this);
	//HorizontalMiddle(this);//水平居中模态框
});

function resizeModal(modal){
	var  _width =$(window.parent).width()||$(window).width();//$(window.parent).width()||
	var  _height=$(window.parent).height()||$(window).height();//$(window.parent).height()||
	var modal_id=$(modal).attr("id");
	if(modal_id=="myModal"){
		if(_width<1200){
		    $("#"+modal_id).find(".modal-content").css({
			   "width":$(window).width()*0.85+"px",
			   "height":"auto",
			   "overflow-y":"hidden"
		    });
		    
		    $("#"+modal_id).find(".modal-body").css({
		    	"height":$(window).height()*0.65+"px",
				"overflow":"auto"	
		    });
		    
		}else if(_width<1400){
		    $("#"+modal_id).find(".modal-content").css({
			   "width":"842px",
			   "height":"auto",
			   "overflow-y":"hidden"	
		    });
		    $("#"+modal_id).find(".modal-body").css({
		    	"height":$(window).height()*0.65+"px",
				"overflow":"auto"	
		    });
		}else{
			 $("#"+modal_id).find(".modal-content").css({
				   "width":"1100px",
				   "height":"auto",
				   "overflow-y":"hidden"
			  });
			 $("#"+modal_id).find(".modal-body").css({
			    	"height":$(window).height()*0.65+"px",
			    	"overflow-x":"hidden"
			    	///"overflow-y":"auto"
			    });
		}
		HorizontalMiddle(modal_id);//水平居中模态框
	}
}		

function HorizontalMiddle(modal_id){
    var w =$(window).width();
    var modal_w=$("#"+modal_id+" .modal-content").width();
    if(w&&modal_w){
        var modal_l=(w-modal_w)/2;
        $("#"+modal_id+" .modal-dialog").css({"position":"absolute"});	
        $("#"+modal_id+" .modal-content").css({"position":"absolute","left":modal_l});	
    }
}

