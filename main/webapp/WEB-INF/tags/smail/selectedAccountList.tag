<%@tag import="jp.groupsession.v2.usr.model.UsrLabelValueBean"%>
<%@ tag pageEncoding="utf-8" body-content="empty" description="ショートメール宛先選択 選択済み一覧 ひな形"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>

<%@ attribute description="宛先ラベルモデル" name="user" type="UsrLabelValueBean" required="false"%>
<%@ attribute description="宛先情報input名" name="inputName" type="String" required="false"%>

  <div class="txt_m">
    <bean:define id="mukoclass" value="" />
    <logic:notEmpty name="user">
      <logic:equal name="user" property="usrUkoFlg" value="1">
        <bean:define id="mukoclass" value="mukoUser"/>
      </logic:equal>
    </logic:notEmpty>
    <span class="js_namespace <%=mukoclass%>">
      <logic:notEmpty name="user">
        <bean:write name="user" property="label" />
        <input type="hidden" name="<bean:write name="inputName" />" value="<bean:write name="user" property="value" />">
      </logic:notEmpty>
    </span><!--
 --><a href="#!" class="ml5 classic-display js_atesakiDel lh180 no_w">
      <span class="cl_fontBody">[</span><gsmsg:write key="cmn.delete"/><span class="cl_fontBody">]</span>
    </a><!--
 --><a href="#!" class="ml5 original-display js_atesakiDel ">
      <img src="../common/images/classic/icon_delete.png">
    </a><!--
-->
  </div>
