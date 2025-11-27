<%@tag import="jp.groupsession.v2.rng.rng090.Rng090ApiConnectParamCondForm"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.FormAccesser"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.RadioButton"%>
<%@tag import="jp.groupsession.v2.rng.rng090.Rng090Form"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.FormBuilder"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.EnumFormModelKbn"%>
<%@tag import="jp.groupsession.v2.struts.msg.GsMessage"%>
<%@ tag import="jp.groupsession.v2.rng.rng090.Rng090ApiConnectParamForm"%>
<%@ tag import="jp.co.sjts.util.json.JSONObject"%>
<%@ tag import="jp.groupsession.v2.rng.rng090.Rng090ApiConnectForm"%>
<%@ tag import="java.util.Map.Entry"%>

<%@ tag pageEncoding="UTF-8" body-content="empty" description="稟議テンプレート登録画面でのRng090ApiConnectParamCondForm表示部のタグ パラメータ"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/gsform" prefix="gsform" %>
<%@ taglib tagdir="/WEB-INF/tags/common" prefix="cmn" %>
<%@ taglib tagdir="/WEB-INF/tags/ringi" prefix="ringi" %>

<%@ attribute description="フォーム名" name="name" type="String" %>
<%@ attribute description="プロパティ名" name="property" type="String" required="false" rtexprvalue="true" %>

<bean:define id="suffix" value="" />
<logic:notEmpty name="property">
  <bean:define id="suffix" value="<%=String.format(\"%s.\", property) %>" />
</logic:notEmpty>
<logic:empty name="property">
  <% name = "bean";%>
  <% jspContext.setAttribute("bean", new Rng090ApiConnectParamCondForm()); %>
</logic:empty>

<!--     /** 経路使用条件区分 選択値*/ -->
  <html:hidden name="<%=name %>" property="<%=String.format(\"%scondKbn.selected\", suffix)%>"  />
<!--     /** 経路使用条件 入力値 フォームID*/ -->
  <html:hidden name="<%=name %>" property="<%=String.format(\"%sformId.selected\", suffix)%>"  />
<!--     /** 経路使用条件 入力値 値*/ -->
<logic:notEmpty name="<%=name %>" property="<%=String.format(\"%sformValue\", suffix)%>" >
  <logic:iterate id="val" name="<%=name %>" property="<%=String.format(\"%sformValue\", suffix)%>" type="String">
    <html:hidden property="<%=String.format(\"%sformValue\", suffix)%>" value="<%=val %>" />
  </logic:iterate>
</logic:notEmpty>
<!--     /** 経路使用条件 入力値ユーザ選択*/ -->
<logic:iterate id="val" name="<%=name %>" property="<%=String.format(\"%sformValueUsr.selectedSimple\", suffix)%>"  type="String">
  <html:hidden name="<%=name %>" property="<%=String.format(\"%sformValueUsr.selectedSimple\", suffix)%>" value="<%=val %>" />
</logic:iterate>
<!--     /** 経路使用条件 入力値グループ選択*/ -->
<logic:iterate id="val" name="<%=name %>" property="<%=String.format(\"%sformValueGrp.selected\", suffix)%>" type="String">
  <html:hidden name="<%=name %>" property="<%=String.format(\"%sformValueGrp.selected\", suffix)%>" value="<%=val %>" />
</logic:iterate>
<!--     /** 経路使用条件 比較子*/ -->
  <html:hidden name="<%=name %>" property="<%=String.format(\"%scomp.selected\", suffix)%>"  />
<!--     /** 経路使用条件 所属ユーザグループ*/ -->
<logic:iterate id="val" name="<%=name %>" property="<%=String.format(\"%sselUsrgrp.selectedSimple\", suffix)%>" type="String">
  <html:hidden name="<%=name %>" property="<%=String.format(\"%sselUsrgrp.selectedSimple\", suffix)%>" value="<%=val %>" />
</logic:iterate>
<!--     /** 経路使用条件 役職*/ -->
<logic:iterate id="val" name="<%=name %>" property="<%=String.format(\"%sselPos.selected\", suffix)%>" type="String">
  <html:hidden name="<%=name %>" property="<%=String.format(\"%sselPos.selected\", suffix)%>" value="<%=val %>" />
</logic:iterate>




