function enableDisable() {

  if (document.forms[0].zsk130mainDspFlg[1].checked) {
    document.forms[0].zsk130mainDspGpSid.disabled = true;
    document.forms[0].zsk130mainDspSortOrder1[0].disabled = true;
    document.forms[0].zsk130mainDspSortOrder1[1].disabled = true;
    document.forms[0].zsk130mainDspSortOrder2[0].disabled = true;
    document.forms[0].zsk130mainDspSortOrder2[1].disabled = true;
    document.forms[0].zsk130mainDspSortKey1.disabled = true;
    document.forms[0].zsk130mainDspSortKey2.disabled = true;
    document.forms[0].zsk130mainDspSchViewDf[0].disabled = true;
    document.forms[0].zsk130mainDspSchViewDf[1].disabled = true;

    document.forms[0].zsk130mainDspSortOrder1[0].checked = true;
    document.forms[0].zsk130mainDspSortOrder2[0].checked = true;
    document.forms[0].zsk130mainDspSortKey1.value = 1;
    document.forms[0].zsk130mainDspSortKey2.value = 1;
    document.forms[0].zsk130mainDspSchViewDf[0].checked = true;

  } else {
    document.forms[0].zsk130mainDspGpSid.disabled = false;
    document.forms[0].zsk130mainDspSortOrder1[0].disabled = false;
    document.forms[0].zsk130mainDspSortOrder1[1].disabled = false;
    document.forms[0].zsk130mainDspSortOrder2[0].disabled = false;
    document.forms[0].zsk130mainDspSortOrder2[1].disabled = false;
    document.forms[0].zsk130mainDspSortKey1.disabled = false;
    document.forms[0].zsk130mainDspSortKey2.disabled = false;
    document.forms[0].zsk130mainDspSchViewDf[0].disabled = false;
    document.forms[0].zsk130mainDspSchViewDf[1].disabled = false;

  }
  return;
}
$(function() {
   enableDisable();
});
