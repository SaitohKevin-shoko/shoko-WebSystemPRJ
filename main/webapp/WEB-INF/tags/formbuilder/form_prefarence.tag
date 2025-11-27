<%@tag import="jp.groupsession.v2.cmn.formmodel.prefarence.TimeBoxPrefarence"%>
<%@tag import="java.util.List"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.prefarence.DateBoxPrefarence"%>
<%@tag import="jp.co.sjts.util.StringUtilHtml"%>
<%@tag import="jp.co.sjts.util.NullDefault"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.prefarence.GroupComboModelPrefarence"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.prefarence.CalcPrefarence"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.prefarence.SimpleUserSelectPrefarence"%>
<%@tag import="org.apache.struts.util.LabelValueBean"%>
<%@tag import="java.util.Arrays"%>
<%@tag import="java.sql.Array"%>
<%@tag import="java.util.ArrayList"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Calc.Format"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.*"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.EnumFormModelKbn"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.FormCell"%>
<%@ tag pageEncoding="utf-8" description="フォーム要素設定ダイアログの描画を行う" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/gsform" prefix="gsform" %>
<%@ taglib tagdir="/WEB-INF/tags/ui" prefix="ui" %>
<%@ taglib uri="/WEB-INF/ctag-attachmentFile.tld" prefix="attachmentFile" %>

<%@ attribute description="フォーム名" name="name" type="java.lang.String" required="true" rtexprvalue="true" %>
<%@ attribute description="プロパティ名 FormCell " name="property" required="true" type="java.lang.String" rtexprvalue="true"%>
<bean:define id="bean" name="<%=name %>" property="<%=property %>" type="FormCell "/>

