<%@ tag import="jp.groupsession.v2.rng.rng090.Rng090ApiConnectParamForm"%>
<%@ tag import="jp.co.sjts.util.json.JSONObject"%>
<%@ tag import="jp.groupsession.v2.rng.rng090.Rng090ApiConnectForm"%>
<%@ tag import="java.util.Map.Entry"%>

<%@ tag pageEncoding="UTF-8" body-content="empty" description="稟議テンプレート登録画面でのRng090ApiConnectForm表示部のタグ"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/ringi" prefix="ringi" %>

<%@ attribute description="フォーム名" name="name" type="String" %>
<%@ attribute description="確認時" name="kakunin" type="Boolean" required="false" %>

<logic:iterate id="apiMdl" name="<%=name %>" property="rng090ApiMap" type="Entry">
  <bean:define id="idx" value="<%=String.valueOf(apiMdl.getKey()) %>" />
  <div class="js_apiconnect_cell" data-index="<%=idx%>">
    <logic:equal name="kakunin" value="true" >

        <span class=""><bean:write name="apiMdl" property="value.cacMdl.cacName" /></span>

        <html:hidden name="<%=name %>" property="<%=String.format(\"rng090ApiMdl[%s].cacSid\", idx)%>"/>
        <html:hidden property="<%=String.format(\"rng090ApiMdl[%s].statusVal\", idx)%>" />
        <html:hidden name="rng090Form" property="<%=String.format(\"rng090ApiMdl[%s].racListFsid\", idx)%>"/>

        <logic:iterate id="param" name="<%=name %>" property="<%=String.format(\"rng090ApiMdl[%s].descendants\", idx)%>" type="Rng090ApiConnectParamForm" >
          <bean:define id="addr" name="param" property="rootsAddrDsp" type="String" />
          <ringi:rng090_apiconnect_param_result name="<%=name %>" property="<%=String.format(\"rng090ApiMdl[%s].%s\", idx, addr)%>" />

        </logic:iterate>
    </logic:equal>
    <logic:notEqual name="kakunin" value="true" >
      <a href="#!"  >
        <bean:define id="flg_dspworn" value="false" />
        <logic:iterate id="param" name="<%=name %>" property="<%=String.format(\"rng090ApiMdl[%s].descendants\", idx)%>" type="Rng090ApiConnectParamForm" >
          <logic:notEmpty name="param" property="errMsg">
            <bean:define id="flg_dspworn" value="true" />
          </logic:notEmpty>
        </logic:iterate>
        <logic:equal name="<%=name %>" property="<%=String.format(\"rng090ApiMdl[%s].statusVal\", idx)%>" value="<%=Rng090ApiConnectForm.EnumStatus.CONVERT.name() %>">
          <bean:define id="flg_dspworn" value="true" />
        </logic:equal>

        <logic:equal name="flg_dspworn" value="true" >
          <img class="btn_classicImg-display" src="../common/images/classic/icon_warn.png" alt="<gsmsg:write key="rng.04" />">
          <img class="btn_originalImg-display" src="../common/images/original/icon_warn.png" alt="<gsmsg:write key="rng.04" />">
        </logic:equal>

        <span class="js_editcell"><bean:write name="apiMdl" property="value.cacMdl.cacName" /></span>
        <button class="ml5 iconBtn-noBorder" type="button" onclick="$(this).parent().parent().remove();">
          <img class="delButton btn_classicImg-display classic" src="../common/images/classic/icon_delete.png">
          <img class="delButton btn_originalImg-display original" src="../common/images/original/icon_delete.png">
        </button>
        <html:hidden name="<%=name %>" property="<%=String.format(\"rng090ApiMdl[%s].cacSid\", idx)%>"/>
        <html:hidden name="<%=name %>" property="<%=String.format(\"rng090ApiMdl[%s].statusVal\", idx)%>" />
        <html:hidden name="rng090Form" property="<%=String.format(\"rng090ApiMdl[%s].racListFsid\", idx)%>"/>
        <logic:iterate id="param" name="<%=name %>" property="<%=String.format(\"rng090ApiMdl[%s].descendants\", idx)%>" type="Rng090ApiConnectParamForm" >
          <bean:define id="addr" name="param" property="rootsAddrDsp" type="String" />
          <ringi:rng090_apiconnect_param_result name="<%=name %>" property="<%=String.format(\"rng090ApiMdl[%s].%s\", idx, addr)%>" />
        </logic:iterate>
      </a>
    </logic:notEqual>
  </div>
</logic:iterate>
