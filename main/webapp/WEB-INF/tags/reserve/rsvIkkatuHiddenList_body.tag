<%@tag import="jp.groupsession.v2.cmn.GSConst"%>
<%@tag import="jp.groupsession.v2.rsv.rsv010.Rsv010Form"%>
<%@ tag pageEncoding="utf-8" description="施設予約一覧 一括選択選択ペイン"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>

<%@ attribute description="施設予約一覧系画面Formクラス " name="thisForm" type="Rsv010Form" required="true"%>
<%@ attribute description="削除機能の利用 " name="useDelBtn" type="Boolean" %>


              <logic:iterate id="day" name="thisForm" property="rsvIkkatuTorokuHiddenList" >
                <div class="mb5 w100">
                  <div class="pl5 bgC_header2">
                    <bean:write name="day" property="hidDayStr" />
                  </div>
                </div>
                <logic:iterate id="grp" name="day" property="grpList">

                  <div class="pl10 rsvIkkatuTorokuHiddenList_rsvGrp">
                    ■<bean:write name="grp" property="rsgName" />
                    <logic:iterate id="sisetu" name="grp" property="sisetuList">
                      <div class="pl10 w100 classic-display verAlignMid">
                        <a href="#!" onclick="openSisetuSyosai(<bean:write name="sisetu" property="rsdSid" />);">
                          <bean:write name="sisetu" property="rsdName" />
                        </a><!--
                     --><logic:notEqual name="useDelBtn" value="false">
                     <!--
                       --><button type="button" value="<gsmsg:write key="reserve.22" />" class="ml_auto classic-display mailMenu_button p5 no_w" onclick="clearSisetu('<bean:write name="sisetu" property="rsvIkkatuTorokuKey" />');">
                            <gsmsg:write key="reserve.22" />
                          </button>
                        </logic:notEqual>
                      </div>
                      <div class="pl10 w100 original-display">
                        <a href="#!" onclick="openSisetuSyosai(<bean:write name="sisetu" property="rsdSid" />);">
                          <bean:write name="sisetu" property="rsdName" />
                        </a><!--
                     --><logic:notEqual name="useDelBtn" value="false"><!--
                       --><button type="button" value="<gsmsg:write key="reserve.22" />" class="original-display ml5 iconBtn-noBorder no_w" onclick="clearSisetu('<bean:write name="sisetu" property="rsvIkkatuTorokuKey" />');">
                            <img src="../common/images/classic/icon_delete.png">
                          </button><span class="flo_clear"/><!--
                     --></logic:notEqual>
                     </div>
                    </logic:iterate>
                  </div>
                </logic:iterate>
              </logic:iterate>
