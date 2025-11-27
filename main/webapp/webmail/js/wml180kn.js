function wml180knChangeDelKbn() {

    var delKbn = document.getElementsByName('wml180delKbn')[0].value;
    if (delKbn == 1) {
        $('#dateElement').hide();
        $('#dateAreaElement').show();
        $('#dateAreaElement2').show();
        $('#allDelElement').hide();
    } else if (delKbn == 2) {
        $('#dateElement').hide();
        $('#dateAreaElement').hide();
        $('#dateAreaElement2').hide();
        $('#allDelElement').show();
    } else {
        $('#dateElement').show();
        $('#dateAreaElement').hide();
        $('#dateAreaElement2').hide();
        $('#allDelElement').hide();
    }
}
