<%@ tag pageEncoding="utf-8" description="FormBuilder要素以外に追加表示する要素用タグ" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/formbuilder" prefix="fb" %>
<%@ taglib tagdir="/WEB-INF/tags/gsform" prefix="gsform" %>

<%@ attribute description="タイトル文字列" name="title" required="true" fragment="true" %>
<%@ attribute description="コンテンツJSP" name="body"  required="true" fragment="true" %>
<%@ attribute description="必須フラグ" name="requireFlg" type="String" %>
<%@ attribute description="確認モード" name="kakuninMode" type="String" %>

<div class="formBlock ">
  <div class="form_title ">
  <span class=""><jsp:invoke fragment="title" ></jsp:invoke></span>
  <% if (requireFlg != null && kakuninMode == null) { %>
    <span class="cl_fontWarn">
      <gsmsg:write key="cmn.comments" />
    </span>
  <% } %>
  </div>
  <div class="formContent bgC_body">
    <jsp:invoke fragment="body"></jsp:invoke>
  </div>
</div>