<form id="form_prefarence_dialog">

  <!-- タイトル -->
  <span >
    <div id="requiredTitle" class="title"><gsmsg:write key="cmn.title" />
    <logic:equal value="1" name="bean" property="titleRequireFlg"><span class="cl_fontWarn"><gsmsg:write key="cmn.comments" /></span></logic:equal>
    </div>
    <div class="body verAlignMid">
      <html:text name="bean" property="title" styleClass="jsonParam" styleId="comments" value ="<%= bean.getTitle() %>" size="20" maxlength="100" />
      <% if (bean.getBody() instanceof Comment) {%>
      <!-- 表示しない -->
        <bean:define id="beanCommentBody" name="bean" property="body" />
        <span id="notitle" class="verAlignMid ml5">
          <html:checkbox name="beanCommentBody" property="notitle"  styleId="notitle_0" />
          <label for="notitle_0"><gsmsg:write key="cmn.dont.show" /></label>
        </span>
      <%  } %>
    </div>
  </span>

  <!-- フォームID -->
  <% if (!(bean.getBody() instanceof Block)
          ) {%>
    <span>
      <div class="title">
        <gsmsg:write key="rng.rng110.31" />
      </div>
      <div class="body">
        <html:text name="bean" property="formID" styleClass="jsonParam" value ="<%= bean.getFormID() %>" size="20"  maxlength="100" />
      </div>
    </span>
  <% } %>

  <input type="hidden"  class="jsonParam" name="sid" value="<%= bean.getSid() %>" />
  <input type="hidden"  class="jsonParam" name="type" value="<%= bean.getType() %>" />
  <logic:notEmpty name="bean" property="body">
  <!-- 要素毎の設定 テキストエリア、テキストボックス-->
  <bean:define id="beanBody" name="bean" property="body" />
  <% if (bean.getBody() instanceof Comment) {%>
  <span>
    <%--  {value:コメント} --%>
    <div class="title">
      <gsmsg:write key="cmn.comment" />
    </div>
    <div class="body">
      <html:textarea name="beanBody" property="value" rows="10" styleClass="jsonParam wp500" onkeyup="<%=\"showLengthId(this,10000, 'form_dialog_comment.count');\" %>">
        <%=((Comment) beanBody).getValue() %>
      </html:textarea>
      <br>
      <span class="formCounter">
        <gsmsg:write key="cmn.current.characters" />:</span><span class="formCounter" id="form_dialog_comment.count">0</span>&nbsp;<span class="formCounter_max">/&nbsp;10000&nbsp;<gsmsg:write key="cmn.character" />
      </span>
      <script>$(function() { showLengthId($('#form_prefarence_dialog textarea[name=\'value\']').get(0),10000, 'form_dialog_comment.count'); });</script>
    </div>
  </span>
  <!-- 表示寄せ -->
  <span>
    <div id="aligntitle" class="title">
      <gsmsg:write key="cmn.display.bring" />
    </div>
    <div id="dispalign" class="body verAlignMid">
      <html:radio name="beanBody" property="valign" value="0" styleClass="jsonParam" styleId="valign_0" />
      <label for="valign_0"><gsmsg:write key="cmn.top.up" /></label>
      <html:radio name="beanBody" property="valign" value="1" styleClass="jsonParam ml10" styleId="valign_1" />
      <label for="valign_1"><gsmsg:write key="cmn.bottom.top" /></label>
    </div>
  </span>

  <%  } %>
  <% if (bean.getBody() instanceof TextInput) {%>
    <!-- 初期値 -->
    <span>
      <div class="title">
        <gsmsg:write key="ntp.10" />
      </div>
      <% if (bean.getBody() instanceof Textarea) {%>
        <div class="body">
          <html:textarea name="beanBody" property="defaultValue" rows="10" styleClass="jsonParam wp500"><%=((TextInput) beanBody).getDefaultValue()%></html:textarea>
        </div>
      <% } else {%>
        <div class="body">
          <html:text name="beanBody" property="defaultValue" styleClass="jsonParam" maxlength="10000"/>
        </div>
      <% } %>
    </span>
    <% if (bean.getBody() instanceof Textbox || bean.getBody() instanceof Textarea) {%>
      <!-- 文字数制限 -->
      <span>
        <div class="title">
          <gsmsg:write key="main.man200.1" />
        </div>
        <div class="body">
          <html:text name="beanBody" property="maxlength" styleClass="jsonParam" maxlength="5" value ="<%= String.valueOf(((TextInput) beanBody).getMaxlength()) %>" />
        </div>
      </span>
    <% } %>
    <% if (bean.getBody() instanceof NumberBox) {%>
      <!-- 文字数制限 -->
      <span>
        <div class="title">
          <gsmsg:write key="main.man200.1" />
        </div>
        <div class="body">
          <html:text name="beanBody" property="maxlength" styleClass="jsonParam" maxlength="2" value ="<%= String.valueOf(((TextInput) beanBody).getMaxlength()) %>" />
        </div>
      </span>
      <!-- 単位 -->
      <span>
        <div class="title"><gsmsg:write key="ntp.102" /></div>
        <div class="body"><html:text name="beanBody" property="tanni" styleClass="jsonParam" value ="<%= String.valueOf(((NumberBox) beanBody).getTanni()) %>"  maxlength="20"/></div>
      </span>
    <%  } %>
  <%  } %>
  <% if (bean.getBody() instanceof DateBoxPrefarence) {%>
    <!-- 初期値 -->
    <span>
      <div class="title">
        <gsmsg:write key="ntp.10" />
      </div>
      <div class="body verAlignMid">
        <html:select name="beanBody" property="defaultDateKbn" styleClass="jsonParam" onchange="if ($(this).val() == 0) { $(this).next().hide(); } else { $(this).next().show(); }">
          <html:optionsCollection name="beanBody" property="defaultKbnList" />
        </html:select>
        <logic:equal name="beanBody" property="defaultDateKbn" value="0">
          <span class="indentDate display_n">
        </logic:equal>
        <logic:notEqual name="beanBody" property="defaultDateKbn" value="0">
          <span class="indentDate">
        </logic:notEqual>
        +<html:text name="beanBody" property="defaultIndentStr" styleClass="jsonParam" size="3" maxlength="3"/><gsmsg:write key="cmn.day" />
      </div>
    </span>
  <%  } %>
  <% if (bean.getBody() instanceof TimeBoxPrefarence) {%>
    <!-- 初期値 -->
    <span>
      <div class="title">
        <gsmsg:write key="ntp.10" />
      </div>
      <div class="body ">
        <label class="display_flex">
          <input type="text" name="defaultValue" maxlength="5" size="5" id="clockPicker<%= bean.getSid() %>" class="clockpicker js_clockpicker jsonParam" value="<bean:write  name="beanBody" property="defaultValue"/>" autocomplete="off">
          <span class="picker-acs cursor_pointer icon-clock"></span>
        </label>
      </div>
    </span>
  <%  } %>
  <% if (bean.getBody() instanceof Sum) {%>
    <span>
      <div class="title">
        <gsmsg:write key="cmn.target" /><gsmsg:write key="rng.rng110.31" />
      </div>
      <div class="body">
        <span id="tableDisp"><html:checkbox name="beanBody" property="table"  styleId="table_0" />
          <label for="table_0"><gsmsg:write key="cmn.form.table" /></label>
        </span>
        <logic:iterate id="target" name="beanBody" property="target" type="Format" indexId="idx">
          <div class="sums row jsonParam verAlignMid w100 mb5" >
            <html:select name="target" property="type">
              <html:optionsCollection name="beanBody" property="select" />
            </html:select>
            <html:text name="target" property="value" maxlength="20" styleClass="ml5" />
            <logic:notEqual name="idx" value="0">
              <img class="btn_classicImg-display delButton ml5 cursor_p" src="../common/images/classic/icon_delete_2.gif">
              <img class="btn_originalImg-display delButton ml5 cursor_p" src="../common/images/original/icon_delete.png">
            </logic:notEqual>
          </div>
        </logic:iterate>
        <a href="#!" class="js_addLink notBlock cl_linkDef"><gsmsg:write key="cmn.add"/></a>
      </div>
    </span>
    <span>
      <div class="title">
        <gsmsg:write key="ntp.102" />
      </div>
      <div class="body">
        <html:text name="beanBody" property="tanni" styleClass="jsonParam" value ="<%= String.valueOf(((Sum) beanBody).getTanni()) %>"  maxlength="100" />
      </div>
    </span>
    <span>
      <div class="title">
      <gsmsg:write key="cmn.form.keta" />
        <span class="cl_fontWarn">
          <gsmsg:write key="cmn.comments" />
        </span>
      </div>
      <div class="body">
        <html:text name="beanBody" property="keta" styleId="keta_0" styleClass="jsonParam" value ="<%= ((Sum) beanBody).getKeta() %>"  maxlength="1" />
        <gsmsg:write key="cmn.keta" />
      </div>
    </span>
    <span>
      <div class="title">
        <gsmsg:write key="cmn.form.round" />
      </div>
      <div class="body verAlignMid">
        <html:radio name="beanBody" property="round" value="0" styleClass="jsonParam" styleId="round_0" /><label for="round_0"><gsmsg:write key="cmn.form.kirisute" /></label>
        <html:radio name="beanBody" property="round" value="1" styleClass="jsonParam ml10" styleId="round_1" /><label for="round_1"><gsmsg:write key="cmn.form.kiriage" /></label>
        <html:radio name="beanBody" property="round" value="2" styleClass="jsonParam ml10" styleId="round_2" /><label for="round_2"><gsmsg:write key="cmn.form.sissyagonyuu" /></label>
      </div>
    </span>
    <%  } %>
    <% if (bean.getBody() instanceof CalcPrefarence) {%>
      <span>
        <div class="title">
          <gsmsg:write key="cmn.form.pref.calc" />
          <span class="cl_fontWarn">
            <gsmsg:write key="cmn.comments" />
          </span>
        </div>
        <div class="body">
          <span id="tableDisp">
            <html:checkbox name="beanBody" property="table"  styleId="table_0" />
            <label for="table_0"><gsmsg:write key="cmn.form.table" /></label>
          </span>
          <html:textarea name="beanBody" property="siki" rows="10" styleClass="jsonParam wp500" styleId="textSiki"></html:textarea>
          <br>
          <div class="mt5" >
            <button type="button" class="baseBtn js_siki_inputButton" value="+" data-cmd="1" >+</button>
            <button type="button" class="baseBtn js_siki_inputButton" value="-" data-cmd="2" >-</button>
            <button type="button" class="baseBtn js_siki_inputButton" value="×" data-cmd="3" >×</button>
            <button type="button" class="baseBtn js_siki_inputButton" value="÷" data-cmd="4" >÷</button>
            <button type="button" class="baseBtn js_siki_inputButton" value="(" data-cmd="5" >(</button>
            <button type="button" class="baseBtn js_siki_inputButton" value=")" data-cmd="6" >)</button>
          </div>
          <div class="mt5 verAlignMid" >
            <bean:define name="beanBody" property="format" id="formId" />
            <span>
              <html:select styleId="formatSelect" name="formId" property="type" >
                <html:optionsCollection name="beanBody" property="select" />
              </html:select>
            </span>
            <button type="button" class="baseBtn ml5  js_siki_formatAddButton" value="追加" >追加</button>
          </div>
        </div>
      </span>
      <span>
        <div class="title">
          <gsmsg:write key="ntp.102" />
        </div>
        <div class="body">
          <html:text name="beanBody" property="tanni" styleClass="jsonParam" value ="<%= String.valueOf(((Calc) beanBody).getTanni()) %>"  maxlength="100"/>
        </div>
      </span>
      <span>
        <div class="title">
          <gsmsg:write key="cmn.form.keta" />
          <span class="cl_fontWarn">
            <gsmsg:write key="cmn.comments" />
          </span>
        </div>
        <div class="body"><html:text name="beanBody" property="keta" styleId="keta_0" styleClass="jsonParam" value ="<%= ((Calc) beanBody).getKeta() %>"  maxlength="1" />
          <gsmsg:write key="cmn.keta" />
        </div>
      </span>
      <span>
        <div class="title">
          <gsmsg:write key="cmn.form.round" />
        </div>
        <div class="body verAlignMid">
          <html:radio name="beanBody" property="round" value="0" styleClass="jsonParam" styleId="round_0" />
          <label for="round_0"><gsmsg:write key="cmn.form.kirisute" /></label>
          <html:radio name="beanBody" property="round" value="1" styleClass="jsonParam ml10" styleId="round_1" />
          <label for="round_1"><gsmsg:write key="cmn.form.kiriage" /></label>
          <html:radio name="beanBody" property="round" value="2" styleClass="jsonParam ml10" styleId="round_2" />
          <label for="round_2"><gsmsg:write key="cmn.form.sissyagonyuu" /></label>
        </div>
      </span>
    <%  } %>
    <% if (bean.getBody() instanceof SimpleSelectBase) {%>
      <span>
        <div class="title">
          <gsmsg:write key="rng.rng110.26" />
        </div>
        <div class="body">

          <logic:iterate id="target" name="beanBody" property="list" indexId="idx"  type="String">
            <div class="row w100 verAlignMid">
              <html:radio name="beanBody" property="defaultValue" value="<%=target%>" styleClass="jsonParam"  />
              <html:text name="beanBody" property="list" value="<%=target%>" styleClass="jsonParam"  maxlength="100" />
              <% if (((SimpleSelectBase) beanBody).getList().size() > 1) {%>
                <img class="btn_classicImg-display delButton cursor_p ml5" src="../common/images/classic/icon_delete_2.gif">
                <img class="btn_originalImg-display delButton cursor_p ml5" src="../common/images/original/icon_delete.png">
              <% } %>
            </div>
          </logic:iterate>
        <a href="#!" class="js_addLink notBlock cl_linkDef"><gsmsg:write key="cmn.add"/></a>
        </div>
      <span>
    <%  } %>
    <% if (bean.getBody() instanceof CheckBox) {%>
      <span>
        <div class="title">
          <gsmsg:write key="rng.rng110.26" />
        </div>
        <div class="body">
          <logic:iterate id="target" name="beanBody" property="list" indexId="idx"  type="String">
            <div class="row w100 verAlignMid" >
              <html:multibox name="beanBody" property="defaultValue" value="<%=target%>" styleClass="jsonParam"  />
              <html:text name="beanBody" property="list" value="<%=target%>" styleClass="jsonParam" maxlength="100" />
              <% if (((CheckBox) beanBody).getList().size() > 1) {%>
                <img class="btn_classicImg-display delButton cursor_p ml5" src="../common/images/classic/icon_delete_2.gif">
                <img class="btn_originalImg-display delButton cursor_p ml5" src="../common/images/original/icon_delete.png">
              <% } %>
            </div>
          </logic:iterate>
          <a href="#!" class="js_addLink notBlock cl_linkDef"><gsmsg:write key="cmn.add"/></a>
        </div >
      </span>
    <%  } %>
    <% if (bean.getBody() instanceof SimpleUserSelectPrefarence) {%>
      <span>
        <div class="title">
          <gsmsg:write key="enq.enq210.04" />
        </div>
        <div class="body">
          <html:radio name="beanBody" property="multiFlg" value="0" styleClass="jsonParam" styleId="multiFlg_0" /><label for="multiFlg_0"><gsmsg:write key="enq.enq210.03" /></label>
          <html:radio name="beanBody" property="multiFlg" value="1" styleClass="jsonParam" styleId="multiFlg_1" /><label for="multiFlg_1"><gsmsg:write key="enq.enq210.04" /></label>
        </div>
      </span>
      <span>
        <div class="title"><gsmsg:write key="rng.rng110.26" /></div>
        <div class="body wp650">
          <html:radio name="beanBody" property="useSeigen" value="0" styleClass="jsonParam" styleId="useSeigen_0" /><label for="useSeigen_0"><gsmsg:write key="cmn.not.limit" /></label>
          <html:radio name="beanBody" property="useSeigen" value="1" styleClass="jsonParam" styleId="useSeigen_1" /><label for="useSeigen_1"><gsmsg:write key="cmn.do.limit" /></label>
          <input type="hidden" name="selectorTypeText" value="user" />
          <span class="jsonParam selectable dialog_usrgrpsel">
            <ui:usrgrpselector name="<%=name%>" property="selectParamUserSelector" styleClass="hp160 "/>
          </span>

        </div>
      </span>
    <%  } %>
    <% if (bean.getBody() instanceof GroupComboModelPrefarence) {%>
      <span>
        <div class="title">
          <gsmsg:write key="enq.enq210.04" />
        </div>
        <div class="body">
          <html:radio name="beanBody" property="multiFlg" value="0" styleClass="jsonParam" styleId="multiFlg_0" /><label for="multiFlg_0"><gsmsg:write key="enq.enq210.03" /></label>
          <html:radio name="beanBody" property="multiFlg" value="1" styleClass="jsonParam" styleId="multiFlg_1" /><label for="multiFlg_1"><gsmsg:write key="enq.enq210.04" /></label>
        </div>
      </span>
      <span>
        <div class="title">
          <gsmsg:write key="rng.rng110.26" />
        </div>
        <div class="body wp650">
          <html:radio name="beanBody" property="useSeigen" value="0" styleClass="jsonParam" styleId="useSeigen_0" /><label for="useSeigen_0"><gsmsg:write key="cmn.not.limit" /></label>
          <html:radio name="beanBody" property="useSeigen" value="1" styleClass="jsonParam" styleId="useSeigen_1" /><label for="useSeigen_1"><gsmsg:write key="cmn.do.limit" /></label>
          <input type="hidden" name="selectorTypeText" value="group" />

          <span class="jsonParam selectable" >
            <span class="jsonParam selectable" >
              <ui:usrgrpselector name="<%=name%>" property="selectParamGroupSelector" styleClass="hp160 "/>
            </span>
          </span>

        </div>
      </span>
    <%  } %>
    <% if (bean.getBody() instanceof BlockList) {%>
      <span >
        <div class="title">
          <gsmsg:write key="cmn.form.pref.rowcnt.default" />
        </div>
        <div class="body">
          <html:text name="beanBody" property="defLength" styleClass="jsonParam" maxlength="2"></html:text>
        </div>
      </span>
    <%  } %>
    <% if (bean.getBody() instanceof Temp) {%>
      <bean:define id="tempBody" name="beanBody" type="Temp" />
      <span>
        <div class="title">
          <gsmsg:write key="cmn.attach.file" />
        </div>
        <div class="body">
          <bean:define id="subDirPath" value=""></bean:define>
          <logic:iterate id="dirPath" name="tempBody" property="tempPath.subDir">

            <bean:define id="subDirPath" ><logic:notEmpty name="subDirPath"><bean:write name="subDirPath"  filter="false"/>/</logic:notEmpty><bean:write name="dirPath" /></bean:define>
          </logic:iterate>
          <attachmentFile:filearea
          mode="<%= String.valueOf(jp.groupsession.v2.cmn.GSConstCommon.CMN110MODE_FILE) %>"
          pluginId="<%= tempBody.getTempPath().getPluginId() %>"
          tempDirId="<%= tempBody.getTempPath().getTempDirId() %>"
          tempDirPlus="<%= subDirPath %>" />
        </div>
      </span>
    <%  } %>

  </logic:notEmpty>
  <% if (!(bean.getBody() instanceof Comment)
          && !(bean.getBody() instanceof RadioButton)
          && !(bean.getBody() instanceof ComboBox)
          && !(bean.getBody() instanceof Calc)
          && !(bean.getBody() instanceof Sum)
          && !(bean.getBody() instanceof Block)
          && !(bean.getBody() instanceof BlockList)) {%>
    <!-- 入力必須フラグ -->
    <span >
      <div class="title">
        <gsmsg:write key="cmn.required" />
      </div>
      <div class="body verAlignMid">
        <html:multibox name="bean" property="require" styleClass="jsonParam"  styleId="form_prefarence_dialog_require" >
          <%= FormCell.VALUE_REQUIRE %>
        </html:multibox>
        <label for="form_prefarence_dialog_require"><gsmsg:write key="main.man200.6" /></label>
      </div>
    </span>
  <%  } %>
</form>