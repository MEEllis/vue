/*初始化页面*/
$(function(){
    var lastrow = "";
    var lastcell = "";
    var lead = getQueryString('lead')
    var sectionCode=''
    if(lead!=1){//特殊部门考核价
        sectionCode="sectionCode";
    }
    initial();
    function initial(){
        loadmodal();
    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  decodeURI(r[2]); return '';
    }

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
    function loadmodal(){
        /*初始化表格参数*/
        $.jgrid.defaults.width = 1280;
        $.jgrid.defaults.responsive = true;
        $.jgrid.defaults.styleUI = 'Bootstrap';
        var  colNames =[];
        var JqGridColModel =[];
        colNames= ['id',"Excel顺序号",'系统判定结果','商品编码','商品名称','部门编码','部门名称','部门考核价','零售价',"最低零售价","最低批发价","部门考核价",
            '调拨价',"售价一","售价二","售价三","售价四","售价五","预设进价"];//品牌资料
        JqGridColModel = [
            {name:'id',index:'id', width:120,align:'center', sorttype:'string',hidden:true},
            {name:'orderno',index:'orderno', width:170,align:'center',sortable:false},//Excel顺序号
            {name:'results',index:'results', width:170,align:'center', sortable:false,cellattr: addCellColor},//审核结果
            {name:'goodsCode',index:'goodsCode', width:100,align:'center',sortable:false},//编码editoptions:{dataEvents:[{type:"blur",fn:notValcume}]
            {name:'goodsName',index:'goodsName', width:100,align:'center',sortable:false},//名称
            {name:'sectionCode',index:'sectionCode', width:100,align:'center',sortable:false},
            {name:'sectionName',index:'sectionName', width:100,align:'center',sortable:false},
            {name:'specialPrice',index:'specialPrice', width:100,align:'center',sortable:false},
            {name:'retailPrice',index:'retailPrice', width:100,align:'center',sortable:false},//备注
            {name:'minRetailPrice',index:'minRetailPrice', width:100,align:'center',sortable:false},
            {name:'minWholesalePrice',index:'minWholesalePrice', width:100,align:'center',sortable:false},
            {name:'storeVisiblePrice',index:'storeVisiblePrice', width:100,align:'center',sortable:false},
            {name:'transferPrice',index:'transferPrice', width:100,align:'center',sortable:false},
            {name:'salesPrice1',index:'salesPrice1', width:100,align:'center',sortable:false},
            {name:'salesPrice2',index:'salesPrice2', width:100,align:'center',sortable:false},
            {name:'salesPrice3',index:'salesPrice3', width:100,align:'center',sortable:false},
            {name:'salesPrice4',index:'salesPrice4', width:100,align:'center',sortable:false},
            {name:'salesPrice5',index:'salesPrice5', width:100,align:'center',sortable:false},
            {name:'presetPrice',index:'presetPrice', width:100,align:'center',sortable:false},
        ];

        loadtable();
        //加载表格
        function loadtable(){
            $('#jqGrid_branInfo').jqGrid({
                url:"/manager/beginning/price/selectList",
                mtype:"POST",
                datatype: "json",
                jsonReader  : {
                    root: "data.rows",
                    page: "data.page",
                    total: "data.total",
                    records: "data.records",
                    repeatitems: false
                },
                postData:{sectionCode:sectionCode},
                pager:"#jqGridPagerBranInfo",
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
                ondblClickRow:function(id){
                    //双击进入编辑
                },
                onCellSelect:function(id,index,e){
                },
                onSelectRow:function(id){
                },
                afterSubmit: function(response, postdata) {
                },
                beforeEditCell:function(rowid,cellname,v,iRow,iCol)
                {
                },
                beforeSelectRow:function(rowid,e){
                },
                afterInsertRow: function (rowid, aData) { //新增一行之后
                },
                gridComplete: function() {
                },
                loadComplete:function(data){
                    var lead = getQueryString('lead')
                    var companyCostPriceArr=['retailPrice','minRetailPrice','minWholesalePrice','storeVisiblePrice','transferPrice','salesPrice1','salesPrice2',
                        'salesPrice3','salesPrice4','salesPrice5','presetPrice']
                    var section=['sectionCode','sectionName','specialPrice']
                    if(lead==1){
                        $('#jqGrid_branInfo').setGridParam().showCol(companyCostPriceArr).hideCol(section).trigger("reloadGrid");
                    }else{
                        $('#jqGrid_branInfo').setGridParam().hideCol(companyCostPriceArr).showCol(section).trigger("reloadGrid");
                    }
                },
                loadError:function(xhr,status,error){
                }
            })


        }
        /*添加颜色*/
        function  addCellColor(rowId, val, rawObject, cm, rdata){
            return "style='color:red'";
        }



        //模糊查询
        $(document).on("click",".search_maybe",function(event){
            var vl =$(".srch").val();
            jQuery("#jqGrid_branInfo").jqGrid('setGridParam', {
                datatype:'json',
                postData:{"keyword":vl}, //发送数据
            }).trigger("reloadGrid");
        });


    }

   //刷新
    $(document).on("click",".fresh",function(event){
        var vl =$(".srch").val('');
        jQuery("#jqGrid_branInfo").jqGrid('setGridParam', {
            datatype:'json',
            postData:{"keyword":''}, //发送数据
        }).trigger("reloadGrid");
    });
    /*浏览(上传)*/
    $(document).on("change",".file_ipt",function(){
        $(".des_file").val($(this).val());
    });


    /*点击清空*/
    $(document).on('click','.clear',function (e) {
        var lead = getQueryString('lead');
        var sectionCode="";
        if(lead!=1){//特殊部门考核价
            sectionCode="sectionCode";
        }
        $.zxsaas_plus.showconfirm("清空","是否要清空所有数据?",function(){
            $.request({
                url: '/manager/beginning/price/deleteAll',
                data:{sectionCode:sectionCode},
                type: "POST",
                traditional: true,
                success: function (data) {
                    if(data.result==1){
                        $.zxsaas_plus.showalert("提示",data.desc);
                    }else{
                        $.zxsaas_plus.showalert("错误",data.desc);
                    }
                    $("#jqGrid_branInfo").trigger("reloadGrid");
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
        var lead = getQueryString('lead');
        var sectionCode="";
        if(lead!=1){//特殊部门考核价
            sectionCode="sectionCode";
        }
        $.zxsaas_plus.showconfirm("执行","是否确定执行?",function(){
            $.request({
                url: '/manager/beginning/price/saveInfo',
                type: "POST",
                data:{sectionCode:sectionCode},
                traditional: true,
                success: function (data) {
                    if(data.result==1){
                        $.zxsaas_plus.showalert("执行完成",data.desc);
                    }else{
                        $.zxsaas_plus.showalert("错误",data.desc);
                    }
                    $("#jqGrid_branInfo").trigger("reloadGrid");
                },
                error: function (msg) {
                    $("#jqGrid_branInfo").trigger("reloadGrid");
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
            var lead = getQueryString('lead')
            if(lead==1){
                var url="/manager/beginning/price/import"
            }else{
                url="/manager/beginning/price/importSpecial"
            }
            $.ajaxFileUpload({
                url : url,
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
                    $("#jqGrid_branInfo").trigger("reloadGrid");
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
//导出
    $(".del").click(function () {
        var lead = getQueryString('lead')
        if(lead==1){
            window.location.href='/manager/beginning/price/export'
        }else{
            window.location.href='/manager/beginning/price/exportSpecial'
        }

    })
//模板下载
    $(".moban").click(function () {
        var lead = getQueryString('lead')
        if(lead==1){
            var sUrl=encodeURI('/manager/qichu/商品价格导入模板.xls')
            window.location.href=sUrl
        }else{
            var bUrl=encodeURI('/manager/qichu/特殊部门考核价导入模板.xls')
            window.location.href=bUrl
        }

    })
});




