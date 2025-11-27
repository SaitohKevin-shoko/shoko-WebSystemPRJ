function dispChg(kbn) {
  if (kbn == 0) {
    document.getElementById("dispChgCompornent").classList.add('display_n')
  } else {
    document.getElementById("dispChgCompornent").classList.remove('display_n')
  }
}

function loadingData() {
    loadingPop(msglist["nowLoading"]);
}

function loadingPop(popTxt) {

    $('#loading_pop').dialog({
        dialogClass:"fs_13",
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 130,
        width: 250,
        modal: true,
        closeOnEscape: false,
        title: popTxt,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: {
            hideBtn: function() {
            }
        }
    });

    $('.ui-button-text').each(function() {
        if ($(this).text() == 'hideBtn') {
            $(this).parent().parent().parent().addClass('border_top_none');
            $(this).parent().parent().parent().addClass('border_bottom_none');
            $(this).parent().remove();
        }
    })
}

function cmn110DropBan() {
    return $('#dispChgCompornent').hasClass('display_n');
}