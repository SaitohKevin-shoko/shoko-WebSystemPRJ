<%@tag import="jp.groupsession.v2.rng.rng090.RngRacFormTypeLabel"%>
<%@tag import="jp.groupsession.v2.rng.rng090.Rng090Form"%>
<%@tag import="jp.groupsession.v2.struts.msg.GsMessage"%>
<%@ tag import="jp.groupsession.v2.rng.rng090.Rng090ApiConnectParamForm"%>
<%@ tag import="jp.co.sjts.util.json.JSONObject"%>
<%@ tag import="jp.groupsession.v2.rng.rng090.Rng090ApiConnectForm"%>
<%@ tag import="java.util.Map.Entry"%>

<%@ tag pageEncoding="UTF-8" body-content="empty" description="稟議テンプレート登録画面でのRng090ApiConnectParamForm表示部のタグ パラメータ"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/gsform" prefix="gsform" %>
<%@ taglib tagdir="/WEB-INF/tags/common" prefix="cmn" %>
<%@ taglib tagdir="/WEB-INF/tags/ringi" prefix="ringi" %>

<%@ attribute description="フォーム名" name="name" type="String" %>
<%@ attribute description="プロパティ名" name="property" type="String" rtexprvalue="true" %>
<%@ attribute description="API連携SID" name="cacSid" type="Integer" required="false"%>
<%@ attribute description="API連携パラメータインデクス" name="capSort" type="Integer" required="false"%>
<%@ attribute description="依存表ブロックSID" name="racListFsId" type="Integer" required="true"%>

<bean:define id="condition_idx" value="-1" />
<bean:define id="suffix" value="" />
<logic:notEmpty name="property">
  <bean:define id="suffix" value="<%=String.format(\"%s.\", property) %>" />
</logic:notEmpty>
<% Rng090Form rng090Form = (Rng090Form) request.getAttribute(name);%>
<% GsMessage gsMsg = new GsMessage(request); %>

<logic:empty name="property">
  <% name = "bean";%>
  <% Rng090ApiConnectParamForm bean = new Rng090ApiConnectParamForm(null);%>
  <% bean.setCacSid(cacSid);%>
  <% bean.setCapSort(capSort);%>
  <% jspContext.setAttribute("bean", bean); %>
</logic:empty>

<% jspContext.setAttribute("racTypeSet", RngRacFormTypeLabel.createIrekoArrayTypeSet(gsMsg.getLocale(), rng090Form.getRng090template(), racListFsId)); %>


