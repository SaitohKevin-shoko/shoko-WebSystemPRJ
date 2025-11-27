<%@tag import="jp.groupsession.v2.rng.rng020.Rng020Keiro"%>
<%@tag import="jp.groupsession.v2.rng.rng020.Rng020KeiroBlock"%>
<%@tag import="org.apache.struts.util.LabelValueBean"%>
<%@tag import="jp.groupsession.v2.rng.rng110keiro.EnumKeiroKbn"%>
<%@ tag pageEncoding="utf-8" body-content="empty" description="稟議確認画面での経路追加設定部のタグ"%>
<%@ tag import="java.util.Map.Entry"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/gsform" prefix="gsform" %>
<%@ taglib tagdir="/WEB-INF/tags/ringi" prefix="ringi" %>

<%@ tag import="jp.groupsession.v2.cmn.GSConst" %>

<%@ attribute description="フォーム名" name="name" type="java.lang.String" required="true" rtexprvalue="true" %>
<%@ attribute description="設定用プロパティ名 Map" name="property" type="java.lang.String" required="true"  rtexprvalue="true"%>
<%@ attribute description="表示対象bean Rng020KeiroBlock" name="block" type="Rng020KeiroBlock" required="true"  rtexprvalue="true"%>
<%@ attribute description="確認モード" name="kakuninMode" type="java.lang.String" %>
  <div name="<%=property%>" class="keiroTable border_none">
    <% String reloadEv = "loadAddKeiroPopup();"; %>
    <div>
      <logic:notEmpty name="block" property="keiroMap">
        <logic:iterate name="block" property="keiroMap" id="entryTable" type="Entry" indexId="idx">
          <%
            String cellHiddenCls = "";
            if (((Rng020Keiro) entryTable.getValue()).getHidden() == 1) {
                cellHiddenCls = "hidden";
            }
            String border = "";
            if (idx != 0) {
                border = "bor_t1";
            }
          %>
          <div class="keiroChild <%=cellHiddenCls%> <%=border%> ">
            <table>
              <tr>
                <td class="w95 border_right_none border_bottom_none">
                  <ringi:rng020_keiroCell name="<%=name %>" property="<%= property + \".keiro(\" + idx + \")\"%>" bean="<%=(Rng020Keiro) entryTable.getValue() %>" kakuninMode="<%=kakuninMode %>" reloadEv="<%=reloadEv%>"/>
                </td>
                <td class="w5 border_right_none border_bottom_none txt_t">
                  <logic:empty name="kakuninMode">
                    <a href="#!" onClick="<%= block.outputDeleteRowSclipt(property, idx) + reloadEv %>">
                      <img class="btn_classicImg-display" src="../common/images/classic/icon_delete_2.gif">
                      <img class="btn_originalImg-display" src="../common/images/original/icon_delete.png">
                    </a>
                  </logic:empty>
                </td>
              </tr>
            </table>
          </div>
        </logic:iterate>
      </logic:notEmpty>
      <logic:empty name="kakuninMode">
        <div>
          <%
            String doScroll = "";
            if (block.getScrollY() > 0) {
                doScroll = block.outputDoScrollYSclipt();
            }
          %>
          <script>
            $(function () {
                  <%=doScroll %>
            });
          </script>
          <button type="button" value="<gsmsg:write key="rng.124"/>" class="baseBtn" onClick="<%= block.outputAddRowSclipt(property) + reloadEv%>">
            <img class="btn_classicImg-display" src="../common/images/classic/icon_add.png" alt="<gsmsg:write key="rng.rng020.02" />">
            <img class="btn_originalImg-display" src="../common/images/original/icon_add.png" alt="<gsmsg:write key="rng.rng020.02" />">
            <gsmsg:write key="rng.124"/>
          </button>
          <input type="hidden" name="<%=property + ".scrollY"%>" value="0" />
        </div>
      </logic:empty>
    </div>
  </div>
