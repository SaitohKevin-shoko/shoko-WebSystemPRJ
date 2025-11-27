<%@tag import="jp.groupsession.v2.rng.rng030.Rng030Form"%>
<%@tag import="jp.groupsession.v2.rng.rng030.Rng030KeiroParam"%>
<%@tag import="jp.groupsession.v2.rng.rng030.Rng030SingiParam"%>
<%@tag import="jp.groupsession.v2.rng.RngConst"%>
<%@ tag pageEncoding="utf-8" body-content="empty" description="稟議内容確認画面でのユーザー表示部のタグ"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/dandd" prefix="dandd" %>
<%@ taglib tagdir="/WEB-INF/tags/ringi" prefix="ringi" %>
<%@ tag import="jp.groupsession.v2.cmn.GSConst" %>

<%@ attribute description="経路グループ" name="bean" type="Rng030KeiroParam" %>
<%@ attribute description="審議情報" name="lineProNameSingi" type="java.lang.String" %>
<%@ attribute description="審議者名" name="singiName" type="java.lang.String" %>

<logic:notEqual name="bean" property="<%= lineProNameSingi + \"userUkoFlg\"%>" value="0">
  <span class="mukoUserOption">
</logic:notEqual>
  <logic:notEqual name="bean" property="<%= lineProNameSingi + \"userJkbn\"%>" value="0">
    <del><bean:write name="bean" property="<%= lineProNameSingi + singiName%>"/></del>
  </logic:notEqual>
  <logic:equal name="bean" property="<%= lineProNameSingi + \"userJkbn\"%>" value="0">
    <bean:write name="bean" property="<%= lineProNameSingi + singiName%>"/>
  </logic:equal>
</span>
