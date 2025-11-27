function clickRingi(cmd, cmdMode, apprMode, sid, usrSid) {
    document.forms['rngmainForm'].CMD.value=cmd;
    document.forms['rngmainForm'].rngCmdMode.value=cmdMode;
    document.forms['rngmainForm'].rngApprMode.value=apprMode;
    document.forms['rngmainForm'].rngSid.value=sid;
    document.forms['rngmainForm'].rng010ViewAccount.value=usrSid;
    document.forms['rngmainForm'].submit();
    return false;
}

$(function(){
 /*hover */
 $('.js_listHover')
     .mouseenter(function (e) {
         $(this).children().addClass("list_content-on");
         $(this).prev().children().addClass("list_content-topBorder");
     })
     .mouseleave(function (e) {
         $(this).children().removeClass("list_content-on");
         $(this).prev().children().removeClass("list_content-topBorder");
     });

 /* hover:click */
 $(document).on("click", ".js_listClick", function(){
     var cmd ='detail';
     var cmdMode = 0;
     var apprMode = $(this).parent().find(':hidden[name="select_apprMode"]').val();
     var sid = $(this).parent().find(':hidden[name="select_rngSid"]').val();
     var usrSid = $(this).parent().find(':hidden[name="select_usrSid"]').val();
     clickRingi(cmd, cmdMode, apprMode, sid, usrSid);
 });
});
