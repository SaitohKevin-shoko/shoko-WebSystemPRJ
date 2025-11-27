function lmtEnableDisable() {
    var ctext = $('#lmtinput')[0];
    if (document.forms[0].sch085MemDspKbn[1].checked) {
    	ctext.setAttribute('class', 'cl_fontWarn fs_13');
    } else {
    	ctext.setAttribute('class', 'display_none');
    }
}