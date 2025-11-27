
function deleteLine() {
    $(this).closest("tr").remove();
}

function addLine() {
    var size = $(".table-top").find("tr").length;
    if (size < 15) {
        $(".table-top").append("<tr><td>aaaa</td><td>aaaa</td><td>aaaa</td><tr>")
    }
}

function addNewRow() {
  var counter = 0;
  var num = Number(1);
    $('.js_line').each(function(){
      var N = Number($(this).find('.js_num').text());
      if (num < N) {
        num = N;
      }
        counter++;
    });
    if (counter < 15) {
        num += Number(1);
        var detail = "";
        detail = "<tr class=\"js_line\">"
               + "  <td class=\"txt_c\"><span class=\"js_num display_none\">"+num+ "</span>"
               + "  <select class=\"js_month\">"
               + "    <option value=\"\"></option>"
               + "    <option value=\"1\">1</option>"
               + "    <option value=\"2\">2</option>"
               + "    <option value=\"3\">3</option>"
               + "    <option value=\"4\">4</option>"
               + "    <option value=\"5\">5</option>"
               + "    <option value=\"6\">6</option>"
               + "    <option value=\"7\">7</option>"
               + "    <option value=\"8\">8</option>"
               + "    <option value=\"9\">9</option>"
               + "    <option value=\"10\">10</option>"
               + "    <option value=\"11\">11</option>"
               + "    <option value=\"12\">12</option>"
               +    "</select> 月</td>"
               + "  <td class=\"txt_c\"><input type=\"text\" class=\"w30 js_days\" maxlength\"3\"> 日未満</td>"
               + "    <input type=\"text\" class=\"w30 js_days\" maxlength\"3\"> 日未満</td>"
               + "  </td>"
               + "  <td>"
               + "    <input type=\"text\" class=\"w100 mr5 js_message\" length=\"50\">"
               + "  </td>"
               + "  <td class=\"txt_c\">"
               + "    <img class=\"btn_classicImg-display js_del_btn cursor_p\" src=\"../common/images/classic/icon_delete.png\" alt=\"削除\">"
               + "    <img class=\"btn_originalImg-display js_del_btn cursor_p\" src=\"../common/images/original/icon_delete.png\" alt=\"削除\">"
               + "  </td>"
               + "</tr>";
      $("#yukyuTable").append(detail);
    }
}

