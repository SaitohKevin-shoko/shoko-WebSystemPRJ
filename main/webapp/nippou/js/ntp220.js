
function onSelectFromEvent() {
	checkFromTo(1);
	document.forms[0].CMD.value='pageDate';
    document.forms[0].submit();
    return false;
}

function onSelectToEvent() {
	checkFromTo(2);
	document.forms[0].CMD.value='pageDate';
    document.forms[0].submit();
    return false;
}

function checkFromTo(kbn) {
	var fromDate = new Date($("input[name='ntp220DateFrStr']").val());
	var toDate = new Date($("input[name='ntp220DateToStr']").val());
	
	if (fromDate.getTime() > toDate.getTime()) {
	    if (kbn == 1) {
		    $("input[name='ntp220DateToStr']").val($("input[name='ntp220DateFrStr']").val());
	    } else {
		    $("input[name='ntp220DateFrStr']").val($("input[name='ntp220DateToStr']").val());
	    }
	}
}

function changeMode(cmd){
    document.forms[0].ntp220GroupSid.value= "";
    document.forms[0].ntp220SelectUsrSid.value= "";
    $("input[name=ntp220State]").val("-1");
    $("input[name=ntp220AnkenState]").val("-1");
    $("input[name=ntp220NowSelParentId]").val("main");
    $("input[name=ntp220NowSelChildId]").val("");
    document.forms[0].ntp220mode.value= cmd;
    document.forms[0].submit();
    return false;
}

$(function() {
    $(document).on({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    }, '.js_listHover');

    /* 集計グラフ選択 */
    $(".def_graph_title").on("click", function(){

        if ($(this).attr('id') == 0) {
            $("#ankenGraph").removeClass("display_n");
            $(".def_graph_state_label").removeClass("display_n");
            $("#shodanStateGraph").addClass("display_n");
            $("#def_graph_val").val(0);
            $("input[name=def_graph_title]").val(0);
            $(".js_bunsekiKingaku").removeClass("cl_fontWeek");
            $(".js_bunsekiSyodanKekkka").addClass("cl_fontWeek");
        } else {
            $("#ankenGraph").addClass("display_n");
            $(".def_graph_state_label").addClass("display_n");
            $("#shodanStateGraph").removeClass("display_n");
            $("#def_graph_val").val(1);
            $("input[name=def_graph_title]").val(1);
            $(".js_bunsekiKingaku").addClass("cl_fontWeek");
            $(".js_bunsekiSyodanKekkka").removeClass("cl_fontWeek");
        }

        setWaitAnkenGraphArea();
        drawAnkenGraph();

    });


    /* メニュー選択 */
    $(".toukei_option").on("click", function(){

        resetParam();
        $(".toukei_option").removeClass('sel_menu_area_sel');
        $(".toukei_option").removeClass('bgC_select');

        $('.anything_area').parent().addClass('display_n');
        $('.anything_child_area').parent().addClass('display_n');
        $('.anything_kadou_area').parent().addClass('display_n');
        $('.anything_kadou_child_area').parent().addClass('display_n');

        if ($(this).next().css('display') == "none") {

            $(this).addClass('bgC_select');
            $(this).parent().addClass('sel_menu_area_sel');
            $(".js_selMenuContent").addClass('display_n');
            $(".js_selMenuContentGyoushu").addClass('display_n');

            //集計画面処理
            resetStateLabel();
            $("input[name=ntp220NowSelParentId]").val($(this).attr('id'));
            $("input[name=ntp220NowSelChildId]").val("");
            anythingDispSet($(this).attr('id'));

            //メニュー項目取得
            $("#" + $(this).attr('id') + "_offset").val(1);

            setWaitAnythingArea($(this).attr('id'));

            showMenuList($(this), $(this).attr('id'));
            setTimeout('redrawAllGraph2("' + $(this).attr('id') + '")',500);

            $('.anken_list_other').addClass('display_n');
            $('.anken_list_' + $(this).attr('id')).removeClass('display_n');
            $("input[name=ankenListOther]").val(getListNumber($(this).attr('id')));
            $("#ankenListOther").val(getListNumber($(this).attr('id')));

            $(this).next().removeClass('display_n');

        } else {

            $(this).next().addClass('display_n');
            $(".js_selMenuContent").addClass('display_n');

            //集計画面処理
            $('.anything_area').parent().addClass('display_n');
            $('.anything_kadou_area').parent().addClass('display_n');
            $('.anything_child_area').parent().addClass('display_n');
            setWaitDefGraphArea();
            $('.def_graph').removeClass('display_n');
            resetStateLabel();
            $("input[name=ntp220NowSelParentId]").val("main");
            $("input[name=ntp220NowSelChildId]").val("");
            $("#" + $(this).attr('id') + "_already_sel").val("");
            setTimeout('redrawAllGraph()',500);

        }
    });

    /* メニュー 項目 もっと表示する*/
    $(document).on("click", ".sel_menu_content_text_more", function(){
        showMenuList($(this), $(this).attr('id'));
    });

    /* メニュー 子要素 選択 */
    $(document).on("click", ".sel_menu_content_text", function(){

          resetParam();
          resetStateLabel();

          if ($(this).attr('id') == $("input[name=ntp220NowSelChildId]").val()) {
              $("input[name=ntp220NowSelChildId]").val("");
              $(".child_sel_content_head_title").html("");
              $('.anything_child_area').parent().addClass('display_n');
              $('.anything_kadou_child_area').parent().addClass('display_n');
              anythingChildDispSet($("input[name=ntp220NowSelParentId]").val());
              $(".sel_menu_content_text").removeClass("sel_menu_content_text_sel");
              anythingAllGraph();
              redrawAnkenDataArea();
          } else {
              anythingChildDispSet2($("input[name=ntp220NowSelParentId]").val());
              $('.anything_area').parent().addClass('display_n');
              $('.anything_kadou_area').parent().addClass('display_n');
              $('.def_graph').addClass('display_n');
              $(".sel_menu_content_text").removeClass("sel_menu_content_text_sel");
              $("input[name=ntp220NowSelChildId]").val($(this).attr('id'));
              $(".child_sel_content_head_title").html(htmlEscape($(this).children().val().replace("<br>", "&nbsp;")));
              $(this).addClass("sel_menu_content_text_sel");
              showKadouDetailArea();
              anythingChildAllGraph();
          }
    });

    /* 個人 メニュー サブコンテンツ選択 */
    $(".sel_menu_content_sub_text").on("click", function(){
        resetParam();
        if ($(this).next().css('display') == "none") {

            $(this).next().removeClass('display_n');
            $(this).addClass("sel_menu_content_sub_text_sel");
            $('.anything_area').parent().addClass('display_n');
            $('.anything_kadou_area').parent().addClass('display_n');
            anythingAllGraph();
            $('.def_graph').addClass('display_n');

        } else {

            $(this).next().addClass('display_n');
            $(this).removeClass("sel_menu_content_sub_text_sel");
            $('.anything_area').parent().addClass('display_n');
            $('.anything_kadou_area').parent().addClass('display_n');
            $('.anything_child_area').parent().addClass('display_n');
            $('.def_graph').removeClass('display_n');
            redrawAllGraph();

        }
    });

    /* メニュー 項目 hover*/
    $(document).on({
        mouseenter:function (e) {
            $(this).addClass("sel_menu_content_text_on");
            $("#tooltip_area").append("<div id=\"ttp\">"+ ($(this).children("span.tooltips").html()) +"</div>");
            $("#ttp")
             .css("position","absolute")
             .css("top",(e.pageY) + 15 + "px")
             .css("left",(e.pageX) + 15 + "px")
             .removeClass('display_n')
             .css("filter","alpha(opacity=85)")
             .fadeIn("fast");
             $(this).addClass("sel_menu_content_text_on");
        },
        mouseleave:function (e) {
            $(this).removeClass("sel_menu_content_text_on");
            $("#ttp").remove();
            $(this).removeClass("sel_menu_content_text_on");
        }
    }, '.sel_menu_content_text');


    /* メニュー 項目 もっと表示する*/
    $(document).on({
        mouseenter:function(){
          $(this).addClass("sel_menu_content_text_more_on");
        },
        mouseleave:function(){
          $(this).removeClass("sel_menu_content_text_more_on");
        }
    }, '.sel_menu_content_text_more');

    /* メニュー 項目 もっと表示する*/
    $(document).on({
        mouseenter:function(){
          $(this).addClass("sel_menu_content_text_more_on");
        },
        mouseleave:function(){
          $(this).removeClass("sel_menu_content_text_more_on");
        }
    }, '.sel_menu_content_text_more2');

    /* Anything1もっと表示する*/
    $(document).on({
        mouseenter:function(){
          $(this).addClass("sel_anything1_more_on");
        },
        mouseleave:function(){
          $(this).removeClass("sel_anything1_more_on");
        }
    }, '.sel_anything1_more');

    /* AnythingKadou1もっと表示する*/
    $(document).on({
        mouseenter:function(){
          $(this).addClass("sel_anythingKadou1_more_on");
        },
        mouseleave:function(){
          $(this).removeClass("sel_anythingKadou1_more_on");
        }
    }, '.sel_anythingKadou1_more');

    /* AnythingKadou2もっと表示する*/
    $(document).on({
        mouseenter:function(){
          $(this).addClass("sel_anythingKadou2_more_on");
        },
        mouseleave:function(){
          $(this).removeClass("sel_anythingKadou2_more_on");
        }
    }, '.sel_anythingKadou2_more');

    /* AnythingKadou3もっと表示する*/
    $(document).on({
        mouseenter:function(){
          $(this).addClass("sel_anythingKadou3_more_on");
        },
        mouseleave:function(){
          $(this).removeClass("sel_anythingKadou3_more_on");
        }
    }, '.sel_anythingKadou3_more');

    /* AnythingKadou4もっと表示する*/
    $(document).on({
        mouseenter:function(){
          $(this).addClass("sel_anythingKadou4_more_on");
        },
        mouseleave:function(){
          $(this).removeClass("sel_anythingKadou4_more_on");
        }
    }, '.sel_anythingKadou4_more');

    /* AnythingKadouChild0もっと表示する*/
    $(document).on({
        mouseenter:function(){
          $(this).addClass("sel_anythingKadouChild0_more_on");
        },
        mouseleave:function(){
          $(this).removeClass("sel_anythingKadouChild0_more_on");
        }
    }, '.sel_anythingKadouChild0_more');

    /* メニュー 項目 検索*/
    $(document).on("click", ".content_search_btn", function(){

        $('#searchBtnResultArea').children().remove();
        $('#searchBtnResultArea').append("<div class=\"ntp_searchResultArea\"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>");

        var contentSid = $(this).attr('id');
        var pageNum   = $("input:hidden[name='ntp220pageNum']").val();
        var searchWord = $(this).prev().val();

        /* 検索結果ポップアップ */
        $('#searchBtnResultPop').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            height: 550,
            width: 400,
            modal: true,
            overlay: {
              backgroundColor: '#000000',
              opacity: 0.5
            },
            buttons: {
              閉じる: function() {
                  $(this).dialog('close');
              }
            }
        });

        //検索結果成形
        getSearchBtnResultList(contentSid, pageNum, searchWord);
    });


    //項目検索結果画面 次ページクリック
    $(document).on("click", ".nextPageBtn", function(){
        var paramStr = $(this).attr('id').split(":");
        getSearchBtnResultList(paramStr[0], parseInt(paramStr[1]) + 1, $("." + paramStr[0] + "_search").val());
    });

    //項目検索結果画面前ページクリック
    $(document).on("click", ".prevPageBtn", function(){
        var paramStr = $(this).attr('id').split(":");
        getSearchBtnResultList(paramStr[0], parseInt(paramStr[1]) - 1, $("." + paramStr[0] + "_search").val());
    });

    //項目検索結果画面  コンボ変更
    $(document).on("change", ".selchange", function(){
        getSearchBtnResultList($(this).attr('id'), $(this).val(), $("." + $(this).attr('id') + "_search").val());
    });



    /* 金額項目 hover*/
    $(document).on({
        mouseenter:function(){
          $(this).addClass("state_label_notsel_text_on");
        },
        mouseleave:function(){
          $(this).removeClass("state_label_notsel_text_on");
        }
    }, '.state_label_notsel_text');


    /* 状態  click*/
    $(document).on("click", '.js_stateLabelSelText', function(){

        setWaitDefGraphArea();
        setWaitAnythingGraphArea();
        setWaitAnythingChildGraphArea();

        resetParam();
        $("select[name='ankenListState']").val($(this).attr('id'));
        $("input[name=ankenListState]").val($(this).attr('id'));
        $(".js_stateLabelSelText").removeClass("bgC_body searchMenu_top bgC_lightGray searchMenu_title-select");
        $(".js_stateLabelSelText").addClass("searchMenu_top bgC_lightGray");
        if ($(this).attr('id') == "-1") {
            $(".sel_label_sel_all").removeClass("searchMenu_top bgC_lightGray");
            $(".sel_label_sel_all").addClass("bgC_body searchMenu_title-select");
        } else if ($(this).attr('id') == "0") {
            $(".sel_label_sel_shodan").removeClass("searchMenu_top bgC_lightGray");
            $(".sel_label_sel_shodan").addClass("bgC_body searchMenu_title-select");
        }  else if ($(this).attr('id') == "1") {
            $(".sel_label_sel_jutyu").removeClass("searchMenu_top bgC_lightGray");
            $(".sel_label_sel_jutyu").addClass("bgC_body searchMenu_title-select");
        }  else if ($(this).attr('id') == "2") {
            $(".sel_label_sel_sityu").removeClass("searchMenu_top bgC_lightGray");
            $(".sel_label_sel_sityu").addClass("bgC_body searchMenu_title-select");
        }

        $("input[name=ntp220AnkenState]").val($(this).attr('id'));
        setTimeout('redrawAllGraph()',500);

    });

    /* メニュー 格納用縦線 click*/
    $(document).on("click", ".toukei_optionClose", function(){

        if ($("#sel_menu_wrapper").css('display') == "none") {

            $('#sel_menu_wrapper').removeClass('display_n');
            $('#menu_length_area').removeClass("menu_length_border_none");

        } else {

            $('#sel_menu_wrapper').addClass('display_n');
            $('#menu_length_area').addClass("menu_length_border_none");

        }

        resetParam();

        setWaitDefGraphArea();
        setWaitAnythingGraphArea();
        setWaitAnythingChildGraphArea();
        setTimeout('redrawAllGraph2("' + $("input[name=ntp220NowSelParentId]").val() + '")',500);
    });

    /* 状態  hover*/
    $(document).on({
        mouseenter:function(){
          $(this).addClass("anken_state_notcheck_on");
        },
        mouseleave:function(){
          $(this).removeClass("anken_state_notcheck_on");
        }
    }, '.anken_state_notcheck');


    /* 状態  click*/
    $(document).on("click", '.anken_state_check', function(){
        //resetParam();
        setWaitDefGraphArea();
        setWaitAnythingGraphArea();
        setWaitAnythingChildGraphArea();

        $(".anken_state_check").removeClass("bgC_body bgC_lightGray searchMenu_top searchMenu_title-select");
        $(".anken_state_check").addClass("bgC_lightGray searchMenu_top");
        $(this).removeClass("bgC_lightGray searchMenu_top");
        $(this).addClass("bgC_body searchMenu_title-select");
        $("input[name=ntp220State]").val($(this).attr('id'));
        redrawAllGraph();
    });

    /* 商談結果グラフ変更クリック*/
    $(document).on("click", "#resultGraphBtn", function(){
        if ($('#resultGraphVal').val() == 0) {
            drawResultGraph();
            $('#resultGraphVal').val('1');
        } else {
            drawResultHorizonGraph();
            $('#resultGraphVal').val('0');
        }
    });

    /* 金額グラフ変更クリック*/
    $(document).on("click", "#shohinGraphBtn", function(){
        if ($('#shohinGraphVal').val() == 0) {
            drawShohinGraph();
            $('#shohinGraphVal').val('1');
        } else {
            drawShohinHorizonGraph();
            $('#shohinGraphVal').val('0');
        }
    });

    /* 活動分類グラフ変更クリック*/
    $(document).on("click", "#kbunruiGraphBtn", function(){
        if ($('#kbunruiGraphVal').val() == 0) {
            drawKbunruiHorizonGraph();
            $('#kbunruiGraphVal').val('1');
        } else {
            drawKbunruiGraph();
            $('#kbunruiGraphVal').val('0');
        }
    });

    /* 活動方法グラフ変更クリック*/
    $(document).on("click", "#khouhouGraphBtn", function(){
        if ($('#khouhouGraphVal').val() == 0) {
            drawKhouhouHorizonGraph();
            $('#khouhouGraphVal').val('1');
        } else {
            drawKhouhouGraph();
            $('#khouhouGraphVal').val('0');
        }
    });

    /* 可変エリアグラフ変更クリック*/
    $(document).on("click", "#anythingGraph1Btn", function(){
        if ($('#anythingGraph1Val').val() == 1) {
            drawAnything1HorizonGraph();
            $('#anythingGraph1Val').val('0');
        } else {
            drawAnything1Graph();
            $('#anythingGraph1Val').val('1');
        }
    });

    /* 可変エリア金額グラフ変更クリック*/
    $(document).on("click", "#anythingGraph2Btn", function(){
        if ($('#anythingGraph2Val').val() == 0) {
            drawAnything2HorizonGraph();
            $('#anythingGraph2Val').val('1');
        } else {
            drawAnything2Graph();
            $('#anythingGraph2Val').val('0');
        }
    });

    /* 可変エリア子要素  結果グラフ変更クリック*/
    $(document).on("click", "#anythingChild0GraphBtn", function(){
        if ($('#anythingChild0GraphVal').val() == 0) {
            drawAnythingChild0Graph();
            $('#anythingChild0GraphVal').val('1');
        } else {
            drawAnythingChild0HorizonGraph();
            $('#anythingChild0GraphVal').val('0');
        }
    });

    /* 可変エリア子要素  結果グラフ変更クリック*/
    $(document).on("click", "#anythingChild1GraphBtn", function(){
        if ($('#anythingChild1GraphVal').val() == 0) {
            drawAnythingChild1Graph();
            $('#anythingChild1GraphVal').val('1');
        } else {
            drawAnythingChild1HorizonGraph();
            $('#anythingChild1GraphVal').val('0');
        }
    });

    /* 可変エリア子要素 金額グラフ変更クリック*/
    $(document).on("click", "#anythingChild2GraphBtn", function(){
        if ($('#anythingChild2GraphVal').val() == 0) {
            drawAnythingChild2Graph();
            $('#anythingChild2GraphVal').val('1');
        } else {
            drawAnythingChild2HorizonGraph();
            $('#anythingChild2GraphVal').val('0');
        }
    });

    /* 可変エリア 案件割合変更クリック*/
    $(document).on("click", "#anythingKadou1GraphBtn", function(){
        if ($('#anythingKadou1GraphVal').val() == 0) {
            drawAnythingKadou1Graph();
            $('#anythingKadou1GraphVal').val('1');
        } else {
            drawAnythingKadou1HorizonGraph();
            $('#anythingKadou1GraphVal').val('0');
        }
    });

    /* 可変エリア 企業割合変更クリック*/
    $(document).on("click", "#anythingKadou2GraphBtn", function(){
        if ($('#anythingKadou2GraphVal').val() == 0) {
            drawAnythingKadou2Graph();
            $('#anythingKadou2GraphVal').val('1');
        } else {
            drawAnythingKadou2HorizonGraph();
            $('#anythingKadou2GraphVal').val('0');
        }
    });

    /* 可変エリア 活動分類割合変更クリック*/
    $(document).on("click", "#anythingKadou3GraphBtn", function(){
        if ($('#anythingKadou3GraphVal').val() == 0) {
            drawAnythingKadou3Graph();
            $('#anythingKadou3GraphVal').val('1');
        } else {
            drawAnythingKadou3HorizonGraph();
            $('#anythingKadou3GraphVal').val('0');
        }
    });

    /* 可変エリア 活動方法割合変更クリック*/
    $(document).on("click", "#anythingKadou4GraphBtn", function(){
        if ($('#anythingKadou4GraphVal').val() == 0) {
            drawAnythingKadou4Graph();
            $('#anythingKadou4GraphVal').val('1');
        } else {
            drawAnythingKadou4HorizonGraph();
            $('#anythingKadou4GraphVal').val('0');
        }
    });


    /* 可変エリア子要素(稼働時間)  グラフ変更クリック*/
    $(document).on("click", "#anythingKadouChild0GraphBtn", function(){
        if ($('#anythingKadouChild0GraphVal').val() == 0) {
            drawAnythingKadouChild0Graph();
            $('#anythingKadouChild0GraphVal').val('1');
        } else {
            drawAnythingKadouChild0HorizonGraph();
            $('#anythingKadouChild0GraphVal').val('0');
        }
    });

    /* 案件情報もっと表示 */
    $(document).on("click", "#ankenDataMore", function(){
        drawAnkenDataArea();
    });

    /* 案件詳細情報(稼働時間)もっと表示 */
    $(document).on("click", "#ankenKadouDataMore", function(){
        drawKadouDetailDataArea();
    });

    /* 企業詳細情報(稼働時間)もっと表示 */
    $(document).on("click", "#kigyouKadouDataMore", function(){
        drawKadouDetailDataArea();
    });

    /* 活動分類詳細情報(稼働時間)もっと表示 */
    $(document).on("click", "#kbunruiKadouDataMore", function(){
        drawKadouDetailDataArea();
    });

    /* 活動方法詳細(稼働時間)もっと表示 */
    $(document).on("click", "#khouhouKadouDataMore", function(){
        drawKadouDetailDataArea();
    });

    /* 案件情報状態変更 */
    $("#ankenListState").change(function () {
        resetPage();
        $("input[name=ankenListState]").val($("#ankenListState option:selected").val());
        $("input[name=ntp220AnkenState]").val($("#ankenListState option:selected").val());
        if ($("#ankenListState option:selected").val() == "-1") {
            $(".sel_label_sel_all").removeClass("state_label_notsel_text");
        } else if ($("#ankenListState option:selected").val() == "0") {
            $(".sel_label_sel_shodan").removeClass("state_label_notsel_text");
        }  else if ($("#ankenListState option:selected").val() == "1") {
            $(".sel_label_sel_jutyu").removeClass("state_label_notsel_text");
        }  else if ($("#ankenListState option:selected").val() == "2") {
            $(".sel_label_sel_sityu").removeClass("state_label_notsel_text");
        }
        redrawAllGraph();
        $('html,body').animate({ scrollTop:$("#tooltip_area").offset().top }, 'slow');
    });


    /* 案件情報状態変更 */
    $("#ankenListMoney").change(function () {
        $("input[name=ankenListMoney]").val($("#ankenListMoney option:selected").val());
        if ($("#ankenListMoney option:selected").val() == 0) {
            $(".anken_list_jutyu").addClass("display_n");
            $(".anken_list_mitumori").removeClass("display_n");
        } else {
            $(".anken_list_mitumori").addClass("display_n");
            $(".anken_list_jutyu").removeClass("display_n");
        }
    });


    /* 案件情報状態変更 */
    $("#ankenKadouListMoney").change(function () {
        $("input[name=ankenKadouListMoney]").val($("#ankenKadouListMoney option:selected").val());
        if ($("#ankenKadouListMoney option:selected").val() == 0) {
            $(".anken_kadou_list_jutyu").addClass("display_n");
            $(".anken_kadou_list_mitumori").removeClass("display_n");
        } else {
            $(".anken_kadou_list_mitumori").addClass("display_n");
            $(".anken_kadou_list_jutyu").removeClass("display_n");
        }
    });


    /* 案件情報その他表示項目変更 */
    $("#ankenListOther").change(function () {
        $("input[name=ankenListOther]").val($("#ankenListOther option:selected").val());
        if ($("#ankenListOther option:selected").val() == 0) {
            $(".anken_list_other").addClass("display_n");
            $(".anken_list_kigyou").removeClass("display_n");
        } else if ($("#ankenListOther option:selected").val() == 1) {
            $(".anken_list_other").addClass("display_n");
            $(".anken_list_shohin").removeClass("display_n");
        } else if ($("#ankenListOther option:selected").val() == 2) {
            $(".anken_list_other").addClass("display_n");
            $(".anken_list_gyoushu").removeClass("display_n");
        } else if ($("#ankenListOther option:selected").val() == 3) {
            $(".anken_list_other").addClass("display_n");
            $(".anken_list_process").removeClass("display_n");
        } else if ($("#ankenListOther option:selected").val() == 4) {
            $(".anken_list_other").addClass("display_n");
            $(".anken_list_mikomido").removeClass("display_n");
        } else if ($("#ankenListOther option:selected").val() == 5) {
            $(".anken_list_other").addClass("display_n");
            $(".anken_list_kokyakugensen").removeClass("display_n");
        } else if ($("#ankenListOther option:selected").val() == 6) {
            $(".anken_list_other").addClass("display_n");
            $(".anken_list_tanto").removeClass("display_n");
        }
    });

    /* 案件情報その他表示項目変更 */
    $("#ankenKadouListOther").change(function () {
        $("input[name=ankenKadouListOther]").val($("#ankenKadouListOther option:selected").val());
        if ($("#ankenKadouListOther option:selected").val() == 0) {
            $(".anken_kadou_list_other").addClass("display_n");
            $(".anken_kadou_list_kigyou").removeClass("display_n");
        } else if ($("#ankenKadouListOther option:selected").val() == 1) {
            $(".anken_kadou_list_other").addClass("display_n");
            $(".anken_kadou_list_shohin").removeClass("display_n");
        } else if ($("#ankenKadouListOther option:selected").val() == 2) {
            $(".anken_kadou_list_other").addClass("display_n");
            $(".anken_kadou_list_gyoushu").removeClass("display_n");
        } else if ($("#ankenKadouListOther option:selected").val() == 3) {
            $(".anken_kadou_list_other").addClass("display_n");
            $(".anken_kadou_list_process").removeClass("display_n");
        } else if ($("#ankenKadouListOther option:selected").val() == 4) {
            $(".anken_kadou_list_other").addClass("display_n");
            $(".anken_kadou_list_mikomido").removeClass("display_n");
        } else if ($("#ankenKadouListOther option:selected").val() == 5) {
            $(".anken_kadou_list_other").addClass("display_n");
            $(".anken_kadou_list_kokyakugensen").removeClass("display_n");
        } else if ($("#ankenKadouListOther option:selected").val() == 6) {
            $(".anken_kadou_list_other").addClass("display_n");
            $(".anken_kadou_list_tanto").removeClass("display_n");
        }
    });


    /* Anything1もっと表示 */
    $("#anything1_more").on("click", function(){
        $("input[name=anything1page]").val(Number($("input[name=anything1page]").val()) + 1);
        drawAnything1HorizonGraph();
    });

    /* AnythingKadou1もっと表示 */
    $("#anythingKadou1_more").on("click", function(){
        $("input[name=anythingKadou1page]").val(Number($("input[name=anythingKadou1page]").val()) + 1);
        drawAnythingKadou1HorizonGraph();
    });

    /* AnythingKadou2もっと表示 */
    $("#anythingKadou2_more").on("click", function(){
        $("input[name=anythingKadou2page]").val(Number($("input[name=anythingKadou2page]").val()) + 1);
        drawAnythingKadou2HorizonGraph();
    });

    /* AnythingKadou3もっと表示 */
    $("#anythingKadou3_more").on("click", function(){
        $("input[name=anythingKadou3page]").val(Number($("input[name=anythingKadou3page]").val()) + 1);
        drawAnythingKadou3HorizonGraph();
    });

    /* AnythingKadou4もっと表示 */
    $("#anythingKadou4_more").on("click", function(){
        $("input[name=anythingKadou4page]").val(Number($("input[name=anythingKadou4page]").val()) + 1);
        drawAnythingKadou4HorizonGraph();
    });

    /* AnythingKadouChild0もっと表示 */
    $("#anythingKadouChild0_more").on("click", function(){
        $("input[name=anythingKadouChild0page]").val(Number($("input[name=anythingKadouChild0page]").val()) + 1);
        drawAnythingKadouChild0HorizonGraph();
    });

    /* ツールチップ*/
    $("span.tooltips").each(function() {
        $(this).addClass('display_n');
    });

    //メニューツールチップ
    $(".sel_menu_content_text:has(span.tooltips)").on("mouseover",function(e){
         $("#tooltip_area").append("<div id=\"ttp\">"+ ($(this).children("span.tooltips").html()) +"</div>");
         $("#ttp")
          .css("position","absolute")
          .css("top",(e.pageY) + -10 + "px")
          .css("left",(e.pageX) + 20 + "px")
          .removeClass('display_n')
          .css("filter","alpha(opacity=85)")
          .fadeIn("fast");
          $(this).addClass("sel_menu_content_text_on");
     }).on("mousemove",function(e){
         $("#ttp")
          .css("top",(e.pageY) + -10 + "px")
          .css("left",(e.pageX) + 20 + "px");
         $(this).addClass("sel_menu_content_text_on");
     }).on("mouseout",function(){
         $("#ttp").remove();
         $(this).removeClass("sel_menu_content_text_on");
     });

    //見積もり金額ツールチップ
    $(document).on("mouseenter", ".mitumori_kin_str", function(e){
        $("#tooltip_area").append("<div id=\"ttp\">"+ ($(this).prev().html()) +"</div>");
        $("#ttp")
         .css("position","absolute")
         .css("top",(e.pageY) - 35 + "px")
         .css("left",(e.pageX) - 100 + "px")
         .removeClass('display_n')
         .css("filter","alpha(opacity=85)")
         .fadeIn("fast");
    }).on("mousemove", ".mitumori_kin_str", function(e){
        $("#ttp")
         .css("top",(e.pageY) - 35 + "px")
         .css("left",(e.pageX) - 100 + "px")
    }).on("mouseleave", ".mitumori_kin_str", function(e){
        $("#ttp").remove();
    });

    //受注金額ツールチップ
    $(document).on("mouseenter", ".jutyu_kin_str", function(e){
        $("#tooltip_area").append("<div id=\"ttp\">"+ ($(this).prev().html()) +"</div>");
        $("#ttp")
         .css("position","absolute")
         .css("top",(e.pageY) - 35 + "px")
         .css("left",(e.pageX) - 100 + "px")
         .removeClass('display_n')
         .css("filter","alpha(opacity=85)")
         .fadeIn("fast");
    }).on("mousemove", ".jutyu_kin_str", function(e){
        $("#ttp")
         .css("top",(e.pageY) - 35 + "px")
         .css("left",(e.pageX) - 100 + "px")
    }).on("mouseleave", ".jutyu_kin_str", function(e){
        $("#ttp").remove();
    });

     //案件情報ポップアップ
     $(document).on("click", ".anken_name_link", function(){
         var ankenSid = $(this).attr("id");
         openSubWindow("../nippou/ntp210.do?ntp210NanSid=" + ankenSid);
     });


     //案件情報ポップアップ
     $(document).on("click", ".anken_name_link_his", function(){
         var ankenHisSid = $(this).attr("id");
         openSubWindow("../nippou/ntp210.do?ntp210HisFlg=1&ntp210NahSid=" + ankenHisSid);
     });

     //企業ポップアップ
     $(document).on("click", ".comp_click", function(){
         var compSid = $(this).attr("id");
         openSubWindow("../address/adr250.do?adr250AcoSid=" + compSid);
     });

     /* 他のカテゴリの商品  hover*/
     $(document).on({
         mouseenter:function(){
           $(this).addClass("other_category_itm_hover");
         },
         mouseleave:function(){
           $(this).removeClass("other_category_itm_hover");
         }
     }, '.other_category_itm');


     /* 状態  click*/
     $(document).on("click", '.other_category_itm', function(){
         if ($(this).next().css("display") == "none") {
             $(this).next().removeClass("display_n");
             $(this).addClass("other_category_itm_sel");
         } else {
             $(this).next().addClass("display_n");
             $(this).removeClass("other_category_itm_sel");
         }
     });

     /* グラフ描画 */
     drawAllGraph();

});


