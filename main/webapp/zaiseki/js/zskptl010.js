function ptlmoveCreateMsg(cmd, uid, formId){
    var frm = document.getElementById(formId);
    frm.CMD.value=cmd;
    frm.zskSelectUsrSid.value=uid;
    frm.submit();
    return false;
}

/* Discription disp and hide */
function ptldispDescriptionZsk(fdid) {
  var ctext = $('#' + fdid)[0];
  var buttonName = '#resesSwitch' + fdid;

  if (ctext.className == 'display_n') {
      $(ctext).removeClass('display_n');
      $(buttonName)[0].src="../zaiseki/images/classic/icon_sch_not_dsp.gif";
      $(buttonName)[0].alt='schedule show';
  } else {
      $(ctext).addClass('display_n');
      $(buttonName)[0].src="../zaiseki/images/classic/icon_sch_dsp.gif";
      $(buttonName)[0].alt='schedule hide';
  }
}

function ptldispDescriptionZskOriginal(fdid) {
  var ctext = $('#' + fdid)[0];
  var buttonName = '#resesSwitch' + fdid;

  if (ctext.className == 'display_n') {
      $(ctext).removeClass('display_n');
      $(buttonName)[0].src="../zaiseki/images/original/icon_sch_not_dsp.png";
      $(buttonName)[0].alt='schedule show';
  } else {
      $(ctext).addClass('display_n');
      $(buttonName)[0].src="../zaiseki/images/original/icon_sch_dsp.png";
      $(buttonName)[0].alt='schedule hide';
  }
}

function ptlzskeditSchedule(cmd, sid, uid, formId){
    var frm = document.getElementById(formId);
    frm.CMD.value=cmd;
    frm.zskSelectUsrSid.value=uid;
    frm.zskSelectSchSid.value=sid;
    frm.submit();
    return false;
}

function ptlzskaddSchedule(cmd, uid, formId){
    var frm = document.getElementById(formId);
    frm.CMD.value=cmd;
    frm.zskSelectUsrSid.value=uid;
    frm.submit();
    return false;
}
