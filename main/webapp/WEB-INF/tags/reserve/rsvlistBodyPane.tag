<%@tag import="jp.groupsession.v2.rsv.rsv010.Rsv010Form"%>
<%@ tag pageEncoding="utf-8" body-content="scriptless" description="施設予約一覧 上部ボタンペイン"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>
<%@ taglib tagdir="/WEB-INF/tags/reserve" prefix="reserve"%>

<%@ attribute description="施設予約一覧系画面Formクラス thisFormを継承してればOK" name="thisForm" type="Rsv010Form" required="true" %>

  <div class="wrapper underFrame js_rsv_under_frame">
    <div class=" display_tbl w100 ">
      <div class="calendar_body">
        <jsp:doBody></jsp:doBody>
      </div>
      <!-- 表示外日時の一括選択情報 -->
      <logic:notEmpty name="thisForm" property="rsvIkkatuTorokuHiddenList">
        <div class="display_tbl_c txt_t txt_l wp200 pl5 rsv_ikkatutoroku_area border_top_none">
          <reserve:rsvIkkatuHiddenListPane thisForm="<%=thisForm %>"></reserve:rsvIkkatuHiddenListPane>
        </div>
      </logic:notEmpty>
    </div>
  </div>