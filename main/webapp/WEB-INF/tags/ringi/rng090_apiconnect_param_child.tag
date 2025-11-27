<%@tag import="jp.groupsession.v2.rng.model.EnumApiConnectParamChildJoin"%>
<%@tag import="jp.groupsession.v2.rng.model.EnumApiConnectParamFormatType"%>
<%@tag import="jp.groupsession.v2.rng.model.EnumApiConnectParamType"%>
<%@tag import="jp.groupsession.v2.rng.rng090.RngRacFormTypeLabel"%>
<%@tag import="jp.co.sjts.util.StringUtil"%>
<%@tag import="jp.groupsession.v2.rng.rng090.EnumApiConnectConditionKbn"%>
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
<%@ attribute description="プロパティ名" name="property" type="String" required="false" rtexprvalue="true"%>
<%@ attribute description="API連携SID" name="cacSid" type="Integer" required="false"%>
<%@ attribute description="API連携パラメータインデクス" name="capSort" type="Integer" required="false"%>
<%@ attribute description="設定値例出力" name="dspSample" type="Boolean" required="false"%>



<bean:define id="suffix" value="" />
<% Rng090Form rng090Form = (Rng090Form) request.getAttribute(name);%>
<% GsMessage gsMsg = new GsMessage(request); %>

<logic:notEmpty name="property">
  <bean:define id="suffix" value="<%=String.format(\"%s.\", property) %>" />

</logic:notEmpty>
<logic:empty name="property">
  <% name = "bean";%>
  <% Rng090ApiConnectParamForm bean = new Rng090ApiConnectParamForm(null);%>
  <% bean.setCacSid(cacSid);%>
  <% bean.setCapSort(capSort);%>
  <% jspContext.setAttribute("bean", bean); %>
</logic:empty>
<bean:define id="racListFsId" type="Integer" name="<%=name%>" property="<%=String.format(\"%sracListFsid\", suffix) %>" />
<% jspContext.setAttribute("racTypeSet", RngRacFormTypeLabel.createParameterTypeSet(gsMsg.getLocale(), rng090Form.getRng090template(), racListFsId)); %>
<% jspContext.setAttribute("racFormatMap", EnumApiConnectParamFormatType.createRacFormatLabelMap(gsMsg.getLocale())); %>

