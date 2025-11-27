<%@tag import="jp.groupsession.v2.cmn.GSConstReserve"%>
<%@tag import="jp.groupsession.v2.cmn.GSConst"%>
<%@ tag pageEncoding="utf-8" body-content="empty" description="施設予約空き状況確認 テーブルペイン rsvListBodyPaneのボディ要素に配置する"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>
<%@ taglib uri="/WEB-INF/ctag-dailyScheduleReadOnly.tld" prefix="dailySchedule"%>
<%@ taglib uri="/WEB-INF/ctag-dailyReserveReadOnly.tld" prefix="dailyReserve"%>

    <bean:define id="fromHour" name="rsv310Form" property="rsv310FromHour" scope="request" />
    <bean:define id="toHour" name="rsv310Form" property="rsv310ToHour" scope="request" />
    <bean:define id="dspDate" name="rsv310Form" property="rsv310DspDate" scope="request" />
    <bean:define id="totalCols" name="rsv310Form" property="rsv310TotalCols" scope="request" />
    <bean:define id="adminKbn" name="rsv310Form" property="adminKbn" scope="request" />
    <bean:define id="memoriCount" name="rsv310Form" property="rsv310MemoriCount" scope="request" />
    <bean:define id="zskUseKbn" name="rsv310Form" property="zaisekiUseOk" scope="request" />


          <table class="table-top m0">

            <!-- タイトル行(氏名,新規,時間) -->
            <tr class="cal_day_hd">
              <td class="cal_header wp120 mwp120" colspan="2" rowspan="2">
                <span>
                  <gsmsg:write key="cmn.facility.name" />
                </span>
              </td>

              <logic:notEmpty name="rsv310Form" property="rsv310TimeChartList" scope="request">
                <logic:iterate id="strHour" name="rsv310Form" property="rsv310TimeChartList" scope="request">
                  <td class="cal_header" colspan="<bean:write name="memoriCount" scope="page" />">
                    <span>
                      <bean:write name="strHour" scope="page" />
                    </span>
                  </td>
                </logic:iterate>
              </logic:notEmpty>
            </tr>

            <!-- 時間目盛 -->
            <tr>
              <logic:notEmpty name="rsv310Form" property="rsv310TimeChartList" scope="request">
                <logic:iterate id="strHour" name="rsv310Form" property="rsv310TimeChartList" scope="request">

                  <logic:equal name="memoriCount" value="4">
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                  </logic:equal>

                  <logic:equal name="memoriCount" value="6">
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                  </logic:equal>

                  <logic:equal name="memoriCount" value="12">
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                    <td class="sch_timeScale"></td>
                  </logic:equal>
                </logic:iterate>
              </logic:notEmpty>
            </tr>

            <!--施設予約状況-->
            <logic:notEmpty name="rsv310Form" property="rsv020TimeChartList" scope="request">
              <logic:notEmpty name="rsv310Form" property="rsv020DaylyList" scope="request">
                <logic:iterate id="sisetu" name="rsv310Form" property="rsv020DaylyList" scope="request" indexId="cnt">
                  <tr class="cal_colHeader">
                    <dailyReserve:dailywrite name="sisetu" from="<%=fromHour.toString()%>" to="<%=toHour.toString()%>" dspDate="<%=dspDate.toString()%>" count="<%=memoriCount.toString()%>"  zskKbn="<%= zskUseKbn.toString() %>" />
                  </tr>
                </logic:iterate>
              </logic:notEmpty>

              <logic:equal name="rsv310Form" property="scheduleUseOk" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.PLUGIN_USE)%>">
                <!-- グループと本人 -->
                <logic:notEmpty name="rsv310Form" property="sch010TopList" scope="request">

                  <!-- スケジュール セッションユーザ -->
                  <!-- タイトル行(氏名,新規,時間) -->
                  <tr class="cal_day_hd">
                    <td class="cal_header wp120 mwp120" colspan="2" rowspan="2">
                      <span>
                        <gsmsg:write key="cmn.name" />
                      </span>
                    </td>

                    <logic:notEmpty name="rsv310Form" property="rsv310TimeChartList" scope="request">
                      <logic:iterate id="strHour" name="rsv310Form" property="rsv310TimeChartList" scope="request">
                        <td class="cal_header" colspan="<bean:write name="memoriCount" scope="page" />">
                          <span>
                            <bean:write name="strHour" scope="page" />
                          </span>
                        </td>
                      </logic:iterate>
                    </logic:notEmpty>
                  </tr>

                  <!-- 時間目盛 -->
                  <tr>
                    <logic:notEmpty name="rsv310Form" property="rsv310TimeChartList" scope="request">
                      <logic:iterate id="strHour" name="rsv310Form" property="rsv310TimeChartList" scope="request">

                        <logic:equal name="memoriCount" value="4">
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                        </logic:equal>

                        <logic:equal name="memoriCount" value="6">
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                        </logic:equal>

                        <logic:equal name="memoriCount" value="12">
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                        </logic:equal>
                      </logic:iterate>
                    </logic:notEmpty>
                  </tr>

                  <!-- グループと本人 -->
                  <logic:iterate id="weekMdl" name="rsv310Form" property="sch010TopList" scope="request">
                    <tr  class="txt_l txt_t bgC_tableCell">
                      <dailySchedule:dailywrite name="weekMdl" top="1" from="<%=fromHour.toString()%>" to="<%=toHour.toString()%>" admin="<%=adminKbn.toString()%>" memCnt="<%=memoriCount.toString()%>" />
                    </tr>
                  </logic:iterate>
                </logic:notEmpty>

                <!-- グループメンバー -->
                <logic:notEmpty name="rsv310Form" property="sch010BottomList" scope="request">
                  <!-- タイトル行(氏名,新規,時間) -->
                  <tr>
                    <td class="cal_header wp120 mwp120 no_w" colspan="2" rowspan="2" >
                      <span>
                        <gsmsg:write key="cmn.name" />
                      </span>
                    </td>
                    <!-- 時間目盛 -->
                    <logic:notEmpty name="rsv310Form" property="rsv310TimeChartList" scope="request">
                      <logic:iterate id="strHour" name="rsv310Form" property="rsv310TimeChartList" scope="request">
                        <td class="cal_header no_w" colspan="<bean:write name="memoriCount" scope="page" />">
                          <span>
                            <bean:write name="strHour" scope="page" />
                          </span>
                        </td>
                      </logic:iterate>
                    </logic:notEmpty>
                  </tr>
                  <!-- 分目盛 -->
                  <tr>
                    <logic:notEmpty name="rsv310Form" property="rsv310TimeChartList" scope="request">
                      <logic:iterate id="strHour" name="rsv310Form" property="rsv310TimeChartList" scope="request">

                        <logic:equal name="memoriCount" value="4">
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                        </logic:equal>

                        <logic:equal name="memoriCount" value="6">
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                        </logic:equal>

                        <logic:equal name="memoriCount" value="12">
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                          <td class="sch_timeScale"></td>
                        </logic:equal>
                      </logic:iterate>
                    </logic:notEmpty>
                  </tr>

                  <logic:iterate id="gpWeekMdl" name="rsv310Form" property="sch010BottomList" scope="request" indexId="cnt">
                    <tr  class="txt_l txt_t bgC_tableCell">
                      <dailySchedule:dailywrite name="gpWeekMdl" top="0" from="<%= fromHour.toString() %>" to="<%= toHour.toString() %>" admin="<%= adminKbn.toString() %>" memCnt="<%= memoriCount.toString() %>" />
                    </tr>
                  </logic:iterate>

                </logic:notEmpty>
              </logic:equal>
            </logic:notEmpty>
          </table>