function anythingDispSet(id) {

    if (id != 'kadou') {
        $('.anything_area').parent().removeClass('display_n');
        $('.anything_child_area').parent().addClass('display_n');
    } else {
        $('#kadouArea').removeClass("display_n");
        $('.anything_kadou_area').parent().removeClass('display_n');
        $('#anken_state_menu_area').addClass('display_n');
    }

    $('.def_graph').addClass('display_n');
}

function anythingChildDispSet(id) {

    if (id != 'kadou') {
        $('.anything_area').parent().removeClass('display_n');
        $('.anything_child_area').parent().addClass('display_n');
    } else {
        $('.anything_kadou_area').parent().removeClass('display_n');
        $('#anken_state_menu_area').addClass('display_n');
        $('.category_sel_area').addClass('display_n');
    }
}

function anythingChildDispSet2(id) {

    if (id != 'kadou') {
        $('.anything_child_area').parent().removeClass('display_n');
        $('.anything_area').parent().addClass('display_n');
    } else {
        $('#kadouArea').removeClass("display_n");
        $('.anything_kadou_child_area').parent().removeClass('display_n');
        $('#anken_state_menu_area').addClass('display_n');
        $('#anythingKadouChild0GraphVal').val('0');
    }
}

function setWaitAnkenGraphArea() {

    $('#ankenGraph').remove();
    $('#shodanStateGraph').remove();

    if ($("input[name=def_graph_val]").val() == "0") {
        $('#ankenGraphArea').append('<div id=\"ankenGraph\" class="ntp_defAnkenGraph"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');
    } else {
        $('#ankenGraphArea').append('<div id=\"shodanStateGraph\" class="ntp_defAnkenGraph"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');
    }
}

function setWaitDefGraphArea() {

    $('#ankenGraph').remove();
    $('#shodanStateGraph').remove();
    $('#ankenGraphArea').append('<div id=\"ankenGraph\" class="ntp_defAnkenGraph"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');

    $('#resultGraph').remove();
    $('#resultGraphArea').append('<div id=\"resultGraph\" class="ntp_AnkenGraph"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');

    $('#shohinGraph').remove();
    $('#shohinGraphArea').append('<div id=\"shohinGraph\" class="ntp_AnkenGraph"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');
}

function setWaitAnythingGraphArea() {


    if ($("input[name=ntp220NowSelChildId]").val() == "kadou") {
        $('#anythingGraph1').remove();
        $('#anything1_more').addClass("display_n");
        $('#anythingGraph1Area').append('<div id=\"anythingGraph1\" class="ntp_AnkenGraph"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');
        $('#anythingGraph2').remove();
        $('#anything2_more').addClass("display_n");
        $('#anythingGraph2Area').append('<div id=\"anythingGraph2\" class="ntp_AnkenGraph"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');
    } else {
        $('#kadouGraph').remove();
        $('#kadouGraphArea').append('<div id=\"kadouGraph\" class="ntp_AnkenGraph"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');
        $('#anythingKadouGraph1').remove();
        $('#anythingKadou1_more').addClass("display_n");
        $('#anythingKadouGraph1Area').append('<div id=\"anythingKadouGraph1\" class="ntp_AnkenGraph"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');
        $('#anythingKadouGraph2').remove();
        $('#anythingKadou2_more').addClass("display_n");
        $('#anythingKadouGraph2Area').append('<div id=\"anythingKadouGraph2\" class="ntp_AnkenGraph"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');
        $('#anythingKadouGraph3').remove();
        $('#anythingKadou3_more').addClass("display_n");
        $('#anythingKadouGraph3Area').append('<div id=\"anythingKadouGraph3\" class="ntp_AnkenGraph"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');
        $('#anythingKadouGraph4').remove();
        $('#anythingKadou4_more').addClass("display_n");
        $('#anythingKadouGraph4Area').append('<div id=\"anythingKadouGraph4\" class="ntp_AnkenGraph"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');
        $('#anken_state_menu_area').addClass('display_n');
    }

}


function setWaitAnythingArea(id) {

    if (id != "kadou") {
        $('#anythingGraph1').remove();
        $('#anything1_more').addClass("display_n");
        $('#anythingGraph1Area').append('<div id=\"anythingGraph1\" style="text-align:center;padding-top:50px;padding-bottom:50px;"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');

        $('#anythingGraph2').remove();
        $('#anything2_more').addClass("display_n");
        $('#anythingGraph2Area').append('<div id=\"anythingGraph2\" style="text-align:center;padding-top:50px;padding-bottom:50px;"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');
    } else {

        $('#kadouGraph').remove();
        $('#kadouGraphArea').append('<div id=\"kadouGraph\" style="text-align:center;padding-top:50px;padding-bottom:50px;"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');

        $('#anythingKadouGraph1').remove();
        $('#anythingKadou1_more').addClass("display_n");
        $('#anythingKadouGraph1Area').append('<div id=\"anythingKadouGraph1\" style="text-align:center;padding-top:50px;padding-bottom:50px;"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');

        $('#anythingKadouGraph2').remove();
        $('#anythingKadou2_more').addClass("display_n");
        $('#anythingKadouGraph2Area').append('<div id=\"anythingKadouGraph2\" style="text-align:center;padding-top:50px;padding-bottom:50px;"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');

        $('#anythingKadouGraph3').remove();
        $('#anythingKadou3_more').addClass("display_n");
        $('#anythingKadouGraph3Area').append('<div id=\"anythingKadouGraph3\" style="text-align:center;padding-top:50px;padding-bottom:50px;"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');

        $('#anythingKadouGraph4').remove();
        $('#anythingKadou4_more').addClass("display_n");
        $('#anythingKadouGraph4Area').append('<div id=\"anythingKadouGraph4\" style="text-align:center;padding-top:50px;padding-bottom:50px;"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');
    }

}


function setWaitAnythingChildGraphArea() {

    $('#anythingChild0Graph').remove();
    $('#anythingChild0GraphArea').append('<div id=\"anythingChild0Graph\" style="text-align:center;padding-top:50px;padding-bottom:50px;"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');

    $('#anythingChild1Graph').remove();
    $('#anythingChild1GraphArea').append('<div id=\"anythingChild1Graph\" style="text-align:center;padding-top:50px;padding-bottom:50px;"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');

    $('#anythingChild2Graph').remove();
    $('#anythingChild2GraphArea').append('<div id=\"anythingChild2Graph\" style="text-align:center;padding-top:50px;padding-bottom:50px;"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');

    $('#anythingKadouChild0Graph').remove();
    $('#anythingKadouChild0GraphArea').append('<div id=\"anythingKadouChild0Graph\" style="text-align:center;padding-top:50px;padding-bottom:50px;"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>');
}

function getListNumber(listId) {

    var selNum = 0;

    if (listId == "kigyou") {
        selNum = 0;
    } else if (listId == "shohin") {
        selNum = 1;
    } else if (listId == "gyoushu") {
        selNum = 2;
    } else if (listId == "process") {
        selNum = 3;
    } else if (listId == "mikomido") {
        selNum = 4;
    } else if (listId == "kokyakugensen") {
        selNum = 5;
    } else if (listId == "tanto") {
        selNum = 6;
    }
    return selNum;
}

//日付変更
function changeGraphDate(frdate, todate) {
    $("input[name=ntp220DateFrStr]").val(frdate);
    $("input[name=ntp220DateToStr]").val(todate);
    $("input[name=ntp220State]").val("-1");
    $("input[name=ntp220AnkenState]").val("-1");
    $("input[name=ntp220NowSelParentId]").val("main");
    $("input[name=ntp220NowSelChildId]").val("");
    document.forms[0].submit();
    return false;
}

//ラベル初期化
function resetStateLabel() {
    $(".sel_label_sel_all").removeClass("state_label_notsel_text");
    $("input[name=ntp220AnkenState]").val(-1);
    $("select[name='ankenListState']").val(-1);
}

//パラメータ初期化
function resetParam() {
  $(".category_sel_area").removeClass('display_n');
  $("input[name=anything1page]").val(1);
  $("input[name=anything1NowCount]").val(0);
  $("input[name=anythingKadou1page]").val(1);
  $("input[name=anythingKadou1NowCount]").val(0);
  $("input[name=anythingKadou2page]").val(1);
  $("input[name=anythingKadou2NowCount]").val(0);
  $("input[name=anythingKadou3page]").val(1);
  $("input[name=anythingKadou3NowCount]").val(0);
  $("input[name=anythingKadou4page]").val(1);
  $("input[name=anythingKadou4NowCount]").val(0);
  $("input[name=anythingKadouChild0page]").val(1);
  $("input[name=anythingKadouChild0NowCount]").val(0);
  $("input[name=ankenKadouDataPageNum]").val(1);
  $(".sel_label_sel_all").removeClass("state_label_notsel_text");
  $("input[name=ntp220AnkenState]").val(-1);
  $("select[name='ankenListState']").val(-1);
  $("input[name=ankenListState]").val(-1);
  $("input[name=ankenDataPageNum]").val(1);
  $('#anken_state_menu_area').removeClass('display_n');
  $('#anken_kadou_detail_area').addClass("display_n");
  $('#kigyou_kadou_detail_area').addClass("display_n");
  $('#kbunrui_kadou_detail_area').addClass("display_n");
  $('#khouhou_kadou_detail_area').addClass("display_n");
}

function resetPage() {
    $("input[name=anything1page]").val(1);
    $("input[name=anything1NowCount]").val(0);
    $("input[name=anythingKadou1page]").val(1);
    $("input[name=anythingKadou1NowCount]").val(0);
    $("input[name=anythingKadou2page]").val(1);
    $("input[name=anythingKadou2NowCount]").val(0);
    $("input[name=anythingKadou3page]").val(1);
    $("input[name=anythingKadou3NowCount]").val(0);
    $("input[name=anythingKadou4page]").val(1);
    $("input[name=anythingKadou4NowCount]").val(0);
    $("input[name=anythingKadouChild0page]").val(1);
    $("input[name=anythingKadouChild0NowCount]").val(0);
    $("input[name=ankenDataPageNum]").val(1);
    $("input[name=ankenKadouDataPageNum]").val(1);
  }

