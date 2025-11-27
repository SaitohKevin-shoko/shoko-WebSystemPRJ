<%@tag import="jp.groupsession.v2.cmn.GSConstReserve"%>
<%@tag import="jp.groupsession.v2.cmn.GSConst"%>
<%@tag import="jp.groupsession.v2.rsv.rsv010.Rsv010Form"%>
<%@ tag pageEncoding="utf-8" body-content="empty" description="施設予約週間 テーブルペイン rsvListBodyPaneのボディ要素に配置する"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>

<%
  long rsvTipCnt = 0;
%>

<table class="table-top table-fixed mt0">

  <logic:notEmpty name="rsv010Form" property="rsv010SisetuList" scope="request">
    <logic:iterate id="sisetu" name="rsv010Form" property="rsv010SisetuList" scope="request" indexId="cnt">

      <% jp.groupsession.v2.rsv.biz.RsvCommonBiz rsvCmnBiz = new jp.groupsession.v2.rsv.biz.RsvCommonBiz(); %>
      <tr class="txt_l txt_t">
        <!-- 施設情報セル -->
        <td class="bgC_tableCell w16">
          <span class="cursor_p" onclick="openSisetuSyosai(<bean:write name="sisetu" property="rsdSid" />);">
            <span class="cl_linkDef">
              <bean:write name="sisetu" property="rsdName" />
            </span>
          </span>
          <br>
          <logic:notEqual name="sisetu" property="sisetuImgBinSid" value="0">
            <logic:equal name="sisetu" property="rsdInfoSisetuImgDspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
              <img src="../reserve/rsv010.do?CMD=getImageFileSisetu&rsvSelectedSisetuSid=<bean:write name="sisetu" property="rsdSid" />&rsv010BinSid=<bean:write name="sisetu" property="sisetuImgBinSid" />" name="sisetuImgName" alt="<gsmsg:write key="reserve.17" />"  class="wp50">
            </logic:equal>
          </logic:notEqual>
          <div class="mt5">
            <span id="lt">
              <a href="#!" name="deluserBtn" onClick="moveGekkanSchedule('<bean:write name="sisetu" property="rsdSid" />');">
                <img class="btn_classicImg-display" src="../common/images/classic/icon_cal_gekkan.png" alt="<gsmsg:write key="cmn.monthly" />">
                <img class="btn_originalImg-display" src="../common/images/original/icon_gekkan.png" alt="<gsmsg:write key="cmn.monthly" />">
                <span class="cl_linkDef">
                  <gsmsg:write key="cmn.monthly" />
                </span>
              </a>
            </span>
          </div>
          <br>

          <logic:equal name="sisetu" property="rsdInfoSisetuIdDspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <span><gsmsg:write key="reserve.55" />:</span><span><bean:write name="sisetu" property="rsdSisetuId" /></span>
            <br>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoSisanKanriDspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdSisanKanri">
              <span><gsmsg:write key="cmn.asset.register.num" />:</span><span><bean:write name="sisetu" property="rsdSisanKanri" /></span>
              <br>
            </logic:notEmpty>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoProp1ValueDspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdProp1Value">
              <span><bean:write name="sisetu" property="rsvPropHeaderName8" />:</span><span><bean:write name="sisetu" property="rsdProp1Value" /></span>
              <br>
            </logic:notEmpty>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoProp2ValueDspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdProp2Value">
              <logic:equal name="sisetu" property="rsdProp2Value" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.PROP_KBN_KA)%>">
                <span><bean:write name="rsv010Form" property="rsv010PropHeaderName2" />:</span><span><gsmsg:write key="cmn.accepted" /></span>
              </logic:equal>
              <logic:equal name="sisetu" property="rsdProp2Value" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.PROP_KBN_HUKA)%>">
                <span><bean:write name="rsv010Form" property="rsv010PropHeaderName2" />:</span><span><gsmsg:write key="cmn.not" /></span>
              </logic:equal>
              <br>
            </logic:notEmpty>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoProp3ValueDspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdProp3Value">
              <logic:equal name="sisetu" property="rsdProp3Value" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.PROP_KBN_KA)%>">
                <span><bean:write name="rsv010Form" property="rsv010PropHeaderName3" />:</span><span><gsmsg:write key="cmn.accepted" /></span>
              </logic:equal>
              <logic:equal name="sisetu" property="rsdProp3Value" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.PROP_KBN_HUKA)%>">
                <span><bean:write name="rsv010Form" property="rsv010PropHeaderName3" />:</span><span><gsmsg:write key="cmn.not" /></span>
              </logic:equal>
                <br>
            </logic:notEmpty>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoProp4ValueDspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdProp4Value">
              <span><bean:write name="rsv010Form" property="rsv010PropHeaderName4" />:</span><span><bean:write name="sisetu" property="rsdProp4Value" /></span>
              <br>
            </logic:notEmpty>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoProp5ValueDspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdProp5Value">
              <span><bean:write name="rsv010Form" property="rsv010PropHeaderName5" />:</span><span><bean:write name="sisetu" property="rsdProp5Value" /></span>
              <br>
            </logic:notEmpty>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoProp6ValueDspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdProp6Value">
              <span><bean:write name="rsv010Form" property="rsv010PropHeaderName6" />:</span><span><bean:write name="sisetu" property="rsdProp6Value" /><gsmsg:write key="cmn.days.after" /></span>
              <br>
            </logic:notEmpty>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoProp7ValueDspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdProp7Value">
              <logic:equal name="sisetu" property="rsdProp7Value" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.PROP_KBN_KA)%>">
                <span><bean:write name="rsv010Form" property="rsv010PropHeaderName7" />:</span><span><gsmsg:write key="cmn.accepted" /></span>
              </logic:equal>
              <logic:equal name="sisetu" property="rsdProp7Value" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.PROP_KBN_HUKA)%>">
                <span><bean:write name="rsv010Form" property="rsv010PropHeaderName7" />:</span><span><gsmsg:write key="cmn.not" /></span>
              </logic:equal>
              <br>
            </logic:notEmpty>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdApprDspFlg" value="true">
            <logic:equal name="sisetu" property="rsdApprKbnFlg" value="true">
              <span><gsmsg:write key="reserve.appr.set.title" />:</span><span><gsmsg:write key="reserve.appr.set.kbn1" /></span>
            </logic:equal>
            <logic:notEqual name="sisetu" property="rsdApprKbnFlg" value="true">
              <span><gsmsg:write key="reserve.appr.set.title" />:</span><span><gsmsg:write key="reserve.appr.set.kbn2" /></span>
            </logic:notEqual>
            <br>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoPlaComDspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdInfoPlaCom">
              <span><gsmsg:write key="reserve.location.comments" />:</span><span><bean:write name="sisetu" property="rsdInfoPlaCom" /></span>
              <br>
            </logic:notEmpty>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoPlaceImgCom1DspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdPlaceImgCom1">
              <span><gsmsg:write key="reserve.place.comment1" />:</span><span><bean:write name="sisetu" property="rsdPlaceImgCom1" /></span>
              <br>
            </logic:notEmpty>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoPlaceImgCom2DspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdPlaceImgCom2">
              <span><gsmsg:write key="reserve.place.comment2" />:</span><span><bean:write name="sisetu" property="rsdPlaceImgCom2" /></span>
              <br>
            </logic:notEmpty>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoPlaceImgCom3DspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdPlaceImgCom3">
              <span><gsmsg:write key="reserve.place.comment3" />:</span><span><bean:write name="sisetu" property="rsdPlaceImgCom3" /></span>
              <br>
            </logic:notEmpty>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoPlaceImgCom4DspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdPlaceImgCom4">
              <span><gsmsg:write key="reserve.place.comment4" />:</span><span><bean:write name="sisetu" property="rsdPlaceImgCom4" /></span>
              <br>
            </logic:notEmpty>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoPlaceImgCom5DspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdPlaceImgCom5">
              <span><gsmsg:write key="reserve.place.comment5" />:</span><span><bean:write name="sisetu" property="rsdPlaceImgCom5" /></span>
              <br>
            </logic:notEmpty>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoPlaceImgCom6DspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdPlaceImgCom6">
              <span><gsmsg:write key="reserve.place.comment6" />:</span><span><bean:write name="sisetu" property="rsdPlaceImgCom6" /></span>
              <br>
            </logic:notEmpty>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoPlaceImgCom7DspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdPlaceImgCom7">
              <span><gsmsg:write key="reserve.place.comment7" />:</span><span><bean:write name="sisetu" property="rsdPlaceImgCom7" /></span>
              <br>
            </logic:notEmpty>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoPlaceImgCom8DspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdPlaceImgCom8">
              <span><gsmsg:write key="reserve.place.comment8" />:</span><span><bean:write name="sisetu" property="rsdPlaceImgCom8" /></span>
              <br>
            </logic:notEmpty>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoPlaceImgCom9DspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdPlaceImgCom9">
              <span><gsmsg:write key="reserve.place.comment9" />:</span><span><bean:write name="sisetu" property="rsdPlaceImgCom9" /></span>
              <br>
            </logic:notEmpty>
          </logic:equal>
          <logic:equal name="sisetu" property="rsdInfoPlaceImgCom10DspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdPlaceImgCom10">
              <span><gsmsg:write key="reserve.place.comment10" />:</span><span><bean:write name="sisetu" property="rsdPlaceImgCom10" /></span>
              <br>
            </logic:notEmpty>
          </logic:equal>

          <%-- 備考 --%>
          <logic:equal name="sisetu" property="rsdInfoBikoDspKbn" value="<%=String.valueOf(jp.groupsession.v2.cmn.GSConstReserve.SISETU_IMG_ON)%>">
            <logic:notEmpty name="sisetu" property="rsdBiko">
              <div class="display_flex">
                <span class="no_w"><gsmsg:write key="cmn.memo" />:</span><span class=""><bean:write name="sisetu" property="rsdBiko" filter="false" /></span>
              </div>
            </logic:notEmpty>
          </logic:equal>

        </td>
        <logic:notEmpty name="sisetu" property="rsvWeekList">
          <logic:iterate id="week" name="sisetu" property="rsvWeekList">

            <logic:notEmpty name="week" property="yoyakuDayList">
              <logic:iterate id="day" name="week" property="yoyakuDayList">

                <logic:equal name="day" property="yrkYobi" value="1">
                  <td class="w12 bgC_tableCell_Sunday txt_t hp100" id="<bean:write name="day" property="ikkatuKey" />">
                </logic:equal>
                <logic:equal name="day" property="yrkYobi" value="7">
                  <td class="w12 bgC_tableCell_Saturday txt_t hp100" id="<bean:write name="day" property="ikkatuKey" />">
                </logic:equal>

                <logic:notEqual name="day" property="yrkYobi" value="1">
                  <logic:notEqual name="day" property="yrkYobi" value="7">
                    <td class="txt_l txt_t bgC_tableCell " id="<bean:write name="day" property="ikkatuKey" />">
                  </logic:notEqual>
                </logic:notEqual>

                <logic:equal name="sisetu" property="racAuth" value="1">
                  <span id="lt">
                    <a href="#!" onclick="moveSisetuAdd('<bean:write name="day" property="yrkDateStr" />', '<bean:write name="sisetu" property="rsdSid" />');">
                      <img class="classic-display" src="../common/images/classic/icon_scadd.png" alt="<gsmsg:write key="reserve.19" />">
                      <img class="original-display" src="../common/images/original/icon_add.png" alt="<gsmsg:write key="reserve.19" />">
                    </a>
                    <logic:equal name="day" property="yrkYobi" value="1">
                      <html:multibox name="rsv010Form" property="rsvIkkatuTorokuKey" onclick="backGroundSetting(this, '9');">
                        <bean:write name="day" property="ikkatuKey" />
                      </html:multibox>
                    </logic:equal>
                    <logic:equal name="day" property="yrkYobi" value="7">
                      <html:multibox name="rsv010Form" property="rsvIkkatuTorokuKey" onclick="backGroundSetting(this, '8');">
                        <bean:write name="day" property="ikkatuKey" />
                      </html:multibox>
                    </logic:equal>
                    <logic:notEqual name="day" property="yrkYobi" value="1">
                      <logic:notEqual name="day" property="yrkYobi" value="7">
                        <html:multibox name="rsv010Form" property="rsvIkkatuTorokuKey" onclick="backGroundSetting(this, '1');">
                          <bean:write name="day" property="ikkatuKey" />
                        </html:multibox>
                      </logic:notEqual>
                    </logic:notEqual>
                  </span>
                </logic:equal>

                <logic:notEmpty name="day" property="holName">
                  <span class="ml5 flo_r fs_11 cl_fontWarn lh100 mt5">
                    <bean:write name="day" property="holName" />
                  </span>
                </logic:notEmpty>

                <logic:notEmpty name="day" property="yoyakuList">
                  <%-- 予約情報の表示 --%>
                  <%
                                          int dspPublic = GSConstReserve.PUBLIC_KBN_ALL;
                                                            int dspPlans = GSConstReserve.PUBLIC_KBN_PLANS;
                                                            int dspBelongGrp = GSConstReserve.PUBLIC_KBN_GROUP;
                                        %>
                  <logic:iterate id="yrk" name="day" property="yoyakuList" indexId="idx">
                    <bean:define id="index" value="<%=String.valueOf(((Integer) idx).intValue())%>" />

                    <bean:define id="s_rsdSid" name="sisetu" property="rsdSid" type="java.lang.Integer" />
                    <bean:define id="s_rsySid" name="yrk" property="rsySid" type="java.lang.Integer" />
                    <bean:define id="s_date" name="day" property="yrkDateStr" type="java.lang.String" />

                    <bean:define id="rsvSisApprStatus" name="yrk" property="rsyApprStatus" type="java.lang.Integer" />
                    <bean:define id="rsvSisApprKbn" name="yrk" property="rsyApprKbn" type="java.lang.Integer" />
                    <% String[] mokApprStatus = rsvCmnBiz.getMokApprStatus(request.getLocale(), rsvSisApprStatus.intValue(), rsvSisApprKbn.intValue()); %>

                    <logic:notEmpty name="yrk" property="rsyNaiyo">
                      <bean:define id="scnaiyou" name="yrk" property="rsyNaiyo" type="String" />
                      <%
              String tmpText = scnaiyou;
              String tmpText2 = jp.co.sjts.util.StringUtilHtml.transToHTml(tmpText);
            %>
                      <a href="#!" id="tooltips_rsv<%= String.valueOf(rsvTipCnt++) %>" onclick="return moveSisetuEdit('<bean:write name="yrk" property="rsySid" />');">
                        <span class="tooltips">
                          <gsmsg:write key="cmn.content" />:<%= tmpText2 %>
                        </span>
                    </logic:notEmpty>
                    <logic:empty name="yrk" property="rsyNaiyo">
                      <a href="#!" id="tooltips_rsv<%= String.valueOf(rsvTipCnt++) %>" onclick="return moveSisetuEdit('<bean:write name="yrk" property="rsySid" />');">
                        <span class="tooltips"><%= mokApprStatus[2] %><bean:write name="yrk" property="rsyMok" />
                        </span>
                    </logic:empty>

                    <%-- 公開 --%>
                    <div class="cal_space">
                      <div class="<%= mokApprStatus[1] %> opacity6-hover fs_13">
                        <logic:notEqual name="yrk" property="public" value="<%= String.valueOf(GSConstReserve.PUBLIC_KBN_PLANS) %>">
                          <logic:notEmpty name="yrk" property="yrkRiyoDateStr">
                            <div class="cal_content-space">
                              <span class="cal_time no_w">
                                <bean:write name="yrk" property="yrkRiyoDateStr" />
                              </span>
                            </div>
                          </logic:notEmpty>
                          <div class="<%= mokApprStatus[1] %> cal_content">
                            <logic:notEmpty name="yrk" property="rsyMok"><%= mokApprStatus[2] %><bean:write name="yrk" property="rsyMok" />
                            </logic:notEmpty>
                            <logic:notEmpty name="yrk" property="rsyMok">
                              <logic:notEmpty name="yrk" property="yrkName">&nbsp;/&nbsp;</logic:notEmpty>
                            </logic:notEmpty>
                            <logic:notEmpty name="yrk" property="yrkName">
                              <logic:equal name="yrk" property="usrJKbn" value="<%= String.valueOf(GSConst.JTKBN_TOROKU) %>">
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
                              <logic:equal name="yrk" property="usrJKbn" value="<%= String.valueOf(GSConst.JTKBN_DELETE) %>">
                                <span>
                                  <del>
                                    <bean:write name="yrk" property="yrkName" />
                                  </del>
                                </span>
                              </logic:equal>
                            </logic:notEmpty>
                          </div>
                        </logic:notEqual>
                      </div>
                    </div>
                    </a>

                    <%-- 非公開 --%>
                    <logic:equal name="yrk" property="public" value="<%= String.valueOf(dspPlans) %>">
                      <div class="sc_nolink">
                        <logic:notEmpty name="yrk" property="yrkRiyoDateStr">
                          <div class="cal_time no_w"><bean:write name="yrk" property="yrkRiyoDateStr" /></div>
                        </logic:notEmpty>
                        <logic:notEmpty name="yrk" property="rsyMok"><%= mokApprStatus[2] %><bean:write name="yrk" property="rsyMok" />
                        </logic:notEmpty>
                        <logic:notEmpty name="yrk" property="rsyMok">
                          <logic:notEmpty name="yrk" property="yrkName">&nbsp;/&nbsp;</logic:notEmpty>
                        </logic:notEmpty>
                        <logic:notEmpty name="yrk" property="yrkName">
                          <logic:equal name="yrk" property="usrJKbn" value="<%= String.valueOf(GSConst.JTKBN_TOROKU) %>">
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
                          <logic:equal name="yrk" property="usrJKbn" value="<%= String.valueOf(GSConst.JTKBN_DELETE) %>">
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
                </td>

              </logic:iterate>
            </logic:notEmpty>
          </logic:iterate>
        </logic:notEmpty>
      </tr>
    </logic:iterate>
  </logic:notEmpty>
</table>