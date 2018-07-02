/*
 所有的商品
*/
!function ($) {
    // 构造函数
    var comModalsGoods = function (el, option) {
        var girdParam={
            queryKey:'',
            typeId:'',
        }
        var girdUrl='/manager/component/goods/getGoodsVoPageList'
        //inStockMethod  入库方式(1:采购;2:受托)
        if(option.inStockMethod===1){
            girdParam.inStockMethod=1
        }
        //标记，默认全部  （store： 在库），
        if(option.sign=='store'){
            girdUrl='/manager/component/goods/getGoodsStockVoPageList'
        }else if(option.sign=='sold'){
            girdUrl='/manager/component/goods/getSoldGoodsVoPageList'
        }else if(option.sign=='out'){
            girdUrl='/manager/component/goods/getOutStorageStockGoodsVoPageList'
        }else if(option.sign=='need'){
			girdUrl='/manager/component/goods/getGoodsPageListForNeedGoods'
		}
        
        //商品表格列
        function getColNames() {
            if(option.sign=='need'){
                return ['商品名称','门店库存','调入在途','周转天数(DOS)','建议补货量','发货部门库存','客户预订','商品编码','品牌','商品类别','型号','颜色'
				,'串号id','商品总额' ,'税率','是否辅助串号管理','串号列表','辅助串号长度','配置','dataId']
            }else{
				return ['商品名称', '商品编码','库存数', '类别', '品牌', '型号','颜色','配置','是否串号管理', '计价方式','备注','串号id','商品总额'
					,'税率','是否辅助串号管理','串号列表','辅助串号长度','配置','dataId']
            }
		}

		//商品表格列模型
        function getColModels() {
			if(option.sign=='need'){
				return [
					{name: 'name', index: 'name',align: 'left',sortable: true,width:200,frozen:true},
					{name: 'needSectionCount',formatter: 'integer'},
					{name: 'onwayCount', index: 'onwayCount',align: 'left',sortable: true,width:200},
					{name: 'days', index: 'days',align: 'left',sortable: true,width:200},
					{name: 'suggestCount', index: 'suggestCount',align: 'left',sortable: true,width:200},
					{name: 'sendSectionCount', index: 'sendSectionCount',align: 'left',sortable: true,width:200},
					{name: 'bookingCount', index: 'bookingCount',align: 'left',sortable: true,width:200},
					{name : 'code',index : 'code',align:'left',width:100},
					{name: 'brandName', index: 'brandName',align: 'left',sortable: true,width:100},
					{name: 'categoryName', index: 'categoryName',align: 'left',sortable: true,width:100},
					{name: 'models', index: 'models',align: 'left',sortable: true,width:100},
					{name: 'color', index: 'color',align: 'left',sortable: true,width:100},
					{name: 'imeiId',hidden: true},
					{name: 'totalAmount',hidden: true},
					{name: 'taxRate',hidden: true},
					{name: 'ifEnableAuxiliaryImei',hidden: true},
					{name: 'imeiLength',hidden: true},
					{name: 'auxiliaryImeiLength',hidden: true},
					{name: 'configure',hidden: true},
					{name: 'dataId', hidden: true}]
			}else{
				return [
					{name: 'name', index: 'name',align: 'left',sortable: true,width:200,frozen:true},
					{name : 'code',index : 'code',align:'left',width:100},
					{name: 'stockCount',formatter: 'integer', hidden: true},
					{name: 'categoryName', index: 'categoryName',align: 'left',sortable: true,width:100},
					{name: 'brandName', index: 'brandName',align: 'left',sortable: true,width:100},
					{name: 'models', index: 'models',align: 'left',sortable: true,width:100},
					{name: 'color', index: 'color',align: 'left',sortable: true,width:100},
					{name: 'configure', index: 'configure',align: 'left',sortable: true,width:100},
					{name: 'ifManageImei', index: 'ifManageImei',align: 'center',sortable: true,width:100,formatter:'select',editoptions:{value:"0:×;1:√"}},
					{name: 'valuationMethods', index: 'valuationMethods',align: 'left',sortable: true,width:150,formatter:'select',editoptions:{value:"1:个别计价法;2:移动加权平均价"}},
					{name: 'remark', index: 'remark',align: 'center',sortable: true,width:200},
					{name: 'imeiId',hidden:true},
					{name: 'totalAmount',hidden:true},
					{name: 'taxRate',hidden:true},
					{name: 'ifEnableAuxiliaryImei',hidden:true},
					{name: 'imeiLength',hidden:true},
					{name: 'auxiliaryImeiLength',hidden:true},
					{name: 'configure',hidden:true},
					{name: 'dataId', hidden: true},
				]
			}
		}
        
        // 默认参数
        var defaults = {
            girdUrl:girdUrl,
            girdParam:girdParam,
            treeUrl:'/manager/component/goods/getGoodsClassTreeNodeVoList',
            treeParams:{
            },
            name:'商品',
            placeholder:'商品编码,名称,助记码,型号,条码',
            multiselect:true, //是否多选  （  默认：多选）
            isHasTree:true,//是否有树  （  默认：没有树）
			enter:false, //回车搜索
            colNames: getColNames(),
            colModel: getColModels()
        };
        var options = $.extend(true, defaults, option);
        var retObj=new comModalsbox($(el),options);
        return  retObj;
    };

    //在插件中使用  组件对象
    $.fn.comModalsGoods = function(options) {
        return this.each(function(){
            if(this.isObj){
                return;
            }
            return this.isObj=new comModalsGoods(this, options);
        })
    }
}(jQuery);