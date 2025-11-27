function setParentLabel() {
    var CMD = parent.document.getElementsByName('CMD');
    CMD[0].value = 'bmk040ok';

    var labelParam = '';
    var labelName = '';
    var selectLabel = document.forms['bmk040Form'].bmk040selectLabel;

    if (selectLabel != null) {
        if (selectLabel.type == 'checkbox') {
            if (selectLabel.checked == true) {
                labelName = selectLabel.value;
            }
        } else {
            for (index = 0; index < selectLabel.length; index++) {
                if (selectLabel[index].checked == true) {
                    labelName = labelName + selectLabel[index].value + " ";
                }
            }
        }

    }

    labelParam = addLabelParam(labelParam, labelName);
    labelSelectClose(false);
    parent.document.getElementById('bmk040labelArea').innerHTML = labelParam;
    parent.document.forms[0].submit();
}

function getParentLabelName() {
    return document.forms['bmk040Form'].bmk040parentLabelName.value;
}

function addLabelParam(paramString, labelValue) {
    var parentLabelName = getParentLabelName();
    paramString += '<input type="hidden" name="'
    paramString += parentLabelName;
    paramString += '" value="' + labelValue + '">';
    return paramString;
}

function labelSelectClose(innerflg) {
    clearScreenParent(innerflg);
    window.parent.jQuery('#labelPanel').dialog('close');
    parentEnable();
}

function pushCancel(innerflg) {
    var CMD = parent.document.getElementsByName('CMD');
    CMD[0].value = 'bmk040cancel';
    labelSelectClose(innerflg);
    parent.document.forms[0].submit();
}

function parentReadOnly() {
    setAllReadOnly(parent.document, true);
}

function parentEnable() {
    setAllReadOnly(parent.document, false);
}

$(function() {
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
      if (check.attr('checked')) {
            check.attr('checked',false);
        } else {
            check.attr('checked',true);
        }
    });
});
