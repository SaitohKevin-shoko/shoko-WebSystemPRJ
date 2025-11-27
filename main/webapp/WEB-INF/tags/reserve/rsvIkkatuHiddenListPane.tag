<%@tag import="jp.groupsession.v2.cmn.GSConst"%>
<%@tag import="jp.groupsession.v2.rsv.rsv010.Rsv010Form"%>
<%@ tag pageEncoding="utf-8" description="施設予約一覧 一括選択選択ペイン"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>
<%@ taglib tagdir="/WEB-INF/tags/reserve" prefix="reserve"%>


<%@ attribute description="施設予約一覧系画面Formクラス " name="thisForm" type="Rsv010Form" required="true"%>


  <div class="verAlignMid cal_header bor1 wp195 pl5 pr5">
    <span class="fw_b ">
      <gsmsg:write key="reserve.20" />
    </span>
    <button type="button" value="<gsmsg:write key="reserve.21" />" class="mailMenu_button ml_auto" onclick="buttonPush('allClear');" >
        <gsmsg:write key="reserve.21" />
    </button>
  </div>
  <div class="bor1 border_top_none pl5 pr5 pt5 bgC_tableCell">
    <reserve:rsvIkkatuHiddenList_body thisForm="<%=thisForm %>" useDelBtn="true"></reserve:rsvIkkatuHiddenList_body>
  </div>
