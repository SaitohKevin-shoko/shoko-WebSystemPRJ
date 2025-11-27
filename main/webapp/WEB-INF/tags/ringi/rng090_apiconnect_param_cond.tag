<%@tag import="java.util.Map.Entry"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.FormCell"%>
<%@tag import="jp.groupsession.v2.rng.rng090.EnumApiConnectConditionKbn"%>
<%@tag import="jp.groupsession.v2.rng.rng090.Rng090ApiConnectParamCondForm"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.FormAccesser"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.RadioButton"%>
<%@tag import="jp.groupsession.v2.rng.rng090.Rng090Form"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.FormBuilder"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.EnumFormModelKbn"%>
<%@tag import="jp.groupsession.v2.struts.msg.GsMessage"%>
<%@ tag import="jp.groupsession.v2.rng.rng090.Rng090ApiConnectParamForm"%>
<%@ tag import="jp.co.sjts.util.json.JSONObject"%>
<%@ tag import="jp.groupsession.v2.rng.rng090.Rng090ApiConnectForm"%>
<%@ tag import="java.util.Map.Entry"%>

<%@ tag pageEncoding="UTF-8" body-content="empty" description="稟議テンプレート登録画面でのRng090ApiConnectParamForm表示部のタグ パラメータ"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/gsform" prefix="gsform" %>
<%@ taglib tagdir="/WEB-INF/tags/common" prefix="cmn" %>
<%@ taglib tagdir="/WEB-INF/tags/ringi" prefix="ringi" %>

<%@ attribute description="フォーム名" name="name" type="String" %>
<%@ attribute description="プロパティ名" name="property" type="String" required="false" rtexprvalue="true" %>

<bean:define id="suffix" value="" />
<logic:notEmpty name="property">
  <bean:define id="suffix" value="<%=String.format(\"%s.\", property) %>" />
</logic:notEmpty>
<logic:empty name="property">
  <% name = "bean";%>
  <% jspContext.setAttribute("bean", new Rng090ApiConnectParamCondForm()); %>
</logic:empty>

