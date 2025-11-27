<%@tag import="java.util.Optional"%>
<%@tag import="jp.groupsession.v2.cmn.GSConst"%>
<%@ tag pageEncoding="utf-8" description="HTML挿入用フレーム"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="/WEB-INF/ctag-css.tld" prefix="theme" %>


<%@ attribute description="id属性用" name="attrId" type="String" required="false"%>
<%@ attribute description="class属性用" name="attrClass" type="String" required="false"%>
<%@ attribute description="name属性用" name="attrName" type="String" required="false"%>
<%@ attribute description="theme指定" name="themePath" type="String" required="false"%>
<%@ attribute description="タグ内のscriptを使用可能にする。脆弱性の原因になるため注意。適切に制御できる場合のみ使用すること" name="canRunScript" type="String" required="false" %>

  <script>
    if (window.htmlframeFuncLoad !== undefined) {
    } else {
      htmlframeFuncLoad = function () {
        var iframe = this;
        var src = '<html><head>'
          + iframe.dataset.htmlhead
          + '</head><body class="bgC_none word_b-word">'
          + iframe.dataset.htmlbody
          + '</body></html>';
        iframe.contentWindow.document.documentElement.innerHTML=src;
        var scripts = iframe.contentWindow.document.head.querySelectorAll('script');
        for (var i=0; i < scripts.length; i++) {
          var addScr = iframe.contentWindow.document.createElement('script');
          addScr.innerHTML = scripts[i].innerHTML;
          if (scripts[i].src) {
            addScr.src = scripts[i].src;
          }
          scripts[i].parentNode.replaceChild(addScr, scripts[i]);

        }


        if (iframe.dataset.runscript) {
            var scripts = iframe.contentWindow.document.body.querySelectorAll('script');
            for (var i=0; i < scripts.length; i++) {
              var addScr = iframe.contentWindow.document.createElement('script');
              addScr.innerHTML = scripts[i].innerHTML;
              if (scripts[i].src) {
                addScr.src = scripts[i].src;
              }
              scripts[i].parentNode.replaceChild(addScr, scripts[i]);

            }
        }

        var dom = iframe.contentWindow.document;
        for (var i = 0; i < dom.querySelectorAll('img,script,link').length; i++) {
          var imgElement = dom.querySelectorAll('img,script,link')[i];
          imgElement.addEventListener('load', function () {
              resizeIframe();
            });
        }

        function resizeIframe() {
          iframe.style.removeProperty('height');
          iframe.style.removeProperty('width');

          iframe.style.setProperty('height', iframe.contentWindow.document.body.scrollHeight + 'px','important');
          iframe.style.setProperty('width', iframe.contentWindow.document.body.scrollWidth + 'px','important');
          iframe.style.setProperty('height', iframe.contentWindow.document.body.scrollHeight + 'px','important');
        };

        //高さを設定
        resizeIframe();
        this.resizeIframe = resizeIframe;

        //リンクターゲット置き換え（特に指定なければ親ウインドウで遷移）
        var list =iframe.contentWindow.document.querySelectorAll('a:not([target])');
        for (var i = 0; i < list.length; i++) {
          list[i].setAttribute('target', '_parent');
        }

      };
    }
  </script>



  <bean:define id="onLoadScript" type="String">
    htmlframeFuncLoad.call(this);
  </bean:define>


  <bean:define id="htmlHead" type="String">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src='../common/js/jquery-3.3.1.min.js?<%= GSConst.VERSION_PARAM %>'></script>
        <link rel=stylesheet href='../common/css/htmlframe-reboot.css?<%= GSConst.VERSION_PARAM %>' type='text/css'>
        <link rel=stylesheet href='../common/css/all.css?<%= GSConst.VERSION_PARAM %>' type='text/css'>
        <logic:empty name="themePath">
          <theme:css filename="theme.css"/>
        </logic:empty>
        <logic:notEmpty name="themePath">
          <theme:css filename="theme.css" selectthemepath="<%=themePath %>" />
        </logic:notEmpty>
        <link rel=stylesheet href='../common/css/htmlframe-layout.css?<%= GSConst.VERSION_PARAM %>' type='text/css'>
  </bean:define>
  <jsp:doBody var="htmlBody" />
  <bean:define id="attrIdStr" value=""/>
  <logic:notEmpty name="attrId">
    <bean:define id="attrIdStr" >id="<bean:write name="attrId" />"</bean:define>
  </logic:notEmpty>
  <bean:define id="attrNameStr" value=""/>
  <logic:notEmpty name="attrName">
    <bean:define id="attrNameStr" >name="<bean:write name="attrName" />"</bean:define>
  </logic:notEmpty>
  <bean:define id="attrClassStr" value=""/>
  <logic:notEmpty name="attrClass">
    <bean:define id="attrClassStr" ><bean:write name="attrClass" /></bean:define>
  </logic:notEmpty>
  <bean:define id="canRunScriptStr" value=""/>
  <logic:equal name="canRunScript" value="true">
    <bean:define id="canRunScriptStr" >data-runscript="true"</bean:define>
  </logic:equal>

  <iframe
   <%=attrIdStr %>
   <%=attrNameStr %>
   class="htmlframe <%=attrClassStr%>"
   frameborder="0"
   scrolling="no"
   src="javascript:'&nbsp;'"
   content
   onload="<bean:write name="onLoadScript"/>"
   data-htmlhead="<bean:write name="htmlHead"/>"
   data-htmlbody="<bean:write name="htmlBody"/>"
   <%=canRunScriptStr %>
   ></iframe>
