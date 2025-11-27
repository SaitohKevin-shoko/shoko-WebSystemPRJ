<%@tag import="jp.groupsession.v2.cmn.formmodel.TimeBox"%>
<%@tag import="jp.groupsession.v2.cmn.GSConstCommon"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Calc"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Sum"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.SimpleUserSelect"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.UserGroupSelectModel"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.GroupComboModel"%>
<%@tag import="org.apache.commons.lang.ArrayUtils"%>
<%@tag import="jp.co.sjts.util.date.UDate"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.ComboBox"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.DateBox"%>
<%@tag import="jp.co.sjts.util.NullDefault"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Comment"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.CheckBox"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.RadioButton"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.NumberBox"%>
<%@tag import="jp.co.sjts.util.StringUtil"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Textarea"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Textbox"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.BlockList"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Block"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Temp"%>
<%@tag import="jp.co.sjts.util.json.JSONObject"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.TextInput"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.EnumFormModelKbn"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.FormCell"%>
<%@tag import="org.apache.struts.util.LabelValueBean"%>
<%@ tag pageEncoding="utf-8" description="Form要素をInput画面での描画処理を行う"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/formbuilder" prefix="fb" %>
<%@ taglib tagdir="/WEB-INF/tags/gsform" prefix="gsform" %>
<%@ taglib tagdir="/WEB-INF/tags/ui" prefix="ui" %>

<%@ attribute description="FormCell" name="bean" type="FormCell" required="true" %>
<%@ attribute description="フォーム名" name="name" required="true" %>
<%@ attribute description="プロパティ名 FormInputBuilder" name="property" type="String" required="true" %>
<%@ attribute description="行番号" name="rowNo" type="Integer" required="true" %>
<%@ attribute description="確認モード" name="kakuninMode" type="java.lang.String" %>
<%@ attribute description="モバイルモード" name="mhMode" type="java.lang.String" %>
<%@ attribute description="フォーム直下フラグ" name="formJust" type="Integer" required="true" %>
<%@ attribute description="プラグインID" name="pluginId" type="java.lang.String" %>

<% String typeName = bean.getType().toString(); %>
<% String contentName; %>
<% contentName = property + ".form(" + bean.getSid() + "_" + rowNo  + "_" + typeName + ")"; %>
<%
  if (
     (bean.getType() == EnumFormModelKbn.user
      && ((SimpleUserSelect) bean.getBody()).getMultiFlg() == UserGroupSelectModel.FLG_MULTI_ON)
      || (bean.getType() == EnumFormModelKbn.group
      && ((GroupComboModel) bean.getBody()).getMultiFlg() == UserGroupSelectModel.FLG_MULTI_ON)
     ) {
    typeName += " multisel colspan";
  }
%>

<% String reloadEv = "buttonPush('reload');"; %>

<html:hidden name="<%=name %>" property="<%=contentName + \".blockIdx\" %>" />

<%--再描画時に各要素へのスクロール処理を実行させる --%>
<logic:notEqual name="mhMode" value="0">
  <script>
    $(function() {
      <%=bean.getBody().outputDoScrollYSclipt()%>
    })
  </script>
</logic:notEqual>

<!-- タイトル -->
<bean:define id="titleflg" value="0"/>
<logic:equal name="bean" property="type" value="label">
  <% int notitle =((Comment) bean.getBody()).getNotitle();%>
  <% if (notitle == 1) { %>
    <bean:define id="titleflg" value="1"/>
  <% }%>
</logic:equal>

<bean:define id="flg" value="0"/>
<logic:equal name="bean" property="type" value="label">
  <logic:equal name="formJust" value="1">
    <% int valign =((Comment) bean.getBody()).getValign();%>
    <% if (valign == 1) { %>
      <bean:define id="flg" value="1"/>
      <div class="formBlock sitayose <%=typeName%>"  >
    <% } else {%>
      <bean:define id="flg" value="1"/>
      <div class="formBlock ueyose <%=typeName%>"  >
    <% }%>
  </logic:equal>
</logic:equal>

<logic:equal name="flg" value="0">
  <div class="formBlock <%=typeName%> w100">
</logic:equal>

<logic:equal name="titleflg" value="0">
  <div class="form_title verAlignMid <%=typeName%>">
    <logic:notEmpty name="bean" property="title" >
      <div class="form_title_str fw_b <%=typeName%>">
        <logic:notEmpty name="mhMode">■</logic:notEmpty>
        <bean:write name="bean" property="title"  />
        <logic:empty name="kakuninMode">
        <% if (bean.getRequire() == 1) { %>
          <span class="cl_fontWarn">
            <gsmsg:write key="cmn.comments" />
          </span>
        <% } %>
        </logic:empty>
      </div>
    </logic:notEmpty>

    <logic:empty name="bean" property="title" >
      <div class="form_title_str fw_b <%=typeName%>">
        <logic:empty name="kakuninMode">
          <% if (bean.getRequire() == 1) { %>
            <span class="cl_fontWarn">
              <gsmsg:write key="cmn.comments" />
            </span>
          <% } %>
        </logic:empty>
      </div>
    </logic:empty>
  </div>
