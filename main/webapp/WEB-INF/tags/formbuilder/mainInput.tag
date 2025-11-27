<%@tag import="jp.groupsession.v2.cmn.GSConst"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.FormInputBuilder"%>
<%@ tag pageEncoding="utf-8"  %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/dandd" prefix="dandd" %>
<%@ taglib tagdir="/WEB-INF/tags/formbuilder" prefix="fb" %>
<%@ taglib tagdir="/WEB-INF/tags/gsform" prefix="gsform" %>
<%@ taglib tagdir="/WEB-INF/tags/common" prefix="cmn" %>

<%@ attribute description="フォーム名" name="name" type="java.lang.String" required="true" rtexprvalue="true" %>
<%@ attribute description="プロパティ名 FormBuilder" name="property" type="java.lang.String" required="true"  rtexprvalue="true"%>
<%@ attribute description="設定ダイアログアクション" name="dialogAction" type="java.lang.String"  rtexprvalue="true"%>
<%@ attribute description="確認モード" name="kakuninMode" type="java.lang.String" %>
<%@ attribute description="モバイルモード" name="mhMode" type="java.lang.String" %>
<%@ attribute description="ヘッダー行" name="header" fragment="true"%>
<%@ attribute description="フッター行" name="footer" fragment="true"%>
<%@ attribute description="表示モード" name="dspMode" type="java.lang.String" %>
<%@ attribute description="コメント表示フラグ" name="commentFlg" type="java.lang.String" %>


<bean:define id="block" name="<%=name %>" property="<%=property %>"  type="FormInputBuilder" />
<bean:define id="mbhClass" value="" />
<logic:empty name="mhMode">
  <link rel="stylesheet" href="../common/css/formbuilder.css" type="text/css" />
  <logic:empty name="kakuninMode">
    <cmn:loadscript src="../common/js/forminput.js" />
    <cmn:loadscript src="../common/js/formbuilder/usrgrpselect.js" />
  </logic:empty>
</logic:empty>
<logic:equal name="mhMode" value="1">
  <link rel="stylesheet" href="../mobile/sp/css/formbuilderMbl.css" type="text/css" />
  <logic:empty name="kakuninMode">
    <cmn:loadscript src="../mobile/sp/js/sp_cmn110.js" />
    <cmn:loadscript src="../mobile/sp/js/sp_forminput.js" />
  </logic:empty>
  <bean:define id="mbhClass" value="sp" />
</logic:equal>

<div class="formRoot border_right_none <bean:write name="mbhClass" />" style="min-width:initial;">
  <jsp:invoke fragment="header"></jsp:invoke>
  <fb:formTableInput  name="<%=name %>" property="<%=property %>" rowNo="0" block="<%=block %>" kakuninMode="<%=kakuninMode %>" mhMode="<%=mhMode %>" formJust="1" dspMode="<%=dspMode %>" commentFlg="<%=commentFlg %>">
  </fb:formTableInput>
  <jsp:invoke fragment="footer"></jsp:invoke>
</div>
<%-- モバイル用添付ファイル登録用ポップアップ 全添付要素で共通のものを使用するため --%>
<logic:equal name="mhMode" value="1">
  <logic:empty name="kakuninMode">
    <gsform:mbh_filetemp_popup mhMode="<%=mhMode %>"></gsform:mbh_filetemp_popup>
  </logic:empty>
</logic:equal>
