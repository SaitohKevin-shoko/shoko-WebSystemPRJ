<%@tag import="jp.groupsession.v2.cmn.formbuilder.FormCell"%>
<%@tag import="java.util.List"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Block"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.FormInputBuilder"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Comment"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.EnumFormModelKbn"%>
<%@ tag pageEncoding="utf-8"  %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/dandd" prefix="dandd" %>
<%@ taglib tagdir="/WEB-INF/tags/formbuilder" prefix="fb" %>

<%@ attribute description="Block" name="block" type="Block" required="true"%>
<%@ attribute description="フォーム名" name="name" type="java.lang.String" required="true" rtexprvalue="true" %>
<%@ attribute description="プロパティ名 FormBuilder" name="property" type="java.lang.String" required="true"  rtexprvalue="true"%>
<%@ attribute description="行番号" name="rowNo" type="Integer" required="true" %>
<%@ attribute description="設定ダイアログアクション" name="dialogAction" type="java.lang.String"  rtexprvalue="true"%>
<%@ attribute description="確認モード" name="kakuninMode" type="java.lang.String" %>
<%@ attribute description="モバイルモード" name="mhMode" type="java.lang.String" %>
<%@ attribute description="フォーム直下フラグ" name="formJust" type="Integer" required="true" %>
<%@ attribute description="表示モード" name="dspMode" type="java.lang.String" %>
<%@ attribute description="コメント表示フラグ" name="commentFlg" type="java.lang.String" %>

<div class="formTable">
  <logic:notEmpty name="block" property="formTable">
    <bean:define id="divDisp" value="0"/>
    <% boolean addBorderFlg = false; %>
    <logic:iterate id="row" name="block" property="formTable" type="List" indexId="rowIdx">
      <logic:equal name="divDisp" value="0">
        <div class="formRow bor_r1 display_flex">
      </logic:equal>
      <logic:notEmpty name="row">
        <logic:iterate id="cell" name="row" type="FormCell " indexId="colIdx">
          <bean:define id="flg" value="0"/>
          <logic:equal name="formJust" value="1">
            <% FormCell bean = (FormCell) jspContext.getAttribute("cell");%>
            <% if (bean.getType() == EnumFormModelKbn.label) { %>
            <%   int notitle =((Comment)bean.getBody()).getNotitle();%>
            <%   if (notitle == 1) { %>
              <bean:define id="flg" value="1"/>
              <bean:define id="divDisp" value="1"/>
            </div>
            <% int valign =((Comment)bean.getBody()).getValign();%>
            <% addBorderFlg = true; %>
            <% if (valign == 0) { %>
            <div class="formRow label ueyose">
              <%= ((Comment) bean.getBody()).dspValueHTML()%>
              <logic:notEmpty name="mhMode" >
                <br>&nbsp;
              </logic:notEmpty>
            <% } else {%>
              <div class="formRow label sitayose">
                <logic:notEmpty name="mhMode" >
                  <br>
                </logic:notEmpty>
            <%= ((Comment) bean.getBody()).dspValueHTML()%>
            <%     }%>
            <%   }%>
            <% }%>
             </logic:equal>
             <logic:equal name="flg" value="0">
               <logic:equal name="divDisp" value="1">
                 <bean:define id="divDisp" value="0"/>
               </div>
               <% if (addBorderFlg) { %>
                 <div class="formRow bor_r1 bor_t1">
                 <% addBorderFlg = false; %>
               <% } else { %>
                 <div class="formRow bor_r1">
               <% } %>
                 </logic:equal>
                 <fb:dspContentInput name="<%=name %>" property="<%=property %>"
                 rowNo="<%=rowNo %>"
                 bean="<%=(FormCell) jspContext.getAttribute(\"cell\")%>"
                 kakuninMode="<%=kakuninMode %>"
                 mhMode="<%=mhMode %>" formJust="<%=formJust %>" />
                </logic:equal>
              </logic:iterate>
            </logic:notEmpty>
            <logic:equal name="divDisp" value="0">
              </div>
            </logic:equal>
          </logic:iterate>
        <logic:equal name="divDisp" value="1">
        <bean:define id="divDisp" value="0"/>
      </div>
      <% if (kakuninMode == "kakunin" && dspMode == "rng030" && commentFlg == "true") { %>
        <div class="bor_b1 w100"></div>
      <% } %>
    </logic:equal>
  </logic:notEmpty>
</div>
