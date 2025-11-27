function loginChangeSearchMode(mode) {
    var webObj = document.getElementById('loginSearchWeb');
    var imgObj = document.getElementById('loginSearchImage');
    var mapObj = document.getElementById('loginSearchMap');

    if (mode == 1) {
    	webObj.setAttribute('class', 'web mode_font_not_select');
    	imgObj.setAttribute('class', 'image mode_font_select');
    	mapObj.setAttribute('class', 'map mode_font_not_select');
    } else if (mode == 2) {
    	webObj.setAttribute('class', 'web mode_font_not_select');
    	imgObj.setAttribute('class', 'image mode_font_not_select');
    	mapObj.setAttribute('class', 'map mode_font_select');
    } else {
    	webObj.setAttribute('class', 'web mode_font_select');
    	imgObj.setAttribute('class', 'image mode_font_not_select');
    	mapObj.setAttribute('class', 'map mode_font_not_select');
    }

    document.getElementsByName('loginSearchMode')[0].value = mode;
}

