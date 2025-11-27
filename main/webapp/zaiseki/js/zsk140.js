function sortEnableDisable() {
    var ctext = $('#lmtText')[0];
    if (document.forms[0].zsk140SortKbn[1].checked) {
        ctext.setAttribute('class', 'display_b cl_fontWarn');
    } else {
        ctext.setAttribute('class', 'display_n');
    }
}
