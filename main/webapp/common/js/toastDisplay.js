/** メッセージをトースト表示する */
function displayToast(toastId) {

    var emptyWindow = $("#"+toastId).prev();
    var toast = $("#"+toastId).clone();
    emptyWindow.append(toast);
    toast.removeClass('display_n');
    toast.offset({
        top: - toast.find(".js_toastBody").outerHeight()
    });
    toast.animate({
        "top" : 30
    }, 250);
    removeToast(toast);
}

/** トースト表示されたメッセージを削除する */
function removeToast(toast) {
    setTimeout(function() {
        toast.animate({
            "top" : - toast.find(".js_toastBody").outerHeight()
        }, 250, function() {
            toast.remove();
        });
    }, 2000)
}

/** メッセージをトースト表示する */
function displayToast2(msg) {
    if ($("#toast")) {
        $("#toast").remove();
    }
    var detail = "<div id='toast' class='toastWindow'>"
               +   "<div class='js_toastBody information_middle bgC_body p10 bor3 border_radius-toast'>"
               +     "<img class='original-display mr10' src='../common/images/original/icon_info.png'>"
               +     "<img class='classic-display mr10' src='../common/images/classic/icon_info.png'>"
               +   "</div>"
               + "</div>";
    $("#js_memForm").append(detail);
    $(".js_toastBody").append("<span class='js_toastMessage'>" + msg + "</span>");
    $("#toast").offset({
        top: - $(".js_toastBody").outerHeight()
    });

    $("#toast").animate({
        "top" : 30
    }, 250);
    hideToast2();
}

/** トースト表示されたメッセージを非表示にする */
function hideToast2() {
    var toast = $("#toast");
    setTimeout(function() {
        toast.animate({
            "top" : - $(".js_toastBody").outerHeight()
        }, 250, function() {
            toast.remove();
        });
    }, 2000)
}

/** Push通知の代用 トースト表示 */
function displayToast3(dspTime) {
    //トースト表示先の要素内を削除(時間によってトーストが消える前に再度通知が来た時を想定)
    var emptyWindow = $("#toastNotice").prev();
    emptyWindow.html("");
    //トースト表示の実行
    var toast = $("#toastNotice").clone();
    toast.attr("id", "toastNoticeClone");
    emptyWindow.append(toast);
    toast.removeClass('display_n');
    toast.find(".js_toastBody").addClass('wp380');
    toast.removeClass('mrl_auto');
    toast.find(".js_toastBody").removeClass('border_radius-toast');

    toast.offset({
        top: window.innerHeight - (toast.find(".js_toastBody").innerHeight() + 30),
        left: window.innerWidth + toast.outerWidth()
    });

    toast.animate({
        "left" : window.innerWidth - toast.find(".js_toastBody").outerWidth() -50
    }, 250);
    removeToast3(toast, dspTime)
}

/** トースト表示されたメッセージを削除する */
function removeToast3(toast, dspTime) {
    setTimeout(function() {
        toast.animate({
            "left" : window.innerWidth + toast.find(".js_toastBody").outerWidth()
        }, 250, function() {
            toast.remove();
        });
    }, dspTime * 1000)
}