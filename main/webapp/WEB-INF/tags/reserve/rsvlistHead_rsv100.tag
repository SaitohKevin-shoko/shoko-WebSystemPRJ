<%@tag import="jp.groupsession.v2.cmn.GSConstReserve"%>
<%@tag import="jp.groupsession.v2.cmn.GSConst"%>
<%@ tag pageEncoding="utf-8" body-content="empty" description="施設予約一覧 検索ペイン rsvListHeadPaneのsearchPaneに配置する"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>

  <bean:define id="thisForm" name="rsv100Form" scope="request" />

    <bean:define id="iorderKey" name="rsv100Form" property="rsv100OrderKey" />
    <bean:define id="isortKbn" name="rsv100Form" property="rsv100SortKey" />

  <table class="table-left table-fixed" cellpadding="5" cellspacing="0">
    <tr>
      <th class="txt_c wp100">
        <span>
          <gsmsg:write key="cmn.keyword" />
        </span>
      </th>
      <td class="w40">
        <div>
          <div>
            <html:text name="thisForm" property="rsv100KeyWord" maxlength="50" styleClass="wp300" />
          </div>
          <div class="verAlignMid">
            <html:radio styleId="lvl1" name="thisForm" property="rsv100SearchCondition" value="0" />
            <label for="lvl1" class="mr10">
              <gsmsg:write key="cmn.contains.all" />(AND)
            </label>
            <html:radio styleId="lvl2" name="thisForm" property="rsv100SearchCondition" value="1" />
            <label for="lvl2">
              <gsmsg:write key="cmn.containing.either" />(OR)
            </label>
          </div>
        </div>
      </td>

      <th class="txt_c wp100">
        <span>
          <gsmsg:write key="cmn.search2" />
        </span>
      </th>
      <td class="w40">
        <div class="verAlignMid">
          <html:checkbox styleId="mok" name="thisForm" property="rsv100TargetMok" value="1" />
          <label for="mok" class="mr10">
            <gsmsg:write key="reserve.72" />
          </label>
          <html:checkbox styleClass="" styleId="niyo" name="thisForm" property="rsv100TargetNiyo" value="1" />
          <label for="niyo">
            <gsmsg:write key="cmn.content" />
          </label>
        </div>
      </td>
    </tr>

    <tr>
      <th class="txt_c">
        <span>
          <gsmsg:write key="cmn.group" />
        </span>
      </th>
      <td>
        <div class="display_flex">
          <div class="rsvListHead_nogrow mr5">
            <div class="verAlignMid hp30 no_w">
              <gsmsg:write key="cmn.group" />
            </div><br />
            <div class="verAlignMid hp30 no_w">
              <gsmsg:write key="cmn.facility" />
            </div>
          </div>
          <div class="w100 ">
            <div class="verAlignMid hp30 ">
              <html:select property="rsvSelectedGrpSid" styleClass="w100" onchange="changeGroupCombo()">
                <html:optionsCollection name="thisForm" property="rsv100LabelListGrp1" value="value" label="label" />
              </html:select>
            </div><br>
            <div class="verAlignMid hp30 ">
              <html:select property="rsvSelectedSisetuSid" styleClass="w100">
                <html:optionsCollection name="thisForm" property="rsv100LabelListGrp2" value="value" label="label" />
              </html:select>
            </div>
          </div>
        </div>
      </td>

      <th class="txt_c">
        <span>
          <gsmsg:write key="cmn.appr.status" />
        </span>
      </th>
      <td>
        <div class="verAlignMid mr10">
          <html:radio styleId="apprStatus1" name="thisForm" property="rsv100apprStatus" value="0" />
          <label for="apprStatus1">
            <gsmsg:write key="reserve.rsv100.appr.status1" />
          </label>
        </div><!--
     --><div class="verAlignMid mr10">
          <html:radio styleClass="" styleId="apprStatus2" name="thisForm" property="rsv100apprStatus" value="1" />
          <label for="apprStatus2">
            <gsmsg:write key="reserve.rsv100.appr.status2" />
          </label>
        </div><!--
     --><div class="verAlignMid mr10">
          <html:radio styleClass="" styleId="apprStatus3" name="thisForm" property="rsv100apprStatus" value="2" />
          <label for="apprStatus3">
            <gsmsg:write key="reserve.rsv100.appr.status3" />
          </label>
        </div><!--
     --><div class="verAlignMid ">
          <html:radio styleId="apprStatus4" name="thisForm" property="rsv100apprStatus" value="3" />
          <label for="apprStatus4">
            <gsmsg:write key="reserve.rsv100.appr.status4" />
          </label>
        </div>
      </td>
    </tr>

    <tr>
      <th class="txt_c no_w">
        <span>
          <gsmsg:write key="cmn.period" />
        </span>
      </th>
      <td colspan="3" class="txt_m no_w">
        <span class="verAlignMid">
          <html:checkbox name="thisForm" styleId="srhDateKbn" property="rsv100dateKbn" value="1" onclick="rsv100ChgDateKbn();" />
          <label for="srhDateKbn">
            <gsmsg:write key="cmn.without.specifying" />
          </label>
          <html:text name="thisForm" property="rsv100selectedFromDate" maxlength="10" styleClass="txt_c wp95 ml10 datepicker js_frDatePicker" styleId="selDatefr" />
          <span class="picker-acs icon-date display_flex cursor_pointer iconKikanStart"></span>
          <span id="rsv100DateFromBtnAreaOn" class="verAlignMid ml5">
            <button type="button" class="webIconBtn" value="&nbsp;" onclick="return moveDay($('#selDatefr')[0], 1)">
              <img class="btn_classicImg-display" src="../common/images/classic/icon_arrow_l.png">
              <i class="icon-paging_left "></i>
            </button>

            <button type="button" class="baseBtn classic-display" value="<gsmsg:write key="cmn.today" />" onClick="return moveDay($('#selDatefr')[0], 2);">
              <gsmsg:write key="cmn.today" />
            </button>
            <span>
              <a href="#!" class="fw_b todayBtn original-display" onClick="return moveDay($('#selDatefr')[0], 2);">
                <gsmsg:write key="cmn.today" />
              </a>
            </span>
            <button type="button" class="webIconBtn" value="&nbsp;" onclick="return moveDay($('#selDatefr')[0], 3)">
              <img class="btn_classicImg-display" src="../common/images/classic/icon_arrow_r.png">
              <i class="icon-paging_right "></i>
            </button>
          </span>
          <span class="verAlignMid ml5" id="rsv100DateFromBtnAreaOff">
            <button type="button" class="webIconBtn opacity6" value="&nbsp;"  disabled="disabled">
              <img class="btn_classicImg-display" src="../common/images/classic/icon_arrow_l.png">
              <i class="icon-paging_left "></i>
            </button>

            <button type="button" class="baseBtn classic-display opacity6" value="<gsmsg:write key="cmn.today" />" disabled="disabled">
              <gsmsg:write key="cmn.today" />
            </button>
            <span>
              <a href="#!" class="fw_b todayBtn original-display opacity6 cursor_d"  disabled="disabled">
                <gsmsg:write key="cmn.today" />
              </a>
            </span>
            <button type="button" class="webIconBtn opacity6" value="&nbsp;"  disabled="disabled">
              <img class="btn_classicImg-display" src="../common/images/classic/icon_arrow_r.png">
              <i class="icon-paging_right "></i>
            </button>
          </span>
          <span class="ml5">～</span>
          <span class="verAlignMid">
            <html:text name="thisForm" property="rsv100selectedToDate" maxlength="10" styleClass="txt_c wp95 ml5 datepicker js_toDatePicker" styleId="selDateto" />
            <span class="picker-acs icon-date display_flex cursor_pointer iconKikanFinish"></span>
          </span>
          <span class="verAlignMid ml5" id="rsv100DateToBtnAreaOn">
            <span class="verAlignMid">
              <button type="button" class="webIconBtn" value="&nbsp;" onclick="return moveDay($('#selDateto')[0], 1)">
                <img class="btn_classicImg-display" src="../common/images/classic/icon_arrow_l.png">
                <i class="icon-paging_left "></i>
              </button>
              <button type="button" class="baseBtn classic-display" value="<gsmsg:write key="cmn.today" />" onClick="return moveDay($('#selDateto')[0], 2);">
                <gsmsg:write key="cmn.today" />
              </button>
              <span>
                <a href="#!" class="fw_b todayBtn original-display" onClick="return moveDay($('#selDateto')[0], 2);">
                  <gsmsg:write key="cmn.today" />
                </a>
              </span>
              <button type="button" class="webIconBtn" value="&nbsp;" onclick="return moveDay($('#selDateto')[0], 3)">
                <img class="btn_classicImg-display" src="../common/images/classic/icon_arrow_r.png">
                <i class="icon-paging_right "></i>
              </button>
            </span>
          </span>

          <span class="verAlignMid ml5" id="rsv100DateToBtnAreaOff">
              <button type="button" class="webIconBtn opacity6" value="&nbsp;"  disabled="disabled">
                <img class="btn_classicImg-display" src="../common/images/classic/icon_arrow_l.png">
                <i class="icon-paging_left "></i>
              </button>

              <button type="button" class="baseBtn classic-display opacity6" value="<gsmsg:write key="cmn.today" />" disabled="disabled">
                <gsmsg:write key="cmn.today" />
              </button>
              <span>
                <a href="#!" class="fw_b todayBtn original-display opacity6 cursor_d"  disabled="disabled">
                  <gsmsg:write key="cmn.today" />
                </a>
              </span>
              <button type="button" class="webIconBtn opacity6" value="&nbsp;"  disabled="disabled">
                <img class="btn_classicImg-display" src="../common/images/classic/icon_arrow_r.png">
                <i class="icon-paging_right "></i>
              </button>
          </span>
        </span>
      </td>
    </tr>

    <tr>
      <th class="txt_c">
        <span>
          <gsmsg:write key="cmn.sort.order" />
        </span>
      </th>
      <td colspan="3">
        <span>
          <gsmsg:write key="cmn.first.key" />
        </span>
        <span class="verAlignMid mr20">
          <html:select property="rsv100SelectedKey1" styleClass="select01">
            <html:optionsCollection name="thisForm" property="rsv100KeyList" value="value" label="label" />
          </html:select>
          <html:radio styleClass="ml5" styleId="sort1and" name="thisForm" property="rsv100SelectedKey1Sort" value="0" />
          <label for="sort1and">
            <gsmsg:write key="cmn.order.asc" />
          </label>
          <html:radio styleClass="ml10" styleId="sort1or" name="thisForm" property="rsv100SelectedKey1Sort" value="1" />
          <label for="sort1or">
            <gsmsg:write key="cmn.order.desc" />
          </label>
        </span>
        <span>
          <gsmsg:write key="cmn.second.key" />
        </span>
        <span class="verAlignMid">
          <html:select property="rsv100SelectedKey2" styleClass="select01">
            <html:optionsCollection name="thisForm" property="rsv100KeyList" value="value" label="label" />
          </html:select>
          <html:radio styleClass="ml5" styleId="sort2and" name="thisForm" property="rsv100SelectedKey2Sort" value="0" />
          <label for="sort2and">
            <gsmsg:write key="cmn.order.asc" />
          </label>
          <html:radio styleClass="ml10" styleId="sort2or" name="thisForm" property="rsv100SelectedKey2Sort" value="1" />
          <label for="sort2or">
            <gsmsg:write key="cmn.order.desc" />
          </label>
        </span>
      </td>
    </tr>
  </table>

  <div>
    <button type="button" name="btn_usrimp" class="baseBtn" value="<gsmsg:write key="cmn.search" />" onclick="buttonPush('kensaku');">
      <img src="../common/images/classic/icon_search.png" alt="<gsmsg:write key="cmn.search" />" class="btn_classicImg-display">
      <img src="../common/images/original/icon_search.png" alt="<gsmsg:write key="cmn.search" />" class="btn_originalImg-display">
      <gsmsg:write key="cmn.search" />
    </button>
  </div>
