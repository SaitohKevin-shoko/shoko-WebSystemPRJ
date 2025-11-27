function updatePrj(sortKey, order) {
  var url = '../project/prjmain.do';
  var pars = '';//getHidden();

  pars='?prjMainSort=' + sortKey;
  pars= pars + '&' + 'prjMainOrder=' + order;
  url= url + pars;
  $('#project_prjmain').load(url);
}

/* ホバーの処理 */
$(function() {
    /* hover:click */
    $(document).on("click", ".js_listPrjSortClick", function(){
        var target = $(this).data('target');
        var sort = $(this).data('sort');
        updatePrj(target, sort);
    });
});