<%@tag import="jp.groupsession.v2.cir.model.CirAccountModel"%>
<%@ tag pageEncoding="utf-8" body-content="empty" description="回覧先選択 選択済み一覧 ひな形"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>
<%@ attribute description="宛先ラベルモデル" name="memMdl" type="CirAccountModel" required="false"%>
<%@ attribute description="宛先情報input名" name="inputName" type="String" required="false"%>
<div class="js_atesakiUser" >
  <bean:define id="mukoUserClass" value="" />
  <logic:notEmpty name="memMdl">
    <logic:greaterThan name="memMdl" property="cacSid" value="0">
      <logic:equal name="memMdl" property="usrUkoFlg" value="1">
        <bean:define id="mukoUserClass">mukoUser</bean:define>
      </logic:equal>
      <logic:equal name="memMdl" property="cacJkbn" value="1">
        <bean:define id="mukoUserClass">deluser</bean:define>
      </logic:equal>
      <logic:greaterThan name="memMdl" property="usrSid" value="0">
        <input type="hidden" name="<bean:write name="inputName" />" value="<bean:write name="memMdl" property="usrSid" />" />
      </logic:greaterThan>
    </logic:greaterThan>
    <logic:lessThan name="memMdl" property="usrSid" value="1">
      <input type="hidden" name="<bean:write name="inputName" />" value="cac<bean:write name="memMdl" property="cacSid" />" />
    </logic:lessThan>
  </logic:notEmpty>
  <span class="mr10 <%=mukoUserClass%> js_namespace">
    <logic:notEmpty name="memMdl">
      <bean:write name="memMdl" property="cacName" />
    </logic:notEmpty>
  </span><!--
  -->[<span class="js_atesakiDel cursor_p textLink"><gsmsg:write key="cmn.delete" /></span>]
</div>
