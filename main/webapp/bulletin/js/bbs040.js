function buttonPush(cmd) {

    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function bbs040DateKbn() {
  if (document.forms[0].bbs040dateNoKbn.checked == true) {
    document.forms[0].bbs040fromDate.disabled=true;
    document.forms[0].bbs040toDate.disabled=true;
  } else {
    document.forms[0].bbs040fromDate.disabled=false;
    document.forms[0].bbs040toDate.disabled=false;
  }
}

function setParams() {
    setYmdParam($("input[name='bbs040fromDate']"),
        $("input[name='bbs040fromYear']"),
        $("input[name='bbs040fromMonth']"),
        $("input[name='bbs040fromDay']"));
    setYmdParam($("input[name='bbs040toDate']"),
        $("input[name='bbs040toYear']"),
        $("input[name='bbs040toMonth']"),
        $("input[name='bbs040toDay']"));
}

$(function() {
  
  if (!$('input:checkbox[name=bbs040publicStatusOngoing]').is(':checked')
  && !$('input:checkbox[name=bbs040publicStatusScheduled]').is(':checked')
  && !$('input:checkbox[name=bbs040publicStatusOver]').is(':checked')) {
    $('input:checkbox[name=bbs040publicStatusOngoing]').attr('checked', true);
    $('input:checkbox[name=bbs040publicStatusScheduled]').attr('checked', true);
    $('input:checkbox[name=bbs040publicStatusOver]').attr('checked', true);
  }
})
