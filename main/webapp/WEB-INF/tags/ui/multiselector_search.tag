<%@tag import="jp.groupsession.v2.cmn.ui.parts.select.ISelector"%>
<%@tag import="jp.groupsession.v2.cmn.ui.parts.select.EnumModeType"%>
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


<%-- 初回描画 --%>
<logic:equal name="<%=name %>" property="selectorDispCmd" value="init">
  <bean:define id="ui"  name="<%=name %>" property="<%=selector %>" type="ISelector" />
  <bean:define id="selectCnt" ><%=ui.getSelectMap().size() %></bean:define>
  <logic:equal name="ui" property="useDetailSearch" value="true">
    <bean:size name="ui" property="selectMap" id="selectMapSize" />
      <div class="js_multiSelector-Search w100 h100 display_n pos_rel">
        <div class="js_multiselector_searchLoading w100 h100 pos_abs opacity10 bgC_body display_n z_idx100">
        </div>
        <div class="js_multiselector_searchLoading w100 h100 pos_abs display_n z_idx100 txt_c">
          <div class="h100 verAlignMid">
            <img class="btn_classicImg-display hp15" src="../common/images/classic/icon_loader.gif" />
            <div class="loader-ball hp60 wp60"><span class=""></span><span class=""></span><span class=""></span></div>
          </div>
        </div>
        <bean:define id="selectedData"  type="String">
          data-multiselector_target="<%=ui.getSelectTargetKey() %>"
        </bean:define>
        <div class="display_flex w100 h100 js_multiselector" <%=selectedData %>>
          <div class="js_filterCloseArea multiselector_filterCloseArea bgC_lightGray display_n cl_linkDef cl_linkHoverChange" onclick="multiselectorFilterDspChange();">
            <div class="txt_c h95">
              <span class="icon-filter cl_fontBody"></span>
            </div>
            <div class="txt_c ">
              <span class="icon-arrow_right"></span>
            </div>
          </div>
          <div class="js_filterOpenArea multiselector_filterOpenArea bgC_lightGray">
            <logic:notEmpty name="ui" property="groupSelectionList">
            <div class="js_filterAreaClose multiselector_filterAreaClose cl_linkDef cl_linkHoverChange verAlignMid" onclick="multiselectorFilterDspChange();">
              <span class="icon-arrow_left mr5"></span><gsmsg:write key="cmn.close" />
            </div>
            </logic:notEmpty>
            <div class="mt5">
              <span class="icon-filter"></span>
              <gsmsg:write key="cmn.filter" />
            </div>
<!-- フィルター一覧(ユーザ/グループ選択モード時) start -->
            <logic:notEmpty name="ui" property="groupSelectionList">
            <div class="js_filterSelect">
              <div class="display_flex mt10">
                <div class="js_groupFilter wp90 ml_auto mr5 bor1 multiselector_filter multiselector_filter-focus cl_fontOutline" onclick="multiselectorChangeFilter('group');">
                  <gsmsg:write key="cmn.group" />
                </div>
                <div class="js_userFilter wp90 mrl_auto bor1 multiselector_filter cl_multiselector cursor_p" onclick="multiselectorChangeFilter('user');">
                  <gsmsg:write key="cmn.shain.info" />
                </div>
              </div>
              <div class="display_flex mt5">
                <div class="js_postFilter wp90 ml_auto mr5 bor1 multiselector_filter cl_multiselector cursor_p" onclick="multiselectorChangeFilter('post');">
                  <gsmsg:write key="cmn.post" />
                </div>
                <div class="js_labelFilter wp90 mrl_auto bor1 multiselector_filter cl_multiselector cursor_p" onclick="multiselectorChangeFilter('label');">
                  <gsmsg:write key="cmn.label" />
                </div>
              </div>
            </div>
            </logic:notEmpty>
<!-- フィルター一覧(ユーザ/グループ選択モード時) end -->
            <div class="mt20 settingForm_separator"></div>
