/**
 *
 */
$(function() {
  //SortingSelectプラグインの機能を部分的に差し替え
  var protoSortingSelect = $.fn.ui_sortingselector;
  $.fn.ui_sortingselector = function(option, e) {
    if (option.cmd == 'selectedClick') {
      var clicked = $(this);
      var multiselector = $(this).closest('.js_multiselector');
      var targetselector = $(this).closest('.js_multiselector_select');
      var selection = multiselector.find('.js_multiselector_noselectbody');

      if (multiselector.data('multiselector_target') != targetselector.attr('name')) {
        return protoSortingSelect.call($(this), option, e);
      }
      if ($(multiselector).is('.js_multiselector_exec')) {
        return protoSortingSelect.call($(this), option, e);
      }
      //並び替えモードではない
      if (multiselector.find('.js_multiselector_sortingFlg:checked').length == 0) {
        //メインプラグインは削除不可
        if (clicked.children('input[type="hidden"][value="main"]').length > 0) {
          return $(this);
        }
        return protoSortingSelect.call($(this), option, e);
      }
    }
    //全削除
    if (option.cmd == 'alldelete') {
        var multiselector = $(this).closest('.js_multiselector');
        var targetselector = multiselector.find('.js_multiselector_select[name="'+ multiselector.data('multiselector_target') +'"]');
        var selection = multiselector.find('.js_multiselector_noselectbody');

        if (targetselector.children().length == 0) {
          return protoSortingSelect.call($(this), option, e);
        }
        if ($(multiselector).is('.js_multiselector_exec')) {
          return protoSortingSelect.call($(this), option, e);
        }

        var selected = targetselector.find('.js_multiselector_selected');
        selected.children().each(function() {
          if ($(this).children('input[type="hidden"][value="main"]').length == 0) {
            $(this).remove();
          }
        });
        protoSortingSelect.call(selection, {cmd:'selectionReload', onload:function() {multiselector.trigger('change');}}, e);

    }
    //追加
    if (option.cmd == 'select') {
        return protoSortingSelect.call(
          this,
          {
            cmd:'select',
             onload: function() {
                $(this).ui_sortingselector({cmd:'sortingChange'}, e);
             }
          },
          e);
    }
    //全て選択
    if (option.cmd == 'allselect') {
        return protoSortingSelect.call(
          this,
          {
            cmd:'allselect',
             onload: function() {
                $(this).ui_sortingselector({cmd:'sortingChange'}, e);
             }
          },
          e);

    }

    //並び替えモード切り替え
    if (option.cmd == 'sortingChange') {
        var multiselector = $(this).closest('.js_multiselector');
        var checkbox = multiselector.find('.js_multiselector_sortingFlg');
        if (checkbox.is(':checked')) {
            multiselector.find('.js_multiselector_selectchild').each(function() {
              if ($(this).children('input[type="hidden"][value="main"]').length > 0) {
                $(this).addClass("content-hoverChange");
                $(this).removeClass("cursor_d");
              }
            });
        } else {
            multiselector.find('.js_multiselector_selectchild').each(function() {
              if ($(this).children('input[type="hidden"][value="main"]').length > 0) {
                $(this).removeClass("content-hoverChange");
                $(this).addClass("cursor_d");
              }
            });

        }

        return protoSortingSelect.call($(this), option, e);

    }

    return protoSortingSelect.call($(this), option, e);
  }

  //SortingSelectプラグインに選択イベントを挿入
  $('[name="cmn140viewMenuUI"]').change(
    function () {
      var formData = $(this).closest('form').serializeArray();
      formData = formData.filter(param => param.name != 'CMD');
      formData.push({name:'CMD', value:'select'});

      $.ajax({
          async: true,
          url:"../common/cmn140.do",
          type: "post",
          data: formData
      }).done(function( data ) {
        window.parent.menu.location='../common/cmn003.do';
      });
    }
  );

});
