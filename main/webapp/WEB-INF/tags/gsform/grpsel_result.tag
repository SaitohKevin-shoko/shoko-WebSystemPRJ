<%@tag import="jp.groupsession.v2.cmn.formmodel.GroupComboModel"%>
<%@tag import="jp.co.sjts.util.StringUtil"%>
<%@tag import="jp.groupsession.v2.usr.model.UsrLabelValueBean"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.UserGroupSelectModel"%>
<%@tag import="java.util.List"%>
<%@tag import="org.apache.struts.util.LabelValueBean"%>
<%@tag import="java.util.Map.Entry"%>
<%@tag import="java.util.Map"%>
<%@ tag pageEncoding="utf-8" description="ユーザグループ選択 結果欄"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/gsform" prefix="tag" %>

<%@ attribute description="GroupComboModelをフィールドにもつ親bean タグファイルで使用の場合はこちら" name="bean" type="Object" rtexprvalue="true" %>
<%@ attribute description="bean名 フォームパラメータへの参照の場合" name="name" type="java.lang.String"  rtexprvalue="true" %>
<%@ attribute description="プロパティ名 GroupComboModel フォームパラメータへの参照の場合" name="property" required="true" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="スコープ フォームパラメータへの参照の場合" name="scope" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="確認モード " name="kakunin" type="String" rtexprvalue="true" %>

<bean:define id="grpsel" name="<%=name %>" property="<%=property %>" type="GroupComboModel"/>

<logic:notEmpty name="grpsel" property="selectedLabel">
  <logic:iterate id="sel" name="grpsel" property="selectedLabel" type="LabelValueBean">
    <div class="grpsel selected cell" >
      <input type="hidden" name="<%=property + ".selected"  %>" value="<bean:write name="sel" property="value" />" />
      <bean:define id="dspName" value="<%=StringUtil.trimJPSpace(sel.getLabel()) %>" />
      <% if (!StringUtil.isNullZeroString(kakunin)) {%>
        <logic:greaterEqual  name="sel" property="value" value="0">
          <img name="groupImage" class="btn_classicImg-display" src="../common/images/classic/icon_group.png">
          <img name="groupImage" class="btn_originalImg-display" src="../common/images/original/icon_group.png">
        </logic:greaterEqual>
        <logic:equal  name="sel" property="jkbn" value="0">
          <bean:write name="dspName"  />
        </logic:equal>
        <logic:notEqual  name="sel" property="jkbn" value="0">
          <del>
            <bean:write name="dspName"  />
          </del>
        </logic:notEqual>
      <% } %>
      <% if (StringUtil.isNullZeroString(kakunin)) {%>
        <span>
          <logic:equal  name="sel" property="jkbn" value="0">
            <bean:write name="dspName"  />
          </logic:equal>
          <logic:notEqual  name="sel" property="jkbn" value="0">
            <del>
              <bean:write name="dspName"  />
            </del>
          </logic:notEqual>
        </span>
        <img class="btn_classicImg-display delButton cursor_p ml5" src="../common/images/classic/icon_delete_2.gif" onclick="$(this).grpselect({'cmd':'deleteSelect'});">
        <img class="btn_originalImg-display delButton cursor_p ml5" src="../common/images/original/icon_delete.png" onclick="$(this).grpselect({'cmd':'deleteSelect'});">
      <% } %>
    </div>
  </logic:iterate>
</logic:notEmpty>
