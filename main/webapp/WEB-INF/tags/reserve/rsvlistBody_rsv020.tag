<%@tag import="jp.groupsession.v2.cmn.GSConstReserve"%>
<%@tag import="jp.groupsession.v2.cmn.GSConst"%>
<%@ tag pageEncoding="utf-8" body-content="empty" description="施設予約日間 テーブルペイン rsvListBodyPaneのボディ要素に配置する"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>
<%@ taglib uri="/WEB-INF/ctag-dailyReserve.tld" prefix="dailyReserve"%>



    <bean:define id="fromHour" name="rsv020Form" property="rsv020FromHour" scope="request" />
    <bean:define id="toHour" name="rsv020Form" property="rsv020ToHour" scope="request" />
    <bean:define id="rsvDspFrom" name="rsv020Form" property="rsvDspFrom" scope="request" />
    <bean:define id="colSpan" name="rsv020Form" property="rsv020ColSpan" scope="request" />
    <bean:define id="hourDivCount" name="rsv020Form" property="rsv020HourDivCount" scope="request" />

<% long rsvTipCnt = 0; %>

          <table class="table-top  m0" id="tooltips_rsv_daily">

            <tr>
              <td class="wp150 mwp150 cal_header border_top_none fw_b" rowspan="2">
                <span>
                  <gsmsg:write key="cmn.facility.name" />
                </span>
              </td>
              <td class="wp40 mwp40 cal_header border_top_none fw_b" rowspan="2">
                <span>
                  <gsmsg:write key="cmn.new" />
                </span>
              </td>

              <logic:notEmpty name="rsv020Form" property="rsv020TimeChartList" scope="request">
                <logic:iterate id="strHour" name="rsv020Form" property="rsv020TimeChartList" scope="request">
                  <td colspan="<bean:write name='hourDivCount' />" class="no_w cal_header fw_b border_top_none">
                    <span>
                      <bean:write name="strHour" scope="page" />
                    </span>
                  </td>
                </logic:iterate>
            </tr>

            <tr>
              <logic:iterate id="timeSpc" name="rsv020Form" property="rsv020TimeChartList" scope="request">
                <%
int hdCount = ((Integer) hourDivCount).intValue();
        for (int j = 0; j < hdCount; j++) {
          out.println("<td class=\"sch_timeScale\"></td>");
        }
%>

              </logic:iterate>
            </tr>
            </logic:notEmpty>

            <logic:notEmpty name="rsv020Form" property="rsv020DaylyList" scope="request">
              <logic:iterate id="sisetu" name="rsv020Form" property="rsv020DaylyList" scope="request" indexId="cnt">
                <bean:define id="ret" value="<%=String.valueOf(cnt.intValue() % 5)%>" />
                <logic:equal name="ret" value="0">
                  <logic:greaterThan name="cnt" value="0">

                    <tr>
                      <td class="wp150 mwp150 cal_header border_top_none fw_b" rowspan="2">
                        <span>
                          <gsmsg:write key="cmn.facility.name" />
                        </span>
                      </td>
                      <td class="wp40 mwp40 cal_header border_top_none fw_b" rowspan="2">
                        <span>
                          <gsmsg:write key="cmn.new" />
                        </span>
                      </td>

                      <logic:notEmpty name="rsv020Form" property="rsv020TimeChartList" scope="request">
                        <logic:iterate id="strHour" name="rsv020Form" property="rsv020TimeChartList" scope="request">
                          <td colspan="<bean:write name='hourDivCount' />" class="no_w cal_header fw_b border_top_none">
                            <span>
                              <bean:write name="strHour" scope="page" />
                            </span>
                          </td>
                        </logic:iterate>
                    </tr>
                    <tr>
                      <logic:iterate id="timeSpc" name="rsv020Form" property="rsv020TimeChartList" scope="request">
                        <%
    int hdCount = ((Integer) hourDivCount).intValue();
                    for (int j = 0; j < hdCount; j++) {
                      out.println("<td class=\"sch_timeScale\"></td>");
                    }
  %>
                      </logic:iterate>
                    </tr>
            </logic:notEmpty>
            </logic:greaterThan>
            </logic:equal>

            <tr class="txt_l txt_t bgC_tableCell">
              <dailyReserve:dailywrite name="sisetu" from="<%=fromHour.toString()%>" to="<%=toHour.toString()%>" dspDate="<%=rsvDspFrom.toString()%>" count="<%=hourDivCount.toString()%>" />
            </tr>
            </logic:iterate>
            </logic:notEmpty>
          </table>