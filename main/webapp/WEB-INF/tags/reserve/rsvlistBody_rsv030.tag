<%@tag import="jp.groupsession.v2.rsv.biz.RsvCommonBiz"%>
<%@tag import="jp.groupsession.v2.cmn.GSConstReserve"%>
<%@tag import="jp.groupsession.v2.cmn.GSConst"%>
<%@ tag pageEncoding="utf-8" body-content="empty" description="施設予約月間 テーブルペイン rsvListBodyPaneのボディ要素に配置する"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>

<bean:define id="thisForm" name="rsv030Form" scope="request" />

<%
  long rsvTipCnt = 0;
%>
<% RsvCommonBiz rsvCmnBiz = new jp.groupsession.v2.rsv.biz.RsvCommonBiz(); %>

<table class="table-top cal_table table-fixed mt0">

  <logic:notEmpty name="thisForm" property="rsv030MonthList" >
    <logic:iterate id="monthMdl" name="thisForm" property="rsv030MonthList" >
      <logic:notEmpty name="monthMdl" property="yoyakuDayList">
        <logic:iterate id="day" name="monthMdl" property="yoyakuDayList">
          <%--  日セル 開始タグ設定  --%>
          <logic:equal name="day" property="yrkYobi" value="1">
            <tr>
              <td class="txt_t hp100 bgC_tableCell_Sunday" id="<bean:write name="day" property="ikkatuKey" />">
          </logic:equal>
          <logic:equal name="day" property="yrkYobi" value="7">
              <td class="txt_t hp100 bgC_tableCell_Saturday"" id="<bean:write name="day" property="ikkatuKey" />">
          </logic:equal>
          <logic:notEqual name="day" property="yrkYobi" value="1">
            <logic:notEqual name="day" property="yrkYobi" value="7">
              <logic:equal name="day" property="todayKbn" value="0">
                  <td class="bgC_select txt_t hp100" id="<bean:write name="day" property="ikkatuKey" />">
              </logic:equal>
              <logic:notEqual name="day" property="todayKbn" value="0">
                <td class="bgC_tableCell txt_t hp100" id="<bean:write name="day" property="ikkatuKey" />">
              </logic:notEqual>
            </logic:notEqual>
          </logic:notEqual>
          <%--  日セル タグ内  --%>
          <span>
            <%--  選択チェック＆新規作成ボタン  --%>
            <logic:equal name="thisForm" property="rsv030AccessAuth" value="1">
              <logic:greaterThan name="thisForm" property="rsvSelectedSisetuSid" value="0">
                <a href="#!" onclick="moveSisetuAdd('<bean:write name="day" property="yrkDateStr" />', '<bean:write name="thisForm" property="rsvSelectedSisetuSid" />');">
                  <img class="classic-display" src="../common/images/classic/icon_scadd.png" alt="<gsmsg:write key="reserve.19" />">
                  <img class="original-display" src="../common/images/original/icon_add.png" alt="<gsmsg:write key="reserve.19" />">
                </a>
                <logic:equal name="day" property="yrkYobi" value="1">
                  <html:multibox name="thisForm" property="rsvIkkatuTorokuKey" onclick="backGroundSetting(this, '9');">
                    <bean:write name="day" property="ikkatuKey" />
                  </html:multibox>
                </logic:equal>
                <logic:equal name="day" property="yrkYobi" value="7">
                  <html:multibox name="thisForm" property="rsvIkkatuTorokuKey" onclick="backGroundSetting(this, '8');">
                    <bean:write name="day" property="ikkatuKey" />
                  </html:multibox>
                </logic:equal>
                <logic:notEqual name="day" property="yrkYobi" value="1">
                  <logic:notEqual name="day" property="yrkYobi" value="7">
                    <logic:equal name="day" property="todayKbn" value="0">
                      <html:multibox name="thisForm" property="rsvIkkatuTorokuKey" onclick="backGroundSetting(this, '10');">
                        <bean:write name="day" property="ikkatuKey" />
                      </html:multibox>
                    </logic:equal>
                    <logic:notEqual name="day" property="todayKbn" value="0">
                      <html:multibox name="thisForm" property="rsvIkkatuTorokuKey" onclick="backGroundSetting(this, '1');">
                        <bean:write name="day" property="ikkatuKey" />
                      </html:multibox>
                    </logic:notEqual>
                  </logic:notEqual>
                </logic:notEqual>
              </logic:greaterThan>
              <logic:lessEqual name="thisForm" property="rsvSelectedSisetuSid" value="0">
                <a href="#!">
                  <img class="classic-display" src="../common/images/classic/icon_scadd.png" alt="<gsmsg:write key="reserve.19" />">
                  <img class="original-display" src="../common/images/original/icon_add.png" alt="<gsmsg:write key="reserve.19" />">
                </a>
              </logic:lessEqual>
            </logic:equal>
          </span>
          <span class="flo_r">
            <%-- 日付表示 --%>
            <logic:equal name="day" property="yrkMonthKbn" value="1">
                <span class="fw_b fs_11"><bean:write name="day" property="yrkRokuyou" /></span>
            </logic:equal>
            <logic:notEqual name="day" property="yrkMonthKbn" value="1">
              <span class="opacity6 fs_11"><bean:write name="day" property="yrkRokuyou" /></span>
            </logic:notEqual>
            <logic:greaterThan name="thisForm" property="rsvSelectedSisetuSid" value="0">
              <a class="schedule_headerDay wp25 txt_c" href="#!" onclick="moveDailySchedule('<bean:write name="day" property="yrkDateStr" />');">
            </logic:greaterThan>
            <logic:lessEqual name="thisForm" property="rsvSelectedSisetuSid" value="0">
              <a href="#!">
            </logic:lessEqual>
            <logic:equal name="day" property="yrkMonthKbn" value="1">
              <logic:empty name="day" property="holName">
                <logic:equal name="day" property="todayKbn" value="0">
                  <span class="cl_fontBody schedule_headerDay fs_17 wp25 txt_c td_u fw_b flo_r">
                </logic:equal>
                <logic:notEqual name="day" property="todayKbn" value="0">
                  <span class="cl_fontBody schedule_headerDay fs_17 wp25 txt_c fw_b flo_r">
                </logic:notEqual>
              </logic:empty>

              <logic:notEmpty name="day" property="holName">
                <logic:equal name="day" property="todayKbn" value="0">
                  <span class="cl_fontBody schedule_headerDay fs_17 wp25 txt_c td_u fw_b flo_r">
                </logic:equal>
                <logic:notEqual name="day" property="todayKbn" value="0">
                  <span class="cl_fontSunday schedule_headerDay fs_17 wp25 txt_c fw_b flo_r">
                </logic:notEqual>
              </logic:notEmpty>
            </logic:equal>

            <logic:notEqual name="day" property="yrkMonthKbn" value="1">
              <logic:empty name="day" property="holName">
                <logic:equal name="day" property="todayKbn" value="0">
                  <span class="cl_fontBody schedule_headerDay fs_17 wp25 txt_c opacity6 fw_b flo_r">
                </logic:equal>
                <logic:notEqual name="day" property="todayKbn" value="0">
                  <span class="cl_fontBody schedule_headerDay fs_17 wp25 txt_c flo_r opacity6">
                </logic:notEqual>
              </logic:empty>
              <logic:notEmpty name="day" property="holName">
                <logic:equal name="day" property="todayKbn" value="0">
                  <span class="cl_fontBody schedule_headerDay fs_17 wp25 txt_c td_u fw_b flo_r">
                </logic:equal>
                <logic:notEqual name="day" property="todayKbn" value="0">
                  <span class="cl_fontBody schedule_headerDay fs_17 wp25 txt_c cl_fontSunday flo_r opacity6">
                </logic:notEqual>
              </logic:notEmpty>
            </logic:notEqual>
                  <bean:write name="day" property="yrkDateDay" />
                </span>
              </a>
          </span>

          <logic:notEmpty name="day" property="holName">
            <div class="txt_r lh100 clear_b">
              <logic:equal name="day" property="yrkMonthKbn" value="1">
                <span class="txt_l display_inline-block cl_fontSunday fs_11 lh100 mt5" ><bean:write name="day" property="holName" /></span>
              </logic:equal>
              <logic:notEqual name="day" property="yrkMonthKbn" value="1">
                <span class="txt_l display_inline-block cl_fontSunday fs_11 lh100 mt5 opacity6" ><bean:write name="day" property="holName" /></span>
              </logic:notEqual>
            </div>
          </logic:notEmpty>

          <logic:notEmpty name="day" property="yoyakuList">
            <logic:iterate id="yrk" name="day" property="yoyakuList" indexId="idx">
              <bean:define id="index" value="<%=String.valueOf(((Integer) idx).intValue())%>" />
              <bean:define id="s_rsdSid" name="thisForm" property="rsvSelectedSisetuSid" type="java.lang.Integer" />
              <bean:define id="s_rsySid" name="yrk" property="rsySid" type="java.lang.Integer" />
              <bean:define id="s_date" name="day" property="yrkDateStr" type="java.lang.String" />
              <bean:define id="rsvSisApprStatus" name="yrk" property="rsyApprStatus" type="java.lang.Integer" />
              <bean:define id="rsvSisApprKbn" name="yrk" property="rsyApprKbn" type="java.lang.Integer" />
              <%String[] mokApprStatus = rsvCmnBiz.getMokApprStatus(request.getLocale(),
                rsvSisApprStatus.intValue(), rsvSisApprKbn.intValue()); %>

              <logic:notEmpty name="yrk" property="rsyNaiyo">
                <bean:define id="scnaiyou" name="yrk" property="rsyNaiyo" type="String"/>
                <% String tmpText =  scnaiyou;
                    String tmpText2 = jp.co.sjts.util.StringUtilHtml.transToHTml(tmpText); %>
                <a href="#!" id="tooltips_rsv<%=String.valueOf(rsvTipCnt++)%>" onclick="moveSisetuEdit('<bean:write name="yrk" property="rsySid" />');">
                  <span class="tooltips"><gsmsg:write key="cmn.content" />:<%=tmpText2%></span>
              </logic:notEmpty>
              <logic:empty name="yrk" property="rsyNaiyo">
                <a href="#!" id="tooltips_rsv<%=String.valueOf(rsvTipCnt++)%>" onclick="moveSisetuEdit('<bean:write name="yrk" property="rsySid" />');">
                  <span class="tooltips"><%=mokApprStatus[2]%><bean:write name="yrk" property="rsyMok" /></span>
              </logic:empty>

                  <%-- 公開 --%>
                  <div class="cal_space">
                    <div class="<%=mokApprStatus[1]%> opacity6-hover fs_13">
                      <logic:notEqual name="yrk" property="public" value="<%=String.valueOf(GSConstReserve.PUBLIC_KBN_PLANS)%>">
                        <logic:notEmpty name="yrk" property="yrkRiyoDateStr">
                          <div class="cal_content-space">
                            <div class="cal_time">
                              <bean:write name="yrk" property="yrkRiyoDateStr" />
                            </div>
                          </div>
                        </logic:notEmpty>
                        <div class="<%=mokApprStatus[1]%> cal_content">
                          <logic:notEmpty name="yrk" property="rsyMok"><%=mokApprStatus[2]%><bean:write name="yrk" property="rsyMok" />
                          </logic:notEmpty>
                          <logic:notEmpty name="yrk" property="rsyMok">
                            <logic:notEmpty name="yrk" property="yrkName">&nbsp;/&nbsp;</logic:notEmpty>
                          </logic:notEmpty>
                          <logic:notEmpty name="yrk" property="yrkName">
                            <logic:equal name="yrk" property="usrJKbn" value="<%=String.valueOf(GSConst.JTKBN_TOROKU)%>">
                              <logic:equal name="yrk" property="usrUkoFlg" value="1">
                                <span class="mukoUser"><bean:write name="yrk" property="yrkName" /></span>
                              </logic:equal>
                              <logic:notEqual name="yrk" property="usrUkoFlg" value="1">
                                <span><bean:write name="yrk" property="yrkName" /></span>
                              </logic:notEqual>
                            </logic:equal>
                            <logic:equal name="yrk" property="usrJKbn" value="<%=String.valueOf(GSConst.JTKBN_DELETE)%>">
                              <span><del><bean:write name="yrk" property="yrkName" /></del></span>
                            </logic:equal>
                          </logic:notEmpty>
                        </div>
                      </logic:notEqual>
                    </div>
                  </div>
                </a>

                <%-- 非公開 --%>
                <logic:equal name="yrk" property="public" value="<%=String.valueOf(GSConstReserve.PUBLIC_KBN_PLANS)%>">
                  <logic:notEmpty name="yrk" property="yrkRiyoDateStr">
                    <div class="cal_content-space">
                      <div class="cal_time">
                        <bean:write name="yrk" property="yrkRiyoDateStr" />
                      </div>
                    </div>
                  </logic:notEmpty>
                  <div class="cal_content">
                    <logic:notEmpty name="yrk" property="rsyMok"><%=mokApprStatus[2]%><bean:write name="yrk" property="rsyMok" />
                    </logic:notEmpty>
                    <logic:notEmpty name="yrk" property="rsyMok">
                      <logic:notEmpty name="yrk" property="yrkName">&nbsp;/&nbsp;</logic:notEmpty>
                    </logic:notEmpty>
                    <logic:notEmpty name="yrk" property="yrkName">
                      <logic:equal name="yrk" property="usrJKbn" value="<%=String.valueOf(GSConst.JTKBN_TOROKU)%>">
                        <logic:equal name="yrk" property="usrUkoFlg" value="1">
                          <span class="mukoUser">
                            <bean:write name="yrk" property="yrkName" />
                          </span>
                        </logic:equal>
                        <logic:notEqual name="yrk" property="usrUkoFlg" value="1">
                          <span>
                            <bean:write name="yrk" property="yrkName" />
                          </span>
                        </logic:notEqual>
                      </logic:equal>
                      <logic:equal name="yrk" property="usrJKbn" value="<%=String.valueOf(GSConst.JTKBN_DELETE)%>">
                        <span>
                          <del>
                            <bean:write name="yrk" property="yrkName" />
                          </del>
                        </span>
                      </logic:equal>
                    </logic:notEmpty>
                  </div>
                </logic:equal>

              </logic:iterate>
            </logic:notEmpty>
          <%--  日セル 終了タグ設定  --%>
              </td>
          <logic:equal name="day" property="yrkYobi" value="7">
            </tr>
          </logic:equal>
        </logic:iterate>
      </logic:notEmpty>
    </logic:iterate>
  </logic:notEmpty>
</table>