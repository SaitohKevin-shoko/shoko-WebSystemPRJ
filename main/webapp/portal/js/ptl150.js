function changeInitArea() {

  var initKbn = document.getElementsByName('ptl150ptlInitKbn')[0].checked;

  if (initKbn == true) {

     $('#ptlInitTypeArea0').removeClass("display_n");

     $('#ptlInitTypeArea1').removeClass("display_n");

  } else {

     $('#ptlInitTypeArea0').addClass("display_n");

     $('#ptlInitTypeArea1').addClass("display_n");

  }

}