function changeEnableDisable() {
  var bool = false;
//  var ctext = $('#lmtinput')[0];

  if (document.forms[0].sml110MailForward[0].checked) {
    bool = true;
    if (document.forms[0].sml110authMethod != undefined) {
        document.forms[0].sml110authMethod[0].disabled = bool;
        document.forms[0].sml110authMethod[1].disabled = bool;
    }
    document.forms[0].sml110SmtpUrl.value = '';
    document.forms[0].sml110SmtpPort.value = '';
    document.forms[0].sml110SmtpUser.value = '';
    document.forms[0].sml110SmtpPass.value = '';
    document.forms[0].sml110FromAddress.value = '';
    document.forms[0].sml110FwlmtTextArea.value = '';
    document.forms[0].sml110FwLmtKbn[0].disabled = bool;
    document.forms[0].sml110FwLmtKbn[1].disabled = bool;
    document.forms[0].sml110SmtpEncrypt.value = 0;
    $('.js_markHissuSmtp').addClass('display_n');
    document.forms[0].sml110provider.disabled = bool;
    $(".js_authBtn").attr("disabled", bool);

  } else {
    document.forms[0].sml110FwLmtKbn[0].disabled = false;
    document.forms[0].sml110FwLmtKbn[1].disabled = false;
    if (document.forms[0].sml110authMethod != undefined) {
        document.forms[0].sml110authMethod[0].disabled = bool;
        document.forms[0].sml110authMethod[1].disabled = bool;
    }
    $('.js_markHissuSmtp').removeClass('display_n');
  }
  document.forms[0].sml110SmtpUrl.disabled = bool;
  document.forms[0].sml110SmtpPort.disabled = bool;
  document.forms[0].sml110SmtpUser.disabled = bool;
  document.forms[0].sml110SmtpPass.disabled = bool;
  document.forms[0].sml110FromAddress.disabled = bool;
  document.forms[0].sml110SmtpEncrypt.disabled = bool;
  $('#lmtinput').hide();
  document.forms[0].sml110provider.disabled = bool;
  $(".js_authBtn").attr("disabled", bool);

  document.forms[0].sml110FwLmtKbn[1].checked = true;

  return;
}

function initEnableDisable() {
  var bool = false;

  if (document.forms[0].sml110MailForward[0].checked) {
    bool = true;
    if (document.forms[0].sml110authMethod != undefined) {
        document.forms[0].sml110authMethod[0].disabled = bool;
        document.forms[0].sml110authMethod[1].disabled = bool;
    }
    document.forms[0].sml110SmtpUrl.value = '';
    document.forms[0].sml110SmtpPort.value = '';
    document.forms[0].sml110SmtpUser.value = '';
    document.forms[0].sml110SmtpPass.value = '';
    document.forms[0].sml110FwLmtKbn[0].disabled = bool;
    document.forms[0].sml110FwLmtKbn[1].disabled = bool;
    document.forms[0].sml110SmtpEncrypt.value = 0;
    document.forms[0].sml110provider.disabled = bool;
    $(".js_authBtn").disabled = bool;

  } else {
    if (document.forms[0].sml110authMethod != undefined) {
        document.forms[0].sml110authMethod[0].disabled = bool;
        document.forms[0].sml110authMethod[1].disabled = bool;
    }
    document.forms[0].sml110FwLmtKbn[0].disabled = false;
    document.forms[0].sml110FwLmtKbn[1].disabled = false;
  }
  document.forms[0].sml110SmtpUrl.disabled = bool;
  document.forms[0].sml110SmtpPort.disabled = bool;
  document.forms[0].sml110SmtpUser.disabled = bool;
  document.forms[0].sml110SmtpPass.disabled = bool;
  document.forms[0].sml110FromAddress.disabled = bool;
  document.forms[0].sml110SmtpEncrypt.disabled = bool;
  document.forms[0].sml110provider.disabled = bool;
  $(".js_authBtn").disabled = bool;

  if (document.forms[0].sml110oauthCompFlg.value == 1) {
    $(".js_oauthYet").addClass("display_none");
  } else {
    $(".js_oauthDone").addClass("display_none");
  }

  changeAuthMethod();
  return;
}

function lmtEnableDisable() {
//  var ctext = $('#lmtinput')[0];
      if (document.forms[0].sml110FwLmtKbn[0].checked) {
          $('#lmtinput').show();
      } else {
          $('#lmtinput').hide();
          document.forms[0].sml110FwlmtTextArea.value = '';
      }
}

function changeAuthMethod() {
    if ($('input:radio[name=sml110authMethod]:checked').val() == "1") {
        $('.js_BaseAuth').addClass('display_none');
        $('.js_OAuth').removeClass('display_none');
    } else {
        $('.js_BaseAuth').removeClass('display_none');
        $('.js_OAuth').addClass('display_none');
    }
}