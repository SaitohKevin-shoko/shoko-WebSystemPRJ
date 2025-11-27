function lmtEnableDisable() {
    var ctext = $('#lmtinput')[0];
    if (document.forms[0].cir140KenKbn[1].checked) {
        ctext.setAttribute('class', 'display_b cl_fontWarn');
    } else {
        ctext.setAttribute('class', 'display_n');
    }
}