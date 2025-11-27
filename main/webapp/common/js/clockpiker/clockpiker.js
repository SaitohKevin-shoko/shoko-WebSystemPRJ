var beforeSelectMinute = "";

function setHmParam(elmTime, elmHour, elmMinute) {
    var time = $(elmTime).val();
    re = new RegExp(/(\d{1,2})\:(\d{1,2})/);
    if (time == null) {
        return false;
    }
    
    re = new RegExp(/(\d{1,2})\:(\d{1,2})/);
    if (time.match(re)) {
	    var hour = time.split(":")[0];
        var minute = time.split(":")[1];
        $(elmHour).val(hour);
        $(elmMinute).val(minute);
    }
}

function clpClear(target) {
    $('#'+target+'').val('');
    $('#'+target+'').clockpicker('hide');
}

function startClockPicker(target) {
	var timeU = $('input[name="hourDivision"]').val();
    /** 分ラベル*/
    var choices = ["00","01","02","03","04","05","06","07","08","09",
                   "10","11","12","13","14","15","16","17","18","19",
                   "20","21","22","23","24","25","26","27","28","29",
                   "30","31","32","33","34","35","36","37","38","39",
                   "40","41","42","43","44","45","46","47","48","49",
                   "50","51","52","53","54","55","56","57","58","59",
                   ];
    if (timeU == 5) {
        choices = ["00","05","10","15","20","25","30","35","40","45","50","55"];
    } else if (timeU == 10) {
      choices = ["00","10","20","30","40","50"];
    } else if (timeU == 15) {
      choices = ["00","15","30","45"];
    }
    
    var targetInput = $(target);
    targetInput.clockpicker({
    placement: 'bottom',
    align: 'left',
    autoclose: true,
    beforeShow: function() {
        //選択不可の値を選択して再描画された時、選択前の値で更新する。
        if (beforeSelectMinute != "" && $.inArray(targetInput.val().split(":")[1], choices) == -1 && targetInput.data('clockpicker').spanHours.text() != ""){
            targetInput.val(targetInput.data('clockpicker').spanHours.text() + ":" + beforeSelectMinute);
        }
        
        if (targetInput.val().split(":")[1] != null) {
	       beforeSelectMinute = targetInput.val().split(":")[1];
        }
            $('.js_clpClear_area').remove();
    },
    afterShow: function() {
        var clock = $('.clockpicker-popover');
        var clock_id = targetInput.attr('id');
        clock.append("<div class='clpClear_area js_clpClear_area'><button type='button' class='js_clockpickerClear clpClear_button' onClick=\"clpClear(\'"+clock_id+"\')\">クリア</button></div>");
        $('.clockpicker-span-minutes').text(targetInput.val().split(":")[1]);    
        if (targetInput.val().split(":")[0].length == 0) {
            $('.clockpicker-span-hours').text("00");
        } else {
            $('.clockpicker-span-hours').text(targetInput.val().split(":")[0]);    
        }
        $(".clockpicker-minutes").find(".clockpicker-tick").filter(function(index, element){
             return !($.inArray($(element).text(), choices) != -1)
        }).remove();
    },
    afterHourSelect: function() {
        targetInput.val(targetInput.data('clockpicker').spanHours.text() + ":" + targetInput.data('clockpicker').spanMinutes.text());
    },
    afterDone: function(){
        //分選択後のコールバック
        //ただしautocloseで閉じた場合は呼ばれない
        var selectedMinutes = targetInput.val().split(":")[1];
        //分選択後にラベル外の分が選択された場合
        if ($.inArray(selectedMinutes, choices) == -1){
            //再描画によって時間の設定し直しを強制
            targetInput.clockpicker('show').clockpicker('toggleView', 'minutes');
        }
    }
  });
}

$(function () {
    
    //clockpickerはコールバックで対象要素が手に入らないので
    //ブロック変数を使用して対象要素の参照がコールバックに渡るように
    $.each($('.js_clockpicker'), function() {
	    startClockPicker($(this));
    });
});