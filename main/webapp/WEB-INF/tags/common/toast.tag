<%@ tag pageEncoding="utf-8" description="トースト実装"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>
<%@ taglib tagdir="/WEB-INF/tags/common/" prefix="common" %>

<%@ attribute description="トーストID" name="toastId" type="String" required="true"%>
<common:loadscript src="../common/js/toastDisplay.js" />

<div class="pos_fix left0 top0 right0 display_inline toast hp0"></div>

<div id="<%=toastId %>" class="display_n mrl_auto">
  <div class='js_toastBody information_middle bgC_body p10 bor3 border_radius-toast'>
    <img class='original-display mr10' src='../common/images/original/icon_info.png'>
    <img class='classic-display mr10' src='../common/images/classic/icon_info.png'>
    <span class='js_toastMessage'><jsp:doBody /></span>
  </div>
</div>