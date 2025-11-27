function addNewRow(domObj){
    var listBody = $(domObj).parent().parent();
    var template = listBody.parent().find('div[name="template"] > div');
    var addrow = template.clone(true);
    if (listBody.children('div.js_format.js_row').size() < 10) {
        listBody.append(addrow);
        dspFormat();
    }
}

function delRow(domObj){
    var delLine = $(domObj).parent();
    delLine.remove();
    dspFormat();
}

function OkClick(cmd){
    var format = getIdFormat();
    document.forms[0].CMD.value=cmd;
    document.forms[0].rng210Format.value=format[1];
    document.forms[0].rng210DispFormat.value=format[2];
    document.forms[0].submit();
    return false;
}

function editClick(){
    $('#label').addClass('display_n');
    $('#text').removeClass('display_n');
}

function selectchage(domObj){
    var val = $(domObj).val();
    var disp1 = $(domObj).next().children('div.js_textarea');
    var disp1_2 = $(domObj).next().children('div.js_textarea');
    var disp2 = disp1.next();
    var disp2_2 = disp1.next();
    if (val==1) {
        disp2.addClass('display_n');
        disp1.removeClass('display_n');
    }else {
        disp1.addClass('display_n');
        disp2.removeClass('display_n');
    }
    dspFormat();
}


function dspFormat() {
    var format = getIdFormat();
    $('#dsp').text(format[0]);
    $('#pattern').text(format[2]);
}

function getIdFormat() {
    var listBody = $('#formatTable');
    var txt = "";
    var disp = "";
    var pattern = "";
    var hiduke = new Date();

    $.each(listBody.children('div.js_format.js_row'),
        function() {
            var row = $(this);
            var select = row.children('select[name="rng210SelectFormat"]').val();

            if(select == 1) {
                var textVal = row.find('div.js_textarea > input').val();
                //「$」を「$$」に変更
                var escapeText = textVal.replace(/\$/g , "$$$$");
                txt = txt + "${}" + escapeText;
                disp = disp  + textVal;
                pattern = pattern  + textVal;
            } else if (select == 2) {
                txt = txt + "${NO}";
                var keta = $('#ketaId').val();
                if (keta > 10 || keta < 0) {
                    keta = 0; // 10桁以上はエラーとなるので、0桁として扱う
                }

                var zero = "";
                for (var idx=0; idx < keta; idx++) {
                    zero = zero +"0";
                }
                var size = String($('#sinseiId').val()).length

                if (size > keta) {
                    keta = size;
                }
                var sinseiId = Number($('#sinseiId').val());
                if (sinseiId < 0) {
                    sinseiId = 0;
                }
                disp = disp + (zero + sinseiId).slice(-keta);
                pattern = pattern + "No";
            } else if (select == 3) {
                txt = txt + "${YEAR4}";
                disp = disp + hiduke.getFullYear();
                pattern = pattern + "YYYY";
            } else if (select == 4) {
                txt = txt + "${YEAR2}";
                var year = hiduke.getFullYear();
                year = year.toString();
                year = year.substring(2,4);
                disp = disp + year;
                pattern = pattern + "YY";

            } else if (select == 5) {
                txt = txt + "${MON}";
                var month = hiduke.getMonth()+1;
                if(month < 10) {
                    month = "0" + month;
                }
                disp = disp + month;
                pattern = pattern + "MM";
            } else if (select == 6){
                txt = txt + "${DAY}"
                var day = hiduke.getDate();
                if (day < 10) {
                    day = "0" +day;
                }
                disp = disp + day;
                pattern = pattern + "DD";
            }
        }
    );
    return [disp, txt, pattern]; // 変数が複数なので配列として返す
}

function focusOut(){
    var keta = $('#ketaId').val();
    if (keta > 10 || keta < 0) {
        $('#ketaInfo').removeClass('display_n');
    } else {
        $('#ketaInfo').addClass('display_n');
    }
    dspFormat();
}

$(function() {
    // 画面描画時に実行される処理
    focusOut();
})
