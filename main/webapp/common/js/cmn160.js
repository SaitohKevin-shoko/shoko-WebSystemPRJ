function radioChkChange(value) {
    document.forms[0].cmn160DspLogoKbn.value=value;
    document.forms[0].submit();
    return false;
}

function cmn110Updated(cmn110, tempName, tempSaveName, formId) {
	
    if (formId == 1) {
		document.forms[0].cmn160LogoName.value=tempName;
		document.forms[0].cmn160LogoSaveName.value=tempSaveName;
		document.forms[0].cmn160TempSetFlg.value='1';
		document.forms[0].submit();
    } else if (formId == 2) {
    	document.forms[0].cmn160MenuLogoName.value=tempName;
    	document.forms[0].cmn160MenuLogoSaveName.value=tempSaveName;
    	document.forms[0].cmn160MenuTempSetFlg.value='1';
    	document.forms[0].submit();
    } 
    return true;
}