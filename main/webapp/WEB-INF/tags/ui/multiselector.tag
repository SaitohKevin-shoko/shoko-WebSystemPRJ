<%@tag import="jp.groupsession.v2.cmn.ui.configs.GsMessageReq"%>
<%@ tag pageEncoding="utf-8" description="複数選択要素 配置タグ"%>
<%@ tag import="jp.groupsession.v2.cmn.GSConst"%>
<%@ tag import="jp.groupsession.v2.cmn.ui.parts.select.ISelector"%>


<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>
<%@ taglib tagdir="/WEB-INF/tags/common" prefix="common"%>

<%@ attribute description="フォーム名" name="name" type="String" required="true" %>
<%@ attribute description="選択要素UIモデル プロパティ名" name="property" type="String" required="true" %>
<%@ attribute description="class指定 高さを制限するclass指定がない場合表示が崩れる" name="styleClass" type="String" required="true" %>
<%@ attribute description="onchangeイベント" name="onchange" type="String"  rtexprvalue="true" %>

<bean:define id="ui" name="<%=name %>" property="<%=property %>" type="ISelector"/>

<common:loadscript src="../common/js/subform.js" patchVer="" />
<common:loadscript src="../common/js/ui/multiselector.js"  patchVer="" />
<common:loadscript src="../common/js/ui/multiselector_search.js"  patchVer="" />
<common:loadscript src="../common/js/overlapscroll.js" patchVer="" />
<common:loadscript src="../common/js/userpopup.js"  patchVer="" />


<bean:define id="thisForm" name="<%=name %>" />

<bean:define id="subformParam">
  {name:'selectorDispCmd', value:'init'},
  {name:'targetSelector', value:'<%=property %>'},
  {name:'formClsName', value:'<%=thisForm.getClass().getName() %>'},
  <logic:notEmpty name="ui" property="selectTargetKey">
    {name:'<%=property %>.selectTargetKey', value:'<%=ui.getSelectTargetKey() %>'},
  </logic:notEmpty>
</bean:define>
<fieldset class="<%=styleClass %>" name="<%=property %>" data-multiselector_init="{
    url:'../common/cmn360.do',
    param:[
      <bean:write name="subformParam" />
        ]
    }"
    onchange="<%=onchange %>"
    >
   <logic:notEmpty name="<%=name %>" property="<%=ui.getGroupSelectionParamName() %>">
     <html:hidden name="<%=name %>" property="<%=ui.getGroupSelectionParamName() %>" />
   </logic:notEmpty>
   <logic:notEmpty name="ui" property="selectMap">
     <logic:iterate id="entry" name="ui" property="selectMap">
       <logic:notEmpty name="entry" property="value.parameterName">
         <bean:define id="selectParam" name="entry" property="value.parameterName" type="String"/>
         <logic:notEmpty name="<%=name %>" property="<%=selectParam %>">
           <logic:iterate id="sid" name="<%=name %>" property="<%=selectParam %>">
             <html:hidden name="<%=name %>" property="<%=selectParam %>" value="<%=String.valueOf(sid) %>" />
           </logic:iterate>
         </logic:notEmpty>
       </logic:notEmpty>
     </logic:iterate>
   </logic:notEmpty>
   <div class="txt_m txt_c opacity6 verAlignMid pos_rel w100 h100">
     <img class="btn_classicImg-display pos_abs-centermiddle hp60" src="../common/images/classic/icon_loader.gif">
     <div class="loader-ball hp60 wp60 pos_abs-centermiddle"><span class=""></span><span class=""></span><span class=""></span></div>
   </div>
</fieldset>