<div class="js_inCond pos_rel w100 mb5">
  <div class="settingForm_separator mb0 mt10"></div>
  <button class="iconBtn-noBorder pos_abs right0 mt3 mr3" type="button" onclick="$(this).parent().parent().remove();">
    <img class="delButton btn_classicImg-display classic" src="../common/images/classic/icon_delete.png">
    <img class="delButton btn_originalImg-display original" src="../common/images/original/icon_delete.png">
  </button>
  <%-- 申請者  --%>
  <logic:equal name="<%=name %>" property="<%=String.format(\"%scondKbn.selected\", suffix)%>" value="<%=String.valueOf(EnumApiConnectConditionKbn.CONDKBN_USRGROUP.getValue()) %>">
    <html:select name="<%=name %>" property="<%=String.format(\"%scondKbn.selected\", suffix)%>" styleClass="inCondKbn txt_t" onchange="$(this).subform();">
      <html:optionsCollection name="<%=name %>" property="<%=String.format(\"%scondKbn.allList\", suffix)%>"/>
    </html:select>
    <div>
      <gsmsg:write key="rng.rng090.60"/>
    </div>
    <gsform:usrgrpselect name="<%=name %>" property="<%=String.format(\"%sselUsrgrp\", suffix)%>" onchange="$(this).subform();"/>
  </logic:equal>
  <logic:notEqual name="<%=name %>" property="<%=String.format(\"%scondKbn.selected\", suffix)%>" value="<%=String.valueOf(EnumApiConnectConditionKbn.CONDKBN_USRGROUP.getValue()) %>">
    <div class="display_none">
    <gsform:usrgrpselect name="<%=name %>" property="<%=String.format(\"%sselUsrgrp\", suffix)%>" onchange="$(this).subform();" />
    </div>
  </logic:notEqual>
  <%-- 申請者の役職  --%>
  <logic:equal name="<%=name %>" property="<%=String.format(\"%scondKbn.selected\", suffix)%>" value="<%=String.valueOf(EnumApiConnectConditionKbn.CONDKBN_POS.getValue()) %>">
    <html:select name="<%=name %>" property="<%=String.format(\"%scondKbn.selected\", suffix)%>" styleClass="inCondKbn txt_t" onchange="$(this).subform();">
      <html:optionsCollection name="<%=name %>" property="<%=String.format(\"%scondKbn.allList\", suffix)%>"/>
    </html:select>
    <div>
      <gsmsg:write key="rng.rng090.61"/>
    </div>
    <%-- TODO 汎用選択UI使用するよう 要修正  --%>
    <%--
    <gsform:multiselect name="<%=name %>" size="5" property="<%=String.format(\"%sselPos\", suffix) %>" onchange="$(this).subform();"/>
     --%>
  </logic:equal>
  <logic:notEqual name="<%=name %>" property="<%=String.format(\"%scondKbn.selected\", suffix)%>" value="<%=String.valueOf(EnumApiConnectConditionKbn.CONDKBN_POS.getValue()) %>">
    <div class="display_none">
    <%-- TODO 汎用選択UI使用するよう 要修正  --%>
    <%--
    <gsform:multiselect name="<%=name %>" size="5" property="<%=String.format(\"%sselPos\", suffix) %>" onchange="$(this).subform();"/>
     --%>

    </div>
  </logic:notEqual>
  <%-- 入力値  --%>
  <bean:define id="dsp_incondInput" value=""/>
  <logic:notEqual name="<%=name %>" property="<%=String.format(\"%scondKbn.selected\", suffix)%>" value="<%=String.valueOf(EnumApiConnectConditionKbn.CONDKBN_INPUT.getValue()) %>">
    <bean:define id="dsp_incondInput">display_none</bean:define>
  </logic:notEqual>
  <div class="<bean:write name="dsp_incondInput"/>">
    <logic:notEmpty name="<%=name %>" property="<%=String.format(\"%sformId.selectedLabelBean\", suffix)%>">
      <div class="mr40">
        <logic:empty name="dsp_IncondInput" >
          <html:select name="<%=name %>" property="<%=String.format(\"%scondKbn.selected\", suffix)%>" styleClass="inCondKbn txt_t"  onchange="$(this).subform();">
            <html:optionsCollection name="<%=name %>" property="<%=String.format(\"%scondKbn.allList\", suffix)%>"/>
          </html:select>
        </logic:empty>
        <div class="mt5"></div>
        <span class="no_w mr3"><gsmsg:write key="rng.rng110.31"/></span>
        <html:select name="<%=name %>" property="<%=String.format(\"%sformId.selected\", suffix)%>" onchange="$(this).closest('.js_inCond').find('[name$=&#34;formValue&#34;]').prop('disabled', true); $(this).subform();" styleClass="">
          <html:optionsCollection name="<%=name %>" property="<%=String.format(\"%sformId.allList\", suffix)%>"/>
        </html:select>
        <bean:define id="formKbn" name="<%=name %>" property="<%=String.format(\"%sformId.selectedLabelBean.formType\", suffix)%>" />
        <%-- テキストボックスによる入力値設定 --%>
        <logic:equal value="<%=EnumFormModelKbn.textbox.name()%>" name="<%=name %>" property="<%=String.format(\"%sformId.selectedLabelBean.formType\", suffix)%>">
          <bean:define id="formKbn" value="text" />
        </logic:equal>
        <logic:equal value="<%=EnumFormModelKbn.textarea.name()%>" name="<%=name %>" property="<%=String.format(\"%sformId.selectedLabelBean.formType\", suffix)%>">
          <bean:define id="formKbn" value="text" />
        </logic:equal>
        <logic:equal value="<%=EnumFormModelKbn.number.name()%>" name="<%=name %>" property="<%=String.format(\"%sformId.selectedLabelBean.formType\", suffix)%>">
          <bean:define id="formKbn" value="text" />
        </logic:equal>
        <logic:equal value="<%=EnumFormModelKbn.sum.name()%>" name="<%=name %>" property="<%=String.format(\"%sformId.selectedLabelBean.formType\", suffix)%>">
          <bean:define id="formKbn" value="text" />
        </logic:equal>
        <logic:equal value="<%=EnumFormModelKbn.calc.name()%>" name="<%=name %>" property="<%=String.format(\"%sformId.selectedLabelBean.formType\", suffix)%>">
          <bean:define id="formKbn" value="text" />
        </logic:equal>
        <bean:define id="formValue" value=""/>

        <logic:equal value="text" name="formKbn">
          <span class="no_w"><gsmsg:write key="rng.rng090.62"/></span>
          <span class="mr3"></span>
          <div class="mt5 mb5 w100">
            <logic:notEmpty name="<%=name %>" property="<%=String.format(\"%sformValue\", suffix)%>">
              <bean:define id="formValue" name="<%=name %>" property="<%=String.format(\"%sformValue[0]\", suffix)%>" type="String"/>
            </logic:notEmpty>
            <html:text name="<%=name %>" property="<%=String.format(\"%sformValue\", suffix)%>" value="<%=formValue %>" styleClass="w100"></html:text>
          </div>
          <%-- 比較子 選択 --%>
          <html:select name="<%=name %>" property="<%=String.format(\"%scomp.selected\", suffix)%>" styleClass="">
            <html:optionsCollection name="<%=name %>" property="<%=String.format(\"%scomp.allList\", suffix)%>"/>
          </html:select>

        </logic:equal>
        <%-- 入力フォーム毎の入力値設定 --%>
        <%-- 日付 --%>
        <logic:equal value="<%=EnumFormModelKbn.date.name()%>" name="formKbn">
          <span class="no_w"><gsmsg:write key="rng.rng090.62"/></span>
          <span class="mr3"></span>
          <logic:notEmpty name="<%=name %>" property="<%=String.format(\"%sformValue\", suffix)%>">
            <bean:define id="formValue" name="<%=name %>" property="<%=String.format(\"%sformValue[0]\", suffix)%>" type="String"/>
          </logic:notEmpty>
          <label class="display_inline">
            <html:text name="<%=name %>" property="<%=String.format(\"%sformValue\", suffix)%>"  value="<%=formValue %>" styleClass="datepicker js_datepicker" ></html:text>
            <span class="picker-acs cursor_pointer icon-date"></span>
          </label>
          <%-- 比較子 選択 --%>
          <html:select name="<%=name %>" property="<%=String.format(\"%scomp.selected\", suffix)%>" styleClass="">
            <html:optionsCollection name="<%=name %>" property="<%=String.format(\"%scomp.allList\", suffix)%>"/>
          </html:select>

        </logic:equal>
        <%-- 時間 --%>
        <logic:equal value="<%=EnumFormModelKbn.time.name()%>" name="formKbn">
          <span class="no_w"><gsmsg:write key="rng.rng090.62"/></span>
          <span class="mr3"></span>
            <logic:notEmpty name="<%=name %>" property="<%=String.format(\"%sformValue\", suffix)%>">
              <bean:define id="formValue" name="<%=name %>" property="<%=String.format(\"%sformValue[0]\", suffix)%>" type="String"/>
            </logic:notEmpty>
            <label class="display_inline">
              <html:text name="<%=name %>" property="<%=String.format(\"%sformValue\", suffix)%>"  value="<%=formValue %>" styleClass="clockpicker js_clockpicker" ></html:text>
              <span class="picker-acs cursor_pointer icon-clock"></span>
            </label>
            <%-- 比較子 選択 --%>
            <html:select name="<%=name %>" property="<%=String.format(\"%scomp.selected\", suffix)%>" styleClass="">
              <html:optionsCollection name="<%=name %>" property="<%=String.format(\"%scomp.allList\", suffix)%>"/>
            </html:select>

        </logic:equal>
        <%-- ラジオ --%>
        <logic:equal value="<%=EnumFormModelKbn.radio.name()%>" name="formKbn">
          <span class="no_w"><gsmsg:write key="rng.rng090.62"/></span>
          <span class="mr3"></span>
          <div class="mt5 mb5 w100">
            <bean:define id="formID" name="<%=name %>" property="<%=String.format(\"%sformId.selected\", suffix)%>" type="String" />
            <bean:define id="fb" name="<%=name %>" property="rng090template" type="FormBuilder" />
            <logic:iterate id="cellEntry" name="fb" property="formMap" type="Entry">
              <logic:equal name="cellEntry" property="value.formID" value="<%=formID%>">
                <% jspContext.setAttribute("radio", ((FormCell)cellEntry.getValue()).getBody()); %>
                <logic:iterate id="listChild" name="radio" property="list" type="String"><!--
              --><label class="verAlignMid mr10">
                   <html:multibox value="<%=listChild %>" name="<%=name %>" property="<%=String.format(\"%sformValue\", suffix)%>" /><bean:write name="listChild"/>
                </label><!--
            --></logic:iterate>
              </logic:equal>
            </logic:iterate>
          </div>
          <%-- 比較子 選択 --%>
          <html:select name="<%=name %>" property="<%=String.format(\"%scomp.selected\", suffix)%>" styleClass="">
            <html:optionsCollection name="<%=name %>" property="<%=String.format(\"%scomp.allList\", suffix)%>"/>
          </html:select>

        </logic:equal>
        <%-- チェック --%>
        <logic:equal value="<%=EnumFormModelKbn.check.name()%>" name="formKbn">
          <span class="no_w"><gsmsg:write key="rng.rng090.62"/></span>
          <span class="mr3"></span>
          <div class="mt5 mb5 w100">
            <bean:define id="formID" name="<%=name %>" property="<%=String.format(\"%sformId.selected\", suffix)%>" type="String" />
            <bean:define id="fb" name="<%=name %>" property="rng090template" type="FormBuilder" />
            <logic:iterate id="cellEntry" name="fb" property="formMap" type="Entry">
              <logic:equal name="cellEntry" property="value.formID" value="<%=formID %>">
                <% jspContext.setAttribute("check", ((FormCell)cellEntry.getValue()).getBody()); %>
                <logic:iterate id="listChild" name="check" property="list" type="String"><!--
              --><label class="verAlignMid mr10">
                   <html:multibox value="<%=listChild %>" name="<%=name %>" property="<%=String.format(\"%sformValue\", suffix)%>" /><bean:write name="listChild"/>
                </label><!--
            --></logic:iterate>
              </logic:equal>
            </logic:iterate>
          </div>
          <%-- 比較子 選択 --%>
          <html:select name="<%=name %>" property="<%=String.format(\"%scomp.selected\", suffix)%>" styleClass="">
            <html:optionsCollection name="<%=name %>" property="<%=String.format(\"%scomp.allList\", suffix)%>"/>
          </html:select>

        </logic:equal>
        <%-- コンボ --%>
        <logic:equal value="<%=EnumFormModelKbn.combo.name()%>" name="formKbn">
          <span class="no_w"><gsmsg:write key="rng.rng090.62"/></span>
          <span class="mr3"></span>
          <div class="mt5 mb5 w100">
            <bean:define id="formID" name="<%=name %>" property="<%=String.format(\"%sformId.selected\", suffix)%>" type="String" />
            <bean:define id="fb" name="<%=name %>" property="rng090template" type="FormBuilder" />
            <logic:iterate id="cellEntry" name="fb" property="formMap" type="Entry">
              <logic:equal name="cellEntry" property="value.formID" value="<%=formID %>">
                <% jspContext.setAttribute("combo", ((FormCell)cellEntry.getValue()).getBody()); %>
                <logic:iterate id="listChild" name="combo" property="list" type="String"><!--
              --><label class="verAlignMid mr10">
                   <html:multibox value="<%=listChild %>" name="<%=name %>" property="<%=String.format(\"%sformValue\", suffix)%>" /><bean:write name="listChild"/>
                </label><!--
            --></logic:iterate>
              </logic:equal>
            </logic:iterate>
          </div>
          <%-- 比較子 選択 --%>
          <html:select name="<%=name %>" property="<%=String.format(\"%scomp.selected\", suffix)%>" styleClass="">
            <html:optionsCollection name="<%=name %>" property="<%=String.format(\"%scomp.allList\", suffix)%>"/>
          </html:select>
        </logic:equal>

        <%-- ユーザ --%>
        <logic:equal value="<%=EnumFormModelKbn.user.name()%>" name="formKbn">
          <span class="no_w"><gsmsg:write key="rng.rng090.62"/></span>
          <span class="mr5"></span>
          <div class="mt3"></div>
          <div class="">
            <gsform:usrgrpselect name="<%=name %>" property="<%=String.format(\"%sformValueUsr\", suffix)%>" onchange="$(this).subform();"/>
          </div>
          <%-- 比較子 選択 --%>
          <html:select name="<%=name %>" property="<%=String.format(\"%scomp.selected\", suffix)%>" styleClass="">
            <html:optionsCollection name="<%=name %>" property="<%=String.format(\"%scomp.allList\", suffix)%>"/>
          </html:select>
        </logic:equal>
        <%-- グループ --%>
        <logic:equal value="<%=EnumFormModelKbn.group.name()%>" name="formKbn">
          <span class="no_w"><gsmsg:write key="rng.rng090.62"/></span>
          <span class="mr5"></span>
          <div class="mt3"></div>
          <div class="">
            <%-- TODO グループ選択UI使用するよう 要修正  --%>
            <%--
            <gsform:multiselect name="<%=name %>" property="<%=String.format(\"%sformValueGrp\", suffix)%>" onchange="$(this).subform();"/>
             --%>
          </div>
          <%-- 比較子 選択 --%>
          <html:select name="<%=name %>" property="<%=String.format(\"%scomp.selected\", suffix)%>" styleClass="">
            <html:optionsCollection name="<%=name %>" property="<%=String.format(\"%scomp.allList\", suffix)%>"/>
          </html:select>
        </logic:equal>
      </div>

    </logic:notEmpty>
  </div>
</div>



