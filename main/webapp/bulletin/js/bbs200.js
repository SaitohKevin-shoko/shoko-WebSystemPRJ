$(function() {
  $(document).on('change', 'input[name=bbs200IniPostTypeKbn]', function(){
    switchDispArea();
  });
  switchDispArea();
})

function switchDispArea() {
  if ($('input[name=bbs200IniPostTypeKbn]:checked').val() == '0') {
    $('#js_iniPostTypeArea').hide();
  } else {
    $('#js_iniPostTypeArea').show();
  }
}
