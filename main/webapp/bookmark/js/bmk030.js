function openlabel(procMode){

  var mode;
  var i;

  //ブックマーク区分取得
  if (procMode == 1) {
      mode = document.forms[0].bmk030mode.value;
  } else {
      for(i = 0; i < document.forms[0].bmk030mode.length; i ++){
          if(document.forms[0].bmk030mode[i].checked){
              mode = i;
          }
      }
  }

  //グループSID取得
  var groupSid = document.forms[0].bmk030groupSid.value;

  var labLoc ='../bookmark/bmk040.do?bmk040parentLabelName=bmk040label'
      + '&bmk040mode=' + mode
      + '&bmk040groupSid=' + groupSid;
  $('iframe[name=lab]').attr({'src':labLoc});
  $('#labelPanel').dialog({
      modal: true,
      title:'ラベルを選択してください',
      autoOpen: true,  // hide dialog
      resizable: false,
      height: '340',
      width: '360',
      open: function() {
          $(".ui-dialog-titlebar-close", $(this).closest(".ui-dialog")).hide();
      }
  });

  return false;
}
