<%@ tag pageEncoding="utf-8" body-content="empty" %>
<%@ tag import="jp.groupsession.v2.rng.rng210.Rng210ListModel"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/ringi" prefix="ringi" %>
<%@ attribute description="フォーマット1行を扱うモデルクラス" name="bean" type="Rng210ListModel" rtexprvalue="true" %>
<%@ attribute description="行番号" name="lineNo" type="String" rtexprvalue="true" %>
<div class="js_format js_row pt5">
  <bean:define id="selected" value="1"/>
  <% if (bean != null) { %>
    <bean:define id="selected" name="bean" property="rng210SelectFormat" type="String"/>
  <% } %>
  <html:select property="rng210SelectFormat" value="<%= selected %>"  onchange="selectchage(this)" styleClass="rngSinseiId_format-input">
     <html:option value="1"><gsmsg:write key="rng.rng210.18"/></html:option>
     <html:option value="2"><gsmsg:write key="rng.rng210.15"/></html:option>
     <html:option value="3"><gsmsg:write key="rng.rng210.19"/></html:option>
     <html:option value="4"><gsmsg:write key="rng.rng210.20"/></html:option>
     <html:option value="5"><gsmsg:write key="cmn.month"/></html:option>
     <html:option value="6"><gsmsg:write key="cmn.day"/></html:option>
  </html:select>
  <span class="display_inline">
    <logic:equal name="selected" value="1">
       <div class="js_textarea">
     <% if (bean != null) { %>
        <input type="text" onBlur="focusOut();" value="<bean:write name="bean" property="rng210FormatWord" />" name="textFormat" class="wp150 rngSinseiId_format-input" maxlength="10">
     <% } else { %>
        <input type="text" onBlur="focusOut();" value="" name="textFormat" class="wp150 rngSinseiId_format-input" maxlength="10">
     <% } %>
      </div>
      <div class="display_n">
        <span class="display_inline wp150"></span>
      </div>
    </logic:equal>
    <logic:notEqual name="selected" value="1">
      <div class="js_textarea display_n">
        <input type="text"  name="textFormat" class="wp150" maxlength="10">
      </div>
      <div>
        <span class="display_inline wp150"></span>
      </div>
    </logic:notEqual>
  </span>
  <bean:define id="btnMode" value="del"/>
  <% if (bean != null) { %>
    <logic:equal name="lineNo" value="0">
      <bean:define id="btnMode" value="add"/>
    </logic:equal>
  <% } %>
  <logic:equal name="btnMode" value="add">
    <button type="button" name="btn_add" class="baseBtn" value="<gsmsg:write key="cmn.add" />" onClick="addNewRow(this);">
      <img class="btn_classicImg-display" src="../common/images/classic/icon_add.png" alt="<gsmsg:write key="cmn.add" />">
      <img class="btn_originalImg-display" src="../common/images/original/icon_add.png" alt="<gsmsg:write key="cmn.add" />">
      <gsmsg:write key="cmn.add" />
    </button>
  </logic:equal>
  <logic:notEqual name="btnMode" value="add">
    <button class="baseBtn" value="<gsmsg:write key="cmn.delete" />" name="btn_delete" onClick="delRow(this);">
      <img class="btn_classicImg-display" src="../common/images/classic/icon_delete.png" alt="<gsmsg:write key="cmn.delete" />">
      <img class="btn_originalImg-display" src="../common/images/original/icon_delete.png" alt="<gsmsg:write key="cmn.delete" />">
      <gsmsg:write key="cmn.delete" />
    </button>
  </logic:notEqual>
</div>