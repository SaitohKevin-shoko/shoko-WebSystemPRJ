$(function() {
    $(document).on('click','.js_onSearch', function(){
        rssSearch($(this).data('title'));
    });
});


function rssEdit(rssSid) {
    document.forms[0].CMD.value='rssEdit';
    document.forms[0].rssSid.value=rssSid;
    document.forms[0].rssCmdMode.value=1;
    document.forms[0].submit();
    return false;
}

function rssUpdate() {
    $.get("../rss/rss010.do", {"CMD":rssUpdate} );
    return false;
}

  /* Discription disp and hide */
  function dispDescription(fdid) {
    var ctext = $('#' + fdid)[0];
    if (ctext.className == 'fs_10 lh180 bgC_select') {
      ctext.setAttribute('class', 'display_n');
    } else {
      ctext.setAttribute('class', 'fs_10 lh180 bgC_select');
    }
  }

  /** rss title search */
  function rssSearch(rsstitle) {
      return webSearch(rsstitle);
  }

