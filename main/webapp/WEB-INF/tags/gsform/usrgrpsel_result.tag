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

<%@ attribute description="UsrGroupSelectModelをフィールドにもつ親bean タグファイルで使用の場合はこちら" name="bean" type="Object" rtexprvalue="true" %>
<%@ attribute description="bean名 フォームパラメータへの参照の場合" name="name" type="java.lang.String"  rtexprvalue="true" %>
<%@ attribute description="プロパティ名 UsrGroupSelectModel フォームパラメータへの参照の場合" name="property" required="true" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="スコープ フォームパラメータへの参照の場合" name="scope" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="確認モード " name="kakunin" type="String" rtexprvalue="true" %>

<bean:define id="usrgrpsel" name="<%=name %>" property="<%=property %>" type="UserGroupSelectModel"/>

 <logic:notEmpty name="usrgrpsel" property="selectedListName">
   <logic:iterate id="entry" name="usrgrpsel" property="selectedListName" type="Entry">
     <div class="usrgrpsel selected row" >
       <div>
         <bean:write name="entry" property="value" />
       </div>
       <logic:iterate id="user" name="usrgrpsel" property="<%=\"selectedList(\" + entry.getKey() +  \")\"%>" type="UsrLabelValueBean">
         <div class="usrgrpsel selected cell hp30" >
           <input type="hidden" name="<%= property + ".selected(" + entry.getKey() +  ")" %>" value="<%=user.getValue() %>" class="selected" />
           <div class="verAlignMid hp30">
           <% if (!StringUtil.isNullZeroString(kakunin)) {%>
           <% if (!user.getValue().startsWith("G")) { %>
           <% if (user.getUseIconFlg() == UsrLabelValueBean.ICON_FLG_DEF) { %>
           <img name="userImage" class="wp25 btn_classicImg-display" alt="<gsmsg:write key="cmn.photo" />" src="../common/images/classic/icon_photo.gif">
           <img name="userImage" class="wp25 btn_originalImg-display" alt="<gsmsg:write key="cmn.photo" />" src="../common/images/original/photo.png">
           <% } %>
           <% if (user.getUseIconFlg() == UsrLabelValueBean.ICON_FLG_NOTPUBLIC) { %>
           <div class="hikokai_photo-s hikokai_text txt_c cl_fontWarn">非公</div>
           <% } %>
           <% if (user.getUseIconFlg() == UsrLabelValueBean.ICON_FLG_USE) { %>
           <img class="wp25" src="../common/cmn100.do?CMD=getImageFile&cmn100binSid=<bean:write name='user' property='iconBinSid' />" alt="<gsmsg:write key="cmn.photo" />" />
           <% } %>
           <span class="ml5">
           <logic:equal  name="user" property="jkbn" value="0">
             <a href="#!" onClick="openUserInfoWindow(<bean:write name="user" property="value" />);">
               <span class="<%=user.getCSSClassNameOption() %>"><bean:write name="user" property="label" /></span>
             </a>
           </logic:equal>
           <logic:notEqual  name="user" property="jkbn" value="0">
             <del>
               <span class="<%=user.getCSSClassNameOption() %>"><bean:write name="user" property="label" /></span>
             </del>
           </logic:notEqual>
           </span>
           <% } else { %>
           <img  class="wp25 btn_classicImg-display" src="../common/images/classic/header_group.png" name="groupImage" alt="<gsmsg:write key="cmn.photo" />" />
           <img  class="wp25 btn_originalImg-display" src="../common/images/original/icon_group_32.png" name="groupImage" alt="<gsmsg:write key="cmn.photo" />" />
           <span class="ml5">
           <logic:equal  name="user" property="jkbn" value="0">
             <bean:write name="user" property="label" />
           </logic:equal>
           <logic:notEqual  name="user" property="jkbn" value="0">
             <del>
               <bean:write name="user" property="label" />
             </del>
           </logic:notEqual>
           </span>
           <% } %>
           <% } %>
           </div>
           <% if (StringUtil.isNullZeroString(kakunin)) {%>
           <span class="<%=user.getCSSClassNameOption() %>">
             <bean:write name="user" property="label" />
           </span>
           <img class="btn_classicImg-display delButton cursor_p ml5" src="../common/images/classic/icon_delete_2.gif" onclick="$(this).usrgrpselect({'cmd':'deleteSelect'});">
           <img class="btn_originalImg-display delButton cursor_p ml5" src="../common/images/original/icon_delete.png" onclick="$(this).usrgrpselect({'cmd':'deleteSelect'});">
           <% } %>
         </div>
       </logic:iterate>
     </div>
   </logic:iterate>
 </logic:notEmpty>
