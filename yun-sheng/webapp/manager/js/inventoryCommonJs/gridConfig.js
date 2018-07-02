var GRIDCONFIG = {
	//往来单位，供应商表格参数配置
	contactUnits:{
	    colNames:['dataId','编码','单位名称','类别','所属公司'],
	    colModel:[
	          {name:'dataId',index:'dataId',sortable:false,align:'center',hidden:true},
	          {name:'code',index:'code',sortable:false,align:'center',width:125},
	          {name:'name',index:'name',sortable:false,align:'center',width:125},
	          {name:'contactUnitClassName',index:'contactUnitClassName',sortable:false,align:'center',width:125},
	          {name:'companyName',index:'companyName',sortable:false,align:'center',width:125},
	    ],
	},
	//资金账户名称
	accounts:{
        colNames:['id','账户编码','账户名称','账户类型','公司名称','开户行','户名','账号'],
        colModel:[
              {name:'id',index:'id',sortable:false,align:'center',hidden:true},
              {name:'code',index:'code',sortable:false,align:'center',width:125},
              {name:'name',index:'name',sortable:false,align:'center',width:125},
              {name:'contactUnitClassName',index:'contactUnitClassName',sortable:false,align:'center',width:125},
              {name:'companyName',index:'companyName',sortable:false,align:'center',width:125},
              {name:'name',index:'name',sortable:false,align:'center',width:125},
              {name:'contactUnitClassName',index:'contactUnitClassName',sortable:false,align:'center',width:125},
              {name:'companyName',index:'companyName',sortable:false,align:'center',width:125},
        ],
    },
    //商品名称
    goodsName:{
        colNames:['商品名称','id','编码','条码','商品类别','品牌','型号','颜色','配置','计价方式','入库方式','备注'],
        colModel:[
			  {name:'name',index:'name',sortable:false,align:'center',width:200,frozen : true},
              {name:'id',index:'id',sortable:false,align:'center',hidden:true},
              {name:'code',index:'code',sortable:false,align:'center',width:100},
              {name:'barcode',index:'barcode',sortable:false,align:'center',width:100},
              {name:'goodsClass',index:'goodsClass',sortable:false,align:'center',width:100},
              {name:'goodsBrand',index:'goodsBrand',sortable:false,align:'center',width:100},
              {name:'goodsModel',index:'goodsModel',sortable:false,align:'center',width:100},
              {name:'goodsColor',index:'goodsColor',sortable:false,align:'center',width:100},
              {name:'configuration',index:'configuration',sortable:false,align:'center',width:100},
              {name:'valuationMethods',index:'configuration',sortable:false,align:'center',width:100},
              {name:'storageMode',index:'storageMode',sortable:false,align:'center',width:100},
              {name:'remark',index:'remark',sortable:false,align:'center',width:200},
        ],
    },
    //员工，营业员，制单人，经手人名称
    operator:{
    	colNames: ['id', '编码', '姓名', '所属部门', '职位', '联系方式', '员工属性名称', 'sectionId', 'dataId', '备注'],
    	colModel: [
                   {name: 'id', index: 'id', width: 1, align: 'center', sorttype: "string", hidden: true},
                   {name: 'code', index: 'code', width: 100, align: 'center', sorttype: "string", sortable: false},
                   {name: 'name', index: 'name', width: 150, align: 'center', sorttype: 'string', sortable: false},
                   {name: 'sectionName',index: 'sectionName',width: 150,align: 'center',sorttype: 'string',sortable: false},
                   {name: 'positionName',index: 'positionName',width: 150,align: 'center',sorttype: 'string',sortable: false},
                   {name: 'telephone',index: 'telephone',width: 150,align: 'center',sorttype: 'string',sortable: false},
                   {name: 'attrName', index: 'attrName', width: 100, align: 'center', sortable: false},
                   {name: 'sectionId', index: 'sectionId', width: 10, hidden: true},
                   {name: 'dataId', index: 'dataId', width: 10, hidden: true},
                   {name: 'remark', index: 'remark', width: 100, align: 'center', sortable: false},
               ],
    },
    //商品类别
    goodsBrands:{
        colNames:['id','编码', '名称'],
        colModel:[
            {name:'id',index:'id', width:1,sorttype:"string",hidden:true},
            {name:'code',index:'code', width:100,sorttype:"string",sortable: false},
            {name:'name',index:'name', width:150, sorttype:'string',sortable: false},
        ],
    },
	//会员
	vip:{
		colNames: ['vipId', '姓名', '电话号码', '会员卡号', '会员类型', '会员积分','dataId' , '会员储值', 'isAmount', 'isScore'],
		colModel: [
			{name: 'vipId', index: 'vipId', sortable: true, align: 'center', hidden: true},
			{name: 'vipName', index: 'vipName', sortable: false, align: 'center', width: 100},
			{name: 'vipPhone', index: 'vipPhone', sortable: false, align: 'center', width: 100},
			{name: 'cardNum', index: 'cardTypeName', sortable: false, align: 'center', width: 100},
			{name: 'cardTypeName', index: 'cardTypeName', sortable: false, align: 'center', width: 100},
			{name: 'score', index: 'cardTypeName', sortable: false, align: 'center', width: 100},
			{name: 'dataId', index: 'dataId', sortable: true, align: 'center', hidden: true},
			{name: 'amount', index: 'cardTypeName', sortable: false, align: 'center', width: 100},
			{name: 'isAmount',index: 'isAmount',sortable: false,align: 'center',width: 100,hidden: true},
			{name: 'isScore', index: 'isScore', sortable: false, align: 'center', width: 100, hidden: true},
		]
	},
    //门店或部门
    section:{
    	colNames: ['dataId', '编码', '名称', '部门属性', '所属上级', '所属地区', '启用日期', 'sectionId', '备注'],
    	colModel: [
                   {name: 'dataId', index: 'dataId', width: 1, align: 'center', sorttype: "string", hidden: true},
                   {name: 'code', index: 'code', width: 50, align: 'center', sorttype: "string", sortable: false},
                   {name: 'name', index: 'name', width: 150, align: 'center', sorttype: 'string', sortable: false},
                   {name: 'attrName',index: 'attrName',width: 150,align: 'center',sorttype: 'string',sortable: false},
                   {name: 'parentName',index: 'parentName',width: 150,align: 'center',sorttype: 'string',sortable: false},
                   {name: 'regionName',index: 'regionName',width: 150,align: 'center',sorttype: 'string',sortable: false},
                   {name: 'usedDateStr', index: 'usedDateStr', width: 100,},
                   {name: 'sectionId', index: 'sectionId', width: 10, hidden: true},
                   {name: 'remark', index: 'remark', width: 100,},
               ],
    },
	//仓库
	storage:{
		colNames: ['dataId', '仓库编码', '仓库名称', '部门编码','部门名称' ],
		colModel: [
			{name: 'dataId', index: 'dataId', width: 1, align: 'center', sorttype: "string", hidden: true},
			{name: 'code', index: 'code', width: 50, align: 'center', sorttype: "string", sortable: false},
			{name: 'name', index: 'name', width: 150, align: 'center', sorttype: 'string', sortable: false},
			{name: 'sectionCode',index: 'sectionCode',width: 150,align: 'center',sorttype: 'string',sortable: false},
			{name: 'sectionName',index: 'sectionName',width: 150,align: 'center',sorttype: 'string',sortable: false},
		],
	}

}

function getGridConfig (str){
	if(str&&str != null){
		if(str == 'salesMan' || str =='createMan' || str == 'handleMan' || str.indexOf('operator') >= 0){
			str='operator'
		}
		if(str == 'customerMessage' || str.indexOf('contactUnits') >= 0){
			str = 'contactUnits'
		}
		if(str.indexOf('section') >= 0){
			str = 'section'
		}
		if(str.indexOf('vip') >= 0){
			str = 'vip'
		}
		return GRIDCONFIG[str]	
	}
}