//左メニュー 表示項目取得
function showMenuList (selContent, contentName) {

    var selMenu = "";
    var dataFlg = false;

    var gyoushuSid = -1;
    if ($("input[name=ntp220NowSelParentId]").val() == "process") {
        if ($("select[name=ntp220GyoushuSid]").val() != null) {
            gyoushuSid = $("select[name=ntp220GyoushuSid]").val();
        }
    }

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":"showContent",
                                   "CMD":"showContent",
                                   "contentName":contentName,
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "offset":$("#" + contentName + "_offset").val(),
                                   "alreadySelStr":$("#" + contentName + "_already_sel").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "gyoushuSid":gyoushuSid,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(data) {
        if (data != null && data != "") {

            for (i = 0; i < data.length; i++) {
                if (!data[i].alreadyFlg) {
                    var dspContentStr = htmlEscape(data[i].contentName1.substring(0, 12));

                    selMenu += "<span class=\"sel_menu_content_text cl_linkDef cursor_p\" id=\""
                            +  contentName
                            +  "_"
                            +  data[i].contentSid1;
                            if (data[i].contentSid2 != null && data[i].contentSid2 != "") {
                                selMenu += "_" + data[i].contentSid2;
                            }
                    selMenu +=  "\">" + dspContentStr;
                    selMenu += "<input type=\"hidden\" value=\"" + htmlEscape(data[i].contentName1) + "<br>" + htmlEscape(data[i].contentName2) + "\" />";
                    selMenu += "<span class=\"tooltips display_n\"><span class=\"tooltip_txt\">" + htmlEscape(data[i].contentName1);
                    if (data[i].contentName2 != null && data[i].contentName2 != "") {
                        selMenu += "<br />" + htmlEscape(data[i].contentName2);
                    }
                    selMenu += "</span></span></span>";

                    if (!data[i].alreadyFlg) {
                        selMenu += "<br />";
                    }
                }
            }

            //表示件数が5件あった場合
            if (i == 5 && contentName != "mikomido") {
                selMenu += "<span id=\"" + contentName + "\" class=\"sel_menu_content_text_more fs_12 cl_linkDef cursor_p\">▼もっと表示する</span>";
            }

            dataFlg = true;

        } else {
            $(".sel_menu_content_text_more").remove();
            if ($("#" + contentName + "_offset").val() == 1) {
                selMenu += "<span class=\"fs_12 cl_fontWarn\">該当するデータはありません。</span>";
            }
        }
    });


    var searchBoxStr = "";
    if (contentName == "kigyou") {
        searchBoxStr = "企業コード・名";
    } else if (contentName == "shohin") {
        searchBoxStr = "商品コード・名";
    } else if (contentName == "gyoushu") {
        searchBoxStr = "業種コード・名";
    } else if (contentName == "process") {
        searchBoxStr = "プロセスコード";
    } else if (contentName == "kokyakugensen") {
        searchBoxStr = "源泉コード・名";
    }

    if ($("#" + contentName + "_offset").val() == 1) {
        $("#search_label").remove();
        $("#field_id").remove();
        selMenuContentStr = "<div class=\"js_selMenuContent bgC_body bor_b1 pl10 pt5 pb5\" id=\""
                          + contentName
                          + "_sel_menu_content\">";
        if (dataFlg) {
            if (contentName == "kigyou") {
                selMenuContentStr += "<div class=\"textfield2 search_div\" id=\""
                              + contentName
                              + "_sel_menu_after_area\">";
                selMenuContentStr += "<label id=\"search_label\" class=\"cl_fontMiddle\" for=\"field_id\">" + searchBoxStr + "</label>"
                selMenuContentStr += "<input Id=\"field_id\" style=\"width:100px;\" type=\"text\" class=\"" + contentName + "_search\" />"
                selMenuContentStr += "<button type=\"button\" class=\"baseBtn content_search_btn\" id=\"" + contentName + "\">検索</button>";
                selMenuContentStr += "</div>";
            }
        }
        selMenuContentStr += selMenu + "</div>";

        if (contentName != "process") {
            selContent.next().remove();
            selContent.after(selMenuContentStr);
        } else {
            selContent.next().next().remove();
            selContent.next().after(selMenuContentStr);
        }

    } else {

        if (contentName != "process") {
            selContent.after(selMenu);
            selContent.remove();
        } else {
            selContent.after(selMenu);
            selContent.remove();
        }
    }

    $("#" + contentName + "_offset").val(Number($("#" + contentName + "_offset").val()) + 1);

    $("#search_label").inFieldLabels();
}

function changeGyoushuCombo() {
    $("#process_offset").val(1);
    showMenuList ($(".js_selMenuTitleProcessArea"), "process");
    $("input[name=ntp220NowSelChildId]").val("");
    $('.anything_area').parent().removeClass('display_n');
    $('.anything_child_area').parent().addClass('display_n');
    anythingAllGraph();
    $("input[name=ankenDataPageNum]").val(1);
    redrawAnkenDataArea();
}

function drawAllGraph() {

    /* 案件グラフ */
    drawAnkenGraph();
    /* 商談結果グラフ */
    drawResultGraph();
    /* 金額グラフ */
    drawShohinHorizonGraph();
//    /* 割合グラフ */
//    drawCompGraph();



    /* 案件情報表示 */
    drawAnkenDataArea();

}

function redrawAllGraph() {

    $('#anken_detail_area').removeClass('display_n');


    if ($("input[name=ntp220NowSelParentId]").val() == "main") {
        if ($('#resultGraphVal').val() == 0) {
            drawResultHorizonGraph();
        } else {
            drawResultGraph();
        }

        if ($('#shohinGraphVal').val() == 0) {
            drawShohinHorizonGraph();
        } else {
            drawShohinGraph();
        }

        drawAnkenGraph();

    } else if ($("input[name=ntp220NowSelChildId]").val() == ""){
        if ($('#anythingGraph1Val').val() == 1) {
            drawAnything1Graph();
        } else {
            drawAnything1HorizonGraph();
        }

        if ($('#anythingGraph2Val').val() == 0) {
            drawAnything2Graph();
        } else {
            drawAnything2HorizonGraph();
        }
    } else {
        if ($('#anythingChild0GraphVal').val() == 0) {
            drawAnythingChild0Graph();
        } else {
            drawAnythingChild0HorizonGraph();
        }

        if ($('#anythingChild1GraphVal').val() == 1) {
            drawAnythingChild1Graph();
        } else {
            drawAnythingChild1HorizonGraph();
        }

        if ($('#anythingChild2GraphVal').val() == 0) {
            drawAnythingChild2HorizonGraph();
        } else {
            drawAnythingChild2Graph();
        }
    }

    /* 案件情報再表示 */
    redrawAnkenDataArea();
}


function redrawAllGraph2(id) {

    if (id != "kadou") {

        $('#anken_detail_area').removeClass('display_n');

        if ($("input[name=ntp220NowSelParentId]").val() == "main") {
            if ($('#resultGraphVal').val() == 0) {
                drawResultHorizonGraph();
            } else {
                drawResultGraph();
            }

            if ($('#shohinGraphVal').val() == 0) {
                drawShohinHorizonGraph();
            } else {
                drawShohinGraph();
            }

            drawAnkenGraph();

        } else if ($("input[name=ntp220NowSelChildId]").val() == ""){
            if ($('#anythingGraph1Val').val() == 1) {
                drawAnything1Graph();
            } else {
                drawAnything1HorizonGraph();
            }

            if ($('#anythingGraph2Val').val() == 0) {
                drawAnything2Graph();
            } else {
                drawAnything2HorizonGraph();
            }
        } else {
            if ($('#anythingChild0GraphVal').val() == 0) {
                drawAnythingChild0Graph();
            } else {
                drawAnythingChild0HorizonGraph();
            }

            if ($('#anythingChild1GraphVal').val() == 1) {
                drawAnythingChild1Graph();
            } else {
                drawAnythingChild1HorizonGraph();
            }

            if ($('#anythingChild2GraphVal').val() == 0) {
                drawAnythingChild2HorizonGraph();
            } else {
                drawAnythingChild2Graph();
            }
        }

        /* 案件情報再表示 */
        redrawAnkenDataArea();

    } else {

        $(".category_sel_area").addClass('display_n');
        $('#anken_detail_area').addClass('display_n');

        if ($("input[name=ntp220NowSelChildId]").val() == ""){

            drawKadouGraph();

            if ($('#anythingKadou1GraphVal').val() == 0) {
                drawAnythingKadou1HorizonGraph();
                $('#anythingKadou1GraphVal').val('0');
            } else {
                drawAnythingKadou1Graph();
                $('#anythingKadou1GraphVal').val('1');
            }

            if ($('#anythingKadou2GraphVal').val() == 0) {
                drawAnythingKadou2HorizonGraph();
                $('#anythingKadou2GraphVal').val('0');
            } else {
                drawAnythingKadou2Graph();
                $('#anythingKadou2GraphVal').val('1');
            }

            if ($('#anythingKadou3GraphVal').val() == 0) {
                drawAnythingKadou3HorizonGraph();
                $('#anythingKadou3GraphVal').val('0');
            } else {
                drawAnythingKadou3Graph();
                $('#anythingKadou3GraphVal').val('1');
            }

            if ($('#anythingKadou4GraphVal').val() == 0) {
                drawAnythingKadou4HorizonGraph();
                $('#anythingKadou4GraphVal').val('0');
            } else {
                drawAnythingKadou4Graph();
                $('#anythingKadou4GraphVal').val('1');
            }

        } else {

            redrawKadouDetailDataArea();

            if ($('#anythingKadouChild0GraphVal').val() == 1) {
                drawAnythingKadouChild0Graph();
            } else {
                drawAnythingKadouChild0HorizonGraph();
            }

        }

    }
}


function redrawAnkenDataArea() {
    $("input[name=ankenDataPageNum]").val("1");
    $(".anken_val").remove();
    $(".anken_val2").remove();
    drawAnkenDataArea();
}



//項目(親要素)データ
function anythingAllGraph() {

    if ($("input[name=ntp220NowSelParentId]").val() != "kadou") {
        drawAnything1HorizonGraph();
        drawAnything2Graph();
    } else {
        drawKadouGraph();
        drawAnythingKadou1HorizonGraph();
        drawAnythingKadou2HorizonGraph();
        drawAnythingKadou3HorizonGraph();
        drawAnythingKadou4HorizonGraph();
    }

}

function anythingChildAllGraph() {

    if ($("input[name=ntp220NowSelParentId]").val() != "kadou") {
        redrawAnkenDataArea();
        drawAnythingChild1HorizonGraph();
        drawAnythingChild0HorizonGraph();
        drawAnythingChild2HorizonGraph();
    } else {
        redrawKadouDetailDataArea();
        drawAnythingKadouChild0HorizonGraph();
    }
}

function katudouAllGraph() {
    drawKbunruiHorizonGraph();
    drawKhouhouGraph();
}

function drawAnkenGraph() {

    var cmdStr = "getPeriodAnkenData";
    var defGraphMode = $("input[name=def_graph_val]").val();

    $.ajaxSetup({async:true});
    $.post('../nippou/ntp220.do', {"cmd":cmdStr,
                                   "CMD":cmdStr,
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "defGraphMode":defGraphMode,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(cntData) {


        if (cntData != null && cntData != "" && cntData.length > 0) {

            var ankenClass = "";
            var shodanStateClass = "display_n";

            if ($("#def_graph_val").val() == 1) {
                ankenClass = "display_n";
                shodanStateClass = "";
            }

            $('#ankenGraph').remove();
            $('#shodanStateGraph').remove();
            $('#ankenGraphArea').append('<div id=\"ankenGraph\" class=\"hp260\"></div>');
            $('#ankenGraphArea').append('<div id=\"shodanStateGraph\" class=\"hp260\"></div>');

            var dateStr      = "[";
            var jutyuStr     = "[";
            var mitumoriStr  = "[";
            var jutyuCntStr  = "[";
            var sityuCntStr  = "[";
            var shodanCntStr = "[";

            for (i = 0; i < cntData.length; i++) {
                var totalData = cntData[i];

                if (i != 0) {
                    dateStr      += ",";
                    jutyuStr     += ",";
                    mitumoriStr  += ",";
                    jutyuCntStr  += ",";
                    sityuCntStr  += ",";
                    shodanCntStr += ",";
                }
                dateStr      += "'" + totalData.dateStr + "'"
                jutyuStr     += totalData.sumJutyuPrice;
                mitumoriStr  += totalData.sumMitumoriPrice;
                jutyuCntStr  += totalData.sumJutyuAnken;
                sityuCntStr  += totalData.sumSityuAnken;
                shodanCntStr += totalData.sumShodanAnken;
            }

            var ticksOpsAngle = 0;
            var ticksOpsSize = '7pt';
            if (cntData.length > 13) {
                ticksOpsAngle = -30;
                ticksOpsSize  = '8pt';
            }

            dateStr      += "]";
            jutyuStr     += "]";
            mitumoriStr  += "]";
            jutyuCntStr  += "]";
            sityuCntStr  += "]";
            shodanCntStr += "]";

            dataStr      = eval(dateStr);
            jutyuStr     = eval(jutyuStr);
            mitumoriStr  = eval(mitumoriStr);
            jutyuCntStr  = eval(jutyuCntStr);
            sityuCntStr  = eval(sityuCntStr);
            shodanCntStr = eval(shodanCntStr);


            var mitumoriVal = mitumoriStr;
            var jutyuVal = jutyuStr;
            var tick = dataStr;

            if(defGraphMode == "0") {
                var ankenPlot = $.jqplot('ankenGraph', [jutyuVal, mitumoriVal], {
                    animate: true,
                    animateReplot: true,
                    legend: {
                       show: true,
                       location: 'nw',
                       renderer: jQuery . jqplot . EnhancedLegendRenderer,
                       rendererOptions:{ numberColumns: 3}
                    },

                    highlighter: {
                        show: true,
                        showMarker: false,
                        sizeAdjust: 0,
                        tooltipLocation: 'n',
                        tooltipAxes: 'y',
                        formatString: '%s'
                    },

                    series:[
//                      {
//                        label:'商談中',
//                        yaxis:'y2axis',
//                        rendererOptions:{
//                          highlightMouseOver: false,
//                          animation: {
//                              speed: 1500
//                          }
//                        }
//                      },
//                      {
//                        label:'受注',
//                        yaxis:'y2axis',
//                        rendererOptions:{
//                          highlightMouseOver: false,
//                          animation: {
//                              speed: 1500
//                          }
//                        }
//                      },
//                      {
//                          label:'失注',
//                          yaxis:'y2axis',
//                          rendererOptions:{
//                            highlightMouseOver: false,
//                            animation: {
//                                speed: 1500
//                            }
//                          }
//                        },
                      {
                        label:'受注金額(合計)',
                        yaxis:'yaxis',
                        rendererOptions: {
                                animation: {
                                    speed: 1500
                                }
                            }
                        },
                      {
                        label:'見積り金額(合計)',
                        yaxis:'yaxis',
                        rendererOptions: {
                                animation: {
                                    speed: 1500
                                }
                            }
                         }
                    ],
                    axes: {
                      xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer,
                        ticks: tick,
                        label: '',
                        tickRenderer: jQuery . jqplot . CanvasAxisTickRenderer ,
                        tickOptions: {angle:ticksOpsAngle,fontSize:ticksOpsSize}
                      },
                      yaxis: {
                        label: ''
                      },
                      y2axis: {
                        label: ''
                      }
                    }
                  });
            }

            if(defGraphMode == "1") {
                var ankenPlot = $.jqplot('shodanStateGraph', [shodanCntStr, jutyuCntStr, sityuCntStr], {
                    animate: true,
                    animateReplot: true,
                    legend: {
                       show: true,
                       location: 'nw',
                       renderer: jQuery . jqplot . EnhancedLegendRenderer,
                       rendererOptions:{ numberColumns: 3}
                    },

                    highlighter: {
                        show: true,
                        showMarker: false,
                        sizeAdjust: 0,
                        tooltipLocation: 'n',
                        tooltipAxes: 'y',
                        formatString: '%s'
                    },

                    series:[
                      {
                        label:'商談中',
                        yaxis:'yaxis',
                        rendererOptions:{
                          highlightMouseOver: false,
                          animation: {
                              speed: 1500
                          }
                        }
                      },
                      {
                        label:'受注',
                        yaxis:'yaxis',
                        rendererOptions:{
                          highlightMouseOver: false,
                          animation: {
                              speed: 1500
                          }
                        }
                      },
                      {
                          label:'失注',
                          yaxis:'yaxis',
                          rendererOptions:{
                            highlightMouseOver: false,
                            animation: {
                                speed: 1500
                            }
                          }
                        }
                    ],
                    axes: {
                      xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer,
                        ticks: tick,
                        label: '',
                        tickRenderer: jQuery . jqplot . CanvasAxisTickRenderer ,
                        tickOptions: {angle:ticksOpsAngle,fontSize:ticksOpsSize}
                      },
                      yaxis: {
                        label: ''
                      },
                      y2axis: {
                        label: ''
                      }
                    }
                  });
            }

            $('#ankenGraph').addClass(ankenClass);
            $(".def_graph_state_label").addClass(ankenClass);
            $('#shodanStateGraph').addClass(shodanStateClass);

        } else {
            $('#ankenGraph').remove();
            $('#shodanStateGraph').remove();
            $('#ankenGraphArea').append('<div id=\"ankenGraph\" class=\"hp300 w100 txt_c\"><span class=\"cl_fontWarn\">該当するデータがありません。</span></div>');
        }
    });

}


