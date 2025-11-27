<%@tag import="jp.groupsession.v2.cmn.ui.parts.select.ISelector"%>
<%@tag import="jp.groupsession.v2.cmn.ui.parts.usergroupselect.EnumSelectType"%>
<%@ tag pageEncoding="utf-8" description="複数選択要素 描画タグ "%>
<%@ tag import="jp.groupsession.v2.cmn.GSConst"%>
<%@ tag import="jp.groupsession.v2.cmn.ui.parts.select.IChild"%>
<%@ tag import="java.util.Map.Entry"%>
<%@ tag import="jp.groupsession.v2.cmn.ui.parts.usergroupselect.EnumChildType"%>
<%@ tag import="jp.groupsession.v2.cmn.ui.parts.usergroupselect.Child"%>
<%@ tag import="jp.groupsession.v2.cmn.ui.parts.usergroupselect.GroupChild"%>

<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>
<%@ taglib tagdir="/WEB-INF/tags/common" prefix="common"%>

<%@ attribute description="フォーム名" name="name" type="String" required="true" %>
<%@ attribute description="フォーム内 UIプロパティ名" name="selector" type="String" required="true" %>
<%@ attribute description="フォーム内 ユーザ選択要素参照名" name="property" type="String" required="true" %>

<bean:define id="ui"  name="<%=name %>" property="<%=selector %>" type="ISelector" />
<bean:define id="selectCnt" ><%=ui.getSelectMap().size() %></bean:define>
<%-- 未選択描画要素 --%>
<bean:define id="noselectBody">
  <logic:notEmpty name="ui" property="groupSelectionList">
      <logic:notEmpty name="ui" property="selectGrp" >
        <div class="txt_c p4_l5 js_groupName lh100" >
          <div class="verAlignMid">
            <div class=""></div>
            <bean:write name="ui" property="selectGrp.name" />
          </div>
        </div>
      </logic:notEmpty>
  </logic:notEmpty>
  <table class="table-fixed border_none w100 p0">
    <colgroup class="w60" span="1" /><colgroup  class="w40" span="1"/>
    <logic:notEmpty name="ui" property="selectionList">
      <logic:iterate id="child" name="ui" property="selectionList" type="IChild">
        <tr class="cursor_p border_none p0 content-hoverChange js_multiselector_selectchild ">
          <bean:define id="colspan" value="2" />
          <bean:define id="childPr" value="pr6" />
          <logic:equal name="child" property="type" value="<%=EnumChildType.USER.name()%>" >
           <logic:notEmpty name="child" property="labelList">
             <bean:define id="colspan" value="1" />
             <bean:define id="childPr" value="pr0" />
           </logic:notEmpty>
          </logic:equal>
          <td class="border_none p3 pb0 <%=childPr%>" colspan="<%=colspan%>" >
            <label class="w100 word_b-all verAlignMid display_flex"
            >
              <input type="radio" name="nonselect" class=" display_none"
                data-multiselector_type="<%=child.getType().name()%>"
                value="<%=child.getValue()%>"
                onclick="$(this).ui_multiselector({cmd:'select'});"
                 />
              <div class="verAlignMid w100">
                <logic:equal name="child" property="type" value="<%=EnumChildType.USER.name()%>" >
                  <img class="mr5 classic-display wp18" src="../common/images/classic/icon_user.png">
                  <img class="mr5 original-display" src="../common/images/original/icon_user.png">
                </logic:equal>
                <logic:equal name="child" property="type" value="<%=EnumChildType.GROUP.name()%>" >
                  <img class="mr5 classic-display" src="../common/images/classic/icon_group.png">
                  <img class="mr5 original-display" src="../common/images/original/icon_group.png">
                </logic:equal>

                <bean:define id="deleteCls" value="" />
                <bean:define id="mukoCls" value="" />
                <logic:equal name="child" property="jkbn" value="<%=String.valueOf(GSConst.JTKBN_DELETE) %>">
                  <bean:define id="deleteCls" value="delete_border" />
                </logic:equal>
                <logic:equal name="child" property="teisiFlg" value="<%=String.valueOf(GSConst.YUKOMUKO_MUKO) %>">
                  <bean:define id="mukoCls" value="mukoUser" />
                </logic:equal>
                <div class="w100 mwp100 txt_l  multiselector_selectchildName <bean:write name="deleteCls"/> <bean:write name="mukoCls"/>" >
                  <bean:write name="child" property="name"/>
                </div>
              </div>
            </label>
          </td>
          <logic:equal name="child" property="type" value="<%=EnumChildType.USER.name()%>" >
           <logic:notEmpty name="child" property="labelList">
            <td class="border_none p3 pb0 pl0 pr6" onclick="$(this).prev().children('label').click();">
              <logic:equal name="child" property="type" value="<%=EnumChildType.USER.name()%>" >
                 <logic:notEmpty name="child" property="labelList">
                   <div class="w100 display_inline ">
                     <div class="js_multiselector_label baseLabel txt_overflow-ellipsis no_w ofx_h ofy_h hp18 m0">
                       <bean:define id="lblConnect" value="" />

                       <logic:iterate id="userLabel" name="child" property="labelList" >
                           <bean:write name="lblConnect"/>
                           <bean:write name="userLabel"/>
                           <bean:define id="lblConnect" value="," />
                       </logic:iterate>
                       <span class="tooltips display_none">
                         <bean:define id="lblConnect" value="" />

                         <logic:iterate id="userLabel" name="child" property="labelList" >
                             <bean:write name="lblConnect"/>
                             <bean:write name="userLabel"/>
                             <bean:define id="lblConnect" value="," />
                         </logic:iterate>
                       </span>
                     </div>
                   </div>
                 </logic:notEmpty>

             </logic:equal>
            </td>
          </logic:notEmpty>
        </logic:equal>
        </tr>
      </logic:iterate>
    </logic:notEmpty>
  </table>


