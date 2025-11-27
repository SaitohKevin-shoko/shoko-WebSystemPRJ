<%@tag import="jp.groupsession.v2.rng.rng030.Rng030Action"%>
<%@tag import="jp.groupsession.v2.cmn.GSConstCommon"%>
<%@tag import="jp.groupsession.v2.rng.rng030.Rng030Form"%>
<%@tag import="jp.groupsession.v2.rng.RngConst"%>
<%@ tag pageEncoding="utf-8" body-content="empty" description="稟議内容確認画面での入力フォーム部のタグ"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/gsform" prefix="gsform" %>
<%@ taglib tagdir="/WEB-INF/tags/dandd" prefix="dandd" %>
<%@ taglib tagdir="/WEB-INF/tags/ringi" prefix="ringi" %>
<%@ taglib tagdir="/WEB-INF/tags/formbuilder" prefix="fb"%>
<%@ tag import="jp.groupsession.v2.cmn.GSConst" %>

<%@ attribute description="フォーム名" name="name" type="java.lang.String" required="true" rtexprvalue="true" %>
<%@ attribute description="確認モード" name="kakuninMode" type="java.lang.String" %>
<%@ attribute description="表示モード" name="dspMode" type="java.lang.String" %>
<%--タイトル部 補足コメント生成 --%>
  <% String comments = ""; %>
  <logic:equal name="<%=name %>" property="rngApprMode" value="<%= String.valueOf(RngConst.RNG_APPRMODE_APPL) %>">
    <logic:equal name="<%=name %>" property="rng010DairiFlg" value="0">
      <gsmsg:define id="strComments" msgkey="cmn.comments" />
      <% comments = "<span class=\"cl_fontWarn\">" + strComments + "</span>"; %>
    </logic:equal>
  </logic:equal>
  <bean:define id="titleComment" value="<%=comments %>"/>

  <bean:define id="commentFlg" value="false"/>
  <logic:equal value="<%=String.valueOf(Rng030Form.CMDMODE_CONFIRM) %>" name="<%=name %>" property="rng030CmdMode" >
    <bean:define id="commentFlg" value="true"/>
  </logic:equal>
  <logic:equal value="<%=String.valueOf(Rng030Form.CMDMODE_APPR) %>" name="<%=name %>" property="rng030CmdMode" >
    <bean:define id="commentFlg" value="true"/>
  </logic:equal>
  <fb:mainInput name="<%=name %>" property="rng030template" kakuninMode="<%=kakuninMode %>" dspMode="<%= dspMode %>" commentFlg="<%=commentFlg %>">
    <jsp:attribute name="header">
      <div class="formTable bor_r1">
        <div class="formRow">
          <%-- 状態 --%>
          <fb:formInputExCell >
            <jsp:attribute name="title"><gsmsg:write key="cmn.status" /></jsp:attribute>
            <jsp:attribute name="body">
              <logic:equal  name="rng030Form" property="rng030Status" value="<%=String.valueOf(RngConst.RNG_STATUS_REQUEST) %>">
                <gsmsg:write key="rng.48" />
              </logic:equal>
              <logic:equal  name="rng030Form" property="rng030Status" value="<%=String.valueOf(RngConst.RNG_STATUS_SETTLED) %>">
                <gsmsg:write key="rng.64" />
              </logic:equal>
              <logic:equal  name="rng030Form" property="rng030Status" value="<%=String.valueOf(RngConst.RNG_STATUS_REJECT) %>">
                <gsmsg:write key="rng.65" />
              </logic:equal>
              <logic:equal  name="rng030Form" property="rng030Status" value="<%=String.valueOf(RngConst.RNG_STATUS_DONE) %>">
                <gsmsg:write key="rng.rng030.06" />
              </logic:equal>
              <logic:equal  name="rng030Form" property="rng030Status" value="<%=String.valueOf(RngConst.RNG_STATUS_TORISAGE) %>">
                <gsmsg:write key="rng.66" />
              </logic:equal>
            </jsp:attribute>
          </fb:formInputExCell>
        </div>

        <div class="formRow">
          <%-- タイトル --%>
          <fb:formInputExCell requireFlg="true" kakuninMode="<%=kakuninMode %>">
            <jsp:attribute name="title">
              <gsmsg:write key="cmn.title" />
              <bean:write name="titleComment" filter="false"/>
            </jsp:attribute>
            <jsp:attribute name="body">
              <%-- 再申請モード --%>
              <logic:equal name="<%=name %>" property="rngApprMode" value="<%= String.valueOf(RngConst.RNG_APPRMODE_APPL) %>">
                <logic:equal name="<%=name %>" property="rng010DairiFlg" value="0">
                  <html:text name="<%=name %>" property="rng030Title" styleClass="w100" maxlength="100" />
                </logic:equal>
                <%-- 代理人で確認時はタイトル編集不可 --%>
                <logic:notEqual name="<%=name %>" property="rng010DairiFlg" value="0">
                  <bean:write name="<%=name %>" property="rng030ViewTitle" />
                </logic:notEqual>
              </logic:equal>
              <logic:notEqual name="<%=name %>" property="rngApprMode" value="<%= String.valueOf(RngConst.RNG_APPRMODE_APPL) %>">
                <bean:write name="<%=name %>" property="rng030ViewTitle" />
              </logic:notEqual>
            </jsp:attribute>
          </fb:formInputExCell>
        </div>

        <%-- 申請者 --%>
        <div class="formRow">
          <fb:formInputExCell >
            <jsp:attribute name="title"><gsmsg:write key="rng.47" /></jsp:attribute>
            <jsp:attribute name="body">
              <logic:equal name="<%=name %>" property="rng030apprUsrJkbn" value="9">
                <del><bean:write name="<%=name %>" property="rng030apprUser" /></del>
              </logic:equal>
              <logic:notEqual name="<%=name %>" property="rng030apprUsrJkbn" value="9">
                <bean:define id="mukoUserClass" value="" />
                <logic:equal name="<%=name %>" property="rng030apprUsrUkoFlg" value="1">
                  <bean:define id="mukoUserClass" value="mukoUser" />
                </logic:equal>
                <span class="<bean:write name="mukoUserClass"/>"><bean:write name="<%=name %>" property="rng030apprUser" /></span>
              </logic:notEqual>
            </jsp:attribute>
          </fb:formInputExCell>
        </div>

        <%-- 申請日 --%>
        <div class="formRow">
          <fb:formInputExCell >
            <jsp:attribute name="title"><gsmsg:write key="rng.application.date" /></jsp:attribute>
            <jsp:attribute name="body">
              <bean:write name="<%=name %>" property="rng030makeDate" />
            </jsp:attribute>
          </fb:formInputExCell>
        </div>

        <%-- 申請ID --%>
        <logic:notEmpty name="<%=name %>" property="rng030ID">
          <div class="formRow">
            <fb:formInputExCell >
              <jsp:attribute name="title"><gsmsg:write key="rng.rng180.04" /></jsp:attribute>
              <jsp:attribute name="body">
                <bean:write name="<%=name %>" property="rng030ID" />
              </jsp:attribute>
            </fb:formInputExCell>
          </div>
        </logic:notEmpty>
      </div>
    </jsp:attribute>

    <jsp:attribute name="footer">
      <div class="formTable bor_r1">
        <bean:define id="commentdisp" value="0"/>
        <logic:equal name="<%=name %>" property="rngProcMode" value="0">
          <bean:define id="commentdisp" value="1"/>
        </logic:equal>
        <logic:equal name="<%=name %>" property="rngProcMode" value="2">
          <bean:define id="commentdisp" value="1"/>
        </logic:equal>
        <logic:equal name="commentdisp" value="1">
          <%-- コメント --%>
          <bean:define id="commentinput" value="0"/>
          <logic:equal value="<%=String.valueOf(Rng030Form.CMDMODE_CONFIRM) %>" name="<%=name %>" property="rng030CmdMode" >
            <bean:define id="commentinput" value="1"/>
          </logic:equal>
          <logic:equal value="<%=String.valueOf(Rng030Form.CMDMODE_APPR) %>" name="<%=name %>" property="rng030CmdMode" >
            <bean:define id="commentinput" value="1"/>
          </logic:equal>
          <logic:equal value="1" name="commentinput" >
            <div class="formRow">
              <fb:formInputExCell >
                <jsp:attribute name="title"><gsmsg:write key="cmn.comment" /></jsp:attribute>
                <jsp:attribute name="body">
                  <bean:define id="maxLengthCmt" value="<%=String.valueOf(RngConst.MAX_LENGTH_COMMENT) %>" />
                  <textarea name="rng030Comment" class="w100" rows="3" onkeyup="showLengthStr(value, <bean:write name="maxLengthCmt" />, 'inputlength2');" id="inputstr2"><bean:write name="<%=name %>" property="rng030Comment" /></textarea>
                  <br>
                  <script>
                    $(function() {
                      showLengthId($('textarea[name="rng030Comment"]')[0], <bean:write name="maxLengthCmt" />, 'inputlength2');
                    });
                  </script>
                  <span class="formCounter"><gsmsg:write key="cmn.current.characters" />:</span><span id="inputlength2" class="formCounter">0</span>&nbsp;<span class="formCounter_max">/&nbsp;<bean:write name="maxLengthCmt" />&nbsp;<gsmsg:write key="cmn.character" /></span>
                </jsp:attribute>
              </fb:formInputExCell>
            </div>
          </logic:equal>
        </logic:equal>
        <logic:notEqual name="<%=name %>" property="rng030CmdMode" value="<%= String.valueOf(Rng030Form.CMDMODE_VIEW) %>">
          <%-- 確認時添付 --%>
          <bean:define id="kakuninTempDispFlg" value="0" />
          <logic:equal value="<%=String.valueOf(Rng030Form.CMDMODE_CONFIRM) %>" name="<%=name %>" property="rng030CmdMode" >
            <bean:define id="kakuninTempDispFlg" value="1" />
          </logic:equal>
          <logic:equal value="<%=String.valueOf(Rng030Form.CMDMODE_APPR) %>" name="<%=name %>" property="rng030CmdMode" >
            <bean:define id="kakuninTempDispFlg" value="1" />
          </logic:equal>
          <logic:equal value="1" name="kakuninTempDispFlg" >
            <div class="formRow">
              <fb:formInputExCell >
                <jsp:attribute name="title"><gsmsg:write key="rng.rng030.05" /></jsp:attribute>
                <jsp:attribute name="body">
                  <gsform:file_opnTempButton selectListName="rng030files" pluginId="<%=RngConst.PLUGIN_ID_RINGI %>" tempDirId="<%=Rng030Action.TEMPDIRID %>"></gsform:file_opnTempButton>
                </jsp:attribute>
              </fb:formInputExCell>
            </div>
          </logic:equal>
        </logic:notEqual>
        <%-- 決裁時アクション --%>
        <logic:notEqual name="<%=name %>" property="rng030UseApiConnect" value="0">
          <div class="formRow">
            <fb:formInputExCell >
              <jsp:attribute name="title"><gsmsg:write key="rng.rng090.09" /></jsp:attribute>
              <jsp:attribute name="body">
                <bean:write name="<%=name %>" property="rng030ApiComment" />
                <logic:equal name="<%=name %>" property="rng030ActionResultFlg" value="1">
                  <div>[<a href="#" class="js_resultLink"><gsmsg:write key="cmn.run" /><gsmsg:write key="cmn.results" /></a>]</div>
                </logic:equal>
              </jsp:attribute>
            </fb:formInputExCell>
          </div>
        </logic:notEqual>
      </div>
    </jsp:attribute>
  </fb:mainInput>