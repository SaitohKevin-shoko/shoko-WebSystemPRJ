<%@tag import="java.util.Collection"%>
<%@tag import="java.lang.reflect.InvocationTargetException"%>
<%@tag import="org.apache.commons.beanutils.PropertyUtils"%>
<%@tag import="java.util.Enumeration"%>
<%@ tag pageEncoding="utf-8" body-content="empty" %>
<%@ tag import="java.util.Map.Entry"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/dandd" prefix="dandd" %>
<%@ taglib tagdir="/WEB-INF/tags/ringi" prefix="ringi" %>

<%@ tag import="jp.groupsession.v2.cmn.GSConst" %>

<%@ attribute description="フォーム名" name="name" type="java.lang.String" required="true" rtexprvalue="true" %>
<%@ attribute description="プロパティ名 Rng110Keiro" name="property" type="java.lang.String" required="true"  rtexprvalue="true"%>

<%
  Enumeration<String> enumParamName = (Enumeration<String>) request.getParameterNames();

  while (enumParamName.hasMoreElements()) {
    String paramName = enumParamName.nextElement();
    if (paramName.startsWith(property)) {
      Object obj = null;
      try {
        obj = PropertyUtils.getProperty(jspContext.findAttribute(name), paramName);
      } catch ( NoSuchMethodException ne) {
      } catch ( IllegalArgumentException iae) {
      } catch ( InvocationTargetException ite) {
      }
      if (obj == null) {
          continue;
      }
      %>
      <% if (obj.getClass().isArray()) {%>
        <logic:notEmpty name="<%=name%>" property="<%=paramName %>" >
        <logic:iterate id="item" name="<%=name%>" property="<%=paramName %>" >
          <input type="hidden" name="<%=paramName %>" value="<bean:write name="item"  />" />
        </logic:iterate>
        </logic:notEmpty>
      <% } else if (obj.getClass().isAssignableFrom(Collection.class)) { %>
        <logic:notEmpty name="<%=name%>" property="<%=paramName %>" >
        <logic:iterate id="item" name="<%=name%>" property="<%=paramName %>" >
          <input type="hidden" name="<%=paramName %>" value="<bean:write name="item"  />" />
        </logic:iterate>
        </logic:notEmpty>
      <% } else  { %>
        <html:hidden property="<%=paramName %>" value="<%= obj.toString() %>"/>
      <% } %>

      <%
    }
  }
%>