</bean:define>


<%-- 初回描画 --%>
<logic:equal name="<%=name %>" property="selectorDispCmd" value="init">
  <bean:define id="selectedData"  type="String">
    data-multiselector_target="<%=ui.getSelectTargetKey() %>"
  </bean:define>

  <table class="js_multiselector multiselector table-fixed border_none w100 h100 p0 lh100"
   <%=selectedData %>
  >
    <tr class="hp28 border_none p0">
      <td class="border_none w100 p0">
        <div class="display_flex w100">
        </div>
      </td>
    </tr>
    <tr class="border_none p0">
      <td class="border_none w100 p0">
        <table class="table-fixed border_none w100 h100 p0 "
        >
          <tr class="h100 border_none p0">
            <td class="border_none w40 h100 p0">
              <table class="table-fixed border_none w100 h100 p0"
              >
                <logic:notEmpty name="ui" property="selectMap" >
                  <bean:define id="selectPaddingCls" value="p0" />
                  <logic:iterate id="entry" name="ui" property="selectMap" indexId="index" type="Entry">
                    <bean:define id="select" name="entry" property="value" />
                    <bean:define id="paramUser" name="select" property="parameterName" type="String" />
                    <bean:define id="selectedCls" value="" type="String" />
                    <bean:define id="selectedClsArrow" value="" type="String" />
                    <bean:define id="checked" value="" type="String" />
                    <bean:define id="selectOutlineCls" value="" type="String" />

                    <logic:equal value="<%=ui.getSelectTargetKey() %>" name="entry" property="key">
                      <logic:notEqual name="selectCnt" value="1">
                        <bean:define id="selectOutlineCls" value="selectoutline" type="String" />
                      </logic:notEqual>
                      <bean:define id="selectedCls" value="multiselector_select-active" type="String" />
                      <bean:define id="checked" value="checked" type="String" />
                      <bean:define id="selectedClsArrow" value="cl_fontArrow" type="String" />
                    </logic:equal>

                    <tr class="border_none w100 h30 p0 js_multiselector_select multiselector_select <%=selectedCls %>"
                          data-multiselector_parametername="<%=paramUser %>"
                          name="<%=String.valueOf(entry.getKey()) %>"
                          onclick="$(this).ui_multiselector({cmd:'selectorChange'}, arguments[0]);"
                    >
                      <td class="w100 border_none <%=selectPaddingCls%>">
                        <table class="bor1 w100 h100 bgC_header2 p0 multiselector_selectTbl js_multiselector_selectTbl <%=selectOutlineCls %> "
                          >
                          <tr class="border_bottom_none w100 hp28 p0">
                            <td class="w100 p0">
                              <div class="w100 p3 verAlignMid">
                                <div>
                                  <logic:empty name="select" property="labelText">
                                    <gsmsg:write key="cmn.selected"/>
                                  </logic:empty>
                                  <logic:notEmpty name="select" property="labelText">
                                    <bean:write name="select" property="labelText" />
                                  </logic:notEmpty>
                                </div>
                                <div class="ml5 js_multiselector_selectLoading display_none verAlignMid">
                                  <div class="txt_m txt_c opacity6 verAlignMid">
                                      <img class="btn_classicImg-display hp15" src="../common/images/classic/icon_loader.gif" />
                                      <div class="loader-ball hp15 wp15 "><span class=""></span><span class=""></span><span class=""></span></div>
                                  </div>
                                </div>
                                <label class="textLink ml_auto verAlignMid">
                                  <button type="button" class="ml_auto display_none" href="#!" onclick="$(this).ui_multiselector({cmd:'alldelete'}, arguments[0]);"></button>
                                  <gsmsg:write key="cmn.delete.all"/>
                                </label>
                                <input type="radio" name="<bean:write name="<%=name %>" property="targetSelector"/>.selectTargetKey" value="<%=String.valueOf(entry.getKey()) %>" class="display_none" <%=checked%> />
                              </div>
                            </td>
                          </tr>
                          <tr class="border_top_none w100 h100 lh120  bgC_tableCell">
                            <td class="w100 p0 hp100">
                            <bean:define id="subformParam">
                            {name:'selectorDispCmd', value:'selected'},
                            {name:'targetSelector', value:'<%=property %>'},
                            {name:'formClsName', value:'<bean:write name="<%=name %>" property="formClsName" />'},
                              <logic:notEmpty name="ui" property="selectGroupSid">
                              {name:'<%=property %>.selectGroupSid', value:'<%=ui.getSelectGroupSid() %>'},
                              </logic:notEmpty>
                            {name:'selectorParam.groupSelectionParamName', value:'<%=ui.getGroupSelectionParamName() %>'},
                            {name:'selectorParam.select(<%=ISelector.SELECT_NAME_HEAD %>0).parameterName', value:'<%=ui.getSelect(ISelector.SELECT_NAME_HEAD + "0").getParameterName() %>'},
                            {name:'selectorParam.select(<%=ISelector.SELECT_NAME_HEAD %>0).labelText', value:'<%=ui.getSelect(ISelector.SELECT_NAME_HEAD + "0").getLabelText() %>'},
                               <logic:equal name="selectCnt" value="2">
                            {name:'selectorParam.select(<%=ISelector.SELECT_NAME_HEAD %>1).parameterName', value:'<%=ui.getSelect(ISelector.SELECT_NAME_HEAD + "1").getParameterName() %>'},
                            {name:'selectorParam.select(<%=ISelector.SELECT_NAME_HEAD %>1).labelText', value:'<%=ui.getSelect(ISelector.SELECT_NAME_HEAD + "1").getLabelText() %>'},
                               </logic:equal>
                            </bean:define>
                            <fieldset class="w100 h100 js_multiselector_selected pos_rel ofy_a overlapscroll js_overlapscroll " data-subform_init="{
                                url:'../common/cmn360.do',
                                param:[
                                  <bean:write name="subformParam" />
                                    ],
                                inputsrc:'form'
                                }">
                                <logic:notEmpty name="select" property="list" >
                                  <logic:iterate id="child" name="select" property="list" type="IChild">
                                    <div class=" js_multiselector_selectchild p3 pb0 display_flex w100 pt3 pr6 cursor_p word_b-all content-hoverChange verAlignMid" onclick="$(this).ui_multiselector({cmd:'delete'}, arguments[0]);">
                                      <logic:equal name="child" property="type" value="USER">
                                        <img class="mr5 classic-display wp18" src="../common/images/classic/icon_user.png">
                                        <img class="mr5 original-display" src="../common/images/original/icon_user.png">
                                      </logic:equal>
                                      <logic:equal name="child" property="type" value="GROUP">
                                        <img class="mr5 classic-display" src="../common/images/classic/icon_group.png">
                                        <img class="mr5 original-display" src="../common/images/original/icon_group.png">
                                      </logic:equal>
                                      <input type="hidden" name="<%=paramUser %>" value="<%=child.getValue() %>" />
                                      <bean:define id="deleteCls" value="" />
                                      <bean:define id="mukoCls" value="" />
                                      <logic:equal name="child" property="jkbn" value="<%=String.valueOf(GSConst.JTKBN_DELETE) %>">
                                        <bean:define id="deleteCls" value="delete_border" />
                                      </logic:equal>
                                      <logic:equal name="child" property="teisiFlg" value="<%=String.valueOf(GSConst.YUKOMUKO_MUKO) %>">
                                        <bean:define id="mukoCls" value="mukoUser" />
                                      </logic:equal>
                                      <div class="mwp120 txt_l <bean:write name="deleteCls"/> <bean:write name="mukoCls"/>">
                                        <bean:write name="child" property="name"/>
                                      </div>
                                    </div>
                                  </logic:iterate>
                                </logic:notEmpty>
                            </fieldset>

                            </td>
                          </tr>
                        </table>
                      </td>
                      <td class="p0 border_none wp30">
                        <table class="table-fixed border_none w100 h100 p0">
                          <tr class="border_none w100">
                            <td class="border_none w100 hp28">
                            </td>
                          </tr>
                          <tr class="border_none w100">
                            <td class="border_none txt_c">
                              <div class="h100 verAlignMid mrl_auto">
                                <i class="display_b icon-arrow_left fs_20 multiselector_selectArrow js_multiselector_selectArrow cl_fontWeek <%=selectedClsArrow %>"
                                 ></i>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>

                    </tr>
                    <bean:define id="selectPaddingCls" value="p3 pl0 pr0 pb0" />
                  </logic:iterate>
                </logic:notEmpty>
              </table>
            </td>
            <bean:define id="selectionWidthCls" value="w70" />
            <logic:empty name="ui" property="groupSelectionList">
              <bean:define id="selectionWidthCls" value="w40" />
            </logic:empty>
            <td class="border_none <%=selectionWidthCls %> h100 p0">
              <table class="multiselector_selection table-fixed bor1 w100 h100 p0">
                <colgroup ><col class="w45 " /><col class="w55 " /></colgroup>
                <tr class="hp28  bgC_header2" >
                  <td class="w100 p0 pos_rel" colspan="2">
                    <%-- 詳細検索ボタン 選択先の右端にそろえる --%>
                    <logic:equal name="ui" property="useDetailSearch" value="true">
                      <button class="pos_abs baseBtn userSelect_btn mt0 multiselector_searchBtn js_multiselector_searchBtn" type="button" onclick="multiselectorOpenSearchDialog(this);" value="<gsmsg:write key="cmn.advanced.search"/>">
                        <gsmsg:write key="cmn.advanced.search"/>
                      </button>
                    </logic:equal>

                    <div class="w100 p3 verAlignMid display_flex" >
                      <div><gsmsg:write key="cmn.not.selected"/></div>
                      <div class="ml5 js_multiselector_selectionLoading display_none verAlignMid">
                        <div class="txt_m txt_c opacity6 verAlignMid">
                          <img class="btn_classicImg-display hp15" src="../common/images/classic/icon_loader.gif" />
                          <div class="loader-ball hp15 wp15 "><span class=""></span><span class=""></span><span class=""></span></div>
                        </div>
                      </div>
                      <label class="ml_auto textLink ">
                        <button type="button" class="display_none" onclick="$(this).ui_multiselector({cmd:'allselect'}, arguments[0]);"></button>
                        <gsmsg:write key="cmn.select.all"/>
                      </label>

                    </div>
                  </td>
                </tr>
                <tr class="h100 border_none bgC_lightGray">
                  <%-- tdに対する hpによる固定高さ指定はFireFoxで子要素のスクロールを有効にするため
                       以下を満たすための実装
                       ・子要素のスクロールを有効にするためには親領域の高さを固定で指定する必要がある
                       ・テーブルのセルの高さは親の高さに依存し可変する必要がある
                       ・table-fixedのセルの高さは親の領域に依存し固定高さ指定は無視される
                       --%>
                  <logic:notEmpty name="ui" property="groupSelectionList">
                  <td class="p0  border_none hp100">
                    <div class=" w100 h100 ofy_a js_multiselector_groupSelection overlapscroll js_overlapscroll ">
                      <logic:iterate id="group" name="ui" property="groupSelectionList" type="IChild">
                        <bean:define id="selectCls" value="content-hoverChange eventImg cursor_p " />
                        <bean:define id="labelBody" value="" />
                        <bean:define id="checked" value="" />
                        <logic:equal name="ui" property="selectGrp" value="<%=group.toString()%>">
                          <bean:define id="selectCls" value="bgC_tableCell cursor_d " />
                          <bean:define id="checked" value="checked" />
                        </logic:equal>
                        <div class="w100 word_b-all p3 pb0 pr6 js_multiselector_grpSelect verAlignMid display_flex <%=selectCls %>"
                          onclick="$(this).ui_multiselector({cmd:'selectionChange'}, arguments[0]);">
                          <logic:equal name="group" property="type" value="<%=EnumChildType.MYGROUP.name() %>">
                            <img class="mr5 wp18 ptb1 classic-display" src="../main/images/classic/icon_group.gif">
                            <img class="mr5 original-display" src="../main/images/original/icon_mygroup_18.png">
                          </logic:equal>
                          <logic:equal name="group" property="type" value="<%=EnumChildType.GROUP.name() %>">
                            <% for (int i = 1; i < ((GroupChild) group).getGroup().getClassLevel(); i++) {%>
                              <div class="ml10"></div>
                            <% }%>
                            <img class="mr5 classic-display" src="../common/images/classic/icon_group.png">
                            <img class="mr5 original-display" src="../common/images/original/icon_group.png">
                          </logic:equal>
                          <div class="txt_l"><bean:write name="group" property="name"/></div>
                          <input type="radio" class="display_none" name="<%=ui.getGroupSelectionParamName() %>" value="<%=group.getValue() %>"
                            <%=checked %>
                             />
                        </div>

                      </logic:iterate>
                    </div>
                  </td>
                  </logic:notEmpty>
                  <bean:define id="groupselnone" value="" />
                  <logic:empty name="ui" property="groupSelectionList">
                    <bean:define id="groupselnone" >colspan="2"</bean:define>
                  </logic:empty>

                  <%-- tdに対する hpによる固定高さ指定はFireFoxで子要素のスクロールを有効にするためのおまじない
                       以下を満たすための実装
                       ・子要素のスクロールを有効にするためには親領域の高さを固定で指定する必要がある
                       ・テーブルのセルの高さは親の高さに依存して可変する必要がある
                       ・table-fixedのセルの高さは親の領域に依存し固定高さ指定は無視される
                       --%>
                  <td class=" p0 border_none hp100 mxwp300" <%=groupselnone %>>
                    <div class="w100 h100 ofy_a js_multiselector_childSelection overlapscroll js_overlapscroll bgC_tableCell">
                      <bean:define id="subformParam">
                        {name:'selectorDispCmd', value:'noselect'},
                        {name:'targetSelector', value:'<%=property %>'},
                        {name:'formClsName', value:'<bean:write name="<%=name %>" property="formClsName" />'},
                        <logic:notEmpty name="ui" property="selectGroupSid">
                          {name:'<%=property %>.selectGroupSid', value:'<%=ui.getSelectGroupSid() %>'},
                        </logic:notEmpty>
                        {name:'selectorParam.groupSelectionParamName', value:'<%=ui.getGroupSelectionParamName() %>'},
                        {name:'selectorParam.select(<%=ISelector.SELECT_NAME_HEAD %>0).parameterName', value:'<%=ui.getSelect(ISelector.SELECT_NAME_HEAD + "0").getParameterName() %>'},
                        {name:'selectorParam.select(<%=ISelector.SELECT_NAME_HEAD %>0).labelText', value:'<%=ui.getSelect(ISelector.SELECT_NAME_HEAD + "0").getLabelText() %>'},
                        <logic:equal name="selectCnt" value="2">
                        {name:'selectorParam.select(<%=ISelector.SELECT_NAME_HEAD %>1).parameterName', value:'<%=ui.getSelect(ISelector.SELECT_NAME_HEAD + "1").getParameterName() %>'},
                        {name:'selectorParam.select(<%=ISelector.SELECT_NAME_HEAD %>1).labelText', value:'<%=ui.getSelect(ISelector.SELECT_NAME_HEAD + "1").getLabelText() %>'},
                        </logic:equal>

                      </bean:define>
                      <fieldset class="h100 js_multiselector_noselectbody pos_rel"
                       data-subform_init="{
                          url:'../common/cmn360.do',
                          param:[
                            <bean:write name="subformParam" />
                              ],
                          inputsrc:'form'
                          }">
                          <bean:write name="noselectBody" filter="false"/>
                      </fieldset>

                    </div>
                  </td>
                </tr>
              </table>
            </td>
            <logic:empty name="ui" property="groupSelectionList">
              <td class="border_none p0 w30"></td>
            </logic:empty>

          </tr>
        </table>
      </td>
    </tr>
  </table>