<!-- フィルター設定エリア グループ start -->
            <div class="js_groupFilter-addArea">
              <div>
                <gsmsg:write key="cmn.multiselector.1" />
              </div>
              <div>
                <input type="text" class="wp185 js_groupFilter-keyword" placeholder="<gsmsg:write key="cmn.multiselector.3" />">
              </div>
              <div>
                <button type="button" class="baseBtn" value="<gsmsg:write key="cmn.add" />" onclick="multiselectorAddFilter('group','',-1);">
                  <img class="btn_classicImg-display" src="../common/images/classic/icon_add.png" alt="<gsmsg:write key="cmn.add" />">
                  <img class="btn_originalImg-display" src="../common/images/original/icon_add.png" alt="<gsmsg:write key="cmn.add" />">
                  <gsmsg:write key="cmn.add" />
                </button>
              </div>
              <div class="txt_l pt10">
                <gsmsg:write key="cmn.search2" />
              </div>
              <div class="txt_l pl10">
                ・<gsmsg:write key="cmn.group.id" />
              </div>
              <div class="txt_l pl10">
                ・<gsmsg:write key="cmn.group.name" />
              </div>
            </div>
<!-- フィルター設定エリア グループ end -->
<!-- フィルター設定エリア ユーザ情報 start -->
            <div class="js_userFilter-addArea display_n">
              <div>
                <gsmsg:write key="cmn.multiselector.1" />
              </div>
              <div>
                <input type="text" class="wp185 js_userFilter-keyword" placeholder="<gsmsg:write key="cmn.multiselector.3" />">
              </div>
              <div>
                <button type="button" class="baseBtn" value="<gsmsg:write key="cmn.add" />" onclick="multiselectorAddFilter('user','',-1);">
                  <img class="btn_classicImg-display" src="../common/images/classic/icon_add.png" alt="<gsmsg:write key="cmn.add" />">
                  <img class="btn_originalImg-display" src="../common/images/original/icon_add.png" alt="<gsmsg:write key="cmn.add" />">
                  <gsmsg:write key="cmn.add" />
                </button>
              </div>
              <div class="txt_l pt10">
                <gsmsg:write key="cmn.search2" />
              </div>
              <div class="txt_l pl10">
                ・<gsmsg:write key="cmn.name" />
              </div>
              <div class="txt_l pl10">
                ・<gsmsg:write key="cmn.name.kana" />
              </div>
              <div class="txt_l pl10">
                ・<gsmsg:write key="cmn.employee.staff.number" />
              </div>
            </div>
<!-- フィルター設定エリア ユーザ情報 end -->
<!-- フィルター設定エリア 役職 start -->
            <div class="js_postFilter-addArea display_n">
              <div>
                <gsmsg:write key="cmn.multiselector.2" />
              </div>
              <div>
                <input type="text" class="js_postFilter-keyword wp185" placeholder="<gsmsg:write key="cmn.multiselector.4" />">
              </div>
              <div class="mt5 w100 pos_rel js_filterSelectArea">
                <div class="w100 hp300 bor1 txt_l bgC_body ofy_a overlapscroll js_overlapscroll pos_rel">
                  <bean:define id="subformParam">
                    {name:'selectorDispCmd', value:'filter_post'},
                    {name:'targetSelector', value:'<%=property %>'},
                    {name:'<%=property %>.modeText', value:'EDIT_POPUP'}
                  </bean:define>
                  <fieldset class="h100 js_multiselector_filterPost pos_rel"
                   data-subform_init="{
                      url:'../common/cmn360.do',
                      param:[
                        <bean:write name="subformParam" />
                          ],
                      inputsrc:['form', '.js_multiSelectorDialog']
                      }">
                  </fieldset>
                </div>
                <div class="js_overlapscroll_track overlapscroll_track">
                  <div class="js_overlapscroll_thumb overlapscroll_thumb bgC_darkGray">
                  </div>
                </div>
              </div>
            </div>
<!-- フィルター設定エリア 役職 end -->
<!-- フィルター設定エリア ラベル start -->
            <div class="js_labelFilter-addArea display_n">
              <div>
                <gsmsg:write key="cmn.multiselector.2" />
              </div>
              <div>
                <input type="text" class="js_labelFilter-keyword wp185" placeholder="<gsmsg:write key="cmn.multiselector.4" />">
              </div>
              <div class="mt5 w100 pos_rel js_filterSelectArea">
                <div class="w100 hp300 bor1 txt_l bgC_body ofy_a overlapscroll js_overlapscroll pos_rel">
                  <bean:define id="subformParam">
                    {name:'selectorDispCmd', value:'filter_label'},
                    {name:'targetSelector', value:'<%=property %>'},
                    {name:'<%=property %>.modeText', value:'EDIT_POPUP'}
                  </bean:define>
                  <fieldset class="h100 js_multiselector_filterLabel pos_rel"
                   data-subform_init="{
                      url:'../common/cmn360.do',
                      param:[
                        <bean:write name="subformParam" />
                          ],
                      inputsrc:['form', '.js_multiSelectorDialog']
                      }">
                  </fieldset>
                </div>
                <div class="js_overlapscroll_track overlapscroll_track">
                  <div class="js_overlapscroll_thumb overlapscroll_thumb bgC_darkGray">
                  </div>
                </div>
              </div>
            </div>
