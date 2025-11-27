function clearUserList(){
    $('#selectMember')[0].innerHTML = '';

    var userSid = document.getElementsByName('prj070scTantou');
    for (i = 0; i < userSid.length; i++) {
        userSid[i].value = '';
        userSid[i].disabled = true;
    }
}

function clearAddUserList(){
    $('#selectAddUser')[0].innerHTML = '';

    var userSid = document.getElementsByName('prj070scTourokusya');
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
        document.forms[0].prj070page2.value=document.forms[0].prj070page1.value;
    } else {
        document.forms[0].prj070page1.value=document.forms[0].prj070page2.value;
    }
    setDateParam();
    document.forms[0].submit();
    return false;
}

function onTitleLinkSubmit(sortKey, order) {
    $('#CMD')[0].value = '';
    document.forms[0].prj070sort.value = sortKey;
    document.forms[0].prj070order.value = order;
    setDateParam();
    document.forms[0].submit();
    return false;
}

function viewTodo(cmd, prjSid, todoSid){
    $('#CMD')[0].value = cmd;
    document.forms[0].prj060prjSid.value=prjSid;
    document.forms[0].prj060todoSid.value=todoSid;
    setDateParam();
    document.forms[0].submit();
    return false;
}

function changeProject() {
    $('#CMD')[0].value = '';
    document.forms['prj070Form'].submit();
}

function clickLabel(label) {
    var lab = document.getElementById(label.htmlFor);
    if (lab != null) {
        if (lab.tagName == "INPUT") {
            lab.checked = !lab.checked;
        }
    }
    return false;
}

function setDateParam() {
    setYmdParam($("#selDatesp"),
                $("input[name='prj070scKaisiYoteiYear']"),
                $("input[name='prj070scKaisiYoteiMonth']"),
                $("input[name='prj070scKaisiYoteiDay']"));
    setYmdParam($("#selDateep"),
                $("input[name='prj070scKigenYear']"),
                $("input[name='prj070scKigenMonth']"),
                $("input[name='prj070scKigenDay']"));
    setYmdParam($("#selDatesr"),
                $("input[name='prj070scKaisiJissekiYear']"),
                $("input[name='prj070scKaisiJissekiMonth']"),
                $("input[name='prj070scKaisiJissekiDay']"));
    setYmdParam($("#selDateer"),
                $("input[name='prj070scSyuryoJissekiYear']"),
                $("input[name='prj070scSyuryoJissekiMonth']"),
                $("input[name='prj070scSyuryoJissekiDay']"));
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
}) ;

