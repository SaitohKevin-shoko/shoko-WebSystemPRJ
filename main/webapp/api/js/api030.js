function openGroupWindowForApi030(formOj, selBoxName, myGpFlg, cmd) {
  document.forms[0].api030user.value='-1';
  if (cmd != "") {
    document.forms[0].CMD.value=cmd;
  }
  openGroup(formOj, selBoxName, myGpFlg, "");
  return;
}

function changePage(pageCmbo) {
  document.forms[0].api030page.value=pageCmbo.value;
  buttonPush('dsp');
  return
}
function buttonMuko(token) {
  $('input[name=api030delete]').attr('value', token);
  buttonPush('api030Muko');
}

function clickSortTitle(sortKey) {
  var nowSortKey = document.forms[0].api030sortKey.value;
  if (nowSortKey == sortKey) {
    var nowOrderKey = document.forms[0].api030orderKeySv.value;
    if(nowOrderKey == $('#sort1_up').val() ) {
      $('#sort1_dw').attr('checked', true);
    } else {
      $('#sort1_up').attr('checked', true);
    }

  } else {
    document.forms[0].api030sortKey.value = sortKey
  }
  buttonPush('api030Search');
}

function tokenCopy() {
  const pre = document.createElement('pre');
  pre.style.webkitUserSelect = 'auto';
  pre.style.userSelect = 'auto';
  pre.textContent = $(".js_tokenDisp").val();
  document.body.appendChild(pre);
  document.getSelection().selectAllChildren(pre);
  const result = document.execCommand('copy');
  document.body.removeChild(pre);
  $('.js_toastMessage').text(msglist_api030['api.api030.11']);
  displayToast('tokenParam');
  return result;
}

function setTokenToParentWindow(token) {
  if (window.opener && !window.opener.closed) {
    window.opener.$('.js_tokenKey').val(token);
    window.close();
  }
}

$(function() {
  $('.js_createToken').live("click", function(){
    $('.js_tokenCreatePopError').text("");
    $(".js_tokenDisp").val("");
    $('#tokenCreatePop').dialog({
      dialogClass:"fs_13",
      autoOpen: true,  // hide dialog
      bgiframe: true,   // for IE6
      resizable: false,
      width: 440,
      modal: true,
      overlay: {
        backgroundColor: '#000000',
        opacity: 0.5
      },
      buttons: {
        閉じる: function() {
          $(this).dialog('close');
        }
      }
    });
  });

  $('.js_groupChange').live("change", function(){
    var paramStr = 'CMD=tokenGroupChange';
    paramStr = paramStr + '&api030createTokenGroup= ' + $('.js_groupChange').val();
    $.ajax({
      async: true,
      url:  "../api/api030.do",
      type: "post",
      data: paramStr
    }).done(function( data ) {
      if (data["success"]) {
        $(".js_userListContet").remove();
        for (var i = 0; i < data["size"]; i++) {
          $(".js_tokenUser").append("<option class=\"js_userListContet\" value=" + data["usrSid_" + i]+">" + htmlEscape(data["usrName_" + i]) + "</option>");
        }
      }
    });
  });

  $('.js_createTokenPop').live("click", function(){
    var paramStr = 'CMD=createToken';
    paramStr = paramStr + '&api030createTokenUser=' + $('.js_tokenUser').val();
    $.ajax({
      async: true,
      url:  "../api/api030.do",
      type: "post",
      data: paramStr
    }).done(function( data ) {
      if (data["success"]) {
        $('.js_tokenCreatePopError').text("");
        $(".js_tokenDisp").val(data["token"]);
      } else {
        $('.js_tokenCreatePopError').text(msglist_api030['cmn.select.user']);
      }
    });
  });

  $('.js_createUseTokenPop').live("click", function(){
    var paramStr = 'CMD=createToken';
    paramStr = paramStr + '&api030createTokenUser=' + $('.js_tokenUser').val();
    $.ajax({
      async: true,
      url:  "../api/api030.do",
      type: "post",
      data: paramStr
    }).done(function( data ) {
      if (data["success"]) {
        $('.js_tokenCreatePopError').text("");
        setTokenToParentWindow(data["token"]);
      } else {
        $('.js_tokenCreatePopError').text(msglist_api030['cmn.select.user']);
      }
    });
  });
});