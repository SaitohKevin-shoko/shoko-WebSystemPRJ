<%@ tag pageEncoding="utf-8" body-content="empty" description="稟議申請画面での経路設定部のタグ"%>
<%@ tag import="java.util.Map.Entry"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/gsform" prefix="gsform" %>
<%@ taglib tagdir="/WEB-INF/tags/ringi" prefix="ringi" %>

<%@ tag import="jp.groupsession.v2.cmn.GSConst" %>
<%@ tag import="jp.groupsession.v2.rng.rng020.Rng020Keiro"%>
<%@ tag import="jp.groupsession.v2.rng.RngConst"%>
<%@ tag import="org.apache.struts.util.LabelValueBean"%>
<%@ tag import="jp.groupsession.v2.rng.rng110keiro.EnumKeiroKbn"%>
<%@ tag import="jp.groupsession.v2.usr.model.UsrLabelValueBean"%>

<%@ attribute description="フォーム名" name="name" type="java.lang.String" required="true" rtexprvalue="true" %>
<%@ attribute description="プロパティ名 Rng110Keiro" name="property" type="java.lang.String" required="true"  rtexprvalue="true"%>
<%@ attribute description="bean Rng020Keiro" name="bean" type="Rng020Keiro" %>

<% if (bean == null) { %>
  <bean:define name="<%=name %>" property="<%=property %>" id="bean"/>
<% } %>
<input type="hidden" name="<%=property + ".keiroKbn"%>" value="<bean:write name="bean" property="keiroKbn" />" />
<input type="hidden" name="<%=property + ".rtkSid"%>" value="<bean:write name="bean" property="rtkSid" />" />
<input type="hidden" name="<%=property + ".skipKyoka"%>" value="<bean:write name="bean" property="skipKyoka" />" />
<logic:equal name="bean" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.FREESET_VAL) %>">
  <gsform:usrgrpselect name="<%=name %>" property="<%=property + \".withGroup\"%>" hiddenMode="hidden"></gsform:usrgrpselect>
</logic:equal>
<logic:equal name="bean" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.BOSSTARGET_VAL) %>">
  <gsform:grpselect name="<%=name %>" property="<%=property + \".grpSel\"%>"  hiddenMode="hidden"></gsform:grpselect>
</logic:equal>
<logic:equal name="bean" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.USERTARGET_VAL) %>">
  <gsform:usrgrpselect name="<%=name %>" property="<%=property + \".onlyUser\"%>"   hiddenMode="hidden"></gsform:usrgrpselect>
</logic:equal>
<logic:equal name="bean" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.POSTARGET_VAL) %>">
  <%boolean isFirst = true; %>
  <logic:iterate name="bean" property="pref.targetposMap" id="entryTarget" type="Entry">
    <logic:notEqual name="entryTarget" property="key" value="template">
      <bean:define id="checked" name="entryTarget" property="value.posSel.selected" />
        <html:hidden property="<%=property + \".pref.targetpos(\" + entryTarget.getKey() +\").posSel.selected\" %>" value="<%=checked.toString() %>"/>
      <logic:notEmpty name="entryTarget" property="value.grpSel.selected">
      <bean:define id="checked" name="entryTarget" property="value.grpSel.selected" />
        <html:hidden property="<%=property + \".pref.targetpos(\" + entryTarget.getKey() +\").grpSel.selected\" %>" value="<%=checked.toString() %>"/>
      </logic:notEmpty>
    </logic:notEqual>
  </logic:iterate>
</logic:equal>
<logic:equal name="bean" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.GROUPSEL_VAL) %>">
  <gsform:grpselect name="<%=name %>" property="<%=property + \".grpSel\"%>" hiddenMode="hidden"></gsform:grpselect>
</logic:equal>
<logic:equal name="bean" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.USERSEL_VAL) %>">
  <gsform:usrgrpselect name="<%=name %>" property="<%=property + \".onlyUser\"%>"   hiddenMode="hidden"></gsform:usrgrpselect>
</logic:equal>
