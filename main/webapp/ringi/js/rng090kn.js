function fileLinkClick(fileId) {
	document.forms[0].CMD.value='fileDownload';
	document.forms[0].rng090knTmpFileId.value=fileId;
	document.forms[0].submit();
	return false;
}

function changeGroupCombo(){
	document.forms[0].CMD.value='init';
	document.forms[0].submit();
	return false;
}