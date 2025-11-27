<%@tag import="jp.groupsession.v2.cmn.GSConst"%>
<%@tag import="java.util.Map.Entry"%>
<%@tag import="jp.co.sjts.util.NullDefault"%>
<%@tag import="jp.co.sjts.util.StringUtil"%>
<%@tag import="jp.groupsession.v2.usr.model.UsrLabelValueBean"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.UserGroupSelectModel"%>
<%@tag import="java.util.List"%>
<%@tag import="org.apache.struts.util.LabelValueBean"%>
<%@tag import="java.util.Map.Entry"%>
<%@tag import="java.util.Map"%>
<%@ tag pageEncoding="utf-8" description="ユーザグループ選択"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/gsform" prefix="gsform" %>
<%@ taglib tagdir="/WEB-INF/tags/ui" prefix="ui" %>
<%@ taglib tagdir="/WEB-INF/tags/common" prefix="common" %>

<%@ attribute description="UsrGroupSelectModelをフィールドにもつ親bean タグファイルで使用の場合はこちら" name="bean" type="Object" rtexprvalue="true" %>
<%@ attribute description="bean名 フォームパラメータへの参照の場合" name="name" type="java.lang.String"  rtexprvalue="true" %>
<%@ attribute description="プロパティ名 UsrGroupSelectModel フォームパラメータへの参照の場合" name="property" required="true" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="スコープ フォームパラメータへの参照の場合" name="scope" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="グループ変更またはユーザ選択時のイベント" name="onchange" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="選択リストの高さ" name="size" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="ユーザグループ選択内 選択済みリスト(左側)定義 " name="leftLabelList" type="List" rtexprvalue="true"%>
<%@ attribute description="確認モード " name="kakunin" type="String" rtexprvalue="true" %>
<%@ attribute description="非表示モード" name="hiddenMode" type="java.lang.String" rtexprvalue="true" %>

<%
  String scopeStr = "";
  if (scope != null) {
    scopeStr = scope;
  }
  if (bean != null) {
    scopeStr = "page";
    name="bean";
  }
%>
<script>
  if (typeof openUserInfoWindow == 'undefined') {
    $.ajax({
      url: '../common/js/userpopup.js?<%= GSConst.VERSION_PARAM %>',
      dataType:'script',
      async:false
    });
  }
  //表示メッセージリストの初期化
  if (typeof msglist_usrgrpsel == 'undefined') {
    msglist_usrgrpsel = new Array();
  }
  msglist_usrgrpsel['cmn.cancel'] = '<gsmsg:write key="cmn.cancel"/>';

  if ($.fn.usrgrpselect == undefined) {
    $.ajax({
      url: '../common/js/formbuilder/usrgrpselect.js?<%= GSConst.VERSION_PARAM %>',
      dataType:'script',
      async:false
    });
  }
</script>
<bean:define id="usrgrpsel" name="<%=name %>" property="<%=property %>" type="UserGroupSelectModel"/>

<%
  String[] keys = usrgrpsel.getKeys();
  if ((keys == null || usrgrpsel.getKeys().length == 0) && leftLabelList == null) {
    usrgrpsel.addKey(UserGroupSelectModel.KEY_DEFAULT, "");
  }
 %>
