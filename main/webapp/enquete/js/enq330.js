jQuery( function() {

    changeSearchArea(0);

    if (document.forms[0].enq330scrollQuestonFlg.value == '1') {
        window.location.hash='enq330graphArea';
        document.forms[0].enq330scrollQuestonFlg.value = '';
    } else  if (document.forms[0].enq330scrollQuestonFlg.value == '2') {
        window.location.hash='enq330ansListArea';
        document.forms[0].enq330scrollQuestonFlg.value = '';
    }

    var graphType = $('input[name="enq330graph"]:checked').val();
    var graphLabel = document.getElementsByName('enq330graphLabel');
    var graphValue = document.getElementsByName('enq330graphValue');
    if (graphLabel == null || graphLabel.length == 0) {
        return;
    }

    if (graphType == 0 || graphType == 1) {
        var graphList = [[]];
        var gphIdx = 0;
        if (graphType == 0) {
            graphList[0][0] = [parseInt(document.forms[0].enq330graphValueNoAns.value), document.forms[0].enq330graphLabelNoAns.value];
            gphIdx = 1;
        }
        for (dataIdx = graphLabel.length - 1; dataIdx >= 0; dataIdx--) {
            graphList[0][gphIdx++] = [parseInt(graphValue[dataIdx].value), graphLabel[ dataIdx].value];
        }
        jQuery . jqplot(
              'enq330GraphArea',
              graphList,
              {
                  axes: {
                      yaxis: {
                          renderer: jQuery . jqplot . CategoryAxisRenderer
                      }
                  },
                  seriesDefaults: {
                      renderer: jQuery . jqplot . BarRenderer,
                      rendererOptions: {
                          barDirection: 'horizontal',
                          varyBarColor: true
                      }
                  }
              }
        );
    } else if (graphType == 2 || graphType == 3) {
        var graphList = [[]];
        var gphIdx;
        for (gphIdx = 0; gphIdx < graphLabel.length; gphIdx++) {
            graphList[0][gphIdx] = [graphLabel[ gphIdx].value, parseInt(graphValue[gphIdx].value)];
        }
        if (graphType == 2) {
          graphList[0][gphIdx] = [document.forms[0].enq330graphLabelNoAns.value, parseInt(document.forms[0].enq330graphValueNoAns.value)];
        }

        jQuery . jqplot(
            'enq330GraphArea',
            graphList,
            {
                seriesDefaults: {
                    renderer: jQuery . jqplot . PieRenderer,
                    rendererOptions: {
                        padding: 5,
                        showDataLabels: true
                    }
                },
                legend: { show:true, location: 'e', placement: 'inside'}
            }
        );
    }
} );

function setInit() {
    enq330basicDetail();
}

function enqClickTitle(sortKey, order) {
    document.forms[0].CMD.value='init';
    document.forms[0].enq330sortKey.value=sortKey;
    document.forms[0].enq330order.value=order;
    document.forms[0].enq330scrollQuestonFlg.value = '2';
    document.forms[0].submit();
    return false;
}

function enq330changeGraph() {
    var enq330Form = document.forms['enq330Form'];
    if ($('input[name="enq330graph"]:checked').val() == enq330Form.enq330graphBf.value) {
        return;
    }
    enq330Form.enq330scrollQuestonFlg.value = '1';
    return buttonPush('changeGraph');
}

function enq330changePage(id){
    if (id == 0) {
        document.forms[0].enq330pageBottom.value=document.forms[0].enq330pageTop.value;
    } else {
        document.forms[0].enq330pageTop.value=document.forms[0].enq330pageBottom.value;
    }

    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function enq330basicDetail() {
    if (document.forms[0].enq330viewDetailFlg.value == 1) {
        $('#enq330detailArea').removeClass('display_n');
        $('#enq330detailArea1').addClass('display_n');
        $('#enq330detailArea_htmlframe').get(0).resizeIframe();

    } else {
        $('#enq330detailArea').addClass('display_n');
        $('#enq330detailArea1').removeClass('display_n');
    }
}

function enq330changeBasicDetail(viewDetail) {
    document.forms[0].enq330viewDetailFlg.value = viewDetail;
    enq330basicDetail();
}

/**
 * 詮索条件 回答の表示切替
 * @param {} initType
 * @returns {}
 */
function changeSearchArea(rangeType) {
    if (rangeType == 0) {
        enq330ChangeArea('enq330ansNumKbn', 'enq330SearchArea');
    }
}

function enq330ChangeArea(paramName, areaId) {
    if ($('input[name="' + paramName + '"]:checked').val() == 1) {
        $('#' + areaId).show();
    } else {
        $('#' + areaId).hide();
    }
}

$(function() {
    /* hover */
   $('.js_listHover').on({
       mouseenter:function (e) {
           $(this).children().addClass("list_content-on");
           $(this).prev().children().addClass("list_content-topBorder");
       },
       mouseleave:function (e) {
           $(this).children().removeClass("list_content-on");
           $(this).prev().children().removeClass("list_content-topBorder");
       }
   });
});