<!-- フィルター設定エリア ラベル end -->
          </div>
          <div class="w100 h100">
<!-- 追加したフィルタ表示エリア start -->
            <div class="js_filterArea w100 hp25"></div>
<!-- 追加したフィルタ表示エリア end -->
            <div class="display_flex">
<!-- 未選択エリア start -->
              <bean:define id="selectAllAreaClass" value="w65" />
              <logic:empty name="ui" property="groupSelectionList">
                <bean:define id="selectAllAreaClass" value="w35" />
              </logic:empty>
              <div class="js_selectArea hp475 pos_rel <%=selectAllAreaClass %>">
                <div class="cursor_p fs_10 multiselector_allSelect cl_linkDef cl_linkHoverChange" onclick="$(this).ui_multiselector({cmd:'allselect_search'}, arguments[0]);">
                  <gsmsg:write key="cmn.multiselector.5" />
                </div>
                <div class="userGroup_title">
                  <gsmsg:write key="cmn.not.selected"/>
                </div>
                <div class="display_flex">
                  <logic:notEmpty name="ui" property="groupSelectionList">
                    <div class="w50 pos_rel">
                      <div class="js_selectArea-group multiselector_selectArea-group bgC_lightGray w100 ofy_a overlapscroll js_overlapscroll">
                        <bean:define id="subformParam">
                          {name:'selectorDispCmd', value:'group_search'},
                          {name:'targetSelector', value:'<%=property %>'},
                          {name:'formClsName', value:'<bean:write name="<%=name %>" property="formClsName" />'},
                          {name:'<%=property %>.modeText', value:'EDIT_POPUP'},
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
                        <fieldset class="h100 js_multiselector_noselectgroup pos_rel"
                         data-subform_init="{
                            url:'../common/cmn360.do',
                            param:[
                              <bean:write name="subformParam" />
                                ],
                            inputsrc:['form', '.js_multiSelectorDialog']
                            }">
                          <logic:notEmpty name="ui" property="groupSelectionList">
                            <logic:iterate id="group" name="ui" property="groupSelectionList" type="IChild">
                              <bean:define id="selectCls" value="content-hoverChange eventImg cursor_p " />
                              <bean:define id="labelBody" value="" />
                              <bean:define id="checked" value="" />
                              <logic:equal name="ui" property="selectGrp" value="<%=group.toString()%>">
                                <bean:define id="selectCls" value="bgC_tableCell cursor_d " />
                                <bean:define id="checked" value="checked" />
                              </logic:equal>
                              <div class="w100 word_b-all p3 pb0 js_multiselector_grpSelect verAlignMid display_flex <%=selectCls %>"
                                onclick="$(this).ui_multiselector({cmd:'selectionChange'}, arguments[0]);"
                                >
                                <input type="radio" class="display_none" name="<%=ui.getGroupSelectionParamName() %>" value="<%=group.getValue() %>"
                                <%=checked %> />
                                <logic:equal name="group" property="type" value="<%=EnumChildType.MYGROUP.name() %>">
                                  <img class="mr5 wp18 ptb1 classic-display" src="../main/images/classic/icon_group.gif">
                                  <img class="mr5 original-display" src="../main/images/original/icon_mygroup_18.png">
                                </logic:equal>
                                <logic:equal name="group" property="type" value="<%=EnumChildType.GROUP.name() %>">
                                  <img class="mr5 classic-display" src="../common/images/classic/icon_group.png">
                                  <img class="mr5 original-display" src="../common/images/original/icon_group.png">
                                </logic:equal>
                                <div class="txt_l"><bean:write name="group" property="name"/></div>
                              </div>
                            </logic:iterate>
                          </logic:notEmpty>
                        </fieldset>
                      </div>
                      <div class="js_overlapscroll_track overlapscroll_track">
                        <div class="js_overlapscroll_thumb overlapscroll_thumb bgC_darkGray">
                        </div>
                      </div>
                    </div>
                  </logic:notEmpty>
                  <bean:define id="selectAreaClass" value="w50" />
                  <logic:empty name="ui" property="groupSelectionList">
                    <bean:define id="selectAreaClass" value="w100 bor_l1" />
                  </logic:empty>
                  <div class="<%=selectAreaClass %>">
                    <div class="js_selectArea-user multiselector_selectArea-user bgC_body ofy_a overlapscroll js_overlapscroll w100">

                      <bean:define id="subformParam">
                        {name:'selectorDispCmd', value:'noselect_search'},
                        {name:'targetSelector', value:'<%=property %>'},
                        {name:'formClsName', value:'<bean:write name="<%=name %>" property="formClsName" />'},
                        {name:'<%=property %>.modeText', value:'EDIT_POPUP'},
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
                          inputsrc:['form', '.js_multiSelectorDialog']
                          }">
                      </fieldset>
                    </div>
                    <div class="js_overlapscroll_track overlapscroll_track">
                      <div class="js_overlapscroll_thumb overlapscroll_thumb bgC_darkGray"></div>
                    </div>
                  </div>
                </div>
              </div>
