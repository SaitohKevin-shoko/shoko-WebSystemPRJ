<%@tag import="java.util.Map.Entry"%>
<%@tag import="jp.groupsession.v2.rng.model.RngTemplateApiconnectParamModel"%>
<%@tag import="jp.groupsession.v2.cmn.model.EnumCmnApiConnectParamType"%>
<%@tag import="jp.groupsession.v2.rng.model.EnumApiConnectParamType"%>
<%@ tag import="jp.groupsession.v2.rng.rng090.Rng090ApiConnectParamForm"%>
<%@ tag import="jp.co.sjts.util.json.JSONObject"%>
<%@ tag import="jp.groupsession.v2.rng.rng090.Rng090ApiConnectForm"%>
<%@ tag import="java.util.Map.Entry"%>

<%@ tag pageEncoding="UTF-8" body-content="empty" description="稟議テンプレート登録画面でのRng090ApiConnectForm表示部のタグ"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/ringi" prefix="ringi" %>

<%@ attribute description="フォーム名" name="name" type="String" %>
<%@ attribute description="プロパティ名" name="property" type="String" required="false" rtexprvalue="true"%>

<bean:define id="suffix" value="" />
<logic:notEmpty name="property">
  <bean:define id="suffix" value="<%=String.format(\"%s.\", property) %>" />
</logic:notEmpty>
<logic:empty name="property">
  <% name = "bean";%>
  <% jspContext.setAttribute("bean", new Rng090ApiConnectParamForm(null)); %>
</logic:empty>


<%--設定値 --%>
<html:hidden name="<%=name %>" property="<%=String.format(\"%sinit\", suffix)%>" />
<html:hidden name="<%=name %>" property="<%=String.format(\"%srtfSid\", suffix)%>" />
<html:hidden name="<%=name %>" property="<%=String.format(\"%scacSid\", suffix)%>" />
<html:hidden name="<%=name %>" property="<%=String.format(\"%scapSort\", suffix)%>" />
<html:hidden name="<%=name %>" property="<%=String.format(\"%srapParent\", suffix)%>" />
<html:hidden name="<%=name %>" property="<%=String.format(\"%srapFormater\", suffix)%>" />
<html:hidden name="<%=name %>" property="<%=String.format(\"%srapManual\", suffix)%>" />
<html:hidden name="<%=name %>" property="<%=String.format(\"%srapTargetStr\", suffix)%>" />
<html:hidden name="<%=name %>" property="<%=String.format(\"%srapChildJoin\", suffix)%>" />
<logic:iterate id="selected" name="<%=name %>" property="<%=String.format(\"%stargetUsr.selectedSimple\", suffix)%>" type="String">
  <html:hidden  name="<%=name %>" property="<%=String.format(\"%stargetUsr.selectedSimple\", suffix)%>" value="<%=selected %>"/>
</logic:iterate>
<logic:iterate id="selected" name="<%=name %>" property="<%=String.format(\"%stargetGrp.selected\", suffix)%>" type="String">
  <html:hidden  name="<%=name %>" property="<%=String.format(\"%stargetGrp.selected\", suffix)%>" value="<%=selected %>"/>
</logic:iterate>


<bean:define id="condition_idx" value="-1" />
<logic:iterate id="entry" name="<%=name%>" property="<%=String.format(\"%scondMap\", suffix)%>" type="Entry">
  <ringi:rng090_apiconnect_param_cond_result name="<%=name %>" property="<%=String.format(\"%scond[%d]\", suffix, entry.getKey()) %>"  />
</logic:iterate>
