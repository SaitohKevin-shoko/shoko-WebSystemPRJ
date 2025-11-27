<%@ tag pageEncoding="utf-8" body-content="empty" description=" ドロップ範囲に要素が配置されていない場合のドロップ範囲の枠表示する" %>
<%@ taglib tagdir="/WEB-INF/tags/dandd" prefix="dandd" %>
<%@ attribute description="非表示フラグ" name="hidden" type="java.lang.String"  %>
<div class="drop_area-default dandd_dropArea default <%if (hidden != null) { %>display_none<% } %>" >
   <div>
     枠内に要素をドロップする
   </div>
</div>
