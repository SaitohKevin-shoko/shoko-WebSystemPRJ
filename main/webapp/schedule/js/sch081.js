$(function() {

    /* タイトルカラー追加しないクリック */
    $('#sch081colorKbn0').click(
        function () {
          $('.add_title_color').addClass('display_none');
        }
    );

    /* タイトルカラー追加するクリック */
    $('#sch081colorKbn1').click(
        function () {
            $('.add_title_color').removeClass('display_none');
        }
    );

    //初期処理
    if ($('input:radio[name=sch081colorKbn]:checked').val() == 1) {
        $('#sch081colorKbn1').click();
    }
    
	$("input[name='sch081HourDiv']").on("change", function () {
	    buttonPush("init");
	});
});

function changeEnableDisable() {
  var ctext = $('#lmtinput')[0];
  if (document.forms[0].sch081RepeatKbnType[0].checked) {
     ctext.setAttribute('class', 'display_none');
  } else {
     ctext.setAttribute('class', 'cl_fontWarn');
  }
}

function showOrHide() {
  if (document.forms[0].sch081RepeatKbn.length) {
      if (document.forms[0].sch081RepeatKbn[1].checked) {
          showText();
      } else {
          hideText();
      }
  }
}
function showText(){
    $('#repertMyKbnArea').show();
}

function hideText(){
    $('#repertMyKbnArea').hide();
}