</logic:equal>

<div class="formContent bgC_body <%=typeName%>">
  <logic:equal name="bean" property="type" value="label">
    <%= ((Comment) bean.getBody()).dspValueHTML()%>
  </logic:equal >
  <!-- テキスト -->
  <logic:equal name="bean" property="type" value="textbox">
    <logic:empty name="kakuninMode">
      <logic:empty name="mhMode" >
        <html:text styleClass="w100" name="<%=name%>" property="<%=contentName + \".value\" %>" value="<%=((Textbox) bean.getBody()).getValue()%>" maxlength="<%=((Textbox) bean.getBody()).getMaxlength()%>"></html:text>
        <fb:valueChangeEvInput bean="<%=bean %>" contentName="<%=contentName %>"></fb:valueChangeEvInput>
      </logic:empty>
      <logic:equal name="mhMode"  value="0">
        <html:text styleClass="w100" name="<%=name%>" property="<%=contentName + \".value\" %>" value="<%=((Textbox) bean.getBody()).getValue()%>" maxlength="<%=((Textbox) bean.getBody()).getMaxlength()%>" ></html:text>
      </logic:equal>
      <logic:equal name="mhMode"  value="1">
        <html:text styleClass="w100" name="<%=name%>" property="<%=contentName + \".value\" %>" value="<%=((Textbox) bean.getBody()).getValue()%>" maxlength="<%=((Textbox) bean.getBody()).getMaxlength()%>" ></html:text>
        <fb:valueChangeEvInput bean="<%=bean %>" contentName="<%=contentName %>"></fb:valueChangeEvInput>
      </logic:equal>
    </logic:empty>
    <logic:notEmpty name="kakuninMode">
      <html:hidden property="<%=contentName + \".value\" %>" value="<%=((Textbox) bean.getBody()).getValue() %>"/>
      <bean:write  name="bean" property="body.value" />
    </logic:notEmpty>
  </logic:equal >
  <!-- テキストエリア -->
  <logic:equal name="bean" property="type" value="textarea">
    <logic:empty name="kakuninMode">
      <logic:empty name="mhMode" >
        <% if (StringUtil.isNullZeroString(((Textarea) bean.getBody()).getMaxlength())) { %>
          <html:textarea styleClass="w100" name="<%=name%>" property="<%=contentName  + \".value\" %>" rows="10" ><%= ((Textarea) bean.getBody()).getValue()%></html:textarea>
        <% } else { %>
          <html:textarea styleClass="w100" name="<%=name%>" property="<%=contentName + \".value\" %>" onkeyup="<%=\"showLengthId(this,\" + ((Textarea) bean.getBody()).getMaxlength() + \", '\" + contentName + \".count');\" %>" rows="10" ><%= ((Textarea) bean.getBody()).getValue()%></html:textarea>
          <br>
          <span class="formCounter"><gsmsg:write key="cmn.current.characters" />:</span> <span class="formCounter" id="<%=contentName + ".count"%>">0</span>&nbsp;<span class="formCounter_max">/&nbsp;<%=((Textarea) bean.getBody()).getMaxlength() %>&nbsp;<gsmsg:write key="cmn.character" /></span>
        <% } %>
        <fb:valueChangeEvInput bean="<%=bean %>" contentName="<%=contentName %>"></fb:valueChangeEvInput>
      </logic:empty>
      <logic:equal name="mhMode"  value="0">
        <html:textarea styleClass="w100" name="<%=name%>" property="<%=contentName  + \".value\" %>" rows="3" cols="16" ><%= ((Textarea) bean.getBody()).getValue()%></html:textarea>
      </logic:equal>
      <logic:equal name="mhMode"  value="1">
        <html:textarea styleClass="w100" name="<%=name%>" property="<%=contentName  + \".value\" %>" onkeyup="<%=\"showLengthId(this,\" + ((Textarea) bean.getBody()).getMaxlength() + \", '\" + contentName + \".count');\" %>" rows="3" cols="16" ><%= ((Textarea) bean.getBody()).getValue()%></html:textarea>
        <br>
        <span class="formCounter"><gsmsg:write key="cmn.current.characters" />:</span><span class="formCounter" id="<%=contentName + ".count"%>">0</span>&nbsp;<span class="formCounter_max">/&nbsp;<%=((Textarea) bean.getBody()).getMaxlength() %>&nbsp;<gsmsg:write key="cmn.character" /></span>
        <fb:valueChangeEvInput bean="<%=bean %>" contentName="<%=contentName %>"></fb:valueChangeEvInput>
      </logic:equal>
    </logic:empty>
    <logic:notEmpty name="kakuninMode">
      <html:hidden property="<%=contentName + \".value\" %>" value="<%=((Textarea) bean.getBody()).getValue() %>"/>
      <%= ((Textarea) bean.getBody()).dspValueHTML()%>
    </logic:notEmpty>
  </logic:equal>
  <!-- 日付 -->
  <logic:equal name="bean" property="type" value="date">
    <logic:empty name="kakuninMode">
      <logic:equal name="mhMode"  value="0" >
        <html:select name="<%=name%>"  property="<%=contentName + \".yearMbh\"%>">
          <logic:notEmpty name="<%=name%>"  property="<%=contentName + \".yearLavel\"%>">
            <html:optionsCollection name="<%=name%>"  property="<%=contentName + \".yearLavel\"%>" label="label" value="value"/>
          </logic:notEmpty>
        </html:select>
        <html:select name="<%=name%>"  property="<%=contentName + \".monthMbh\"%>">
          <logic:notEmpty name="<%=name%>"  property="<%=contentName + \".monthLavel\"%>">
            <html:optionsCollection name="<%=name%>"  property="<%=contentName + \".monthLavel\"%>" label="label" value="value"/>
          </logic:notEmpty>
        </html:select>
        <html:select name="<%=name%>"  property="<%=contentName + \".dayMbh\"%>">
          <logic:notEmpty name="<%=name%>"  property="<%=contentName + \".dayLavel\"%>">
            <html:optionsCollection name="<%=name%>"  property="<%=contentName + \".dayLavel\"%>" label="label" value="value"/>
          </logic:notEmpty>
        </html:select>
      </logic:equal>
      <logic:notEqual name="mhMode" value="0">
        <bean:define id="hiduke_NameValue" value="<%=contentName + \".value\" %>" />
        <span class="verAlignMid">
          <html:text name="<%=name%>" property="<%=hiduke_NameValue %>"  size="10" value="<%=((DateBox) bean.getBody()).getValue()%>" styleClass="txt_c wp95 datepicker js_frDatePicker"/>
          <span class="picker-acs icon-date display_flex cursor_pointer iconKikanStart"></span>
        </span>
        <fb:valueChangeEvInput bean="<%=bean %>" contentName="<%=contentName %>"></fb:valueChangeEvInput>
      </logic:notEqual>
    </logic:empty>
    <logic:notEmpty name="kakuninMode">
      <html:hidden property="<%=contentName + \".value\" %>" value="<%=((DateBox) bean.getBody()).getValue() %>"/>
      <logic:notEmpty name="bean" property="body.value">
        <% UDate udate = ((DateBox) bean.getBody()).dspUDate(); %>
        <gsmsg:write key="cmn.date6" arg0="<%=String.valueOf(udate.getYear()) %>" arg1="<%=String.valueOf(udate.getMonth()) %>"  arg2="<%=String.valueOf(udate.getIntDay()) %>"/>
      </logic:notEmpty>
    </logic:notEmpty>
  </logic:equal >
  <!-- 時間 -->
  <logic:equal name="bean" property="type" value="time">
    <logic:empty name="kakuninMode">
      <bean:define id="time_NameValue" value="<%=contentName + \".value\" %>" />
      <logic:empty name="mhMode" >
        <label class="display_flex">
            <input type="text" name="<%=time_NameValue %>"  value="<%=((TimeBox) bean.getBody()).getValue()%>" size="5" id="<%= "clockPicker" + bean.getSid() + "_" + rowNo %>" class="wp150 clockpicker js_clockpicker"  autocomplete="off" />
            <span class="picker-acs cursor_pointer icon-clock"></span>
        </label>
      </logic:empty>
      <logic:equal name="mhMode" value="0">
         <html:select name="<%=name%>"  property="<%=contentName + \".hourMbh\"%>">
             <html:options name="<%=name%>"  property="<%=contentName + \".hours\"%>" />
         </html:select>
         <gsmsg:write key="cmn.hour.input" />
         <html:select name="<%=name%>"  property="<%=contentName + \".minuteMbh\"%>">
             <html:options name="<%=name%>"  property="<%=contentName + \".minutes\"%>" />
         </html:select>
         <gsmsg:write key="cmn.minute.input" />
      </logic:equal>
      <logic:equal name="mhMode" value="1">
      <div data-role="navbar" align="center">
        <ul>
            <li>
                <html:select name="<%=name%>"  property="<%=contentName + \".hourMbh\"%>">
                    <html:options name="<%=name%>"  property="<%=contentName + \".hours\"%>" />
                </html:select>
                <gsmsg:write key="cmn.hour.input" />
            </li>
            <li>
                <html:select name="<%=name%>"  property="<%=contentName + \".minuteMbh\"%>">
                    <html:options name="<%=name%>"  property="<%=contentName + \".minutes\"%>" />
                </html:select>
                <gsmsg:write key="cmn.minute.input" />
            </li>
        </ul>
      </div>
      </logic:equal>

      <fb:valueChangeEvInput bean="<%=bean %>" contentName="<%=contentName %>"></fb:valueChangeEvInput>
    </logic:empty>
    <logic:notEmpty name="kakuninMode">
      <html:hidden property="<%=contentName + \".value\" %>" value="<%=((TimeBox) bean.getBody()).getValue() %>"/>
      <bean:write  name="bean" property="body.value" />
    </logic:notEmpty>
  </logic:equal >
  <!-- 数値 -->
  <logic:equal name="bean" property="type" value="number">
    <logic:empty name="kakuninMode">
      <logic:empty name="mhMode" >
        <bean:define id="maxwidth" value="" />
        <logic:notEmpty name="<%=name%>"  property="<%=contentName + \".tanni\" %>">
          <bean:define id="maxwidth" value="mw80" />
        </logic:notEmpty>
        <logic:lessThan value="13" name="bean" property="body.maxlength">
          <html:text name="<%=name%>"  property="<%=contentName + \".value\" %>" value="<%=((NumberBox) bean.getBody()).getValue()%>" maxlength="<%=((NumberBox) bean.getBody()).getMaxlength()%>"  size="<%=((NumberBox) bean.getBody()).getMaxlength()%>" ></html:text>
          <fb:valueChangeEvInput bean="<%=bean %>" contentName="<%=contentName %>"></fb:valueChangeEvInput>
          <bean:write name="<%=name%>"  property="<%=contentName + \".tanni\" %>" />
        </logic:lessThan>
        <logic:greaterEqual value="13" name="bean" property="body.maxlength">
          <html:text name="<%=name%>"  property="<%=contentName + \".value\" %>" value="<%=((NumberBox) bean.getBody()).getValue()%>" maxlength="<%=((NumberBox) bean.getBody()).getMaxlength()%>" styleClass="<%=\"w100 \" + maxwidth%>" ></html:text>
          <fb:valueChangeEvInput bean="<%=bean %>" contentName="<%=contentName %>"></fb:valueChangeEvInput>
          <bean:write name="<%=name%>"  property="<%=contentName + \".tanni\" %>" />
        </logic:greaterEqual>
      </logic:empty>
      <logic:equal name="mhMode"  value="0">
        <html:text name="<%=name%>" property="<%=contentName + \".value\" %>" value="<%=((NumberBox) bean.getBody()).getValue()%>" maxlength="<%=((NumberBox) bean.getBody()).getMaxlength()%>"></html:text>
        <bean:write name="<%=name%>"  property="<%=contentName + \".tanni\" %>" />
      </logic:equal>
      <logic:equal name="mhMode"  value="1">
        <html:text name="<%=name%>" property="<%=contentName + \".value\" %>" value="<%=((NumberBox) bean.getBody()).getValue()%>" maxlength="<%=((NumberBox) bean.getBody()).getMaxlength()%>"></html:text>
        <fb:valueChangeEvInput bean="<%=bean %>" contentName="<%=contentName %>"></fb:valueChangeEvInput>
        <bean:write name="<%=name%>"  property="<%=contentName + \".tanni\" %>" />
      </logic:equal>
    </logic:empty>
    <logic:notEmpty name="kakuninMode">
      <html:hidden property="<%=contentName + \".value\" %>" value="<%=((NumberBox) bean.getBody()).getValue() %>"/>
      <%= ((NumberBox) bean.getBody()).dspValueHTML()%>
      <bean:write name="<%=name%>"  property="<%=contentName + \".tanni\" %>" />
    </logic:notEmpty>
  </logic:equal >
  <!-- ラジオ -->
  <logic:equal name="bean" property="type" value="radio">
    <html:hidden property="<%=contentName + \".init\" %>" value="0" />
    <logic:empty name="kakuninMode">
      <bean:define id="dspSpFlg" value="0" />
      <logic:equal name="mhMode"  value="1">
        <bean:define id="dspSpFlg" value="1" />
      </logic:equal>
      <logic:equal name="dspSpFlg"  value="0">
        <% for (int i = 0; i < ((RadioButton) bean.getBody()).getList().size(); i++) { %>
        <%   String sel = ((RadioButton) bean.getBody()).getList().get(i); %>
        <div class="verAlignMid mr10">
          <html:radio name="<%=name %>"  property="<%=contentName + \".selected\" %>" value="<%=sel%>" styleId="<%=contentName + \"_\" + i %>"></html:radio>
          <label class="ml5" for="<%=contentName + "_" + i %>" ><bean:write name="bean" property="<%=\"body.list[\" + i + \"]\" %>"/></label>
        </div>
        <% } %>
      </logic:equal>
      <logic:equal name="dspSpFlg"  value="1">
        <fieldset data-role="controlgroup" data-mini="true">
          <% for (int i = 0; i < ((RadioButton) bean.getBody()).getList().size(); i++) { %>
          <%   String sel = ((RadioButton) bean.getBody()).getList().get(i); %>
          <div>
            <div class="verAlignMid">
              <input type="radio" id="<%=contentName + "_" + i %>" name="<%=contentName + ".selected" %>"
                <logic:equal name="formJust" value="1">
                  value="<%=sel%>" data-theme="d" data-dividertheme="c"
                </logic:equal>
                <logic:notEqual name="formJust" value="1">
                  value="<%=sel%>" data-theme="b" data-dividertheme="c"
                </logic:notEqual>
                <% if (sel.equals(((RadioButton) bean.getBody()).getSelected())) { %>
                  checked
                <% }%>
              />
              <label class="ml5" for="<%=contentName + "_" + i %>" ><bean:write name="bean" property="<%=\"body.list[\" + i + \"]\" %>"/></label>
            </div>
          </div>
          <% } %>
        </fieldset>
      </logic:equal>
      <fb:valueChangeEvRadio bean="<%=bean %>" contentName="<%=contentName %>"></fb:valueChangeEvRadio>
    </logic:empty>
    <logic:notEmpty name="kakuninMode">
      <html:hidden property="<%=contentName + \".selected\" %>" value="<%=((RadioButton) bean.getBody()).getSelected() %>" />
      <bean:write name="bean" property="body.selected" />
    </logic:notEmpty>
  </logic:equal >
  <!-- コンボ -->
  <logic:equal name="bean" property="type" value="combo">
    <logic:empty name="kakuninMode">
      <select name="<%=contentName + ".selected" %>" class="w100">
        <logic:iterate id="sel" name="bean" property="body.list" type="String">
          <% String selected = ((ComboBox) bean.getBody()).getSelected(); %>
          <% if (selected == null) { selected = "0"; } %>
          <logic:equal value="<%=selected%>" name="sel">
            <option value="<bean:write name="sel" />" selected="selected"><bean:write name="sel" /></option>
          </logic:equal>
          <logic:notEqual value="<%=selected%>" name="sel">
            <option value="<bean:write name="sel" />"><bean:write name="sel" /></option>
          </logic:notEqual>
        </logic:iterate>
      </select>
      <fb:valueChangeEvCombo bean="<%=bean %>" contentName="<%=contentName %>"></fb:valueChangeEvCombo>
    </logic:empty>
    <logic:notEmpty name="kakuninMode">
      <html:hidden property="<%=contentName + \".selected\" %>" value="<%=((ComboBox) bean.getBody()).getSelected() %>" />
      <bean:write name="bean" property="body.selected" />
    </logic:notEmpty>
  </logic:equal >
  <!-- チェックボックス -->
  <logic:equal name="bean" property="type" value="check">
    <html:hidden property="<%=contentName + \".init\" %>" value="0" />
    <logic:empty name="kakuninMode">
      <bean:define id="dspSpFlg" value="0" />
      <logic:equal name="mhMode"  value="1">
        <bean:define id="dspSpFlg" value="1" />
      </logic:equal>
      <logic:equal name="dspSpFlg"  value="0">
        <% String[] selected = ((CheckBox) bean.getBody()).getSelected(); %>
        <% for (int i = 0; i < ((CheckBox) bean.getBody()).getList().size(); i++) { %>
        <%   String sel = ((CheckBox) bean.getBody()).getList().get(i); %>
          <div class="verAlignMid mr10">
            <html:multibox name="<%=name %>"  property="<%=contentName + \".selected\" %>" value="<%=sel%>" styleId="<%=contentName + \"_\" + i %>"></html:multibox>
            <label class="ml5" for="<%=contentName + "_" + i %>"><bean:write name="bean" property="<%=\"body.list[\" + i+ \"]\" %>"/></label>
          </div>
        <% } %>
      </logic:equal>
      <logic:equal name="dspSpFlg"  value="1">
        <fieldset data-role="controlgroup" data-mini="true">
          <% for (int i = 0; i < ((CheckBox) bean.getBody()).getList().size(); i++) { %>
          <%   String sel = ((CheckBox) bean.getBody()).getList().get(i); %>
          <div>
            <div class="verAlignMid">
              <input type="checkbox" id="<%=contentName + "_" + i %>" name="<%=contentName + ".selected" %>"
                <logic:equal name="formJust" value="1">
                  value="<%=sel%>" data-theme="d" data-dividertheme="c"
                </logic:equal>
                <logic:notEqual name="formJust" value="1">
                  value="<%=sel%>" data-theme="b" data-dividertheme="c"
                </logic:notEqual>
                <% if (ArrayUtils.contains(((CheckBox) bean.getBody()).getSelected(), sel)) { %>
                  checked
                <% }%>
              />
              <label class="ml5" for="<%=contentName + "_" + i %>" ><bean:write name="bean" property="<%=\"body.list[\" + i + \"]\" %>"/></label>
            </div>
          </div>
          <% } %>
        </fieldset>
      </logic:equal>

    </logic:empty>
    <logic:notEmpty name="kakuninMode">
      <% String[] selected = ((CheckBox) bean.getBody()).getSelected(); %>
      <% for (int i = 0; i < ((CheckBox) bean.getBody()).getList().size(); i++) { %>
      <%   String sel = ((CheckBox) bean.getBody()).getList().get(i); %>
      <%   if (ArrayUtils.contains(selected, sel)) { %>
        <div>
          <html:hidden property="<%=contentName + \".selected\" %>" value="<%=sel %>" />
          <bean:write name="bean" property="<%=\"body.list[\" + i+ \"]\" %>"/>
        </div>
      <%   } %>
      <% } %>
    </logic:notEmpty>
  </logic:equal >
  <!-- 計算 合計 -->
  <logic:equal name="bean" property="type" value="sum">
    <%= ((Sum) bean.getBody()).dspValueHTML()%>
    <bean:write name="bean"  property="body.tanni" />
  </logic:equal >
  <!-- 計算 その他 -->
  <logic:equal name="bean" property="type" value="calc">
    <%= ((Calc) bean.getBody()).dspValueHTML()%>
    <bean:write name="bean"  property="body.tanni" />
  </logic:equal >
  <!-- ユーザ -->
  <logic:equal name="bean" property="type" value="user">
    <html:hidden property="<%=contentName + \".init\" %>" value="0" />

    <logic:empty name="mhMode">
      <gsform:usrgrpselect name="<%=name%>" property="<%=contentName + \".usergrpselect\" %>"  kakunin="<%=kakuninMode %>"></gsform:usrgrpselect>
    </logic:empty>
  </logic:equal >
  <!-- グループ -->
  <logic:equal name="bean" property="type" value="group">
    <html:hidden property="<%=contentName + \".init\" %>" value="0" />
    <logic:empty name="mhMode">
      <gsform:grpselect name="<%=name%>" property="<%=contentName %>"  kakuninMode="<%=kakuninMode %>" ></gsform:grpselect>
    </logic:empty>
  </logic:equal >
  <!-- 添付 -->
  <logic:equal name="bean" property="type" value="file">
  <bean:define id="tempBody" name="bean" property="body" type="Temp"></bean:define>

  <bean:define id="subDirPath" value=""></bean:define>
  <logic:iterate id="dirPath" name="tempBody" property="tempPath.subDir">
    <bean:define id="subDirPath" ><bean:write name="subDirPath" /><bean:write name="dirPath" />/</bean:define>
  </logic:iterate>
    <html:hidden property="<%=contentName + \".init\" %>" value="0" />
    <logic:empty name="kakuninMode" >
      <logic:empty name="mhMode">
        <gsform:file_opnTempButton bean="<%=((Temp) bean.getBody())%>" selectListName="<%=contentName +\".files\" %>"></gsform:file_opnTempButton>
        <logic:equal name="rowNo" value="0">
          <logic:notEmpty name="<%=name %>" property="<%=contentName + \".sampleList\" %>">
            <logic:iterate id="templateFileData" name="<%=name %>" property="<%=contentName + \".sampleList\" %>" type="LabelValueBean" >
              <logic:notEmpty name="<%=name %>" property="<%=contentName + \".downloadUrl\" %>">
                <% String downloadUrl = ((Temp) bean.getBody()).getBinDownloadUrl(templateFileData.getValue(), null);

                  //ファイルサイズ情報を除去
                  String fName = templateFileData.getLabel();
                  if (fName.lastIndexOf('(') > 0) {
                    fName = fName.substring(0, fName.lastIndexOf('('));
                  }
                 %>
                <file-preview url="<%=downloadUrl %>" filename="<%=fName %>">
                  <div>
                    <div class="verAlignMid">
                      <img class="btn_classicImg-display" src="../common/images/classic/icon_temp_file_2.png" alt="<gsmsg:write key="cmn.attached" />">
                      <img class="btn_originalImg-display" src="../common/images/original/icon_attach.png" alt="<gsmsg:write key="cmn.attached" />">
                      <a href="<%=downloadUrl %>" class="ml5">
                        <span class="cl_linkDef">
                          <bean:write name="templateFileData"  property="label" />
                        </span>
                      </a>
                    </div>
                  </div>
                </file-preview>
              </logic:notEmpty>
            </logic:iterate>
          </logic:notEmpty>
        </logic:equal>
      </logic:empty>
      <logic:notEmpty name="mhMode" >
        <bean:define id="nonsample" value=""/>
        <logic:notEqual name="rowNo" value="0">
          <bean:define id="nonsample" value="nonsample"/>
        </logic:notEqual>
        <gsform:mbh_filetemp name="<%=name %>" property="<%=contentName %>" bean="<%=(Temp) bean.getBody() %>"
                nonsample="<%=nonsample %>" mhMode="<%=mhMode %>"></gsform:mbh_filetemp>
      </logic:notEmpty>
    </logic:empty>
    <logic:notEmpty name="kakuninMode" >
      <logic:empty name="mhMode">
        <logic:notEmpty name="<%=name %>" property="<%=contentName + \".fileList\" %>" scope="request">
          <logic:iterate id="fileMdl" name="<%=name %>" property="<%=contentName + \".fileList\" %>" type="LabelValueBean" scope="request" indexId="idx">
            <%
              String downloadUrl = ((Temp) bean.getBody()).getBinDownloadUrl(fileMdl.getValue(), subDirPath);
              if (downloadUrl == null || downloadUrl.length() == 0) {
                downloadUrl = "#!"; // 遷移なし
              }

              //ファイルサイズ情報を除去
              String fName = fileMdl.getLabel();
              if (fName.lastIndexOf('(') > 0) {
                fName = fName.substring(0, fName.lastIndexOf('('));
              }

            %>
            <file-preview url="<%=downloadUrl %>" filename="<%=fName %>">
              <div class="form_tempfile_dsp" >
                <img class="btn_classicImg-display" src="../common/images/classic/icon_temp_file_2.png" alt="<gsmsg:write key="cmn.file" />">
                <img class="btn_originalImg-display" src="../common/images/original/icon_attach.png" alt="<gsmsg:write key="cmn.file" />">
                <a href="<%=downloadUrl %>" >
                  <span class="cl_linkDef">
                    <bean:write name="fileMdl" property="label" />
                  </span>
                </a>
                <br>
              </div>
            </file-preview>
          </logic:iterate>
        </logic:notEmpty>
      </logic:empty>
      <logic:notEmpty name="mhMode">
        <gsform:mbh_filetemp name="<%=name %>" property="<%=contentName %>" bean="<%=(Temp) bean.getBody() %>"
                kakunin="<%=kakuninMode %>"  mhMode="<%=mhMode %>"></gsform:mbh_filetemp>
      </logic:notEmpty>
    </logic:notEmpty>
  </logic:equal >
  <!-- ブロック -->
  <logic:equal name="bean" property="type" value="block">
    <logic:equal name="mhMode"  value="1">
      <ul data-role="listview" data-inset="true" data-theme="d" data-dividertheme="c">
      <li data-role="list-divider" data-theme="c">
    </logic:equal>
    <logic:equal name="mhMode"  value="0">
      <div class="pl10">
    </logic:equal>
    <fb:formTableInput name="<%=name %>" property="<%=property %>"  rowNo="0"
        block="<%=(Block) bean.getBody() %>" kakuninMode="<%=kakuninMode %>" mhMode="<%=mhMode %>" formJust="0" />
    <logic:equal name="mhMode"  value="1">
      </li>
      </ul>
    </logic:equal>
    <logic:equal name="mhMode"  value="0">
      </div>
    </logic:equal>
  </logic:equal >
  <!-- 表 -->
  <logic:equal name="bean" property="type" value="blocklist">
    <bean:define id="drawBody" value=""/>
    <div>
      <html:hidden name="<%=name %>" property="<%=contentName + \".mstBlockIdx\" %>" />
      <html:hidden name="<%=name %>" property="<%=contentName + \".length\" %>" />
      <logic:equal name="mhMode"  value="1">
        <ul data-role="listview" data-inset="true" data-theme="d" data-dividertheme="c">
      </logic:equal>
      <% if (((Block)((BlockList) bean.getBody()).getHeader()).getFormTable().size() > 0) { %>
      <logic:equal name="mhMode"  value="1">
        <li data-role="list-divider" data-theme="c">
      </logic:equal>
      <logic:equal name="mhMode"  value="0">
        <div class="pl10">
      </logic:equal>
      <div class="blocklist_header">
        <fb:formTableInput name="<%=name %>"  property="<%=property %>" rowNo="0"
                           block="<%=(Block)((BlockList) bean.getBody()).getHeader() %>" kakuninMode="<%=kakuninMode %>"  mhMode="<%=mhMode %>"  formJust="0" />
      </div>
      <logic:equal name="mhMode" value="1">
        </li>
      </logic:equal>
      <logic:equal name="mhMode" value="0">
        <hr>
        </div>
      </logic:equal>
      <% }%>
      <% String removeRowEv = ""; %>
      <% for (int i = 0; i < ((BlockList) bean.getBody()).getBodyList().size(); i++) { %>
      <% removeRowEv = contentName + ".deleteRow"; %>
      <bean:define id="drawBody" value="1"/>
      <logic:equal name="mhMode"  value="1">
        <li data-role="list-divider" data-theme="c">
        <logic:empty name="kakuninMode">
          <div class="ui-icon ui-icon-delete ui-icon-shadow iconButton_delete" onclick="<%= bean.getBody().outputSetScrollYSclipt(contentName) + ((BlockList) bean.getBody()).outputDeleteRowSclipt(contentName, i)  + reloadEv %>"></div>
          <br>
        </logic:empty>
      </logic:equal>
      <logic:equal name="mhMode"  value="0">
        <div class="pl10">
        <% if (i > 0) {%>
          <hr>
        <% } %>
      </logic:equal>
      <div class="blocklist_body" >
        <fb:formTableInput name="<%=name %>"  property="<%=property %>"  rowNo="<%=i %>" block="<%=(Block) ((BlockList) bean.getBody()).getBody(i) %>" kakuninMode="<%=kakuninMode %>"  mhMode="<%=mhMode %>"  formJust="0" />
        <logic:empty name="kakuninMode">
          <div class="txt_m txt_r">
            <img class="btn_classicImg-display cursor_p" src="../common/images/classic/icon_delete_2.gif" onclick="<%= bean.getBody().outputSetScrollYSclipt(contentName) + ((BlockList) bean.getBody()).outputDeleteRowSclipt(contentName, i)  + reloadEv %>">
            <img class="btn_originalImg-display cursor_p" src="../common/images/original/icon_delete.png" onclick="<%= bean.getBody().outputSetScrollYSclipt(contentName) + ((BlockList) bean.getBody()).outputDeleteRowSclipt(contentName, i)  + reloadEv %>">
          </div>
        </logic:empty>
      </div>
      <logic:equal name="mhMode"  value="1">
        </li>
      </logic:equal>
      <logic:equal name="mhMode"  value="0">
        <logic:empty name="kakuninMode">
          <div class="txt_r">
            <input type="submit" name="<%=contentName %>.deleteRowMbh(<%=i %>)" value="<gsmsg:write key="cmn.delete" />" />
          </div>
        </logic:empty>
      </logic:equal>
      <% }%>
      <logic:empty name="kakuninMode">
        <% if (!((BlockList) bean.getBody()).isBodyEmpty()) { %>
        <bean:define id="drawBody" value="1"/>
        <logic:equal name="mhMode"  value="1">
          <li data-role="list-divider" data-theme="c">
            <div class="txt_c">
              <input type="button" onclick="<%= bean.getBody().outputSetScrollYSclipt(contentName) + ((BlockList) bean.getBody()).outputAddRowSclipt(contentName) + reloadEv %>" value="<gsmsg:write key="cmn.add" />" data-theme="b" data-inline="true" data-role="button" data-icon="plus" data-iconpos="right"/>
            </div>
          </li>
        </logic:equal>
        <logic:empty name="mhMode" >
          <% if (((BlockList) bean.getBody()).getBodyList().size() == 0 && ((Block)((BlockList) bean.getBody()).getHeader()).getFormTable().size() > 0) { %>
            <div class="bor_t1">
          <% } else { %>
            <div>
          <% } %>
            <div>
              <a href="#!" class="js_addLink" onclick="<%= bean.getBody().outputSetScrollYSclipt(contentName) + ((BlockList) bean.getBody()).outputAddRowSclipt(contentName) + reloadEv %>">
                <gsmsg:write key="cmn.add"/>
              </a>
            </div>
          </div>
        </logic:empty>
        <logic:equal name="mhMode"  value="0">
          <div class="txt_c">
            <input type="submit" name="<%=contentName %>.addRowMbh" value="<gsmsg:write key="cmn.add" />" />
          </div>
        </logic:equal>
        <% }%>
      </logic:empty>
      <% if (((Block)((BlockList) bean.getBody()).getFooter()).getFormTable().size() > 0) { %>
      <logic:equal name="mhMode"  value="1">
        <li data-role="list-divider" data-theme="c">
      </logic:equal>
      <logic:equal name="mhMode"  value="0">
        <div class="pl10">
          <logic:notEmpty name="drawBody">
            <hr>
          </logic:notEmpty>
        </div>
      </logic:equal>
      <div class="blocklist_footer">
        <fb:formTableInput name="<%=name %>" property="<%=property %>" rowNo="0"
                           block="<%=(Block)((BlockList) bean.getBody()).getFooter() %>" kakuninMode="<%=kakuninMode %>" mhMode="<%=mhMode %>"  formJust="0" />
        <logic:empty name="kakuninMode">
          <div class="txt_m"></div>
        </logic:empty>
      </div>
      <logic:equal name="mhMode"  value="1">
        </li>
      </logic:equal>
      <logic:equal name="mhMode"  value="0">
        </div >
      </logic:equal>
      <% } %>
      <logic:equal name="mhMode"  value="1">
        </ul>
      </logic:equal>
    </div>
  </logic:equal >
  </div>
  <logic:notEmpty name="mhMode" >
    <br>
  </logic:notEmpty>
</div>

