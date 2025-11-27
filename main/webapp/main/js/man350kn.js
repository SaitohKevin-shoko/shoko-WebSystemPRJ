function initChgArea() {
    var kbnRadio = document.forms[0].man350kbn.value;
    var layoutRadio = document.forms[0].man350layout.value;
    if (kbnRadio == 1) {
    	$('.js_eventTr').addClass("border_none");
        $('#areaList').hide();
        $('#defaultAreaList').hide();
        $('#layoutKbn1').hide();
        $('#layoutKbn2').hide();
    } else {
    	$('.js_eventTr').removeClass("border_none");
        $('#layoutKbn1').show();
        $('#layoutKbn2').show();
        if (layoutRadio == 0) {
            $('#areaList').hide();
            $('#defaultAreaList').show();
        } else {
            $('#areaList').show();
            $('#defaultAreaList').hide();
            areaShowOrHide('Top', document.forms[0].man350area3.value);
            areaShowOrHide('Bottom', document.forms[0].man350area4.value);
            spaceShowOrHide();
            setMiddleArea();
        }
    }
}

function areaShowOrHide(areaType, value) {
    if (value == 1) {
        $('#mainScreenList' + areaType).removeClass("display_n");
    } else {
        $('#mainScreenList' + areaType).addClass("display_n");
    }
}

function setMiddleArea() {
    var leftFlg = (document.forms[0].man350area1.value == "1");
    var rightFlg = (document.forms[0].man350area2.value == "1");
    var centerFlg = (document.forms[0].man350area5.value == "1");
    $("#middleAreaAll").removeClass("display_n");
    $("#middleAreaLR").removeClass("display_n");
    $("#middleAreaLC").removeClass("display_n");
    $("#middleAreaCR").removeClass("display_n");
    $("#middleArea").removeClass("display_n");
    $("#bottom_space").removeClass("display_n");
    if (leftFlg && centerFlg && rightFlg) {
        $("#middleAreaLR").addClass("display_n");
        $("#middleAreaLC").addClass("display_n");
        $("#middleAreaCR").addClass("display_n");
        $("#middleArea").addClass("display_n");
    } else if (leftFlg && rightFlg) {
        $("#middleAreaAll").addClass("display_n");
        $("#middleAreaLC").addClass("display_n");
        $("#middleAreaCR").addClass("display_n");
        $("#middleArea").addClass("display_n");
    } else if (leftFlg && centerFlg) {
        $("#middleAreaAll").addClass("display_n");
        $("#middleAreaLR").addClass("display_n");
        $("#middleAreaCR").addClass("display_n");
        $("#middleArea").addClass("display_n");
    } else if (centerFlg && rightFlg) {
        $("#middleAreaAll").addClass("display_n");
        $("#middleAreaLR").addClass("display_n");
        $("#middleAreaLC").addClass("display_n");
        $("#middleArea").addClass("display_n");
    } else if (leftFlg || centerFlg || rightFlg) {
        $("#middleAreaAll").addClass("display_n");
        $("#middleAreaLR").addClass("display_n");
        $("#middleAreaLC").addClass("display_n");
        $("#middleAreaCR").addClass("display_n");
    } else {
        $("#middleAreaAll").addClass("display_n");
        $("#middleAreaLR").addClass("display_n");
        $("#middleAreaLC").addClass("display_n");
        $("#middleAreaCR").addClass("display_n");
        $("#middleArea").addClass("display_n");
        $("#bottom_space").addClass("display_n");
    }
}

function spaceShowOrHide() {
    var bottomFlg = (document.forms[0].man350area4.value == "1");
    var topFlg = (document.forms[0].man350area3.value == "1");
    if (topFlg == true) {
        $('#top_space').removeClass("display_n");
    } else {
        $('#top_space').addClass("display_n");
    }
    if (bottomFlg == true) {
        $('#bottom_space').removeClass("display_n");
    } else {
        $('#bottom_space').addClass("display_n");
    }
}