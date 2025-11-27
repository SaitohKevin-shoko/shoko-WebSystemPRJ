<%@ tag pageEncoding="utf-8" body-content="empty" description="稟議申請画面での経路設定部のタグ"%>
<%@ tag import="java.util.Map.Entry"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/dandd" prefix="dandd" %>
<%@ taglib tagdir="/WEB-INF/tags/ringi" prefix="ringi" %>
<%@ taglib tagdir="/WEB-INF/tags/formbuilder" prefix="fb" %>

<%@ tag import="jp.groupsession.v2.cmn.GSConst" %>

<%@ attribute description="フォーム名" name="name" type="java.lang.String" required="true" rtexprvalue="true" %>
<%@ attribute description="確認モード" name="kakuninMode" type="java.lang.String" %>
<%@ attribute description="非表示" name="hidden" type="java.lang.String" %>
<% if (kakuninMode != null) { %>
  <bean:define id="kakuninStr">kakunin</bean:define>
<% } %>
<div class="fw_b bor1 p5 bgC_header2 txt_l">
  <gsmsg:write key="rng.42" />
</div>
<ringi:rng020_keiroTable name="<%=name %>"  property="rng020keiro" kakuninMode="<%=kakuninMode %>"/>
<bean:define id="notdspKakuninKeiro" value="" />
<logic:notEmpty name="kakuninMode">
  <logic:equal name="<%=name %>"  property="kakuninKeiroDspFlg" value="0">
    <bean:define id="notdspKakuninKeiro" value="notdsp" />
  </logic:equal>
</logic:notEmpty>
<logic:empty name="notdspKakuninKeiro">
  <div class="fw_b mt10 bor1 p5 bgC_header2 txt_l">
    <gsmsg:write key="rng.35" />
  </div>
</logic:empty>
<logic:notEmpty name="kakuninMode">
 < ringi:rng020_kakuninKeiroTable name="<%=name %>"  property="rng020kakuninKeiro" notdspKakuninKeiro="<%=notdspKakuninKeiro %>"/>
</logic:notEmpty>
<logic:empty  name="kakuninMode">
  <span class="keiro_kakunin">
    <ringi:rng020_keiroTable name="<%=name %>"  property="rng020kakuninKeiro"  kakuninMode="<%=kakuninMode %>" notdspKakuninKeiro="<%=notdspKakuninKeiro %>"/>
  </span>
</logic:empty>