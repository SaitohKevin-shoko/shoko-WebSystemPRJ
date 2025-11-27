function filptlTreeClick(dirSid, frm) {

    frm.backDsp.value='main';
    frm.fil010SelectCabinet.value=frm.dspFcbSid.value;
    frm.fil010SelectDirSid.value=dirSid;
    frm.CMD.value='filptlSelectFolder';
    frm.submit();
}