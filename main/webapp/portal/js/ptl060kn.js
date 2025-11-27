function initChgArea() {
    areaShowOrHide('Top', document.forms[0].ptl060area1.value);
    areaShowOrHide('Left', document.forms[0].ptl060area3.value);
    areaShowOrHide('Center', document.forms[0].ptl060area4.value);
    areaShowOrHide('Right', document.forms[0].ptl060area5.value);
    areaShowOrHide('Bottom', document.forms[0].ptl060area2.value);

    setAreaWidth();
    spaceShowOrHide();
}

function areaShowOrHide(areaType, value) {
    if (value == 1) {
        $('#mainScreenList' + areaType).show();
    } else {
        $('#mainScreenList' + areaType).hide();
    }
}

function setAreaWidth() {


    var leftFlg = (document.forms[0].ptl060area3.value == "1");
    var centerFlg = (document.forms[0].ptl060area4.value == "1");
    var rightFlg = (document.forms[0].ptl060area5.value == "1");
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
    var leftFlg = (document.forms[0].ptl060area3.value == "1");
    var centerFlg = (document.forms[0].ptl060area4.value == "1");
    var rightFlg = (document.forms[0].ptl060area5.value == "1");
    var topView = (document.forms[0].ptl060area1.value == "1");
    var bottomView = (document.forms[0].ptl060area2.value == "1");

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