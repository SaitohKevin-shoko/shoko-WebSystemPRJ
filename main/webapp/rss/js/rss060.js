function dispDescription(fdid) {
    var ctext = $('#' + fdid)[0];
    if (ctext.className == 'display_n') {
      ctext.setAttribute('class', 'fs_10 lh180 bgC_select');
    } else {
      ctext.setAttribute('class', 'display_n');
    }
}

$(function() {
    $( ".column" ).sortable({ revert: true });
    $( ".column" ).sortable({ opacity: 0.6 });
    $( ".column" ).sortable({ tolerance: 'pointer' });
    $( ".column" ).sortable({
        connectWith: ".column"
    });
    $( ".portlet" ).addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
                   .find( ".portlet-header" )
                   .addClass( "ui-widget-header ui-corner-all" )
                   .prepend( "<span class='ui-icon ui-icon-minusthick'></span>")
                   .end()
                   .find( ".portlet-content" );
    $( ".portlet-header .ui-icon" ).click(function() {
          $( this ).toggleClass( "ui-icon-minusthick" ).toggleClass( "ui-icon-plusthick" );
          $( this ).parents( ".portlet:first" ).find( ".portlet-content" ).toggle();
    });
    $( ".column" ).disableSelection();
    $( ".column" ).sortable({
         stop: function(event, ui) {saveScreenPosition();}
    });
    $('.js_onSearch').live('click', function(){
        rssSearch($(this).data('title'));
    });
});

function rssEdit(rssSid) {
    document.forms[0].CMD.value='rssEdit';
    document.forms[0].rssSid.value=rssSid;
    document.forms[0].rssCmdMode.value=1;
    document.forms[0].submit();
    return false;
}

function saveScreenPosition() {
    paramString = '';

    positionParam = String($('#rssListLeft').sortable('toArray'));
    if (positionParam != null && positionParam != '') {
        idList = positionParam.split(",");
        for (count = 0; count < idList.length; count++) {
            paramString += '&rss060SidLeft=' + idList[count];
        }
    }

    positionParam = String($('#rssListRight').sortable('toArray'));
    if (positionParam != null && positionParam != '') {
        idList = positionParam.split(",");
        for (count = 0; count < idList.length; count++) {
            paramString += '&rss060SidRight=' + idList[count];
        }
    }

    jQuery.ajax("../rss/rss060.do?CMD=setPosition" + paramString);

    return false;
}

function rssAdd(rssSid, rssTitle) {
    document.forms[0].CMD.value='rssAdd';
    document.forms[0].rssSid.value=rssSid;
    document.forms[0].rssTitle.value=rssTitle;
    document.forms[0].submit();
    return false;
}

function rssSearch(rsstitle) {
    return webSearch(rsstitle);
}

