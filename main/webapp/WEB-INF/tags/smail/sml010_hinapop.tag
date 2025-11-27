
<%@tag import="java.util.List"%>
<%@tag import="java.util.Map"%>
<%@tag import="jp.groupsession.v2.usr.model.UsrLabelValueBean"%>
<%@ tag pageEncoding="utf-8" body-content="empty" description="ひな型選択ポップアップ タブボディ実装"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>

<%@ attribute description="タブID" name="tabId" type="String" required="true"%>
<%@ attribute description="ひな型情報一覧" name="hinaList" type="List" required="true"%>
<%@ attribute description="マークMap" name="imgMap" type="Map" required="true"%>
<%@ attribute description="表示p" name="disp" type="Boolean" %>


<bean:define id="notDisp" value="" />
<logic:equal name="disp" value="false">
  <bean:define id="notDisp" value="display_none"/>
</logic:equal>

      <table id="<%=tabId %>" class="table-top mt0 <%=notDisp%>">
        <tr class="display_none"><td colspan="2"></td></tr>
        <logic:empty name="hinaList">
          <tr class=""><td  colspan="2">
            <gsmsg:define id="msgarg1" msgkey="sml.sml010.03" type="String" />
            <bean:message key="error.not.exist.userid" arg0="<%=msgarg1 %>"/>
          </td></tr>
        </logic:empty>
        <logic:notEmpty name="hinaList">
          <logic:iterate id="hinaMdl" name="hinaList" indexId="hinaidx">
            <tr class="js_hinaSelTxt2 js_listHover cursor_p" data-hinaid="<bean:write name="hinaMdl" property="shnSid" />">
              <td class="border_right_none border_top_none">
                <%--  マーク --%>
                <bean:define id="imgMark"><bean:write name="hinaMdl" property="shnMark" /></bean:define>
                <% java.lang.String key = "none";  if (imgMap.containsKey(imgMark)) { key = imgMark; } %> <%= (java.lang.String) imgMap.get(key) %>
              </td>
              <td class="w100 border_left_none border_top_none js_hinaSelTxt3">
                <logic:notEmpty name="hinaMdl" property="shnBody">
                  <bean:define id="hinabdy" name="hinaMdl" property="shnBody" />
                </logic:notEmpty>
                <bean:write name="hinaMdl" property="shnHnameDsp" />
                <span class="tooltips display_none"><gsmsg:write key="cmn.subject" />：<bean:write name="hinaMdl" property="shnTitle" />
                  <gsmsg:write key="cmn.content" />：<bean:write name="hinaMdl" property="shnBody" filter="false"/>
                </span>
              </td>
            </tr>
          </logic:iterate>
        </logic:notEmpty>
      </table>
