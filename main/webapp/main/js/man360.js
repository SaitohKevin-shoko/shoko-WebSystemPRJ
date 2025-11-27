function chgDefaultArea() {
    $('#layoutKbn').show();
    var layoutRadio = document.getElementById('layout_0').checked;
    if (layoutRadio) {
        $('#checkarea').addClass("display_n");
        $('#areaList').addClass("display_n");
        $('#defaultAreaList').removeClass("display_n");
    } else {
        $('#checkarea').removeClass("display_n");
        $('#areaList').removeClass("display_n");
        $('#defaultAreaList').addClass("display_n");
        areaShowOrHide('topId', 'Top');
        areaShowOrHide('bottomId', 'Bottom');
        spaceShowOrHide();
        setMiddleArea();
    }
}

function initChgArea() {
    $('#layoutKbn').removeClass("display_n");
    var layoutRadio = document.getElementById('layout_0').checked;
    if (layoutRadio) {
        if (document.forms[0].man360init.value == 0) {
            document.getElementById('topId').checked = true;
            document.getElementById('bottomId').checked = true;
            document.getElementById('leftId').checked = true;
            document.getElementById('centerId').checked = true;
            document.getElementById('rightId').checked = true;
        }
        $('#checkarea').addClass("display_n");
        $('#areaList').addClass("display_n");
        $('#defaultAreaList').removeClass("display_n");
    } else {
        $('#checkarea').removeClass("display_n");
        $('#areaList').removeClass("display_n");
        $('#defaultAreaList').addClass("display_n");
        areaShowOrHide('topId', 'Top');
        areaShowOrHide('bottomId', 'Bottom');
        spaceShowOrHide();
        setMiddleArea();
    }
    document.forms[0].man360init.value=1
}

function chgArea(checkId, areaType) {
    areaShowOrHide(checkId, areaType);
    spaceShowOrHide();
    setMiddleArea();
}

function areaShowOrHide(checkId, areaType) {
    var checkValue = document.getElementById(checkId).checked;
    if (checkValue) {
        $('#mainScreenList' + areaType).removeClass("display_n");
    } else {
        $('#mainScreenList' + areaType).addClass("display_n");
    }
}

function setMiddleArea() {
    var leftFlg = document.getElementById('leftId').checked;
    var centerFlg = document.getElementById('centerId').checked;
    var rightFlg = document.getElementById('rightId').checked;
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
    var topFlg = document.getElementById('topId').checked;
    var bottomFlg = document.getElementById('bottomId').checked;
    if (topFlg == true) {
        $('#top_space').removeClass("display_n");
    } else {
        $('#top_space').addClass("display_n");
    }
    if (bottomFlg == true) {
        $("#bottom_space").removeClass("display_n");
    } else {
        $("#bottom_space").addClass("display_n");
    }
}