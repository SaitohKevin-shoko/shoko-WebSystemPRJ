$(function () {
  var id = $("input[name='ipk100specLevel']:checked").val();
  $('#disp' + id).append("挿入");

  $( 'input[name="ipk100specLevel"]:radio' ).change( function() {
  var id = $("input[name='ipk100specLevel']:checked").val();
  $('.sonyu').empty();
  $('#disp' + id).append("挿入");

  });

  /* radio:click */
  $(".js_tableTopCheck").live("click", function(){
      var check = $(this).children();
      check.attr("checked", true);

      var id = $("input[name='ipk100specLevel']:checked").val();
      $('.sonyu').empty();
      $('#disp' + id).append("挿入");

  });

});