<!-- 未選択エリア end -->
<!-- 選択済みエリア(単体) start -->
              <logic:equal name="selectCnt" value="1">
                <div class="js_target-1column">
                  <div class="multiselector_arrowArea">
                    <div class="verAlignMid h100">
                      <span class="icon-arrow_right fs_60 cl_fontArrow"></span>
                    </div>
                  </div>
                </div>
                <logic:iterate id="entry" name="ui" property="selectMap" indexId="index" type="Entry">
                  <bean:define id="select" name="entry" property="value" />
                  <bean:define id="paramUser" name="select" property="parameterName" type="String" />
                  <bean:define id="selectedAreaClass" value="w35" />
                  <logic:empty name="ui" property="groupSelectionList">
                    <bean:define id="selectedAreaClass" value="w65" />
                  </logic:empty>
                  <div class="js_selectedArea w35 hp475 pos_rel js_multiselector_select <%=selectedAreaClass %>" data-multiselector_parametername="<%=paramUser %>" name="<%=String.valueOf(entry.getKey()) %>">
                    <div class="js_target-1column">
                      <div class="cursor_p fs_10 multiselector_allSelect cl_linkDef cl_linkHoverChange" onclick="$(this).ui_multiselector({cmd:'alldelete_search'}, arguments[0]);">
　　                        <gsmsg:write key="cmn.delete.all" />
                      </div>
                      <div class="userGroup_title">
                        <logic:empty name="select" property="labelText">
                          <gsmsg:write key="cmn.selected"/>
                        </logic:empty>
                        <logic:notEmpty name="select" property="labelText">
                          <bean:write name="select" property="labelText" />
                        </logic:notEmpty>
                      </div>
                      <div>
                        <div class="js_selectedArea-1column multiselector_selectedArea bgC_body borC_deep ofy_a overlapscroll js_overlapscroll">
                          <bean:define id="subformParam">
                            {name:'selectorDispCmd', value:'selected_search'},
                            {name:'targetSelector', value:'<%=property %>'},
                            {name:'formClsName', value:'<bean:write name="<%=name %>" property="formClsName" />'},
                            {name:'<%=property %>.modeText', value:'EDIT_POPUP'},
                            <logic:notEmpty name="ui" property="selectGroupSid">
                              {name:'<%=property %>.selectGroupSid', value:'<%=ui.getSelectGroupSid() %>'},
                            </logic:notEmpty>
                            {name:'selectorParam.groupSelectionParamName', value:'<%=ui.getGroupSelectionParamName() %>'},
                            {name:'selectorParam.select(<%=ISelector.SELECT_NAME_HEAD %>0).parameterName', value:'<%=ui.getSelect(ISelector.SELECT_NAME_HEAD + "0").getParameterName() %>'},
                            {name:'selectorParam.select(<%=ISelector.SELECT_NAME_HEAD %>0).labelText', value:'<%=ui.getSelect(ISelector.SELECT_NAME_HEAD + "0").getLabelText() %>'},
                          </bean:define>
                          <bean:define id="selectedColumnAreaClass" value="multiselector_selected-1column" />
                          <logic:empty name="ui" property="groupSelectionList">
                            <bean:define id="selectedColumnAreaClass" value="multiselector_selected-2column" />
                          </logic:empty>
                          <fieldset class="js_multiselector_selected <%=selectedColumnAreaClass %>" data-subform_init="{
                              url:'../common/cmn360.do',
                              param:[
                                <bean:write name="subformParam" />
                                  ],
                              inputsrc:['form', '.js_multiSelectorDialog']
                              }">
                          </fieldset>
                        </div>
                        <div class="js_overlapscroll_track overlapscroll_track">
                          <div class="js_overlapscroll_thumb overlapscroll_thumb bgC_darkGray">
                          </div>
                        </div>
                      </div>
                      <div class="compBtn mt5 hp40 cl_fontOutline txt_c cursor_p" onclick="multiselectorSearchComplete();">
                        <div class="verAlignMid h100 fw_bold">
                          <gsmsg:write key="cmn.complete" />
                        </div>
                      </div>
                    </div>
                  </div>
                </logic:iterate>
              </logic:equal>
