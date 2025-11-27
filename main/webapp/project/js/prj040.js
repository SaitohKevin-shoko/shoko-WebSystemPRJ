function viewPoject(cmd, id){
    $('#CMD')[0].value = cmd;
    document.forms[0].prj030prjSid.value=id;
    setDateParam();
    document.forms[0].submit();
    return false;
}

function clearUserList(){
    $('#selectMember')[0].innerHTML = '';

    var userSid = document.getElementsByName('prj040scMemberSid');
    for (i = 0; i < userSid.length; i++) {
        userSid[i].value = '';
        userSid[i].disabled = true;
    }
}

function clearDate(date){
    date.val('');
}

function changePage(id){
    if (id == 1) {
        document.forms[0].prj040page2.value=document.forms[0].prj040page1.value;
    } else {
        document.forms[0].prj040page1.value=document.forms[0].prj040page2.value;
    }
    setDateParam();
    document.forms[0].submit();
    return false;
}

function onTitleLinkSubmit(sortKey, order) {
    document.forms[0].prj040sort.value = sortKey;
    document.forms[0].prj040order.value = order;
    setDateParam();
    document.forms[0].submit();
    return false;
}

function setDateParam() {
    setYmdParam($("#selDatesf"),
                $("input[name='prj040scStartYearFrom']"),
                $("input[name='prj040scStartMonthFrom']"),
                $("input[name='prj040scStartDayFrom']"));
    setYmdParam($("#selDatest"),
                $("input[name='prj040scStartYearTo']"),
                $("input[name='prj040scStartMonthTo']"),
                $("input[name='prj040scStartDayTo']"));
    setYmdParam($("#selDateef"),
                $("input[name='prj040scEndYearFrom']"),
                $("input[name='prj040scEndMonthFrom']"),
                $("input[name='prj040scEndDayFrom']"));
    setYmdParam($("#selDateet"),
                $("input[name='prj040scEndYearTo']"),
                $("input[name='prj040scEndMonthTo']"),
                $("input[name='prj040scEndDayTo']"));
}

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
    $(document).on("click", ".js_listClick", function(){
        var prjName = $(this).data('prjname');
        var prjId = $(this).data('prjid');
        viewPoject(prjName, prjId)
    });


});