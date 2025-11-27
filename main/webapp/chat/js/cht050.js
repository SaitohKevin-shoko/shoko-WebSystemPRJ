$(function(){

    if ($(".js_check").text() == 0) {
        $("#cht050DelYear").prop('disabled',true);
        $("#cht050DelMonth").prop('disabled',true);
    } else {
        $("#cht050DelYear").prop('disabled',false);
        $("#cht050DelMonth").prop('disabled',false);
    }
    $(document).on("click", ".cht_auto_del_flg",function(){
        $("#cht050DelYear").prop('disabled',false);
        $("#cht050DelMonth").prop('disabled',false);
    });

    $(document).on("click", ".cht_auto_del_flg_not",function(){
        $("#cht050DelYear").prop('disabled',true);
        $("#cht050DelMonth").prop('disabled',true);
    });


});