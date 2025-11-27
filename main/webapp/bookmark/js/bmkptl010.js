function bmkptlClickArrow(cmd, formId) {

    var frm = document.getElementById(formId);

    var url = '../bookmark/bmkptl010.do';
    var pars = '';//getHidden();

    pars= '?CMD=' + cmd;
    pars= pars  + '&bmkGrpSid=' + frm.bmkGrpSid.value;
    pars= pars  + '&bmkptl010ItemId=' + frm.bmkptl010ItemId.value;
    pars= pars  + '&bmkptl010page=' + frm.bmkptl010page.value;
    url = url + pars;
    $('#bookmark_' + frm.bmkptl010ItemId.value).load(url);

    return false;
}

function bmkptlChangePage(formId){
    var frm = document.getElementById(formId);

    var url = '../bookmark/bmkptl010.do';
    var pars = '';
    pars= '?CMD=init';
    pars= pars  + '&bmkGrpSid=' + frm.bmkGrpSid.value;
    pars= pars  + '&bmkptl010ItemId=' + frm.bmkptl010ItemId.value;
    pars= pars  + '&bmkptl010page=' + frm.bmkptl010page.value;
    url = url + pars;
    $('#bookmark_' + frm.bmkptl010ItemId.value).load(url);

    return false;
}

/* ホバーの処理 */
$(function() {
     /* hover */
    $('.js_listHover')
        .mouseenter(function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        })
        .mouseleave(function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        });

    /* hover:click */
    $(document).on("click", ".js_lisBmkPtlClick", function(){
        var url = $(this).parent().data("url");
        window.open(url, '_brank');
    });
});