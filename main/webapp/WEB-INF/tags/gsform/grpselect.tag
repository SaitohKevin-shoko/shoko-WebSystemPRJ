<%@tag import="jp.co.sjts.util.StringUtil"%>
<%@tag import="jp.co.sjts.util.NullDefault"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.UserGroupSelectModel"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.GroupComboModel"%>
<%@tag import="java.util.List"%>
<%@tag import="org.apache.struts.util.LabelValueBean"%>
<%@tag import="java.util.Map.Entry"%>
<%@tag import="java.util.Map"%>
<%@ tag pageEncoding="utf-8" description="グループ選択"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/gsform" prefix="gsform" %>
<%@ taglib tagdir="/WEB-INF/tags/ui" prefix="ui" %>
<%@ taglib tagdir="/WEB-INF/tags/common" prefix="common" %>

<%@ attribute description="GroupComboModelをフィールドにもつ親bean タグファイルで使用の場合はこちら" name="bean" type="Object" rtexprvalue="true" %>
<%@ attribute description="bean名 フォームパラメータへの参照の場合" name="name" type="java.lang.String"  rtexprvalue="true" %>
<%@ attribute description="プロパティ名 GroupComboModel フォームパラメータへの参照の場合" name="property" required="true" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="スコープ フォームパラメータへの参照の場合" name="scope" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="グループ変更またはユーザ選択時の再描画イベント" name="onchange" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="確認モード" name="kakuninMode" type="java.lang.String" %>
<%@ attribute description="選択ボックス高さ " name="size" required="false" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="非表示モード" name="hiddenMode" type="java.lang.String" %>

<bean:define id="DSPMODE_KAKUNIN" value="0"/>
<bean:define id="DSPMODE_COMBO" value="1"/>
<bean:define id="DSPMODE_2BOXSEL" value="2"/>
<bean:define id="DSPMODE_HIDDEN" value="3"/>
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
<bean:define id="grpsel" name="<%=name %>" property="<%=property %>" type="GroupComboModel"/>
<%
  if (!StringUtil.isNullZeroString(kakuninMode)
      || (grpsel.getUseDialog() == UserGroupSelectModel.FLG_DIALOG_ON
      && grpsel.getMultiFlg() == UserGroupSelectModel.FLG_MULTI_ON)) {
    jspContext.setAttribute("dspMode", DSPMODE_KAKUNIN);
  } else if (grpsel.getMultiFlg() == UserGroupSelectModel.FLG_MULTI_ON) {
    jspContext.setAttribute("dspMode", DSPMODE_2BOXSEL);
  } else {
    jspContext.setAttribute("dspMode", DSPMODE_COMBO);
  }
  if (!StringUtil.isNullZeroString(hiddenMode)) {
    jspContext.setAttribute("dspMode", DSPMODE_HIDDEN);
  }

%>
<logic:equal name="dspMode" value="<%=DSPMODE_HIDDEN %>" >
  <logic:notEmpty name="grpsel" property="selectedLabel">
    <logic:iterate id="sel" name="grpsel" property="selectedLabel" type="LabelValueBean">
      <input type="hidden" name="<%=property + ".selected"  %>" value="<bean:write name="sel" property="value" />" />
    </logic:iterate>
  </logic:notEmpty>
</logic:equal>

