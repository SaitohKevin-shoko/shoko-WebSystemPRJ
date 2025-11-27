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

<%@ attribute description="UsrGroupSelectModel" name="bean" type="UserGroupSelectModel" rtexprvalue="true" required="true" %>
<%@ attribute description="ダイアログ内からのポップアップ" name="inDialog" type="String" rtexprvalue="true" required="false" %>

<div class="requestParam" style="display: none">
<logic:empty name="inDialog">
      <logic:iterate id="entry" name="bean" property="selectedListName" type="Entry">
        <logic:iterate id="user" name="bean" property="<%=\"selectedList(\" + entry.getKey() +  \")\"%>" type="UsrLabelValueBean">
        <option name="<%="usrgrpsel.selected(" + entry.getKey() +  ")" %>" value="<%=user.getValue() %>" />
        </logic:iterate>
      </logic:iterate>
</logic:empty>
      <option name="usrgrpsel.multiFlg" value="<%=bean.getMultiFlg() %>" />
      <option name="usrgrpsel.useSeigen" value="<%=bean.getUseSeigen() %>" />

      <logic:notEmpty name="bean" property="selectable">
          <logic:iterate id="val" name="bean" property="selectable" >
              <option name="usrgrpsel.selectable" value="<%=val %>" />
          </logic:iterate>
      </logic:notEmpty>
      <logic:notEmpty name="bean" property="banUsrSid">
          <logic:iterate id="val" name="bean" property="banUsrSid" >
              <option name="usrgrpsel.banUsrSid" value="<%=val %>" />
          </logic:iterate>
      </logic:notEmpty>
</div>
