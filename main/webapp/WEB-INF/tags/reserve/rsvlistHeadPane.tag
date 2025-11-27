<%@tag import="jp.groupsession.v2.cmn.GSConst"%>
<%@tag import="jp.groupsession.v2.rsv.rsv010.Rsv010Form"%>
<%@ tag pageEncoding="utf-8" body-content="empty" description="施設予約一覧 上部ボタンペイン"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>


<%@ attribute description="施設予約一覧系画面Formクラス thisFormを継承してればOK" name="thisForm" type="Rsv010Form" required="true"%>
<%@ attribute description="画面遷移ボタン" name="useListChangeBtn" type="Boolean" required="false"%>
<%@ attribute description="日間画面遷移ボタンイベント" name="rsv020BtnEv" type="String" required="false" %>
<%@ attribute description="週間間画面遷移ボタンイベント" name="rsv010BtnEv" type="String" required="false"%>
<%@ attribute description="一覧画面遷移ボタンイベント" name="rsv100BtnEv" type="String" required="false"%>
<%@ attribute description="施設フィルター利用をするか" name="useRsvFilter" type="Boolean" required="false"%>

<%@ attribute description="施設選択(左）" name="selectSisetu" fragment="true" required="false"%>
<%@ attribute description="日付移動(右) " name="moveDays" fragment="true" required="false"%>
<%@ attribute description="検索一覧 検索パネル（下）" name="searchPane" fragment="true" required="false"%>

<script src="../reserve/js/rsvlisthead.js?<%=GSConst.VERSION_PARAM%>"></script>


<%-- 必須でない引数に初期値設定 --%>
<logic:empty name="rsv020BtnEv">
  <bean:define id="rsv020BtnEv" value=""/>
</logic:empty>
<logic:empty name="rsv010BtnEv">
  <bean:define id="rsv010BtnEv" value=""/>
</logic:empty>
<logic:empty name="rsv100BtnEv">
  <bean:define id="rsv100BtnEv" value=""/>
</logic:empty>


