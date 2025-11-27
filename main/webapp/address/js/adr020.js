function editCompany() {
    document.forms['adr020Form'].adr110editAcoSid.value = document.forms['adr020Form'].adr020selectCompany.value;
    document.forms['adr020Form'].adr110ProcMode.value = 1;
    buttonPush('editCompany');
}

function deleteLabel(albSid) {
    document.forms['adr020Form'].adr020deleteLabel.value = albSid;
    buttonPush('deleteLabel');
}

function viewchange() {
    var viewgroup=document.all && document.all('viewgroup') || document.getElementById && document.getElementById('viewgroup');
    var viewuser=document.all && document.all('viewuser') || document.getElementById && document.getElementById('viewuser');
    var editgroup=document.all && document.all('editgroup') || document.getElementById && document.getElementById('editgroup');
    var edituser=document.all && document.all('edituser') || document.getElementById && document.getElementById('edituser');

    if ($('#view0')[0].checked) {
        viewgroup.style.display="none";
        viewuser.style.display="none";
        editselect.style.display="none";
        editselectstr.style.display="block";
        $('#editselectstr')[0].innerHTML = "<span class=\"text_base2\">担当者のみ</span>";

        $('#edit0')[0].checked = true;

    } else if ($('#view1')[0].checked) {
        viewgroup.style.display="block";
        viewuser.style.display="none";
        editselect.style.display="none";
        editselectstr.style.display="block";
        $('#editselectstr')[0].innerHTML = "<span class=\"text_base2\">グループ指定</span>";

        $('#edit1')[0].checked = true;

    } else if ($('#view2')[0].checked) {
        viewgroup.style.display="none";
        viewuser.style.display="block";
        editselect.style.display="none";
        editselectstr.style.display="block";
        $('#editselectstr')[0].innerHTML = "<span class=\"text_base2\">ユーザ指定</span>";

        $('#edit2')[0].checked = true;

    } else if ($('#view3')[0].checked) {
        viewgroup.style.display="none";
        viewuser.style.display="none";
        editselect.style.display="inline-flex";
        editselectstr.style.display="none";

    }

    editchange();
}

function editchange() {

    var editgroup=document.all && document.all('editgroup') || document.getElementById && document.getElementById('editgroup');
    var edituser=document.all && document.all('edituser') || document.getElementById && document.getElementById('edituser');

    if ($('#edit0')[0].checked) {
        editgroup.style.display="none";
        edituser.style.display="none";

    } else if ($('#edit1')[0].checked) {
        editgroup.style.display="block";
        edituser.style.display="none";

    } else if ($('#edit2')[0].checked) {
        editgroup.style.display="none";
        edituser.style.display="block";

    } else if ($('#edit3')[0].checked) {
        editgroup.style.display="none";
        edituser.style.display="none";
    }
}

function openpos() {
	var labLoc = '../address/adr180.do';
    $('iframe[name=pos]').attr({'src':labLoc});
    $('#subPanel').dialog({
        modal: true,
        title:'役職を登録してください',
        autoOpen: true,  // hide dialog
        resizable: false,
        height: '180',
        width: '420',
        open: function() {
            $(".ui-dialog-titlebar-close", $(this).closest(".ui-dialog")).hide();
        }
    });
  return false;
}

function openlabeladd(){
	var labLoc = '../address/adr200.do';
    $('iframe[name=labadd]').attr({'src':labLoc});
    $('#labelAddPanel').dialog({
        modal: true,
        title:'ラベルを登録してください',
        autoOpen: true,  // hide dialog
        resizable: false,
        height: '250',
        width: '580',
        open: function() {
            $(".ui-dialog-titlebar-close", $(this).closest(".ui-dialog")).hide();
        }
    });
  return false;
}

function openlabel(){
	var labLoc = '../address/adr190.do?adr190parentLabelName=adr020label';
    $('iframe[name=lab]').attr({'src':labLoc});
    $('#labelPanel').dialog({
        modal: true,
        title:'ラベルを選択してください',
        autoOpen: true,  // hide dialog
        resizable: false,
        height: '340',
        width: '520',
        open: function() {
            $(".ui-dialog-titlebar-close", $(this).closest(".ui-dialog")).hide();
        }
    });
  return false;
}

function addressSearch() {
  var address = document.getElementsByName('adr020address1')[0].value;
  var address2 = document.getElementsByName('adr020address2')[0].value;

  if (address == null) {
      address = address2;
  } else if (address2 != null) {
      address += address2;
  }

  searchGoogleMap(address);
  return false;
}

function buttonCopy(procMode) {
    document.forms[0].adr020ProcMode.value = procMode;
    document.forms[0].adrCopyFlg.value = 1;
    buttonPush('addAdrData');
}