<!-- 選択済みエリア(単体) end -->
<!-- 選択済みエリア(複数) start -->
              <logic:equal name="selectCnt" value="2">
                <div class="js_target-2column">
                  <div class="multiselector_arrowArea-2column">
                    <div class="multiselector_arrowArea-event js_changeTarget1 display_n"></div>
                    <div class="verAlignMid h100">
                      <span class="js_arrow1 icon-arrow_right fs_60 cl_fontArrow"></span>
                    </div>
                  </div>
                  <div class="multiselector_arrowArea-2column ">
                    <div class="multiselector_arrowArea-event js_changeTarget2"></div>
                    <div class="verAlignMid h100">
                      <span class="js_arrow2 icon-arrow_right fs_60 cl_fontWeek"></span>
                    </div>
                  </div>
                  <div class="hp30"></div>
                </div>
                <bean:define id="selectedAreaClass" value="w35" />
                <logic:empty name="ui" property="groupSelectionList">
                  <bean:define id="selectedAreaClass" value="w65" />
                </logic:empty>
                <div class="js_selectedArea hp475 pos_rel <%=selectedAreaClass %>">
                  <bean:define id="activeClass" value="selectoutline" type="String" />
                  <logic:iterate id="entry" name="ui" property="selectMap" indexId="index" type="Entry">
                    <bean:define id="select" name="entry" property="value" />
                    <bean:define id="paramUser" name="select" property="parameterName" type="String" />
                    <bean:define id="checked" value="" type="String" />
                    <logic:equal value="<%=ui.getSelectTargetKey() %>" name="entry" property="key">
                      <bean:define id="checked" value="checked" type="String" />
                    </logic:equal>
                    <div class="js_multiselector_select mb5 <%= activeClass %>" data-multiselector_parametername="<%=paramUser %>" name="<%=String.valueOf(entry.getKey()) %>" onclick="$(this).ui_multiselector({cmd:'selectorChange'}, arguments[0]);">
                      <div>
                        <div class="userGroup_title">
                          <logic:empty name="select" property="labelText">
                            <gsmsg:write key="cmn.selected"/>
                          </logic:empty>
                          <logic:notEmpty name="select" property="labelText">
                            <bean:write name="select" property="labelText" />
                          </logic:notEmpty>
                        </div>
                        <%
                            int idx = index;
                            if (idx == 0) { %>
                          <div class="cursor_p fs_10 multiselector_allSelect multiselector_filter cl_linkDef cl_linkHoverChange" onclick="$(this).ui_multiselector({cmd:'alldelete_search'}, arguments[0]);">
                            <gsmsg:write key="cmn.delete.all" />
                          </div>
                        <% } else { %>
                          <div class="cursor_p fs_10 multiselector_allSelect-2column cl_linkDef cl_linkHoverChange" onclick="$(this).ui_multiselector({cmd:'alldelete_search'}, arguments[0]);">
                            <gsmsg:write key="cmn.delete.all" />
                          </div>
                        <% } %>
                        <div>
                        <div class="js_selectedArea-2column multiselector_selectedArea-2column borC_deep bgC_body ofy_a overlapscroll js_overlapscroll <%= activeClass %>"  data-multiselector_parametername="<%=paramUser %>" name="<%=String.valueOf(entry.getKey()) %>">
                          <input type="radio" class="js_multiselector_targetInput display_none" name="<bean:write name="<%=name %>" property="targetSelector"/>.selectTargetKey" value="<%=String.valueOf(entry.getKey()) %>" <%=checked%> disabled />
                          <bean:define id="subformParam">
                            {name:'selectorDispCmd', value:'selected_search'},
                            {name:'targetSelector', value:'<%=property %>'},
                            {name:'formClsName', value:'<bean:write name="<%=name %>" property="formClsName" />'},
                            {name:'<%=property %>.modeText', value:'EDIT_POPUP'},
                            <logic:notEmpty name="ui" property="selectGroupSid">
                              {name:'<%=property %>.selectGroupSid', value:'<%=ui.getSelectGroupSid() %>'},
                            </logic:notEmpty>
                            {name:'selectorParam.groupSelectionParamName', value:'<%=ui.getGroupSelectionParamName() %>'},
                            {name:'<%=property %>.selectTargetKey', value:'<%=String.valueOf(entry.getKey()) %>'}
                          </bean:define>
                          <bean:define id="selectedColumnAreaClass" value="multiselector_selected-1column" />
                          <logic:empty name="ui" property="groupSelectionList">
                            <bean:define id="selectedColumnAreaClass" value="multiselector_selected-2column" />
                          </logic:empty>
                          <fieldset class="js_multiselector_selected <%=selectedColumnAreaClass %>" data-subform_init="{
                              url:'../common/cmn360.do',
                              param:[
                                <bean:write name="subformParam" />
                                  ],
                              inputsrc:['form', '.js_multiSelectorDialog']
                              }">
                          </fieldset>
                        </div>
                        <div class="js_overlapscroll_track overlapscroll_track">
                          <div class="js_overlapscroll_thumb overlapscroll_thumb bgC_darkGray">
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                    <bean:define id="activeClass" value="" type="String" />
                  </logic:iterate>
                  <div class="bgC_header1 hp40 cl_fontOutline cl_linkHoverChange txt_c cursor_p" onclick="multiselectorSearchComplete();">
                    <div class="verAlignMid h100 fw_bold">
                      <gsmsg:write key="cmn.complete" />
                    </div>
                  </div>
                </div>
              </logic:equal>
