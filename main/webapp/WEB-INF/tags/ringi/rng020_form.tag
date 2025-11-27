<%@tag import="org.apache.commons.beanutils.BeanUtils"%>
<%@ tag pageEncoding="utf-8" body-content="empty" description="稟議申請画面での入力フォーム部のタグ"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/dandd" prefix="dandd" %>
<%@ taglib tagdir="/WEB-INF/tags/ringi" prefix="ringi" %>
<%@ taglib tagdir="/WEB-INF/tags/formbuilder" prefix="fb"%>
<%@ tag import="jp.groupsession.v2.cmn.GSConst" %>

<%@ attribute description="フォーム名" name="name" type="java.lang.String" required="true" rtexprvalue="true" %>
<%@ attribute description="確認モード" name="kakuninMode" type="java.lang.String" %>
<%@ attribute description="非表示" name="hidden" type="java.lang.String" %>
<%
  if (kakuninMode != null) {
%>
  <bean:define id="kakuninStr">kakunin</bean:define>
<%
  }
%>
<!-- フォーム -->
<fb:mainInput name="<%=name %>" property="rng020input" kakuninMode="<%=kakuninMode %>">
  <jsp:attribute name="header">
    <div class="formTable bor_r1">
      <div class="formRow">
        <!-- タイトル -->
        <logic:empty name="kakuninMode">
          <fb:formInputExCell requireFlg="true">
            <jsp:attribute name="title">
              <gsmsg:write key="cmn.title" />
            </jsp:attribute>
            <jsp:attribute name="body">
              <html:text name="<%=name%>" property="rng020Title" styleClass="w100" maxlength="100" />
              <input type="text" name="dummy" class="display_n">
            </jsp:attribute>
          </fb:formInputExCell>
        </logic:empty>
        <logic:notEmpty name="kakuninMode">
          <fb:formInputExCell>
            <jsp:attribute name="title">
              <gsmsg:write key="cmn.title" />
            </jsp:attribute>
            <jsp:attribute name="body">
              <bean:write name="<%=name%>" property="rng020Title" />
            </jsp:attribute>
          </fb:formInputExCell>
        </logic:notEmpty>
      </div>
      <!-- 申請者 -->
      <div class="formRow">
        <fb:formInputExCell >
          <jsp:attribute name="title"><gsmsg:write key="rng.47" /></jsp:attribute>

          <jsp:attribute name="body">

          <logic:empty name="<%=name %>" property="rng020selectedRequestGroupList">
            <bean:write name="<%=name %>" property="rng020requestUser" />
          </logic:empty>
          <logic:notEmpty name="<%=name %>" property="rng020selectedRequestGroupList">
            <html:select name="<%= name %>" property="rng020selectedRequestGroupId" onchange="buttonPush('reload');">
              <html:optionsCollection name="<%= name %>" property="rng020selectedRequestGroupList" value="value" label="label" />
            </html:select>
            <html:select name="<%= name %>" property="rng020selectedRequestUserId" onchange="buttonPush('reload');">
              <html:optionsCollection name="<%= name %>" property="rng020selectedRequestUserList" value="value" label="label" />
            </html:select>
          </logic:notEmpty>

          </jsp:attribute>

        </fb:formInputExCell>
      </div>
      <!-- 申請ID -->
      <logic:notEqual name="<%=name %>" property="idUseFlg" value="0">
        <%-- 申請画面 --%>
        <logic:empty name="kakuninMode" >
          <logic:equal name="<%=name %>" property="idPrefManualEditable" value="1">
            <div class="formRow">
              <fb:formInputExCell >
                <jsp:attribute name="title"><gsmsg:write key="rng.rng180.04" /></jsp:attribute>
                <jsp:attribute name="body">
                  <html:multibox name="<%=name %>" property="rng020IdPrefManual" value="1" styleId="rng020IdPrefManual"></html:multibox>
                  <label for="rng020IdPrefManual"><gsmsg:write key="rng.rng210.04" /></label>
                  <br>
                  <span id="rng020PlanID" >自動<gsmsg:write key="rng.rng020.05" /> : <bean:write name="<%=name %>" property="rng020PlanID"/></span>
                  <html:text name="<%=name %>" property="rng020ID" styleClass="w100" maxlength="100"  />
                </jsp:attribute>
              </fb:formInputExCell>
            </div>
          </logic:equal>
          <logic:notEqual name="<%=name %>" property="idPrefManualEditable" value="1">
            <div class="formRow">
              <fb:formInputExCell >
                <jsp:attribute name="title"><gsmsg:write key="rng.rng180.04" /></jsp:attribute>
                <jsp:attribute name="body">
                  <bean:write name="<%=name %>" property="rng020IdTitle" />
                  ( <gsmsg:write key="rng.rng020.05" /> : <bean:write name="<%=name %>" property="rng020PlanID"/> )
                  <br>
                  <span class="cl_fontWarn">
                    <gsmsg:write key="rng.rng020.06" />
                  </span>
                </jsp:attribute>
              </fb:formInputExCell>
            </div>
          </logic:notEqual>
        </logic:empty>
        <%-- 確認画面 --%>
        <logic:notEmpty name="kakuninMode" >
          <div class="formRow">
            <fb:formInputExCell >
              <jsp:attribute name="title">
                <gsmsg:write key="rng.rng180.04" />
              </jsp:attribute>
              <jsp:attribute name="body">
                <logic:equal name="<%=name %>" property="idPrefManualEditable" value="1">
                  <logic:equal name="<%=name %>" property="rng020IdPrefManual" value="1">
                    <bean:write name="<%=name %>" property="rng020ID" />
                  </logic:equal>
                  <logic:notEqual name="<%=name %>" property="rng020IdPrefManual" value="1">
                    <bean:write name="<%=name %>" property="rng020IdTitle" />
                    ( <gsmsg:write key="rng.rng020.05" /> : <bean:write name="<%=name %>" property="rng020PlanID"/> )
                    <br>
                    <span class="cl_fontWarn">
                      <gsmsg:write key="rng.rng020.06" />
                    </span>
                  </logic:notEqual>
                </logic:equal>
                <logic:notEqual name="<%=name %>" property="idPrefManualEditable" value="1">
                  <bean:write name="<%=name %>" property="rng020IdTitle" />
                  ( <gsmsg:write key="rng.rng020.05" /> : <bean:write name="<%=name %>" property="rng020PlanID"/> )
                  <br>
                  <span class="cl_fontWarn">
                    <gsmsg:write key="rng.rng020.06" />
                  </span>
                </logic:notEqual>
              </jsp:attribute>
            </fb:formInputExCell>
          </div>
        </logic:notEmpty>

      </logic:notEqual>
    </div>
  </jsp:attribute>
</fb:mainInput>
<logic:notEmpty name="<%=name %>" property="rng020ApiComment">
<div class="formRoot border_right_none border_top_none">
  <div class="formTable bor_r1">
    <div class="formRow">
      <div class="formBlock ">
        <div class="form_title ">
          <span class=""><gsmsg:write key="rng.rng090.09" /></span>
        </div>
        <div class="formContent bgC_body"><bean:write name="<%=name %>" property="rng020ApiComment"/></div>
      </div>  
    </div>
  </div>
</div>
</logic:notEmpty>