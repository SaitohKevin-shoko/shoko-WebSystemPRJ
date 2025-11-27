<%@tag import="jp.groupsession.v2.cmn.GSConst"%>
<%@ tag pageEncoding="utf-8" body-content="empty" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/ringi" prefix="ringi" %>
<%@ attribute description="個人経路の非表示" name="hiddenPersonal" type="java.lang.String" %>
<%@ attribute description="共有経路の非表示" name="hiddenShare" type="java.lang.String" %>

<%
String firstSel = "keiroTemplateDialog_share";
String hiddenShareClass = "";
if (hiddenShare != null) {
  hiddenShareClass = "keiroTemplateDialog_hiddenShare";
  firstSel = "keiroTemplateDialog_person";
}
String hiddenPersonalClass = "";
if (hiddenPersonal != null) {
  hiddenPersonalClass = "keiroTemplateDialog_hiddenPersonal";
}

%>
<div id="keirotemplateselect" class="display_n <%=firstSel%> <%=hiddenPersonalClass%> <%=hiddenShareClass%>"></div>