<!-- 選択済みエリア(複数) end -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </logic:equal>
</logic:equal>

<%-- フィルタ 役職 更新 --%>
<logic:equal name="<%=name %>" property="selectorDispCmd" value="filter_post">
  <logic:iterate id="filterPost" name="<%=name %>" property="filterPositionList">
    <bean:define id="name"  name="filterPost" property="posName" />
    <bean:define id="sid"  name="filterPost" property="posSid" />
    <div class="pl5 content-hoverChange word_b-all" onclick="multiselectorAddFilter('post','',this);" data-name="<%= name %>" data-sid="<%= sid %>"><bean:write name="filterPost" property="posName"/></div>
  </logic:iterate>
</logic:equal>

<%-- フィルタ ラベル 更新 --%>
<logic:equal name="<%=name %>" property="selectorDispCmd" value="filter_label">
  <logic:iterate id="filterLabel" name="<%=name %>" property="filterLabelList">
    <bean:define id="name"  name="filterLabel" property="labName" />
    <bean:define id="sid"  name="filterLabel" property="labSid" />
    <div class="pl5 content-hoverChange word_b-all" onclick="multiselectorAddFilter('label','',this);" data-name="<%= name %>" data-sid="<%= sid %>"><bean:write name="filterLabel" property="labName"/></div>
  </logic:iterate>
</logic:equal>

