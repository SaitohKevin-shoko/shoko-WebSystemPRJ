<%@tag import="jp.groupsession.v2.rng.RngConst"%>
<%@ tag pageEncoding="utf-8" body-content="empty" description="経路のタグ構造の描画" %>
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
<%@ attribute description="確認モード" name="kakuninMode" type="java.lang.String" %>
<%@ attribute description="非表示" name="hidden" type="java.lang.String" %>
<%@ attribute description="個人用経路かどうか" name="keiroShareRange" type="Integer" %>

<%
  if (kakuninMode != null) {
%>
  <bean:define id="kakuninStr">kakunin</bean:define>
<%
  }
  if (keiroShareRange == null) {
      keiroShareRange = RngConst.RNG_TEMPLATE_SHARE;
  }
%>
<bean:define id="keiroMap">keiroMap</bean:define>
<bean:define id="finalKeiroMap">finalKeiroMap</bean:define>
<bean:define id="keiro">keiro</bean:define>
<bean:define id="finalKeiro">finalKeiro</bean:define>

<dandd:init />

<logic:notEqual name="kakuninStr" value="kakunin">
<script src="../ringi/js/rng110_keiro.js?<%= GSConst.VERSION_PARAM %>"></script>
</logic:notEqual>
<ringi:rng110_keiro_message/>

<% if (hidden == null) { %>
  <table id='keiro_maker' class="w100 keiro_maker <%=keiroShareRange == RngConst.RNG_TEMPLATE_PRIVATE? "personal" : ""%>">
<%} else { %>
  <table id='keiro_maker' class="w100 keiro_maker display_n <%=keiroShareRange == RngConst.RNG_TEMPLATE_PRIVATE? "personal" : ""%>">
<%} %>
  <tr>
    <logic:notEqual name="kakuninStr" value="kakunin">
      <td class="drag w25 border_none txt_t">
        <span class="text_pickUp-small">
          <gsmsg:write key="rng.rng090.07"/>
        </span>
        <div name="draglist" class="w100" >
          <ringi:rng110_dragArea name="<%=name %>" property="<%=property %>"/>
        </div>
      </td>
      <td class="w5 border_none" />
    </logic:notEqual>
    <td  valign="top"  class="drop w70 border_none">
      <div class="text_pickUp-small table_bg_style bgC_header2 p5">
        <gsmsg:write key="rng.42" />
      </div>
      <dandd:table contentname="<%=jspContext.getAttribute(\"keiro\").toString()%>" styleClass="dropArea gsdandd_drop_theme" arrange="1">
        <logic:notEqual name="kakuninStr" value="kakunin">
          <logic:empty name="<%=name %>" property="<%=property + \".\" + jspContext.getAttribute(\"keiroMap\").toString()%>">
            <dandd:defaultdrop />
          </logic:empty>
          <logic:notEmpty name="<%=name %>" property="<%=property + \".\" + jspContext.getAttribute(\"keiroMap\").toString()%>">
            <dandd:defaultdrop hidden="hidden" />
          </logic:notEmpty>
        </logic:notEqual>
        <logic:iterate id="entry" name="<%=name %>" property="<%=property + \".\" + jspContext.getAttribute(\"keiroMap\").toString()%>" type="Entry" indexId="idx">
          <bean:define id="entrykey" name="entry" property="key" type="String"/>
          <dandd:row >
            <dandd:cell formSid="<%=String.valueOf(jspContext.getAttribute(\"entrykey\").toString()) %>" >
              <logic:messagesPresent name="<%=\"err_\"+jspContext.getAttribute(\"keiro\").toString() + \"(\" + jspContext.getAttribute(\"entrykey\") + \")\" %>" message="false">
                 <table width="100%" border="0" cellpadding="0" cellspacing="0">
                   <tr>
                     <td class="txt_l">
                       <html:errors name="<%=\"err_\"+jspContext.getAttribute(\"keiro\").toString() + \"(\" + jspContext.getAttribute(\"entrykey\") + \")\" %>" /><br>
                     </td>
                   </tr>
                 </table>
              </logic:messagesPresent>
              <ringi:rng110_keiroDsp name="<%=name %>"
                property="<%=property + \".\" + jspContext.getAttribute(\"keiro\").toString() + \"(\" + jspContext.getAttribute(\"entrykey\") + \")\" %>"
                contentname="<%=jspContext.getAttribute(\"entrykey\").toString() %>"
                tablename="<%=jspContext.getAttribute(\"keiro\").toString()%>"
                keiroShareRange="<%=String.valueOf(keiroShareRange)%>"
                keiroRootType="0" />
            </dandd:cell>
          </dandd:row>
        </logic:iterate>
      </dandd:table>
      <br />
      <div class="text_pickUp-small table_bg_style bgC_header2 p5" >
        <gsmsg:write key="rng.35" />
      </div>
      <!-- Dropエリア -->
      <dandd:table contentname="<%=jspContext.getAttribute(\"finalKeiro\").toString()%>" styleClass="dropArea gsdandd_drop_theme saisyukakunin" arrange="1">
        <logic:notEqual name="kakuninStr" value="kakunin">
          <logic:empty name="<%=name %>" property="<%=property + \".\" + jspContext.getAttribute(\"finalKeiroMap\").toString()%>">
            <dandd:defaultdrop />
          </logic:empty>
          <logic:notEmpty name="<%=name %>" property="<%=property + \".\" + jspContext.getAttribute(\"finalKeiroMap\").toString()%>">
            <dandd:defaultdrop hidden="hidden" />
          </logic:notEmpty>
        </logic:notEqual>
        <logic:iterate id="entry" name="<%=name %>" property="<%=property + \".\" + jspContext.getAttribute(\"finalKeiroMap\").toString()%>" type="Entry" indexId="idx">
          <bean:define id="entrykey" name="entry" property="key" type="String"/>
            <dandd:row >
             <dandd:cell formSid="<%=String.valueOf(jspContext.getAttribute(\"entrykey\").toString()) %>" >
               <logic:messagesPresent name="<%=\"err_\"+jspContext.getAttribute(\"finalKeiro\").toString() + \"(\" + jspContext.getAttribute(\"entrykey\") + \")\" %>" message="false">
                 <table width="100%" border="0" cellpadding="0" cellspacing="0">
                   <tr>
                     <td class="txt_l">
                       <html:errors name="<%=\"err_\"+jspContext.getAttribute(\"finalKeiro\").toString() + \"(\" + jspContext.getAttribute(\"entrykey\") + \")\" %>" /><br>
                     </td>
                   </tr>
                 </table>
               </logic:messagesPresent>
               <ringi:rng110_keiroDsp name="<%=name %>"
                 property="<%=property + \".\" + jspContext.getAttribute(\"finalKeiro\").toString() + \"(\" + jspContext.getAttribute(\"entrykey\") + \")\" %>"
                 contentname="<%=jspContext.getAttribute(\"entrykey\").toString() %>"
                 tablename="<%=jspContext.getAttribute(\"finalKeiro\").toString()%>"
                 keiroShareRange="<%=String.valueOf(keiroShareRange)%>"
                 keiroRootType="1" />
             </dandd:cell>
          </dandd:row>
        </logic:iterate>
      </dandd:table>
    </td>
  </tr >
</table>

