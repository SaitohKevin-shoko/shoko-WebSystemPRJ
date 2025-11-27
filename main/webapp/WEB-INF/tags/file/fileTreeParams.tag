<%@ tag pageEncoding="utf-8" body-content="empty" description="ファイル管理 フォルダツリー表示用パラメータ"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>
<%@ attribute description="画面ID" name="screenId" type="String" required="true"%>
<%@ attribute description="フォルダツリー パラメータ名" name="treeParamName" type="String" required="false"%>
<%@ attribute description="ツリーLV上限" name="maxLv" type="Integer" required="false" %>

    <%
    if (maxLv == null) {
      maxLv = 10;
    }
    for (int idx = 1; idx <= maxLv.intValue(); idx++) {
      String levelNum = String.valueOf(idx);
      String lvParamName = "treeFormLv" + levelNum ;
      if (treeParamName != null && treeParamName.length() > 0) {
        lvParamName = treeParamName + levelNum ;
      }
      String formName = screenId + "Form";
    %>
      <logic:notEmpty name="<%= formName %>" property="<%= lvParamName %>">
        <logic:iterate id="lvID" name="<%= formName %>" property="<%= lvParamName %>">
          <span class="display_none" name="<%= lvParamName %>" data-treevalue="<bean:write name="lvID"/>"></span>
        </logic:iterate>
      </logic:notEmpty>
    <% } %>