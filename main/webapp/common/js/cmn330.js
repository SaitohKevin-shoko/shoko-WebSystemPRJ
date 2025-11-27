$(function() {

     $('.js_table-top').tableTop().initTable();
     $('.js_table-top').tableTop().initRowHover();


     $('.js_listClick').on('click', function () {
        var sid = $(this).data("id");
        $('input[name="cmn340CacSid"]').val(sid);
        buttonPush('cmn330edit');
     })
});