/*
 组件:串号录入框
*/

!function ($) {


    // 构造函数
    var comImeiOutModal = function (el, option) {
        var nonDuplicateID = functionObjExtent.GenNonDuplicateID();// 不重复的ID
        // 默认参数
        var defaults = {
            dataGrid: null, //表格对象
            nonDuplicateID: nonDuplicateID,//唯一标示
            imeiOutModalID:`imeiOutModalID${nonDuplicateID}`,
            imeiDrTableID:`imeiDrTableID${nonDuplicateID}`,
            menuCode:'',
            sectionId:'',
            getImeiUrl:'',
            inputLab:'退货串号',
            imeiList:[],
            requestBeforeBack:function(){

            },
            inputEnterBack:function(){

            },
            importEnterBack:function(){

            },
        };
        this.option = $.extend(true, defaults, option);
        this.element = $(el);
        this.dom = null;
        this.imeiDom = null;
        this._init();
    };
    comImeiOutModal.prototype = {
        _init: function () {
            this.loadDom();
        },
        //创建事件
        createEvent: function () {
            var _self = this;
            _self.outInputEvent();
        },
        //加载dom
        loadDom: function () {
            var _self = this;
            var $_template = $(_self.getTemplate());
            _self.dom = $_template;
            _self.createEvent();
            _self.element.append(_self.dom);
        },
        reLoadDom: function () {
            this.clearDom();
            this._init();
        },
        //出库串号输入框事件
        outInputEvent: function () {
            var _self = this;
            //出库串号
            _self.dom.find('.outSearchImei').bind('keyup', function(e) {
                if(e.keyCode!=13){
                    return;
                }
                var $outObj=$(this)
                var curVal=$outObj.val().trim()
                var keyCodyflag=false; //是否按下enter
                if(e.keyCode==13&&curVal!=''){
                    keyCodyflag=true;
                }
                _self.dom.find('.imeiUl').html('');
                if(curVal.length > 4){
                    $outObj.blur()
                    if(_self.option.requestBeforeBack){
                      var flag =  _self.option.requestBeforeBack()
                        if(flag===false){
                            return;
                        }
                    }
                    ajaxGetImeiList(_self,curVal,function(data){
                        var ulHtml = '';

                        if(data.data.successResultList.length != 0){
                            for(var i=0;i<data.data.successResultList.length;i++){
                                var  successResultItem=data.data.successResultList[i];
                                successResultItem.ifManageIMei=successResultItem.ifManageImei
                                successResultItem.ifEnableAuxliaryImei=successResultItem.ifEnableAuxiliaryImei
                                successResultItem.auxliaryImeiLength=successResultItem.auxiliaryImeiLength
                                ulHtml += '<li class="imeiUlList" data-info = "'+JSON.stringify(successResultItem).replace(/"/g,"'")+'">'+successResultItem.imei+'</li>';
                            }
                        }
                        else{
                            var desc=data.data.failedResultList[0];
                            ulHtml += '<li>'+desc+'</li>';
                        }
                        _self.dom.find('.imeiUl').html(ulHtml);
                        _self.dom.find('.none-cx').show();
                        //如果只有一条记录直接录入
                        if(data.data.successResultList.length==1&&keyCodyflag==true){
                            imeiUlLiClick(JSON.stringify(data.data.successResultList[0]));
                            $outObj.blur()[0].select(); //设置选中，方便下次扫码清空
                        }
                    })
                }
            });
            _self.dom.find('.imeiUl').delegate("li.imeiUlList", "click", function () {
                var _this=$(this);
                imeiUlLiClick(JSON.stringify(_this.data('info')))
            });
            //串号导入
            _self.dom.find('.outImeiImport').on('click',function () {
                if(_self.option.requestBeforeBack){
                    var flag =  _self.option.requestBeforeBack()
                    if(flag===false){
                        return;
                    }
                }
                if(_self.imeiDom===null){
                    _self.imeiDom = $(_self.getOutImeiTemplate())
                    _self.imeiDom.modal('show')
                    var colNames = ['imeiId','商品id','仓库id','仓库名称','部门名称','商品类别', '串号', '辅助串号', '商品编码', '商品名称'
                        ,'商品品牌','型号','颜色', '串号备注','库存量','是否串号管理','税率','是否启用辅串','是否赠品','辅串长度','单价','成本价','主串长度','折扣率','计价方式'];
                    var colModel = [
                        {name: 'imeiId', index: 'imeiId', width: 1, hidden: true},
                        {name: 'goodsId', index: 'goodsId', width: 1, align: 'center', sorttype: "string", hidden: true},
                        {name: 'storageId', index: 'storageId', width: 1, hidden: true},
                        {name: 'storageName', index: 'storageName', width: 1, hidden: true},
                        {name: 'sectionName', index: 'sectionName', width: 1, hidden: true},
                        {name: 'categoryName', index: 'categoryName', width: 1, hidden: true},
                        {name: 'imei', index: 'imei', width: 140, align: 'left', sorttype: "string", sortable: false},
                        {name: 'auxiliaryImei', index: 'auxiliaryImei', width: 140, align: 'left', sorttype: 'string', sortable: false},
                        {name: 'code',index: 'code',width: 100, align: 'left', sorttype: 'string', sortable: false},
                        {name: 'name',index: 'name',width: 200, align: 'left', sorttype: 'string', sortable: false},
                        {name: 'brandName', index: 'brandName', width: 1, hidden: true},
                        {name: 'models', index: 'models', width: 1, hidden: true},
                        {name: 'color', index: 'color', width: 1, hidden: true},
                        {name: 'imeiRemark', index: 'imeiRemark', width: 200, align: 'left', sortable: false},
                        {name: 'stockCount', index: 'stockCount', width: 1, hidden: true},
                        {name: 'ifManageImei', index: 'ifManageImei', width: 1, hidden: true},
                        {name: 'taxRate', index: 'taxRate', width: 1, hidden: true},
                        {name : 'ifEnableAuxiliaryImei',index : 'ifEnableAuxiliaryImei',sortable: false,hidden:true},
                        {name : 'giftFlag',index : 'giftFlag',sortable: false,hidden:true},
                        {name : 'auxiliaryImeiLength',hidden:true},
                        {name : 'costPrice',hidden:true},
                        {name : 'price',hidden:true},
                        {name : 'imeiLength',hidden:true},
                        {name : 'discountRate',hidden:true},
                        {name : 'valuationMethods',hidden:true},
                    ];
                    //配置
                    var paras = {
                        gridId:_self.option.imeiDrTableID,
                        colNames: colNames,
                        colModel: colModel,
                    };
                    //回调函数
                    var callBackList = {
                        onCellSelect: function (rowid, iCol, cellcontent, e) {

                        },
                        afterEditCell: function (rowid, name, val, iRow, iCol) {//开始编辑

                        },
                        afterSaveCell: function (rowid, name, val, iRow, iCol) {//保存编辑

                        },
                        summary: function (rowid, name, val, iRow, iCol) {//统计处理

                        },
                        getGridDataList: function () {

                        },
                    };
                    var dataGrid = new MyEiditGrid(paras, callBackList);
                    dataGrid.$grid.setGridParam({
                        rowNum:10000,
                    }).trigger('reloadGrid')
                    _self.dataGrid = dataGrid;
                    _self.imeiDom.find('.imeiDr_clear').click(function(){
                        _self.imeiDom.find('.imeiDr_vone').val('');
                        _self.imeiDom.find('.imeiDr_vtwo').val('');
                        _self.imeiDom.find(".imeiDr_vone").trigger('keydown');
                    })
                    _self.imeiDom.find(".imeiDr_vone").val('').setTextareaCount({
                        width: "30px",
                        bgColor: "#f2f2f2",
                        color: "red",
                        display: "block"
                    }).parent().css('width','100%');
                    //导入
                    _self.imeiDom.find('.imeiDr_import').click(function(){
                        _self.imeiDom.find(".imeiDr_vtwo").val('');
                        //开始添加串号
                        var vone = _self.imeiDom.find('.imeiDr_vone').val();
                        var v1 = vone.split("\n");
                        var str = '',vtr = '';
                        var a1 =  _self.dataGrid.$grid.getCol('imei');
                        var a2 = _self.dataGrid.$grid.getCol('auxiliaryImei');
                        var imeiList = _self.option.imeiList||[];
                        var imeiAuList=[]
                        for(var i=0;i<imeiList.length;i++){
                            var imeiItem =eval(imeiList[i])||[]
                            for(var j=0;j<imeiItem.length;j++){
                                var imeicc=imeiItem[j]
                                if($.trim(imeicc.imei)!=''){
                                    imeiAuList.push( $.trim(imeicc.imei)+($.trim(imeicc.auxiliaryImei)==""?'':','+$.trim(imeicc.auxiliaryImei)))
                                }
                            }


                        }

                        $.each(v1,function(i,item){
                            var toval = item.trim().toUpperCase();
                            if(toval == ""){
                                return
                            }
                            if(a1.indexOf(toval) == -1 && a2.indexOf(toval) == -1 && imeiAuList.indexOf(toval) == -1 ){
                                str+=toval+';'
                                a1.push(toval);
                            }else{
                                vtr+=toval+';'
                            }
                        })
                        str = str.substring(0,str.length-1);
                        if(str == ''){
                            if(vtr !== "" ){
                                _self.imeiDom.find('.imeiDr_vtwo').val(vtr+'已导入\n')
                            }
                            return
                        }else{
                            if(vtr !== "" ){
                                _self.imeiDom.find('.imeiDr_vtwo').val(vtr+'已导入\n')
                            }
                        }
                        ajaxGetImeiList(_self,str,function (data) {
                            if(data.result==1){
                                var failed = data.data.failedResultList;
                                var list = data.data.successResultList;
                                var  exsitJqImeiData = _self.dataGrid.$grid.getGridParam().data;
                                var ImeiData=exsitJqImeiData.concat(list)
                                _self.dataGrid.$grid.setGridParam({data:ImeiData}).trigger('reloadGrid');
                                var num = _self.dataGrid.$grid.getDataIDs();
                                _self.imeiDom.find('.imeiDr_num').text(num.length);
                                var txt = _self.imeiDom.find(".imeiDr_vtwo").val();
                                $.each(failed,function(i,item){
                                    txt += item+'\n';
                                })
                                $(".imeiDr_vtwo").val(txt);
                            }
                        })
                    })
                    //导入 确定
                    _self.imeiDom.find('.imeiDr_sure').click(function(){
                        _self.imeiDom.modal('hide');
                        if (_self.option.importEnterBack) {
                            _self.option.importEnterBack(_self.dataGrid.$grid.getGridParam().data)
                        }
                    })
                }else{
                    _self.imeiDom.modal('show');
                    _self.imeiDom.find('.imeiDr_vone,.imeiDr_vtwo').val('');
                    _self.imeiDom.find('.imeiDr_num').text(0);
                    _self.dataGrid.$grid.jqGrid('clearGridData').trigger('reloadGrid').resize();
                }
            })
            _self.isDisable()

            function imeiUlLiClick(info) {
                var oneData=JSON.parse(info.replace(/'/g,'"'))
                _self.dom.find(".outSearchImei").focus();
                _self.dom.find('.none-cx').hide();
                if (_self.option.inputEnterBack) {
                    _self.option.inputEnterBack(oneData)
                }

            }
        },
        isDisable:function (flag) {
            var _self = this;
            if(flag==true){
                _self.dom.find('.outSearchImei,.outImeiImport').attr("disabled", true);
            }else{
                _self.dom.find('.outSearchImei,.outImeiImport').attr("disabled", false);
            }
        },
        //清空dom
        clearDom: function () {
            if (this.dom !== null) {
                this.dom.remove();
                this.dom = null;
            }
            if (this.imeiDom !== null) {
                this.imeiDom.remove();
                this.imeiDom = null;
            }
        },
        showModal: function () {
            this.dom.modal('show');
        },
        hideModal: function () {
            this.dom.modal('hide');
        },
        //设置当前的参数
        setOption: function (data) {
            this.option = $.extend(false, this.option, data);
        },
        getMethod:function(name){
            return this.getAccessor(comImeiOutModal.prototype, name);
        },
        //访问器
        getAccessor : function(obj, expr) {
            var ret,p,prm = [], i;
            if( typeof expr === 'function') { return expr(obj); }
            ret = obj[expr];
            if(ret===undefined) {
                try {
                    if ( typeof expr === 'string' ) {
                        prm = expr.split('.');
                    }
                    i = prm.length;
                    if( i ) {
                        ret = obj;
                        while (ret && i--) {
                            p = prm.shift();
                            ret = ret[p];
                        }
                    }
                } catch (e) {}
            }
            return ret;
        },
        getOutImeiTemplate: function () {
            var _self = this;
            // 默认模板
            var _template =`
            <div  class="modal imeiOutModal" id="${this.option.imeiOutModalID}" role="dialog" aria-hidden="true" data-backdrop="static"> 
                 <div class="modal-dialog modal-lg" role="document"> 
                    <div class="modal-content"> 
                         <div class="modal-header"> 
                               <button type="button" data-dismiss="modal" class="close"><span aria-hidden="true">&times;</span></button> 
                                <h4 class="modal-title imeiDr_title">${_self.option.inputLab}导入</h4> 
                        </div> 
                        <div class="modal-body"> 
                            <div class="col-md-12"> 
                                <div class="row"> 
                                    <div class="col-md-8" style="padding-left:0">
                                     EXCEL粘贴
                                    </div> 
                                    <div class="col-md-4" style="padding-left:0;padding-right: 0;">
                                     错误提示
                                    </div> 
                                </div> 
                                <div class="row"> 
                                    <div class="col-md-8" style="padding-left:0"> 
                                        <textarea class="form-control imeiDr_vone" style="height: 80px;resize:none" placeholder="一行一串号，若双串号则主辅串任一即可${_self.option.inputLab}入库。例：\nA88888888888888 \n869999999999999">
                                        </textarea> 
                                        <div style="height: 40px;line-height: 40px;"> 
                                            <button type="button" class="erp-btn-bg imeiDr_import" >导入</button> 
                                            <button type="button" class="erp-btn-lab imeiDr_clear" >清空</button> 
                                        </div> 
                                    </div> 
                                    <div class="col-md-4" style="padding-left:0;padding-right: 0;"> 
                                        <textarea class="form-control imeiDr_vtwo" style="height: 120px;resize:none"></textarea> 
                                    </div> 
                            </div> 
                                <div class="row" style="height: 40px;line-height: 55px;">
                                    已录入串号
                                     <font class="imeiDr_num">0</font>个
                                 </div> 
                                <div class="row" style="margin-top:8px;"> 
                                    <table id="${this.option.imeiDrTableID}" class="zxsaastable"></table> 
                                </div> 
                            </div> 
                         </div> 
                        <div class="modal-footer"> 
                            <button type="button" class="erp-btn-bg imeiDr_sure">确认</button> 
                            <button type="button" class="erp-btn-lab" data-dismiss="modal">取消</button> 
                        </div> 
                    </div> 
                </div> 
            </div>
            `;
            return _template;
        },
        getTemplate: function () {
            var _self = this;
            var _template =`
            <div class="form-horizontal clearfix"> 
                <div class="form-group col-sm-4">
                    <label class="col-sm-4 control-label" style="font-weight: normal;">${_self.option.inputLab}录入:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control outSearchImei" placeholder="串号录入，精确全匹配" value="">
                        <div class="none-cx" style="display: none;width: 90%;">
				     	 	<ul class="imeiUl" style="max-height: 300px;"></ul>
				     	 </div>
                    </div>
                </div>
                <div class="form-group col-sm-3" style="margin-bottom: 0px;">
                    <button type="button" class="erp-btn-lab outImeiImport">${_self.option.inputLab}导入</button>
                </div>
			</div>
            `;
            return _template;

        }
    };
    
    function ajaxGetImeiList(_self,curVal,success) {
        //查询串号库存
        $.ajaxPackage({
            url:_self.option.getImeiUrl,
            type : "post",
            dataType : 'json',
            data:{
                menuCode:_self.option.menuCode,
                sectionId:_self.option.sectionId,
                imeiInputData:curVal,
            },
            success:function(data){
                if(success){
                    success(data)
                }
            }
        })
    }
    
    
    //在插件中使用  组件对象
    $.fn.comImeiOutModal = function (options) {
        if (typeof options === 'string') {
            var fn =comImeiOutModal.prototype.getMethod(options);
            if (!fn) {
                throw ("comModalsbox - No such method: " + options);
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function(){
                return fn.apply(this.isObj,args);
            })
        }
        return this.each(function(){
            if(this.isObj){
                return;
            }
            return  this.isObj=new comImeiOutModal(this, options);
        })
    }
}(jQuery);