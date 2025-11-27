<%@tag import="jp.co.sjts.util.StringUtilHtml"%>
<%@tag import="jp.co.sjts.util.StringUtil"%>
<%@tag import="jp.groupsession.v2.rng.RngConst"%>
<%@ tag pageEncoding="utf-8"  %>
<%@ tag import="org.apache.struts.util.LabelValueBean"%>
<%@ tag import="jp.groupsession.v2.rng.rng110keiro.Rng110KeiroDialogForm.TargetPosSel"%>
<%@ tag import="jp.groupsession.v2.rng.rng110keiro.IRng110KeiroDialogParam"%>
<%@ tag import="jp.co.sjts.util.NullDefault"%>
<%@ tag import="jp.groupsession.v2.rng.rng110keiro.KeiroInCondition"%>
<%@ tag import="java.util.Map.Entry"%>
<%@ tag import="jp.groupsession.v2.usr.model.UsrLabelValueBean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib tagdir="/WEB-INF/tags/dandd" prefix="dandd" %>
<%@ taglib tagdir="/WEB-INF/tags/ringi" prefix="ringi" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ tag import="jp.groupsession.v2.cmn.GSConst" %>
<%@ attribute description="フォーム名" name="name" type="java.lang.String" required="true" rtexprvalue="true" %>
<%@ attribute description="プロパティ名 Rng110KeiroDialogParamModel " name="property" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="コンテンツ識別名" name="contentname" type="java.lang.String" %>
<%@ attribute description="ドロップテーブル名" name="tablename" type="java.lang.String" %>
<%@ attribute description="個人テンプレートフラグ " name="keiroShareRange" type="java.lang.String"   rtexprvalue="true"%>
<%@ attribute description="経路ロールタイプフラグ " name="keiroRootType" type="java.lang.String"   rtexprvalue="true"%>
<logic:empty name="property">
  <bean:define id="bean" name="<%=name %>"  type="IRng110KeiroDialogParam"/>
</logic:empty>
<logic:notEmpty name="property">
  <bean:define id="bean" name="<%=name %>" property="<%=property %>" type="IRng110KeiroDialogParam"/>
</logic:notEmpty>

<table class="drag_moveContent dsp w100 table-noBorder">
<% if (contentname != null && tablename != null) { %>
  <script>
    //コンテンツ要素をjsonから生成し設定
    $(function() {
    var cell = $('div.dandd_droptable[name="<%=tablename%>"] div.contents.cell[name="<%=contentname%>"]');
    var content =
    <logic:empty name="property">
      <ringi:rng110_contentjson name="<%=name %>"  contentname="<%=contentname%>" keiroShareRange="<%=keiroShareRange%>" keiroRootType="<%=keiroRootType%>" />;
    </logic:empty>
    <logic:notEmpty name="property">
      <ringi:rng110_contentjson name="<%=name %>" property="<%=property %>"  contentname="<%=contentname%>" keiroShareRange="<%=keiroShareRange%>" keiroRootType="<%=keiroRootType%>" />;
    </logic:notEmpty>
    content = $.extend(true, cell.data('content'), content);
    var root = cell.parents('.dandd_root:first');
    var config = root.data('config');
    var sid = content.sid;
    if (config && config.maxSid < sid) {
      config.maxSid = sid;
    }
    cell.data('content', content);
    });
  </script>
<% } %>
<tr class="lh110 bgC_tableCell">
  <td class="border_none w20">
     &nbsp;<gsmsg:write key="rng.rng110.09"/>
  </td>
  <td class="border_none w5">:</td>
  <td class="border_none w75">
    <logic:equal name="bean" property="keiroKbn" value="0">
      <gsmsg:write key="rng.rng110.08"/>
    </logic:equal>
    <logic:equal name="bean" property="keiroKbn" value="1">
      <gsmsg:write key="rng.rng110.03"/>
    </logic:equal>
    <logic:equal name="bean" property="keiroKbn" value="2">
      <gsmsg:write key="rng.rng110.04"/>
    </logic:equal>
    <logic:equal name="bean" property="keiroKbn" value="3">
      <gsmsg:write key="rng.rng110.06"/>
    </logic:equal>
    <logic:equal name="bean" property="keiroKbn" value="4">
      <gsmsg:write key="rng.rng110.07"/>
    </logic:equal>
    <logic:equal name="bean" property="keiroKbn" value="5">
      <gsmsg:write key="rng.rng110.05"/>
    </logic:equal>
  </td>
</tr>
<%
  boolean isFormValue = false;
  boolean isGroup = false;
  boolean isPos = false;
  boolean isFirst = true;
  boolean isDraw = false;
