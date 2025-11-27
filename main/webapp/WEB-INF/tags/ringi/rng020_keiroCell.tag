<%@tag import="jp.co.sjts.util.StringUtil"%>
<%@tag import="jp.groupsession.v2.rng.rng020.Rng020KeiroBlock"%>
<%@tag import="jp.groupsession.v2.rng.rng020.Rng020Keiro"%>
<%@tag import="jp.groupsession.v2.rng.RngConst"%>
<%@tag import="org.apache.struts.util.LabelValueBean"%>
<%@tag import="jp.groupsession.v2.rng.rng110keiro.EnumKeiroKbn"%>
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

<%@ attribute description="フォーム名" name="name" type="java.lang.String" required="true" rtexprvalue="true" %>
<%@ attribute description="プロパティ名 Rng110Keiro" name="property" type="java.lang.String" required="true"  rtexprvalue="true"%>
<%@ attribute description="bean Rng020Keiro" name="bean" type="Rng020Keiro" %>
<%@ attribute description="確認モード" name="kakuninMode" type="java.lang.String" %>
<%@ attribute description="経路区分表記が不要かどうか" name="isKbnDraw" type="java.lang.String"%>
<%@ attribute description="再読み込み用イベントスクリプト" name="reloadEv" type="java.lang.String"%>
<% if (bean == null) { %>
  <bean:define name="<%=name %>" property="<%=property %>" id="bean"/>
<% } %>
<%
  if (reloadEv == null) {
    reloadEv = "buttonPush('reload');";
  }
%>
<input type="hidden" name="<%=property + ".keiroKbn"%>" value="<bean:write name="bean" property="keiroKbn" />" />
<input type="hidden" name="<%=property + ".rtkSid"%>" value="<bean:write name="bean" property="rtkSid" />" />
<input type="hidden" name="<%=property + ".skipKyoka"%>" value="<bean:write name="bean" property="skipKyoka" />" />
<% boolean skipFlg = false; %>
<logic:equal name="bean" property="skipKyoka" value="<%=String.valueOf(RngConst.RNG_ABLE_SKIP) %>" >
  <% skipFlg =true; %>
</logic:equal>
<logic:equal name="bean" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.FREESET_VAL) %>">
  <div class="w99">
    <% if (skipFlg == true) { %>
      <div class="mb5">
        <gsmsg:write key="rng.rng020kn.03" />
      </div>
    <% } %>
    <gsform:usrgrpselect name="<%=name %>" property="<%=property + \".withGroup\"%>"  kakunin="<%=kakuninMode %>"></gsform:usrgrpselect>
  </div>
</logic:equal>
<logic:equal name="bean" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.BOSSTARGET_VAL) %>">
  <div class="w99">
    <logic:empty name="isKbnDraw">
      <div class="fw_b" >
        <gsmsg:write key="<%=EnumKeiroKbn.valueOf(bean.getKeiroKbn()).getMsgKey() %>" />
      </div>
    </logic:empty>
    <% if (skipFlg == true) { %>
      <div class="mb5">
        <gsmsg:write key="rng.rng020kn.03" />
      </div>
    <% } %>
    <gsform:grpselect name="<%=name %>" property="<%=property + \".grpSel\"%>" kakuninMode="<%=kakuninMode %>"></gsform:grpselect>
  </div>
</logic:equal>
<logic:equal name="bean" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.USERTARGET_VAL) %>">
  <div class="w99">
    <logic:empty name="isKbnDraw">
      <div  class="fw_b" >
        <gsmsg:write key="<%=EnumKeiroKbn.valueOf(bean.getKeiroKbn()).getMsgKey() %>" />
      </div>
    </logic:empty>
    <% if (skipFlg == true) { %>
      <div class="mb5">
        <gsmsg:write key="rng.rng020kn.03" />
      </div>
    <% } %>
    <gsform:usrgrpselect name="<%=name %>" property="<%=property + \".onlyUser\"%>" kakunin="kakunin"></gsform:usrgrpselect>
  </div>
</logic:equal>
<logic:equal name="bean" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.POSTARGET_VAL) %>">
  <div class="w99">
    <logic:empty name="isKbnDraw">
      <div class="fw_b" >
        <gsmsg:write key="<%=EnumKeiroKbn.valueOf(bean.getKeiroKbn()).getMsgKey() %>" />
      </div>
    </logic:empty>
    <%boolean isFirst = true; %>
    <logic:iterate name="bean" property="pref.targetposMap" id="entryTarget" type="Entry">
      <% if (skipFlg == true) { %>
        <div class="mb5">
          <gsmsg:write key="rng.rng020kn.03" />
        </div>
      <% } %>
      <logic:notEqual name="entryTarget" property="key" value="template">
        <% if (isFirst) { %>
        <%   isFirst = false;%>
        <% } else { %>
        ,
        <% } %>
        <logic:notEmpty name="entryTarget" property="value.posSel.selected">
          <bean:define id="checked" name="entryTarget" property="value.posSel.selected" />
          <html:hidden property="<%=property + \".pref.targetpos(\" + entryTarget.getKey() +\").posSel.selected\" %>" value="<%=checked.toString() %>"/>
          <logic:notEmpty name="entryTarget" property="value.posSel.allList">
            <logic:iterate name="entryTarget" property="value.posSel.allList" id="label" type="LabelValueBean">
            <% if (label.getValue().equals(checked)) {%>
              <bean:write name="label" property="label"/>
            <% } %>
            </logic:iterate>
          </logic:notEmpty>
        </logic:notEmpty>
        <logic:notEmpty name="entryTarget" property="value.grpSel.selected">
          <bean:define id="checked" name="entryTarget" property="value.grpSel.selected" />
          <html:hidden property="<%=property + \".pref.targetpos(\" + entryTarget.getKey() +\").grpSel.selected\" %>" value="<%=checked.toString() %>"/>
          <logic:greaterEqual value="0" name="entryTarget" property="value.grpSel.selected">
            (
            <logic:notEmpty name="entryTarget" property="value.grpSel.allList">
              <logic:iterate name="entryTarget" property="value.grpSel.allList" id="label" type="LabelValueBean">
                <% if (label.getValue().equals(checked)) {%>
                  <bean:define id="gname" name="label" property="label"/>
                  <%=StringUtil.trimJPSpace(String.valueOf(gname)) %>
                <%} %>
              </logic:iterate>
            </logic:notEmpty>
            )
          </logic:greaterEqual>
        </logic:notEmpty>
      </logic:notEqual>
    </logic:iterate>
  </div>
</logic:equal>
<logic:equal name="bean" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.GROUPSEL_VAL) %>">
  <div class="w99">
    <% if (skipFlg == true) { %>
      <div class="mb5">
        <gsmsg:write key="rng.rng020kn.03" />
      </div>
    <% } %>
    <gsform:grpselect name="<%=name %>" property="<%=property + \".grpSel\"%>" kakuninMode="<%=kakuninMode %>"></gsform:grpselect>
  </div>
</logic:equal>
<logic:equal name="bean" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.USERSEL_VAL) %>">
  <div class="w99">
    <% if (skipFlg == true) { %>
      <div class="mb5">
        <gsmsg:write key="rng.rng020kn.03" />
      </div>
    <% } %>
    <gsform:usrgrpselect name="<%=name %>" property="<%=property + \".onlyUser\"%>"  kakunin="<%=kakuninMode %>"></gsform:usrgrpselect>
  </div>
</logic:equal>