<input type="hidden" name="hourDiv" value="1">
<input type="hidden" name="rsv010sisetuFreeFromY" value="">
<input type="hidden" name="rsv010sisetuFreeFromMo" value="">
<input type="hidden" name="rsv010sisetuFreeFromD" value="">
<input type="hidden" name="rsv010sisetuFreeFromH" value="">
<input type="hidden" name="rsv010sisetuFreeFromMi" value="">
<input type="hidden" name="rsv010sisetuFreeToY" value="">
<input type="hidden" name="rsv010sisetuFreeToMo" value="">
<input type="hidden" name="rsv010sisetuFreeToD" value="">
<input type="hidden" name="rsv010sisetuFreeToH" value="">
<input type="hidden" name="rsv010sisetuFreeToMi" value="">

        <div class="rsvListHead display_flex w100">
          <!-- しぼりこみ設定 -->
          <div class="verAlignMid rsvListHead_nogrow w50">
            <logic:equal name="thisForm" property="rsv010LearnMoreFlg" value="1">
              <bean:define id="kaniDisp" value="display_none" />
              <bean:define id="filterDisp" value="" />
            </logic:equal>
            <logic:equal name="thisForm" property="rsv010LearnMoreFlg" value="0">
              <bean:define id="kaniDisp" value="" />
              <bean:define id="filterDisp" value="display_none" />
            </logic:equal>
            <div>
              <jsp:invoke fragment="selectSisetu"></jsp:invoke>
            </div>
            <logic:equal name="useRsvFilter" value="true">
              <span id="js_kaniSyukan" class="<bean:write name="kaniDisp"/> no_w verAlignMid ">
                <span class="rsvListHead_nogrow rsvListHead_noshrink"><gsmsg:write key="cmn.group" />：</span>
                <span class="">
                  <html:select property="rsvSelectedGrpSid" styleClass="w100" onchange="changeGroupCombo();">
                    <html:optionsCollection name="thisForm" property="rsvGrpLabelList" value="value" label="label" />
                  </html:select>
                </span>
              </span>
              <button type="button" value="<gsmsg:write key="reserve.180" />" id="js_learnBtnSyu" class="rsvListHead_nogrow rsvListHead_noshrink no_w <bean:write name="kaniDisp"/> ml5 baseBtn" onclick="learnMore();">
                <gsmsg:write key="reserve.180" />
              </button>
              <button type="button" value="<gsmsg:write key="reserve.182" />" id="js_unfilteredBtnSuu" class="rsvListHead_nogrow rsvListHead_noshrink no_w <bean:write name="filterDisp"/> baseBtn " onclick="unfiltered();">
                <gsmsg:write key="reserve.182" />
              </button>
            </logic:equal>
          </div>
          <!-- 画面遷移ボタン -->
          <logic:notEqual name="useListChangeBtn" value="false">
            <div class="rsvListHead_noshrink ">
              <div class="verAlignMid no_w ">
                <button type="button" value="<gsmsg:write key="cmn.days2" />" class="baseBtn ml5" onclick="<bean:write name="rsv020BtnEv"/>">
                  <img class="btn_classicImg-display" src="../common/images/classic/icon_clock.png" alt="<gsmsg:write key="cmn.days2" />">
                  <img class="btn_originalImg-display" src="../common/images/original/icon_clock.png" alt="<gsmsg:write key="cmn.days2" />">
                  <gsmsg:write key="cmn.days2" />
                </button>
                <button type="button" value="<gsmsg:write key="cmn.weeks" />" class="baseBtn ml5 mr5" onClick="<bean:write name="rsv010BtnEv"/>">
                  <img class="btn_classicImg-display" src="../common/images/classic/icon_cal_week.png" alt="<gsmsg:write key="cmn.weeks" />">
                  <img class="btn_originalImg-display" src="../common/images/original/icon_week.png" alt="<gsmsg:write key="cmn.weeks" />">
                  <gsmsg:write key="cmn.weeks" />
                </button>
                <button type="button" value="<gsmsg:write key="cmn.listof" />" class="baseBtn mr5" onclick="<bean:write name="rsv100BtnEv"/>">
                  <img class="btn_classicImg-display" src="../common/images/classic/icon_cal_list.png" alt="<gsmsg:write key="cmn.list" />">
                  <img class="btn_originalImg-display" src="../common/images/original/icon_list.png" alt="<gsmsg:write key="cmn.list" />">
                  <gsmsg:write key="cmn.list" />
                </button>
              </div>
            </div>
          </logic:notEqual>
          <!-- 表示日遷移ボタン -->
          <div class="rsvListHead_nogrow w50">
            <div class="verAlignMid w100">
              <jsp:invoke fragment="moveDays"></jsp:invoke>
            </div>
          </div>
        </div>
        <logic:equal name="useRsvFilter" value="true">

          <!-- 絞り込み検索 -->
          <div id="js_leranMore_syu" class="<bean:write name="filterDisp"/>">
            <table class="mt5 table-left table-fixed">
              <tr>
                <th colspan="1" class="txt_c wp100">
                  <span>
                    <gsmsg:write key="cmn.keyword" />
                  </span>
                </th>
                <td colspan="1" class="w50">
                  <span>
                    <div>
                      <html:text name="thisForm" maxlength="50" property="rsv010sisetuKeyword" styleClass="wp300" />
                    </div>
                    <span class="verAlignMid">
                      <html:radio name="thisForm" property="rsv010KeyWordkbn" value="0" styleId="keyKbn_01" />
                      <label for="keyKbn_01" class="mr10">
                        <gsmsg:write key="cmn.contains.all.and" />
                      </label>
                      <html:radio name="thisForm" property="rsv010KeyWordkbn" value="1" styleClass="" styleId="keyKbn_02" />
                      <label for="keyKbn_02">
                        <gsmsg:write key="cmn.orcondition" />
                      </label>
                    </span>
                  </span>
                </td>
                <th colspan="1" class="txt_c wp100 no_w">
                  <span>
                    <gsmsg:write key="cmn.target" />
                  </span>
                </th>
                <td colspan="1" class="w50 " >
                  <span class="verAlignMid">
                    <html:checkbox styleId="sisan" name="thisForm" property="rsv010sisetuKeywordSisan" value="1" />
                    <label for="sisan">
                      <gsmsg:write key="cmn.asset.register.num" />
                    </label>
                    <html:checkbox styleClass="ml10" styleId="sisanname" name="thisForm" property="rsv010sisetuKeywordSisetu" value="1" />
                    <label for="sisanname">
                      <gsmsg:write key="cmn.facility.name" />
                    </label>
                    <html:checkbox styleClass="ml10" styleId="biko" name="thisForm" property="rsv010sisetuKeywordBiko" value="1" />
                    <label for="biko">
                      <gsmsg:write key="cmn.memo" />
                    </label>
                    <logic:equal name="thisForm" property="rsv010sisetuKbn" value="3">
                      <span class="verAlignMid">
                        <html:checkbox styleClass="ml10" styleId="number" name="thisForm" property="rsv010sisetuKeywordNo" value="1" />
                        <label for="number">
                          <gsmsg:write key="reserve.134" />
                        </label>
                      </span>
                    </logic:equal>
                    <logic:notEqual name="thisForm" property="rsv010sisetuKbn" value="3">
                      <span class="display_none verAlignMid ml10">
                        <html:checkbox styleId="number" name="thisForm" property="rsv010sisetuKeywordNo" value="1" />
                        <label for="number">
                          <gsmsg:write key="reserve.134" />
                        </label>
                      </span>
                    </logic:notEqual>
                    <logic:equal name="thisForm" property="rsv010sisetuKbn" value="4">
                      <span class="verAlignMid ml10">
                        <html:checkbox styleId="isbn" name="thisForm" property="rsv010sisetuKeywordIsbn" value="1" />
                        <label for="isbn">
                          <gsmsg:write key="reserve.181" />
                        </label>
                      </span>
                    </logic:equal>
                    <logic:notEqual name="thisForm" property="rsv010sisetuKbn" value="4">
                      <span class="display_none verAlignMid ml10">
                        <html:checkbox styleId="isbn" name="thisForm" property="rsv010sisetuKeywordIsbn" value="1" />
                        <label for="isbn">
                          <gsmsg:write key="reserve.181" />
                        </label>
                      </span>
                    </logic:notEqual>
                  </span>
                </td>
              </tr>

              <tr>
                <th colspan="1" class="txt_c w10 no_w">
                  <span>
                    <gsmsg:write key="reserve.47" />
                  </span>
                </th>
                <td colspan="1" class="w40 no_w">
                  <span>
                    <html:select property="rsv010sisetuKbn" styleClass="" styleId="js_sisetuKbnComb" onchange="changeKbnCombo();">
                      <html:optionsCollection name="thisForm" property="rsv010SisetuKbnList" value="value" label="label" />
                    </html:select>
                  </span>
                </td>
                <th colspan="1" class="txt_c w10 no_w">
                  <span>
                    <gsmsg:write key="cmn.group" />
                  </span>
                </th>
                <td colspan="1" class="w40 no_w">
                  <span>
                    <html:select property="rsv010grpNarrowDown" styleClass="">
                      <html:optionsCollection name="thisForm" property="rsvGrpNarrowDownList" value="value" label="label" />
                    </html:select>
                  </span>
                </td>
              </tr>

              <bean:define id="roomKbn" value="0" />
              <bean:define id="objectKbn" value="0" />
              <logic:equal name="thisForm" property="rsv010sisetuKbn" value="1">
                <bean:define id="roomKbn" value="1" />
              </logic:equal>
              <logic:equal name="thisForm" property="rsv010sisetuKbn" value="3">
                <bean:define id="roomKbn" value="1" />
              </logic:equal>
              <logic:equal name="thisForm" property="rsv010sisetuKbn" value="2">
                <bean:define id="objectKbn" value="1" />
              </logic:equal>
              <logic:equal name="thisForm" property="rsv010sisetuKbn" value="4">
                <bean:define id="objectKbn" value="1" />
              </logic:equal>

              <logic:equal name="roomKbn" value="1">
                <tr id="js_smoky_syu">
              </logic:equal>
              <logic:notEqual name="roomKbn" value="1">
                <tr id="js_smoky_syu" class="display_none">
              </logic:notEqual>
              <th colspan="1" class="txt_c w10 no_w">
                <span>
                  <gsmsg:write key="reserve.132" />
                </span>
              </th>
              <td colspan="1" class="w50 no_w">
                <span class="verAlignMid">
                  <html:radio name="thisForm" property="rsv010sisetuSmoky" value="0" styleId="smokyKbn_01" />
                  <label for="smokyKbn_01">
                    <gsmsg:write key="reserve.184" />
                  </label>
                  <html:radio styleClass="ml10" name="thisForm" property="rsv010sisetuSmoky" value="1" styleId="smokyKbn_02" />
                  <label for="smokyKbn_02">
                    <gsmsg:write key="cmn.accepted" />
                  </label>
                  <html:radio styleClass="ml10" name="thisForm" property="rsv010sisetuSmoky" value="2" styleId="smokyKbn_03" />
                  <label for="smokyKbn_03">
                    <gsmsg:write key="cmn.not" />
                  </label>
                </span>
              </td>
              <th colspan="1" class="txt_c w10 no_w">
                <span>
                  <gsmsg:write key="reserve.128" />
                </span>
              </th>
              <td colspan="1" class="w30 no_w">
                <span>
                  <html:text name="thisForm" maxlength="10" property="rsv010sisetuChere" styleClass="wp100" />
                  &nbsp;
                  <gsmsg:write key="cmn.comp.oe" />
                </span>
              </td>
              </tr>

              <logic:equal name="objectKbn" value="1">
                <tr id="js_syagai_syu">
              </logic:equal>
              <logic:notEqual name="objectKbn" value="1">
                <tr id="js_syagai_syu" class="display_n">
              </logic:notEqual>
              <th colspan="1" class="txt_c w10 no_w">
                <span>
                  <gsmsg:write key="reserve.185" />
                </span>
              </th>
              <td colspan="3" class="w90 no_w">
                <span class="verAlignMid">
                  <html:radio name="thisForm" property="rsv010sisetuTakeout" value="0" styleId="takeoutKbn_01" />
                  <label for="takeoutKbn_01">
                    <gsmsg:write key="reserve.184" />
                  </label>
                  <html:radio styleClass="ml10" name="thisForm" property="rsv010sisetuTakeout" value="1" styleId="takeoutKbn_02" />
                  <label for="takeoutKbn_02">
                    <gsmsg:write key="cmn.accepted" />
                  </label>
                  <html:radio styleClass="ml10" name="thisForm" property="rsv010sisetuTakeout" value="2" styleId="takeoutKbn_03" />
                  <label for="takeoutKbn_03">
                    <gsmsg:write key="cmn.not" />
                  </label>
                </span>
              </td>
              </tr>
              <tr>
                <th colspan="1" class="txt_c w10 no_w">
                  <span>
                    <gsmsg:write key="schedule.17" />
                  </span>
                </th>
                <td colspan="3" class="w90 no_w">
                  <span class="verAlignMid">
                    <html:checkbox styleId="aki" name="thisForm" property="rsv010sisetuFree" onchange="freeTime()" value="1" />
                    <label for="aki">
                      <gsmsg:write key="reserve.183" />
                    </label>
                    <logic:equal name="thisForm" property="rsv010sisetuFree" value="1">
                      <div class="display_flex js_dateInputSyu">
                    </logic:equal>
                    <logic:notEqual name="thisForm" property="rsv010sisetuFree" value="1">
                      <div class="display_none js_dateInputSyu">
                    </logic:notEqual>
                      <html:text name="thisForm" property="rsv010sisetuFreeFromDate" maxlength="10" styleClass="txt_c wp95 datepicker js_frDatePicker ml5"/>
                      <span class="picker-acs icon-date display_flex cursor_pointer iconKikanStart"></span>
                      <span class="clockpicker_fr ml5 mr5 pos_rel display_flex input-group">
                        <html:text name="thisForm" property="rsv010sisetuFreeFromTime" styleId="fr_clock" maxlength="5" styleClass="clockpicker js_clockpicker txt_c wp60"/>
                        <label for="fr_clock" class="picker-acs cursor_pointer icon-clock input-group-addon"></label>
                      </span>
                      <gsmsg:write key="tcd.153" />
                      <html:text name="thisForm" property="rsv010sisetuFreeToDate" maxlength="10" styleClass="txt_c wp95 datepicker js_toDatePicker ml5"/>
                      <span class="picker-acs icon-date display_flex cursor_pointer iconKikanStart"></span>
                      <span class="clockpicker_to ml5 pos_rel display_flex input-group">
                        <html:text name="thisForm" property="rsv010sisetuFreeToTime" styleId="to_clock" maxlength="5" styleClass="clockpicker js_clockpicker txt_c wp60"/>
                        <label for="to_clock" class="picker-acs cursor_pointer icon-clock input-group-addon"></label>
                      </span>
                    </div>
                  </span>
                </td>
              </tr>
            </table>

            <div>
              <button type="button" value="<gsmsg:write key="reserve.186"/>" class="baseBtn" onclick="siborikomi();">
                <gsmsg:write key="reserve.186" />
              </button>
            </div>
          </div>
        </logic:equal>
        <logic:empty name="searchPane">
          <logic:messagesPresent message="false">
            <html:errors />
          </logic:messagesPresent>
          <table class="table-top  w100 mb0">
            <tr>
              <th class="topFrame_btnGroup table_title-color">
                <span class="fs_18">
                  <bean:write name="thisForm" property="rsvDispYm" />
                </span><!--
             --><bean:write name="thisForm" property="rsvDispRokuyou" />
              </th>
              <td class="w40 txt_r border_left_none table_title-color no_w">
                <html:text name="thisForm" property="rsv100KeyWord" styleClass="wp150" maxlength="50" onkeydown="return keyPress(event.keyCode);"  />
                <button type="button" value="<gsmsg:write key="cmn.search" />" class="baseBtn" onclick="buttonPush('gotosearch');">
                  <img class="btn_classicImg-display" src="../common/images/classic/icon_search.png" alt="<gsmsg:write key="cmn.search" />">
                  <img class="btn_originalImg-display" src="../common/images/original/icon_search.png" alt="<gsmsg:write key="cmn.search" />">
                  <gsmsg:write key="cmn.search" />
                </button>
              </td>
            </tr>
          </table>
        </logic:empty>
        <logic:notEmpty name="searchPane">
            <jsp:invoke fragment="searchPane"></jsp:invoke>
        </logic:notEmpty>