<logic:equal name="dspMode" value="<%=DSPMODE_KAKUNIN %>" >
  <script>
    //表示メッセージリストの初期化
    if (typeof msglist_grpsel == 'undefined') {
      msglist_grpsel = new Array();
    }
    msglist_grpsel['cmn.cancel'] = '<gsmsg:write key="cmn.cancel"/>';
    if ($.fn.grpselect == undefined) {
      $.ajax({
        url: '../common/js/grpselect.js',
        dataType:'script',
        async:false
      });
    }
  </script>
  <bean:define id="isUseDialog_Multi" value="false" />
  <div class="grpsel_body js_grpsel_body">
    <logic:empty name="kakuninMode" >
      <div class="grpsel_add">
      <%-- 複数選択かつ、表要素内場合 詳細検索ダイアログによる選択ボタン --%>
      <% if (grpsel.getMultiFlg()  == UserGroupSelectModel.FLG_MULTI_ON) { %>
        <% grpsel.setParamName(property); %>
        <input type="hidden" name="<%=property  + ".paramName"%>"  value="<%=property%>"/>
        <input type="hidden" name="<%=property  + ".useSeigen"%>" value="<%=grpsel.getUseSeigen() %>" />

        <logic:notEmpty name="grpsel" property="selectable">
            <logic:iterate id="val" name="grpsel" property="selectable" >
                <input type="hidden" name="<%=property  + ".selectableGSID"%>" value="<%=val %>" />
            </logic:iterate>
        </logic:notEmpty>

        <button type="button"  name="<%= property + ".dialogBtn" %>" class="baseBtn js_usrgrpsel_selectBtn" onclick="$(this).grpselect({'cmd':'openSearchDialog'});" >
          <gsmsg:write key="cmn.select" />
        </button>
        <fieldset class="display_none">
          <ui:usrgrpselector name="<%=name%>" property="<%=property + \".innorSelector\" %>" onchange="$(this).grpselect({'cmd':'completeSearchDialog'});" styleClass="hp150" />
        </fieldset>
        <bean:define id="isUseDialog_Multi" value="true" />

      <% } %>
      <% if (grpsel.getMultiFlg()  == UserGroupSelectModel.FLG_MULTI_OFF) { %>

        <% String dlgClassMulti = "";
          if (grpsel.getMultiFlg()  == UserGroupSelectModel.FLG_MULTI_OFF) {
            dlgClassMulti = "single";
          } else {
            dlgClassMulti = "multi";
          }
        %>

        <button type="button"  name="<%= property + ".dialogBtn" %>" class="baseBtn" onclick="$(this).grpselect({'cmd':'openDialog'})" >
          <gsmsg:write key="cmn.select" />
        </button>
        <div name="<%= property + ".selectDialog_tmp" %>" type="dialog" class="grpsel_dialog <%=dlgClassMulti %>" class="display_n">
          <gsform:grpsel_dialogparams bean="<%=grpsel %>"></gsform:grpsel_dialogparams>
        </div>
      <% } %>
      </div>
    </logic:empty>
    <common:loadscript src="../common/js/subform.js" patchVer="" />
    <fieldset name="<%=property %>" class="grpsel_dsp js_grpsel_dsp"
      data-subform_init="{
          url:'../common/grpseldialog.do',
          param:[
            {name:'resultFlg', value:'result'},
            {name:'grpsel.paramName', value:'<%=property%>'},
            {name:'grpsel.useSeigen', value:'<%=grpsel.getUseSeigen()%>'},
            {name:'grpsel.useDialog', value:'0'},
            {name:'grpsel.multiFlg', value:'1'},
            <logic:notEmpty name="grpsel" property="selectable">
                <logic:iterate id="val" name="grpsel" property="selectable" >
                    {name:'grpsel.selectableGSID', value:'<%=val%>'},
                </logic:iterate>
            </logic:notEmpty>
              ],
          }"
     <%-- 詳細検索ダイアログによる選択の場合、内部のinputを送信対象外とする（非表示のユーザ選択とバッティングするため） --%>
     <logic:equal name="isUseDialog_Multi" value="true" >
       disabled
     </logic:equal>
    >
      <gsform:grpsel_result
        bean="<%=grpsel %>"
        name="<%=name %>"
        property="<%=property %>"
        scope="<%=scope %>"
        kakunin="<%=NullDefault.getString(kakuninMode, \"\") %>"
      />
    </fieldset>
  </div>
</logic:equal>
<logic:equal name="dspMode" value="<%=DSPMODE_2BOXSEL %>" >
  <%-- 描画前にフォームからの参照パラメータ名をセットする 現状javaビジネスロジック内では取得できないため --%>
  <% grpsel.setParamName(property); %>
  <input type="hidden" name="<%=property  + ".paramName"%>"  value="<%=property%>"/>
  <input type="hidden" name="<%=property  + ".useSeigen"%>" value="<%=grpsel.getUseSeigen() %>" />

  <logic:notEmpty name="grpsel" property="selectable">
      <logic:iterate id="val" name="grpsel" property="selectable" >
          <input type="hidden" name="<%=property  + ".selectableGSID"%>" value="<%=val %>" />
      </logic:iterate>
  </logic:notEmpty>

  <ui:usrgrpselector name="<%=name%>" property="<%=property + \".innorSelector\" %>" onchange="<%=onchange %>" styleClass="hp160" />

</logic:equal>
<logic:equal name="dspMode" value="<%=DSPMODE_COMBO%>" >
  <html:select name="<%=name %>" property="<%=property + \".selectedSingle\"  %>" onchange="<%=NullDefault.getString(onchange, \"\") %>" >
    <logic:iterate id="sel" name="grpsel" property="list" type="LabelValueBean">
      <html:option value="<%=sel.getValue() %>"><bean:write name="sel" property="label" /></html:option>
    </logic:iterate>
  </html:select>
</logic:equal>

