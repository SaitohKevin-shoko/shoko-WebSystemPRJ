var projectSubWindow;

function openProjectWindow(parentPageId) {
    var winWidth=900;
    var winHeight=700;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var url = '../project/prj210.do';
    url += '?prj210parentPageId=' + parentPageId;
    var opt = 'width=' + winWidth + ', height=' + winHeight + ', resizable=yes , toolbar=no ,' +
    'resizable=no , left=' + winx + ', top=' + winy + ',scrollbars=yes';
    projectSubWindow = window.open(url, 'thissite', opt);
    return false;
}

function projectWindowClose() {
    if(projectSubWindow != null){
        projectSubWindow.close();
    }
}

function getCenterX(winWidth) {
  var x = (screen.width - winWidth) / 2;
  return x;
}

function getCenterY(winHeight) {
  var y = (screen.height - winHeight) / 2;
  return y;
}

function selectKoukaiKbn(kbn) {
    document.forms[0].CMD.value='init';
    document.forms[0].prj210KoukaiKbn.value=kbn;
    document.forms[0].submit();
    return false;
}

function selectProgress(kbn) {
    document.forms[0].CMD.value='init';
    document.forms[0].prj210Progress.value=kbn;
    document.forms[0].submit();
    return false;
}

function parentReload() {

    var parentDocument = window.opener.document;
    parentDocument.forms[0].CMD.value = 'selectedProject';

    var parentId = document.forms['prj210Form'].prj210parentPageId.value;

    var prjSid = document.getElementsByName('prj210selectProject');
    if (prjSid == null) {
        window.close();
        return false;
    }

    for (index = 0; index < prjSid.length; index++) {
        if (prjSid[index].checked == true) {
            addParentParam(parentId + 'ProjectIdArea',
                           parentId + 'ProjectSid',
                           encodeURIComponent(prjSid[index].value));
        }
    }

    parentDocument.forms[0].submit();
    return false;
}

function getParentParam(paramName) {
    return window.opener.document.getElementsByName(paramName)[0].value;
}

function setParentParam(paramName, value) {
    window.opener.document.getElementsByName(paramName)[0].value = value;
}

function addParentParam(parentAreaId, paramName, value) {
    var parentArea = window.opener.document.getElementById(parentAreaId);
    var paramHtml = parentArea.innerHTML;
    paramHtml += '<input type="hidden" name="' + paramName + '" value="' + value + '">';
    parentArea.innerHTML = paramHtml;
}

function selectProject() {
    var prjRadio = document.getElementsByName('prj210selectProject');
    if (prjRadio != null) {
        for (index = 0; index < prjRadio.length; index++) {
            if (prjRadio[index].checked == true) {
               var paramName = 'prj210selectProjectName' + prjRadio[index].value;
               var prjParam = prjRadio[index].value.split(':');
               viewTanto(prjParam[0], prjParam[1],
                         document.getElementsByName(paramName)[0].value);
               break;
            }
        }
    }
}

function onTitleLinkSubmit(sortKey, order) {
    document.forms[0].prj210sort.value = sortKey;
    document.forms[0].prj210order.value = order;
    document.forms[0].submit();
    return false;
}

$(function(){

    /* hover */
    $('.js_listHover').live({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    });

    $('.js_radio').live("click", function(e){
      var check = $(this).parent().children('.js_tableTopCheck').children('.check');
      console.log(check);
      if (check.attr('checked')) {
            check.attr('checked',false);
        } else {
            check.attr('checked',true);
        }
    });

});

