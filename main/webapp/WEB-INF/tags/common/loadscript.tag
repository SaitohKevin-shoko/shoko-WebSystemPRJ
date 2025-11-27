<%@ tag pageEncoding="utf-8" description="script読み込み処理"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>

<%@ attribute description="defer" name="defer" type="String" required="false"%>
<%@ attribute description="ソース" name="src" type="String" required="true"%>
<%@ attribute description="パッチバージョン" name="patchVer" type="String" required="false"%>

<%@ tag import="jp.groupsession.v2.cmn.GSConst"%>

<% defer = (defer != null) ? "defer" : ""; %>
<% patchVer = (patchVer == null) ? "" : patchVer; %>

<% if (request.getAttribute(src) == null) {%>
  <script src="<%= src %>?<%= GSConst.VERSION_PARAM %><%= patchVer %>" <%= defer %>></script>
  <% request.setAttribute(src, "exist"); %>
<% } %>
