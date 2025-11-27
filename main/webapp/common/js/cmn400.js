$(function() {

    $(document).on("click", ".js_backBtn", function() {
        document.forms[0].CMD = "cmn400Back";
        document.forms[0].submit();
    });

    $(document).on("click", ".js_noticeBtn", function() {
        
        if (!window.parent.isCanUsePush()) {
            return false;
        }
        var title = msglist["cmn.notice.test.title"];
        var body = msglist["cmn.notice.test.text"];
        var url;
        var image = "../common/images/icon_gs_notice.png";
        var dspTime = 5;

        window.parent.noticePush(title, body, url, dspTime, image, true);
    })
});
  