<%-- 未選択エリア 更新 --%>
<logic:equal name="<%=name %>" property="selectorDispCmd" value="noselect_search">
  <bean:define id="ui"  name="<%=name %>" property="<%=selector %>" type="ISelector" />
  <span></span>
  <logic:notEmpty name="ui" property="selectionList">
    <logic:iterate id="child" name="ui" property="selectionList" type="IChild">
      <div class="bor1 display_flex content-hoverChange mb5">
        <label class="js_multiselector_selectchild display_flex w90">
          <input type="radio" name="nonselect" class=" display_none"
            data-multiselector_type="<%=child.getType().name()%>"
            value="<%=child.getValue()%>"
            onclick="$(this).ui_multiselector({cmd:'select_search'}, arguments[0]);" />
          <div class="w30 txt_c js_selectUserContent">
            <div class="verAlignMid h100">
              <logic:equal name="child" property="type" value="<%=EnumChildType.USER.name()%>">
                <logic:equal name="child" property="pictKf" value="0">
                  <logic:equal name="child" property="binSid" value="0">
                    <img class="multiselector_iconTrim borC_light classic-display" src="../common/images/classic/icon_photo.gif">
                    <img class="multiselector_iconTrim borC_light original-display" src="../common/images/original/photo.png">
                  </logic:equal>
                  <logic:notEqual name="child" property="binSid" value="0">
                    <bean:define id="binsid" name="child" property="binSid" />
                    <img class="multiselector_iconTrim borC_light" src="../common/cmn100.do?CMD=getImageFile&cmn100binSid=<%=binsid %>">
                  </logic:notEqual>
                </logic:equal>
                <logic:notEqual name="child" property="pictKf" value="0">
                  <img class="multiselector_iconTrim borC_light classic-display" src="../common/images/classic/icon_photo_hikokai.gif">
                  <img class="multiselector_iconTrim borC_light original-display" src="../common/images/original/photo_hikokai.gif">
                </logic:notEqual>
              </logic:equal>
              <logic:equal name="child" property="type" value="<%=EnumChildType.GROUP.name()%>">
                <img class="multiselector_iconTrim borC_light classic-display" src="../common/images/classic/header_group_38.png">
                <img class="multiselector_iconTrim borC_light original-display" src="../common/images/original/icon_group_32.png">
              </logic:equal>
            </div>
          </div>
          <div class="w70 txt_m js_selectUserContent">
            <div class="display_tbl h100 pt5 pb5">
              <div class="display_tbl_c txt_m">
                <bean:define id="deleteCls" value="" />
                <bean:define id="mukoCls" value="" />
                <logic:equal name="child" property="jkbn" value="<%=String.valueOf(GSConst.JTKBN_DELETE) %>">
                  <bean:define id="deleteCls" value="delete_border" />
                </logic:equal>
                <logic:equal name="child" property="teisiFlg" value="<%=String.valueOf(GSConst.YUKOMUKO_MUKO) %>">
                  <bean:define id="mukoCls" value="mukoUser" />
                </logic:equal>
                <div class="fw_bold fs_16 lh100 word_b-all <bean:write name="deleteCls"/> <bean:write name="mukoCls"/>">
                  <bean:write name="child" property="name"/>
                </div>
                <logic:equal name="child" property="type" value="<%=EnumChildType.USER.name()%>" >
                  <div class="fs_10 lh110 word_b-all"><bean:write name="child" property="defaultGroup"/></div>
                </logic:equal>
              </div>
            </div>
          </div>
        </label>
        <logic:equal name="child" property="type" value="<%=EnumChildType.USER.name()%>" >
          <div class="w10 txt_r pr5 pt5 js_userInfo" data-sid="<%=child.getValue() %>">
            <span class="icon-infomation fs_15 cl_multiselector"></span>
          </div>
        </logic:equal>
      </div>
    </logic:iterate>
  </logic:notEmpty>
</logic:equal>

<%-- 未選択エリア グループ 更新 --%>
<logic:equal name="<%=name %>" property="selectorDispCmd" value="group_search">
  <bean:define id="ui"  name="<%=name %>" property="<%=selector %>" type="ISelector" />
  <logic:notEmpty name="ui" property="groupSelectionList">
    <logic:iterate id="group" name="ui" property="groupSelectionList" type="IChild">
      <bean:define id="selectCls" value="content-hoverChange eventImg cursor_p " />
      <bean:define id="labelBody" value="" />
      <bean:define id="checked" value="" />
      <logic:equal name="ui" property="selectGrp" value="<%=group.toString()%>">
        <bean:define id="selectCls" value="bgC_tableCell cursor_d " />
        <bean:define id="checked" value="checked" />
      </logic:equal>
      <div class="w100 word_b-all p3 pb0 js_multiselector_grpSelect verAlignMid display_flex <%=selectCls %>"
        onclick="$(this).ui_multiselector({cmd:'selectionChange'}, arguments[0]);"
        >
        <input type="radio" class="display_none" name="<%=ui.getGroupSelectionParamName() %>" value="<%=group.getValue() %>"
        <%=checked %> />
        <logic:equal name="group" property="type" value="<%=EnumChildType.MYGROUP.name() %>">
          <img class="mr5 wp18 ptb1 classic-display" src="../main/images/classic/icon_group.gif">
          <img class="mr5 original-display" src="../main/images/original/icon_mygroup_18.png">
        </logic:equal>
        <logic:equal name="group" property="type" value="<%=EnumChildType.GROUP.name() %>">
          <img class="mr5 classic-display" src="../common/images/classic/icon_group.png">
          <img class="mr5 original-display" src="../common/images/original/icon_group.png">
        </logic:equal>
        <div class="txt_l">
          <bean:write name="group" property="name"/>
        </div>
      </div>
    </logic:iterate>
  </logic:notEmpty>
</logic:equal>

