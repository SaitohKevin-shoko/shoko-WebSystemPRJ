function viewchange() {

    var viewadmin=document.all && document.all('viewadmin') || document.getElementById && document.getElementById('viewadmin');
    var viewgroup=document.all && document.all('viewgroup') || document.getElementById && document.getElementById('viewgroup');
    var viewuser=document.all && document.all('viewuser') || document.getElementById && document.getElementById('viewuser');
    var viewall=document.all && document.all('viewall') || document.getElementById && document.getElementById('viewall');

    if ($('#view0')[0].checked) {
        viewadmin.style.display="block";
        viewgroup.style.display="none";
        viewuser.style.display="none";
        viewall.style.display="none";

    } else if ($('#view1')[0].checked) {
        viewadmin.style.display="none";
        viewgroup.style.display="block";
        viewuser.style.display="none";
        viewall.style.display="none";

    } else if ($('#view2')[0].checked) {
        viewadmin.style.display="none";
        viewgroup.style.display="none";
        viewuser.style.display="block";
        viewall.style.display="none";

    } else if ($('#view3')[0].checked) {
        viewadmin.style.display="none";
        viewgroup.style.display="none";
        viewuser.style.display="none";
        viewall.style.display="block";

    }
}
