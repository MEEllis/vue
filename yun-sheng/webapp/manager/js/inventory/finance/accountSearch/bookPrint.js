$(function () {
	var printObj = new comProofPrintModal();
	printObj.setOption({
		type: 2,  //打印类型
		url: '/finance/accountBook/confirmPrint'
	});
	printObj.reLoadDom();
	printObj.showModal();
});