</logic:equal>


<%-- 選択済み描画更新 --%>
<logic:equal name="<%=name %>" property="selectorDispCmd" value="selected">
  <logic:notEmpty name="ui" property="selectMap" >
    <bean:define id="select" name="ui" property="<%=\"selectMap(\" + ui.getSelectTargetKey() + \")\" %>" />
    <bean:define id="paramUser" name="select" property="parameterName" type="String" />
    <logic:notEmpty name="select" property="list" >
      <logic:iterate id="child" name="select" property="list" type="IChild">
        <div class=" js_multiselector_selectchild p3 pb0 display_flex w100 pt3 pr6 cursor_p word_b-all content-hoverChange verAlignMid" onclick="$(this).ui_multiselector({cmd:'delete'}, arguments[0]);">
          <logic:equal name="child" property="type" value="USER">
            <img class="mr5 classic-display wp18" src="../common/images/classic/icon_user.png">
            <img class="mr5 original-display" src="../common/images/original/icon_user.png">
          </logic:equal>
          <logic:equal name="child" property="type" value="GROUP">
            <img class="mr5 classic-display" src="../common/images/classic/icon_group.png">
            <img class="mr5 original-display" src="../common/images/original/icon_group.png">
          </logic:equal>
          <input type="hidden" name="<%=paramUser %>" value="<%=child.getValue() %>" />
          <bean:define id="deleteCls" value="" />
          <bean:define id="mukoCls" value="" />
          <logic:equal name="child" property="jkbn" value="<%=String.valueOf(GSConst.JTKBN_DELETE) %>">
            <bean:define id="deleteCls" value="delete_border" />
          </logic:equal>
          <logic:equal name="child" property="teisiFlg" value="<%=String.valueOf(GSConst.YUKOMUKO_MUKO) %>">
            <bean:define id="mukoCls" value="mukoUser" />
          </logic:equal>
          <div class="mwp120 txt_l <bean:write name="deleteCls"/> <bean:write name="mukoCls"/>">
            <bean:write name="child" property="name"/>
          </div>
        </div>
      </logic:iterate>
    </logic:notEmpty>
  </logic:notEmpty>
</logic:equal>

<%-- 未選択描画更新 --%>
<logic:equal name="<%=name %>" property="selectorDispCmd" value="noselect">
  <bean:write name="noselectBody" filter="false"/>
</logic:equal>
