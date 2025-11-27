<%@tag import="jp.groupsession.v2.cmn.formbuilder.EnumFormModelKbn"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Textarea"%>
<%@ tag pageEncoding="utf-8" description="Form要素をInput画面での表示tag"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/formbuilder" prefix="fb" %>
<%@ taglib tagdir="/WEB-INF/tags/gsform" prefix="gsform" %>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.FormCell"%>

<%@ attribute description="FormCell" name="bean" type="FormCell" required="true" %>
<%@ attribute description="要素名" name="contentName" required="true" %>
<logic:notEmpty name="bean" property="body.valueChangedEvList">
  <script>
    $(function() {
      <% if (bean.getType() == EnumFormModelKbn.textarea) {%>
        var select = 'textarea[name="<%=contentName + ".value" %>"]';
      <% } else {%>
        var select = 'input[name="<%=contentName + ".value" %>"]';
      <% } %>
      $(select).focus(function() {
        $(this).data('oldVal', $(this).val());
      });
      $(select).blur(function() {
        if ($(this).data('oldVal') !== $(this).val()) {
          <logic:iterate id="valueChangedEv" name="bean" property="body.valueChangedEvList">
          <bean:write name="valueChangedEv" filter="false"/>;
          </logic:iterate>
          }
        });
        <% if (bean.getType() == EnumFormModelKbn.date) { %>
          var onchange = function() {
          if ($(this).data('oldVal') !== $(this).val()) {
            <logic:iterate id="valueChangedEv" name="bean" property="body.valueChangedEvList">
              <bean:write name="valueChangedEv" filter="false"/>;
            </logic:iterate>
          }
        };
        $(select).data('onselect', onchange);
      <% } %>
    });
  </script>
</logic:notEmpty>
