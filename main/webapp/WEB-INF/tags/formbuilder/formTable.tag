<%@ tag pageEncoding="utf-8" body-content="empty" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/dandd" prefix="dandd" %>
<%@ taglib tagdir="/WEB-INF/tags/formbuilder" prefix="fb" %>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Block"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.FormBuilder"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.FormCell"%>
<%@tag import="java.util.List"%>
<%@tag import="jp.groupsession.v2.cmn.GSConst" %>
<%@tag import="java.util.Map.Entry"%>

<%@ attribute description="フォームテーブルを持つ Block" name="block" type="Block" required="true" %>
<%@ attribute description="body要素判別" name="bodyAddClass" type="String" %>
<span name="formTable" class="jsonArray">
  <dandd:table contentname="template" styleClass="<%=bodyAddClass + \" dropArea gsdandd_drop_theme\" %>" arrange="0">
    <logic:empty name="block" property="formTable">
      <dandd:defaultdrop />
    </logic:empty>
    <logic:notEmpty name="block" property="formTable">
      <dandd:defaultdrop hidden="hidden"/>
      <logic:iterate id="row" name="block" property="formTable" type="List " indexId="rowIdx">
        <dandd:row styleClass="jsonArray">
          <logic:notEmpty name="row">
            <logic:iterate id="cell" name="row" type="FormCell " indexId="colIdx">
              <dandd:cell formSid="<%=String.valueOf(((FormCell) jspContext.getAttribute(\"cell\")).getSid())%>" >
                <fb:dspContent tablename="template"  bean="<%=(FormCell) jspContext.getAttribute(\"cell\")%>" />
              </dandd:cell>
            </logic:iterate>
          </logic:notEmpty>
        </dandd:row>
      </logic:iterate>
    </logic:notEmpty>
  </dandd:table>
</span>