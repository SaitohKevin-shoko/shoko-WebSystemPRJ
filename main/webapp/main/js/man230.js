function sendSystemInfo() {

    //URL�A�p�����[�^�����擾����
    $.ajax({
        async: true,
        url:"../main/man230.do",
        type: "post",
        data: {CMD: "sendSystemInfo"}
    }).done(function( data ) {
        if (data != null || data != "") {
            var subWindow;
            var winWidth = 520;
            var winHeight = 300;
            var winx = getCenterX(winWidth);
            var winy = getCenterY(winHeight);

            var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no ,scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;
            subWindow = window.open(data.url, 'reportWindow', newWinOpt);



            $.ajax({
                async: true,
                url: data.url,
                type: "post",
                data: {sysinfo: data.sysinfo,
                       licenseid: data.licenseid,
                       version: data.version}
            }).done(function( data ) {

            });
            return false;
      }
   }).fail(function(data){
        //JSON�f�[�^���s���̏���
   });

  function getCenterX(winWidth) {
    var x = (screen.width - winWidth) / 2;
    return x;
  }

  function getCenterY(winHeight) {
    var y = (screen.height - winHeight) / 2;
    return y;
  }

}