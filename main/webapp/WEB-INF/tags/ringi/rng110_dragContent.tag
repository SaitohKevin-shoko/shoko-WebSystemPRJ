<%@tag import="jp.groupsession.v2.rng.rng110keiro.IRng110KeiroDialogParam"%>
<%@ tag pageEncoding="utf-8" body-content="empty" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib tagdir="/WEB-INF/tags/dandd" prefix="dandd" %>
<%@ taglib tagdir="/WEB-INF/tags/ringi" prefix="ringi" %>

<%@ attribute description="コンテンツ識別名" name="contentname" type="java.lang.String" required="true" rtexprvalue="true" %>
<%@ attribute description="インデックス" name="index" type="java.lang.String"  rtexprvalue="true" %>
<%@ attribute description="bean名" name="name" type="java.lang.String" rtexprvalue="true" %>
<%@ attribute description="プロパティ名 Rng110KeiroParamModel" name="property" type="java.lang.String"   rtexprvalue="true"%>
<%@ attribute description="要素ボディ" name="body" fragment="true" %>
<% if (name != null && name.length() > 0) {%>
  <bean:define id="bean" name="<%=name %>" property="<%=property %>" type="IRng110KeiroDialogParam"/>
<% } %>

<%@ attribute description="親要素 セレクタ" name="parentselecter" type="java.lang.String"   rtexprvalue="true"%>
<% String dragName = contentname;
   if (index != null && index.length() > 0) {
       dragName += "(" + index + ")";
   }
%>
<div class="drag_content_parent" name="<%=dragName %>">
<script>
   //コンテンツ要素をjsonから生成し設定
   $(function() {
   var select = '';
   <% if (parentselecter != null && parentselecter.length() > 0) { %>
   select = '<%=parentselecter %> ';
   <% } %>
   select = select + 'div[name="<%=dragName%>"]'
   var cell = $(select);
   var content = cell.data('content');
   var contentJson = <ringi:rng110_contentjson name="<%=name %>" property="<%=property %>" contentname="<%=dragName%>" />;
   content = $.extend(true, content , contentJson);
   cell.data('content', content);
   });
</script>

<%if (body == null) { %>
  <div class="drag_moveContent">
    <img class="btn_classicImg-display" src="../common/images/classic/icon_dand.gif">
    <img class="btn_originalImg-display" src="../common/images/original/icon_dand.png">
    &nbsp;<bean:write name="<%=name %>" property="<%=property + \".keiroName\" %>" />
  </div>
<%} else {%>
  <jsp:invoke fragment="body" />
<%} %>
</div>
