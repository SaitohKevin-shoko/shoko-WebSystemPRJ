function copyTmpData(cmd){

    document.forms[0].CMD.value=cmd;

    //プロジェクトID
    document.forms[0].prj020prjId.value=document.forms[0].prj140prtId.value;
    //プロジェクト名称
    document.forms[0].prj020prjName.value=document.forms[0].prj140prtName.value;
    //プロジェクト略称
    document.forms[0].prj020prjNameS.value=document.forms[0].prj140prtNameS.value;
    //予算
    document.forms[0].prj020yosan.value=document.forms[0].prj140yosan.value;
    //公開・非公開
    document.forms[0].prj020koukai.value=document.forms[0].prj140koukai.value;
    //開始年
    document.forms[0].prj020startYear.value=document.forms[0].prj140startYear.value;
    //開始月
    document.forms[0].prj020startMonth.value=document.forms[0].prj140startMonth.value;
    //開始日
    document.forms[0].prj020startDay.value=document.forms[0].prj140startDay.value;
    //終了年
    document.forms[0].prj020endYear.value=document.forms[0].prj140endYear.value;
    //終了月
    document.forms[0].prj020endMonth.value=document.forms[0].prj140endMonth.value;
    //終了日
    document.forms[0].prj020endDay.value=document.forms[0].prj140endDay.value;
    //状態
    document.forms[0].prj020status.value=document.forms[0].prj140status.value;
    //目標・目的
    document.forms[0].prj020mokuhyou.value=document.forms[0].prj140mokuhyou.value;
    //内容
    document.forms[0].prj020naiyou.value=document.forms[0].prj140naiyou.value;
    //編集権限
    document.forms[0].prj020kengen.value=document.forms[0].prj140kengen.value;
    //ショートメール通知先
    document.forms[0].prj020smailKbn.value=document.forms[0].prj140smailKbn.value;

    var hiddenElement = document.getElementById('hiddenList');
    while (hiddenElement.hasChildNodes()) {
        hiddenElement.removeChild(hiddenElement.firstChild);
    }

    //テンプレートの所属メンバ
    var memberArray = document.getElementsByName("prj140hdnMember");

    if (memberArray != null && memberArray.length > 0) {
        for (i = 0; i < memberArray.length; i++) {
            var tmpMember = document.createElement('input');
            tmpMember.type = 'hidden';
            tmpMember.name = 'prj020hdnMember';
            tmpMember.value = memberArray[i].value;
            hiddenElement.appendChild(tmpMember);
        }
    }

    //プロジェクト管理者
    var adminArray = document.getElementsByName("prj140hdnAdmin");

    if (adminArray != null && adminArray.length > 0) {
        for (i = 0; i < adminArray.length; i++) {
            var tmpAdmin = document.createElement('input');
            tmpAdmin.type = 'hidden';
            tmpAdmin.name = 'prj020hdnAdmin';
            tmpAdmin.value = adminArray[i].value;
            hiddenElement.appendChild(tmpAdmin);
        }
    }

    document.forms[0].submit();

    return false;
}