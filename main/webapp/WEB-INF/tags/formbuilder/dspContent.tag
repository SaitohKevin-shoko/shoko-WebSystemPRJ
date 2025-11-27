<%@tag import="jp.groupsession.v2.cmn.formmodel.TimeBox"%>
<%@tag import="jp.co.sjts.util.StringUtilHtml"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Calc"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Sum"%>
<%@tag import="java.util.List"%>
<%@tag import="org.apache.commons.collections.CollectionUtils"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.CheckBox"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.ComboBox"%>
<%@tag import="org.apache.commons.lang.StringUtils"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.RadioButton"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.NumberBox"%>
<%@tag import="jp.co.sjts.util.date.UDate"%>
<%@tag import="jp.co.sjts.util.date.UDateUtil"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.DateBox"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Textarea"%>
<%@tag import="jp.co.sjts.util.StringUtil"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Comment"%>
<%@tag import="jp.co.sjts.util.NullDefault"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Textbox"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.BlockList"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Block"%>
<%@tag import="jp.co.sjts.util.json.JSONObject"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.TextInput"%>
<%@tag import="jp.groupsession.v2.cmn.formmodel.Temp"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.EnumFormModelKbn"%>
<%@tag import="jp.groupsession.v2.cmn.formbuilder.FormCell"%>
<%@ tag pageEncoding="utf-8" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg" %>
<%@ taglib tagdir="/WEB-INF/tags/formbuilder" prefix="fb" %>

<%@ attribute description="FormCell" name="bean" type="FormCell" %>
<%@ attribute description="描画更新先jQuery参照" name="parentJquery" type="java.lang.String" %>
<%@ attribute description="ドロップテーブル名" name="tablename" type="java.lang.String" %>

<%
  JSONObject json = bean.toJson();


  String notAddibleW = "";
  if (bean.getType() == EnumFormModelKbn.block) {
    notAddibleW = "notAddibleW";
    json.remove("body");
  } else if (bean.getType() == EnumFormModelKbn.blocklist) {
    notAddibleW = "notAddibleW";
    JSONObject body = json.getJSONObject("body");
    body.remove("header");
    body.remove("body");
    body.remove("footer");

  }
%>
<bean:define id="jsonTest" value="<%=json.toString() %>" />



<%--javascliptのロード内で<jsonタグ内を>読み込みjsonObjectとして保管する(スクリプトとして扱うためエスケープが必要) --%>
<json class="display_n">
  <bean:write name="jsonTest" />
</json>

