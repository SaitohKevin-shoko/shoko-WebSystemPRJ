function buttonPush(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function executeManual() {
    $('#confimationPop').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        width: 400,
        modal: true,
        closeOnEscape: false,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: [
                {
                    name:"DIALOG_OK_BUTTON",
                    text:msglist_man040["cmn.ok"],
                    click: function() {
                        $('#confimationPop').dialog('close');
                        $('#creatingPop').dialog({
                          autoOpen: true,  // hide dialog
                          bgiframe: true,   // for IE6
                          resizable: false,
                          modal: true,
                          width:300,
                          height:100,
                          closeOnEscape: false,
                          overlay: {
                              backgroundColor: '#000000',
                              opacity: 0.5
                          }
                        });
                        var paramStr = 'CMD=batchJobOk';
                        $.ajax({
                            async: true,
                            url:"../main/man040.do",
                            type: "post",
                            data: paramStr
                        }).done(function( data ) {
                            $('#creatingPop').dialog('close');

                           if (data["success"]) {
                             buttonPush('batchJobComp');
                           } else {
                             alert(msglist_man040["main.man040.5"]);
                           }

//                          $('html').html('');
//                          $('body').append($(data));
//                          $('html').append($(data));

                          return;
                        }).fail(function(data){
                            $('#creatingPop').dialog('close');
                            alert(msglist_man040["main.man040.5"]);
                        });
                    }
                },
                {
                    name:"DIALOG_CANCEL_BUTTON",
                    text:msglist_man040["cmn.cancel"],
                    click: function() {
                        $(this).dialog('close');
                    }
                }
            ]
            ,open: function(event, ui) {
                document.getElementsByName('DIALOG_OK_BUTTON')[0].setAttribute("class","baseBtn");
                document.getElementsByName('DIALOG_OK_BUTTON')[0].innerHTML =
                    '<img class="btn_classicImg-display" src="../common/images/classic/icon_ok.png" alt="">'
                  + '<img class="btn_originalImg-display" src="../common/images/original/icon_check.png" alt="">'
                  + msglist_man040["cmn.ok"];

                document.getElementsByName('DIALOG_CANCEL_BUTTON')[0].setAttribute("class","baseBtn");
                document.getElementsByName('DIALOG_CANCEL_BUTTON')[0].innerHTML =
                    '<img class="btn_classicImg-display" src="../common/images/classic/icon_delete.png" alt="">'
                  + '<img class="btn_originalImg-display" src="../common/images/original/icon_delete.png" alt="">'
                  + msglist_man040["cmn.cancel"];
            }

    });
}
