<%@ tag pageEncoding="utf-8" body-content="empty" description="スケジュール簡易登録のタグ"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib uri="/WEB-INF/ctag-jsmsg.tld" prefix="gsjsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/common/" prefix="common" %>
<%@ tag import="jp.groupsession.v2.cmn.GSConst"%>
<%@ attribute description="フォーム名" name="name" type="java.lang.String" required="true" rtexprvalue="true" %>
<%@ attribute description="識別ID" name="classId" type="java.lang.String" required="false" rtexprvalue="true" %>

<common:loadscript src="../schedule/js/schEasyRegister.js" />
<link rel="stylesheet" type="text/css" href="../common/css/picker.css">
<html:hidden property="easyRegister.timeUnits"/>
<html:hidden property="easyRegister.initPubKbn"/>
<html:hidden property="easyRegister.initTitleColor"/>

<html:hidden property="easyRegister.initFrTime"/>
<html:hidden property="easyRegister.initToTime"/>

<style>
  .clockpicker-popover > .arrow {
    display: none;
  }
  .clockpicker-popover {
    margin-top: 0px!important;
  }
</style>
<bean:define id="schEasyForm" name="<%=name%>" property="easyRegister"/>
<div class="display_n js_formName"><%=name%></div>
<div class="display_n js_classId"><%=classId%></div>
<div id="kaniPopup<%=classId%>" class="display_n addScheduleDialog easyRegister-bubble">
<div>
  <div class="js_easyErr hp22">
  </div>
  <div class="verAlignMid" data-name="<%=name%>" data-class="<%=classId%>">
    <span class="pos_rel display_flex input-group" id="fr_date<%=classId%>">
      <html:text name="<%=name%>" property="easyRegister.frDate" maxlength="10" styleClass="txt_c wp95 datepicker easyFrDate"/>
      <span class="picker-acs icon-date display_flex cursor_pointer iconKikanStart"></span>
    </span>
    <span class="clockpicker_fr ml5 pos_rel display_flex input-group">
      <input type="text" name="easyRegister.frTime" id="fr_clock<%=classId%>" maxlength="5" class="clockpicker js_clockpicker txt_c wp60"/>
      <label for="fr_clock<%=classId%>" class="picker-acs cursor_pointer icon-clock input-group-addon"></label>
    </span>
    <span class="ml5 mr5"><gsmsg:write key="tcd.153" /></span>

    <span class="pos_rel display_flex" id="to_date<%=classId%>">
      <html:text name="<%=name%>" property="easyRegister.toDate" maxlength="10" styleClass="txt_c wp95 datepicker easyToDate"/>
      <span class="picker-acs icon-date display_flex cursor_pointer iconKikanFinish"></span>
    </span>
    <span class="input-group clockpicker_to ml5 pos_rel display_flex">
      <input type="text" name="easyRegister.toTime" maxlength="5" id="to_clock<%=classId%>" class="clockpicker js_clockpicker txt_c wp60"/>
      <label for="to_clock<%=classId%>" class="picker-acs cursor_pointer icon-clock input-group-addon"></label>
    </span>
  </div>


  <div class="verAlignMid mt5">
    <span class="cl_linkDef cursor_p" onclick="clockChange(<bean:write name="schEasyForm" property="amFrHour"/>, <bean:write name="schEasyForm" property="amFrMin"/>, <bean:write name="schEasyForm" property="amToHour"/>, <bean:write name="schEasyForm" property="amToMin"/>, '<%=name%>', <%=classId%>);"><gsmsg:write key="cmn.am" /></span>
    <span class="ml5 cl_linkDef cursor_p" onclick="clockChange(<bean:write name="schEasyForm" property="pmFrHour"/>, <bean:write name="schEasyForm" property="pmFrMin"/>, <bean:write name="schEasyForm" property="pmToHour"/>, <bean:write name="schEasyForm" property="pmToMin"/>, '<%=name%>', <%=classId%>);"><gsmsg:write key="cmn.pm" /></span>
    <span class="ml5 cl_linkDef cursor_p" onclick="clockChange(<bean:write name="schEasyForm" property="allDayFrHour"/>, <bean:write name="schEasyForm" property="allDayFrMin"/>, <bean:write name="schEasyForm" property="allDayToHour"/>, <bean:write name="schEasyForm" property="allDayToMin"/>, '<%=name%>', <%=classId%>);"><gsmsg:write key="cmn.allday" /></span>
    <input type="checkbox" onchange="clockNoTime('<%=name%>', <%=classId%>);" name="easyRegister.timeFree" value="1" id="num_seigyo<%=classId%>" class="ml10 js_easyTimeFree"/>
    <label for="num_seigyo<%=classId%>"><gsmsg:write key="schedule.7" /></label>
  </div>
  <br>
  <div class="verAlignMid mt10 mr10">
    <gsmsg:write key="cmn.title" />
    <span class="cl_fontWarn"><gsmsg:write key="cmn.comments" /></span>
  </div>

  <div class="verAlignMid mr5">
    <div class="cal_titlecolor-block bgc_fontSchTitleBlue">
      <input type="radio" name="easyRegister.titleColor" value="1" id="bg_color1<%=classId%>"/>
    </div>
  </div>

  <div class="verAlignMid mr5">
    <div class="cal_titlecolor-block bgc_fontSchTitleRed">
      <input type="radio" name="easyRegister.titleColor" value="2" id="bg_color2<%=classId%>"/>
    </div>
  </div>

  <div class="verAlignMid mr5">
    <div class="cal_titlecolor-block bgc_fontSchTitleGreen">
      <input type="radio" name="easyRegister.titleColor" value="3" id="bg_color3<%=classId%>"/>
    </div>
  </div>

  <div class="verAlignMid mr5">
    <div class="cal_titlecolor-block bgc_fontSchTitleYellow">
      <input type="radio" name="easyRegister.titleColor" value="4" id="bg_color4<%=classId%>"/>
    </div>
  </div>

  <div class="verAlignMid mr5">
    <div class="cal_titlecolor-block bgc_fontSchTitleBlack">
      <input type="radio" name="easyRegister.titleColor" value="5" id="bg_color5<%=classId%>"/>
    </div>
  </div>

  <logic:equal name="schEasyForm" property="titleColorKbn" value="1">
    <div class="verAlignMid mr5">
      <div class="cal_titlecolor-block bgc_fontSchTitleNavy">
        <input type="radio" name="easyRegister.titleColor" value="6" id="bg_color6<%=classId%>"/>
      </div>
    </div>

    <div class="verAlignMid mr5">
      <div class="cal_titlecolor-block bgc_fontSchTitleWine">
        <input type="radio" name="easyRegister.titleColor" value="7" id="bg_color7<%=classId%>"/>
      </div>
    </div>

    <div class="verAlignMid mr5">
      <div class="cal_titlecolor-block bgc_fontSchTitleCien">
        <input type="radio" name="easyRegister.titleColor" value="8" id="bg_color8<%=classId%>"/>
      </div>
    </div>

    <div class="verAlignMid mr5">
      <div class="cal_titlecolor-block bgc_fontSchTitleGray">
        <input type="radio" name="easyRegister.titleColor" value="9" id="bg_color9<%=classId%>"/>
      </div>
    </div>

    <div class="verAlignMid mr5">
      <div class="cal_titlecolor-block bgc_fontSchTitleMarine">
        <input type="radio" name="easyRegister.titleColor" value="10" id="bg_color10<%=classId%>"/>
      </div>
    </div>
  </logic:equal>
  <div class="w100">
    <html:text name="<%=name%>" property="easyRegister.title" maxlength="50" value="" styleId="selectionSearchArea" styleClass="w100"/>
  </div>

  <div class="mt10"><gsmsg:write key="cmn.content" /></div>
  <div class="w100">
    <html:textarea name="<%=name%>" property="easyRegister.content" cols="50" rows="3" styleClass="w100 hp60 easyRegister-textarea"/>
  </div>

  <div class="mt10"><gsmsg:write key="cmn.public.kbn" /></div>
  <div class="w100 verAlignMid">
    <input type="radio" name="easyRegister.publicKbn" value="0" id="public0<%=classId%>" /><label for="public0<%=classId%>" id="public0_label<%=classId%>"><gsmsg:write key="cmn.public" /></label>
    <input type="radio" name="easyRegister.publicKbn" value="1" id="public1<%=classId%>"  class="ml10"/><label for="public1<%=classId%>" id="public1_label<%=classId%>"><gsmsg:write key="cmn.private" /></label>
    <input type="radio" name="easyRegister.publicKbn" value="2" id="public2<%=classId%>"  class="ml10"/><label for="public2<%=classId%>" id="public2_label<%=classId%>"><gsmsg:write key="schedule.51" /></label>
    <input type="radio" name="easyRegister.publicKbn" value="5" id="public5<%=classId%>"  class="ml10"/><label for="public5<%=classId%>" id="public5_label<%=classId%>"><gsmsg:write key="schedule.52" /></label>
  </div>
  <div class="txt_r">
    <button type="button" class="baseBtn m0" onclick="dialogOk('<%=name%>', '<%=classId%>', $(this))"><img class="btn_originalImg-display" src="../common/images/original/icon_add.png" alt="<gsmsg:write key="cmn.entry" />"><gsmsg:write key="cmn.entry" /></button>
  </div>
