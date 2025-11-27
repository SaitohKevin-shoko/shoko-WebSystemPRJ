function sch240ChangePosition() {
    var val = $('[name=sch240position]').val();
    if (val <= 0) {
        $('#positionAuthArea').hide();
    } else {
        $('#positionAuthArea').show();
    }
}

jQuery( function() {
    sch240ChangePosition();

    $('[name=sch240position]').change(function() {
        sch240ChangePosition();
    });
});
