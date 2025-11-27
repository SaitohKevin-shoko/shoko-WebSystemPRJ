<%@tag import="org.apache.commons.codec.binary.Base64"%>
<%@tag import="jp.co.sjts.util.StringUtil"%>
<%@tag import="jp.co.sjts.util.NullDefault"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.UserGroupSelectModel"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.GroupComboModel"%>
<%@tag import="java.util.List"%>
<%@tag import="org.apache.struts.util.LabelValueBean"%>
<%@tag import="java.util.Map.Entry"%>
<%@tag import="java.util.Map"%>
<%@ tag pageEncoding="utf-8" description="グループ選択"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/gsform" prefix="gsform" %>

<%@ attribute description="GroupComboModelをフィールドにもつ親bean タグファイルで使用の場合はこちら" name="bean" type="Object" rtexprvalue="true" %>
<%@ attribute description="bean名 フォームパラメータへの参照の場合" name="name" type="java.lang.String"  rtexprvalue="true" %>
<%@ attribute description="プロパティ名 GroupComboModel フォームパラメータへの参照の場合" name="property" required="true" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="スコープ フォームパラメータへの参照の場合" name="scope" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="グループ変更またはユーザ選択時の再描画イベント" name="onchange" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="確認モード" name="kakuninMode" type="java.lang.String" %>
<%@ attribute description="選択ボックス高さ " name="size" required="false" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="非表示モード" name="hiddenMode" type="java.lang.String" %>
<%@ attribute description="モバイルモード" name="mhMode" type="java.lang.String" required="true"%>
<%@ attribute description="特殊グループリスト使用フラグ" name="spGrpListUse" type="java.lang.String" %>

<bean:define id="DSPMODE_KAKUNIN" value="0"/>
<bean:define id="DSPMODE_COMBO" value="1"/>
<bean:define id="DSPMODE_2BOXSEL" value="2"/>
<bean:define id="DSPMODE_HIDDEN" value="3"/>
<%
    String scopeStr = "";
    if (scope != null) {
        scopeStr = scope;
    }
    if (bean != null) {
        scopeStr = "page";
        name="bean";
    }
%>
<bean:define id="grpsel" name="<%=name %>" property="<%=property %>" type="GroupComboModel"/>
<%
    jspContext.setAttribute("dspMode", DSPMODE_KAKUNIN);
    if (!StringUtil.isNullZeroString(hiddenMode)) {
        jspContext.setAttribute("dspMode", DSPMODE_HIDDEN);
    } else if (!StringUtil.isNullZeroString(kakuninMode)) {
        jspContext.setAttribute("dspMode", DSPMODE_KAKUNIN);
    } else if (grpsel.getMultiFlg() == UserGroupSelectModel.FLG_MULTI_OFF) {
        jspContext.setAttribute("dspMode", DSPMODE_COMBO);
    }


%>
<logic:equal name="dspMode" value="<%=DSPMODE_HIDDEN %>" >
    <logic:notEmpty name="grpsel" property="selectedLabel">
       <logic:iterate id="sel" name="grpsel" property="selectedLabel" type="LabelValueBean">
         <input type="hidden" name="<%=property + ".selected"  %>" value="<bean:write name="sel" property="value" />" />
       </logic:iterate>
    </logic:notEmpty>
</logic:equal>

