<%@ tag pageEncoding="utf-8" description="ドラッグ&ドロップ機能のCSSとjavascriptを読み込む
複数の機能から呼ばれる場合の２重読み込みを抑制している。"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ tag import="jp.groupsession.v2.cmn.GSConst" %>

<logic:notEqual name="danddInited" value="true" scope="request">
  <script src="../common/js/danddselect.js?<%= GSConst.VERSION_PARAM %>"></script>
  <bean:define id="danddInited" value="true" scope="request"></bean:define>
</logic:notEqual>