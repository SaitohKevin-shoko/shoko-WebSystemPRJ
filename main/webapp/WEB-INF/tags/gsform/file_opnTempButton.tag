<%@tag import="jp.groupsession.v2.cmn.formmodel.Temp"%>
<%@tag import="jp.groupsession.v2.cmn.model.GSTemporaryPathModel"%>
<%@tag import="jp.groupsession.v2.cmn.GSConstCommon"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.GroupComboModel"%>
<%@tag import="jp.groupsession.v2.usr.model.UsrLabelValueBean"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.UserGroupSelectModel"%>
<%@tag import="java.util.List"%>
<%@tag import="org.apache.struts.util.LabelValueBean"%>
<%@tag import="java.util.Map.Entry"%>
<%@tag import="java.util.Map"%>
<%@tag import="org.apache.commons.lang3.StringUtils"%>
<%@ tag pageEncoding="utf-8" description="opnTempボタン"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib uri="/WEB-INF/ctag-attachmentFile.tld" prefix="attachmentFile" %>

<%@ attribute description="Tempオブジェクト" name="bean" type="Temp" rtexprvalue="true"  %>
<%@ attribute description="ファイルラベル一覧参照名" name="selectListName" type="String" rtexprvalue="true" required="true"%>
<%@ attribute description="ディレクトリID" name="tempDirId" type="String" rtexprvalue="true" %>
<%@ attribute description="プラグインID" name="pluginId" type="String" rtexprvalue="true" %>
<%@ attribute description="サブディレクトリ" name="subDirList" type="List" rtexprvalue="true" %>
<bean:define id="subDir" value=""></bean:define>
<bean:define id="pluginIdStr" value="" ></bean:define>
<bean:define id="tempDirIdStr" value=""></bean:define>

<logic:notEmpty name="bean">
  <bean:define id="tempDir" type="GSTemporaryPathModel" name="bean" property="tempPath" ></bean:define>
  <bean:define id="pluginIdStr" type="String" value="<%=tempDir.getPluginId()%>"></bean:define>
  <bean:define id="tempDirIdStr" type="String" value="<%=tempDir.getTempDirId()%>"></bean:define>
  <logic:iterate id="dirPath" name="tempDir" property="subDir">
    <bean:define id="subDir" ><logic:notEmpty name="subDir"><bean:write name="subDir"  filter="false"/>/</logic:notEmpty><bean:write name="dirPath" /></bean:define>
  </logic:iterate>

</logic:notEmpty>

<logic:notEmpty name="pluginId">
  <bean:define id="pluginIdStr" type="String" value="<%=pluginId%>"></bean:define>
</logic:notEmpty>
<logic:notEmpty name="tempDirId">
  <bean:define id="tempDirIdStr" type="String" value="<%=tempDirId%>"></bean:define>
</logic:notEmpty>
<logic:notEmpty name="subDirList">
  <logic:iterate id="dirPath" name="subDirList">
    <bean:define id="subDir" ><bean:write name="subDir"  filter="false"/><bean:write name="dirPath" />/</bean:define>
  </logic:iterate>
</logic:notEmpty>

<%
  String tmpDirPlus = "";
  String formId = "kakuninzi";
  if (subDir != null && subDir != "") {
      formId = "_" + subDir.replaceAll("/", "_");
      formId = StringUtils.removeEnd(formId, "_");
  }
%>

<attachmentFile:filearea
mode="<%= String.valueOf(GSConstCommon.CMN110MODE_FILE) %>"
pluginId="<%= pluginIdStr %>"
tempDirId="<%= tempDirIdStr %>"
tempDirPlus="<%= subDir %>"
formId="<%= formId %>"/>