$(function() {
    $(document).on("click", ".js_del_btn", function(){
      $(this).closest(".js_line").remove();
    });
  $(".js_btn_ok").on("click",function() {
    var count = 0;
    $('.js_line').each(function(){
      count += 1;
      if (count == 1) {
        document.forms[0].tcd220Row1.value = Number($(this).find('.js_num').text());
        var month = $(this).find('.js_month option:selected').val();
        $(this).find('.js_month').remove();
        document.forms[0].tcd220DispMonth1.value = month;
        document.forms[0].tcd220Days1.value = $(this).find('.js_days').val();
        document.forms[0].tcd220Message1.value = $(this).find('.js_message').val();
      } else if (count == 2) {
        document.forms[0].tcd220Row2.value = Number($(this).find('.js_num').text());
        var month = $(this).find('.js_month option:selected').val();
        $(this).find('.js_month').remove();
        document.forms[0].tcd220DispMonth2.value = month;
        document.forms[0].tcd220Days2.value = $(this).find('.js_days').val();
        document.forms[0].tcd220Message2.value = $(this).find('.js_message').val();
      } else if (count == 3) {
        document.forms[0].tcd220Row3.value = Number($(this).find('.js_num').text());
        var month = $(this).find('.js_month option:selected').val();
        $(this).find('.js_month').remove();
        document.forms[0].tcd220DispMonth3.value = month;
        document.forms[0].tcd220Days3.value = $(this).find('.js_days').val();
        document.forms[0].tcd220Message3.value = $(this).find('.js_message').val();
      } else if (count == 4) {
        document.forms[0].tcd220Row4.value = Number($(this).find('.js_num').text());
        var month = $(this).find('.js_month option:selected').val();
        $(this).find('.js_month').remove();
        document.forms[0].tcd220DispMonth4.value = month;
        document.forms[0].tcd220Days4.value = $(this).find('.js_days').val();
        document.forms[0].tcd220Message4.value = $(this).find('.js_message').val();
      } else if (count == 5) {
        document.forms[0].tcd220Row5.value = Number($(this).find('.js_num').text());
        var month = $(this).find('.js_month option:selected').val();
        $(this).find('.js_month').remove();
        document.forms[0].tcd220DispMonth5.value = month;
        document.forms[0].tcd220Days5.value = $(this).find('.js_days').val();
        document.forms[0].tcd220Message5.value = $(this).find('.js_message').val();
      } else if (count == 6) {
        document.forms[0].tcd220Row6.value = Number($(this).find('.js_num').text());
        var month = $(this).find('.js_month option:selected').val();
        $(this).find('.js_month').remove();
        document.forms[0].tcd220DispMonth6.value = month;
        document.forms[0].tcd220Days6.value = $(this).find('.js_days').val();
        document.forms[0].tcd220Message6.value = $(this).find('.js_message').val();
      } else if (count == 7) {
        document.forms[0].tcd220Row7.value = Number($(this).find('.js_num').text());
        var month = $(this).find('.js_month option:selected').val();
        $(this).find('.js_month').remove();
        document.forms[0].tcd220DispMonth7.value = month;
        document.forms[0].tcd220Days7.value = $(this).find('.js_days').val();
        document.forms[0].tcd220Message7.value = $(this).find('.js_message').val();
      } else if (count == 8) {
        document.forms[0].tcd220Row8.value = Number($(this).find('.js_num').text());
        var month = $(this).find('.js_month option:selected').val();
        $(this).find('.js_month').remove();
        document.forms[0].tcd220DispMonth8.value = month;
        document.forms[0].tcd220Days8.value = $(this).find('.js_days').val();
        document.forms[0].tcd220Message8.value = $(this).find('.js_message').val();
      } else if (count == 9) {
        document.forms[0].tcd220Row9.value = Number($(this).find('.js_num').text());
        var month = $(this).find('.js_month option:selected').val();
        $(this).find('.js_month').remove();
        document.forms[0].tcd220DispMonth9.value = month;
        document.forms[0].tcd220Days9.value = $(this).find('.js_days').val();
        document.forms[0].tcd220Message9.value = $(this).find('.js_message').val();
      } else if (count == 10) {
        document.forms[0].tcd220Row10.value = Number($(this).find('.js_num').text());
        var month = $(this).find('.js_month option:selected').val();
        $(this).find('.js_month').remove();
        document.forms[0].tcd220DispMonth10.value = month;
        document.forms[0].tcd220Days10.value = $(this).find('.js_days').val();
        document.forms[0].tcd220Message10.value = $(this).find('.js_message').val();
      } else if (count == 11) {
        document.forms[0].tcd220Row11.value = Number($(this).find('.js_num').text());
        var month = $(this).find('.js_month option:selected').val();
        $(this).find('.js_month').remove();
        document.forms[0].tcd220DispMonth11.value = month;
        document.forms[0].tcd220Days11.value = $(this).find('.js_days').val();
        document.forms[0].tcd220Message11.value = $(this).find('.js_message').val();
      } else if (count == 12) {
        document.forms[0].tcd220Row12.value = Number($(this).find('.js_num').text());
        var month = $(this).find('.js_month option:selected').val();
        $(this).find('.js_month').remove();
        document.forms[0].tcd220DispMonth12.value = month;
        document.forms[0].tcd220Days12.value = $(this).find('.js_days').val();
        document.forms[0].tcd220Message12.value = $(this).find('.js_message').val();
      } else if (count == 13) {
        document.forms[0].tcd220Row13.value = Number($(this).find('.js_num').text());
        var month = $(this).find('.js_month option:selected').val();
        $(this).find('.js_month').remove();
        document.forms[0].tcd220DispMonth13.value = month;
        document.forms[0].tcd220Days13.value = $(this).find('.js_days').val();
        document.forms[0].tcd220Message13.value = $(this).find('.js_message').val();
      } else if (count == 14) {
        document.forms[0].tcd220Row14.value = Number($(this).find('.js_num').text());
        var month = $(this).find('.js_month option:selected').val();
        $(this).find('.js_month').remove();
        document.forms[0].tcd220DispMonth14.value = month;
        document.forms[0].tcd220Days14.value = $(this).find('.js_days').val();
        document.forms[0].tcd220Message14.value = $(this).find('.js_message').val();
      } else if (count == 15) {
        document.forms[0].tcd220Row15.value = Number($(this).find('.js_num').text());
        var month = $(this).find('.js_month option:selected').val();
        $(this).find('.js_month').remove();
        document.forms[0].tcd220DispMonth15.value = month;
        document.forms[0].tcd220Days15.value = $(this).find('.js_days').val();
        document.forms[0].tcd220Message15.value = $(this).find('.js_message').val();
      }
    });
    document.forms[0].CMD.value='tcd220ok';
    document.forms[0].submit();
    return false;
  });

});