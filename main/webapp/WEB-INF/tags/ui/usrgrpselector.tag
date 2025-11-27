<%@tag import="jp.groupsession.v2.cmn.ui.parts.select.ISelector"%>
<%@tag import="jp.groupsession.v2.cmn.ui.configs.GsMessageReq"%>
<%@ tag pageEncoding="utf-8" description="複数選択要素 配置タグ"%>
<%@ tag import="jp.groupsession.v2.cmn.GSConst"%>
<%@ tag import="jp.groupsession.v2.cmn.ui.parts.usergroupselect.UserGroupSelector"%>


<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-message.tld" prefix="gsmsg"%>
<%@ taglib tagdir="/WEB-INF/tags/common" prefix="common"%>
<%@ taglib tagdir="/WEB-INF/tags/ui" prefix="ui"%>

<%@ attribute description="フォーム名" name="name" type="String" required="true" %>
<%@ attribute description="選択要素UIモデル プロパティ名" name="property" type="String" required="true" %>
<%@ attribute description="class指定 高さを制限するclass指定がない場合表示が崩れる" name="styleClass" type="String" required="true" %>
<%@ attribute description="onchangeイベント" name="onchange" type="String"  rtexprvalue="true" %>
<%@ attribute description="グループ選択パラメータ名" name="groupSelectionParamName" type="String"  %>
<%@ attribute description="ユーザ選択パラメータ１" name="selectParamName1" type="String"  %>
<%@ attribute description="ユーザ選択先ラベル１" name="selectLabel1" type="String"  %>
<%@ attribute description="ユーザ選択パラメータ2" name="selectParamName2" type="String"  %>
<%@ attribute description="ユーザ選択先ラベル2" name="selectLabel2" type="String"  %>

<ui:multiselector name="<%=name %>" property="<%=property %>" styleClass="<%=styleClass %>" onchange="<%=onchange %>" />

