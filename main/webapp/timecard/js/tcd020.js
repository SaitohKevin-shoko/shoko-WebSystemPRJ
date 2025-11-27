function clearValue(hour, min){
    document.getElementsByName(hour).item(0).value = '-1';
    document.getElementsByName(min).item(0).value = '-1';
}

function init() {
    holComboChange();
}

function holComboChange(){
    var holKbn = document.forms[0].tcd020HolKbn.value;
    //休日内容を登録できる休日のSIDをカンマ区切りで持つ
    var str = document.forms[0].tcd020HolidayContentKbn.value;
    var holArray = str.split(',');
    var holValueDisp = 0;
    var holDaysDisp = 0;
    if (holKbn != 0){
    	holDaysDisp = 1;
    	for (i = 0; i < holArray.length; i++) {
        	//休日内容表示
           if (holKbn == holArray[i]) {
        	   holValueDisp = 1;
               break;
           }
        }
    }
    $('#js_holValue').removeClass('display_none');
    if (holValueDisp == 0) {
    	$('#js_holValue').addClass('display_none');
    }
    setStyle('tcd020HolDays', holDaysDisp);
}

function setStyle(fname, flg){

    chkAry = document.getElementsByName(fname);

    if (flg == 1) {
        for(i = 0; i < chkAry.length; i++) {
            chkAry[i].disabled=false;
        }
    } else if (flg == 0) {
        for(i = 0; i < chkAry.length; i++) {
            chkAry[i].disabled=true;
            if (chkAry[i].type == 'text' || chkAry[i].type == 'textarea') {
                chkAry[i].value="";
            }
        }
    }
}