<%-- 選択済みエリア 更新 --%>
<logic:equal name="<%=name %>" property="selectorDispCmd" value="selected_search">
  <bean:define id="ui"  name="<%=name %>" property="<%=selector %>" type="ISelector" />
  <bean:define id="select" name="ui" property="<%=\"selectMap(\" + ui.getSelectTargetKey() + \")\" %>" />
  <bean:define id="paramUser" name="select" property="parameterName" type="String" />
  <logic:notEmpty name="select" property="list" >
    <logic:iterate id="child" name="select" property="list" type="IChild">
      <bean:define id="isHiddenChild" value="true" />
      <logic:equal name="child" property="type" value="GROUP">
        <bean:define id="isHiddenChild" value="false" />
      </logic:equal>
      <logic:equal name="child" property="type" value="USER">
        <bean:define id="isHiddenChild" value="false" />
      </logic:equal>
      <logic:equal name="isHiddenChild" value="false">
        <div class="bor1 display_flex content-hoverChange mb5">
          <div class="js_selectedContent display_flex content-hoverChange w90" onclick="$(this).ui_multiselector({cmd:'delete_search'}, arguments[0]);">
            <input type="hidden" name="<%=paramUser %>" value="<%=child.getValue() %>" />
            <div class="w30 txt_c js_deleteContent">
              <div class="verAlignMid h100">
                <logic:equal name="child" property="type" value="<%=EnumChildType.USER.name()%>">
                  <logic:equal name="child" property="pictKf" value="0">
                    <logic:equal name="child" property="binSid" value="0">
                      <img class="multiselector_iconTrim borC_light classic-display" src="../common/images/classic/icon_photo.gif">
                      <img class="multiselector_iconTrim borC_light original-display" src="../common/images/original/photo.png">
                    </logic:equal>
                    <logic:notEqual name="child" property="binSid" value="0">
                      <bean:define id="binsid" name="child" property="binSid" />
                      <img class="multiselector_iconTrim borC_light" src="../common/cmn100.do?CMD=getImageFile&cmn100binSid=<%=binsid %>">
                    </logic:notEqual>
                  </logic:equal>
                  <logic:notEqual name="child" property="pictKf" value="0">
                    <img class="multiselector_iconTrim borC_light classic-display" src="../common/images/classic/icon_photo_hikokai.gif">
                    <img class="multiselector_iconTrim borC_light original-display" src="../common/images/original/photo_hikokai.gif">
                  </logic:notEqual>
                </logic:equal>
                <logic:equal name="child" property="type" value="<%=EnumChildType.GROUP.name()%>">
                  <img class="multiselector_iconTrim borC_light classic-display" src="../common/images/classic/header_group_38.png">
                  <img class="multiselector_iconTrim borC_light original-display" src="../common/images/original/icon_group_32.png">
                </logic:equal>
              </div>
            </div>
            <div class="w70 js_deleteContent">
              <div class="display_tbl h100 pt5 pb5">
                <div class="display_tbl_c txt_m">
                  <bean:define id="deleteCls" value="" />
                  <bean:define id="mukoCls" value="" />
                  <logic:equal name="child" property="jkbn" value="<%=String.valueOf(GSConst.JTKBN_DELETE) %>">
                    <bean:define id="deleteCls" value="delete_border" />
                  </logic:equal>
                  <logic:equal name="child" property="teisiFlg" value="<%=String.valueOf(GSConst.YUKOMUKO_MUKO) %>">
                    <bean:define id="mukoCls" value="mukoUser" />
                  </logic:equal>
                  <div class="fw_bold fs_15 lh100 word_b-all <bean:write name="deleteCls"/> <bean:write name="mukoCls"/>">
                    <bean:write name="child" property="name"/>
                  </div>
                  <logic:equal name="child" property="type" value="USER">
                    <div class="fs_10 lh110 word_b-all"><bean:write name="child" property="defaultGroup"/></div>
                  </logic:equal>
                </div>
              </div>
            </div>
          </div>
          <logic:equal name="child" property="type" value="USER">
            <div class="w10 txt_r pr5 pt5 js_userInfo" data-sid="<%=child.getValue() %>">
              <span class="icon-infomation fs_15 cl_multiselector"></span>
            </div>
          </logic:equal>
        </div>
      </logic:equal>
      <logic:notEqual name="isHiddenChild" value="false">
          <input type="hidden" name="<%=paramUser %>" value="<%=child.getValue() %>" />
      </logic:notEqual>
    </logic:iterate>
  </logic:notEmpty>
</logic:equal>
