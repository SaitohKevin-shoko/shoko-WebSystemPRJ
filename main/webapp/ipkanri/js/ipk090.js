$(function () {
    /* タブ変更 */
    $('.js_tab').live("click", function(){
        var showId = $(this).attr('id');
        $('#tab1_table').addClass('display_none');
        $('#tab2_table').addClass('display_none');
        $('#tab3_table').addClass('display_none');
        $('#tab1').addClass('tabHeader_tab-off');
        $('#tab2').addClass('tabHeader_tab-off');
        $('#tab3').addClass('tabHeader_tab-off');
        $('#tab1').removeClass('tabHeader_tab-on');
        $('#tab2').removeClass('tabHeader_tab-on');
        $('#tab3').removeClass('tabHeader_tab-on');
        $('#' + showId + '_table').removeClass('display_none');
        $('#' + showId).removeClass('tabHeader_tab-off');
        $('#' + showId).addClass('tabHeader_tab-on');
    });

    if ($('input:hidden[name=specKbn]').val() == 2) {
       $('#tab1_table').addClass('display_none');
         $('#tab2_table').addClass('display_none');
         $('#tab3_table').addClass('display_none');
         $('#tab1').addClass('tabHeader_tab-off');
         $('#tab2').addClass('tabHeader_tab-off');
         $('#tab3').addClass('tabHeader_tab-off');
         $('#tab1').removeClass('tabHeader_tab-on');
         $('#tab2').removeClass('tabHeader_tab-on');
         $('#tab3').removeClass('tabHeader_tab-on');
          $('#tab2_table').removeClass('display_none');
          $('#tab2').removeClass('tabHeader_tab-off');
          $('#tab2').addClass('tabHeader_tab-on');
    }
    if ($('input:hidden[name=specKbn]').val() == 3) {
       $('#tab1_table').addClass('display_none');
         $('#tab2_table').addClass('display_none');
         $('#tab3_table').addClass('display_none');
         $('#tab1').addClass('tabHeader_tab-off');
         $('#tab2').addClass('tabHeader_tab-off');
         $('#tab3').addClass('tabHeader_tab-off');
         $('#tab1').removeClass('tabHeader_tab-on');
         $('#tab2').removeClass('tabHeader_tab-on');
         $('#tab3').removeClass('tabHeader_tab-on');
          $('#tab3_table').removeClass('display_none');
          $('#tab3').removeClass('tabHeader_tab-off');
          $('#tab3').addClass('tabHeader_tab-on');
    }

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

    /* hover:click */
    $(".js_listClick").live("click", function(){
        var sid = $(this).parent().attr("id");
        ipk090ButtonPush('specMstEdit','2',sid);
    });

});