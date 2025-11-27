<%@tag import="java.beans.IntrospectionException"%>
<%@tag import="java.beans.Introspector"%>
<%@tag import="java.util.Collection"%>
<%@tag import="java.beans.BeanInfo"%>
<%@tag import="java.beans.PropertyDescriptor"%>
<%@tag import="java.util.ArrayList"%>
<%@tag import="java.util.List"%>
<%@ tag pageEncoding="utf-8" description="beanパラメータをhidden出力"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>

<%@ attribute description="出力したいパラメータを扱うbean " name="bean" type="Object" rtexprvalue="true" required="true" %>
<%@ attribute description="出力したいパラメータを扱うbeanのクラス " name="beanClass" type="Class" rtexprvalue="true" %>
<%@ attribute description="hiddenパラメータ名にbeanへのpropertyを加える場合に入力する" name="property" type="java.lang.String"  rtexprvalue="true" %>

<%
BeanInfo beanInfo = null;
PropertyDescriptor[] propertyDescriptors = null;
List<String> properties = new ArrayList<String>();
if (beanClass == null) {
    beanClass = bean.getClass();
}
try
{
    // Beanクラスの情報を取得します。
    beanInfo = Introspector.getBeanInfo( beanClass );
    // Beanクラスのプロパティ全てを取得します。
    propertyDescriptors = beanInfo.getPropertyDescriptors();

    // プロパティそれぞれの、getter/setterを出力します。
    for( int iF1 = 0; iF1 < propertyDescriptors.length; ++iF1 )
    {
        if (propertyDescriptors[iF1].getReadMethod() != null
             && propertyDescriptors[iF1].getWriteMethod() != null
                ) {
            properties.add(propertyDescriptors[iF1].getName());
        }
    }
}
catch( IntrospectionException e )
{
    // IntrospectorクラスのgetBeanInfo()メソッドで例外が発生した場合
    // （JavaBeansじゃない場合とか）にはIntrospectionException例外が
    // 投げられます。
    throw e;
}
%>
<% if (propertyDescriptors != null && propertyDescriptors.length > 0) { %>
    <% for (PropertyDescriptor pd : propertyDescriptors) { %>
         <% String propName = "";
            if (property != null) {
                propName = property;
            }
            propName += pd.getName();
         %>
        <% if (pd.getReadMethod() != null && pd.getWriteMethod() != null) { %>
            <% if (pd.getPropertyType().isArray()) {%>
               <logic:notEmpty name="bean" property="<%=pd.getName() %>" >
               <logic:iterate id="obj" name="bean" property="<%=pd.getName() %>"  >
                   <input type="hidden" name="<%=propName %>" value="<bean:write name="obj"  />" />
               </logic:iterate>
               </logic:notEmpty>
            <% } else if (pd.getPropertyType().isAssignableFrom(Collection.class)) { %>
               <logic:notEmpty name="bean" property="<%=pd.getName() %>" >
               <logic:iterate id="obj" name="bean" property="<%=pd.getName() %>"  >
                   <input type="hidden" name="<%=propName %>" value="<bean:write name="obj"  />" />
               </logic:iterate>
               </logic:notEmpty>
            <% } else  { %>
                   <input type="hidden" name="<%=propName %>" value="<bean:write name="bean" property="<%=pd.getName() %>" />" />
            <% } %>
        <% } %>
    <% } %>
<% } %>
