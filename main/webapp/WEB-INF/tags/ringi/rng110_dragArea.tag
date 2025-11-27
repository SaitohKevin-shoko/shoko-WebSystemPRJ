<%@tag import="jp.groupsession.v2.usr.model.UsrLabelValueBean"%>
<%@ tag pageEncoding="utf-8" body-content="empty" %>
<%@tag import="jp.groupsession.v2.rng.rng110keiro.IRng110KeiroDialogParam"%>

<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/dandd" prefix="dandd" %>
<%@ taglib tagdir="/WEB-INF/tags/ringi" prefix="ringi" %>

<%@ tag import="jp.groupsession.v2.cmn.GSConst" %>

<%@ attribute description="フォーム名" name="name" type="java.lang.String" required="true" rtexprvalue="true" %>
<%@ attribute description="プロパティ名 Rng110Keiro" name="property" type="java.lang.String" required="true"  rtexprvalue="true"%>

        <!-- 直接指定項目 -->
<!--         <div class="dragArea gsdandd_drag_theme"> -->
<%--            <html:select name="<%=name %>" property="<%=property + \".group.selected\" %>"  > --%>
<%--            <html:optionsCollection name="<%=name %>" property="<%=property + \".group.list\" %>"/> --%>
<%--            </html:select> --%>
<%--            <logic:iterate id="drags" name="<%=name %>" property="<%=property + \".simpleDrags\" %>" indexId="idx" type="IRng110KeiroDialogParam"> --%>
<%--              <ringi:rng110_dragContent contentname="simpleDrags" name="<%=name %>" property="<%=property + \".simpleDrags[\" + idx +\"]\" %>" index="<%=String.valueOf(idx) %>" > --%>
<%--              <jsp:attribute name="body"> --%>
<%--              <logic:equal name="drags" property="dragContentKbn" value="1"> --%>
<%--                 <logic:iterate id="user" name="drags" property="<%=\"usrgrouptarget.selectedList(target)\" %>" type="UsrLabelValueBean"> --%>
<%--                 <logic:equal name="user" property="useIconFlg" value="0"></logic:equal> --%>
<!--             ユーザ画像公開の場合  -->
<%--                 <logic:equal name="user" property="useIconFlg" value="1"><img src="../common/cmn100.do?CMD=getImageFile&cmn100binSid=<bean:write name="user" property="iconBinSid"/>"  alt="<gsmsg:write key="cmn.photo" />" border="1" width="25px" class="img_bottom"/></logic:equal> --%>
<%--                 <logic:equal name="user" property="useIconFlg" value="2"><img src="../user/images/photo.gif"  alt="<gsmsg:write key="cmn.photo" />" border="1" width="25px" height="28px" class="img_bottom"/></logic:equal> --%>
<%--                 <logic:equal name="user" property="useIconFlg" value="3"><span class="hikokai_photo-s hikokai_text syain_sel_check_img"><gsmsg:write key="cmn.private.photo" /></span></logic:equal> --%>

<%--                 </logic:iterate><bean:write name="drags" property="keiroName" /> --%>
<%--              </logic:equal> --%>
<%--              <logic:equal name="drags" property="dragContentKbn" value="2"> --%>
<%--              <img src="../common/images/classic/groupicon.gif" border="0"><bean:write name="drags" property="keiroName" /> --%>
<%--              </logic:equal> --%>
<%--              <logic:equal name="drags" property="dragContentKbn" value="3"> --%>
<%--              <bean:write name="drags" property="keiroName" /> --%>
<%--              </logic:equal> --%>
<%--              </jsp:attribute> --%>
<%--              </ringi:rng110_dragContent> --%>
<%--            </logic:iterate> --%>
<!--         </div> -->
<!--         <p> -->

<!-- 標準項目 -->
<div  class="dragArea gsdandd_drag_theme">
   <logic:iterate id="drags" name="<%=name %>" property="<%=property + \".basicDrags\" %>" indexId="idx" type="IRng110KeiroDialogParam">
     <ringi:rng110_dragContent contentname="basicDrags" name="<%=name %>" property="<%=property + \".basicDrags[\" + idx +\"]\" %>" index="<%=String.valueOf(idx) %>" parentselecter="#keiro_maker" />
   </logic:iterate>
</div>
