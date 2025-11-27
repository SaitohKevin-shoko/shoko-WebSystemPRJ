<%@ tag pageEncoding="utf-8" description="グループ選択"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/gsform" prefix="gsform" %>

<%@ attribute description="確認モード " name="kakunin" type="String" rtexprvalue="true" %>
<%@ attribute description="モバイルモード" name="mhMode" type="java.lang.String" required="true" %>


<logic:empty name="kakunin">
  <logic:equal name="mhMode" value="1">
    <div id="sp_cmn110_pop" style="display: none;">
      <div name="sp_cmn110_dialog_menu" class="tmppopupmenu">

        <div style="text-align:right;">
          <a href="#" onclick="cmn110Manager.tmpPopupMenu();" data-role="button" data-icon="delete" data-iconpos="notext">Close</a>
        </div>

        <div id="error_msg_area" name="error_msg_area" align="center"></div>

        <div align="center">
          <div name="fileUpArea" class="fieldcontain">
            <input type="file" name="cmn110file" data-clear-btn="true" disabled="disabled"/>
          </div>
        </div>

        <div style="padding-top:20px;"></div>

        <div id="progress_bar_wrapper" name="progress_bar_wrapper" align="center">
          <div id="progress_bar" name="progress_bar"></div>
        </div>

        <div id="progress_text_wrapper" name="progress_text_wrapper">
          <span id="progress_text" name="progress_text"></span>
        </div>

        <div align="center">
          <a href="#"  onClick="cmn110Manager.performAjaxSubmit();" data-role="button" data-icon="plus" data-inline="true"/>添付する</a>
        </div>

      </div>
    </div>
  </logic:equal>
</logic:empty>
