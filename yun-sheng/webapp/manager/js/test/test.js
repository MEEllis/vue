function gridFactory(config,callback){
	//表格的主Id
	this.gridId=config.gridId;
	this.$gridId=$('#'+this.gridId);

	this.config=config;
	this.callback=callback;

	//添加操作
	this.config.colNames.unshift('操作');
	this.config.colModel.unshift({name:'op',index:'op',hidden:this.config.hiddenop==undefined?false:true,width:'60px',align:'center',formatter:this.opformatter,sortable:false});
	var factory=this;
	//表格初始化
	this.$gridId.jqGrid({
		datatype:this.config.datatype,
		url:this.config.url,
		colNames:this.config.colNames,
		colModel:this.config.colModel,
		styleUI:'Bootstrap',
		viewrecords:this.config.viewrecords,
		autowidth:true,
		shrinkToFit: false,
		multiselect:this.config.multiselect,
		jsonReader:this.config.jsonReader,
		multiboxonly:true,
		rownumbers:true,
		height:this.config.height,
		cellEdit:true,
		cellsubmit:'clientArray',
		 onCellSelect:function(rowid,iCol,cellcontent,e)
        {
		     
        },
        beforeEditCell:function(rowid,cellname,v,iRow,iCol)
        {
        	lastrow = iRow;
	        lastcell = iCol;
        },
        afterEditCell : function(rowid,name,val,iRow,iCol) 
        {
		    },
	    gridComplete: function() {
			
		},
	    afterSaveCell : function(rowid,name,val,iRow,iCol) 
	    {
	     
	    },
	    onSortCol:function(){
	    	try{
	    		factory.callback.showChooseStatus();
	    	}catch(e){
	    		console.log("22222");
	    	}
	    },
	    onCellSelect:function(rowid,iCol,cellcontent,e){
	    	try{
	    		factory.callback.onCellSelect(rowid,iCol,cellcontent,e);
	    	}catch(e){
	    		
	    	}
	    }
	})
}
gridFactory.prototype.opformatter=function(cellvalue, options, rowObject){
	return '<a class="btn delGoodsData" data-rid='+options.rowId+'><i class="glyphicon glyphicon-trash"></i></a>';
}