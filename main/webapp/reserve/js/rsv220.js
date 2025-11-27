function setParams() {
    setHmParam($("input[name='rsv220AmFrTime']"),
        $("input[name='rsv220AmFrHour']"),
        $("input[name='rsv220AmFrMin']"));
    setHmParam($("input[name='rsv220AmToTime']"),
        $("input[name='rsv220AmToHour']"),
        $("input[name='rsv220AmToMin']"));
        
    setHmParam($("input[name='rsv220PmFrTime']"),
        $("input[name='rsv220PmFrHour']"),
        $("input[name='rsv220PmFrMin']"));
    setHmParam($("input[name='rsv220PmToTime']"),
        $("input[name='rsv220PmToHour']"),
        $("input[name='rsv220PmToMin']"));
        
    setHmParam($("input[name='rsv220AllDayFrTime']"),
        $("input[name='rsv220AllDayFrHour']"),
        $("input[name='rsv220AllDayFrMin']"));
    setHmParam($("input[name='rsv220AllDayToTime']"),
        $("input[name='rsv220AllDayToHour']"),
        $("input[name='rsv220AllDayToMin']"));
}

$(function() {
	$("input[name='rsv220HourDiv']").on("change", function () {
	    buttonPush("init");
	});
});