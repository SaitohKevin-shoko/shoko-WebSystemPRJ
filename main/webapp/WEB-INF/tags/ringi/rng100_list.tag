<%@ tag pageEncoding="utf-8" body-content="empty" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ attribute description="フォーム名" name="name" type="java.lang.String" required="true" rtexprvalue="true" %>
<%@ attribute description="プロパティ名 templateList" name="property" type="java.lang.String" required="true"  rtexprvalue="true"%>
<table class="table-top w100">
  <tr>
    <th class="w100 table_title-color txt_c">
      <gsmsg:write key="rng.25" />
    </th>
  </tr>
  <logic:notEmpty name="<%=name%>" property="<%=property%>">
    <% int cmdmode_add = jp.groupsession.v2.rng.RngConst.RNG_CMDMODE_ADD; %>
    <% int cmdmode_edit = jp.groupsession.v2.rng.RngConst.RNG_CMDMODE_EDIT; %>
    <logic:iterate id="keiroTempData" name="<%=name%>" property="<%=property%>" indexId="idx">
      <tr class="js_listHover  cursor_p">
        <td class="w100 txt_l cl_linkDef" onClick="return selectChannelTemplate('<bean:write name="keiroTempData" property="rctSid" />', '<%= cmdmode_edit %>', '<bean:write name="keiroTempData" property="usrSid" />')">
          <bean:write name="keiroTempData" property="rctName" />
        </td>
      </tr>
    </logic:iterate>
  </logic:notEmpty>
</table>
