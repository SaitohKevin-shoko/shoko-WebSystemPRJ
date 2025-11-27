function selectPage(id){
    if (id == 1) {
        $('[name=wml230mailListPageTop]').val($('[name=wml230mailListPageBottom]').val());
    } else {
        $('[name=wml230mailListPageBottom]').val($('[name=wml230mailListPageTop]').val());
    }

    return buttonPush('init');
}

function changeFilterInput() {
    var index;
    for (index = 1; index <= 5; index++) {
        if (getElement('wml230condition' + index).checked) {
            getElement('wml230conditionType' + index).disabled = false;
            getElement('wml230conditionExs' + index).disabled = false;
            getElement('wml230conditionText' + index).disabled = false;
        } else {
            getElement('wml230conditionType' + index).disabled = true;
            getElement('wml230conditionExs' + index).disabled = true;
            getElement('wml230conditionText' + index).disabled = true;
        }
    }
}
function getElement(name) {
    return document.getElementsByName(name)[0];
}

function wml230Sort(sortKey, order) {
    document.getElementsByName('wml230mailListSortKey')[0].value = sortKey;
    document.getElementsByName('wml230mailListOrder')[0].value = order;
    document.forms[0].submit();
    return false;
}

function deleteFwAddress(rowIdx) {
    document.forms['wml230Form'].wml230actionSendValueDelIdx.value=rowIdx;
    return buttonPush('delFwAddress');
}

function deleteLabel(elem) {
    let labelDiv = $(elem).closest(".js_labelData").parent();
    let parent = $(elem).closest(".js_labelData");
    parent.remove();

    if ($(".js_labelData") == null || $(".js_labelData").length == 0) {
        labelDiv.remove();
    }
}

function showLabelPanel() {
    let selectValues = [];
    $("input[name='wml230actionLabelValue']").each(function() {
        selectValues.push($(this).val());
    });

    $(".js_labelSelect:checked").each(function() {
        if (!selectValues.includes($(this).val())) {
            $(this).prop("checked", false);
        }
    });
    $(".js_labelSelect:not(checked)").each(function() {
        if (selectValues.includes($(this).val())) {
            $(this).prop("checked", true);
        }
    });
    $('#labelPanel').dialog({
        modal: true,
        title:'ラベルを選択してください',
        autoOpen: true,  // hide dialog
        resizable: false,
        height: '340',
        width: '360',
        overlay : {
            backgroundColor : '#000000',
            opacity : 0.5
        }
    });
}

function hideLabelPanel() {
    $('#labelPanel').dialog('close');
}

function selectLabel() {
    $(".js_labelData").remove();
    if ($(".js_labelSelect:checked") == null || $(".js_labelSelect:checked").length == 0) {
        return;
    }
    let addHtml = `<div class="mt5">`;
    $(".js_labelSelect:checked").each(function() {
        addHtml += `
            <span class="js_labelData"><!--
                --><span class="baseLabel mr3">${$(this).attr("data-labelname")}</span><!--
                --><img class="btn_originalImg-display cursor_p mr5" src="../common/images/original/icon_delete.png" alt="trash" onclick="deleteLabel(this);"><!--
                --><img class="btn_classicImg-display cursor_p mr5" src="../common/images/classic/icon_delete.png" alt="trash" onclick="deleteLabel(this);"><!--
                --><input type="hidden" name="wml230actionLabelValue" value="${$(this).val()}"><!--
            !--></span>
        `;
    });
    addHtml += `</div>`;
    $(".js_labelArea").append(addHtml);
    hideLabelPanel();
}

$(function(){

    /* hover */
    $('.js_mailListHover').live({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    });

    /* hover:click */
    $(".js_mailListClick").live("click", function(){
        var sid = $(this).parent().data("sid");
        openDetail(sid);
    });
});