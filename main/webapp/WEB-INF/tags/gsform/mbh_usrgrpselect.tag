<%@tag import="org.apache.commons.codec.binary.Base64"%>
<%@tag import="jp.co.sjts.util.StringUtil"%>
<%@tag import="jp.groupsession.v2.usr.model.UsrLabelValueBean"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.UserGroupSelectModel"%>
<%@tag import="java.util.List"%>
<%@tag import="org.apache.struts.util.LabelValueBean"%>
<%@tag import="java.util.Map.Entry"%>
<%@tag import="java.util.Map"%>
<%@ tag pageEncoding="utf-8" description="ユーザグループ選択"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/gsform" prefix="tag" %>

<%@ attribute description="UsrGroupSelectModelをフィールドにもつ親bean タグファイルで使用の場合はこちら" name="bean" type="Object" rtexprvalue="true" %>
<%@ attribute description="bean名 フォームパラメータへの参照の場合" name="name" type="java.lang.String"  rtexprvalue="true" %>
<%@ attribute description="プロパティ名 UsrGroupSelectModel フォームパラメータへの参照の場合" name="property" required="true" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="スコープ フォームパラメータへの参照の場合" name="scope" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="グループ変更またはユーザ選択時のイベント" name="onchange" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="選択リストの高さ" name="size" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="ユーザグループ選択内 選択済みリスト(左側)定義 " name="leftLabelList" type="List" rtexprvalue="true"%>
<%@ attribute description="確認モード " name="kakunin" type="String" rtexprvalue="true" %>
<%@ attribute description="非表示モード" name="hiddenMode" type="java.lang.String" rtexprvalue="true" %>
<%@ attribute description="モバイルモード" name="mhMode" type="java.lang.String" %>
<%@ attribute description="特殊グループリスト使用フラグ" name="spGrpListUse" type="java.lang.String" %>

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
<bean:define id="usrgrpsel" name="<%=name %>" property="<%=property %>" type="UserGroupSelectModel"/>
<%
    String[] keys = usrgrpsel.getKeys();
    if ((keys == null || usrgrpsel.getKeys().length == 0) && leftLabelList == null) {
        usrgrpsel.addKey(UserGroupSelectModel.KEY_DEFAULT, "");
    }
 %>



