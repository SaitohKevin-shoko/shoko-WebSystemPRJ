function bbsPtl010changePage(id, formId){
    var frm = document.getElementById(formId);

    var url = '../bulletin/bbsptl010.do';
    var pars = '';
    pars= '?CMD=init';
    pars= pars  + '&bbsPtlBfiSid=' + frm.bbsPtlBfiSid.value;
    pars= pars  + '&bbsPtl010ItemId=' + frm.bbsPtl010ItemId.value;
    pars= pars  + '&bbsPtl010page1=' + frm.bbsPtl010page1.value;
    url = url + pars;
    $('#bulletin_' + frm.bbsPtl010ItemId.value).load(url);

    return false;
}

function bbsPtl010buttonPush(cmd, formId){

    var frm = document.getElementById(formId);

    var url = '../bulletin/bbsptl010.do';
    var pars = '';
    pars= '?CMD=' + cmd;
    pars= pars  + '&bbsPtlBfiSid=' + frm.bbsPtlBfiSid.value;
    pars= pars  + '&bbsPtl010ItemId=' + frm.bbsPtl010ItemId.value;
    pars= pars  + '&bbsPtl010page1=' + frm.bbsPtl010page1.value;
    url = url + pars;
    $('#bulletin_' + frm.bbsPtl010ItemId.value).load(url);

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
    $(document).on("click", ".js_lisBbsPtlClick", function(){
        var url = $(this).parent().data("url");
        window.location.href = url;
    });
});
