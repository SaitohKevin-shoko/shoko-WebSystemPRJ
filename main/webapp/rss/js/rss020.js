/* Discription disp and hide */
function dispDescription() {
  var ctext = $('#basicAuthDsp')[0];
  ctext.setAttribute('class', 'rss_description_text_dsp2');
}
function notDispDescription() {
  var ctext = $('#basicAuthDsp')[0];
  ctext.setAttribute('class', 'rss_description_text_notdsp');
}

function initDispDescription(basicAuthFlg) {
  var ctext = $('#basicAuthDsp')[0];
  if (basicAuthFlg == 0) {
    ctext.setAttribute('class', 'rss_description_text_notdsp');
  } else {
    ctext.setAttribute('class', 'rss_description_text_dsp2');
  }
}
