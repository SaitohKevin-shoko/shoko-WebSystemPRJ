function radChangeDelKbn(num) {
    if ($('#radioDel' + num).is(":checked")) {
        $('#rng160DelYear' + num).prop("disabled", false);
        $('#rng160DelMonth' + num).prop("disabled", false);
        $('#rng160DelDay' + num).prop("disabled", false);
    } else {
        //設定しない
        $('#rng160DelYear' + num).prop("disabled", true);
        $('#rng160DelMonth' + num).prop("disabled", true);
        $('#rng160DelDay' + num).prop("disabled", true);

        $('#rng160DelYear' + num).val('0');
        $('#rng160DelMonth' + num).val('0');
        $('#rng160DelDay' + num).val('0');
    }
}

$(function(){
    var num;
    for(num = 1; num <= 3; num++) {
        radChangeDelKbn(num);
    }
})