</div>
</div>



<script type="text/javascript">

var beforeSelectMinute = "";
var timeU = $('input[name="easyRegister.timeUnits"]').val();
var choices = ["00","10","20","30","40","50"];
if (timeU == 5) {
    choices = ["00","05","10","15","20","25","30","35","40","45","50","55"];
} else if (timeU == 15) {
    choices = ["00","15","30","45"];
}
function clpClear(target) {
    $('#'+target+'').val('');
    $('#'+target+'').clockpicker('hide');
}

$('.js_clockpicker').on('input', function() {
    if ($(this).val().length == 5
            && $(this).val().indexOf(":") == 2
            && $(this).val().split(":")[0].match(/^[0-9]+$/)
            && $(this).val().split(":")[1].match(/^[0-9]+$/)) {
        /* 入力値が半角英数2文字 + ":" + 半角英数2文字 の時、重複チェックを行う。 */
        dupCheck($(this).parent().parent().data('name'), $(this).parent().parent().data('class'));
    }
});

$.each($('.js_clockpicker'), function() {
  var targetInput = $(this);
  targetInput.clockpicker({
    placement: 'bottom',
    align: 'left',
    autoclose: true,
    beforeShow: function() {
        //選択不可の値を選択して再描画された時、選択前の値で更新する。
        if (beforeSelectMinute != "" && $.inArray(targetInput.val().split(":")[1], choices) == -1){
            targetInput.val(targetInput.data('clockpicker').spanHours.text() + ":" + beforeSelectMinute);
        }
        beforeSelectMinute = targetInput.val().split(":")[1];
        $('.js_clpClear_area').remove();
    },
    afterShow: function() {
        var clock = $('.clockpicker-popover');
        var clock_id = targetInput.attr('id');
        clock.append("<div class='clpClear_area js_clpClear_area'><button type='button' class='js_clockpickerClear clpClear_button' onClick=\"clpClear(\'"+clock_id+"\')\">クリア</button></div>");
        $('.clockpicker-span-minutes').text(targetInput.val().split(":")[1]);
        if (targetInput.val().split(":")[0].length == 0) {
            $('.clockpicker-span-hours').text("00");
        } else {
        	$('.clockpicker-span-hours').text(targetInput.val().split(":")[0]);
        }
        $(".clockpicker-minutes").find(".clockpicker-tick").filter(function(index, element){
            return !($.inArray($(element).text(), choices) != -1)
        }).remove();
    },
    afterHourSelect: function() {
        targetInput.val(targetInput.data('clockpicker').spanHours.text() + ":" + targetInput.data('clockpicker').spanMinutes.text());
        dupCheck(targetInput.parent().parent().data('name'), targetInput.parent().parent().data('class'));
    },
    afterDone: function(){
        var selectedMinutes = targetInput.val().split(":")[1];
        if ($.inArray(selectedMinutes, choices) == -1){
            targetInput.clockpicker('show').clockpicker('toggleView', 'minutes');
        }
        dupCheck(targetInput.parent().parent().data('name'), targetInput.parent().parent().data('class'));
    },
    afterHide: function(){
        if ($.inArray(targetInput.data('clockpicker').spanMinutes.text(), choices) != -1){
            //ダイアログを閉じる際に選択した時間がもう片方の時間を上回った場合、同じ値で更新する。
            if (targetInput.attr("id").substring(0, 8) == "fr_clock") {
                var frHour = Number(targetInput.data('clockpicker').spanHours.text());
                var frMinute = Number(targetInput.data('clockpicker').spanMinutes.text());
                var toHour = Number($('#to_clock' + targetInput.attr("id").substring(8)).val().substring(0, 2));
                var toMinute = Number($('#to_clock' + targetInput.attr("id").substring(8)).val().substring(3, 5));
                if (frHour > toHour || (frHour == toHour && frMinute > toMinute)) {
                    $('#to_clock' + targetInput.attr("id").substring(8)).val(targetInput.data('clockpicker').spanHours.text() + ":" + targetInput.data('clockpicker').spanMinutes.text());
                }
            } else if (targetInput.attr("id").substring(0, 8) == "to_clock") {
                var frHour = Number($('#fr_clock' + targetInput.attr("id").substring(8)).val().substring(0, 2));
                var frMinute = Number($('#fr_clock' + targetInput.attr("id").substring(8)).val().substring(3, 5));
                var toHour = Number(targetInput.data('clockpicker').spanHours.text());
                var toMinute = Number(targetInput.data('clockpicker').spanMinutes.text());
                if (frHour > toHour || (frHour == toHour && frMinute > toMinute)) {
                    $('#fr_clock' + targetInput.attr("id").substring(8)).val(targetInput.data('clockpicker').spanHours.text() + ":" + targetInput.data('clockpicker').spanMinutes.text());
                }
            }
            dupCheck(targetInput.parent().parent().data('name'), targetInput.parent().parent().data('class'));
            beforeSelectMinute = "";
        } else {
            targetInput.val(targetInput.data('clockpicker').spanHours.text() + ":" + beforeSelectMinute);
        }
    }
  });
});


</script>
