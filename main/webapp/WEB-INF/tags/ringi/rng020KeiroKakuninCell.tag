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
<%@ attribute description="経路区分表記が不要かどうか" name="isKbnDraw" type="java.lang.String"%>
<%@ attribute description="再読み込み用イベントスクリプト" name="reloadEv" type="java.lang.String"%>

<% if (bean == null) { %>
  <bean:define name="<%=name %>" property="<%=property %>" id="bean"/>
<% } %>

<input type="hidden" name="<%=property + ".keiroKbn"%>" value="<bean:write name="bean" property="keiroKbn" />" />
<input type="hidden" name="<%=property + ".rtkSid"%>" value="<bean:write name="bean" property="rtkSid" />" />
<input type="hidden" name="<%=property + ".skipKyoka"%>" value="<bean:write name="bean" property="skipKyoka" />" />

<% boolean skipFlg = false; %>
<logic:equal name="bean" property="skipKyoka" value="<%=String.valueOf(RngConst.RNG_ABLE_SKIP) %>" >
  <% skipFlg =true; %>
</logic:equal>
<logic:equal name="bean" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.FREESET_VAL) %>">
   <gsform:usrgrpselect name="<%=name %>" property="<%=property + \".withGroup\"%>" hiddenMode="hidden"></gsform:usrgrpselect>
</logic:equal>
<logic:equal name="bean" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.BOSSTARGET_VAL) %>">
  <logic:empty name="isKbnDraw">
    <div class="fw_b" >
      <gsmsg:write key="<%=EnumKeiroKbn.valueOf(bean.getKeiroKbn()).getMsgKey() %>" />
    </div>
  </logic:empty>
  <gsform:grpselect name="<%=name %>" property="<%=property + \".grpSel\"%>"  hiddenMode="hidden"></gsform:grpselect>
</logic:equal>
<logic:equal name="bean" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.USERTARGET_VAL) %>">
  <logic:empty name="isKbnDraw">
    <div class="fw_b" >
      <gsmsg:write key="<%=EnumKeiroKbn.valueOf(bean.getKeiroKbn()).getMsgKey() %>" />
    </div>
  </logic:empty>
  <gsform:usrgrpselect name="<%=name %>" property="<%=property + \".onlyUser\"%>"   hiddenMode="hidden"></gsform:usrgrpselect>
</logic:equal>
<logic:equal name="bean" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.POSTARGET_VAL) %>">
  <logic:empty name="isKbnDraw">
    <div class="fw_b" >
      <gsmsg:write key="<%=EnumKeiroKbn.valueOf(bean.getKeiroKbn()).getMsgKey() %>" />
    </div>
  </logic:empty>
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
<div class="singi_block">
  <% if (skipFlg == true) { %>
    <div class="pb5">
      <gsmsg:write key="rng.rng020kn.03" />
    </div>
  <% } %>
  <logic:notEmpty name="bean" property="dspSingiList" >
    <logic:iterate id="singi" name="bean" property="dspSingiList">
      <div class="singi_step">
        <logic:notEmpty name="singi" property="name" >
          <bean:write name="singi" property="name" />
        </logic:notEmpty>
        <logic:notEmpty name="singi" property="singi" >
          <logic:iterate id="user" name="singi" property="singi" type="UsrLabelValueBean">
            <div class="singi_user hp30">
              <div class="verAlignMid">
              <logic:notEmpty name="singi" property="name" >&nbsp;&nbsp;</logic:notEmpty>
              <% if (user.getUseIconFlg() == UsrLabelValueBean.ICON_FLG_DEF) { %>
                <img  class="wp25 btn_classicImg-display" src="../common/images/classic/icon_photo.gif" name="userImage" alt="<gsmsg:write key="cmn.photo" />" />
                <img  class="wp25 btn_originalImg-display" src="../common/images/original/photo.png" name="userImage" alt="<gsmsg:write key="cmn.photo" />" />
              <% } %>
              <% if (user.getUseIconFlg() == UsrLabelValueBean.ICON_FLG_NOTPUBLIC) { %>
                <div class="hikokai_photo-s hikokai_text">非公</div>
              <% } %>
              <% if (user.getUseIconFlg() == UsrLabelValueBean.ICON_FLG_USE) { %>
                <img class="wp25" src="../common/cmn100.do?CMD=getImageFile&cmn100binSid=<bean:write name='user' property='iconBinSid' />" alt="<gsmsg:write key="cmn.photo" />" />
              <% } %>
              <logic:equal  name="user" property="jkbn" value="0">
                <a href="#!" onClick="openUserInfoWindow(<bean:write name="user" property="value" />);">
                  <span class="<%=user.getCSSClassNameOption() %>"><bean:write name="user" property="label" /></span>
                </a>
              </logic:equal>
              <logic:notEqual  name="user" property="jkbn" value="0">
                <del>
                  <span class="<%=user.getCSSClassNameOption() %>"><bean:write name="user" property="label" /></span>
                </del>
              </logic:notEqual>
              </div>
            </div>
          </logic:iterate>
        </logic:notEmpty>
        <logic:empty name="singi" property="singi">
          <logic:equal name="bean" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.BOSSTARGET_VAL) %>">
            <div>
              <gsmsg:write key="rng.rng020kn.04" />
            </div>
          </logic:equal>
        </logic:empty>
      </div>
    </logic:iterate>
  </logic:notEmpty>
</div>