<logic:empty name="hiddenMode">
  <% if (!StringUtil.isNullZeroString(kakunin) || usrgrpsel.getUseDialog() == UserGroupSelectModel.FLG_DIALOG_ON) {%>
  <bean:define id="isUseDialog_Multi" value="false" />
  <div class="usrgrpsel_body js_usrgrpsel_body">
    <% if (StringUtil.isNullZeroString(kakunin)) {%>
    <div class="usrgrpsel_add">
      <%-- 複数選択かつ、表要素内場合 詳細検索ダイアログによる選択ボタン --%>
      <% if (usrgrpsel.getMultiFlg()  == UserGroupSelectModel.FLG_MULTI_ON) { %>
        <% usrgrpsel.setParamName(property); %>
        <input type="hidden" name="<%=property  + ".paramName"%>"  value="<%=property%>"/>
        <input type="hidden" name="<%=property  + ".useSeigen"%>" value="<%=usrgrpsel.getUseSeigen() %>" />
        <logic:notEmpty name="usrgrpsel" property="selectable">
            <logic:iterate id="val" name="usrgrpsel" property="selectable" >
                <input type="hidden" name="<%=property  + ".selectable"%>" value="<%=val %>" />
            </logic:iterate>
        </logic:notEmpty>

        <button type="button"  name="<%= property + ".dialogBtn" %>" class="baseBtn js_usrgrpsel_selectBtn" onclick="$(this).usrgrpselect({'cmd':'openSearchDialog'});" >
          <gsmsg:write key="cmn.select" />
        </button>
        <fieldset class="display_none">
          <ui:usrgrpselector name="<%=name%>" property="<%=property + \".innorSelector\" %>" onchange="$(this).usrgrpselect({'cmd':'completeSearchDialog'});" styleClass="hp150" />
        </fieldset>
        <bean:define id="isUseDialog_Multi" value="true" />

      <% } %>
      <% if (usrgrpsel.getMultiFlg()  == UserGroupSelectModel.FLG_MULTI_OFF) { %>
        <% String dlgClassMulti = "";
           if (usrgrpsel.getMultiFlg()  == UserGroupSelectModel.FLG_MULTI_OFF) {
             dlgClassMulti = "single";
           } else {
             dlgClassMulti = "multi";
           }
        %>
        <button type="button"  name="<%= property + ".dialogBtn" %>" class="baseBtn" onclick="$(this).usrgrpselect({'cmd':'openDialog'})" >
          <gsmsg:write key="cmn.select" />
        </button>
        <div name="<%= property + ".selectDialog_tmp" %>" type="dialog" class="usrgrpsel_dialog display_n <%=dlgClassMulti %>">
          <gsform:usrgrpsel_dialogparams bean="<%=usrgrpsel %>"></gsform:usrgrpsel_dialogparams>
        </div>
      <% } %>
    </div>
    <% } %>
    <common:loadscript src="../common/js/subform.js" patchVer="" />
    <fieldset name="<%=property %>" class="usrgrpsel_dsp js_usrgrpsel_dsp"
      data-subform_init="{
          url:'../common/usrgrpseldialog.do',
          param:[
            {name:'resultFlg', value:'result'},
            {name:'usrgrpsel.paramName', value:'<%=property%>'},
            {name:'usrgrpsel.useSeigen', value:'<%=usrgrpsel.getUseSeigen()%>'},
            {name:'usrgrpsel.useDialog', value:'0'},
            {name:'usrgrpsel.multiFlg', value:'1'},
            <logic:notEmpty name="usrgrpsel" property="selectable">
                <logic:iterate id="val" name="usrgrpsel" property="selectable" >
                    {name:'usrgrpsel.selectable', value:'<%=val%>'},
                </logic:iterate>
            </logic:notEmpty>
            <logic:notEmpty name="usrgrpsel" property="banUsrSid">
                <logic:iterate id="val" name="usrgrpsel" property="banUsrSid" >
                    {name:'usrgrpsel.banUsrSid', value:'<%=val%>'},
                </logic:iterate>
            </logic:notEmpty>

              ],
          }"
     <%-- 詳細検索ダイアログによる選択の場合、内部のinputを送信対象外とする（非表示のユーザ選択とバッティングするため） --%>
     <logic:equal name="isUseDialog_Multi" value="true" >
       disabled
     </logic:equal>
    >
      <gsform:usrgrpsel_result
        bean="<%=usrgrpsel %>"
        name="<%=name %>"
        property="<%=property %>"
        scope="<%=scope %>"
        kakunin="<%=NullDefault.getString(kakunin, \"\") %>"
      />
    </fieldset>
  </div>
  <% } else if (usrgrpsel.getMultiFlg() == UserGroupSelectModel.FLG_MULTI_ON) {%>
    <% if (StringUtil.isNullZeroString(kakunin)) {%>
      <%-- 描画前にフォームからの参照パラメータ名をセットする 現状javaビジネスロジック内では取得できないため --%>
      <% usrgrpsel.setParamName(property); %>
      <input type="hidden" name="<%=property  + ".paramName"%>"  value="<%=property%>"/>
      <input type="hidden" name="<%=property  + ".useSeigen"%>" value="<%=usrgrpsel.getUseSeigen() %>" />
      <logic:notEmpty name="usrgrpsel" property="selectable">
          <logic:iterate id="val" name="usrgrpsel" property="selectable" >
              <input type="hidden" name="<%=property  + ".selectable"%>" value="<%=val %>" />
          </logic:iterate>
      </logic:notEmpty>
      <logic:notEmpty name="usrgrpsel" property="banUsrSid">
          <logic:iterate id="val" name="usrgrpsel" property="banUsrSid" >
              <input type="hidden" name="<%=property  + ".banUsrSid"%>" value="<%=val %>" />
          </logic:iterate>
      </logic:notEmpty>
      <ui:usrgrpselector name="<%=name%>" property="<%=property + \".innorSelector\" %>" onchange="<%=onchange %>" styleClass="hp160 " />

    <% }%>
  <% } else if (usrgrpsel.getMultiFlg() == UserGroupSelectModel.FLG_MULTI_OFF) {%>
    <% if (StringUtil.isNullZeroString(kakunin)) {%>
    <script>
      $(function() {<%=usrgrpsel.outputDoScrollYSclipt()%>});
    </script>
    <gsform:grpselect name="<%=name %>" property="<%=property + \".group\" %>"  scope="<%=scopeStr%>" onchange="<%=usrgrpsel.outputSetScrollYSclipt(property) + onchange %>"/>
    <html:select   name="<%=name %>" property="<%=property + \".selectedSingle\" %>" value="<%=usrgrpsel.getSelectedSingle()%>">
      <logic:iterate name="usrgrpsel" property="allList" id="usr" type="UsrLabelValueBean" >
        <option value="<%=usr.getValue() %>" class="<%=usr.getCSSClassNameOption() %>" <%= (usr.getValue().equals(usrgrpsel.getSelectedSingle()))? "selected" : "" %> >
          <bean:write name="usr" property="label"/>
        </option>
      </logic:iterate>
    </html:select>
    <% }%>
  <% } %>
</logic:empty>
<logic:notEmpty name="hiddenMode">
  <logic:notEmpty name="usrgrpsel" property="selectedListName">
    <logic:iterate id="entry" name="usrgrpsel" property="selectedListName" type="Entry">
      <logic:iterate id="user" name="usrgrpsel" property="<%=\"selectedList(\" + entry.getKey() +  \")\"%>" type="UsrLabelValueBean">
        <input type="hidden" name="<%= property + ".selected(" + entry.getKey() +  ")" %>" value="<%=user.getValue() %>" class="selected" />
      </logic:iterate>
    </logic:iterate>
  </logic:notEmpty>
</logic:notEmpty>