<logic:empty name="hiddenMode">
  <div class="usrgrpsel_body" >
      <logic:equal name="mhMode" value="1">
        <div name="<%=property %>" onchange="<%=usrgrpsel.outputSetScrollYSclipt(property) + onchange %>" class="usrgrpsel_dsp">
        <script>
          $(function() {<%=usrgrpsel.outputDoScrollYSclipt()%>});
        </script>
      </logic:equal>
      <logic:equal name="mhMode" value="0">
        <div name="<%=property %>" class="usrgrpsel_dsp">
      </logic:equal>
      <logic:notEmpty name="usrgrpsel" property="selectedListName">
      <logic:iterate id="entry" name="usrgrpsel" property="selectedListName" type="Entry">
      <div><bean:write name="entry" property="value" /></div>

      <logic:equal name="mhMode" value="1">
        <ul data-role="listview" data-inset="true" data-theme="d" data-dividertheme="c" class=" ui-listview  ui-listview-inset ui-corner-all ui-shadow ">
          <logic:iterate id="user" name="usrgrpsel" property="<%=\"selectedList(\" + entry.getKey() +  \")\"%>" type="UsrLabelValueBean">
             <input type="hidden" name="<%= property + ".selected(" + entry.getKey() +  ")" %>" value="<%=user.getValue() %>" class="selected" />
            <% if (!StringUtil.isNullZeroString(kakunin)) {%>
               <li  data-theme="d" >
               <span class="<%=user.getCSSClassNameOption() %>">
               <bean:write name="user" property="label" /></span>
              </li>
            <% } %>
            <% if (StringUtil.isNullZeroString(kakunin)) {%>
                 <li data-icon="delete" data-theme="d" >
                 <a class="ui-link-inherit" href="#" onclick="buttonPushJson({'<%=property + ".rmSelectedMbh(" + entry.getKey() + "_" + user.getValue()%>)':'<%=user.getLabel() %>'});">
                 <span class="<%=user.getCSSClassNameOption() %>">
                 <bean:write name="user" property="label" /></span></a>
                 <span class="ui-icon ui-icon-delete ui-icon-shadow"></span></li>
            <% } %>
          </logic:iterate>
        </ul>
      </logic:equal>
      <logic:equal name="mhMode" value="0">
          <logic:iterate id="user" name="usrgrpsel" property="<%=\"selectedList(\" + entry.getKey() +  \")\"%>" type="UsrLabelValueBean">
             <input type="hidden" name="<%= property + ".selected(" + entry.getKey() +  ")" %>" value="<%=user.getValue() %>" class="selected" />
            <% if (!StringUtil.isNullZeroString(kakunin)) {%>
               <span class="<%=user.getCSSClassNameOption() %>">
               <bean:write name="user" property="label" /></span><br/>
            <% } %>
            <% if (StringUtil.isNullZeroString(kakunin)) {%>
              <input name="<%= property + ".rmSelectedMbh(" + entry.getKey() + "_" + user.getValue()  + ")" %>" value="<gsmsg:write key="cmn.delete" />" type="submit" />
              <bean:write name="user" property="label" /><br>
            <% } %>
          </logic:iterate>
      </logic:equal>
      <% if (StringUtil.isNullZeroString(kakunin)) {%>
        <div class="usrgrpsel_add">
       <input type="hidden"  name="<%=property %>.multiFlg" value="<%=usrgrpsel.getMultiFlg() %>" />
       <input type="hidden"  name="<%=property %>.useSeigen" value="<%=usrgrpsel.getUseSeigen() %>" />

       <logic:notEmpty name="usrgrpsel" property="selectable">
          <logic:iterate id="val" name="usrgrpsel" property="selectable" >
               <input type="hidden"  name="<%=property %>.selectable" value="<%=val %>" />
          </logic:iterate>
      </logic:notEmpty>
      <logic:notEmpty name="usrgrpsel" property="banUsrSid">
          <logic:iterate id="val" name="usrgrpsel" property="banUsrSid" >
               <input type="hidden"  name="<%=property %>.banUsrSid" value="<%=val %>" />
          </logic:iterate>
      </logic:notEmpty>

        <% String dlgClassMulti = "";
           if (usrgrpsel.getMultiFlg()  == UserGroupSelectModel.FLG_MULTI_OFF) {
            dlgClassMulti = "single";
           } else {
            dlgClassMulti = "multi";
           }
        %>
        <%-- 共通ユーザ選択画面へ渡す、プロパティキー設定 プロパティキーをBASE64変換したものをボタンで渡す --%>
        <bean:define id="base64property"><%=Base64.encodeBase64String(property.getBytes()) %></bean:define>

        <bean:define id="btnName">cmn120propertySelectMap(<%=base64property %>)</bean:define>

        <% if (usrgrpsel.getMultiFlg()  == UserGroupSelectModel.FLG_MULTI_OFF) { %>
            <div align="center" ><input type="submit" name="<bean:write name="btnName"/>" value="<gsmsg:write key="wml.wml040.03" />" data-theme="b" data-inline="true" data-role="button" data-icon="arrow-r" data-iconpos="right"/></div>
       <% } else {%>
            <div align="center"><input type="submit" name="<bean:write name="btnName"/>" value="<gsmsg:write key="cmn.user" /><gsmsg:write key="cmn.add" />" data-theme="b" data-inline="true" data-role="button" data-icon="plus" data-iconpos="right"/></div>
       <% } %>
        <%-- グループリスト以外の選択対象情報  --%>
        <logic:notEmpty name="usrgrpsel" property="group.list">
           <logic:iterate id="sel" name="usrgrpsel" property="group.list" indexId="idx" type="LabelValueBean">
               <logic:lessThan name="sel" property="value" value="0">
                     <input type="hidden"  name="cmn120optSelMap(<%=base64property %>)(<%=idx %>).label" value="<%=sel.getLabel() %>" />
                     <input type="hidden"  name="cmn120optSelMap(<%=base64property %>)(<%=idx %>).value" value="<%=sel.getValue() %>" />
               </logic:lessThan>
               <logic:notEmpty name="spGrpListUse">
               <input type="hidden"  name="cmn120spGrpSelUse(<%=base64property %>)" value="use" />
               <logic:greaterEqual name="sel" property="value" value="0">
                     <input type="hidden"  name="cmn120spGrpSelMap(<%=base64property %>)(<%=idx %>).label" value="<%=sel.getLabel() %>" />
                     <input type="hidden"  name="cmn120spGrpSelMap(<%=base64property %>)(<%=idx %>).value" value="<%=sel.getValue() %>" />
               </logic:greaterEqual>
               </logic:notEmpty>
           </logic:iterate>
        </logic:notEmpty>

        </div>
      <% } %>

      </logic:iterate>
      </logic:notEmpty>
      </div>
   </div>
</logic:empty>
<logic:notEmpty name="hiddenMode">
      <logic:notEmpty name="usrgrpsel" property="selectedListName">
      <logic:iterate id="entry" name="usrgrpsel" property="selectedListName" type="Entry">
      <logic:iterate id="user" name="usrgrpsel" property="<%=\"selectedList(\" + entry.getKey() +  \")\"%>" type="UsrLabelValueBean">
         <input type="hidden" name="<%= property + ".selected(" + entry.getKey() +  ")" %>" value="<%=user.getValue() %>" class="selected" />
      </logic:iterate>
      </logic:iterate>
      </logic:notEmpty>
</logic:notEmpty>
