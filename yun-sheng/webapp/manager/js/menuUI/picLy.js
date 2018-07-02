
/*获取数据*/
var getData = function(url) {
	$.ajax({
		type: "get",
		url: url,
		dataType: 'JSON',
		success: function(data) {
			console.log(data);
			var jLeft = data.result[0].information[0].left,
				jRight = data.result[0].information[0].right,
				bLeft = data.result[0].statement[0].left,
				bRight = data.result[0].statement[0].right;
			appendNode('jLeft', jLeft);
			appendNode('jRight', jRight);
			appendNode('bLeft', bLeft);
			appendNode('bRight', bRight);
			borderChange();
		},
		error: function(d) {
			console.log(d);
		}
	});
};
/*添加元素*/
var appendNode = function(cl, data) {
	var strNode = '';
	$.each(data, function() {
		strNode += '<a href="' + arguments[1].src + '" title="' + arguments[1].name + '">' + arguments[1].name + '</a>';
	});
	$('.' + cl).append(strNode);

	var jList = [$('.jLeft').height(), $('.jRight').height()]
	var maxJ = Math.max.apply(Math, jList);
	$('.jichu').height(maxJ + 40);

	var bList = [$('.bLeft').height(), $('.bRight').height()]
	var maxB = Math.max.apply(Math, bList);
	$('.baobiao').height(maxB + 40);

};
/*添加样式*/
var borderChange = function() {
	if($('.jLeft').height() > $('.jRight').height()) {
		$('.jLeft').addClass('borderR');
	} else {
		$('.jRight').addClass('borderL');
	}
	if($('.bLeft').height() > $('.bRight').height()) {
		$('.bLeft').addClass('borderR');
	} else {
		$('.bRight').addClass('borderL');
	}
}

/*监听浏览器宽度 */
$(window).resize(function () { 
//	(($('.picLeft').width()-640-135)/3)+155
	$('.lineW').width((($('.picLeft').width()-640-135)/3)+155);
});


