function rsvSchChange() {
    var viewgroup=document.all && document.all('rsvSchGroup') || document.getElementById && document.getElementById('rsvSchGroup');
    var viewuser=document.all && document.all('rsvSchUser') || document.getElementById && document.getElementById('rsvSchUser');

    if ($('#rsvSchKbn0')[0].checked) {
        viewgroup.style.display="none";
        viewuser.style.display="block";

        $('#rsvSchKbn0')[0].checked = true;

    } else if ($('#rsvSchKbn1')[0].checked) {
        viewgroup.style.display="block";
        viewuser.style.display="none";

        $('#rsvSchKbn0').checked = true;
    }
}


function rsvSchDisabled(uiId) {
    const disabledFlg = !($('#refOk')[0].checked);
    $('#rsvSchKbn0')[0].disabled = disabledFlg;
    $('#rsvSchKbn1')[0].disabled = disabledFlg;
    $('#rsvSchGrpSid')[0].disabled = disabledFlg;
    $('#rsvSchGrpBtn1')[0].disabled = disabledFlg;

    $('fieldset[name="' + uiId + '"]').prop('disabled', disabledFlg);
}