function drawResultGraph() {

    var cmdStr = "getAnkenStateCnt";

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":cmdStr,
                                   "CMD":cmdStr,
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "gyoushuSid":-1,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(cntData) {

        if (cntData != null && cntData != "" && cntData.syodanCnt != null) {

            $('#resultGraph').remove();
            $('#resultGraphArea').append('<div id=\"resultGraph\"></div>');

            var data = "";

            data = [['受注', cntData.jutyuCnt],['失注', cntData.sityuCnt], ['商談中', cntData.syodanCnt]];
            $(".state_label_area").addClass("display_n");

            var resultPlot = jQuery.jqplot ('resultGraph', [data],
              {
                seriesDefaults: {
                  renderer: jQuery.jqplot.PieRenderer,
                  rendererOptions: {
                    showDataLabels: true
                  }
                },
                legend: { show:true, location: 'e' }
              }
            );

            $("#resultGraph").bind('jqplotDataHighlight', function(ev, seriesIndex, pointIndex, data, radius) {
              var chart_left = $('#resultGraph').offset().left,
              chart_top = $('#resultGraph').offset().top,
              x = chart_left + 110;
              y = chart_top + 100;
              var color = 'rgb(50%,50%,100%)';
              $('#tooltipResult').css({left:x, top:y});
              $('#tooltipResult').addClass("bgC_body");
              $('#tooltipResult').html('<span class="fs_12 fw_b">' + data[0] + '</span><br />' + '件数: ' + data[1]);
              $('#tooltipResult').show();

            });

            $("#resultGraph").bind('jqplotDataUnhighlight', function(ev, seriesIndex, pointIndex, data) {
                $('#tooltipResult').empty();
                $('#tooltipResult').hide();
            });

            if (cntData.jutyuCnt == 0 && cntData.sityuCnt == 0 && cntData.syodanCnt == 0) {
                $('#resultGraph').remove();
                $('#resultGraphArea').append('<div id=\"resultGraph\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
            }

        } else {
            $('#resultGraph').remove();
            $('#resultGraphArea').append('<div id=\"resultGraph\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}

function drawResultHorizonGraph() {

    var cmdStr = "getAnkenStateCnt";

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":cmdStr,
                                   "CMD":cmdStr,
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "gyoushuSid":-1,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(cntData) {

        if (cntData != null && cntData != "" && cntData.syodanCnt != null) {

            $('#resultGraph').remove();
            $('#resultGraphArea').append('<div id=\"resultGraph\"></div>');

            data = [[cntData.syodanCnt, '商談中'], [cntData.sityuCnt, '失注'], [cntData.jutyuCnt, '受注']];

            jQuery . jqplot(
                    'resultGraph',
                    [data],
                    {
                        animate: true,
                        animateReplot: true,
                        seriesColors:['#c5b47f', '#eaa228', '#4bb2c5'],
                        seriesDefaults: {
                            renderer: jQuery . jqplot . BarRenderer,
                            rendererOptions: {
                                barDirection: 'horizontal',
                                varyBarColor: true,
                                animation: {
                                    speed: 1500
                                }
                            }
                        },
                        axes: {
                            xaxis:{
                              label: '件数',
                              labelOptions: {fontSize: '8pt'}
                            },
                            yaxis: {
                                pad:0,
                                renderer: jQuery . jqplot . CategoryAxisRenderer
                            }
                        },
                        highlighter: {
                            show: true,
                            showMarker: false,
                            tooltipLocation: 'e',
                            tooltipAxes: 'x',
                            formatString: '　%s　'
                        }
                    }
                );

            if (cntData.jutyuCnt == 0 && cntData.sityuCnt == 0 && cntData.syodanCnt == 0) {
                $('#resultGraph').remove();
                $('#resultGraphArea').append('<div id=\"resultGraph\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
            }

        } else {
            $('#resultGraph').remove();
            $('#resultGraphArea').append('<div id=\"resultGraph\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });

}

function drawShohinGraph() {

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":"getShohinData",
                                   "CMD":"getShohinData",
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(shnData) {

        if (shnData != null && shnData != "" && shnData.length > 0) {

            var heightStr = 200;

            if ((28 * shnData.length) > 200) {
                heightStr = 28 * shnData.length;
            }

            $('#shohinGraph').remove();
            $('#shohinGraphArea').append('<div id=\"shohinGraph\" style=\"height:' + heightStr+ 'px;\"></div>');

            var shnStr    = "[";

            for (i=0; i < shnData.length; i++) {
                 if (i != 0 && i != shnData.length) {
                     shnStr += ",";
                 }
                 shnStr += "['"
                          +  htmlEscape(shnData[i].nhnName)
                          +  "',"
                          +  shnData[i].nshCnt
                          +  "]";
            }

            shnStr    += "]";

            var shohinObject = eval(shnStr);

            var resultPlot = jQuery.jqplot ('shohinGraph', [shohinObject],
              {
                seriesDefaults: {
                  renderer: jQuery.jqplot.PieRenderer,
                  rendererOptions: {
                    showDataLabels: true
                  }
                },
                legend: { show:true, location: 'e' }
              }
            );

            $("#shohinGraph").bind('jqplotDataHighlight', function(ev, seriesIndex, pointIndex, data, radius) {
              var chart_left = $('#shohinGraph').offset().left,
              chart_top = $('#shohinGraph').offset().top,
              x = chart_left + 110;
              y = chart_top + 100;
              var color = 'rgb(50%,50%,100%)';
              $('#tooltipShohin').css({left:x, top:y});
              $('#tooltipShohin').addClass("bgC_body");
              $('#tooltipShohin').html('<span class="fs_12 fw_b">' + data[0] + '</span><br />' + '件数: ' + data[1]);
              $('#tooltipShohin').show();

            });

            $("#shohinGraph").bind('jqplotDataUnhighlight', function(ev, seriesIndex, pointIndex, data) {
                $('#tooltipShohin').empty();
                $('#tooltipShohin').hide();
            });

        } else {
            $('#shohinGraph').remove();
            $('#shohinGraphArea').append('<div id=\"shohinGraph\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });

}


function drawShohinHorizonGraph() {

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":"getShohinData",
                                   "CMD":"getShohinData",
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(shnData) {

        if (shnData != null && shnData != "" && shnData.length > 0) {

            var heightStr = 200;

            if ((60 * shnData.length) > 200) {
                heightStr = 40 * shnData.length;
            }

            $('#shohinGraph').remove();
            $('#shohinGraphArea').append('<div id=\"shohinGraph\" style=\"height:' + heightStr+ 'px;\"></div>');

            var shnStr    = "[";

            for (i=0; i < shnData.length; i++) {
                 if (i != 0 && i != shnData.length) {
                     shnStr += ",";
                 }
                 shnStr += "["
                          +  shnData[i].nshCnt
                          +  ",'"
                          +  strCut(shnData[i].nhnName)
                          +  "']";
            }

            shnStr    += "]";

            var shohinObject = eval(shnStr);

            jQuery . jqplot(
                    'shohinGraph',
                    [
                        shohinObject
                    ],

                    {
                        animate: true,
                        animateReplot: true,
                        seriesColors:['#839557', '#579575', '#c5b47f', '#eaa228', '#4bb2c5'],
                        seriesDefaults: {
                            renderer: jQuery . jqplot . BarRenderer,
                            rendererOptions: {
                                barDirection: 'horizontal',
                                varyBarColor: true,
                                animation: {
                                    speed: 1500
                                }
                            }
                        },
                        axes: {
                            yaxis: {
                                pad:0,
                                renderer: jQuery . jqplot . CategoryAxisRenderer
                            }
                        },
                        highlighter: {
                            show: true,
                            showMarker: false,
                            tooltipLocation: 'e',
                            tooltipAxes: 'x',
                            formatString: '　%s　'
                        }
                    }
                );
        } else {
            $('#shohinGraph').remove();
            $('#shohinGraphArea').append('<div id=\"shohinGraph\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });

}



function drawKbunruiGraph() {

    $('#kbunruiGraph').remove();
    $('#kbunruiGraphArea').append('<div id=\"kbunruiGraph\" style=\"\"></div>');

    var data = [['問合せ対応', 12],['クレーム対応', 9], ['会議', 14], ['資料作成', 3], ['セミナー', 7], ['引継ぎ', 8]];
    var resultPlot = jQuery.jqplot ('kbunruiGraph', [data],
      {
        seriesDefaults: {
          renderer: jQuery.jqplot.PieRenderer,
          rendererOptions: {
            showDataLabels: true
          }
        },
        legend: { show:true, location: 'e' }
      }
    );

    $("#kbunruiGraph").bind('jqplotDataHighlight', function(ev, seriesIndex, pointIndex, data, radius) {
      var chart_left = $('#kbunruiGraph').offset().left,
      chart_top = $('#kbunruiGraph').offset().top,
      x = chart_left + 110;
      y = chart_top + 100;
      var color = 'rgb(50%,50%,100%)';
      $('#tooltipKbunrui').css({left:x, top:y});
      $('#tooltipKbunrui').addClass("bgC_body");
      $('#tooltipKbunrui').html('<span class="fs_12 fw_b">' + data[0] + '</span><br />' + '件数: ' + data[1]);
      $('#tooltipKbunrui').show();

    });

    $("#kbunruiGraph").bind('jqplotDataUnhighlight', function(ev, seriesIndex, pointIndex, data) {
        $('#tooltipKbunrui').empty();
        $('#tooltipKbunrui').hide();
    });

}




function drawKbunruiHorizonGraph() {

    $('#kbunruiGraph').remove();
    $('#kbunruiGraphArea').append('<div id=\"kbunruiGraph\" style=\"\"></div>');

    jQuery . jqplot(
            'kbunruiGraph',
            [
                [ [8, '<font size="-3">引継ぎ</font>'],[7, '<font size="-2">セミナ<br>ー</font>'], [3, '<font size="-2">資料<br>作成</font>'],[14, '<font size="-2">会議</font>'] ,[9, '<font size="-2">クレー<br>ム対応</font>'] , [12, '<font size="-2">問合せ<br>対応</font>'] ]
            ],
            {
                animate: true,
                animateReplot: true,
                seriesColors:['#958c12', '#839557', '#579575', '#c5b47f', '#eaa228', '#4bb2c5'],
                seriesDefaults: {
                    renderer: jQuery . jqplot . BarRenderer,
                    rendererOptions: {
                        barDirection: 'horizontal',
                        varyBarColor: true,
                        animation: {
                            speed: 1500
                        }
                    }
                },
                axes: {
                    yaxis: {
                        renderer: jQuery . jqplot . CategoryAxisRenderer
                    }
                },
                highlighter: {
                    show: true,
                    showMarker: false,
                    tooltipLocation: 'e',
                    tooltipAxes: 'x',
                    formatString: '　%s　'
                }
            }
        );
}


function drawKhouhouGraph() {

    $('#khouhouGraph').remove();
    $('#khouhouGraphArea').append('<div id=\"khouhouGraph\" style=\"height:220px;\"></div>');

    var data = [['訪問', 6],['来社', 9], ['電話', 14], ['FAX', 6], ['メール', 7], ['郵送', 2], ['社内作業', 7]];
    var resultPlot = jQuery.jqplot ('khouhouGraph', [data],
      {
        seriesDefaults: {
          renderer: jQuery.jqplot.PieRenderer,
          rendererOptions: {
            showDataLabels: true,
            animation: {
                speed: 1500
            }
          }
        },
        legend: { show:true, location: 'e' }
      }
    );

    $("#khouhouGraph").bind('jqplotDataHighlight', function(ev, seriesIndex, pointIndex, data, radius) {
      var chart_left = $('#khouhouGraph').offset().left,
      chart_top = $('#khouhouGraph').offset().top,
      x = chart_left + 110;
      y = chart_top + 100;
      var color = 'rgb(50%,50%,100%)';
      $('#tooltipKhouhou').css({left:x, top:y});
      $('#tooltipKhouhou').addClass("bgC_body");
      $('#tooltipKhouhou').html('<span class="fs_12 fw_b">' + data[0] + '</span><br />' + '件数: ' + data[1]);
      $('#tooltipKhouhou').show();

    });

    $("#khouhouGraph").bind('jqplotDataUnhighlight', function(ev, seriesIndex, pointIndex, data) {
        $('#tooltipKhouhou').empty();
        $('#tooltipKhouhou').hide();
    });
}


function drawKhouhouHorizonGraph() {

    $('#khouhouGraph').remove();
    $('#khouhouGraphArea').append('<div id=\"khouhouGraph\" style=\"\"></div>');

    jQuery . jqplot(
            'khouhouGraph',
            [
                [[7, '<font size="-2">社内作<br>業</font>'], [2, '<font size="-2">郵送</font>'], [7, '<font size="-2">メール</font>'], [6, '<font size="-2">FAX</font>'], [14, '<font size="-2">電話</font>'], [9, '<font size="-2">来社</font>'], [6, '<font size="-2">訪問</font>']]
            ],

            {
                animate: true,
                animateReplot: true,
                seriesColors:['#958c12', '#839557', '#579575', '#c5b47f', '#eaa228', '#4bb2c5', '#953579'],
                seriesDefaults: {
                    renderer: jQuery . jqplot . BarRenderer,
                    rendererOptions: {
                        barDirection: 'horizontal',
                        varyBarColor: true,
                        animation: {
                            speed: 1500
                        }
                    }
                },
                axes: {
                    yaxis: {
                        pad:0,
                        renderer: jQuery . jqplot . CategoryAxisRenderer
                    }
                },
                highlighter: {
                    show: true,
                    showMarker: false,
                    tooltipLocation: 'e',
                    tooltipAxes: 'x',
                    formatString: '　%s　'
                }
            }
        );

}

//
//function drawCompGraph() {
//
//    $('#compGraph').remove();
//    $('#compGraphArea').append('<div id=\"compGraph\" style=\"height:150px;\"></div>');
//
//    var data = [['2000未満', 6],['2000～3000', 9], ['3000～4000', 14], ['4000～5000', 3], ['5000以上', 3]];
//    var compPlot = jQuery.jqplot ('compGraph', [data],
//      {
//        seriesDefaults: {
//          renderer: jQuery.jqplot.PieRenderer,
//          rendererOptions: {
//            showDataLabels: true
//          }
//        },
//        legend: { show:false, location: 'e' }
//      }
//    );
//
//    $("#compGraph").bind('jqplotDataHighlight', function(ev, seriesIndex, pointIndex, data, radius) {
//      var chart_left = $('#compGraph').offset().left,
//      chart_top = $('#compGraph').offset().top,
//      x = chart_left + 20;
//      y = chart_top + 50;
//      var color = 'rgb(50%,50%,100%)';
//      $('#tooltipComp').css({left:x, top:y});
//      $('#tooltipComp').html('<span style="font-size:10px;font-weight:bold;color:#333333;">' + data[0] + '</span><br />' + '件数: ' + data[1]);
//      $('#tooltipComp').show();
//
//    });
//
//    $("#compGraph").bind('jqplotDataUnhighlight', function(ev, seriesIndex, pointIndex, data) {
//        $('#tooltipComp').empty();
//        $('#tooltipComp').hide();
//    });
//}


function drawAnything1Graph() {

    $('#anythingGraph1').remove();
    $('#anythingGraph1Area').append('<div id=\"anythingGraph1\" style=\"height:220px;\"></div>');

    var data = [['商品A', 6],['商品B', 9], ['商品C', 14], ['商品D', 6], ['商品E', 7], ['商品F', 2], ['商品G', 7]];
    var resultPlot = jQuery.jqplot ('anythingGraph1', [data],
      {
        seriesDefaults: {
          renderer: jQuery.jqplot.PieRenderer,
          rendererOptions: {
            showDataLabels: true
          }
        },
        legend: { show:true, location: 'e' }
      }
    );

    $("#anythingGraph1").bind('jqplotDataHighlight', function(ev, seriesIndex, pointIndex, data, radius) {
      var chart_left = $('#anythingGraph1').offset().left,
      chart_top = $('#anythingGraph1').offset().top,
      x = chart_left + 110;
      y = chart_top + 100;
      var color = 'rgb(50%,50%,100%)';
      $('#tooltipAnything').css({left:x, top:y});
      $('#tooltipAnything').addClass("bgC_body");
      $('#tooltipAnything').html('<span class="fs_12 fw_b">' + data[0] + '</span><br />' + '件数: ' + data[1]);
      $('#tooltipAnything').show();

    });

    $("#anythingGraph1").bind('jqplotDataUnhighlight', function(ev, seriesIndex, pointIndex, data) {
        $('#tooltipAnything').empty();
        $('#tooltipAnything').hide();
    });
}

function drawAnything1HorizonGraph() {

    var gyoushuSid = -1;
    if ($("input[name=ntp220NowSelParentId]").val() == "process") {
        if ($("select[name=ntp220GyoushuSid]").val() != null) {
            gyoushuSid = $("select[name=ntp220GyoushuSid]").val();
        }
    }

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":"getContentData",
                                   "CMD":"getContentData",
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "pageNum":$("input[name=anything1page]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "gyoushuSid":gyoushuSid,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(data) {

        if (data != null && data != "" && data.contentDataList != null) {

            var dataList = data.contentDataList;

            if (dataList.length > 0 && dataList.length > Number($("input[name=anything1NowCount]").val())) {
                $('#anything1_more').removeClass("display_n");
            } else {
                $('#anything1_more').addClass("display_n");
            }

            $("input[name=anything1NowCount]").val(dataList.length);

            graphHeight = dataList.length * 90;

            $('#anythingGraph1').remove();
            $('#anythingGraph1Area').append('<div id=\"anythingGraph1\" style=\"height:' + graphHeight +  'px;\"></div>');

            var juchuStr    = "[";
            var mitumoriStr = "[";

            for (i=0; i < dataList.length; i++) {

                 if (i != 0 && i != dataList.length) {
                     juchuStr += ",";
                     mitumoriStr += ",";
                 }
                 juchuStr += "["
                          +  dataList[i].nanKinJutyu
                          +  ",'"
                          +  strCut(dataList[i].cntName1 + " " + dataList[i].cntName2)
                          +  "']";

                 mitumoriStr += "["
                             +  dataList[i].nanKinMitumori
                             +  ",'"
                             +  strCut(dataList[i].cntName1 + " " + dataList[i].cntName2)
                             +  "']";
            }

            juchuStr    += "]";
            mitumoriStr += "]";

            var juchuObject    = eval(juchuStr);
            var mitumoriObject = eval(mitumoriStr);

            jQuery( function() {
                jQuery.jqplot(
                    'anythingGraph1',
                    [ mitumoriObject,juchuObject ],
                    {
                        axes: {
                            xaxis: {
                                tickRenderer: jQuery . jqplot . CanvasAxisTickRenderer ,
                                tickOptions: {
                                  angle: -30,
                                  fontSize: '8pt'
                                }
                            },
                            yaxis: {
                                renderer: jQuery . jqplot . CategoryAxisRenderer
                            }
                        },
                        animate: true,
                        animateReplot: true,
                        seriesDefaults: {
                            renderer: jQuery . jqplot . BarRenderer,
                            rendererOptions: {
                                barPadding: 8,
                                barMargin: 10,
                                barDirection: 'horizontal',
                                barWidth: null,
                                shadowOffset: 2,
                                shadowDepth: 5,
                                shadowAlpha: 0.08,
                                animation: {
                                    speed: 1500
                                }
                            }
                        },
                        highlighter: {
                            show: true,
                            showMarker: false,
                            tooltipLocation: 'e',
                            tooltipAxes: 'x',
                            formatString: '　%s　'
                        }
                    }
                );
            } );
        } else {
            $('#anythingGraph1').remove();
            $('#anything1_more').addClass("display_n");
            $('#anythingGraph1Area').append('<div id=\"anythingGraph1\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}

function drawAnything2Graph() {


    var cmdStr = "getAnkenStateCnt";

    var dataFlg = true;

    if ($("input[name=ntp220NowSelParentId]").val() != "kigyou") {
        var cmdStr = "getAnkenContentStateCnt";
    }

    var gyoushuSid = -1;
    if ($("input[name=ntp220NowSelParentId]").val() == "process") {
        if ($("select[name=ntp220GyoushuSid]").val() != null) {
            gyoushuSid = $("select[name=ntp220GyoushuSid]").val();
        }
    }

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":cmdStr,
                                   "CMD":cmdStr,
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "gyoushuSid":gyoushuSid,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(cntData) {

        if (cntData != null && cntData != "") {

            $('#anythingGraph2').remove();
            $('#anythingGraph2Area').append('<div id=\"anythingGraph2\"></div>');

            var data = "";

            if ($("input[name=ntp220NowSelParentId]").val() == "kigyou") {
                if (cntData.jutyuCnt != null) {
                    data = [['受注', cntData.jutyuCnt],['失注', cntData.sityuCnt], ['商談中', cntData.syodanCnt]];
                    $(".state_label_area").addClass("display_n");
                    dataFlg = true;
                }

            } else {
                if (cntData.length > 0) {
                    var dataStr = "";
                    dataStr += "[";
                    for (i=0; i < cntData.length; i++) {
                        var stateData = cntData[i];
                        if (i == 0) {
                            dataStr += "['";
                        } else {
                            dataStr += ",['";
                        }
                        dataStr += stateData.contentName
                                +  "',"
                                +  stateData.ankenCnt
                                +  "]";
                    }
                    dataStr += "]";
                    data = eval(dataStr);
                    dataFlg = true;
                }
                $(".state_label_area").removeClass("display_n");
            }


            var resultPlot = jQuery.jqplot ('anythingGraph2', [data],
              {
                seriesDefaults: {
                  renderer: jQuery.jqplot.PieRenderer,
                  rendererOptions: {
                    showDataLabels: true
                  }
                },
                legend: { show:true, location: 'e' }
              }
            );

            $("#anythingGraph2").bind('jqplotDataHighlight', function(ev, seriesIndex, pointIndex, data, radius) {
              var chart_left = $('#anythingGraph2').offset().left,
              chart_top = $('#anythingGraph2').offset().top,
              x = chart_left + 110;
              y = chart_top + 100;
              var color = 'rgb(50%,50%,100%)';
              $('#tooltipAnythingMoney').css({left:x, top:y});
              $('#tooltipAnythingMoney').addClass("bgC_body");
              $('#tooltipAnythingMoney').html('<span class="fs_12 fw_b">' + data[0] + '</span><br />' + '件数: ' + data[1]);
              $('#tooltipAnythingMoney').show();

            });

            $("#anythingGraph2").bind('jqplotDataUnhighlight', function(ev, seriesIndex, pointIndex, data) {
                $('#tooltipAnythingMoney').empty();
                $('#tooltipAnythingMoney').hide();
            });

            if (!dataFlg) {
                $('#anythingGraph2').remove();
                $('#anythingGraph2Area').append('<div id=\"anythingGraph2\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
            }


            if ($("input[name=ntp220NowSelParentId]").val() == "kigyou") {
                if (cntData.jutyuCnt == 0 && cntData.sityuCnt == 0 && cntData.syodanCnt == 0) {
                    $('#anythingGraph2').remove();
                    $('#anythingGraph2Area').append('<div id=\"anythingGraph2\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
                }
            }

        } else {
            $('#anythingGraph2').remove();
            $('#anythingGraph2Area').append('<div id=\"anythingGraph2\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}


function drawAnything2HorizonGraph() {


    var cmdStr = "getAnkenStateCnt";

    var dataFlg = false;

    if ($("input[name=ntp220NowSelParentId]").val() != "kigyou") {
        var cmdStr = "getAnkenContentStateCnt";
    }

    var gyoushuSid = -1;
    if ($("input[name=ntp220NowSelParentId]").val() == "process") {
        if ($("select[name=ntp220GyoushuSid]").val() != null) {
            gyoushuSid = $("select[name=ntp220GyoushuSid]").val();
        }
    }

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":cmdStr,
                                   "CMD":cmdStr,
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "gyoushuSid":gyoushuSid,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(cntData) {

        if (cntData != null && cntData != "") {

            $('#anythingGraph2').remove();
            $('#anythingGraph2Area').append('<div id=\"anythingGraph2\"></div>');

            if ($("input[name=ntp220NowSelParentId]").val() == "kigyou") {
                if (cntData.syodanCnt != null) {
                    data = [[cntData.syodanCnt, '商談中'], [cntData.sityuCnt, '失注'], [cntData.jutyuCnt, '受注']];
                    $(".state_label_area").addClass("display_n");
                    dataFlg = true;
                }
            } else {
                if (cntData.length > 0) {
                    var dataStr = "";
                    dataStr += "[";
                    for (i=0; i < cntData.length; i++) {
                        var stateData = cntData[i];
                        if (i == 0) {
                            dataStr += "[";
                        } else {
                            dataStr += ",[";
                        }
                        dataStr += stateData.ankenCnt
                                +  ",'"
                                +  stateData.contentName
                                +  "']";
                    }
                    dataStr += "]";
                    data = eval(dataStr);
                    dataFlg = true;
                }
                $(".state_label_area").removeClass("display_n");
            }

            jQuery . jqplot(
                    'anythingGraph2',
                    [data],
                    {
                        animate: true,
                        animateReplot: true,
                        seriesColors:['#c5b47f', '#eaa228', '#4bb2c5'],
                        seriesDefaults: {
                            renderer: jQuery . jqplot . BarRenderer,
                            rendererOptions: {
                                barDirection: 'horizontal',
                                varyBarColor: true,
                                animation: {
                                    speed: 1500
                                }
                            }
                        },
                        axes: {
                            xaxis:{
                              label: '件数',
                              labelOptions: {fontSize: '8pt'}
                            },
                            yaxis: {
                                pad:0,
                                renderer: jQuery . jqplot . CategoryAxisRenderer
                            }
                        },
                        highlighter: {
                            show: true,
                            showMarker: false,
                            tooltipLocation: 'e',
                            tooltipAxes: 'x',
                            formatString: '　%s　'
                        }
                    }
                );
            if (!dataFlg) {
                $('#anythingGraph2').remove();
                $('#anythingGraph2Area').append('<div id=\"anythingGraph2\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
            }

            if ($("input[name=ntp220NowSelParentId]").val() == "kigyou") {
                if (cntData.jutyuCnt == 0 && cntData.sityuCnt == 0 && cntData.syodanCnt == 0) {
                    $('#anythingGraph2').remove();
                    $('#anythingGraph2Area').append('<div id=\"anythingGraph2\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
                }
            }

        } else {
            $('#anythingGraph2').remove();
            $('#anythingGraph2Area').append('<div id=\"anythingGraph2\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });

}

function drawAnythingChild0Graph() {

}

function drawAnythingChild0HorizonGraph() {

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":"getAnkenData",
                                   "CMD":"getAnkenData",
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "ankenDataPageNum":-1,
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(data) {

        if (data != null && data != "" && data.length > 0) {


            $('#anythingChild0Graph').remove();
            $('#anythingChild0GraphArea').append('<div id=\"anythingChild0Graph\"></div>');

            var grapthParamStr    = "[";
            var labelStr    ="";
            var sumOfJuchu = 0;
            var sumOfMitumori = 0;
            var brStr = "";

            for (i=0; i < data.length; i++) {

                if (i % 2 == 0) {
                    brStr =""
                } else {
                    brStr="<br><br>";
                }

                 var dataMdl = data[i];

                 if (i != 0 && i != data.length) {
                     grapthParamStr += ",";
                     labelStr += ",";
                 }

                 grapthParamStr += "[";

                 grapthParamStr += "["
                                +  dataMdl.nanKinMitumori
                                +  ","
                                +  1
                                +  ",'"
                                +  "<span style=\"font-weight:bold;color:#333333;\">"
                                +  brStr
                                +  htmlEscape(dataMdl.nanName)
                                +  "</span>"
                                +  "'],";

                 sumOfMitumori  += Number(dataMdl.nanKinMitumori);

                 grapthParamStr += "["
                                +  dataMdl.nanKinJutyu
                                +  ","
                                +  2
                                +  ",'"
                                +  "<span style=\"font-weight:bold;color:#333333;\">"
                                +  brStr
                                +  htmlEscape(dataMdl.nanName)
                                +  "</span>"
                                +  "'],";

                 sumOfJuchu  += Number(dataMdl.nanKinJutyu);

                 grapthParamStr += "]";
            }

            grapthParamStr      += "]";

            var grapthParamObject = eval(grapthParamStr);

            //var tooltipFormatStr = "<table class=\"jqplot-highlighter\"><tr><td>%s</td><td></td></tr><tr><td>金額:</td><td>%s</td><td>%s</td></tr><tr></tr></table>"

            jQuery( function() {
                jQuery.jqplot(
                    'anythingChild0Graph',
                    grapthParamObject,
                    {
                        axes: {
                            xaxis: {
                                tickRenderer: jQuery . jqplot . CanvasAxisTickRenderer ,
                                tickOptions: {
                                  angle: -30,
                                  fontSize: '8pt'
                                }
                            },
                            yaxis: {
                                renderer: jQuery . jqplot . CategoryAxisRenderer,
                                ticks:['見積り金額合計<br><span style="font-weight:bold;font-size:14px;color;#333333;">' + addFigure(sumOfMitumori) + '</span>円', '受注金額合計<br><span style="font-weight:bold;font-size:14px;color;#333333;">' + addFigure(sumOfJuchu) + '</span>円']
                            }
                        },
                        animate: true,
                        animateReplot: true,
                        stackSeries: true,
                        seriesDefaults: {
                            renderer: jQuery . jqplot . BarRenderer,
                            rendererOptions: {
                                barPadding: 8,
                                barMargin: 10,
                                barDirection: 'horizontal',
                                barWidth: null,
                                shadowOffset: 2,
                                shadowDepth: 5,
                                shadowAlpha: 0.08,
                                animation: {
                                    speed: 1500
                                }
                            },
                            pointLabels:{show:true,
                                escapeHTML:false}
                        },
                        highlighter: {
                            show: true,
                            showMarker: true,
                            tooltipLocation: 'ne',
                            tooltipAxes: 'x',
                            formatString:'%s'
                        }
                    }
                );
            } );
        } else {
            $('#anythingChild0Graph').remove();
            $('#anythingChild0GraphArea').append('<div id=\"anythingChild0Graph\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}

function drawAnythingChild1Graph() {


    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":"getAnkenStateCnt",
                                   "CMD":"getAnkenStateCnt",
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "state":$("input[name=ntp220State]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(cntData) {

        if (cntData != null && cntData != "" && !(cntData.syodanCnt == 0 && cntData.sityuCnt == 0 && cntData.jutyuCnt == 0)) {

            $('#anythingChild1Graph').remove();
            $('#anythingChild1GraphArea').append('<div id=\"anythingChild1Graph\"></div>');

            var data = [['受注', cntData.jutyuCnt],['失注', cntData.sityuCnt], ['商談中', cntData.syodanCnt]];
            var resultPlot = jQuery.jqplot ('anythingChild1Graph', [data],
              {
                seriesDefaults: {
                  renderer: jQuery.jqplot.PieRenderer,
                  rendererOptions: {
                    showDataLabels: true
                  }
                },
                legend: { show:true, location: 'e' }
              }
            );

            $("#anythingChild1Graph").bind('jqplotDataHighlight', function(ev, seriesIndex, pointIndex, data, radius) {
              var chart_left = $('#anythingChild1Graph').offset().left,
              chart_top = $('#anythingChild1Graph').offset().top,
              x = chart_left + 110;
              y = chart_top + 100;
              var color = 'rgb(50%,50%,100%)';
              $('#tooltipAnythingChild1').css({left:x, top:y});
              $('#tooltipAnythingChild1').addClass("bgC_body");
              $('#tooltipAnythingChild1').html('<span class="fs_12 fw_b">' + data[0] + '</span><br />' + '件数: ' + data[1]);
              $('#tooltipAnythingChild1').show();

            });

            $("#anythingChild1Graph").bind('jqplotDataUnhighlight', function(ev, seriesIndex, pointIndex, data) {
                $('#tooltipAnythingChild1').empty();
                $('#tooltipAnythingChild1').hide();
            });


        } else {
            $('#anythingChild1Graph').remove();
            $('#anythingChild1GraphArea').append('<div id=\"anythingChild1Graph\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });

}

function drawAnythingChild1HorizonGraph() {

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":"getAnkenStateCnt",
                                   "CMD":"getAnkenStateCnt",
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "state":$("input[name=ntp220State]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(cntData) {

        if (cntData != null && cntData != "" && !(cntData.syodanCnt == 0 && cntData.sityuCnt == 0 && cntData.jutyuCnt == 0)) {

            $('#anythingChild1Graph').remove();
            $('#anythingChild1GraphArea').append('<div id=\"anythingChild1Graph\"></div>');

            jQuery . jqplot(
                    'anythingChild1Graph',
                    [
                        [[cntData.syodanCnt, '商談中'], [cntData.sityuCnt, '失注'], [cntData.jutyuCnt, '受注']]
                    ],
                    {
                        animate: true,
                        animateReplot: true,
                        seriesColors:['#c5b47f', '#eaa228', '#4bb2c5'],
                        seriesDefaults: {
                            renderer: jQuery . jqplot . BarRenderer,
                            rendererOptions: {
                                barDirection: 'horizontal',
                                varyBarColor: true,
                                animation: {
                                    speed: 1500
                                }
                            }
                        },
                        axes: {
                            yaxis: {
                                renderer: jQuery . jqplot . CategoryAxisRenderer
                            }
                        },
                        highlighter: {
                            show: true,
                            showMarker: false,
                            tooltipLocation: 'e',
                            tooltipAxes: 'x',
                            formatString: '　%s　'
                        }
                    }
                );

        } else {
            $('#anythingChild1Graph').remove();
            $('#anythingChild1GraphArea').append('<div id=\"anythingChild1Graph\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });

}

function drawAnythingChild2Graph() {

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":"getShohinData",
                                   "CMD":"getShohinData",
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(shnData) {

        if (shnData != null && shnData != "" && shnData.length > 0) {

            var heightStr = 200;

            if ((28 * shnData.length) > 200) {
                heightStr = 28 * shnData.length;
            }

            $('#anythingChild2Graph').remove();
            $('#anythingChild2GraphArea').append('<div id=\"anythingChild2Graph\" style=\"height:' + heightStr + 'px\"></div>');

            var shnStr    = "[";

            for (i=0; i < shnData.length; i++) {
                 if (i != 0 && i != shnData.length) {
                     shnStr += ",";
                 }
                 shnStr += "['"
                          +  htmlEscape(shnData[i].nhnName)
                          +  "',"
                          +  shnData[i].nshCnt
                          +  "]";
            }

            shnStr    += "]";

            var shohinObject = eval(shnStr);

            var resultPlot = jQuery.jqplot ('anythingChild2Graph', [shohinObject],
              {
                seriesDefaults: {
                  renderer: jQuery.jqplot.PieRenderer,
                  rendererOptions: {
                    showDataLabels: true
                  }
                },
                legend: { show:true, location: 'e' }
              }
            );

            $("#anythingChild2Graph").bind('jqplotDataHighlight', function(ev, seriesIndex, pointIndex, data, radius) {
              var chart_left = $('#anythingChild2Graph').offset().left,
              chart_top = $('#anythingChild2Graph').offset().top,
              x = chart_left + 110;
              y = chart_top + 100;
              var color = 'rgb(50%,50%,100%)';
              $('#tooltipAnythingChild2').css({left:x, top:y});
              $('#tooltipAnythingChild2').addClass("bgC_body");
              $('#tooltipAnythingChild2').html('<span class="fs_12 fw_b">' + data[0] + '</span><br />' + '件数: ' + data[1]);
              $('#tooltipAnythingChild2').show();

            });

            $("#anythingChild2Graph").bind('jqplotDataUnhighlight', function(ev, seriesIndex, pointIndex, data) {
                $('#tooltipAnythingChild2').empty();
                $('#tooltipAnythingChild2').hide();
            });

        } else {
            $('#anythingChild2Graph').remove();
            $('#anythingChild2GraphArea').append('<div id=\"anythingChild2Graph\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}


function drawAnythingChild2HorizonGraph() {


    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":"getShohinData",
                                   "CMD":"getShohinData",
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(shnData) {

        if (shnData != null && shnData != "" && shnData.length > 0) {

            var heightStr = 200;

            if ((60 * shnData.length) > 200) {
                heightStr = 60 * shnData.length;
            }

            $('#anythingChild2Graph').remove();
            $('#anythingChild2GraphArea').append('<div id=\"anythingChild2Graph\" style=\"height:' + heightStr + 'px\"></div>');

            var shnStr    = "[";

            for (i=0; i < shnData.length; i++) {
                 if (i != 0 && i != shnData.length) {
                     shnStr += ",";
                 }
                 shnStr += "["
                          +  shnData[i].nshCnt
                          +  ",'"
                          +  strCut(shnData[i].nhnName)
                          +  "']";
            }

            shnStr    += "]";

            var shohinObject = eval(shnStr);

            jQuery . jqplot(
                    'anythingChild2Graph',
                    [
                        shohinObject
                    ],

                    {
                        animate: true,
                        animateReplot: true,
                        seriesColors:['#839557', '#579575', '#c5b47f', '#eaa228', '#4bb2c5'],
                        seriesDefaults: {
                            renderer: jQuery . jqplot . BarRenderer,
                            rendererOptions: {
                                barDirection: 'horizontal',
                                varyBarColor: true,
                                animation: {
                                    speed: 1500
                                }
                            }
                        },
                        axes: {
                            yaxis: {
                                pad:0,
                                renderer: jQuery . jqplot . CategoryAxisRenderer
                            }
                        },
                        highlighter: {
                            show: true,
                            showMarker: false,
                            tooltipLocation: 'e',
                            tooltipAxes: 'x',
                            formatString: '　%s　'
                        }
                    }
                );
        } else {
            $('#anythingChild2Graph').remove();
            $('#anythingChild2GraphArea').append('<div id=\"anythingChild2Graph\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}



//ユーザ一覧成形
function getSearchBtnResultList(contentSid, pageNum, searchWord) {

    //ユーザ一覧取得
    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":"getSearchBtnResultList",
                                   "CMD":"getSearchBtnResultList",
                                   "contentSid":contentSid,
                                   "pageNum":pageNum,
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "searchWord":searchWord,
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(data) {
        if (data != null || data != "") {

            $('#searchBtnResultArea').children().remove();

            if (data.menuParamList != null && data.menuParamList.length > 0) {

                var searchBtnResultInfstr = "";
                var maxpagesize = data.maxPageSize;
                pageNum = data.pageNum;

                //ページング
                if (parseInt(maxpagesize) > 1) {
                    searchBtnResultInfstr += "<div class=\"paging\">"
                              +  "<button type=\"button\" class=\"webIconBtn prevPageBtn\" id=\"" + contentSid + ":" + pageNum + "\">"
                              +  "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_l.png\" alt=\"前頁\">"
                              +  "<i class=\"icon-paging_left\"></i>"
                              +  "</button>"
                              +  "<select name=\"searchBtnResultChange\" id=\"" + contentSid + "\" class=\"selchange paging_combo\">";
                    for (p=1; p <= parseInt(maxpagesize); p++) {
                        if (pageNum == p) {
                            searchBtnResultInfstr +=  "<option value=\"" + p + "\" selected=\"selected\">" + p + " / " + maxpagesize + "</option>";
                        } else {
                            searchBtnResultInfstr +=  "<option value=\"" + p + "\">" + p + " / " + maxpagesize + "</option>";
                        }
                    }

                    searchBtnResultInfstr +=  "</select>"
                              +  "<button type=\"button\" class=\"webIconBtn nextPageBtn\"  id=\"" + contentSid + ":" + pageNum + "\">"
                              +  "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_r.png\" alt=\"後頁\">"
                              +  "<i class=\"icon-paging_right\"></i>"
                              +  "</button>"
                              +  "</div>";
                }

                searchBtnResultInfstr += "<table class=\"table-top w100\">"
                //メニュー一覧
                for (i=0; i<data.menuParamList.length; i++) {

                    searchBtnResultInfstr += "<tr class=\"js_listHover\"><td class=\"w100 cursor_p\" onclick=\"selDialogContent('"
                                          +  contentSid
                                          +  "','"
                                          +  contentSid
                                          +  "_"
                                          +  data.menuParamList[i].contentSid1;
                    if (data.menuParamList[i].contentSid2 != null && data.menuParamList[i].contentSid2 != "") {
                        searchBtnResultInfstr += "_" + data.menuParamList[i].contentSid2;
                    }
                    searchBtnResultInfstr += "','"
                                          +  htmlEscape(data.menuParamList[i].contentName1)
                                          +  "','";

                    if (data.menuParamList[i].contentName2 != null && data.menuParamList[i].contentName2 != "") {
                        searchBtnResultInfstr += htmlEscape(data.menuParamList[i].contentName2);
                    }

                    searchBtnResultInfstr += "');\">"
                                          +  "<span class=\"cl_linkDef\">"
                                          +  htmlEscape(data.menuParamList[i].contentName1);

                    if (data.menuParamList[i].contentName2 != null && data.menuParamList[i].contentName2 != "") {
                        searchBtnResultInfstr += "&nbsp;&nbsp;" + htmlEscape(data.menuParamList[i].contentName2);
                    }

                    searchBtnResultInfstr += "\</span>"
                                          +  "</td></tr>";
                }
                searchBtnResultInfstr += "</table>"

                //ページング
                if (parseInt(maxpagesize) > 1) {
                    searchBtnResultInfstr += "<div class=\"paging\">"
                              +  "<button type=\"button\" class=\"webIconBtn prevPageBtn\" id=\"" + contentSid + ":" + pageNum + "\">"
                              +  "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_l.png\" alt=\"前頁\">"
                              +  "<i class=\"icon-paging_left\"></i>"
                              +  "</button>"
                              +  "<select name=\"searchBtnResultChange\" id=\"" + contentSid + "\" class=\"selchange paging_combo\">";
                    for (p=1; p <= parseInt(maxpagesize); p++) {
                        if (pageNum == p) {
                            searchBtnResultInfstr +=  "<option value=\"" + p + "\" selected=\"selected\">" + p + " / " + maxpagesize + "</option>";
                        } else {
                            searchBtnResultInfstr +=  "<option value=\"" + p + "\">" + p + " / " + maxpagesize + "</option>";
                        }
                    }

                    searchBtnResultInfstr +=  "</select>"
                              +  "<button type=\"button\" class=\"webIconBtn nextPageBtn\"  id=\"" + contentSid + ":" + pageNum + "\">"
                              +  "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_r.png\" alt=\"後頁\">"
                              +  "<i class=\"icon-paging_right\"></i>"
                              +  "</button>"
                              +  "</div>";
                }

                $('#searchBtnResultArea').append(searchBtnResultInfstr);
            } else {
                $('#searchBtnResultArea').append("<span class=\"h100 w100 txt_c cl_fontWarn\">該当するデータがありません。</span>");
            }
        }
    });
}

//ダイアログ項目選択
function selDialogContent(contentSid, paramStr, name1, name2) {

    $(".sel_menu_content_text").removeClass("sel_menu_content_text_sel");

    if ($("#" + paramStr).html() != null) {
        var htmlStr = $("#" + paramStr).clone(true);
        $("#" + paramStr).next().remove();
        $("#" + paramStr).remove();
        $("#" + contentSid + "_sel_menu_after_area").after(htmlStr);
        $("#" + contentSid + "_sel_menu_after_area").next().after("<br />");
        $(".sel_menu_content_text").removeClass("sel_menu_content_text_sel");
        $("#" + paramStr).addClass("sel_menu_content_text_sel");
    } else {
        var contentParam = paramStr.split("_");
        var dspContentStr = name1.substring(0, 12);
        var selMenu = "<span class=\"sel_menu_content_text sel_menu_content_text_sel\" id=\""
                    +  contentSid
                    +  "_"
                    +  contentParam[1];
                    if (contentParam[2] != null && contentParam[2] != "") {
                        selMenu += "_" + contentParam[2];
                    }
                    selMenu +=  "\">" + dspContentStr;
                    selMenu += "<input type=\"hidden\" value=\"" + name1 + "<br>" + name2 + "\" />";
                    selMenu += "<span style=\"display:none;\" class=\"tooltips\"><span class=\"tooltip_txt\">" + name1;
                    if (name2 != null && name2 != "") {
                        selMenu += "<br />" + name2;
                    }
                    selMenu += "</span></span></span><br />";
        $("#" + contentSid + "_sel_menu_after_area").after(selMenu);
        var alreadyStr = $("#" + contentSid + "_already_sel").val();
        alreadyStr += contentParam[1]
                   + "_";
        if (contentParam[2] != null && contentParam[2] != "") {
            alreadyStr += contentParam[2];
        } else {
            alreadyStr += "0";
        }
        alreadyStr += ",";
        $("#" + contentSid + "_already_sel").val(alreadyStr);
    }
    $('.anything_child_area').parent().removeClass('display_n');
    $('.anything_area').parent().addClass('display_n');
    $('.anything_kadou_area').parent().addClass('display_n');
    $('.def_graph').addClass('display_n');
    $(".sel_menu_content_text").removeClass("sel_menu_content_text_sel");
    $("input[name=ntp220NowSelChildId]").val(paramStr);
//    $(".child_sel_content_title").html(name1 + "<br>" + name2);
    $(".child_sel_content_head_title").html(name1 + "&nbsp" + name2);
    $("#" + paramStr).addClass("sel_menu_content_text_sel");
    anythingChildAllGraph();
    $('#searchBtnResultPop').dialog('close');
}

function drawAnkenDataArea() {

    var gyoushuSid = -1;
    if ($("input[name=ntp220NowSelParentId]").val() == "process") {
        if ($("select[name=ntp220GyoushuSid]").val() != null) {
            gyoushuSid = $("select[name=ntp220GyoushuSid]").val();
        }
    }

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":"getAnkenData",
                                   "CMD":"getAnkenData",
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ankenListState]").val(),
                                   "ankenDataPageNum":$("input[name=ankenDataPageNum]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "gyoushuSid":gyoushuSid,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(data) {

        if (data != null && data != "" && data.length > 0) {
            var pageNum = $("input[name=ankenDataPageNum]").val();
            $("input[name=ankenDataPageNum]").val((Number(pageNum) + 1));

            var ankenDataStr = "";

            for (i=0; i < data.length; i++) {
                var dataMdl = data[i];
                var shohinStr = "";
                var tantoStr = "";
                var shohinStrHidden = "";

                //商品
                if (dataMdl.shohinList.length > 0) {
                    for (n=0; n < dataMdl.shohinList.length; n++) {
                      var shnMdl = dataMdl.shohinList[n];

                      if($("select[name=ntp220CatSid]").val() != "-1") {
                          if (shnMdl.nscSid == $("select[name=ntp220CatSid]").val()) {
                              shohinStr += htmlEscape(shnMdl.nhnName)
                              +  "<br>";
                          } else {
                              shohinStrHidden += htmlEscape(shnMdl.nhnName)
                              +  "<br>";
                          }
                      } else {
                          shohinStr += htmlEscape(shnMdl.nhnName)
                          +  "<br>";
                      }
                    }
                }

                //担当者
                if (dataMdl.tantoUsrInfList.length > 0) {
                    for (n=0; n < dataMdl.tantoUsrInfList.length; n++) {
                      var tantoMdl = dataMdl.tantoUsrInfList[n];
                      tantoStr += "<a href=\"#!\" onClick=\"openUserInfoWindow("
                               +  tantoMdl.usrSid
                               +  ");\">"
                               +  tantoMdl.usiSei + "&nbsp;" + tantoMdl.usiMei
                               +  "</a>"
                               +  "<br>";
                    }
                }

                var trClassName = "anken_val";
                if ((((pageNum-1)*5) + i + 1) % 2 == 0) {
                    trClassName = "anken_val2";
                }
                if (Number(dataMdl.nahSid) == -1) {
                    trClassName += " js_listHover cursor_p anken_name_link\" id=\"" + dataMdl.nanSid;
                }

                ankenDataStr += "<tr class=\"" + trClassName + "\"><td class=\"txt_c\">"
                             +  (((pageNum-1)*5) + i + 1)
                             +  "</td>";

                if (Number(dataMdl.nahSid) == -1) {
                    ankenDataStr += "<td class=\"txt_l cl_linkDef\">";
                } else {
                    ankenDataStr += "<td class=\"anken_name_link_his\" id=\"" + dataMdl.nahSid + "\">";
                }

                ankenDataStr +=  htmlEscape(dataMdl.nanName)
                             +  "</td><td class=\"txt_c\">";

                var stateStr = "商談中";
                if (dataMdl.nanSyodan == 1) {
                    stateStr = "受&nbsp;&nbsp;注";
                } else if (dataMdl.nanSyodan == 2) {
                    stateStr = "失&nbsp;&nbsp;注";
                }

                ankenDataStr += stateStr
                             +  "</td><td class=\"anken_list_mitumori txt_r";

                if ($("input[name=ankenListMoney]").val() != 0) {
                    ankenDataStr += " display_n";
                }

                ankenDataStr +=  "\">"
                             +  "<span class=\"tooltips display_n\"><span class=\"tooltip_txt2\">"
                             +  "提出日:" + dataMdl.nanMitumoriDateStr;

                if (dataMdl.nanMitumoriDateKbn == 1) {
                    ankenDataStr +=  "<br><span class=\"cl_fontWarn\">(見積もり日は指定期間の範囲外です。)</span>";
                }

                ankenDataStr +=  "</span></span>"
                             +  "<div class=\"mitumori_kin_str\">" + addFigure(dataMdl.nanKinMitumori) + "</div>"
                             +  "</td><td class=\"txt_r anken_list_jutyu";

                if ($("input[name=ankenListMoney]").val() == 0) {
                    ankenDataStr += " display_n";
                }

                ankenDataStr +=  "\">"
                             +  "<span class=\"tooltips display_n\"><span class=\"tooltip_txt2\">"
                             +  "受注日:" + dataMdl.nanJutyuDateStr;

                             if (dataMdl.nanJutyuDateKbn == 1) {
                                 ankenDataStr +=  "<br><span class=\"cl_fontWarn\">(受注日は指定期間の範囲外です。)</span>";
                             }

               ankenDataStr  +=  "</span></span>"
                             +  "<div class=\"jutyu_kin_str\">" + addFigure(dataMdl.nanKinJutyu) + "</div>"
                             +  "</td>";


                ankenDataStr += "<td class=\"txt_l anken_list_other anken_list_kigyou ";
                if ($("input[name=ankenListOther]").val() != 0) {
                    ankenDataStr += "display_n";
                }
                ankenDataStr +=  "\">"
                             +  htmlEscape(dataMdl.cntName1);
                if (dataMdl.cntName2 != null && dataMdl.cntName2 != "") {
                    ankenDataStr += "<br>" + htmlEscape(dataMdl.cntName2);
                }
                ankenDataStr += "</td>";


                //商品
                ankenDataStr += "<td = class=\"txt_l anken_list_other anken_list_shohin ";
                if ($("input[name=ankenListOther]").val() != 1) {
                    ankenDataStr += "display_n";
                }
                ankenDataStr +=  "\">"
                             +  shohinStr;

                if (shohinStrHidden != "") {
                    ankenDataStr += "<div class=\"other_category_itm\">▼他のカテゴリの商品</div>";
                    ankenDataStr +=  "<div class=\"display_n\">" + shohinStrHidden + "</div>";
                }

                ankenDataStr += "</td>";

                //業種
                ankenDataStr += "<td class=\"txt_l anken_list_other anken_list_gyoushu ";
                if ($("input[name=ankenListOther]").val() != 2) {
                    ankenDataStr += "display_n";
                }
                ankenDataStr +=  "\">"
                             +  htmlEscape(dataMdl.ngyName);
                ankenDataStr += "</td>";

                //プロセス
                ankenDataStr += "<td class=\"txt_l anken_list_other anken_list_process ";
                if ($("input[name=ankenListOther]").val() != 3) {
                    ankenDataStr += "display_n";
                }
                ankenDataStr +=  "\">"
                             +  htmlEscape(dataMdl.ngpName);
                ankenDataStr += "</td>";

                //見込み度
                ankenDataStr += "<td class=\"txt_c anken_list_other anken_list_mikomido ";
                if ($("input[name=ankenListOther]").val() != 4) {
                    ankenDataStr += "display_n";
                }
                ankenDataStr +=  "\">"
                             +  dataMdl.nanMikomiVal;
                ankenDataStr += "</td>";

                //顧客源泉
                ankenDataStr += "<td class=\"txt_l anken_list_other anken_list_kokyakugensen ";
                if ($("input[name=ankenListOther]").val() != 5) {
                    ankenDataStr += "display_n";
                }
                ankenDataStr +=  "\">"
                             +  htmlEscape(dataMdl.ncnName);
                ankenDataStr += "</td>";

                //担当者
                ankenDataStr += "<td class=\"txt_l anken_list_other anken_list_tanto ";
                if ($("input[name=ankenListOther]").val() != 6) {
                    ankenDataStr += "display_n";
                }
                ankenDataStr +=  "\">"
                             +  tantoStr;
                ankenDataStr += "</td>";

                ankenDataStr += "</tr>";
            }

            if (i >= 5) {
                $(".anken_list_more_area").removeClass("display_n");
            } else {
                $(".anken_list_more_area").addClass("display_n");
            }

            if (pageNum != 1) {
                $('#anken_val_table').append(ankenDataStr);
            } else {
                $('#anken_val_title').after(ankenDataStr);
            }

        } else {
            $(".anken_list_more_area").addClass("display_n");
            $('#ankenDataArea').append('<div id=\"anythingGraph2\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}

//期間稼働時間グラフ
function drawKadouGraph() {

    var cmdStr = "getPeriodKadouData";
    var defGraphMode = $("input[name=def_graph_val]").val();

    $.ajaxSetup({async:true});
    $.post('../nippou/ntp220.do', {"cmd":cmdStr,
                                   "CMD":cmdStr,
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "defGraphMode":defGraphMode,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(cntData) {


        if (cntData != null && cntData != "" && cntData.length > 0) {

            $('#kadouGraph').remove();
            $('#kadouGraphArea').append('<div id=\"kadouGraph\" class=\"hp260\"></div>');

            var sumKadouTime = 0;

            var dateStr      = "[";
            var kadouStr     = "[";

            var dayAddFlg = 0;

            for (i = 0; i < cntData.length; i++) {
                var totalData = cntData[i];

                if (i != 0) {
                    dateStr      += ",";
                    kadouStr     += ",";
                }
                dateStr      += "'" + totalData.dateStr + "'"
                kadouStr     += totalData.sumKadouTime;
                sumKadouTime += totalData.sumKadouTime;

                if (dayAddFlg == 0) {
                    $('#sum_kadou_days').children().remove();
                    $('#sum_kadou_days').append("<span class=\"td_u\">" + addFigure(totalData.totalKadouDays) + "</span>");
                    dayAddFlg = 1;
                }

            }

            var ticksOpsAngle = 0;
            var ticksOpsSize = '7pt';
            if (cntData.length > 13) {
                ticksOpsAngle = -30;
                ticksOpsSize  = '8pt';
            }

            dateStr      += "]";
            kadouStr     += "]";

            dataStr      = eval(dateStr);
            kadouStr     = eval(kadouStr);

            var jutyuVal = kadouStr;
            var tick = dataStr;

            $('#sum_kadou_time').children().remove();
            $('#sum_kadou_time').append("<span class=\"td_u\">" + addFigure(cntData[0].totalKadouTime) + "</span>");

            $('#sum_kadou_time_average').children().remove();
            $('#sum_kadou_time_average').append("<span class=\"td_u\">" + (sumKadouTime/totalData.totalKadouDays).toFixed(1) + "</span>");

            if(defGraphMode == "0") {
                var ankenPlot = $.jqplot('kadouGraph', [jutyuVal], {
                    animate: true,
                    animateReplot: true,
                    legend: {
                       show: true,
                       location: 'nw',
                       renderer: jQuery . jqplot . EnhancedLegendRenderer,
                       rendererOptions:{ numberColumns: 3}
                    },

                    highlighter: {
                        show: true,
                        showMarker: false,
                        sizeAdjust: 0,
                        tooltipLocation: 'n',
                        tooltipAxes: 'y',
                        formatString: '%s'
                    },

                    series:[
                      {
                        label:'稼働時間(h)',
                        yaxis:'yaxis',
                        rendererOptions: {
                                animation: {
                                    speed: 1500
                                }
                            }
                        }
                    ],
                    axes: {
                      xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer,
                        ticks: tick,
                        label: '',
                        tickRenderer: jQuery . jqplot . CanvasAxisTickRenderer ,
                        tickOptions: {angle:ticksOpsAngle,fontSize:ticksOpsSize}
                      },
                      yaxis: {
                        label: '',
                        tickOptions: {
                            formatString:'%#.1f'
                        }
                      },
                      y2axis: {
                        label: '',
                        tickOptions: {
                            formatString:'%#.1f'
                        }
                      }
                    }
                  });
            }

        } else {
            $('#kadouGraph').remove();
            $('#kadouGraphArea').append('<div id=\"kadouGraph\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });

}



function drawAnythingKadou1Graph() {

    var cmdStr = "getKadouAnkenCnt";
    var dataFlg = true;

    var gyoushuSid = -1;

    $("input[name=anythingKadou1NowCount]").val(0);
    $("input[name=anythingKadou1page]").val(1)
    $('#anythingKadou1_more').addClass("display_n");

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":cmdStr,
                                   "CMD":cmdStr,
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "pageNum":-1,
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "gyoushuSid":gyoushuSid,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(cntData) {

        if (cntData != null && cntData != "") {


            var heightStr = 300;

            if (cntData.length > 0) {
                if ((40 * cntData.length) > 300) {
                    heightStr = 40 * cntData.length;
                }
            }

            $('#anythingKadouGraph1').remove();
            $('#anythingKadouGraph1Area').append('<div style=\"height:' + heightStr + 'px;\" id=\"anythingKadouGraph1\"></div>');


            var data = "";

            if (cntData.length > 0) {
                var dataStr = "";
                dataStr += "[";
                for (i = 0; i < cntData.length; i++) {

                    var totalData = cntData[i];
                    if (i == 0) {
                        dataStr += "['";
                    } else {
                        dataStr += ",['";
                    }

                    var ankenName = htmlEscape(totalData.name);

                    if (ankenName == "noAnken") {
                        ankenName = "案件なし";
                    }

                    dataStr += ankenName
                            +  "',"
                            +  totalData.sumKadouTime
                            +  "]";
                }
                dataStr += "]";
                data = eval(dataStr);
                dataFlg = true;
            }

            var resultPlot = jQuery.jqplot ('anythingKadouGraph1', [data],
              {
                seriesDefaults: {
                  renderer: jQuery.jqplot.PieRenderer,
                  rendererOptions: {
                    showDataLabels: true
                  }
                },
                legend: { show:true, location: 'e' }
              }
            );

            $("#anythingKadouGraph1").bind('jqplotDataHighlight', function(ev, seriesIndex, pointIndex, data, radius) {
              var chart_left = $('#anythingKadouGraph1').offset().left,
              chart_top = $('#anythingKadouGraph1').offset().top,
              x = chart_left + 110;
              y = chart_top + 100;
              var color = 'rgb(50%,50%,100%)';
              $('#tooltipAnythingKadou1').css({left:x, top:y});
              $('#tooltipAnythingKadou1').addClass("bgC_body");
              $('#tooltipAnythingKadou1').html('<span class=\"fs_12 fw_b\">' + data[0] + '</span><br />' + data[1] + '時間');
              $('#tooltipAnythingKadou1').show();

            });

            $("#anythingKadouGraph1").bind('jqplotDataUnhighlight', function(ev, seriesIndex, pointIndex, data) {
                $('#tooltipAnythingKadou1').empty();
                $('#tooltipAnythingKadou1').hide();
            });

            if (!dataFlg) {
                $('#anythingKadouGraph1').remove();
                $('#anythingKadouGraph1Area').append('<div id=\"anythingKadouGraph1\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
            }

        } else {
            $('#anythingKadouGraph1').remove();
            $('#anythingKadouGraph1Area').append('<div id=\"anythingKadouGraph1\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}
/**
 * 非表示のタグを生成する
 * 横棒グラフのラベル名に使用する。
 * 横棒グラフのラベル名が重複する場合、表示位置が重複してしまう。
 * 非表示のタグ内にSIDを記述することで重複を防ぐ
 * @param id
 * @returns {String}
 */
function noDispIdTag(id) {
    var ret = "<span style=\"display:none;\">" + id + "</span>"
    return ret;
}


function drawAnythingKadou1HorizonGraph() {

    var cmdStr = "getKadouAnkenCnt";
    var dataFlg = true;

    var gyoushuSid = -1;
    var graphHeight = 100;

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":cmdStr,
                                   "CMD":cmdStr,
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "pageNum":$("input[name=anythingKadou1page]").val(),
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "gyoushuSid":gyoushuSid,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(cntData) {

          if (cntData != null && cntData != "" && cntData.length > 0) {

            if ((cntData.length * 60) > 100) {
                graphHeight = cntData.length * 60;
            }

            if (cntData.length > 0 && cntData.length > Number($("input[name=anythingKadou1NowCount]").val())) {
                $('#anythingKadou1_more').removeClass("display_n");
            } else {
                $('#anythingKadou1_more').addClass("display_n");
            }

            $("input[name=anythingKadou1NowCount]").val(cntData.length);


            $('#anythingKadouGraph1').remove();
            $('#anythingKadouGraph1Area').append('<div id=\"anythingKadouGraph1\" style=\"height:' + graphHeight +  'px;\"></div>');

            var kadouStr    = "[";

            for (i = cntData.length - 1; i >= 0; i--) {

                var totalData = cntData[i];

                 if (i != cntData.length - 1) {
                     kadouStr += ",";
                 }

                 var ankenName = totalData.name;

                 if (ankenName == "noAnken") {
                     ankenName = "案件なし";
                 }

                 kadouStr += "["
                          +  totalData.sumKadouTime
                          +  ",'"
                          +  strCut(ankenName) + noDispIdTag(totalData.sid)
                          +  "']";
            }

            kadouStr    += "]";

            var kadouObject    = eval(kadouStr);

            jQuery( function() {

                jQuery.jqplot(
                        'anythingKadouGraph1',
                        [kadouObject],

                        {
                            animate: true,
                            animateReplot: true,
                            seriesColors:['#839557', '#579575', '#c5b47f', '#eaa228', '#4bb2c5'],
                            seriesDefaults: {
                                renderer: jQuery . jqplot . BarRenderer,
                                rendererOptions: {
                                    barDirection: 'horizontal',
                                    varyBarColor: true,
                                    animation: {
                                        speed: 1500
                                    }
                                }
                            },
                            axes: {
                                xaxis: {
                                tickRenderer: jQuery . jqplot . CanvasAxisTickRenderer ,
                                tickOptions: {
                                  angle: -30,
                                  fontSize: '8pt',
                                  formatString:'%#.1f'
                                }
                                },
                                yaxis: {
                                    pad:0,
                                    renderer: jQuery . jqplot . CategoryAxisRenderer
                                }
                            },
                            highlighter: {
                                show: true,
                                showMarker: false,
                                tooltipLocation: 'n',
                                tooltipAxes: 'x',
                                formatString: '　%s　'
                            }
                        }
                    );



            } );
        } else {
            $('#anythingKadouGraph1').remove();
            $('#anythingKadou1_more').addClass("display_n");
            $('#anythingKadouGraph1Area').append('<div id=\"anythingKadouGraph1\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}


function drawAnythingKadou2Graph() {

    var cmdStr = "getKadouKigyouCnt";
    var dataFlg = true;

    var gyoushuSid = -1;

    $("input[name=anythingKadou2NowCount]").val(0);
    $("input[name=anythingKadou2page]").val(1)
    $('#anythingKadou2_more').addClass("display_n");

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":cmdStr,
                                   "CMD":cmdStr,
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "pageNum":-1,
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "gyoushuSid":gyoushuSid,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(cntData) {

        if (cntData != null && cntData != "") {

            var heightStr = 300;

            if (cntData.length > 0) {
                if ((40 * cntData.length) > 300) {
                    heightStr = 40 * cntData.length;
                }
            }

            $('#anythingKadouGraph2').remove();
            $('#anythingKadouGraph2Area').append('<div style=\"height:' + heightStr + 'px;\" id=\"anythingKadouGraph2\"></div>');

            var data = "";

            if (cntData.length > 0) {
                var dataStr = "";
                dataStr += "[";
                for (i = 0; i < cntData.length; i++) {
                    var totalData = cntData[i];
                    if (i == 0) {
                        dataStr += "['";
                    } else {
                        dataStr += ",['";
                    }

                    var ankenName = htmlEscape(totalData.name);

                    if (ankenName == "noKigyou") {
                        ankenName = "企業なし";
                    }

                    dataStr += ankenName
                            +  "',"
                            +  totalData.sumKadouTime
                            +  "]";
                }
                dataStr += "]";
                data = eval(dataStr);
                dataFlg = true;
            }


            var resultPlot = jQuery.jqplot ('anythingKadouGraph2', [data],
              {
                seriesDefaults: {
                  renderer: jQuery.jqplot.PieRenderer,
                  rendererOptions: {
                    showDataLabels: true
                  }
                },
                legend: { show:true, location: 'e' }
              }
            );

            $("#anythingKadouGraph2").bind('jqplotDataHighlight', function(ev, seriesIndex, pointIndex, data, radius) {
              var chart_left = $('#anythingKadouGraph2').offset().left,
              chart_top = $('#anythingKadouGraph2').offset().top,
              x = chart_left + 110;
              y = chart_top + 100;
              var color = 'rgb(50%,50%,100%)';
              $('#tooltipAnythingKadou2').css({left:x, top:y});
              $('#tooltipAnythingKadou2').addClass("bgC_body");
              $('#tooltipAnythingKadou2').html('<span class="fs_12 fw_b">' + data[0] + '</span><br />' + data[1] + '時間');
              $('#tooltipAnythingKadou2').show();

            });

            $("#anythingKadouGraph2").bind('jqplotDataUnhighlight', function(ev, seriesIndex, pointIndex, data) {
                $('#tooltipAnythingKadou2').empty();
                $('#tooltipAnythingKadou2').hide();
            });

            if (!dataFlg) {
                $('#anythingKadouGraph2').remove();
                $('#anythingKadouGraph2Area').append('<div id=\"anythingKadouGraph2\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
            }

        } else {
            $('#anythingKadouGraph2').remove();
            $('#anythingKadouGraph2Area').append('<div id=\"anythingKadouGraph2\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}


function drawAnythingKadou2HorizonGraph() {

    var cmdStr = "getKadouKigyouCnt";
    var dataFlg = true;
    var graphHeight = 100;

    var gyoushuSid = -1;

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":cmdStr,
                                   "CMD":cmdStr,
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "pageNum":$("input[name=anythingKadou2page]").val(),
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "gyoushuSid":gyoushuSid,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(cntData) {

          if (cntData != null && cntData != "" && cntData.length > 0) {

            if ((cntData.length * 60) > 100) {
                graphHeight = cntData.length * 60;
            }

            if (cntData.length > 0 && cntData.length > Number($("input[name=anythingKadou2NowCount]").val())) {
                $('#anythingKadou2_more').removeClass("display_n");
            } else {
                $('#anythingKadou2_more').addClass("display_n");
            }

            $("input[name=anythingKadou2NowCount]").val(cntData.length);

            $('#anythingKadouGraph2').remove();
            $('#anythingKadouGraph2Area').append('<div id=\"anythingKadouGraph2\" style=\"height:' + graphHeight +  'px;\"></div>');

            var kadouStr    = "[";



            for (i = cntData.length - 1; i >= 0; i--) {

                var totalData = cntData[i];

                 if (i != cntData.length - 1) {
                     kadouStr += ",";
                 }

                 var ankenName = totalData.name;

                 if (ankenName == "noKigyou") {
                     ankenName = "企業なし";
                 }

                 kadouStr += "["
                          +  totalData.sumKadouTime
                          +  ",'"
                          +  strCut(ankenName) + noDispIdTag(totalData.sid)

                          +  "']";
            }


            kadouStr    += "]";

            var kadouObject    = eval(kadouStr);

            jQuery( function() {

                jQuery.jqplot(
                        'anythingKadouGraph2',
                        [kadouObject],

                        {
                            animate: true,
                            animateReplot: true,
                            seriesColors:['#839557', '#579575', '#c5b47f', '#eaa228', '#4bb2c5'],
                            seriesDefaults: {
                                renderer: jQuery . jqplot . BarRenderer,
                                rendererOptions: {
                                    barDirection: 'horizontal',
                                    varyBarColor: true,
                                    animation: {
                                        speed: 1500
                                    }
                                }
                            },
                            axes: {
                                xaxis: {
                                tickRenderer: jQuery . jqplot . CanvasAxisTickRenderer ,
                                tickOptions: {
                                  angle: -30,
                                  fontSize: '8pt',
                                  formatString:'%#.1f'
                                }
                                },
                                yaxis: {
                                    pad:0,
                                    renderer: jQuery . jqplot . CategoryAxisRenderer
                                }
                            },
                            highlighter: {
                                show: true,
                                showMarker: false,
                                tooltipLocation: 'e',
                                tooltipAxes: 'x',
                                formatString: '　%s　'
                            }
                        }
                    );



            } );
        } else {
            $('#anythingKadouGraph2').remove();
            $('#anythingKadou2_more').addClass("display_n");
            $('#anythingKadouGraph2Area').append('<div id=\"anythingKadouGraph2\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}





function drawAnythingKadou3Graph() {

    var cmdStr = "getKadouKbunruiCnt";
    var dataFlg = true;

    var gyoushuSid = -1;

    $("input[name=anythingKadou3NowCount]").val(0);
    $("input[name=anythingKadou3page]").val(1)
    $('#anythingKadou3_more').addClass("display_n");

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":cmdStr,
                                   "CMD":cmdStr,
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "pageNum":-1,
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "gyoushuSid":gyoushuSid,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(cntData) {

        if (cntData != null && cntData != "") {

            var heightStr = 300;

            if (cntData.length > 0) {
                if ((40 * cntData.length) > 300) {
                    heightStr = 40 * cntData.length;
                }
            }

            $('#anythingKadouGraph3').remove();
            $('#anythingKadouGraph3Area').append('<div style=\"height:' + heightStr + 'px;\" id=\"anythingKadouGraph3\"></div>');

            var data = "";

            if (cntData.length > 0) {
                var dataStr = "";
                dataStr += "[";
                for (i = 0; i < cntData.length; i++) {

                    var totalData = cntData[i];
                    if (i == 0) {
                        dataStr += "['";
                    } else {
                        dataStr += ",['";
                    }

                    var ankenName = htmlEscape(totalData.name);

                    if (ankenName == "noKbunrui") {
                        ankenName = "指定なし";
                    }

                    dataStr += ankenName
                            +  "',"
                            +  totalData.sumKadouTime
                            +  "]";
                }
                dataStr += "]";
                data = eval(dataStr);
                dataFlg = true;
            }

            var resultPlot = jQuery.jqplot ('anythingKadouGraph3', [data],
              {
                seriesDefaults: {
                  renderer: jQuery.jqplot.PieRenderer,
                  rendererOptions: {
                    showDataLabels: true
                  }
                },
                legend: { show:true, location: 'e' }
              }
            );

            $("#anythingKadouGraph3").bind('jqplotDataHighlight', function(ev, seriesIndex, pointIndex, data, radius) {
              var chart_left = $('#anythingKadouGraph3').offset().left,
              chart_top = $('#anythingKadouGraph3').offset().top,
              x = chart_left + 110;
              y = chart_top + 100;
              var color = 'rgb(50%,50%,100%)';
              $('#tooltipAnythingKadou3').css({left:x, top:y});
              $('#tooltipAnythingKadou3').addClass("bgC_body");
              $('#tooltipAnythingKadou3').html('<span class="fs_12 fw_b">' + data[0] + '</span><br />' + data[1] + '時間');
              $('#tooltipAnythingKadou3').show();

            });

            $("#anythingKadouGraph3").bind('jqplotDataUnhighlight', function(ev, seriesIndex, pointIndex, data) {
                $('#tooltipAnythingKadou3').empty();
                $('#tooltipAnythingKadou3').hide();
            });

            if (!dataFlg) {
                $('#anythingKadouGraph3').remove();
                $('#anythingKadouGraph3Area').append('<div id=\"anythingKadouGraph3\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
            }

        } else {
            $('#anythingKadouGraph3').remove();
            $('#anythingKadouGraph3Area').append('<div id=\"anythingKadouGraph3\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}



function drawAnythingKadou3HorizonGraph() {

    var cmdStr = "getKadouKbunruiCnt";
    var dataFlg = true;

    var gyoushuSid = -1;
    var graphHeight = 100;

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":cmdStr,
                                   "CMD":cmdStr,
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "pageNum":$("input[name=anythingKadou3page]").val(),
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "gyoushuSid":gyoushuSid,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(cntData) {

          if (cntData != null && cntData != "" && cntData.length > 0) {

            if ((cntData.length * 60) > 100) {
                graphHeight = cntData.length * 60;
            }

            if (cntData.length > 0 && cntData.length > Number($("input[name=anythingKadou3NowCount]").val())) {
                $('#anythingKadou3_more').removeClass("display_n");
            } else {
                $('#anythingKadou3_more').addClass("display_n");
            }

            $("input[name=anythingKadou3NowCount]").val(cntData.length);


            $('#anythingKadouGraph3').remove();
            $('#anythingKadouGraph3Area').append('<div id=\"anythingKadouGraph3\" style=\"height:' + graphHeight +  'px;\"></div>');

            var kadouStr    = "[";

            for (i = cntData.length - 1; i >= 0; i--) {

                var totalData = cntData[i];

                 if (i != cntData.length - 1) {
                     kadouStr += ",";
                 }

                 var ankenName = totalData.name;

                 if (ankenName == "noKbunrui") {
                     ankenName = "指定なし";
                 }

                 kadouStr += "["
                          +  totalData.sumKadouTime
                          +  ",'"
                          +  strCut(ankenName) + noDispIdTag(totalData.sid)
                          +  "']";
            }

            kadouStr    += "]";

            var kadouObject    = eval(kadouStr);

            jQuery( function() {

                jQuery.jqplot(
                        'anythingKadouGraph3',
                        [kadouObject],

                        {
                            animate: true,
                            animateReplot: true,
                            seriesColors:['#839557', '#579575', '#c5b47f', '#eaa228', '#4bb2c5'],
                            seriesDefaults: {
                                renderer: jQuery . jqplot . BarRenderer,
                                rendererOptions: {
                                    barDirection: 'horizontal',
                                    varyBarColor: true,
                                    animation: {
                                        speed: 1500
                                    }
                                }
                            },
                            axes: {
                                xaxis: {
                                tickRenderer: jQuery . jqplot . CanvasAxisTickRenderer ,
                                tickOptions: {
                                  angle: -30,
                                  fontSize: '8pt',
                                  formatString:'%#.1f'
                                }
                                },
                                yaxis: {
                                    pad:0,
                                    renderer: jQuery . jqplot . CategoryAxisRenderer
                                }
                            },
                            highlighter: {
                                show: true,
                                showMarker: false,
                                tooltipLocation: 'n',
                                tooltipAxes: 'x',
                                formatString: '　%s　'
                            }
                        }
                    );



            } );
        } else {
            $('#anythingKadouGraph3').remove();
            $('#anythingKadou3_more').addClass("display_n");
            $('#anythingKadouGraph3Area').append('<div id=\"anythingKadouGraph3\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}


function drawAnythingKadou4Graph() {

    var cmdStr = "getKadouKhouhouCnt";
    var dataFlg = true;

    var gyoushuSid = -1;

    $("input[name=anythingKadou4NowCount]").val(0);
    $("input[name=anythingKadou4page]").val(1)
    $('#anythingKadou4_more').addClass("display_n");

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":cmdStr,
                                   "CMD":cmdStr,
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "pageNum":-1,
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "gyoushuSid":gyoushuSid,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(cntData) {

        if (cntData != null && cntData != "") {

            var heightStr = 300;

            if (cntData.length > 0) {
                if ((40 * cntData.length) > 300) {
                    heightStr = 40 * cntData.length;
                }
            }

            $('#anythingKadouGraph4').remove();
            $('#anythingKadouGraph4Area').append('<div style=\"height:' + heightStr + 'px;\" id=\"anythingKadouGraph4\"></div>');

            var data = "";

            if (cntData.length > 0) {
                var dataStr = "";
                dataStr += "[";
                for (i = 0; i < cntData.length; i++) {
                    var totalData = cntData[i];
                    if (i == 0) {
                        dataStr += "['";
                    } else {
                        dataStr += ",['";
                    }

                    var ankenName = htmlEscape(totalData.name);

                    if (ankenName == "noKhouhou") {
                        ankenName = "指定なし";
                    }

                    dataStr += ankenName
                            +  "',"
                            +  totalData.sumKadouTime
                            +  "]";
                }
                dataStr += "]";
                data = eval(dataStr);
                dataFlg = true;
            }


            var resultPlot = jQuery.jqplot ('anythingKadouGraph4', [data],
              {
                seriesDefaults: {
                  renderer: jQuery.jqplot.PieRenderer,
                  rendererOptions: {
                    showDataLabels: true
                  }
                },
                legend: { show:true, location: 'e' }
              }
            );

            $("#anythingKadouGraph4").bind('jqplotDataHighlight', function(ev, seriesIndex, pointIndex, data, radius) {
              var chart_left = $('#anythingKadouGraph4').offset().left,
              chart_top = $('#anythingKadouGraph4').offset().top,
              x = chart_left + 110;
              y = chart_top + 100;
              var color = 'rgb(50%,50%,100%)';
              $('#tooltipAnythingKadou4').css({left:x, top:y});
              $('#tooltipAnythingKadou4').addClass("bgC_body");
              $('#tooltipAnythingKadou4').html('<span class="fs_12 fw_b">' + data[0] + '</span><br />' + data[1] + '時間');
              $('#tooltipAnythingKadou4').show();

            });

            $("#anythingKadouGraph4").bind('jqplotDataUnhighlight', function(ev, seriesIndex, pointIndex, data) {
                $('#tooltipAnythingKadou4').empty();
                $('#tooltipAnythingKadou4').hide();
            });

            if (!dataFlg) {
                $('#anythingKadouGraph4').remove();
                $('#anythingKadouGraph4Area').append('<div id=\"anythingKadouGraph4\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
            }

        } else {
            $('#anythingKadouGraph4').remove();
            $('#anythingKadouGraph4Area').append('<div id=\"anythingKadouGraph4\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}


function drawAnythingKadou4HorizonGraph() {

    var cmdStr = "getKadouKhouhouCnt";
    var dataFlg = true;
    var graphHeight = 100;

    var gyoushuSid = -1;

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":cmdStr,
                                   "CMD":cmdStr,
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "pageNum":$("input[name=anythingKadou4page]").val(),
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "gyoushuSid":gyoushuSid,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(cntData) {

          if (cntData != null && cntData != "" && cntData.length > 0) {

            if ((cntData.length * 60) > 100) {
                graphHeight = cntData.length * 60;
            }

            if (cntData.length > 0 && cntData.length > Number($("input[name=anythingKadou4NowCount]").val())) {
                $('#anythingKadou4_more').removeClass("display_n");
            } else {
                $('#anythingKadou4_more').addClass("display_n");
            }

            $("input[name=anythingKadou4NowCount]").val(cntData.length);

            $('#anythingKadouGraph4').remove();
            $('#anythingKadouGraph4Area').append('<div id=\"anythingKadouGraph4\" style=\"height:' + graphHeight +  'px;\"></div>');

            var kadouStr    = "[";



            for (i = cntData.length - 1; i >= 0; i--) {

                var totalData = cntData[i];

                 if (i != cntData.length - 1) {
                     kadouStr += ",";
                 }

                 var ankenName = totalData.name;

                 if (ankenName == "noKhouhou") {
                     ankenName = "指定なし";
                 }

                 kadouStr += "["
                          +  totalData.sumKadouTime
                          +  ",'"
                          +  strCut(ankenName) + noDispIdTag(totalData.sid)
                          +  "']";
            }


            kadouStr    += "]";

            var kadouObject    = eval(kadouStr);

            jQuery( function() {

                jQuery.jqplot(
                        'anythingKadouGraph4',
                        [kadouObject],

                        {
                            animate: true,
                            animateReplot: true,
                            seriesColors:['#839557', '#579575', '#c5b47f', '#eaa228', '#4bb2c5'],
                            seriesDefaults: {
                                renderer: jQuery . jqplot . BarRenderer,
                                rendererOptions: {
                                    barDirection: 'horizontal',
                                    varyBarColor: true,
                                    animation: {
                                        speed: 1500
                                    }
                                }
                            },
                            axes: {
                                xaxis: {
                                tickRenderer: jQuery . jqplot . CanvasAxisTickRenderer ,
                                tickOptions: {
                                  angle: -30,
                                  fontSize: '8pt',
                                  formatString:'%#.1f'
                                }
                                },
                                yaxis: {
                                    pad:0,
                                    renderer: jQuery . jqplot . CategoryAxisRenderer
                                }
                            },
                            highlighter: {
                                show: true,
                                showMarker: false,
                                tooltipLocation: 'e',
                                tooltipAxes: 'x',
                                formatString: '　%s　'
                            }
                        }
                    );



            } );
        } else {
            $('#anythingKadouGraph4').remove();
            $('#anythingKadou4_more').addClass("display_n");
            $('#anythingKadouGraph4Area').append('<div id=\"anythingKadouGraph4\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}


function drawAnythingKadouChild0Graph() {

    $('#sum_kadou_days_child').html("");
    $('#sum_kadou_time_child').html("");
    $('#sum_kadou_time_average_child').html("");

    var cmdStr = "getKadouContentData";
    var dataFlg = true;

    var gyoushuSid = -1;

    $("input[name=anythingKadouChild0NowCount]").val(0);
    $("input[name=anythingKadouChild0page]").val(1)
    $('#anythingKadouChild0_more').addClass("display_n");

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":cmdStr,
                                   "CMD":cmdStr,
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "pageNum":-1,
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "gyoushuSid":gyoushuSid,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(cntData) {

        if (cntData != null && cntData != "") {


            var heightStr = 300;

            if (cntData.length > 0) {
                if ((40 * cntData.length) > 300) {
                    heightStr = 40 * cntData.length;
                }
            }

            $('#anythingKadouChild0Graph').remove();
            $('#anythingKadouChild0GraphArea').append('<div style=\"height:' + heightStr + 'px;\" id=\"anythingKadouChild0Graph\"></div>');

            var data = "";

            if (cntData.length > 0) {

                var dataStr = "";
                dataStr += "[";
                for (i = 0; i < cntData.length; i++) {

                    var totalData = cntData[i];
                    if (i == 0) {
                        dataStr += "['";
                    } else {
                        dataStr += ",['";
                    }

                    var dataName = htmlEscape(totalData.name);

                    dataStr += dataName
                            +  "',"
                            +  totalData.sumKadouTime
                            +  "]";
                }
                dataStr += "]";
                data = eval(dataStr);
                dataFlg = true;

                $('#sum_kadou_days_child').html(addFigure(cntData[0].totalKadouDays));
                $('#sum_kadou_time_child').html(addFigure(cntData[0].totalKadouTime));
                $('#sum_kadou_time_average_child').html((cntData[0].totalKadouTime/cntData[0].totalKadouDays).toFixed(1));
            }

            var resultPlot = jQuery.jqplot ('anythingKadouChild0Graph', [data],
              {
                seriesDefaults: {
                  renderer: jQuery.jqplot.PieRenderer,
                  rendererOptions: {
                    showDataLabels: true
                  }
                },
                legend: { show:true, location: 'e' }
              }
            );

            $("#anythingKadouChild0Graph").bind('jqplotDataHighlight', function(ev, seriesIndex, pointIndex, data, radius) {
              var chart_left = $('#anythingKadouChild0Graph').offset().left,
              chart_top = $('#anythingKadouChild0Graph').offset().top,
              x = chart_left + 110;
              y = chart_top + 100;
              var color = 'rgb(50%,50%,100%)';
              $('#tooltipAnythingKadouChild0').css({left:x, top:y});
              $('#tooltipAnythingKadouChild0').addClass("bgC_body");
              $('#tooltipAnythingKadouChild0').html('<span class="fs_12 fw_b">' + data[0] + '</span><br />' + data[1] + '時間');
              $('#tooltipAnythingKadouChild0').show();

            });

            $("#anythingKadouChild0Graph").bind('jqplotDataUnhighlight', function(ev, seriesIndex, pointIndex, data) {
                $('#tooltipAnythingKadouChild0').empty();
                $('#tooltipAnythingKadouChild0').hide();
            });

            if (!dataFlg) {
                $('#anythingKadouChild0Graph').remove();
                $('#anythingKadouGraphChild0Area').append('<div id=\"anythingKadouChild0Graph\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
            }

        } else {
            $('#anythingKadouChild0Graph').remove();
            $('#anythingKadouChild0GraphArea').append('<div id=\"anythingKadouChild0Graph\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}



function drawAnythingKadouChild0HorizonGraph() {

    $('#sum_kadou_days_child').html("");
    $('#sum_kadou_time_child').html("");
    $('#sum_kadou_time_average_child').html("");

    var cmdStr = "getKadouContentData";
    var dataFlg = true;

    var gyoushuSid = -1;
    var graphHeight = 100;

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":cmdStr,
                                   "CMD":cmdStr,
                                   "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                   "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                   "pageNum":$("input[name=anythingKadouChild0page]").val(),
                                   "state":$("input[name=ntp220State]").val(),
                                   "ankenState":$("input[name=ntp220AnkenState]").val(),
                                   "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                   "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                   "frdate":$("input[name=ntp220DateFrStr]").val(),
                                   "todate":$("input[name=ntp220DateToStr]").val(),
                                   "gyoushuSid":gyoushuSid,
                                   "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(cntData) {

          if (cntData != null && cntData != "" && cntData.length > 0) {

            if ((cntData.length * 60) > 100) {
                graphHeight = cntData.length * 60;
            }

            if (cntData.length > 0 && cntData.length > Number($("input[name=anythingKadouChild0NowCount]").val())) {
                $('#anythingKadouChild0_more').removeClass("display_n");
            } else {
                $('#anythingKadouChild0_more').addClass("display_n");
            }

            $("input[name=anythingKadouChild0NowCount]").val(cntData.length);


            $('#anythingKadouChild0Graph').remove();
            $('#anythingKadouChild0GraphArea').append('<div id=\"anythingKadouChild0Graph\" style=\"height:' + graphHeight +  'px;\"></div>');

            var kadouStr    = "[";

            for (i = cntData.length - 1; i >= 0; i--) {

                var totalData = cntData[i];

                 if (i != cntData.length - 1) {
                     kadouStr += ",";
                 }

                 var dataName = totalData.name;

                 kadouStr += "["
                          +  totalData.sumKadouTime
                          +  ",'"
                          +  strCut(dataName) + noDispIdTag(totalData.sid)
                          +  "']";
            }

            kadouStr    += "]";

            var kadouObject    = eval(kadouStr);

            $('#sum_kadou_days_child').html(addFigure(cntData[0].totalKadouDays));
            $('#sum_kadou_time_child').html(addFigure(cntData[0].totalKadouTime));
            $('#sum_kadou_time_average_child').html((cntData[0].totalKadouTime/cntData[0].totalKadouDays).toFixed(1));

            jQuery( function() {

                jQuery.jqplot(
                        'anythingKadouChild0Graph',
                        [kadouObject],

                        {
                            animate: true,
                            animateReplot: true,
                            seriesColors:['#839557', '#579575', '#c5b47f', '#eaa228', '#4bb2c5'],
                            seriesDefaults: {
                                renderer: jQuery . jqplot . BarRenderer,
                                rendererOptions: {
                                    barDirection: 'horizontal',
                                    varyBarColor: true,
                                    animation: {
                                        speed: 1500
                                    }
                                }
                            },
                            axes: {
                                xaxis: {
                                tickRenderer: jQuery . jqplot . CanvasAxisTickRenderer ,
                                tickOptions: {
                                  angle: -30,
                                  fontSize: '8pt',
                                  formatString:'%#.1f'
                                }
                                },
                                yaxis: {
                                    pad:0,
                                    renderer: jQuery . jqplot . CategoryAxisRenderer
                                }
                            },
                            highlighter: {
                                show: true,
                                showMarker: false,
                                tooltipLocation: 'n',
                                tooltipAxes: 'x',
                                formatString: '　%s　'
                            }
                        }
                    );

            } );

        } else {
            $('#anythingKadouChild0Graph').remove();
            $('#anythingKadouChild0_more').addClass("display_n");
            $('#anythingKadouChild0GraphArea').append('<div id=\"anythingKadouChild0Graph\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}


function showKadouDetailArea() {


    if ($("input[name=ntp220NowSelParentId]").val() == "kadou") {

        var childVal = $("input[name=ntp220NowSelChildId]").val();

        $(".category_sel_area").addClass('display_n');

        if (childVal == "kadou_0") {
            $('#anken_kadou_detail_area').removeClass("display_n");
        } else if (childVal == "kadou_1") {
            $('#kigyou_kadou_detail_area').removeClass("display_n");
        } else if (childVal == "kadou_2") {
            $('#kbunrui_kadou_detail_area').removeClass("display_n");
        } else if (childVal == "kadou_3") {
            $('#khouhou_kadou_detail_area').removeClass("display_n");
        }
    }

}

function drawKadouDetailDataArea() {

    var childVal = $("input[name=ntp220NowSelChildId]").val();

    if (childVal == "kadou_0") {
        drawKadouAnkenDataArea();
    } else if (childVal == "kadou_1") {
        drawKadouKigyouDataArea();
    } else if (childVal == "kadou_2") {
        drawKadouKbunruiDataArea();
    } else if (childVal == "kadou_3") {
        drawKadouKhouhouDataArea();
    }

}

function redrawKadouDetailDataArea() {

    var childVal = $("input[name=ntp220NowSelChildId]").val();

    if (childVal == "kadou_0") {
        $('#anken_kadou_detail_area').removeClass("display_n");
        $("input[name=ankenKadouDataPageNum]").val(1);
        $(".anken_val").remove();
        $(".anken_val2").remove();
        drawKadouAnkenDataArea();
    } else if (childVal == "kadou_1") {
        $('#kigyou_kadou_detail_area').removeClass("display_n");
        $("input[name=kigyouKadouDataPageNum]").val(1);
        $(".kigyou_val").remove();
        $(".kigyou_val2").remove();
        drawKadouKigyouDataArea();
    } else if (childVal == "kadou_2") {
        $('#kbunrui_kadou_detail_area').removeClass("display_n");
        $("input[name=kbunruiKadouDataPageNum]").val(1);
        $(".kbunrui_val").remove();
        $(".kbunrui_val2").remove();
        drawKadouKbunruiDataArea();
    } else if (childVal == "kadou_3") {
        $('#khouhou_kadou_detail_area').removeClass("display_n");
        $("input[name=khouhouKadouDataPageNum]").val(1);
        $(".khouhou_val").remove();
        $(".khouhou_val2").remove();
        drawKadouKhouhouDataArea();
    }

}


function drawKadouAnkenDataArea() {

    var gyoushuSid = -1;

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":"getKadouContentDetail",
                                    "CMD":"getKadouContentDetail",
                                    "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                    "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                    "pageNum":$("input[name=ankenKadouDataPageNum]").val(),
                                    "state":$("input[name=ntp220State]").val(),
                                    "ankenState":$("input[name=ntp220AnkenState]").val(),
                                    "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                    "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                    "frdate":$("input[name=ntp220DateFrStr]").val(),
                                    "todate":$("input[name=ntp220DateToStr]").val(),
                                    "gyoushuSid":gyoushuSid,
                                    "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(data) {
        if (data != null && data != "" && data.length > 0) {

            var pageNum = $("input[name=ankenKadouDataPageNum]").val();
            $("input[name=ankenKadouDataPageNum]").val((Number(pageNum) + 1));

            var ankenDataStr = "";

            for (i=0; i < data.length; i++) {
                var dataMdl = data[i];
                var shohinStr = "";
                var tantoStr = "";
                var shohinStrHidden = "";


                //商品
                if (dataMdl.shohinList.length > 0) {
                    for (n=0; n < dataMdl.shohinList.length; n++) {
                      var shnMdl = dataMdl.shohinList[n];

                      if($("select[name=ntp220CatSid]").val() != "-1") {
                          if (shnMdl.nscSid == $("select[name=ntp220CatSid]").val()) {
                              shohinStr += htmlEscape(shnMdl.nhnName)
                              +  "<br>";
                          } else {
                              shohinStrHidden += htmlEscape(shnMdl.nhnName)
                              +  "<br>";
                          }
                      } else {
                          shohinStr += htmlEscape(shnMdl.nhnName)
                          +  "<br>";
                      }
                    }
                }

                //担当者
                if (dataMdl.tantoUsrInfList.length > 0) {
                    for (n=0; n < dataMdl.tantoUsrInfList.length; n++) {
                      var tantoMdl = dataMdl.tantoUsrInfList[n];
                      tantoStr += "<a href=\"#!\" onClick=\"openUserInfoWindow("
                               +  tantoMdl.usrSid
                               +  ");\">"
                               +  tantoMdl.usiSei + "&nbsp;" + tantoMdl.usiMei
                               +  "</a>"
                               +  "<br>";
                    }
                }

                var trClassName = "anken_val";
                if ((((pageNum-1)*5) + i + 1) % 2 == 0) {
                    trClassName = "anken_val2";
                }
                if (Number(dataMdl.nahSid) == -1 && dataMdl.nanSid != 0 && dataMdl.viewable == "true") {
                    trClassName += " js_listHover cursor_p";
                }

                ankenDataStr += "<tr class=\"" + trClassName + "\"><td class=\"txt_c\">"
                             +  (((pageNum-1)*5) + i + 1)
                             +  "</td>";

                if (Number(dataMdl.nahSid) == -1 && dataMdl.nanSid != 0 && dataMdl.viewable == "true") {
                    ankenDataStr += "<td class=\"txt_l cl_linkDef anken_name_link\" id=\"" + dataMdl.nanSid + "\">";
                } else if (Number(dataMdl.nahSid) != -1 && dataMdl.nanSid != 0 &&  dataMdl.viewable == "true") {
                    ankenDataStr += "<td class=\"anken_name_link_his\" id=\"" + dataMdl.nahSid + "\">";
                } else {
                    ankenDataStr += "<td>";
                }

                var ankenName = htmlEscape(dataMdl.nanName);

                if (dataMdl.nanSid == 0) {
                    ankenName="指定なし";
                }

                ankenDataStr +=  ankenName
                             +  "</td><td class=\"txt_r kadou_text\">";

                ankenDataStr +=  addFigure(dataMdl.kadouHours)
                             +  "</td><td class=\"txt_rkadou_text\">";

                var parcentNum = (dataMdl.kadouHours/dataMdl.totalKadouHours) * 100

                ankenDataStr +=  parcentNum.toFixed(2);

                ankenDataStr += "%";

                ankenDataStr += "</td><td class=\"txt_c\">";

                var stateStr = "商談中";
                if (dataMdl.nanSyodan == 1) {
                    stateStr = "受&nbsp;&nbsp;注";
                } else if (dataMdl.nanSyodan == 2) {
                    stateStr = "失&nbsp;&nbsp;注";
                }

                if (dataMdl.nanSid == 0 || dataMdl.viewable != "true") {
                    stateStr = "-";
                }

                ankenDataStr += stateStr
                             +  "</td>";


                if (dataMdl.nanSid != 0 && dataMdl.viewable == "true") {
                    ankenDataStr +=  "<td class=\"txt_r anken_kadou_list_mitumori ";

                    if ($("input[name=ankenKadouListMoney]").val() != 0) {
                        ankenDataStr += "display_n";
                    }

                    ankenDataStr +=  "\">"
                                 +  "<span class=\"tooltips display_n\"><span class=\"tooltip_txt2\">"
                                 +  "提出日:" + dataMdl.nanMitumoriDateStr;

                    if (dataMdl.nanMitumoriDateKbn == 1) {
                        ankenDataStr +=  "<br><span class=\"cl_fontWarn\">(見積もり日は指定期間の範囲外です。)</span>";
                    }

                    ankenDataStr +=  "</span></span>"
                                 +  "<div class=\"mitumori_kin_str\">" + addFigure(dataMdl.nanKinMitumori) + "</div>"
                                 +  "</td><td class=\"txt_r anken_kadou_list_jutyu ";

                    if ($("input[name=ankenKadouListMoney]").val() == 0) {
                        ankenDataStr += "display_n";
                    }

                    ankenDataStr +=  "\">"
                                 +  "<span class=\"tooltips display_n\"><span class=\"tooltip_txt2\">"
                                 +  "受注日:" + dataMdl.nanJutyuDateStr;

                                 if (dataMdl.nanJutyuDateKbn == 1) {
                                     ankenDataStr +=  "<br><span class=\"cl_fontWarn\">(受注日は指定期間の範囲外です。)</span>";
                                 }

                   ankenDataStr  +=  "</span></span>"
                                 +  "<div class=\"jutyu_kin_str\">" + addFigure(dataMdl.nanKinJutyu) + "</div>"
                                 +  "</td>";
                } else {
                    ankenDataStr += "<td class=\"txt_c\">-</td>";
                }

                ankenDataStr += "<td class=\"txt_l anken_kadou_list_other anken_kadou_list_kigyou ";
                if ($("input[name=ankenKadouListOther]").val() != 0) {
                    ankenDataStr += "display_n";
                }
                ankenDataStr +=  "\">"
                             +  htmlEscape(dataMdl.cntName1);
                if (dataMdl.cntName2 != null && dataMdl.cntName2 != "") {
                    ankenDataStr += "<br>" + htmlEscape(dataMdl.cntName2);
                }
                ankenDataStr += "</td>";


                //商品
                ankenDataStr += "<td class=\"txt_l anken_kadou_list_other anken_kadou_list_shohin ";
                if ($("input[name=ankenKadouListOther]").val() != 1) {
                    ankenDataStr += "display_n";
                }
                ankenDataStr +=  "\">"
                             +  shohinStr;

                if (shohinStrHidden != "") {
                    ankenDataStr += "<div class=\"other_category_itm\">▼他のカテゴリの商品</div>";
                    ankenDataStr +=  "<div class=\"display_n\">" + shohinStrHidden + "</div>";
                }

                ankenDataStr += "</td>";

                //業種
                ankenDataStr += "<td class=\"txt_l anken_kadou_list_other anken_kadou_list_gyoushu ";
                if ($("input[name=ankenKadouListOther]").val() != 2) {
                    ankenDataStr += "display_n";
                }
                ankenDataStr +=  "\">"
                             +  htmlEscape(dataMdl.ngyName);
                ankenDataStr += "</td>";

                //プロセス
                ankenDataStr += "<td class=\"txt_l anken_kadou_list_other anken_kadou_list_process ";
                if ($("input[name=ankenKadouListOther]").val() != 3) {
                    ankenDataStr += "display_n";
                }
                ankenDataStr +=  "\">"
                             +  htmlEscape(dataMdl.ngpName);
                ankenDataStr += "</td>";

                //見込み度
                ankenDataStr += "<td class=\"txt_c anken_kadou_list_other anken_kadou_list_mikomido ";
                if ($("input[name=ankenKadouListOther]").val() != 4) {
                    ankenDataStr += "display_n";
                }
                ankenDataStr +=  "\">"
                             +  dataMdl.nanMikomiVal;
                ankenDataStr += "</td>";

                //顧客源泉
                ankenDataStr += "<td class=\"txt_l anken_kadou_list_other anken_kadou_list_kokyakugensen ";
                if ($("input[name=ankenKadouListOther]").val() != 5) {
                    ankenDataStr += "display_n";
                }
                ankenDataStr +=  "\">"
                             +  htmlEscape(dataMdl.ncnName);
                ankenDataStr += "</td>";

                //担当者
                ankenDataStr += "<td class=\"txt_l anken_kadou_list_other anken_kadou_list_tanto ";
                if ($("input[name=ankenKadouListOther]").val() != 6) {
                    ankenDataStr += "display_n";
                }
                ankenDataStr +=  "\">"
                             +  tantoStr;
                ankenDataStr += "</td>";

                ankenDataStr += "</tr>";
            }

            if (i >= 5) {
                $(".anken_kadou_list_more_area").removeClass("display_n");
            } else {
                $(".anken_kadou_list_more_area").addClass("display_n");
            }

            if (pageNum != 1) {
                $('#anken_kadou_val_table').append(ankenDataStr);
            } else {
                $('#anken_kadou_val_title').after(ankenDataStr);
            }

        } else {
            $(".anken_kadou_list_more_area").addClass("display_n");
            $('#ankenKadouDataArea').append('<div id=\"\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}


function drawKadouKigyouDataArea() {

    var gyoushuSid = -1;

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":"getKadouContentDetail",
                                    "CMD":"getKadouContentDetail",
                                    "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                    "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                    "pageNum":$("input[name=kigyouKadouDataPageNum]").val(),
                                    "state":$("input[name=ntp220State]").val(),
                                    "ankenState":$("input[name=ntp220AnkenState]").val(),
                                    "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                    "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                    "frdate":$("input[name=ntp220DateFrStr]").val(),
                                    "todate":$("input[name=ntp220DateToStr]").val(),
                                    "gyoushuSid":gyoushuSid,
                                    "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(data) {
        if (data != null && data != "" && data.length > 0) {

            var pageNum = $("input[name=kigyouKadouDataPageNum]").val();
            $("input[name=kigyouKadouDataPageNum]").val((Number(pageNum) + 1));

            var kigyouDataStr = "";

            for (i=0; i < data.length; i++) {
                var dataMdl = data[i];
                var kigyouSid  = dataMdl.sid;
                var kigyouName = htmlEscape(dataMdl.name);

                var trClassName = "kigyou_val";
                if ((((pageNum-1)*5) + i + 1) % 2 == 0) {
                    trClassName = "kigyou_val2";
                }
                if (kigyouSid != 0) {
                    trClassName += " js_listHover cursor_p comp_click\" id=\"" + kigyouSid;
                }

                kigyouDataStr += "<tr class=\"" + trClassName + "\"><td class=\"txt_c\">"
                             +  (((pageNum-1)*5) + i + 1)
                             +  "</td>";

                if (kigyouSid != 0) {
                    kigyouDataStr += "<td class=\"cl_linkDef\" id=\""
                                  + kigyouSid
                                  + "\">"
                                  + kigyouName;
                } else {
                    kigyouDataStr += "<td>指定なし";
                }


                kigyouDataStr += "</td><td class=\"txt_r\">";

                kigyouDataStr +=  addFigure(dataMdl.sumKadouTime)
                             +  "</td>";


                var parcentNum = (dataMdl.sumKadouTime/dataMdl.totalKadouTime) * 100

                kigyouDataStr +=  "<td class=\"txt_r\">"

                kigyouDataStr +=  parcentNum.toFixed(2);

                kigyouDataStr += "</td></tr>";
            }

            if (i >= 5) {
                $(".kigyou_kadou_list_more_area").removeClass("display_n");
            } else {
                $(".kigyou_kadou_list_more_area").addClass("display_n");
            }

            if (pageNum != 1) {
                $('#kigyou_kadou_val_table').append(kigyouDataStr);
            } else {
                $('#kigyou_kadou_val_title').after(kigyouDataStr);
            }

        } else {
            $(".kigyou_kadou_list_more_area").addClass("display_n");
            $('#kigyouKadouDataArea').append('<div id=\"\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}


function drawKadouKbunruiDataArea() {

    var gyoushuSid = -1;

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":"getKadouContentDetail",
                                    "CMD":"getKadouContentDetail",
                                    "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                    "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                    "pageNum":$("input[name=kbunruiKadouDataPageNum]").val(),
                                    "state":$("input[name=ntp220State]").val(),
                                    "ankenState":$("input[name=ntp220AnkenState]").val(),
                                    "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                    "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                    "frdate":$("input[name=ntp220DateFrStr]").val(),
                                    "todate":$("input[name=ntp220DateToStr]").val(),
                                    "gyoushuSid":gyoushuSid,
                                    "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(data) {
        if (data != null && data != "" && data.length > 0) {

            var pageNum = $("input[name=kbunruiKadouDataPageNum]").val();
            $("input[name=kbunruiKadouDataPageNum]").val((Number(pageNum) + 1));

            var kbunruiDataStr = "";

            for (i=0; i < data.length; i++) {
                var dataMdl = data[i];

                var trClassName = "kbunrui_val";
                if ((((pageNum-1)*5) + i + 1) % 2 == 0) {
                    trClassName = "kbunrui_val2";
                }

                kbunruiDataStr += "<tr class=\"" + trClassName + "\"><td class=\"txt_c\">"
                             +  (((pageNum-1)*5) + i + 1)
                             +  "</td>";

                if (Number(dataMdl.nahSid) == -1 && dataMdl.nanSid != 0) {
                    kbunruiDataStr += "<td class=\"txt_l kbunrui_name_link\" id=\"" + dataMdl.nanSid + "\">";
                } else {
                    kbunruiDataStr += "<td>";
                }

                var kbunruiName = htmlEscape(dataMdl.name);

                if (dataMdl.name == "") {
                    kbunruiName="指定なし";
                }

                kbunruiDataStr +=  kbunruiName
                             +  "</td><td class=\"kadou_text txxt_r pr20\">";

                kbunruiDataStr +=  addFigure(dataMdl.sumKadouTime)
                             +  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";

                var parcentNum = (dataMdl.sumKadouTime/dataMdl.totalKadouTime) * 100

                kbunruiDataStr +=  "<td class=\"kadou_text txt_r\">"

                kbunruiDataStr +=  parcentNum.toFixed(2);

                kbunruiDataStr += "%&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>";
            }

            if (i >= 5) {
                $(".kbunrui_kadou_list_more_area").removeClass("display_n");
            } else {
                $(".kbunrui_kadou_list_more_area").addClass("display_n");
            }

            if (pageNum != 1) {
                $('#kbunrui_kadou_val_table').append(kbunruiDataStr);
            } else {
                $('#kbunrui_kadou_val_title').after(kbunruiDataStr);
            }

        } else {
            $(".kbunrui_kadou_list_more_area").addClass("display_n");
            $('#kbunruiKadouDataArea').append('<div id=\"\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}


function drawKadouKhouhouDataArea() {

    var gyoushuSid = -1;

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp220.do', {"cmd":"getKadouContentDetail",
                                    "CMD":"getKadouContentDetail",
                                    "contentName":$("input[name=ntp220NowSelParentId]").val(),
                                    "childVal":$("input[name=ntp220NowSelChildId]").val(),
                                    "pageNum":$("input[name=khouhouKadouDataPageNum]").val(),
                                    "state":$("input[name=ntp220State]").val(),
                                    "ankenState":$("input[name=ntp220AnkenState]").val(),
                                    "selGrpSid":$("select[name=ntp220GroupSid]").val(),
                                    "selUsrSid":$("select[name=ntp220SelectUsrSid]").val(),
                                    "frdate":$("input[name=ntp220DateFrStr]").val(),
                                    "todate":$("input[name=ntp220DateToStr]").val(),
                                    "gyoushuSid":gyoushuSid,
                                    "shohinCategory":$("select[name=ntp220CatSid]").val()},
      function(data) {
        if (data != null && data != "" && data.length > 0) {

            var pageNum = $("input[name=khouhouKadouDataPageNum]").val();
            $("input[name=khouhouKadouDataPageNum]").val((Number(pageNum) + 1));

            var khouhouDataStr = "";

            for (i=0; i < data.length; i++) {
                var dataMdl = data[i];

                var trClassName = "khouhou_val";
                if ((((pageNum-1)*5) + i + 1) % 2 == 0) {
                    trClassName = "khouhou_val2";
                }

                khouhouDataStr += "<tr class=\"" + trClassName + "\"><td class=\"txt_c\">"
                             +  (((pageNum-1)*5) + i + 1)
                             +  "</td>";

                if (Number(dataMdl.nahSid) == -1 && dataMdl.nanSid != 0) {
                    khouhouDataStr += "<td class=\"txt_l khouhou_name_link\" id=\"" + dataMdl.nanSid + "\">";
                } else {
                    khouhouDataStr += "<td>";
                }

                var khouhouName = htmlEscape(dataMdl.name);

                if (dataMdl.name == "") {
                    khouhouName="指定なし";
                }

                khouhouDataStr +=  khouhouName
                             +  "</td><td class=\"kadou_text txt_r\">";

                khouhouDataStr +=  addFigure(dataMdl.sumKadouTime)
                             +  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";

                var parcentNum = (dataMdl.sumKadouTime/dataMdl.totalKadouTime) * 100

                khouhouDataStr +=  "<td class=\"kadou_text txt_r\">"

                khouhouDataStr +=  parcentNum.toFixed(2);

                khouhouDataStr += "%&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>";
            }


            if (i >= 5) {
                $(".khouhou_kadou_list_more_area").removeClass("display_n");
            } else {
                $(".khouhou_kadou_list_more_area").addClass("display_n");
            }

            if (pageNum != 1) {
                $('#khouhou_kadou_val_table').append(khouhouDataStr);
            } else {
                $('#khouhou_kadou_val_title').after(khouhouDataStr);
            }

        } else {
            $(".khouhou_kadou_list_more_area").addClass("display_n");
            $('#khouhouKadouDataArea').append('<div id=\"\" class=\"hp300 w100 txt_c\"><span class="fs_12 cl_fontWarn">該当するデータがありません。</span></div>');
        }
    });
}







//グループ変更
function changeShukeiGroupCombo() {
    $("input[name=ntp220State]").val("-1");
    $("input[name=ntp220AnkenState]").val("-1");
    $("input[name=ntp220NowSelParentId]").val("main");
    $("input[name=ntp220NowSelChildId]").val("");
    document.forms[0].submit();
}
function changeKojinGroupCombo() {
    $("input[name=ntp220State]").val("-1");
    $("input[name=ntp220AnkenState]").val("-1");
    $("input[name=ntp220NowSelParentId]").val("main");
    $("input[name=ntp220NowSelChildId]").val("");
    document.forms[0].submit();
}

//ユーザ変更
function changeUsrCmb() {
    $("input[name=ntp220State]").val("-1");
    $("input[name=ntp220AnkenState]").val("-1");
    $("input[name=ntp220NowSelParentId]").val("main");
    $("input[name=ntp220NowSelChildId]").val("");
    document.forms[0].submit();
}

//商品カテゴリ変更
function changeCategoryCombo() {
    $("input[name=ntp220State]").val("-1");
    $("input[name=ntp220AnkenState]").val("-1");
    $("input[name=ntp220NowSelParentId]").val("main");
    $("input[name=ntp220NowSelChildId]").val("");
    document.forms[0].submit();
}


//8文字区切りにする
function strCut(cutStr) {

    var cutTime = cutStr.length/8;
    var newStr = "";
    for (n=0; n < cutTime; n++) {
      newStr += htmlEscape(cutStr.substring(n*8, (n*8)+8));
      newStr += "<br>";
    }

    newStr += htmlEscape(cutStr.substring(n*8));

    return newStr;
}

//3桁区切り
function addFigure(str) {
    var num = new String(str).replace(/,/g, "");
    while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
    return num;
}
