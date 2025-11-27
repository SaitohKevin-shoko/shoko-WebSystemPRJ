<%@tag import="java.io.File"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Temp"%>
<%@tag import="org.apache.struts.util.LabelValueBean"%>
<%@ tag pageEncoding="utf-8" description="グループ選択"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/gsform" prefix="gsform" %>

<%@ attribute description="フォーム名" name="name" type="java.lang.String"  rtexprvalue="true" required="true"%>
<%@ attribute description="プロパティ名 " name="property" required="true" type="java.lang.String" rtexprvalue="true"%>
<%@ attribute description="添付ファイル用フォームモデル" name="bean" type="Temp" rtexprvalue="true" %>
<%@ attribute description="確認モード " name="kakunin" type="String" rtexprvalue="true" %>
<%@ attribute description="サンプルの非表示、表のボディ内などで重複表示しないため " name="nonsample" type="String" rtexprvalue="true" %>
<%@ attribute description="モバイルモード" name="mhMode" type="java.lang.String" required="true" %>

<logic:empty name="bean">
  <bean:define id="bean" name="<%=name %>" property="<%=property %>"></bean:define>
</logic:empty>
<bean:define id="subDir" type="String" value=""></bean:define>
<logic:iterate id="dirPath" name="bean" property="tempPath.subDir">
  <bean:define id="subDir" ><bean:write name="subDir" /><bean:write name="dirPath" />/</bean:define>
</logic:iterate>

<logic:empty name="kakunin">
  <logic:equal name="mhMode" value="1">
    <span name="<%=property%>.tmp_file_area">
    <logic:notEmpty name="bean" property="fileList">
      <logic:iterate id="file" name="bean" property="fileList" indexId="idx" >
        <div style="width:100%;" name="<%=property%>.file_<bean:write name="file" property="value" />">
        <div class="del_file_txt"><bean:write name="file" property="label" /></div>
        <div name="<%=property%>.delFile_<bean:write name="file" property="value" />"
         fileId="<bean:write name="file" property="value" />" dirId="<%=bean.getTempPath().getTempDirId() %>"
         pluginId="<%=bean.getTempPath().getPluginId() %>"
         subDir="<%=subDir %>"
         onclick="cmn110Manager.delFile(this);" class="del_file_div btn_delete">&nbsp;&nbsp;</div>
        </div>
        <div style="clear:both;padding-top:10px;"></div>
      </logic:iterate>
    </logic:notEmpty>
    </span>
    <div align="center" style="clear:both;">
     <input type="button"  value="添付"
      onClick="cmn110Manager.tmpPopupMenu(this, arguments[0]);"
      data-theme="b"
      data-inline="true" data-role="button" data-icon="grid" data-iconpos="left"
      dirId="<%=bean.getTempPath().getTempDirId() + File.separator + subDir  %>" pluginId="<%=bean.getTempPath().getPluginId() %>"
       fileArea="<%=property%>.tmp_file_area" />
    </div>

      <logic:empty name="nonsample" >
      <logic:notEmpty name="bean" property="sampleList">
        <gsmsg:write key="cmn.download" /><gsmsg:write key="cmn.file" /><br />
        <table cellpadding="0" cellpadding="0" border="0">
          <logic:iterate id="templateFileData" name="bean" property="sampleList" type="LabelValueBean" >
            <tr>
              <td width="0"><img src="../common/images/classic/attachment.png" alt="ファイル"></td>
              <td class="menu_bun">
                <% String downloadUrl = bean.getBinDownloadUrl(templateFileData.getValue(), null); %>
                <a href="<%=downloadUrl %>" >
                  <span class="textLink"><bean:write name="templateFileData"  property="label" /></span>
                </a>
              </td>
            </tr>
          </logic:iterate>
        </table>
      </logic:notEmpty>
    </logic:empty>
  </logic:equal>
  <logic:equal name="mhMode" value="0">
    <logic:notEmpty name="bean" property="fileList" >
      <logic:iterate id="fileMdl" name="bean" property="fileList" type="LabelValueBean"  indexId="idx">
        <div class="form_tempfile_dsp" >
            <input name="<%= property + ".selectDelFileMbh(" + fileMdl.getValue()  + ")" %>" value="<gsmsg:write key="cmn.delete" />" type="submit" />
            <span class="textLink">
              <bean:write name="fileMdl" property="label" />
            </span>
            <br>
        </div>
      </logic:iterate>
    </logic:notEmpty>

  </logic:equal>
</logic:empty>
<logic:notEmpty name="kakunin">
    <logic:notEmpty name="bean" property="fileList" >
      <logic:iterate id="fileMdl" name="bean" property="fileList" type="LabelValueBean"  indexId="idx">
        <%
          String downloadUrl = bean.getBinDownloadUrl(fileMdl.getValue(), subDir);
          if (downloadUrl == null || downloadUrl.length() == 0) {
            downloadUrl = "#!"; // 遷移なし
          }
        %>
        <div class="form_tempfile_dsp" >
          <logic:equal name="mhMode" value="0">
            <span class="textLink">
              <bean:write name="fileMdl" property="label" />
            </span>
            <br>
          </logic:equal>
          <logic:notEqual name="mhMode" value="0">
            <img src="../common/images/classic/icon_temp_file_2.png" alt="<gsmsg:write key="cmn.file" />">
            <a href="<%=downloadUrl %>" >
              <span class="textLink"><bean:write name="fileMdl" property="label" /></span>
            </a>
            <br>
          </logic:notEqual>
        </div>
      </logic:iterate>
    </logic:notEmpty>
</logic:notEmpty>