<%--tablenameがある場合（画面初期表示時用） content設定用スクリプトを設定 --%>
<% if (tablename != null) { %>
  <script>
    //コンテンツ要素をjsonから生成し設定
    $(function() {
    var contentJson = <%=json%>;
    var sid = contentJson.sid;
    var cell = $('div.dandd_droptable[name="<%=tablename%>"] div.contents.cell[name="' + sid + '"]');
    var content = cell.data('content');
    var root = cell.parents('.dandd_root:first');
    var config = root.data('config');
    if (config && config.maxSid < sid) {
      config.maxSid = sid;
    }
    content = $.extend(true, content , contentJson);
    cell.data('content', content);
    });
  </script>
<% } %>
<!-- タイトル -->
<% int notitle = 0; %>
<% if (bean.getType() == EnumFormModelKbn.label) { %>
<% notitle =((Comment) bean.getBody()).getNotitle();%>
<% } %>
<% if (bean.getType() != EnumFormModelKbn.label || notitle != 1) { %>
  <div class="title text_bg_index <%=notAddibleW%> "><bean:write name="bean" property="title"  />
    <% if (bean.getRequire() == 1) { %>
      <span class="cl_fontWarn">
        <gsmsg:write key="cmn.comments" />
      </span>
    <% } %>
  </div>
<% } %>
<% String typeName = bean.getType().toString(); %>
<div class="body <%=typeName%>">
  <% if (bean.getType() == EnumFormModelKbn.label) { %>
    <gsmsg:write key="<%=bean.getType().getMsgKey()%>"/>
    <logic:notEmpty name="bean" property="formID">
      &nbsp;<gsmsg:write key="rng.rng110.31" />:<bean:write name="bean" property="formID"  />
    </logic:notEmpty>
    <br />
    <%= ((Comment) bean.getBody()).dspValueHTML()%>
  <% } %>
  <% if (bean.getType() == EnumFormModelKbn.textbox) { %>
    <gsmsg:write key="<%=bean.getType().getMsgKey()%>"/><logic:notEmpty name="bean" property="formID">&nbsp;<gsmsg:write key="rng.rng110.31" />:<bean:write name="bean" property="formID"  /></logic:notEmpty><br />
    <%
      int size = NullDefault.getInt(((Textbox) bean.getBody()).getMaxlength(), 100);
      size = size * 15;
    %>
    <input type="text" value="<bean:write name="bean" property="body.defaultValue" />" class="w100" disabled="disabled"></input>
  <% } %>
  <% if (bean.getType() == EnumFormModelKbn.textarea) { %>
    <gsmsg:write key="<%=bean.getType().getMsgKey()%>"/>
    <logic:notEmpty name="bean" property="formID">
      &nbsp;<gsmsg:write key="rng.rng110.31" />:<bean:write name="bean" property="formID"  />
    </logic:notEmpty>
    <br />
    <textarea disabled="disabled" rows="5" class="w100"><bean:write name="bean" property="body.defaultValue" /></textarea>
  <% } %>
  <% if (bean.getType() == EnumFormModelKbn.date) { %>
    <gsmsg:write key="<%=bean.getType().getMsgKey()%>"/>
    <logic:notEmpty name="bean" property="formID">
      &nbsp;<gsmsg:write key="rng.rng110.31" />:<bean:write name="bean" property="formID"  />
    </logic:notEmpty>
    <br />
    <input type="text" value="<%=UDateUtil.getSlashYYMD(new UDate())%>" disabled="disabled" class="mxwp90 w100 "></input>
  <% } %>
  <% if (bean.getType() == EnumFormModelKbn.time) { %>
    <gsmsg:write key="<%=bean.getType().getMsgKey()%>"/>
    <logic:notEmpty name="bean" property="formID">
      &nbsp;<gsmsg:write key="rng.rng110.31" />:<bean:write name="bean" property="formID"  />
    </logic:notEmpty>
    <label class="display_flex">
      <input type="text" value="<%=((TimeBox) bean.getBody()).getDefaultValue()%>" disabled="disabled" class="clockpicker js_clockpicker mxwp70 w100"/>
      <span class="picker-acs cursor_pointer icon-clock"></span>
    </label>
  <% } %>
  <% if (bean.getType() == EnumFormModelKbn.number) { %>
    <gsmsg:write key="<%=bean.getType().getMsgKey()%>"/><logic:notEmpty name="bean" property="formID">&nbsp;<gsmsg:write key="rng.rng110.31" />:<bean:write name="bean" property="formID"  /></logic:notEmpty><br />
    <%
      int size = NullDefault.getInt(((NumberBox) bean.getBody()).getMaxlength(), 100);
      size = size * 15;
    %>
    <logic:empty name="bean" property="body.tanni">
      <input type="text" value="<%=((NumberBox) bean.getBody()).getDefaultValue() %>" class="w100" disabled="disabled"></input>
    </logic:empty>
    <logic:notEmpty name="bean" property="body.tanni">
      <input type="text" value="<%=((NumberBox) bean.getBody()).getDefaultValue() %>" class="w100 mw80 " disabled="disabled"></input>
      <bean:write name="bean"  property="body.tanni" />
    </logic:notEmpty>

  <% } %>
  <% if (bean.getType() == EnumFormModelKbn.radio) { %>
    <gsmsg:write key="<%=bean.getType().getMsgKey()%>"/><logic:notEmpty name="bean" property="formID">&nbsp;<gsmsg:write key="rng.rng110.31" />:<bean:write name="bean" property="formID"  /></logic:notEmpty><br />
    <% for (int i = 0; i < ((RadioButton) bean.getBody()).getList().size(); i++) { %>
    <%      String sel = ((RadioButton) bean.getBody()).getList().get(i); %>
      <div class="verAlignMid">
        <input type="radio"
        <% if ( StringUtils.equals(sel, ((RadioButton) bean.getBody()).getDefaultValue())) { %>
          checked="checked"
        <% } %>
        disabled="disabled">
        <bean:write name="bean" property="<%=\"body.list[\" + i + \"]\" %>"/>
        <span class="mr10"></span>
      </div>
    <% } %>
  <% } %>
  <% if (bean.getType() == EnumFormModelKbn.combo) { %>
    <gsmsg:write key="<%=bean.getType().getMsgKey()%>"/><logic:notEmpty name="bean" property="formID">&nbsp;<gsmsg:write key="rng.rng110.31" />:<bean:write name="bean" property="formID"  /></logic:notEmpty><br />
    <select disabled="disabled" class="w100">
      <logic:iterate id="sel" name="bean" property="body.list" type="String">
        <option value="<bean:write name="sel" />"
          <% if ( StringUtils.equals(sel, ((ComboBox) bean.getBody()).getDefaultValue())) { %>
            checked="checked"
          <% } %>
        >
        <bean:write name="sel" />
        </option>
      </logic:iterate>
    </select>
  <% } %>
  <% if (bean.getType() == EnumFormModelKbn.check) { %>
    <gsmsg:write key="<%=bean.getType().getMsgKey()%>"/><logic:notEmpty name="bean" property="formID">&nbsp;<gsmsg:write key="rng.rng110.31" />:<bean:write name="bean" property="formID"  /></logic:notEmpty><br />
    <% jp.groupsession.v2.cmn.formmodel.CheckBox checkBox = (jp.groupsession.v2.cmn.formmodel.CheckBox) bean.getBody();
      for (int i = 0; i < checkBox.getList().size(); i++) { %>
    <%      String sel = checkBox.getList().get(i); %>
    <div class="verAlignMid">
      <input type="checkbox"
      <% List<String> defaultValue = checkBox.getDefaultValue();
         if (!CollectionUtils.isEmpty(defaultValue) && defaultValue.contains(sel)) { %>
        checked="checked"
      <% } %>
      disabled="disabled">
      <bean:write name="bean" property="<%=\"body.list[\" + i + \"]\" %>"/>
      <span class="mr10"></span>
    </div>
    <% } %>
  <% } %>
  <% if (bean.getType() == EnumFormModelKbn.sum) { %>
    <gsmsg:write key="<%=bean.getType().getMsgKey()%>"/>
    <logic:notEmpty name="bean" property="formID">
      &nbsp;<gsmsg:write key="rng.rng110.31" />:<bean:write name="bean" property="formID"  />
    </logic:notEmpty>
    <br />
    {
    <% for (int i = 0; i < ((Sum) bean.getBody()).getTarget().size(); i++) { %>
    <%      Calc.Format format = ((Sum) bean.getBody()).getTarget().get(i); %>
    <%   if (i != 0)                {%>,                                                              <% } %>
    <%   if (format.getType() == 0) {%><%= format.getValue() %><% } %>
    <%   if (format.getType() > 0)  {%><%= format.getValue() %>                                       <% } %>
    <% } %>
    } <bean:write name="bean"  property="body.tanni" />
  <% } %>
  <% if (bean.getType() == EnumFormModelKbn.calc) { %>
    <gsmsg:write key="<%=bean.getType().getMsgKey()%>"/><logic:notEmpty name="bean" property="formID">&nbsp;<gsmsg:write key="rng.rng110.31" />:<bean:write name="bean" property="formID"  /></logic:notEmpty><br />
    {
    <%      Calc format = ((Calc) bean.getBody()); %>
    <%= format.getSiki()%>
    } <bean:write name="bean"  property="body.tanni" />
  <% } %>
  <% if (bean.getType() == EnumFormModelKbn.user) { %>
    <div>
      <gsmsg:write key="<%=bean.getType().getMsgKey()%>"/><logic:notEmpty name="bean" property="formID">&nbsp;<gsmsg:write key="rng.rng110.31" />:<bean:write name="bean" property="formID"  /></logic:notEmpty>
    </div>
    <div class="verAlignMid w100">
      <img class="comment_Img btn_classicImg-display mr5 wp18hp20" src="../common/images/classic/icon_photo.gif" name="userImage" alt="<gsmsg:write key="cmn.photo" />" />
      <img class="comment_Img btn_originalImg-display mr5 wp18hp20" src="../common/images/original/photo.png" name="userImage" alt="<gsmsg:write key="cmn.photo" />" />
      <select disabled="disabled" class="w100 mxwp150"></select>
    </div>
  <% } %>
  <% if (bean.getType() == EnumFormModelKbn.group) { %>
    <div>
      <gsmsg:write key="<%=bean.getType().getMsgKey()%>"/><logic:notEmpty name="bean" property="formID">&nbsp;<gsmsg:write key="rng.rng110.31" />:<bean:write name="bean" property="formID"  /></logic:notEmpty><br />
    </div>
    <div class="verAlignMid w100">
      <img  class="comment_Img btn_classicImg-display mr5 wp18hp20" src="../common/images/classic/icon_group.png" name="groupImage" alt="<gsmsg:write key="cmn.photo" />" />
      <img  class="comment_Img btn_originalImg-display mr5 wp18hp20" src="../common/images/original/icon_group.png" name="groupImage" alt="<gsmsg:write key="cmn.photo" />" />
      <select disabled="disabled" class="w100 mxwp150"></select>
    </div>
  <% } %>
  <% if (bean.getType() == EnumFormModelKbn.block) { %>
    <span name="body" class="jsonObject">
      <fb:formTable block="<%=(Block) bean.getBody()%>" />
    </span>
  <% } %>
  <% if (bean.getType() == EnumFormModelKbn.blocklist) { %>
    <span name="body" class="jsonObject">
      <div name="header" class="jsonObject">
        <gsmsg:write key="cmn.header"/>
        <fb:formTable block="<%=(Block) ((BlockList)bean.getBody()).getHeader()%>" />
      </div>
      <br/>
      <div  name="body" class="jsonArray">
        <gsmsg:write key="cmn.form.blocklist.body"/>&nbsp;(<gsmsg:write key="rng.rng090.05"/>)
        <span class="jsonObject">
          <fb:formTable block="<%=(Block) ((BlockList)bean.getBody()).getBody(0)%>" bodyAddClass="bodyDispContent" />
        </span>
      </div>
      <br/>
      <div name="footer"  class="jsonObject">
        <gsmsg:write key="cmn.footer"/>
        <fb:formTable block="<%=(Block) ((BlockList)bean.getBody()).getFooter()%>" />
      </div>
    </span>
  <% }%>
  <% if (bean.getType() == EnumFormModelKbn.file) { %>
    <gsmsg:write key="<%=bean.getType().getMsgKey()%>"/><logic:notEmpty name="bean" property="formID">&nbsp;<gsmsg:write key="rng.rng110.31" />:<bean:write name="bean" property="formID"  /></logic:notEmpty><br/>
    <logic:iterate id="tmpFile" collection="<%=((Temp) bean.getBody()).getSampleListLabel() %>" indexId="idx">
      <div>
        <div class="verAlignMid">
          <img class="btn_classicImg-display mr5" src="../common/images/classic/icon_temp_file_2.png" alt="ファイル">
          <img class="btn_originalImg-display mr5" src="../common/images/original/icon_attach.png" alt="ファイル">
          <bean:write name="tmpFile"/>
        </div>
      </div>
    </logic:iterate>
  <% }%>
</div>