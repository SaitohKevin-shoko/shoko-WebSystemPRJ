<%@tag import="org.apache.struts.util.LabelValueBean"%>
<%@ tag pageEncoding="utf-8" body-content="empty" description="日報 一覧画面input引き継ぎ用 hidden 出力(設定画面用)"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>

<%@ attribute description="フォーム要素名" name="name" type="String" required="true"  %>
<bean:define id="thisForm" name="<%=name %>" scope="request"  />
<logic:notEmpty name="thisForm" property="confHiddenParamList">
  <logic:iterate id="item" name="thisForm" property="confHiddenParamList">
  <input type="hidden" name="<bean:write name="item" property="label"/>" value="<bean:write name="item" property="value"/>">
  </logic:iterate>
</logic:notEmpty>
<logic:notEmpty name="thisForm" property="searchHiddenParamList">
  <logic:iterate id="item" name="thisForm" property="searchHiddenParamList">
  <input type="hidden" name="<bean:write name="item" property="label"/>" value="<bean:write name="item" property="value"/>">
  </logic:iterate>
</logic:notEmpty>




