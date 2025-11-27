function viewchange() {
    var viewgroup=document.all && document.all('viewgroup') || document.getElementById && document.getElementById('viewgroup');
    var viewuser=document.all && document.all('viewuser') || document.getElementById && document.getElementById('viewuser');
    var editgroup=document.all && document.all('editgroup') || document.getElementById && document.getElementById('editgroup');
    var edituser=document.all && document.all('edituser') || document.getElementById && document.getElementById('edituser');

    if ($('#view0')[0].checked) {
        viewgroup.style.display="none";
        viewuser.style.display="none";
        editselect.style.display="none";
        editselectstr.style.display="block";
        $('#editselectstr')[0].innerHTML = "<span class=\"text_base2\">担当者のみ</span>";

        $('#edit0')[0].checked = true;

    } else if ($('#view1')[0].checked) {
        viewgroup.style.display="block";
        viewuser.style.display="none";
        editselect.style.display="none";
        editselectstr.style.display="block";
        $('#editselectstr')[0].innerHTML = "<span class=\"text_base2\">グループ指定</span>";

        $('#edit1')[0].checked = true;

    } else if ($('#view2')[0].checked) {
        viewgroup.style.display="none";
        viewuser.style.display="block";
        editselect.style.display="none";
        editselectstr.style.display="block";
        $('#editselectstr')[0].innerHTML = "<span class=\"text_base2\">ユーザ指定</span>";

        $('#edit2')[0].checked = true;

    } else if ($('#view3')[0].checked) {
        viewgroup.style.display="none";
        viewuser.style.display="none";
        editselect.style.display="inline-flex";
        editselectstr.style.display="none";

    }

    editchange();
}

function editchange() {

    var editgroup=document.all && document.all('editgroup') || document.getElementById && document.getElementById('editgroup');
    var edituser=document.all && document.all('edituser') || document.getElementById && document.getElementById('edituser');

    if ($('#edit0')[0].checked) {
        editgroup.style.display="none";
        edituser.style.display="none";

    } else if ($('#edit1')[0].checked) {
        editgroup.style.display="block";
        edituser.style.display="none";

    } else if ($('#edit2')[0].checked) {
        editgroup.style.display="none";
        edituser.style.display="block";

    } else if ($('#edit3')[0].checked) {
        editgroup.style.display="none";
        edituser.style.display="none";
    }
}