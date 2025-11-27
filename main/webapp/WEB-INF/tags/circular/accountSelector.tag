<%@tag import="jp.groupsession.v2.cmn.GSConst"%>
<%@tag import="jp.groupsession.v2.cir.ui.parts.account.AccountSelector"%>
<%@ tag pageEncoding="utf-8" description="回覧先選択ダイアログ"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>
<%@ taglib tagdir="/WEB-INF/tags/common" prefix="common"%>
<%@ taglib tagdir="/WEB-INF/tags/ui" prefix="ui"%>
<%@ taglib tagdir="/WEB-INF/tags/circular" prefix="circular"%>
<%@ attribute description="フォーム名" name="name" type="String" required="true" %>
<%@ attribute description="選択要素UIモデル プロパティ名" name="property" type="String" required="true" %>

<bean:define id="selector" name="<%=name %>" property="<%=property %>" type="AccountSelector" />

<bean:define id="tmpParamName" name="selector" property="select(select_0).parameterName" />
<logic:notPresent name="accountPopDefine" scope="request">
  <script type="text/javascript" src="../circular/js/ciratesakisel.js?<%= GSConst.VERSION_PARAM %>"></script>

  <script type="text/javascript">
  <!--
  var msglist_ciratesakisel = (function () {
    //使用するメッセージキーの配列を作成
     var ret = new Array();
     ret['cmn.add'] = '<gsmsg:write key="cmn.add"/>';
     ret['cmn.close'] = '<gsmsg:write key="cmn.close"/>';
     ret['cmn.delete'] = '<gsmsg:write key="cmn.delete"/>';
     ret['cmn.group'] = '<gsmsg:write key="cmn.group"/>';
     ret['cmn.mygroup'] = '<gsmsg:write key="cmn.mygroup"/>';
     ret['cmn.sel.all.group'] = '<gsmsg:write key="cmn.sel.all.group"/>';
     ret['cmn.select'] = '<gsmsg:write key="cmn.select"/>';
     ret['sml.189'] = '<gsmsg:write key="sml.189"/>';
     ret['sml.196'] = '<gsmsg:write key="sml.196"/>';
     ret['sml.218'] = '<gsmsg:write key="sml.218"/>';
     ret['sml.220'] = '<gsmsg:write key="sml.220"/>';
     ret['sml.221'] = '<gsmsg:write key="sml.221"/>';


    return ret;
  })();

  -->
  </script>
  <bean:define id="accountPopDefine" scope="request" value="" />

  <fieldset class="display_none" disabled>
    <div id="hinaSelectedAtesaki">
      <circular:selectedAccountList />
    </div>
    <div id="atesakiSelPop" title="<gsmsg:write key="cmn.form.user" />"
       class="ofx_h"
       data-selectorname="<%=property %>"
       data-paramname="<bean:write name="tmpParamName"/>"
       >
      <table class="w100 h100">
        <tr>
          <td  class="w100">
            <form name="atesakiSelForm" >
              <table class="w100">
                <tr>
                  <td class="w100 txt_c">
                    <table class="w100">
                      <tr>
                        <td>
                          <table class="w100">
                            <tr>
                              <td class="w50 txt_r">
                                <button type="button"
                                    class="js_commitAtesaki baseBtn" value=" <gsmsg:write key="cmn.select"/>">
                                    <img class="btn_classicImg-display"
                                      src="../common/images/classic/icon_ok.png" alt="">
                                    <img
                                      class="btn_originalImg-display"
                                      src="../common/images/original/icon_check.png" alt="">
                                    <gsmsg:write key="cmn.select"/>
                                </button>
                              </td>
                            </tr>
                          </table>
                          <ul class="w100 tabHeader m0 mt10">
                            <li class="tabHeader_space"></li>
                            <li id="groupTab" class="js_atesakiSel_tab tabHeader_tab-on ">
                              <label class="w100">
                                <input type="radio" name="<%=property %>.dspKbn" value="1" class="display_none" checked/>
                                <gsmsg:write key="cmn.group"/>
                              </label>
                            </li>
                            <li id="mygroupTab"
                              class="js_atesakiSel_tab tabHeader_tab-off ">
                              <label class="w100">
                                <input type="radio" name="<%=property %>.dspKbn" value="2" class="display_none" />
                                <gsmsg:write key="cmn.mygroup"/>
                              </label>
                            </li>
                            <li id="deptAccountTab"
                              class="js_atesakiSel_tab tabHeader_tab-off ">
                              <label class="w100">
                                <input type="radio" name="<%=property %>.dspKbn" value="3" class="display_none" />
                                <gsmsg:write key="sml.189"/>
                              </label>
                            </li>
                          </ul>
                          <table class="w100 bor1 border_top_none" cellpadding="5">
                              <tr>
                                <td class="w100 txt_l td_smail_wt ">
                                  <ui:multiselector name="<%=name %>" property="<%=property %>" styleClass="mrl_auto wp600 atesakiSelPop_selector" />
                                </td>
                              </tr>
                          </table>
                          <div class="mt10"></div>
                          <table class="w100">
                              <tr>
                                <td class="txt_r">
                                  <button type="button"
                                    class="js_commitAtesaki baseBtn" value=" <gsmsg:write key="cmn.select"/>">
                                    <img class="btn_classicImg-display"
                                      src="../common/images/classic/icon_ok.png" alt="">
                                    <img
                                      class="btn_originalImg-display"
                                      src="../common/images/original/icon_check.png" alt="">
                                    <gsmsg:write key="cmn.select"/>
                                  </button>
                                </td>
                              </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </form>
          </td>
        </tr>
      </table>
    </div>
  </fieldset>
  <div class="display_none js_atesakiSelPopBase-hidden">
  </div>
</logic:notPresent>
