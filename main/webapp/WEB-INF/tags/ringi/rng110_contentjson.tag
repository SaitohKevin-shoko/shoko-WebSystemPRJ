<%@ tag pageEncoding="utf-8" body-content="tagdependent" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ tag import="jp.groupsession.v2.rng.rng110keiro.IRng110KeiroDialogParam"%>

<%--引数--%>

<%@ attribute description="フォーム名" name="name" type="java.lang.String"  rtexprvalue="true" %>
<%@ attribute description="プロパティ名 " name="property" type="java.lang.String"   rtexprvalue="true"%>
<%@ attribute description="コンテント識別名 " name="contentname" type="java.lang.String"   rtexprvalue="true"%>
<%@ attribute description="個人テンプレートフラグ " name="keiroShareRange" type="java.lang.String"   rtexprvalue="true"%>
<%@ attribute description="経路ロールタイプフラグ " name="keiroRootType" type="java.lang.String"   rtexprvalue="true"%>

<% if (name != null && name.length() > 0) {%>
  <bean:define id="bean" name="<%=name %>" property="<%=property %>" type="IRng110KeiroDialogParam"/>
<% } %>
{
 "type":"<bean:write name="bean" property="keiroKbn" filter="false" />" ,
 "title":"<bean:write name="bean" property="keiroName" filter="false" />" ,
 "sid":"<%=contentname %>",
 "param": [
<%--     /** 経路種別*/ --%>
   {"name":"keiroKbn", "value":"<bean:write name="bean" property="keiroKbn" filter="false" />" },
<%--     /** 経路名*/ --%>
   {"name":"keiroName", "value":"<bean:write name="bean" property="keiroName" filter="false" />" },
<%--     /** 経路コメント*/ --%>
   {"name":"keiroComment", "value":"<bean:write name="bean" property="keiroComment" filter="false" />" },
<%--     /** 経路承認条件 */ --%>
   {"name":"outcondition", "value":"<bean:write name="bean" property="outcondition" filter="false" />" },
<%--     /** 経路承認条件 閾値*/ --%>
   {"name":"outcond_threshold", "value":"<bean:write name="bean" property="outcond_threshold" filter="false" />" },
<%--     テンプレート公開範囲区分 --%>
<logic:notEmpty name="keiroShareRange" >
   {"name":"keiroShareRange", "value":"<%=keiroShareRange %>" },
</logic:notEmpty>
<%--     経路ロールタイプ --%>
<logic:notEmpty name="keiroRootType" >
   {"name":"keiroRootType", "value":"<%=keiroRootType %>" },
</logic:notEmpty>

<%--     /** 対象ユーザ選択*/ --%>
<logic:notEmpty name="bean" property="usrgrouptarget.selected">
  <logic:iterate name="bean" property="usrgrouptarget.selected" id="entry">
    <logic:notEmpty name="entry" property="value" >
      <logic:iterate name="entry" property="value" id="selected">
       {"name":"usrgrouptarget.selected(<bean:write name="entry" property="key" filter="false" />)", "value":"<bean:write name="selected"  filter="false" />" },
      </logic:iterate>
    </logic:notEmpty>
  </logic:iterate>
</logic:notEmpty>
<%--     /** 対象役職設定*/ --%>
<logic:notEmpty name="bean" property="targetposMap" >
  <logic:iterate name="bean" property="targetposMap" id="entry">
    {"name":"targetpos(<bean:write name="entry" property="key" filter="false" />).grpSel.selected", "value": "<bean:write name="entry" property="value.grpSel.selected" filter="false" />" },
    {"name":"targetpos(<bean:write name="entry" property="key" filter="false" />).posSel.selected", "value": "<bean:write name="entry" property="value.posSel.selected" filter="false" />" },
  </logic:iterate>
</logic:notEmpty>
<%--     /** 審議者が申請者の場合 */ --%>
  {"name":"skip", "value":"<bean:write name="bean" property="skip" filter="false" />" },

<%--     /** 複数選択 */ --%>
  {"name":"multisel", "value":"<bean:write name="bean" property="multisel" filter="false" />" },

<%--     /** 自己審議の許可 */ --%>
  {"name":"own", "value":"<bean:write name="bean" property="own" filter="false" />" },

<%--     /** 該当ユーザが存在しない場合 */ --%>
  {"name":"nonuser", "value":"<bean:write name="bean" property="nonuser" filter="false" />" },

<%--     /** 任意経路の追加 */ --%>
  {"name":"addkeiro", "value":"<bean:write name="bean" property="addkeiro" filter="false" />" },

<%--     /** 後閲の許可*/ --%>
  {"name":"kouetu", "value":"<bean:write name="bean" property="kouetu" filter="false" />" },
<%--     /** 審議者への後閲指示の許可*/ --%>
  {"name":"kouetuSiji", "value":"<bean:write name="bean" property="kouetuSiji" filter="false" />" },

<%--     /** 経路使用条件リスト*/ --%>
<logic:notEmpty name="bean" property="inCondMap" >
  <logic:iterate name="bean" property="inCondMap" id="entry">
<%--     /** 経路使用条件区分 選択値*/ --%>
<%--     private SingleSelectModel condKbn__ = new SingleSelectModel(); --%>
      {"name":"inCond(<bean:write name="entry" property="key"/>).condKbn.selected", "value":"<bean:write name="entry" property="value.condKbn.selected" filter="false" />" },
<%--     /** 経路使用条件 入力値 フォームID*/ --%>
      {"name":"inCond(<bean:write name="entry" property="key"/>).formId", "value":"<bean:write name="entry" property="value.formId" filter="false" />" },
<%--     /** 経路使用条件 入力値 値*/ --%>
      {"name":"inCond(<bean:write name="entry" property="key"/>).formValue", "value":"<bean:write name="entry" property="value.formValue" filter="false" />" },
<%--     /** 経路使用条件 比較子*/ --%>
      {"name":"inCond(<bean:write name="entry" property="key"/>).comp.selected", "value":"<bean:write name="entry" property="value.comp.selected" filter="false" />" },
<%--     /** 経路使用条件 所属グループ*/ --%>
<%--     private MultiSelectModel selGrp__ = new MultiSelectModel(); --%>
    <logic:notEmpty name="entry" property="value.selGrp.selected">
      <logic:iterate name="entry" property="value.selGrp.selected" id="grpSid" type="String">
        {"name":"inCond(<bean:write name="entry" property="key"/>).selGrp.selected", "value":"<bean:write name="grpSid" filter="false" />" },
      </logic:iterate>
    </logic:notEmpty>
<%--     /** 経路使用条件 役職*/ --%>
<%--     private MultiSelectModel selPos__ = new MultiSelectModel(); --%>
    <logic:notEmpty name="entry" property="value.selPos.selected" >
      <logic:iterate name="entry" property="value.selPos.selected" id="posSid" type="String">
        {"name":"inCond(<bean:write name="entry" property="key"/>).selPos.selected", "value":"<bean:write name="posSid" filter="false" />" },
      </logic:iterate>
    </logic:notEmpty>
  </logic:iterate>
</logic:notEmpty>
<%--     /** 選択範囲 ユーザ選択*/ --%>
<logic:notEmpty name="bean" property="usrgroupselect.selected">
  <logic:iterate name="bean" property="usrgroupselect.selected" id="entry">
    <logic:notEmpty name="entry" property="value" >
      <logic:iterate name="entry" property="value" id="selected">
        {"name":"usrgroupselect.selected(<bean:write name="entry" property="key" filter="false" />)", "value":"<bean:write name="selected"  filter="false" />" },
      </logic:iterate>
    </logic:notEmpty>
  </logic:iterate>
</logic:notEmpty>

<%--     /** 選択範囲 グループ選択*/ --%>
<%--     private MultiSelectModel groupSel__ = new MultiSelectModel(); --%>
<logic:notEmpty name="bean" property="groupSel.selected" >
  <logic:iterate name="bean" property="groupSel.selected" id="selected">
    {"name":"groupSel.selected", "value":"<bean:write name="selected" filter="false" />" },
  </logic:iterate>
</logic:notEmpty>
<%--       /** 上長階層数*/ --%>
  {"name":"bossStepCnt", "value":"<bean:write name="bean" property="bossStepCnt" filter="false" />" },

<%--       /** 必須上長階層数*/ --%>
  {"name":"bossStepCntMin", "value":"<bean:write name="bean" property="bossStepCntMin" filter="false" />" },
 ]
}