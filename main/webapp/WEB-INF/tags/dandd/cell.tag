<%@ tag pageEncoding="utf-8" description="ドロップ範囲内に配置された、ドラッグアンドドロップ要素のタグ" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib tagdir="/WEB-INF/tags/dandd" prefix="dandd" %>

<%@ attribute description="フォームSID" name="formSid" type="java.lang.String" %>
<%@ attribute description="クラス" name="styleClass" type="java.lang.String" rtexprvalue="true" %>

<div name="<%=formSid %>"  class="contents cell <%=styleClass %>" data-droped="true">
  <jsp:doBody />
  <dandd:droparea />
</div>