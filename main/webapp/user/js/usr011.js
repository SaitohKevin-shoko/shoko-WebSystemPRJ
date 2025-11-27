const usr011DefGroupUserSidList = [];

$(function() {
    //SortingSelectプラグインの機能を部分的に差し替え
    //ユーザ所属選択について選択解除できないユーザに対応する
    var protoUserSelect = $.fn.ui_multiselector;

    /** 
     * 選択解除できないユーザについて表示設定用関数
     */
    function initImutableSelect() {
        //組み込み用
        $(this).find('.js_multiselector_selectchild').each(function() {
            if (usr011DefGroupUserSidList.includes(Number($(this).find('input[type="hidden"]').val()))) {
                $(this).removeClass('content-hoverChange');
                $(this).addClass('cursor_d');
                $(this).addClass('pos_rel');
                $(this).addClass('opacity6');
                $(this).addClass('bgC_gray');

            }
        });
    } ;
    /** 
     * 選択解除できないユーザについて表示設定用関数
     * 詳細検索用
     */
    function initImutableSelectForSearch() {
        $(this).find('.js_multiselector_selected').children().each(function() {
            if (usr011DefGroupUserSidList.includes(Number($(this).find('input[type="hidden"]').val()))) {
                $(this).removeClass('content-hoverChange');
                $(this).addClass('pos_rel');
                $(this).addClass('opacity6');
                $(this).addClass('bgC_gray');
                $(this).children('.js_selectedContent').removeClass('content-hoverChange');
                $(this).children('.js_selectedContent').addClass('cursor_d');
                $(this).children('.js_userInfo').addClass('cursor_p');
            }
        });
    }
    $(document).on('change', '.js_multiselector', function(e) {
        var multiselector = $(this);
        var subform =  multiselector.find('.js_multiselector_selected');
        if ($(e.target).is('.js_multiselector')) {
            if (multiselector.closest('.js_multiSelectorDialog').length > 0) {
                initImutableSelectForSearch.call(this);

            } else {
                initImutableSelect.call(this);
            }
        }
    });


    $.fn.ui_multiselector = function(option, e) {

        //グループ管理者選択では選択解除できないユーザについて動作しないようにする
        if ($(this).closest('[data-multiselector_init]').is('[name=usr011GroupAdminUI]')) {
            return protoUserSelect.call($(this), option, e);
        }
        //選択済み要素描画時に選択解除できないユーザについて表示設定
        if (option && option.cmd == 'init') {
            option.onloaded = initImutableSelect;
        }


        if (option.cmd == 'delete'
            || option.cmd == 'delete_search') {
            var clicked = $(this);
            var multiselector = $(this).closest('.js_multiselector');
            var targetselector = $(this).closest('.js_multiselector_select');
            var selection = multiselector.find('.js_multiselector_noselectbody');

            if (multiselector.data('multiselector_target') != targetselector.attr('name')) {
                return protoUserSelect.call($(this), option, e);
            }
            if (!usr011DefGroupUserSidList.includes(Number($(this).find('input').val()))) {
                return protoUserSelect.call($(this), option, e);
            }
            displayToast('toastUserSelDelError');
            return;
        }
        //全削除
        if (option.cmd == 'alldelete'
            || option.cmd == 'alldelete_search') {
            var multiselector = $(this).closest('.js_multiselector');
            var targetselector = multiselector.find('.js_multiselector_select[name="'+ multiselector.data('multiselector_target') +'"]');
            var selection = multiselector.find('.js_multiselector_noselectbody');

            if (targetselector.children().length == 0) {
            return protoUserSelect.call($(this), option, e);
            }
            if ($(multiselector).is('.js_multiselector_exec')) {
            return protoUserSelect.call($(this), option, e);
            }

            var selected = targetselector.find('.js_multiselector_selected');
            selected.children().each(function() {
                if (!usr011DefGroupUserSidList.includes(Number($(this).find('input').val()))) {
                    $(this).remove();
                }

            });
            protoUserSelect.call(selection, {cmd:'selectionReload', onload:function() {multiselector.trigger('change');}}, e);

        }

        return protoUserSelect.call($(this), option, e);
    }

    $('fieldset[name="usr011GroupUserUI"]').on('change', function() {
      $('fieldset[name="usr011GroupAdminUI"]').ui_multiselector({cmd:'init'});
    });
});

function usr011ChahgeCbx(form, exekbn) {
    document.forms[0].CMD.value = "change";
    document.forms[0].submit()
}

function pushDell(setMode) {
   document.forms[0].usr011DelKbn.value = setMode;
}

function getChgctg(){

    sizeAry = ctgFrame.document.getElementsByName('c1');
    for(i=0;i<sizeAry.length;i++) {
        if(sizeAry[i].checked){
        document.forms[0].selectgroup.value = sizeAry[i].value;
        }
    }
}

/**
 * �e��ʂɖ߂�ۂɃA�N�V�����ɃR�}���h��n���ꍇ
 * cmd �R�}���h
 */
function openGroupWindowForUsr011(formOj, selBoxName, myGpFlg, cmd) {
    if (cmd != "") {
        document.forms[0].CMD.value=cmd;
    }
    openGroup(formOj, selBoxName, myGpFlg, "");
    getChgctg();
    return;
}
function getBfsids(){
    var svName = "sv_users";
    var svBfName ="sv_Bfusers";
    $("[name='" + svBfName + "']").remove();
    $("[name='" + svName + "']").each(function(){
        if (this.value != null && this.value != "") {
            $('<input type="hidden" name="' + svBfName + '" value="' + this.value + '">').appendTo("form");
        }
    });
    return;
}