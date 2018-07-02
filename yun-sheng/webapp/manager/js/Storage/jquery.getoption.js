$.fn.extend({
	//给option赋值
	'showOption':function(obj){
	var self=this;
		this.each(function(){
			$.ajax({
				url:obj.url,
				type:'get',
				dataType:'json',
				data:obj.post,
				success:function(data){
					var html=obj.callback(data);
					self.html(html);
				}
			})
		})
	},
	'getMainGridData':function(){
		var self=this;
		var idList=self.getDataIDs();
		var arrTemp=[];
		$.each(idList,function(index,item){
			var rowData=self.getRowData(item);
			arrTemp.push(rowData);
		})
		return arrTemp;
	}
})