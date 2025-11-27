$(function() {
    /* パラメータ設定 設定しないを選択 */
    $("#man340paramKbn0").live("click", function(){
        $("#paramSetArea").hide();
    });

    /* パラメータ設定 設定するを選択 */
    $("#man340paramKbn1").live("click", function(){
        $("#paramSetArea").show();
    });

    //初期表示  パラメータ設定
    if ($("#man340paramKbn0").is(':checked')) {
        //設定しない
        $("#paramSetArea").hide();
    } else {
        //設定する
        $("#paramSetArea").show();
    }
});

function cmn110Updated(cmn110, tempName, tempSaveName) {
    document.forms[0].CMD.value='getImg';
    document.forms[0].man340file.value = tempName;
    document.forms[0].man340SaveFile.value = tempSaveName;
    document.forms[0].submit();
    return true;
}