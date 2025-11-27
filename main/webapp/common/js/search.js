function webSearch(keywordStr) {
    var keyword = encodeURIComponent(keywordStr);
    var url = 'http://www.google.com/search?q=' + keyword;
    window.open(url);
}

function searchGoogleMap(keywordStr) {
    var searchUrl = "http://maps.google.co.jp/maps?q=" + keywordStr;
    window.open(searchUrl,"map","width=360, height=240, menubar=1, location=1, status=1, scrollbars=1, resizable=1");
    return false;
}


function addKeyword(keyword) {

    var url = "../search/keyword.do";
    url = url + "?CMD=cmd";
    url = url + "&keyword=" + keyword;

    jQuery.ajax(url);

    return false;
}