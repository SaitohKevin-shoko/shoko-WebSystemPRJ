function changeArestKbn() {
    var ctext1 = document.getElementById("arestselect");
    if (document.forms[0].adr320AacArestKbn[0].checked) {
        ctext1.style.display = 'none';
    } else {
        ctext1.style.display = '';
    }

}


$(function() {
    changeArestKbn();
})

