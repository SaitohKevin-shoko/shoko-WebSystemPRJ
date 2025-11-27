function initChgArea() {

    areaShowOrHide('portalTopId', 'Top');
    areaShowOrHide('portalLeftId', 'Left');
    areaShowOrHide('portalCenterId', 'Center');
    areaShowOrHide('portalRightId', 'Right');
    areaShowOrHide('portalBottomId', 'Bottom');

    setAreaWidth();
    spaceShowOrHide();
}

function chgArea(checkId, areaType) {

    areaShowOrHide(checkId, areaType);
    setAreaWidth();
    spaceShowOrHide();
}

function areaShowOrHide(checkId, areaType) {
    var checkValue = document.getElementById(checkId).checked;
    if (checkValue) {
        $('#mainScreenList' + areaType).removeClass("display_n");
    } else {
        $('#mainScreenList' + areaType).addClass("display_n");
    }
}

function setAreaWidth() {
    var leftFlg = document.getElementById('portalLeftId').checked;
    var centerFlg = document.getElementById('portalCenterId').checked;
    var rightFlg = document.getElementById('portalRightId').checked;
    $('#mainScreenListLeft').removeClass("w30");
    $('#mainScreenListLeft').removeClass("w33");
    $('#mainScreenListLeft').removeClass("w50");
    $('#mainScreenListLeft').removeClass("w70");
    $('#mainScreenListLeft').removeClass("w100");
    $('#mainScreenListCenter').removeClass("w30");
    $('#mainScreenListCenter').removeClass("w34");
    $('#mainScreenListCenter').removeClass("w50");
    $('#mainScreenListCenter').removeClass("w70");
    $('#mainScreenListCenter').removeClass("w100");
    $('#mainScreenListRight').removeClass("w30");
    $('#mainScreenListRight').removeClass("w33");
    $('#mainScreenListRight').removeClass("w50");
    $('#mainScreenListRight').removeClass("w70");
    $('#mainScreenListRight').removeClass("w100");
    if (leftFlg) {
        if (centerFlg && rightFlg) {
           $('#mainScreenListLeft').addClass("w33");
           $('#mainScreenListCenter').addClass("w34");
           $('#mainScreenListRight').addClass("w33");
        } else {
           if (centerFlg && !rightFlg) {
               $('#mainScreenListLeft').addClass("w30");
               $('#mainScreenListCenter').addClass("w70");
           } else if (!centerFlg && rightFlg) {
               $('#mainScreenListLeft').addClass("w50");
               $('#mainScreenListRight').addClass("w50");
           } else {
               $('#mainScreenListLeft').addClass("w100");
           }
        }
     } else {
         if (centerFlg && rightFlg) {
             $('#mainScreenListCenter').addClass("w70");
             $('#mainScreenListRight').addClass("w30");
         } else if (centerFlg && !rightFlg) {
             $('#mainScreenListCenter').addClass("w100");
         } else if (!centerFlg && rightFlg) {
             $('#mainScreenListRight').addClass("w100");
         }
     }
}

function spaceShowOrHide() {
    var leftFlg = document.getElementById('portalLeftId').checked;
    var centerFlg = document.getElementById('portalCenterId').checked;
    var rightFlg = document.getElementById('portalRightId').checked;
    var topView = document.getElementById('portalTopId').checked;
    var bottomView = document.getElementById('portalBottomId').checked;

    var leftSpaceDspFlg = false;
    if (leftFlg) {
        if (centerFlg || rightFlg) {
            leftSpaceDspFlg = true;
        }
    }
    var rightSpaceDspFlg = false;
    if (rightFlg) {
        if (centerFlg || leftFlg) {
            rightSpaceDspFlg = true;
        }
    }
    if (leftSpaceDspFlg == true) {
        $('#left_space').removeClass("display_n");
    } else {
        $('#left_space').addClass("display_n");
    }
    if (rightSpaceDspFlg == true) {
        if (leftSpaceDspFlg && !centerFlg) {
            $('#right_space').addClass("display_n");
        } else if (centerFlg) {
            $('#right_space').removeClass("display_n");
        }
    } else {
        $('#right_space').addClass("display_n");
    }
    var topSpaceDspFlg = false;
    if (topView) {
        if (leftFlg == 0 || centerFlg == 0 || rightFlg == 0 || bottomView == 0
                || (leftFlg != 0 && centerFlg != 0 && rightFlg != 0 && bottomView != 0)) {
            topSpaceDspFlg = true;
        }
    }
    var bottomDspFlg = false;
    if (bottomView) {
        if (leftFlg || centerFlg || rightFlg) {
            bottomDspFlg = true;
        } else if (!topView) {
            bottomDspFlg = false;
        } else if (!topSpaceDspFlg) {
            bottomDspFlg = true;
        }
    }
    if (topSpaceDspFlg == true) {
        $('#portal_space_Top').removeClass("display_n");
    } else {
        $('#portal_space_Top').addClass("display_n");
    }
    if (bottomDspFlg == true) {
        $('#portal_space_Bottom').removeClass("display_n");
    } else {
        $('#portal_space_Bottom').addClass("display_n");
    }
}