<div class="bor1 mb10 m5 pos_rel p5 js_setting bgC_header3">
  <div class="verAlignMid w100">
    <logic:empty name="dspSample" >
      <bean:define id="dspSample" value="false" />
      <logic:equal parameter="<%=String.format(\"%sdspSample\", suffix)%>" value="true">
        <bean:define id="dspSample" value="true" />
      </logic:equal>
    </logic:empty>
    <bean:define id="dspSampleCheck" value="" />
    <logic:equal name="dspSample" value="true">
      <bean:define id="dspSampleCheck"  >checked="checked"</bean:define>
    </logic:equal>

    <label class="verAlignMid"><input type="checkbox" <bean:write name="dspSampleCheck" filter="false"/> name="<%=String.format("%sdspSample", suffix)%>" class="js_sampleOutput" value="true" /><gsmsg:write key="rng.rng090.69"/></label>
    <span class="ml_auto"></span>
    <button type="button" class="baseBtn" value="<gsmsg:write key="cmn.delete" />" onclick="$(this).parent().parent().remove();">
      <img class="btn_classicImg-display" src="../common/images/classic/icon_delete.png" alt="<gsmsg:write key="cmn.delete" />">
      <img class="btn_originalImg-display" src="../common/images/original/icon_delete.png" alt="<gsmsg:write key="cmn.delete" />">
      <gsmsg:write key="rng.rng090.63" />
    </button>
  </div>
  <html:hidden name="<%=name %>" property="<%=String.format(\"%scacSid\", suffix)%>" />
  <html:hidden name="<%=name %>" property="<%=String.format(\"%scapSort\", suffix)%>" />
  <html:hidden name="<%=name %>" property="<%=String.format(\"%srapParent\", suffix)%>" />

  <table class="table-top table-fixed w100 mt5 mb0">
    <tr class="">
      <th class=" pl5 pr5 w25">
        <gsmsg:write key="rng.rng090.16"/>
      </th>
      <th class=" pl5 pr5 w75" >
        <gsmsg:write key="rng.rng090.17"/>
      </th>
    </tr>
    <tr class="js_paramTable_row">
      <bean:define id="rapTargetSel" value="<%=String.valueOf(EnumApiConnectParamType.MANUAL.getValue()) %>" type="String"/>

      <%--設定値 --%>
      <td class="pl5 pr5 pt10 pb10 word_b-all txt_t">
        <html:select name="<%=name%>" property="<%=String.format(\"%srapTargetStr\", suffix)%>" styleClass="w100 js_racType" onchange="$(this).subform();">
          <bean:define id="rapTargetNoGrp" value="" />
          <bean:define id="rapTargetForm" value="" />
          <logic:iterate id="racType" name="racTypeSet" type="RngRacFormTypeLabel">
            <bean:define id="selectedStr" value=""  />
            <bean:define id="isForm" value="false"  />
            <% if (racType.getValue().startsWith(RngRacFormTypeLabel.FV_ENUM_HEAD)) {%>
                <bean:define id="isForm" value="true"  />
            <% } %>
            <logic:equal name="<%=name%>" property="<%=String.format(\"%srapTargetStr\", suffix)%>" value="<%=racType.getValue() %>"  >
              <bean:define id="selectedStr" value="selected"  />
              <bean:define id="rapTargetSel" ><bean:write name="<%=name%>" property="<%=String.format(\"%srapTarget\", suffix)%>" /></bean:define>
            </logic:equal>
            <bean:define id="rapTargetOpt">
              <option value="<bean:write name="racType" property="value" />" <bean:write name="selectedStr" /> data-formtype="<bean:write name="racType" property="formType" />"   data-inlist="<bean:write name="racType" property="inListBody" />"><bean:write name="racType" property="label"/></option>
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
            <optgroup class="bgC_dropMenu" label='<gsmsg:write key="rng.rng090.24"/>'>
              <bean:write name="rapTargetForm" filter="false"/>
            </optgroup>
          </logic:notEmpty>
        </html:select>
      </td>
      <%--フォーマット --%>
      <td class="pl5 pr5 pt10 pb10 word_b-all txt_t">
        <logic:equal name="rapTargetSel" value="<%=String.valueOf(EnumApiConnectParamType.MANUAL.getValue()) %>">
            <html:text name="<%=name%>" property="<%=String.format(\"%srapManual\", suffix) %>" styleClass="w100 js_racManual"/>
        </logic:equal>
        <logic:notEqual name="rapTargetSel" value="<%=String.valueOf(EnumApiConnectParamType.MANUAL.getValue()) %>">
            <html:hidden name="<%=name%>" property="<%=String.format(\"%srapManual\", suffix) %>" />
        </logic:notEqual>
        <logic:iterate id="racType" name="racTypeSet" type="RngRacFormTypeLabel">
          <logic:equal name="<%=name%>" property="<%=String.format(\"%srapTargetStr\", suffix)%>" value="<%=racType.getValue() %>"  >
            <bean:define id="selectRacBean" name="racType" type="RngRacFormTypeLabel"/>
            <logic:notEmpty name="selectRacBean" property="formType" >
              <logic:notEmpty name="racFormatMap" property="<%=selectRacBean.getFormType() %>" >
                <html:select name="<%=name%>" property="<%=String.format(\"%srapFormater\", suffix)%>" styleClass="w100 ">
                    <html:optionsCollection name="racFormatMap" property="<%=selectRacBean.getFormType() %>"
                        value="value"
                        label="label"/>
                </html:select>
              </logic:notEmpty>
              <logic:equal name="rapTargetSel" value="<%=String.valueOf(EnumApiConnectParamType.SELECT_USER.getValue()) %>">
                <div class="targetUsr">
                <gsform:usrgrpselect name="<%=name %>" property="<%=String.format(\"%stargetUsr\", suffix)%>" onchange="$(this).subform();"  />
                </div>
              </logic:equal>
              <logic:notEqual name="rapTargetSel" value="<%=String.valueOf(EnumApiConnectParamType.SELECT_USER.getValue()) %>">
                <logic:iterate id="selected" name="<%=name %>" property="<%=String.format(\"%stargetUsr.selectedSimple\", suffix)%>" type="String">
                  <html:hidden  name="<%=name %>" property="<%=String.format(\"%stargetUsr.selectedSimple\", suffix)%>" value="<%=selected %>"/>
                </logic:iterate>
              </logic:notEqual>
              <logic:equal name="rapTargetSel" value="<%=String.valueOf(EnumApiConnectParamType.SELECT_GROUP.getValue()) %>">
                <div class="targetGrp">
                <%-- TODO 共通ユーザグループ選択UI使用するよう 要修正  --%>
                <%-- <gsform:multiselect name="<%=name %>" size="5" property="<%=String.format(\"%stargetGrp\", suffix) %>" onchange="$(this).subform();"/> --%>
                </div>
              </logic:equal>
              <logic:notEqual name="rapTargetSel" value="<%=String.valueOf(EnumApiConnectParamType.SELECT_GROUP.getValue()) %>">
                <logic:iterate id="selected" name="<%=name %>" property="<%=String.format(\"%stargetUsr.selectedSimple\", suffix)%>" type="String">
                  <html:hidden  name="<%=name %>" property="<%=String.format(\"%stargetGrp.selected\", suffix)%>" value="<%=selected %>"/>
                </logic:iterate>
              </logic:notEqual>

              <logic:equal name="selectRacBean" property="inListBody" value="true">
                <logic:notEqual name="racListFsId" value="-1">
                  <gsmsg:write key="rng.rng090.53"/>
                </logic:notEqual>
                <logic:equal name="racListFsId"  value="-1">
                  <gsmsg:write key="rng.rng090.54"/>
                </logic:equal>
              </logic:equal>
            </logic:notEmpty>
          </logic:equal>
        </logic:iterate>


      </td>
    </tr>
  </table>

  <div class="mt20 pl20 pr20 condList">
    <bean:define id="condition_idx" value="-1" />
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
          inputsrc:'parents'

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
        <div data-subform_init="<bean:write name="subform_init_opt" filter="false" />" class="js_cond_subform cond_subform mb20">
          <input type="hidden" name="dummy">
        </div>
      </fieldset>
    </a>
  </div>
</div>



