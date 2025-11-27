
function openlabel(){

  var labLoc = '../user/usr210.do?usr210parentLabelName=usrLabel';
  $('iframe[name=lab]').attr({'src':labLoc});
  $('#labelPanel').dialog({
      modal: true,
      title:'ラベルを選択してください',
      autoOpen: true,  // hide dialog
      resizable: false,
      height: '500',
      width: '450',
      open: function() {
          $(".ui-dialog-titlebar-close", $(this).closest(".ui-dialog")).hide();
      }
  });
  return false;


  return false;
}

function deleteLabel(labSid) {
    document.forms['usr031Form'].delLabel.value = labSid;
    buttonPush('deleteLabel');
}
