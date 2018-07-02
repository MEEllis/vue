/*********************************上下单***************************************/
/***button 上一单***/
function upForm(){
	if((pageNumber - 1) == 0){
		$.zxsaas_plus.showalert("error","没有上一单了!");
		return;
	}
	pageNumber = pageNumber - 1;
	filterSelect();
}

/***button 首单***/
function lastForm(){
	pageNumber = 1;
	filterSelect();
}

/***button 下一单***/
function downForm(){
	if((pageNumber + 1) > pageCount){
		$.zxsaas_plus.showalert("error","没有下一单!");
		return;
	}
	pageNumber = pageNumber + 1;
	filterSelect();
}

/***button 末单操作***/
function firstForm(){
	pageNumber = pageCount;
	filterSelect();
}