%>
<logic:notEmpty name="bean" property="inCondMap" >
  <logic:iterate name="bean" property="inCondMap" id="inCond" type="Entry">
    <logic:notEqual name="inCond" property="key" value="template">
      <% isDraw = true; %>
    </logic:notEqual>
  </logic:iterate>
  <% if (isDraw) { %>
    <%-- 経路利用条件 --%>
    <tr class="lh110 bgC_tableCell">
      <td class="border_none">
         &nbsp;<gsmsg:write key="rng.rng110.10"/>
      </td>
      <td class="border_none">:</td>
      <td class="border_none">
        <logic:iterate name="bean" property="inCondMap" id="inCond" type="Entry">
          <logic:notEqual name="inCond" property="key" value="template">
            <%if (!isFirst) {  %>
              <br />
              <gsmsg:write key="rng.rng110.35" />
            <% } %>
            <logic:equal name="inCond" property="value.condKbn.selected" value="0">
              <gsmsg:write key="rng.rng110.33" />(
              <logic:notEmpty name="inCond" property="value.selGrpLabelList" >
                <logic:iterate name="inCond" property="value.selGrpLabelList" id="grp" indexId="idx" type="LabelValueBean">
                  <%if (idx > 0) {%>,&nbsp;<wbr /><%} %><bean:write name="grp" property="label"/>
                </logic:iterate>
              </logic:notEmpty>
              )
            </logic:equal>
            <logic:equal name="inCond" property="value.condKbn.selected" value="1">
              <gsmsg:write key="rng.rng110.34" />(
              <logic:notEmpty name="inCond" property="value.selPosLabelList" >
                <logic:iterate name="inCond" property="value.selPosLabelList" id="pos" indexId="idx" type="LabelValueBean">
                  <%if (idx > 0) {%>,&nbsp;<wbr /><%} %>
                  <bean:write name="pos" property="label"/>
                </logic:iterate>
              </logic:notEmpty>
              )
            </logic:equal>
            <logic:equal name="inCond" property="value.condKbn.selected" value="2">
              <bean:define id="arg0" name="inCond" property="value.formId" type="String" />
              <bean:define id="arg1" name="inCond" property="value.formValue" type="String"/>
              <bean:define id="arg2" name="inCond" property="value.comp.selectedLabel" type="String"/>
              <gsmsg:write key="rng.rng110.36"
               arg0="<%=StringUtilHtml.transToHTmlPlusAmparsant(arg0) %>"
               arg1="<%=StringUtilHtml.transToHTmlPlusAmparsant(arg1) %>"
               arg2="<%=StringUtilHtml.transToHTmlPlusAmparsant(arg2) %>" />
            </logic:equal>
            <% isFirst = false; %>
          </logic:notEqual>
        </logic:iterate>
      </td>
    </tr>
  <%} %>
  </logic:notEmpty>

  <%-- 経路コメント --%>
  <logic:notEmpty name="bean" property="keiroComment">
    <tr class="lh110 bgC_tableCell">
      <td class="border_none">
        &nbsp;<gsmsg:write key="rng.rng110.43"/>
      </td>
      <td class="border_none">:</td>
      <td class="border_none">
        <bean:write name="bean" property="keiroComment"/>
      </td>
    </tr>
  </logic:notEmpty>

  <%-- 対象 --%>
  <%-- //ユーザ指定 --%>
  <logic:equal name="bean" property="keiroKbn" value="1">
    <tr class="lh110 bgC_tableCell">
      <td class="border_none">
        &nbsp;<gsmsg:write key="rng.rng110.12"/>
      </td>
      <td class="border_none">:</td>
      <td class="border_none">
        <% isFirst = true; %>
        <logic:iterate name="bean" property="usrgrouptarget.selectedList(target)" id="user">
          <%if (isFirst) { isFirst = false;%>
          <%} else { %>,<% } %>
          <logic:equal name="user" property="usrUkoFlg" value="1">
            <span class="mukoUser"><bean:write name="user" property="label" /></span>
          </logic:equal>
          <logic:notEqual name="user" property="usrUkoFlg" value="1">
            <bean:write name="user" property="label"/>
          </logic:notEqual>
        </logic:iterate>
      </td>
    </tr>
  </logic:equal>
  <%-- //役職指定 --%>
  <logic:equal name="bean" property="keiroKbn" value="2">
    <tr class="lh110 bgC_tableCell">
      <td class="border_none">
        &nbsp;<gsmsg:write key="rng.rng110.12"/>
      </td>
      <td class="border_none">:</td>
      <td class="border_none">
        <% isFirst = true; %>
        <logic:iterate name="bean" property="targetposMap" id="entry" type="Entry">
          <logic:notEqual name="entry" property="key" value="template">
            <%if (isFirst) { isFirst = false;%>
            <%} else { %>,<% } %>
            <bean:define id="checked" name="entry" property="value.posSel.selected" />
            <logic:iterate name="entry" property="value.posSel.allList" id="label" type="LabelValueBean">
              <% if (label.getValue().equals(checked)) {%>
                <bean:write name="label" property="label"/>
              <%} %>
            </logic:iterate>
            <bean:define id="checked" name="entry" property="value.grpSel.selected" />
            <logic:greaterEqual value="0" name="entry" property="value.grpSel.selected">
              (
              <logic:iterate name="entry" property="value.grpSel.allList" id="label" type="LabelValueBean">
                <% if (label.getValue().equals(checked)) {%>
                <bean:write name="label" property="label"/>
              <%} %>
              </logic:iterate>
              )
            </logic:greaterEqual>
          </logic:notEqual>
        </logic:iterate>
      </td>
    </tr>
  </logic:equal>


  <%-- 選択可能ユーザ --%>
  <%-- //ユーザ選択 --%>
  <logic:equal name="bean" property="keiroKbn" value="3">
    <tr class="lh110 bgC_tableCell">
      <td class="border_none">
         &nbsp;<gsmsg:write key="rng.rng110.26"/>
      </td>
      <td class="border_none">:</td>
      <td class="border_none">
        <logic:empty name="bean" property="usrgroupselect.selectedList(target)">
          <gsmsg:write key="man.no.limit"/>
        </logic:empty>
        <logic:notEmpty name="bean" property="usrgroupselect.selectedList(target)">
          <% isFirst = true; %>
          <logic:iterate name="bean" property="usrgroupselect.selectedList(target)" id="user">
            <%if (isFirst) { isFirst = false;%>
            <%} else { %>,<% } %>
            <logic:equal name="user" property="usrUkoFlg" value="1">
              <span class="mukoUser"><bean:write name="user" property="label" /></span>
            </logic:equal>
            <logic:notEqual name="user" property="usrUkoFlg" value="1">
              <bean:write name="user" property="label"/>
            </logic:notEqual>
          </logic:iterate>
        </logic:notEmpty>
      </td>
    </tr>
  </logic:equal>
  <%-- //グループ選択 --%>
  <logic:equal name="bean" property="keiroKbn" value="4">
    <tr class="lh110 bgC_tableCell">
      <td class="border_none">
         &nbsp;<gsmsg:write key="rng.rng110.26"/>
      </td>
      <td class="border_none">:</td>
      <td class="border_none">
        <logic:empty name="bean" property="groupSel.selectedLabel">
          <gsmsg:write key="man.no.limit"/>
        </logic:empty>
        <logic:notEmpty name="bean" property="groupSel.selectedLabel">
          <% isFirst = true; %>
          <logic:iterate name="bean" property="groupSel.selectedLabel" id="user">
            <%if (isFirst) { isFirst = false;%>
            <%} else { %>,<% } %>
            <bean:write name="user" property="label"/>
          </logic:iterate>
        </logic:notEmpty>
      </td>
    </tr>
  </logic:equal>
  <%-- //任意設定 --%>
  <logic:equal name="bean" property="keiroKbn" value="0">
    <tr class="lh110 bgC_tableCell">
      <td class="border_none">
         &nbsp;<gsmsg:write key="rng.rng110.39" />
      </td>
      <td class="border_none">:</td>
      <td class="border_none">
        <logic:empty name="bean" property="usrgroupselect.selectedList(target)">
          <gsmsg:write key="cmn.notset"/>
        </logic:empty>
        <logic:notEmpty name="bean" property="usrgroupselect.selectedList(target)">
          <% isFirst = true; %>
          <logic:iterate name="bean" property="usrgroupselect.selectedList(target)" id="user">
            <%if (isFirst) { isFirst = false;%>
            <%} else { %>,<% } %>
            <logic:equal name="user" property="usrUkoFlg" value="1">
              <span class="mukoUser"><bean:write name="user" property="label" /></span>
            </logic:equal>
            <logic:notEqual name="user" property="usrUkoFlg" value="1">
              <bean:write name="user" property="label"/>
            </logic:notEqual>
          </logic:iterate>
        </logic:notEmpty>
      </td>
    </tr>
  </logic:equal>
  <logic:equal name="bean" property="keiroRootType" value="<%=String.valueOf(RngConst.RNG_RNCTYPE_APPR) %>">
    <logic:notEqual name="bean" property="keiroKbn" value="0">
      <%--経路承認条件 --%>
      <tr class="lh110 bgC_tableCell">
        <td class="border_none">
          &nbsp;<gsmsg:write key="rng.rng110.11"/>
        </td>
        <td class="border_none">:</td>
        <td class="border_none">
          <logic:equal name="bean" property="outcondition" value="0"><gsmsg:write key="rng.rng110.20"/></logic:equal>
          <logic:equal name="bean" property="outcondition" value="1"><gsmsg:write key="rng.rng110.21"/></logic:equal>
          <logic:equal name="bean" property="outcondition" value="2"><gsmsg:write key="rng.rng110.22"/>&nbsp;<bean:write name="bean" property="outcond_threshold" /><gsmsg:write key="cmn.persons"/></logic:equal>
          <logic:equal name="bean" property="outcondition" value="3"><gsmsg:write key="rng.rng110.23"/>&nbsp;<bean:write name="bean" property="outcond_threshold" />%</logic:equal>
        </td>
      </tr>
    </logic:notEqual>
  </logic:equal>
</table>