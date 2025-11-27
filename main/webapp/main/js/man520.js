$(function() {
  $('.main_grid_pane > dl').live({click:function () {

     $('#detail_dialog').html($(this).children('.js_sizeTable').html());

     $('#detail_dialog').dialog({
      title: $(this).children('dt').children('.js_pluginName').html(),
      autoOpen: true,
      bgiframe: true,
      resizable: false,
      width: 'auto',
      modal: true,
      overlay: {
          backgroundColor: '#000000',
          opacity: 0.5
      },
      buttons: [
          {
              name:"DIALOG_CLOSE_BUTTON",
              text:msglist["close"],
              click: function() {
                  $(this).dialog('close');
              }
          }
      ]

     });

  }});


});