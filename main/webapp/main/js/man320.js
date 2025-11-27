$(function() {
    /* メール 行  hover */
    $('.js_listHover').live({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    });
    $('.js_tableTopCheck-header').live("change",function() {
        changeChk();
    });
    /* hover:click */
    $(".js_listClick").live("click", function(){
        var sid = $(this).parent().data("sid");
        editMsg(sid);
    });

    if ($(".js_infoSort").length > 0) {
        let el = document.getElementsByClassName('js_infoSort')[0];
        let sortable = new Sortable(el, {
            animation: 150,
            ghostClass: 'out3',
            //filter: ".js_addStamp",
            preventOnFilter: false,
            onStart: onStartEvent,
            onSort: onSortEvent
        });
    }

    $(".js_infoSort .js_listHover").live("mouseenter", function() {
        $(this).find(".js_sortIcon").removeClass("display_none");
    });
    $(".js_infoSort .js_listHover").live("mouseleave", function() {
        $(this).find(".js_sortIcon").addClass("display_none");
    });

    let infoListBefore;
    function onStartEvent(e){
        infoListBefore = $(".js_infoSort > tr");
    }
    function onSortEvent(e){
        let targetSid = e.item.dataset.sid;
        let infoListAfter = $(".js_infoSort > tr");

        for (let idx = 0; idx < infoListAfter.length; idx++) {
            if (targetSid == infoListAfter.eq(idx).data("sid")) {
                let afterSid = infoListBefore.eq(idx).data("sid");
                sortInfo(targetSid, afterSid);
            }
        }
    }

    function sortInfo(beforeSid, afterSid) {
        var paramStr = 'CMD=sortInfo'
                        + '&man320SortBeforeSid=' + beforeSid
                        + '&man320SortAfterSid=' + afterSid;
        $.ajax({
          async: true,
          url:"../main/man320.do",
          type: "post",
          data:paramStr
        }).done(function(data) {
            dispInfo(data);
        }).fail(function(data){
        });
    }

    //インフォメーション一覧表示
    function dispInfo(data) {
        let infoList = JSON.parse(JSON.stringify(data["infoList"]));
        let insertHtml = "";
        infoList.forEach(function(info){
            let statusClass = "info_status-display";
            let statusStr = msglist_man320["cmn.display2"];
            if (info["infoStatus"] == 1) {
                statusClass = "info_status-plan";
                statusStr = msglist_man320["cmn.plan"];
            }
            insertHtml += `
              <tr class="js_listHover cursor_p bgC_body outC_deep" data-sid="${info["imsSid"]}">
                <td class="cursor_m txt_c">
                  <div class="w100">
                    <img src="../common/images/original/icon_sort.png" class="btn_classicImg-display display_none js_sortIcon">
                    <img src="../common/images/original/icon_sort.png" class="btn_originalImg-display display_none js_sortIcon">
                  </div>
                </td>
                <td class="no_w js_tableTopCheck txt_c">
                  <input type="checkbox" name="selectMsg" value="${info["imsSid"]}">
                </td>
                <td class="txt_c js_listClick no_w">
                  <span class="fw_bold ${statusClass}">${statusStr}</span>
                </td>
                <td class="txt_l js_listClick">
                  <span class="textLink">${info["imsMsg"]}</span>
                </td>
                <td class="txt_c js_listClick no_w">
                  ${info["frDate"]}
                </td>
                <td class="txt_c js_listClick no_w">
                  ${info["toDate"]}
                </td>
                <td class="txt_c js_listClick no_w">
                  ${info["exString"]}
                </td>
                <td class="txt_l js_listClick no_w">
                  ${info["usrNameSei"]} ${info["usrNameMei"]}
                </td>
              </tr>
            `;
        });
        $(".js_infoSort").empty();
        $(".js_infoSort").append(insertHtml);
    }
});

function changePage1() {
    document.forms[0].CMD.value='research';
    for (i = 0; i < document.forms[0].man320SltPage1.length; i++) {
        if (document.forms[0].man320SltPage1[i].selected) {
            document.forms[0].man320SltPage2.value=document.forms[0].man320SltPage1[i].value;
            document.forms[0].man320PageNum.value=document.forms[0].man320SltPage1[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}

function changePage2() {
    document.forms[0].CMD.value='research';
    for (i = 0; i < document.forms[0].man320SltPage2.length; i++) {
        if (document.forms[0].man320SltPage2[i].selected) {
            document.forms[0].man320SltPage1.value=document.forms[0].man320SltPage2[i].value;
            document.forms[0].man320PageNum.value=document.forms[0].man320SltPage2[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}

function addMsg() {
    document.forms[0].CMD.value='man320add';
    document.forms[0].cmd.value='add';
    document.forms[0].submit();
    return false;
}

function editMsg(sid) {
    document.forms[0].CMD.value='man320edit';
    document.forms[0].cmd.value='edit';
    document.forms[0].man320SelectedSid.value = sid;
    document.forms[0].submit();
    return false;
}

function changeChk(){
    var chkFlg;
    if (document.forms[0].allChk.checked) {
        checkAll('selectMsg');
    } else {
        nocheckAll('selectMsg');
    }
}

function checkAll(chkName){
   chkAry = document.getElementsByName(chkName);
   for(i = 0; i < chkAry.length; i++) {
       chkAry[i].checked = true;
   }
}

function nocheckAll(chkName){
   chkAry = document.getElementsByName(chkName);
   for(i = 0; i < chkAry.length; i++) {
       chkAry[i].checked = false;
   }
}