<div class="bor3 mb10 pos_rel p5 bgC_header3">
  <div class="txt_r">
    <button type="button" class="baseBtn" value="<gsmsg:write key="cmn.delete" />" onclick="$(this).parent().parent().remove();">
      <img class="btn_classicImg-display" src="../common/images/classic/icon_delete.png" alt="<gsmsg:write key="cmn.delete" />">
      <img class="btn_originalImg-display" src="../common/images/original/icon_delete.png" alt="<gsmsg:write key="cmn.delete" />">
      <gsmsg:write key="rng.rng090.63" />
    </button>
  </div>
  <html:hidden name="<%=name %>" property="<%=String.format(\"%scacSid\", suffix)%>" />
  <html:hidden name="<%=name %>" property="<%=String.format(\"%scapSort\", suffix)%>" />
  <html:hidden name="<%=name %>" property="<%=String.format(\"%srapParent\", suffix)%>" />


  <table class="table-top table-fixed w100 mt0 mb0">
    <tr class="">
      <th class=" pl5 pr5 w25">
        <gsmsg:write key="rng.rng090.16"/>
      </th>
      <th class=" pl5 pr5 w75" >
        <gsmsg:write key="rng.rng090.17"/>
      </th>
    </tr>
    <tr class="js_paramTable_row" >
      <%--設定値 --%>
      <td class="pl5 pr5  pt10 pb10 word_b-all txt_t">
        <html:select name="<%=name%>" property="<%=String.format(\"%srapTargetStr\", suffix)%>" styleClass="w100 js_racType">
          <bean:define id="rapTargetNoGrp" value="" />
          <bean:define id="rapTargetForm" value="" />
          <logic:iterate id="racType" name="racTypeSet" type="RngRacFormTypeLabel">
            <bean:define id="selectedStr" value=""  />
            <bean:define id="isForm" value="false"  />
            <% if (racType.getValue().startsWith(RngRacFormTypeLabel.FL_ENUM_HEAD)) {%>
                <bean:define id="isForm" value="true"  />
            <% } %>
            <logic:equal name="<%=name%>" property="<%=String.format(\"%srapTargetStr\", suffix)%>" value="<%=racType.getValue() %>"  >
              <bean:define id="selectedStr" value="selected"  />
            </logic:equal>
            <bean:define id="rapTargetOpt">
              <option value="<bean:write name="racType" property="value" />" <bean:write name="selectedStr" />  data-formtype="<bean:write name="racType" property="formType" />"   data-inlist="<bean:write name="racType" property="inListBody" />"><bean:write name="racType" property="label"/></option>
            </bean:define>
            <logic:notEqual name="isForm" value="true">
              <bean:define id="rapTargetNoGrp" >
                <bean:write name="rapTargetNoGrp" filter="false"/>
                <bean:write name="rapTargetOpt" filter="false"/>
              </bean:define>
            </logic:notEqual>
            <logic:equal name="isForm" value="true">
              <bean:define id="rapTargetForm" >
                <bean:write name="rapTargetForm" filter="false"/>
                <bean:write name="rapTargetOpt" filter="false"/>
              </bean:define>
            </logic:equal>
          </logic:iterate>
          <bean:write name="rapTargetNoGrp" filter="false"/>
          <logic:notEmpty name="rapTargetForm">
            <optgroup label='<gsmsg:write key="rng.rng090.49"/>'>
              <bean:write name="rapTargetForm" filter="false"/>
            </optgroup>
          </logic:notEmpty>
        </html:select>
      </td>
      <td class="pl5 pr5  pt10 pb10 word_b-all txt_t">
      </td>
    </tr>
  </table>

  <div class="pl20 pr20 mt20 condList">
    <logic:iterate id="entry" name="<%=name%>" property="<%=String.format(\"%scondMap\", suffix)%>" type="Entry">
      <bean:define id="subform_init_opt">
        {
          param:[
                  {  name:'CMD',
                     value:'dialogPrefApiConnectParamCond'
                  },
                  {
                     name:'selectSubForm',
                     value:'<%=String.format("%scond[%d]", suffix, entry.getKey()) %>'
                  }
                ],
          inputsrc:'parents',

        }
      </bean:define>
      <div data-subform_init="<bean:write name="subform_init_opt" filter="false" />" class="js_cond_subform cond_subform">
        <ringi:rng090_apiconnect_param_cond name="rng090Form" property="<%=String.format(\"%scond[%d]\", suffix, entry.getKey()) %>"  />
      </div>
      <logic:greaterThan name="entry" property="key" value="<%=condition_idx %>">
        <bean:define id="condition_idx" value ="<%=String.valueOf(entry.getKey()) %>" />
      </logic:greaterThan>
    </logic:iterate>
    <bean:define id="condAddName">cond</bean:define>
    <logic:notEmpty name="suffix">
      <bean:define id="condAddName"><%=suffix %>cond</bean:define>
    </logic:notEmpty>
    <bean:define id="clone_init_opt">
    {
      addTo:'before',
      name:'<bean:write name="condAddName" />',
      suffix: {
            countup:<bean:write name="condition_idx" />,
            head:'[', tail:']'
          }
    }
    </bean:define>
    <a href="#!" class="cl_linkDef js_condAdd cl_linkHoverChange" data-clonebtn_init="<%=clone_init_opt%>">
      <gsmsg:write key="rng.rng090.52"/>
      <fieldset class="display_none js_clonebtn_template" disabled="disabled">
        <bean:define id="subform_init_opt">
          {
            param:[
                    {  name:'CMD',
                       value:'dialogPrefApiConnectParamCond'
                    }
                  ],
            inputsrc:'parents'
          }
        </bean:define>
        <div data-subform_init="<bean:write name="subform_init_opt" filter="false" />">
          <input type="hidden" name="dummy">
        </div>
      </fieldset>
    </a>
  </div>
</div>


