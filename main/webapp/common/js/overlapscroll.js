/**
 *
 */
;(function($) {

  if ($.fn.overrapscroll) {
      //読み込み済みの場合何もしない
      return;
  }
  $.fn.overlapscroll = function() {

  }

  $(function() {

     //つまみマウスオン
     $(document).on(
        "mousedown",
        '.js_overlapscroll_thumb',
        function (event) {
          var scrollbar = $(this).closest('.overlapscroll_track');
          var scroll = scrollbar.prev();
          scroll.data('scrollbar_thumb_cursor_Y',
            event.pageY - this.getBoundingClientRect().top);
          $(document).data('overlapscroll_thumb', $(this));
          scrollbar.addClass('overlapscroll_track-drag');
        }
      );
     //つまみドラッグによるスクロール
     $(document).on(
        "mousemove",
        function (event) {
          if (!$(document).data('overlapscroll_thumb')) {
            return;
          }

          event.preventDefault();

          var Thumb = $(document).data('overlapscroll_thumb');
          var scrollbar = Thumb.closest('.overlapscroll_track');
          var scroll = scrollbar.prev();

          var scrollableHeight = scroll.get(0).clientHeight;
          var totalHeight = scroll.get(0).scrollHeight;
          var thambHeight = parseInt((scrollableHeight * scrollableHeight) / totalHeight);
          var scrollbarTrack = scrollableHeight - thambHeight;

          var scrollbar_thumb_Y =
            ((event.pageY - scrollbar.get(0).getBoundingClientRect().top) / scrollbarTrack) *
            scrollbarTrack -
            scroll.data('scrollbar_thumb_cursor_Y');
          var calc =
            (totalHeight - scrollableHeight) / (scrollableHeight - thambHeight);
          var yy = scrollbar_thumb_Y * calc;
          if (scrollbar_thumb_Y < 0) {
             scrollbar_thumb_Y=0;
          } else if (scrollbar_thumb_Y> scrollbarTrack) {
            scrollbar_thumb_Y = scrollbarTrack;
          }
          Thumb.get(0).style.transform = "translateY(" + scrollbar_thumb_Y + "px)";
          scroll.get(0).scrollTop = yy;
          scroll.data('scrollbar_dragmove', true);
        }
      );
     //つまみドラッグ解除
     $(document).on(
        "mouseup",
         function (event) {
        if (!$(document).data('overlapscroll_thumb')) {
          return;
        }
        var Thumb = $(document).data('overlapscroll_thumb');
        var scrollbar = Thumb.closest('.overlapscroll_track');
        var scroll = scrollbar.prev();
        scrollbar.removeClass('overlapscroll_track-drag');

        $(document).removeData('overlapscroll_thumb');
        scroll.removeData('scrollbar_dragmove');

      });
     //つまみクリック時（つまみドラッグ解除によるクリック誤動作抑制）
     $(document).on(
        "click",
        '.js_overlapscroll_thumb',
        function (event) {
          event.stopPropagation();
          return false;
          });


     //スクロールバークリック時
     $(document).on(
        "click",
        '.js_overlapscroll_track',
        function (event) {
          var scroll = $(this).prev();
          var scrollbar  = $(this);
          var Thumb  = scrollbar.find('.js_overlapscroll_thumb');
          var scrollableHeight = scroll.get(0).clientHeight;
          var totalHeight = scroll.get(0).scrollHeight;
          var thambHeight = parseInt((scrollableHeight * scrollableHeight) / totalHeight);
          var scrollbarTrack = scrollableHeight - thambHeight;

          event.preventDefault();
          var calc = event.offsetY - thambHeight / 2;
          var scrollbar_thumb_Y = event.offsetY;
          var elemElem = scrollbar_thumb_Y - thambHeight / 2;
          var calc =
          (totalHeight - scrollableHeight) / (scrollableHeight - thambHeight);
          var yy = elemElem * calc;
          if (elemElem < 0) { elemElem=0; } else if (elemElem> scrollbarTrack) {
            elemElem = scrollbarTrack;
          }
          Thumb.get(0).style.transform = "translateY(" + elemElem + "px)";
          scroll.get(0).scrollTop = yy;

        }
      );

      //スクロールイベントはバブリングしないため
      //ドキュメントにonで設定できない
      //ホバー中のみ要素内で動作するように
      //スクロール発生時にThumbの位置を移動
      function scrEv(event)  {
          var scroll = $(this);
          var scrollbar  = scroll.next();
          var Thumb  = scrollbar.find('.js_overlapscroll_thumb');
          var scrollableHeight = scroll.get(0).clientHeight;
          var totalHeight = scroll.get(0).scrollHeight;
          var thambHeight = parseInt((scrollableHeight * scrollableHeight) / totalHeight);
          var scrollbarTrack = scrollableHeight - thambHeight;

          var y =
          (scroll.get(0).scrollTop * scrollbarTrack) /
          (totalHeight - scrollableHeight);
          Thumb.get(0).style.transform = "translateY(" + y + "px)";
      }

      //ホバー時にスクロール表示
      $(document).on('mouseenter', '.js_overlapscroll', function(event) {
        var scroll = $(this);
        var scrollableHeight = scroll.get(0).clientHeight;
        var totalHeight = scroll.get(0).scrollHeight;
        var thambHeight = parseInt((scrollableHeight * scrollableHeight) / totalHeight);
        var scrollbarTrack = scrollableHeight - thambHeight;

        //初回スクロール設定
        if (scroll.parent().find('.js_overlapscroll_track').length == 0) {
            scroll.parent().addClass('pos_rel');
            var scrollbar  = $('<div></div>')
              .addClass('js_overlapscroll_track')
              .addClass('overlapscroll_track');
            var Thumb = $('<div></div>')
                  .addClass('js_overlapscroll_thumb')
                  .addClass('overlapscroll_thumb')
                  .addClass('bgC_darkGray');
            scroll.after(scrollbar);
            scrollbar.append(Thumb);

        }
        var scrollbar  = scroll.parent().find('.js_overlapscroll_track');
        var Thumb  = scrollbar.find('.js_overlapscroll_thumb');

        var clientRect = this.getBoundingClientRect();
        var pos = scroll.position();
        scrollbar.get(0).style.height = scrollableHeight + 'px';
        scrollbar.get(0).style.top = parseInt(pos.top) + 'px';
        //スクロールがない場合は非表示
        if (scrollableHeight == totalHeight) {
          scrollbar.addClass('display_none');
        } else {
          scrollbar.removeClass('display_none');
        }

        Thumb.get(0).style.height = thambHeight + 'px';
        var y =
        (scroll.get(0).scrollTop * scrollbarTrack) /
        (totalHeight - scrollableHeight);
        Thumb.get(0).style.transform = "translateY(" + y + "px)";

        scroll.off('scroll', scrEv);
        scroll.on('scroll', scrEv);
      });
  });

})(jQuery);
