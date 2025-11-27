<%@tag import="jp.groupsession.v2.cmn.formbuilder.FormBuilder"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.FormCell"%>
<%@tag import="java.util.List"%>
<%@tag import="jp.groupsession.v2.cmn.GSConst" %>
<%@tag import="java.util.Map.Entry"%>
<%@ tag pageEncoding="utf-8" body-content="empty" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/dandd" prefix="dandd" %>
<%@ taglib tagdir="/WEB-INF/tags/formbuilder" prefix="fb" %>

<%@ attribute description="フォーム名" name="name" type="java.lang.String" required="true" rtexprvalue="true" %>
<%@ attribute description="プロパティ名 FormBuilder" name="property" type="java.lang.String" required="true"  rtexprvalue="true"%>
<%@ attribute description="設定ダイアログアクション" name="dialogAction" type="java.lang.String"  rtexprvalue="true"%>
<%@ attribute description="確認モード" name="kakuninMode" type="java.lang.String" %>
<%
  if (kakuninMode != null) {
%>
  <bean:define id="kakuninStr">kakunin</bean:define>
<%
  }
%>
<bean:define id="formBuilder" name="<%=name %>" property="<%=property %>" type="FormBuilder"></bean:define>
<dandd:init></dandd:init>
<link rel="stylesheet" href="../common/css/formbuilder.css" type="text/css" />
<script src="../common/js/formbuilder.js?<%= GSConst.VERSION_PARAM %>"></script>

<script>
  msglist_formbuilder = new Array();
  msglist_formbuilder['cmn.cancel'] = '<gsmsg:write key="cmn.cancel"/>';
  $(function() {
    $('#form_builder').data('action' ,'../common/formcelldialog.do');
    <% if (dialogAction != null) { %>
      $('#form_builder').data('action' ,'<%=dialogAction%>');
    <%} %>
  $('#form_builder' ).data('pluginId', '<%=formBuilder.getTempPath().getPluginId()%>');
  $('#form_builder' ).data('directoryId', '<%=formBuilder.getTempPath().getTempDirId()%>');
  });
</script>

<%-- 読み込み中ダイアログ --%>
<div class="display_none">
  <div id="form_builder_loading" >
    <table class="w100 h100">
      <tr>
        <td class="txt_m txt_c">
          <img class="btn_classicImg-display" src="../common/images/classic/icon_loader.gif" />
          <div class="loader-ball"><span class=""></span><span class=""></span><span class=""></span></div>
        </td>
      </tr>
    </table>
  </div>
</div>
<table id='form_builder' class="w100 <%=jspContext.getAttribute("kakuninStr") %>">
  <tr>
    <logic:notEqual name="kakuninStr" value="kakunin">
      <td valign="top"  class="drag w25 border_none">
        <span class="text_pickUp-small">
          <gsmsg:write key="rng.rng090.06"/>
        </span>
        <div name="draglist" width="100%" >
          <div  class="dragArea gsdandd_drag_theme">
            <logic:iterate id="drag" name="<%=name %>" property="<%=property + \".drags\"%>" indexId="idx" type="FormCell">
              <fb:dragContent contentname="basicDrags" name="<%=name %>" property="<%=property + \".drags[\" + jspContext.getAttribute(\"idx\") +\"]\" %>" index="<%=String.valueOf(jspContext.getAttribute(\"idx\")) %>" parentselecter="#form_builder" />
            </logic:iterate>
          </div>
        </div>
      </td>
      <td class="w5 border_none" /></td>
    </logic:notEqual>
    <td  valign="top"  class="drop w70 border_none">
      <bean:define id="block" name="<%=name %>" property="<%=property%>" type="FormBuilder"/>
      <fb:formTable block="<%=(FormBuilder) jspContext.getAttribute(\"block\")%>" />
    </td>
  </tr >
</table>
<div id="form_dialog"></div>

