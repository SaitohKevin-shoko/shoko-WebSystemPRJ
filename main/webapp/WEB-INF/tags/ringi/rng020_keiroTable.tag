<%@tag import="jp.groupsession.v2.rng.rng020.Rng020Keiro"%>
<%@tag import="jp.groupsession.v2.rng.rng020.Rng020KeiroBlock"%>
<%@tag import="jp.groupsession.v2.rng.RngConst"%>
<%@tag import="org.apache.struts.util.LabelValueBean"%>
<%@tag import="jp.groupsession.v2.rng.rng110keiro.EnumKeiroKbn"%>
<%@ tag pageEncoding="utf-8" body-content="empty" description="稟議申請画面での経路設定部のタグ"%>
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
<%@ attribute description="プロパティ名 Rng110Keiro" name="property" type="java.lang.String" required="true"  rtexprvalue="true"%>
<%@ attribute description="確認モード" name="kakuninMode" type="java.lang.String" %>
<%@ attribute description="確認経路非表示フラグ" name="notdspKakuninKeiro" type="java.lang.String" %>
<%@ attribute description="確認経路タイトル非表示フラグ" name="notdspKeiroTitle" type="java.lang.String" %>

<logic:notEmpty name="<%=name %>" property="<%=property + \"Map\"%>">
  <logic:iterate id="entry" name="<%=name %>" property="<%=property  + \"Map\" %>" type="Entry">
    <% String propertyName = property + "("+ entry.getKey() +")"; %>
    <bean:define id="block" name="entry" property="value" type="Rng020KeiroBlock" />
    <input type="hidden" name="<%=propertyName + ".skipKyoka"%>" value="<bean:write name="block" property="skipKyoka"/>" />
    <input type="hidden" name="<%=propertyName + ".apprFlg"%>" value="<bean:write name="block" property="apprFlg"/>" />
    <input type="hidden" name="<%=propertyName + ".hidden"%>" value="<bean:write name="block" property="hidden"/>" />
    <% String skipped = ""; %>
    <logic:equal name="block" property="skipKyoka" value="<%=String.valueOf(RngConst.RNG_ABLE_SKIP) %>" >
      <% skipped = "skipped"; %>
    </logic:equal>
    <%
      String hiddenCls = "";
      if (block.getHidden() == 1) {
        hiddenCls = "hidden";
      }
    %>
    <logic:empty name="notdspKakuninKeiro">
      <div class="keiroTable row <%=hiddenCls %> <%=skipped %>" name="<%=propertyName%>" >
        <div class="keiroTable title txt_l fw_b verAlignMid p5 bgC_body">
          <logic:empty name="notdspKeiroTitle">
            <gsmsg:write key="<%=EnumKeiroKbn.valueOf(block.getKeiroKbn()).getMsgKey() %>" />
            <bean:define id="drawOut" value="0" />
            <logic:equal name="block" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.USERSEL_VAL)%>">
              <bean:define id="drawOut" value="1" />
            </logic:equal>
            <logic:equal name="block" property="keiroKbn" value="<%=String.valueOf(EnumKeiroKbn.GROUPSEL_VAL)%>">
              <bean:define id="drawOut" value="1" />
            </logic:equal>
            <logic:equal value="1" name="drawOut">
              <logic:equal value="2" name="block" property="pref.outcondition">
                <br>
                <gsmsg:write key="rng.rng110.11"/>:
                <gsmsg:write key="rng.rng020.10" arg0="<%=block.getPref().getOutcond_threshold() %>"/>
              </logic:equal>
            </logic:equal>
          </logic:empty>
          <logic:empty name="kakuninMode">
            <br>
            <bean:write name="block" property="pref.keiroComment"/>
          </logic:empty>
        </div>
        <% if (block.getKeiroKbn() == EnumKeiroKbn.FREESET_VAL) {%>
          <% String reloadEv = "buttonPush('reload');"; %>
          <div class="txt_l p5 bgC_body">
            <logic:notEmpty name="block" property="keiroMap">
              <logic:iterate name="block" property="keiroMap" id="entryTable" type="Entry" indexId="idx">
                <%
                  String cellHiddenCls = "";
                   if (((Rng020Keiro) entryTable.getValue()).getHidden() == 1) {
                     cellHiddenCls = "hidden";
                  }
                %>
                <div class="keiroChild <%=cellHiddenCls%> ">
                  <logic:notEmpty name="entryTable" property="value.dspSingiList">
                    <ringi:rng020KeiroKakuninCell  name="<%=name %>" property="<%= propertyName + \".keiro(\" + idx + \")\"%>" bean="<%=(Rng020Keiro) entryTable.getValue() %>"  />
                  </logic:notEmpty>
                  <logic:empty name="entryTable" property="value.dspSingiList">
                    <div class="selectDsp">
                      <ringi:rng020_keiroCell name="<%=name %>" property="<%= propertyName + \".keiro(\" + idx + \")\"%>" bean="<%=(Rng020Keiro) entryTable.getValue() %>" kakuninMode="<%=kakuninMode %>"/>
                      <logic:empty name="kakuninMode">
                        <div>
                          <div>
                            <img name="<%=property %>.deleteRow" class="cursor_p btn_classicImg-display" src="../common/images/classic/icon_delete_2.gif" onclick="<%= block.outputDeleteRowSclipt(propertyName, idx) + reloadEv %>">
                            <img name="<%=property %>.deleteRow" class="cursor_p btn_originalImg-display" src="../common/images/original/icon_delete.png" onclick="<%= block.outputDeleteRowSclipt(propertyName, idx) + reloadEv %>">
                          </div>
                          <div class="mt15 keiro_moveButton">
                            <div>
                              <button type="button" class="webIconBtn plr0 ml0" onclick="<%= block.outputUpRowSclipt(propertyName, idx) + reloadEv %>">
                                <img name="<%=property %>.upRow" class="cursor_p btn_classicImg-display" src="../common/images/classic/icon_arrow_u.png">
                                <i name="<%=property %>.upRow" class="fs_20 icon-up cursor_p btn_originalImg-display"></i>
                              </button>
                            </div>
                            <div class="mt5">
                              <button type="button" class="webIconBtn plr0 ml0" onclick="<%= block.outputDownRowSclipt(propertyName, idx) + reloadEv %>">
                                <img name="<%=property %>.downRow"  class="cursor_p btn_classicImg-display" src="../common/images/classic/icon_arrow_d.png">
                                <i name="<%=property %>.downRow" class="fs_20 icon-down cursor_p btn_originalImg-display"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </logic:empty>
                    </div>
                  </logic:empty>
                </div>
              </logic:iterate>
            </logic:notEmpty>
            <logic:empty name="kakuninMode">
              <div class="keiroAdd">
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
                <a href="#!" class="js_addLink" onclick="<%= block.outputAddRowSclipt(propertyName) + reloadEv%>">
                  <gsmsg:write key="rng.124"/>
                </a>
              </div>
            </logic:empty>
          </div>
        <% } else { %>
          <div class="txt_l p5 bgC_body">
            <div class="keiroChild">
              <logic:empty name="block" property="keiroSingle.dspSingiList">
                <div class="selectDsp">
                  <ringi:rng020_keiroCell name="<%=name %>" property="<%= propertyName + \".keiroSingle\"%>" bean="<%=block.getKeiroSingle() %>" kakuninMode="<%=kakuninMode %>" isKbnDraw="not"/>
                  <logic:empty name="kakuninMode">
                    <div class="wp20">&nbsp;</div>
                  </logic:empty>
                </div>
              </logic:empty>
              <logic:notEmpty  name="block" property="keiroSingle.dspSingiList">
                <ringi:rng020KeiroKakuninCell name="<%=name %>" property="<%= propertyName + \".keiroSingle\"%>" bean="<%=block.getKeiroSingle() %>" isKbnDraw="not" />
              </logic:notEmpty>
            </div>
          </div>
        <% } %>
      </div>
    </logic:empty>
  </logic:iterate>
</logic:notEmpty>
