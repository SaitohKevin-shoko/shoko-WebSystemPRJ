<%@tag import="java.util.List"%>
<%@tag import="java.util.Map"%>
<%@tag import="jp.groupsession.v2.usr.model.UsrLabelValueBean"%>
<%@ tag pageEncoding="utf-8" body-content="empty" description="ファイル管理 削除確認ダイアログ"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>
<%@ attribute description="操作コメントパラメータ名" name="commentName" type="String" required="true"%>

    <div id="deleteFileDialog" title="" class="display_n">
      <ul class="p0 display_inline w100 pt10">
        <li class="mt5">
          <img class="header_pluginImg-classic" src="../main/images/classic/header_info.png" alt="cmn.warn">
          <img class="header_pluginImg" src="../common/images/original/icon_info_32.png" alt="cmn.warn">
        </li>
        <li class="pl10 word_b-all">
          <span id="deleteFileDialogMsgArea"></span>

          <div id="fileDeleteDialogCommentArea" class="mt20 p0">
            <span class="sub_title"><gsmsg:write key="fil.11" /></span>
            <% String deleteFileDialogMaxLengthValue = String.valueOf(jp.groupsession.v2.fil.GSConstFile.MAX_LENGTH_FILE_UP_CMT); %>
            <div class="ml10 lh120">
              <textarea name="deleteFileDialogComment" class="wp400 mb0" rows="3" onkeyup="showLengthStr(value, '<%= deleteFileDialogMaxLengthValue %>', 'deleteFileDialogInputLength');"></textarea>
              <div class="mt0 fs_12">
              <gsmsg:write key="cmn.current.characters" />:<span class="formCounter" id="deleteFileDialogInputLength">0</span>&nbsp;/&nbsp;<%= deleteFileDialogMaxLengthValue %>
              <gsmsg:write key="cmn.character" />
              </div>
            </div>
            <input type="hidden" name="deleteFileDialogCommentParamName" value="<bean:write name="commentName" />" />
          </div>
        </li>
      </ul>
    </div>