<logic:equal name="dspMode" value="<%=DSPMODE_KAKUNIN %>" >
  <div class="grpsel_body">
    <div name="<%=property %>" onchange="<%=grpsel.outputSetScrollYSclipt(property) + onchange %>" class="grpsel_dsp">
       <input type="hidden"  name="<%=property %>.multiFlg" value="<%=grpsel.getMultiFlg() %>" />
       <input type="hidden"  name="<%=property %>.useSeigen" value="<%=grpsel.getUseSeigen() %>" />
       <logic:notEmpty name="grpsel" property="selectable">
          <logic:iterate id="val" name="grpsel" property="selectable" >
               <input type="hidden"  name="<%=property %>.selectableGSID" value="<%=val %>" />
          </logic:iterate>
      </logic:notEmpty>


      <logic:equal name="mhMode" value="1">
      <ul data-role="listview" data-inset="true" data-theme="d" data-dividertheme="c" class=" ui-listview  ui-listview-inset ui-corner-all ui-shadow ">
      <logic:iterate id="sel" name="grpsel" property="selectedLabel" type="LabelValueBean">
         <input type="hidden" name="<%=property + ".selected"  %>" value="<bean:write name="sel" property="value" />" />
         <% if (!StringUtil.isNullZeroString(kakuninMode)) {%>
           <li data-icon="delete" data-theme="d" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-top ui-corner-bottom ui-btn-up-d">
                   <logic:equal  name="sel" property="jkbn" value="0">
                     <bean:write name="sel" property="label" />
                   </logic:equal>
                   <logic:notEqual  name="sel" property="jkbn" value="0">
                     <del>
                       <bean:write name="sel" property="label" />
                     </del>
                   </logic:notEqual>
           </li>
         <% } %>
         <% if (StringUtil.isNullZeroString(kakuninMode)) {%>
           <li data-icon="delete" data-theme="d" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-top ui-corner-bottom ui-btn-up-d"
           >
                   <a class="ui-link-inherit" href="#" onclick="buttonPushJson({'<%=property + ".rmSelectedMbh("  + sel.getValue()%>)':'<%=sel.getLabel() %>'});">
                   <logic:equal  name="sel" property="jkbn" value="0">
                     <bean:write name="sel" property="label" />
                   </logic:equal>
                   <logic:notEqual  name="sel" property="jkbn" value="0">
                     <del>
                       <bean:write name="sel" property="label" />
                     </del>
                   </logic:notEqual></a>
                   <span class="ui-icon ui-icon-delete ui-icon-shadow"></span>
                  <%-- グループリスト以外の選択対象情報  --%>
                  <logic:notEmpty name="grpsel" property="list">
                       <logic:iterate id="sel" name="grpsel" property="list" indexId="idx" type="LabelValueBean">
                           <logic:lessEqual name="sel" property="value" value="0">
                             <input type="hidden"  name="<%=property %>.optSel(<%=idx %>).label" value="<%=sel.getLabel() %>" />
                             <input type="hidden"  name="<%=property %>.optSel(<%=idx %>).value" value="<%=sel.getValue() %>" />
                           </logic:lessEqual>
                       </logic:iterate>
                  </logic:notEmpty>

           </li>
         <% } %>
        </logic:iterate>
        </ul>
      </logic:equal>
      <logic:equal name="mhMode" value="0">
        <logic:iterate id="sel" name="grpsel" property="selectedLabel" type="LabelValueBean">
          <input type="hidden" name="<%=property + ".selected"  %>" value="<bean:write name="sel" property="value" />" />
          <logic:empty name="kakuninMode" >
            <input name="<%= property + ".rmSelectedMbh(" + sel.getValue()  + ")"%>" value="<gsmsg:write key="cmn.delete" />" type="submit" />
          </logic:empty>
          <bean:write name="sel" property="label" /><br>
        </logic:iterate>
      </logic:equal>

      <logic:empty name="kakuninMode" >
         <div class="grpsel_add">
         <% String dlgClassMulti = "";
            if (grpsel.getMultiFlg()  == UserGroupSelectModel.FLG_MULTI_OFF) {
                dlgClassMulti = "single";
            } else {
                dlgClassMulti = "multi";
            }
         %>
        <%-- 共通選択画面へ渡す、プロパティキー設定 プロパティキーをBASE64変換したものをボタンで渡す --%>
        <bean:define id="base64property"><%=Base64.encodeBase64String(property.getBytes()) %></bean:define>
        <bean:define id="btnName">cmn210propertySelectMap(<%=base64property %>)</bean:define>
        <% if (grpsel.getMultiFlg()  == UserGroupSelectModel.FLG_MULTI_OFF) { %>
            <div align="center"><input type="submit" name="<bean:write name="btnName"/>" value="<gsmsg:write key="wml.wml040.04" />" data-theme="b" data-inline="true" data-role="button" data-icon="arrow-r" data-iconpos="right"/></div>
       <% } else {%>
            <div align="center"><input type="submit" name="<bean:write name="btnName"/>" value="<gsmsg:write key="cmn.group" /><gsmsg:write key="cmn.add" />" data-theme="b" data-inline="true" data-role="button" data-icon="plus" data-iconpos="right"/></div>
       <% } %>
          <%-- グループリスト以外の選択対象情報  --%>
          <logic:notEmpty name="grpsel" property="list">
               <logic:iterate id="sel" name="grpsel" property="list" indexId="idx" type="LabelValueBean">
               <logic:lessThan name="sel" property="value" value="0">
                     <input type="hidden"  name="cmn210optSelMap(<%=base64property %>)(<%=idx %>).label" value="<%=sel.getLabel() %>" />
                     <input type="hidden"  name="cmn210optSelMap(<%=base64property %>)(<%=idx %>).value" value="<%=sel.getValue() %>" />
               </logic:lessThan>
               <logic:notEmpty name="spGrpListUse">
               <input type="hidden"  name="cmn210spGrpSelUse(<%=base64property %>)" value="use" />
               <logic:greaterEqual name="sel" property="value" value="0">
                     <input type="hidden"  name="cmn210spGrpSelMap(<%=base64property %>)(<%=idx %>).label" value="<%=sel.getLabel() %>" />
                     <input type="hidden"  name="cmn210spGrpSelMap(<%=base64property %>)(<%=idx %>).value" value="<%=sel.getValue() %>" />
               </logic:greaterEqual>
               </logic:notEmpty>
               </logic:iterate>
          </logic:notEmpty>

         </div>
      </logic:empty>
    </div>
  </div>
</logic:equal>
<logic:equal name="dspMode" value="<%=DSPMODE_COMBO %>" >
    <html:select name="<%=name %>" property="<%=property + \".selectedSingle\"  %>" onchange="<%=NullDefault.getString(onchange, \"\") %>" >
       <logic:iterate id="sel" name="grpsel" property="list" type="LabelValueBean">
         <html:option value="<%=sel.getValue() %>"><%=sel.getLabel() %></html:option>
       </logic:iterate>
    </html:select>
</logic:equal>

