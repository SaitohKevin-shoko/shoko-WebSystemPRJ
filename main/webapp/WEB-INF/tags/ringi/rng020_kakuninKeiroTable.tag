<%@tag import="jp.groupsession.v2.rng.rng020.Rng020Keiro"%>
<%@tag import="jp.groupsession.v2.rng.rng020.Rng020KeiroBlock"%>
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
<%@ attribute description="確認経路非表示フラグ" name="notdspKakuninKeiro" type="java.lang.String" %>

<logic:notEmpty name="<%=name %>" property="<%=property + \"Map\"%>">
  <logic:iterate id="entry" name="<%=name %>" property="<%=property  + \"Map\" %>" type="Entry">
    <% String propertyName = property + "("+ entry.getKey() +")"; %>
    <bean:define id="block" name="entry" property="value" type="Rng020KeiroBlock" />
    <input type="hidden" name="<%=propertyName + ".skipKyoka"%>" value="<bean:write name="block" property="skipKyoka"/>" />
    <input type="hidden" name="<%=propertyName + ".apprFlg"%>" value="<bean:write name="block" property="apprFlg"/>" />
    <input type="hidden" name="<%=propertyName + ".hidden"%>" value="<bean:write name="block" property="hidden"/>" />
    <logic:equal name="block" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.FREESET_VAL) %>">
      <logic:notEmpty name="block" property="keiroMap">
        <logic:iterate name="block" property="keiroMap" id="entryTable" type="Entry" indexId="idx">
          <ringi:rng020_keiroKakuninCellHidden name="<%=name %>" property="<%= propertyName + \".keiro(\" + idx + \")\"%>" bean="<%=(Rng020Keiro) entryTable.getValue() %>"  />
        </logic:iterate>
      </logic:notEmpty>
    </logic:equal>
    <logic:notEqual name="block" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.FREESET_VAL) %>">
      <ringi:rng020_keiroKakuninCellHidden name="<%=name %>" property="<%= propertyName + \".keiroSingle\"%>" bean="<%=block.getKeiroSingle() %>" />
    </logic:notEqual>
  </logic:iterate>
</logic:notEmpty>
<ringi:rng020_keiroTable name="<%=name %>"  property="rng020kakuninKeiroDsp"  kakuninMode="kakunin" notdspKakuninKeiro="<%=notdspKakuninKeiro %>" notdspKeiroTitle="notdsp"/>



