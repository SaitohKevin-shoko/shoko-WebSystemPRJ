
$(function() {
    //説明の文字数表示
    showLengthId($('textarea[name="cmn340CacDescription"]')[0], 1000, 'inputlength');

    displayBaseApi($("select[name='cmn340CacPlugin']").val(), false);

    $(document).on("change", "select[name='cmn340CacPlugin']", function() {
        let val = $(this).val();
        displayBaseApi(val, true);
    });

    function displayBaseApi(plugin, reset) {
        $("select[name='cmn340CacGsApi']").find("option[value!=0]").addClass("display_none");
        if (reset) {
            $("select[name='cmn340CacGsApi']").val(0);
        }
        if (plugin == 0) {
            return;
        }

        let targetApi = $(`.js_gsapiPluginInfo[data-plugin="${plugin}"]`);
        for (let idx = 0; idx < targetApi.length; idx++) {
            let cagSid = targetApi.eq(idx).attr("data-cagsid");
            $("select[name='cmn340CacGsApi']").find(`option[value='${cagSid}']`).removeClass("display_none");
        }
    }

    //リクエストボディ自体の表示切り替え
    displayReqBody();

    //リクエストボディの表示内容の切り替え
    $(document).on("click", ".js_baseApi", function() {
        displayBaseApiArea(0);
    });

    //初回描画時にURL入力欄の高さを自動設定
    changeUrlHeight();

    //URL入力
    $(document).on("input", ".js_cacUrl", function() {
        changeUrlHeight();
    })
    function changeUrlHeight() {
        let target = $(".js_cacUrl")[0];
        target.style.height = "auto";
        target.style.height = target.scrollHeight + "px";
    }

    //URLからパラメータを生成する を押下
    $(document).on("click", ".js_createParamBtn", function() {
        $(".js_urlError").html("");

        let urlText = $("textarea[name='cmn340CacUrl']").val();
        let message = "";
        if (urlText == null || urlText.length == 0) {
            message = msglist_cmn340["cmn.cmn340.66"];
        } else {
            $(".js_pathParam").remove();
            $(".js_queryParam").remove();
            message = displayUrlParameter(urlText);
        }

        if (message != null && message.length > 0) {
            $(".js_urlError").append(`<div class="mb5">${message}</div>`);
        }
    });

    //URL ヘルプアイコンを押下
    $(document).on("click", ".js_paramHelp", function() {
        $('#urlParamHelpPop').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            modal: true,
            dialogClass:'dialog_button',
            height: 300,
            width: '600',
            overflow: 'auto',
            title: msglist_cmn340["cmn.cmn340.48"] + " " + msglist_cmn340["cmn.help"],
            overlay: {
                backgroundColor: '#FF0000',
                opacity: 0.5
            },
            buttons: {
              閉じる: function() {
                $(this).dialog('close');
              }
            }
        });
    });

    //リクエストボディ ヘルプアイコンを押下
    $(document).on("click", ".js_bodyHelp", function() {
        let val = $("select[name='cmn340CacContent']").val();
        let helpId = "#js_bodyHelpPop-json";
        let dialogHeight = 450;
        if (val == 4) {
            helpId = "#js_bodyHelpPop-url";
            dialogHeight = 270;
        } else if (val == 2 || val == 3) {
            helpId = "#js_bodyHelpPop-xml";
            dialogHeight = 455;
        } else if (val == 0) {
            helpId = "#js_bodyHelpPop-manual";
            dialogHeight = 205;
        }

        $(helpId).dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            modal: true,
            dialogClass:'dialog_button',
            height: dialogHeight,
            width: '600',
            overflow: 'auto',
            title: msglist_cmn340["cmn.cmn340.08"] + " " + msglist_cmn340["cmn.help"],
            overlay: {
                backgroundColor: '#FF0000',
                opacity: 0.5
            },
            buttons: {
              閉じる: function() {
                $(this).dialog('close');
              }
            }
        });
    });

    //リクエストボディからパラメータを生成する を押下
    $(document).on("click", ".js_createBodyBtn", function() {
        displayBodyParameter();
    });

    displayAuthArea($("input[name='cmn340CacAuth']:checked").val());

    //認証方式ラジオ 変更
    $(document).on("click", "input[name='cmn340CacAuth']", function() {
        displayAuthArea($(this).val());
    });

    function displayAuthArea(authKbn) {

        if (authKbn == 0) {
            //認証方式なし
            $(".js_authArea").addClass("display_none");
        } else if (authKbn == 1) {
            //トークン認証
            $(".js_authArea").removeClass("display_none");
            $(".js_authToken").removeClass("display_none");
            $(".js_authBasic").addClass("display_none");
        } else if (authKbn == 2) {
            //ベーシック認証
            $(".js_authArea").removeClass("display_none");
            $(".js_authBasic").removeClass("display_none");
            $(".js_authToken").addClass("display_none");
        }
    }

    //リクエストヘッダ 削除アイコン押下
    $(document).on("click", ".js_reqHeaderDelete", function() {
        $(this).parent().remove();
    });

    //リクエストヘッダ 追加するリンク押下
    $(document).on("click", ".js_reqHeaderLink", function() {
        let headerIdx = Number($(".js_reqHeaderList").attr("data-maxidx")) + 1;
        $(".js_reqHeaderList").attr("data-maxidx", headerIdx);

        let insertHtml = `
          <div class="mt5">
            <input type="text" name="cmn340RequestHeader[${headerIdx}].cachKey" class="w30" maxlength="100">：<input type="text" name="cmn340RequestHeader[${headerIdx}].cachValue" class="w60" maxlength="300">
            <img class="js_reqHeaderDelete cursor_p btn_originalImg-display ml5" src="../common/images/original/icon_trash_15.png" alt="delete">
            <img class="js_reqHeaderDelete cursor_p btn_classicImg-display wp15 ml5" src="../common/images/classic/icon_trash.png" alt="delete">
          </div>
        `;
        $(".js_reqHeaderList").append(insertHtml);
    });

    //リクエストボディ 追加するリンク押下(multipart/formdata時のみ)
    $(document).on("click", ".js_reqBodyLink", function() {
        let idx = $(".js_bodyParam").length + 1;
        let insertHtml = `
          <tr class="js_bodyParam">
            <td>
              <input type="text" name="cmn340BodyParam[${idx}].cacpName" value="" class="w100" maxlength="150">
            </td>
            <td><input type="text" name="cmn340BodyParam[${idx}].cacpNameDisp" value="" class="w100" maxlength="50"></td>
            <td><input type="text" name="cmn340BodyParam[${idx}].cacpBiko" value="" class="w100" maxlength="100"></td>
            <td class="txt_c">
              <select name="cmn340BodyParam[${idx}].cacpParamType">
                <option value="0">${msglist_cmn340["cmn.text"]}</option>
                <option value="1">${msglist_cmn340["cmn.file"]}</option>
              </select>
            </td>
            <td class="txt_c"><label class="toggle-button"><input type="checkbox" name="cmn340BodyParam[${idx}].cacpListKbn" value="1" ></label></td>
            <td class="txt_c"><label class="toggle-button"><input type="checkbox" name="cmn340BodyParam[${idx}].cacpRequiredKbn" value="1" ></label></td>
            <td class="txt_c">
              <span class="js_multiParamDel cursor_p">
                <img class="btn_classicImg-display" src="../common/images/classic/icon_delete.png" alt="削除">
                <img class="btn_originalImg-display" src="../common/images/original/icon_delete.png" alt="削除">
              </span>
            </td>
          </tr>
        `;

        $(".js_bodyParamTable").append(insertHtml);
    });

    //GroupSession APIを使用ボタンを押下
    $(document).on("click", ".js_gsApiBtn", function() {
        $('#gsApiPop').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            modal: true,
            dialogClass:'dialog_button',
            height: 360,
            width: '600',
            overflow: 'auto',
            title: msglist_cmn340["cmn.cmn340.36"],
            overlay: {
                backgroundColor: '#FF0000',
                opacity: 0.5
            },
            buttons: {
              閉じる: function() {
                $(this).dialog('close');
                closeTokenWindow();
              }
            }
        });
    });

    //GroupSession APIを反映ダイアログ 認証方法切り替え
    $(document).on("change", ".js_gsApiAuth", function() {
        if ($(this).val() == 1) {
            //トークン認証
            $(".js_gsApiToken").removeClass("display_none");
            $(".js_cacAuth_sub-token").removeClass("display_none");
            $(".js_gsApiBasic").addClass("display_none");
        } else {
            //ベーシック認証
            $(".js_gsApiToken").addClass("display_none");
            $(".js_cacAuth_sub-token").addClass("display_none");
            $(".js_gsApiBasic").removeClass("display_none");
        }
    });

    //multipart/formdata リクエストボディの削除ボタン押下
    $(document).on("click", ".js_multiParamDel", function() {
        $(this).closest("tr").remove();
    });

    //テストダイアログ クエリパラメータ追加ボタン押下
    $(document).on("click", ".js_queryAddBtn", function() {
        let name = $(this).siblings(".js_testQueryParam").data("paramname");
        insertHtml = `
          <div class="verAlignMid w100">
            <input type="text" class="w100 mt5 js_testQueryParam" data-paramname="${name}">
            <img class="btn_classicImg-display js_testQueryDelBtn cursor_p ml5" src="../common/images/classic/icon_delete.png">
            <img class="btn_originalImg-display js_testQueryDelBtn cursor_p ml5" src="../common/images/original/icon_delete.png">
          </div>
        `;
        $(this).closest("td").append(insertHtml);

        createTestUrl();
    });

    //テストダイアログ クエリパラメータ削除ボタン押下
    $(document).on("click", ".js_testQueryDelBtn", function() {
        $(this).parent().remove();
        createTestUrl();
    });

    //テストダイアログ ボディパラメータ追加ボタン押下
    $(document).on("click", ".js_reqBodyAddBtn", function() {
        let name = $(this).siblings(".js_testBodyParam").data("paramname");
        insertHtml = `
          <div class="verAlignMid w100">
            <input type="text" class="w100 mt5 js_testBodyParam" data-paramname=${name}>
            <img class="btn_classicImg-display js_reqBodyDelBtn cursor_p ml5" src="../common/images/classic/icon_delete.png">
            <img class="btn_originalImg-display js_reqBodyDelBtn cursor_p ml5" src="../common/images/original/icon_delete.png">
          </div>
        `;
        $(this).closest("td").append(insertHtml);

        createTestBody();
    });

    //テストダイアログ リクエストボディ削除ボタン押下
    $(document).on("click", ".js_reqBodyDelBtn", function() {
        $(this).parent().remove();
        createTestBody();
    });

    //テストダイアログ 使用チェックボックス変更
    $(document).on("change", ".js_testBodyParamUse", function() {

        //使用トグルの左にあるテキスト要素の有効/無効を切り替える
        let val = $(this).prop("checked");
        if ($(this).closest(".js_testBodyRow").find("input").length > 0) {
            $(this).closest(".js_testBodyRow").find("input[type!='checkbox']").prop("disabled", !val);
        }

        if ($("select[name='cmn340CacContent']").val() == 5) {
            createMultiBody();
        } else {
            let paramName = $(this).closest(".js_testBodyRow").attr("data-paramname");
            let childs = $(`.js_testBodyRow[data-paramname^="${paramName}."]`);
            for (let idx = 0; idx < childs.length; idx++) {
                childs.eq(idx).find(".js_testBodyParamUse").prop("checked", val);
                childs.eq(idx).find(".js_testBodyParam").prop("disabled", !val)
                childs.eq(idx).find(".js_testBodyParamUse").prop("disabled", !val)
            }
            createTestBody();
        }
    });

    //テストダイアログ multipart/formdata ボディパラメータ追加ボタン押下
    $(document).on("click", ".js_reqMultiBodyAddBtn", function() {
        let target = $(this).siblings(".js_testMultiBodyParam");
        insertHtml = `
          <div class="mt5 verAlignMid w100">
            ${target.prop("outerHTML")}
            <img class="btn_classicImg-display js_reqMultiBodyDelBtn cursor_p ml5" src="../common/images/classic/icon_delete.png">
            <img class="btn_originalImg-display js_reqMultiBodyDelBtn cursor_p ml5" src="../common/images/original/icon_delete.png">
          </div>
        `;
        $(this).closest("td").append(insertHtml);
        createMultiBody();
    });

    //テストダイアログ multipart/formdata リクエストボディ削除ボタン押下
    $(document).on("click", ".js_reqMultiBodyDelBtn", function() {
        $(this).parent().remove();
        createMultiBody();
    });

    //テストダイアログ multipart/formdata テキスト入力
    $(document).on("input", ".js_testMultiBodyParam", function() {
        createMultiBody();
    });

    //リクエストメソッド切り替え
    $(document).on("click", "input[name='cmn340CacMethod']", function() {
        //リクエストボディ欄の表示切り替え
        displayReqBody();
    });

    //ContentType切り替え
    $(document).on("change", "select[name='cmn340CacContent']", function() {
        //手入力要素の表示切り替え
        var contentType = $(this).val();
        if (contentType == 0) {
            $("input[name='cmn340CacContentManual']").removeClass("display_none");
        } else {
            $("input[name='cmn340CacContentManual']").addClass("display_none");
        }
        //リクエストボディのエラーメッセージを削除
        $(".js_reqBodyError").html("");

        displayReqBodyContent();
    });
    //初期表示時のコンテントタイプの表示切り替え
    if ($("select[name='cmn340CacContent']").val() == 0) {
        $("input[name='cmn340CacContentManual']").removeClass("display_none");
    } else {
        $("input[name='cmn340CacContentManual']").addClass("display_none");
    }


    //接続テスト パスパラメータ, クエリパラメータ入力
    $(document).on("input", ".js_testPathValue, .js_testQueryParam", function() {
        createTestUrl();
    });

    //接続テスト クエリパラメータ 使用切り替え
    $(document).on("change", ".js_testQueryParamUse", function() {
        createTestUrl();
    });

    //テストダイアログ URLの作成
    function createTestUrl() {
        let url = $(".js_testUrl").data("original");
        let pathUrl = "";
        let queryUrl = "";
        if (url.indexOf("?") > -1) {
            pathUrl = url.substring(0, url.indexOf("?"));
            queryUrl = url.substring(url.indexOf("?"));
        } else {
            pathUrl = url;
        }

        let pathParams = $(".js_testPathValue");
        for (let idx = 0; idx < pathParams.length; idx++) {
            let paramName = pathParams.eq(idx).data("paramname");
            let value = encodeURIComponent(pathParams.eq(idx).val());
            pathUrl = pathUrl.replace(`\${${paramName}}`, value);
        }

        let queryParams = $(".js_testQueryParam");
        let doneParamName = [];
        for (let idx = 0; idx < queryParams.length; idx++) {
            let paramName = queryParams.eq(idx).data("paramname");

            //使用チェックボックスがオフになっている時はパラメータから除外
            let useToggle = queryParams.eq(idx).closest(".js_testQueryRow").find(".js_testQueryParamUse");
            if (useToggle.length > 0 && !useToggle.prop("checked")) {
                queryUrl = queryUrl.replace(`${paramName}=\${${paramName}}`, "");
                continue;
            }

            if (doneParamName.includes(paramName)) {
                continue;
            }

            let paramArray = $(`.js_testQueryParam[data-paramname='${paramName}']`);
            if (paramArray.length > 1) {
                let replaceHtml = `${paramName}=${queryParams.eq(idx).val()}`;
                for (let i = 1; i < paramArray.length; i++) {
                    let value = encodeURIComponent(paramArray.eq(i).val());
                    replaceHtml += `&${paramName}=${value}`;
                }
                queryUrl = queryUrl.replace(`${paramName}=\${${paramName}}`, replaceHtml);
            } else {
                let value = encodeURIComponent(queryParams.eq(idx).val());
                queryUrl = queryUrl.replace(`${paramName}=\${${paramName}}`, `${paramName}=${value}`);
            }
            doneParamName.push(paramName);
        }

        $(".js_testUrl").text(pathUrl + queryUrl);

        $("input[name='cmn340TestUrl']").val(pathUrl + queryUrl);
    }

    $(document).on("input", ".js_testBodyParam", function() {
        createTestBody();
    });

    $(document).on("input", ".js_testMultiBodyParam", function() {
        $(".js_multiBodyValue").text($(this).val());
    });

    function createJsonBody() {
        let body = $(".js_testBody").data("original");
        if (body.length == 0) {
            return;
        }

        if (typeof body === "object") {
            body = JSON.stringify(body);
        }
        body = body.replaceAll(/\$\{.*?\}/g, `"value"`);
        let bodyParams = $(".js_testBodyParam");
        let jsonObj = JSON.parse(body);
        let doneParamName = [];

        //使用チェックボックスがオフになっている時はパラメータから除外
        let bodyRow = $(".js_testBodyRow");
        for (let idx = 0; idx < bodyRow.length; idx++) {
            let paramName = bodyRow.eq(idx).data("paramname");
            let useToggle = bodyRow.eq(idx).find(".js_testBodyParamUse");
            if (useToggle.length > 0 && !useToggle.prop("checked")) {
                if (paramName.includes(".")) {
                    let parentName = paramName.substring(0, paramName.indexOf("."));
                    if (doneParamName.includes(parentName)) {
                        doneParamName.push(paramName);
                        continue;
                    }
                    let childName = paramName.substring(paramName.lastIndexOf(".") + 1);
                    delete jsonObj[parentName][childName];
                } else {
                    delete jsonObj[paramName];
                }
                doneParamName.push(paramName);
            }
        }

        for (let idx = 0; idx < bodyParams.length; idx++) {
            let paramName = bodyParams.eq(idx).data("paramname");
            if (paramName.includes(".")) {
                let parentName = paramName.substring(0, paramName.indexOf("."));
                if (doneParamName.includes(parentName)) {
                    continue;
                }
            }
            if (doneParamName.includes(paramName)) {
                continue;
            }

            //値の代入
            let paramArray = $(`.js_testBodyParam[data-paramname='${paramName}']`);
            if (paramName.includes(".")) {
                let parentName = paramName.substring(0, paramName.indexOf("."));
                let childName = paramName.substring(paramName.lastIndexOf(".") + 1);
                if (paramArray.length > 1) {
                    jsonObj[parentName][childName] = [];
                    for (let i = 0; i < paramArray.length; i++) {
                        jsonObj[parentName][childName].push(paramArray.eq(i).val());
                    }
                } else {
                    jsonObj[parentName][childName] = bodyParams.eq(idx).val();
                }
            } else {
                if (paramArray.length > 1) {
                    jsonObj[paramName] = [];
                    for (let i = 0; i < paramArray.length; i++) {
                        jsonObj[paramName].push(paramArray.eq(i).val());
                    }
                } else {
                    jsonObj[paramName] = bodyParams.eq(idx).val();
                }
            }
        }
        $(".js_testBody").html(JSON.stringify(jsonObj, null, 2).replaceAll("\n", "<br>").replaceAll(" ", "&nbsp;"));
        $("input[name='cmn340TestBody']").val(JSON.stringify(jsonObj));
    }

    function createXmlBody() {
        let body = $(".js_testBody").data("original");
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(body, "application/xml");
        let element = $(xmlDoc.documentElement);

        //xml宣言部分はelementに含まれない為、後で追加する
        let xmlSengen = "";
        if (body.match(/<\?xml.*?\?>/) != null) {
            xmlSengen = body.match(/<\?xml.*?\?>/)[0] + "\n";
        }

        let bodyParams = $(".js_testBodyParam");
        let doneParamName = [];

        //使用チェックボックスがオフになっている時はパラメータから除外
        let bodyRow = $(".js_testBodyRow");
        for (let idx = 0; idx < bodyRow.length; idx++) {
            let paramName = bodyRow.eq(idx).data("paramname");
            let useToggle = bodyRow.eq(idx).find(".js_testBodyParamUse");
            if (useToggle.length > 0 && !useToggle.prop("checked")) {
                if (paramName.includes(".")) {
                    let parentName = paramName.substring(0, paramName.indexOf("."));
                    if (doneParamName.includes(parentName)) {
                        doneParamName.push(paramName);
                        continue;
                    }
                    let childName = paramName.substring(paramName.lastIndexOf(".") + 1);
                    element.children(parentName).find(childName).remove();
                } else {
                    element.children(paramName).remove();
                }
                doneParamName.push(paramName);
            }
        }

        for (let idx = 0; idx < bodyParams.length; idx++) {
            let paramName = bodyParams.eq(idx).data("paramname");
            if (paramName.includes(".")) {
                let parentName = paramName.substring(0, paramName.indexOf("."));
                if (doneParamName.includes(parentName)) {
                    continue;
                }
            }
            if (doneParamName.includes(paramName)) {
                continue;
            }

            //値の代入
            let paramArray = $(`.js_testBodyParam[data-paramname='${paramName}']`);
            if (paramName.includes(".")) {
                let parentName = paramName.substring(0, paramName.indexOf("."));
                let childName = paramName.substring(paramName.lastIndexOf(".") + 1);
                if (paramArray.length > 1) {
                    let insertHtml = "";
                    for (let i = 0; i < paramArray.length; i++) {
                        insertHtml += `<${childName}>${paramArray.eq(i).val()}</${childName}>`;
                    }
                    element.children(parentName).find(childName).prop("outerHTML", insertHtml);
                } else {
                    element.children(parentName).find(childName).text(bodyParams.eq(idx).val());
                }
            } else {
                if (paramArray.length > 1) {
                    let insertHtml = "";
                    for (let i = 0; i < paramArray.length; i++) {
                        insertHtml += `<${paramName}>${paramArray.eq(i).val()}</${paramName}>`;
                    }
                    element.children(paramName).prop("outerHTML", insertHtml);
                } else {
                    element.children(paramName).text(bodyParams.eq(idx).val());
                }
            }
            doneParamName.push(paramName);
        }

        $(".js_testBody").html((xmlSengen + element.prop("outerHTML")).replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\n", "<br>").replaceAll(" ", "&nbsp;"));
        $("input[name='cmn340TestBody']").val(xmlSengen + element.prop("outerHTML"));
    }

    function isXml(text) {
        try {
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(text, "text/xml");
            let parseError = xmlDoc.getElementsByTagName("parsererror");

            if (parseError.length == 0) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    function createTestBody() {
        if ($(".js_testBody").length == 0) {
            return;
        }
        let body = $(".js_testBody").data("original");
        let bodyParams = $(".js_testBodyParam");
        let contentType = $("select[name='cmn340CacContent']").val();
        let doneParamName = [];

        if (contentType == 1) {
            createJsonBody();
            return;
        }
        if (contentType == 2 || contentType == 3) {
            createXmlBody();
            return;
        }

        for (let idx = 0; idx < bodyParams.length; idx++) {
            let paramName = bodyParams.eq(idx).data("paramname");

            if (doneParamName.includes(paramName)) {
                continue;
            }

            //使用チェックボックスがオフになっている時はパラメータから除外
            let useToggle = bodyParams.eq(idx).closest(".js_testBodyRow").find(".js_testBodyParamUse");
            if (useToggle.length > 0 && !useToggle.prop("checked")) {
                if (contentType == 0) {
                    //手入力
                    body = body.replace(`\${${paramName}}`, "");
                } else if (contentType == 4) {
                    //form-urlencoded
                    if (body.indexOf(`&${paramName}=\${${paramName}}`) > -1) {
                        body = body.replace(`&${paramName}=\${${paramName}}`, "");
                    } else if (body.indexOf(`${paramName}=\${${paramName}}&`) > -1) {
                        body = body.replace(`${paramName}=\${${paramName}}&`, "");
                    } else {
                        body = body.replace(`${paramName}=\${${paramName}}`, "");
                    }
                }
                doneParamName.push(paramName);
                continue;
            }

            let paramArray = $(`.js_testBodyParam[data-paramname='${paramName}']`);
            if (paramName.includes(".")) {
                paramName = paramName.substring(paramName.lastIndexOf(".") + 1);
            }
            if (paramArray.length > 1) {
                //配列パラメータになっていて、かつ入力要素が複数作成されている時
                let replaceHtml = "";
                if (contentType == 4) {
                    for (let i = 0; i < paramArray.length; i++) {
                        if (i != 0) {
                            replaceHtml += "&";
                        }
                        replaceHtml += `${paramName}=${paramArray.eq(i).val()}`;
                    }
                    body = body.replace(`${paramName}=\${${paramName}}`, replaceHtml);
                }
            } else {
                //配列パラメータではない
                body = body.replace(`\${${paramName}}`, `${bodyParams.eq(idx).val()}`);
            }
            doneParamName.push(paramName);
        }

        if (contentType == 0 && isXml(body)) {
            $(".js_testBody").html(body.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\n", "<br>").replaceAll(" ", "&nbsp;"));
        } else {
            $(".js_testBody").html(body.replaceAll("\n", "<br>").replaceAll(" ", "&nbsp;"));
        }
        $("input[name='cmn340TestBody']").val(body);
    }

    //リクエストボディ欄の表示を切り替える
    function displayReqBody() {
        let reqMethod = $("input[name='cmn340CacMethod']:checked").val();
        if (reqMethod == 0 || reqMethod == 4) {
            $(".js_reqBody").addClass("display_none");
            $(".js_contentType").addClass("display_none");
        } else {
            $(".js_reqBody").removeClass("display_none");
            $(".js_contentType").removeClass("display_none");
        }
    }

    //GroupSession API 反映ダイアログ プラグイン切り替え
    $(document).on("change", ".js_apiPlugin", function() {
        let val = $(this).val();
        if (val == 0) {
            //選択してください
            $(".js_apiSelect").children("option").removeClass("display_none");
            $(".js_apiSelect").val(0);
        } else {
            //各プラグイン
            $(".js_apiSelect").children("option[value!=0]").addClass("display_none");
            $(".js_apiSelect").children(`option[data-plugin="${val}"]`).removeClass("display_none");
            $(".js_apiSelect").val(0);
        }
    });

    //GroupSession API 反映ダイアログ
    $(document).on("click", ".js_gsApiReflect", function() {

        document.forms[0].CMD.value='cmn340ReflectGsApi';
        let apiSid = $(".js_apiSelect").val();
        paramStr = "CMD=cmn340ReflectGsApi&cmn340CacGsApi=" + apiSid;

        $.ajax({
            async: true,
            url:  "../common/cmn340.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            $(".js_apiPopError").html("");
            if (data["success"]) {
                //プラグイン，操作の設定
                $("select[name='cmn340CacPlugin']").val(data["plugin"]);
                $("select[name='cmn340CacGsApi']").val(data["cagSid"]);

                //URL, パラメータの設定
                let pathArray = window.location.pathname.split("/");

                //Content-Typeの設定
                let beforeContentKbn = $("select[name='cmn340CacContent']").val();
                if (beforeContentKbn != data["contentKbn"]) {
                    $("select[name='cmn340CacContent']").val(data["contentKbn"]).trigger("change");
                }

                //リクエストボディの削除
                $("textarea[name='cmn340CacBody']").text("");
                $(".js_bodyParam").remove();
                //パスパラメータ，クエリパラメータの削除
                $(".js_pathParamTable").find(".js_pathParam").remove();
                $(".js_queryParamTable").find(".js_queryParam").remove();

                //URLの書き換え
                $("textarea[name='cmn340CacUrl']").val(window.location.origin + "/" + pathArray[1] + data["url"]);
                if (data["paramList"] != null && data["paramList"].length > 0) {
                  let paramList = JSON.parse(JSON.stringify(data["paramList"]));
                  let pathCount = 0;
                  let queryCount = 0;
                  let bodyCount = 0;
                  for (let idx = 0; idx < paramList.length; idx++) {
                    let paramInfo = paramList[idx];
                    if (paramInfo["cagpKbn"] == 0) {
                        let insertHtml = `
                          <tr class="js_pathParam js_paramaterRow bgc_transparent">
                            <td>
                              ${paramInfo["cagpName"]}
                              <input type="hidden" name="cmn340PathParam[${pathCount}].cacpName" value="${paramInfo["cagpName"]}">
                            </td>
                            <td>
                              <input type="text" name="cmn340PathParam[${pathCount}].cacpNameDisp" value="${paramInfo["cagpNameDisp"]}" class="w100" maxlength="50">
                            </td>
                            <td>
                              <input type="text" name="cmn340PathParam[${pathCount}].cacpBiko" value="${paramInfo["cagpBiko"]}" class="w100" maxlength="100">
                            </td>
                          </tr>
                        `;
                        $(".js_pathParamTable").append(insertHtml);
                        pathCount++;
                    } else if (paramInfo["cagpKbn"] == 1) {
                        let listCheck = "";
                        let requiredCheck = "";
                        if (paramInfo["cagpListKbn"] == 1) {
                            listCheck = "checked";
                        }
                        if (paramInfo["cagpRequiredKbn"] == 1) {
                            requiredCheck = "checked";
                        }
                        let insertHtml = `
                          <tr class="js_queryParam js_paramaterRow bgc_transparent">
                            <td>
                              ${paramInfo["cagpName"]}
                              <input type="hidden" name="cmn340QueryParam[${queryCount}].cacpName" value="${paramInfo["cagpName"]}">
                            </td>
                            <td>
                              <input type="text" name="cmn340QueryParam[${queryCount}].cacpNameDisp" value="${paramInfo["cagpNameDisp"]}" class="w100" maxlength="50">
                            </td>
                            <td>
                              <input type="text" name="cmn340QueryParam[${queryCount}].cacpBiko" value="${paramInfo["cagpBiko"]}" class="w100" maxlength="100">
                            </td>
                            <td class="txt_c">
                              <label class="toggle-button">
                                <input type="checkBox" name="cmn340QueryParam[${queryCount}].cacpListKbn" value="1" ${listCheck}>
                              </label>
                            </td>
                            <td class="txt_c">
                              <label class="toggle-button">
                                <input type="checkBox" name="cmn340QueryParam[${queryCount}].cacpRequiredKbn" value="1"  ${requiredCheck}>
                              </label>
                            </td>
                          </tr>
                        `;
                        $(".js_queryParamTable").append(insertHtml);
                        queryCount++;
                    } else if (paramInfo["cagpKbn"] == 2) {
                        let listCheck = "";
                        let requiredCheck = "";
                        if (paramInfo["cagpListKbn"] == 1) {
                            listCheck = "checked";
                        }
                        if (paramInfo["cagpRequiredKbn"] == 1) {
                            requiredCheck = "checked";
                        }
                        let insertHtml = "";
                        if (data["contentKbn"] == 5) {
                            let textSelected = "selected";
                            let fileSelected = "";
                            if (paramInfo["cagpParamType"] == 1) {
                                textSelected = "";
                                fileSelected = "selected";
                            }
                            insertHtml = `
                                <tr class="js_bodyParam js_paramaterRow bgc_transparent">
                                  <td>
                                    <input type="text" name="cmn340BodyParam[${bodyCount}].cacpName" value="${paramInfo["cagpName"]}" class="w100" maxlength="150">
                                  </td>
                                  <td>
                                    <input type="text" name="cmn340BodyParam[${bodyCount}].cacpNameDisp" value="${paramInfo["cagpNameDisp"]}" class="w100" maxlength="50">
                                  </td>
                                  <td>
                                    <input type="text" name="cmn340BodyParam[${bodyCount}].cacpBiko" value="${paramInfo["cagpBiko"]}" class="w100" maxlength="100">
                                  </td>
                                  <td class="txt_c">
                                    <select name="cmn340BodyParam[${bodyCount}].cacpParamType">
                                      <option value="0" ${textSelected}>${msglist_cmn340["cmn.text"]}</option>
                                      <option value="1" ${fileSelected}>${msglist_cmn340["cmn.file"]}</option>
                                    </select>
                                  </td>
                                  <td class="txt_c">
                                    <label class="toggle-button">
                                      <input type="checkBox" name="cmn340BodyParam[${bodyCount}].cacpListKbn" value="1" ${listCheck}>
                                    </label>
                                  </td>
                                  <td class="txt_c">
                                    <label class="toggle-button">
                                      <input type="checkBox" name="cmn340BodyParam[${bodyCount}].cacpRequiredKbn" value="1"  ${requiredCheck}>
                                    </label>
                                  </td>
                                  <td class="txt_c">
                                    <span class="js_multiParamDel cursor_p">
                                    <img class="btn_classicImg-display" src="../common/images/classic/icon_delete.png" alt="${msglist_cmn340["cmn.delete"]}">
                                    <img class="btn_originalImg-display" src="../common/images/original/icon_delete.png" alt="${msglist_cmn340["cmn.delete"]}">
                                    </span>
                                  </td>
                                </tr>
                            `;
                        }
                        $(".js_bodyParamTable").append(insertHtml);
                        bodyCount++;
                    }
                  }
                }

                //メソッドの設定
                $(`input[name='cmn340CacMethod'][value='${data["method"]}']`).prop("checked", true);
                displayReqBody();

                //認証の設定
                if ($(".js_gsApiAuth").val() == 1) {
                    $("input[name='cmn340CacAuth'][value='1']").prop("checked", true);
                    $("input[name='cmn340CacToken']").val($(".js_tokenKey").val());

                    $(".js_authArea").removeClass("display_none");
                    $(".js_authToken").removeClass("display_none");
                    $(".js_authBasic").addClass("display_none");
                } else {
                    $("input[name='cmn340CacAuth'][value='2']").prop("checked", true);
                    $("input[name='cmn340CacId']").val($(".js_gsApiId").val());
                    $("input[name='cmn340CacPassword']").val($(".js_gsApiPassword").val());

                    $(".js_authArea").removeClass("display_none");
                    $(".js_authBasic").removeClass("display_none");
                    $(".js_authToken").addClass("display_none");
                }

                $(".js_baseApi-up").addClass("display_none");
                $(".js_baseApi-down").removeClass("display_none");
                $(".js_baseApiContent").removeClass("display_none");

                $("#gsApiPop").dialog('close');
                changeUrlHeight();
            } else {
                $(".js_apiPopError").text(msglist_cmn340["cmn.cmn340.error.gsapi"]);
            }
        })
    });

    //コンテントタイプによるリクエストボディの表示内容の変更
    function displayReqBodyContent() {

        $(".js_bodyParam").remove();
        let contentType = $("select[name='cmn340CacContent']").val();
        if (contentType == 0) {
            $(".js_bodyHelp").removeClass("display_none");
            $(".js_reqBodyLink").addClass("display_none");
            $(".js_reqBodyLink").parent().remove();
        } else if (contentType == 5) {
            //multipartの場合はヘルプを非表示
            $(".js_bodyHelp").addClass("display_none");
            $(".js_reqBodyLink").removeClass("display_none");
            $(".js_reqBodyDel").removeClass("display_none");
        } else {
            $(".js_bodyHelp").removeClass("display_none");
            $(".js_reqBodyLink").addClass("display_none");
            $(".js_reqBodyDel").addClass("display_none");
            $(".js_reqBodyLink").parent().remove();
        }

        if (contentType == 0) {
            //手入力
            $(".js_reqBodyArea").removeClass("display_none");
            $(".js_reqBodyType").addClass("display_none");
            $(".js_reqBodyList").addClass("display_none");
            $(".js_reqBodyDel").addClass("display_none");

        } else if (contentType == 4) {
            //application/x-www-form-urlencoded
            $(".js_reqBodyArea").removeClass("display_none");
            $(".js_reqBodyType").addClass("display_none");
            $(".js_reqBodyList").removeClass("display_none");
            $(".js_reqBodyDel").addClass("display_none");
        } else if (contentType == 1) {
            //application/json
            $(".js_reqBodyArea").removeClass("display_none");
            $(".js_reqBodyType").addClass("display_none");
            $(".js_reqBodyList").removeClass("display_none");
            $(".js_reqBodyDel").addClass("display_none");
        } else if (contentType == 2 || contentType == 3) {
            //text/xml, application/xml
            $(".js_reqBodyArea").removeClass("display_none");
            $(".js_reqBodyType").addClass("display_none");
            $(".js_reqBodyList").removeClass("display_none");
            $(".js_reqBodyDel").addClass("display_none");
        } else if (contentType == 5) {
            //multipart/form-data
            $(".js_reqBodyArea").addClass("display_none");
            $(".js_reqBodyType").removeClass("display_none");
            $(".js_reqBodyList").removeClass("display_none");
            $(".js_reqBodyDel").removeClass("display_none");

            $(".js_bodyParam").remove();
            $(".js_bodyParamTable").append(`
                <tr class="js_bodyParam js_paramaterRow bgc_transparent">
                  <td>
                    <input type="text" name="cmn340BodyParam[1].cacpName" value="file" class="w100" maxlength="150">
                  </td>
                  <td>
                    <input type="text" name="cmn340BodyParam[1].cacpNameDisp" value="" class="w100" maxlength="50">
                  </td>
                  <td>
                    <input type="text" name="cmn340BodyParam[1].cacpBiko" value="" class="w100" maxlength="100">
                  </td>
                  <td class="txt_c">
                    <select name="cmn340BodyParam[1].cacpParamType">
                      <option value="0">${msglist_cmn340["cmn.text"]}</option>
                      <option value="1" selected>${msglist_cmn340["cmn.file"]}</option>
                    </select>
                  </td>
                  <td class="txt_c">
                    <label class="toggle-button">
                      <input type="checkbox" name="cmn340BodyParam[1].cacpListKbn" value="1">
                    </label>
                  </td>
                  <td class="txt_c">
                    <label class="toggle-button">
                      <input type="checkbox" name="cmn340BodyParam[1].cacpRequiredKbn" value="1">
                    </label>
                  </td>
                  <td class="txt_c">
                    <span class="js_multiParamDel cursor_p">
                      <img class="btn_classicImg-display" src="../common/images/classic/icon_delete.png" alt="">
                      <img class="btn_originalImg-display" src="../common/images/original/icon_delete.png" alt="">
                    </span>
                  </td>
                </tr>
            `);
            let addLink = `
              <div class="mt5">
                <span class="textLink cursor_p js_reqBodyLink">${msglist_cmn340["cmn.cmn340.59"]}</span>
              </div>
            `;
            $(addLink).insertAfter(".js_bodyParamTable");
        }
    }

    function getPathParamNames(urlText) {
        //置き換え文字列の正規表現
        const re = new RegExp(/\$\{.+?\}/g);
        //パスパラメータの中から、変数名=${変数名}を取得
        let ret = [];
        while ((result = re.exec(urlText)) != null) {
            let paramName = result[0];
            ret.push(paramName.substring(2, paramName.length -1));
        }

        return ret;
    }

    function getQueryParamNames(urlText) {
        //置き換え文字列の正規表現
        const re = new RegExp(/(.+?)=\$\{(\1)\}/g);
        //クエリパラメータの中から、変数名=${変数名}を取得
        let ret = [];
        while ((result = re.exec(urlText)) != null) {
            ret.push(result[2]);
        }

        return ret;
    }

    function displayUrlParameter(urlText) {

        const questionIndex = urlText.indexOf("?")
        let pathParameter = "";
        let queryParameter = "";

        if (questionIndex == -1) {
            //?が無い場合は全てをパスパラメータとして扱う
            pathParameter = urlText;
        } else {
            //最初に出現したまでをパスパラメータ，それ以降をクエリパラメータとして扱う
            pathParameter = urlText.substring(0, questionIndex);
            queryParameter = urlText.substring(questionIndex + 1);
        }

        let matchPathParam = getPathParamNames(pathParameter);
        let matchQueryParam = getQueryParamNames(queryParameter);
        const re = new RegExp(/\$\{.*\}/g);
        let regMatch = queryParameter.match(re);
        if (regMatch != null && matchQueryParam.length < regMatch.length) {
            return msglist_cmn340["cmn.cmn340.83"];
        }

        if (matchPathParam.length == 0 && matchQueryParam.length == 0) {
            return msglist_cmn340["cmn.cmn340.66"];
        }

        if (new Set(matchPathParam).size != matchPathParam.length) {
            return msglist_cmn340["cmn.cmn340.84"];
        }
        if (new Set(matchQueryParam).size != matchQueryParam.length) {
            return msglist_cmn340["cmn.cmn340.85"];
        }

        //パスパラメータの中から、${1文字以上の文字列}を取得
        let pathParamHtml = "";
        if (matchPathParam != null && matchPathParam.length > 0) {
            let count = 1;
            for (let paramName of matchPathParam) {
                if (paramName.includes("$") || paramName.includes("{")
                    || paramName.includes("}") || paramName.includes(".")) {
                    return msglist_cmn340["cmn.cmn340.67"];
                }
                pathParamHtml += createPathParamDisp(paramName, count);
                count++;
            }
        }
        $(".js_pathParamTable").append(pathParamHtml);

        //クエリパラメータの中から、${1文字以上の文字列}を取得
        let queryParamHtml = "";
        if (matchQueryParam != null && matchQueryParam.length > 0) {
            let count = 1;
            for (let paramName of matchQueryParam) {
                if (paramName.includes("$") || paramName.includes("{")
                    || paramName.includes("}") || paramName.includes(".")) {
                    return msglist_cmn340["cmn.cmn340.67"];
                }
                queryParamHtml += createQueryParamDisp(paramName, count);
                count++;
            }
        }
        $(".js_queryParamTable").append(queryParamHtml);

        return;

        function createPathParamDisp(paramName, count) {
            if (paramName == null || paramName.length == 0) {
                return "";
            }
            let ret = "";
            ret += `
              <tr class="js_pathParam js_paramaterRow bgc_transparent">
                <td>
                  ${paramName}
                  <input type="hidden" name="cmn340PathParam[${count}].cacpName" value="${paramName}" />
                </td>
                <td><input type="text" name="cmn340PathParam[${count}].cacpNameDisp" class="w100" maxlength="50"></td>
                <td><input type="text" name="cmn340PathParam[${count}].cacpBiko" class="w100" maxlength="100"></td>
              </tr>
            `;
            return ret;
        }

        function createQueryParamDisp(paramName, count) {
            if (paramName == null || paramName.length == 0) {
                return "";
            }
            let ret = "";
            ret += `
              <tr class="js_queryParam js_paramaterRow bgc_transparent">
                <td>
                  ${paramName}
                  <input type="hidden" name="cmn340QueryParam[${count}].cacpName" value="${paramName}"/>
                </td>
                <td><input type="text" name="cmn340QueryParam[${count}].cacpNameDisp" class="w100" maxlength="50"></td>
                <td><input type="text" name="cmn340QueryParam[${count}].cacpBiko" class="w100" maxlength="100"></td>
                <td class="txt_c">
                  <label class="toggle-button">
                    <input type="checkBox" name="cmn340QueryParam[${count}].cacpListKbn" value="1">
                  </label>
                </td>
                <td class="txt_c">
                  <label class="toggle-button">
                    <input type="checkBox" name="cmn340QueryParam[${count}].cacpRequiredKbn" value="1">
                  </label>
                </td>
              </tr>
            `;
            return ret;
        }
    }

    function displayBodyParameter() {

        document.forms[0].CMD.value='cmn340GetBodyParam';
        paramStr = $(".js_Form").serialize();

        $.ajax({
            async: true,
            url:  "../common/cmn340.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            $(".js_reqBodyError").html("");
            if (data["success"]) {

                let params = JSON.parse(JSON.stringify(data["paramList"]));
                let insertHtml = "";
                let paramIdx = 0;
                let isPrevChild = false;
                for (let idx = 0; idx < params.length; idx++) {
                    let param = params[idx];
                    paramIdx = paramIdx + idx;
                    if (param["child"] == null || param["child"].length == 0) {
                        //階層構造になっていないもの
                        let trClass = "js_bodyParam";
                        if (isPrevChild) {
                            trClass = "js_bodyParam bor_t1";
                        }
                        insertHtml += `
                            <tr class="${trClass}">
                                <td>
                                ${param["paramName"]}
                                <input type="hidden" name="cmn340BodyParam[${paramIdx}].cacpName" value="${param["paramName"]}">
                                </td>
                                <td>
                                <input type="text" name="cmn340BodyParam[${paramIdx}].cacpNameDisp" class="w100" maxlength="50">
                                </td>
                                <td>
                                <input type="text" name="cmn340BodyParam[${paramIdx}].cacpBiko" class="w100" maxlength="100">
                                </td>
                            `;
                        if ($("select[name='cmn340CacContent']").val() != 0) {
                            insertHtml += `
                                <td class="txt_c">
                                  <label class="toggle-button"><input type="checkbox" name="cmn340BodyParam[${paramIdx}].cacpListKbn" value="1"></label>
                                </td>
                            `;
                        }
                        insertHtml += `
                                <td class="txt_c">
                                  <label class="toggle-button"><input type="checkbox" name="cmn340BodyParam[${paramIdx}].cacpRequiredKbn" value="1"></label>
                                </td>
                            </tr>
                        `;
                    } else {
                        //階層構造になっているもの
                        insertHtml += `
                            <tr class="js_bodyParam border_bottom_none">
                                <td class="border_bottom_none">
                                  ${param["paramName"]}
                                  <input type="hidden" name="cmn340BodyParam[${paramIdx}].cacpName" value="${param["paramName"]}">
                                </td>
                                <td>
                                  <input type="text" name="cmn340BodyParam[${paramIdx}].cacpNameDisp" class="w100" maxlength="50">
                                </td>
                                <td>
                                  <input type="text" name="cmn340BodyParam[${paramIdx}].cacpBiko" class="w100" maxlength="100">
                                </td>
                                <td>
                                </td>
                                <td class="txt_c">
                                  <label class="toggle-button">
                                    <input type="checkbox" name="cmn340BodyParam[${paramIdx}].cacpRequiredKbn" value="1">
                                  </label>
                                </td>
                            </tr>
                        `;
                        for (let childIdx = 0; childIdx < param["child"].length; childIdx++) {
                            paramIdx = paramIdx + childIdx + 1;
                            let child = param["child"][childIdx];
                            insertHtml += `
                                <tr class="js_bodyParam border_none">
                                  <td class="border_none">
                                    <span class="ml20">- ${child["paramName"]}</span>
                                    <input type="hidden" name="cmn340BodyParam[${paramIdx}].cacpName" value="${param["paramName"]}.${child["paramName"]}">
                                  </td>
                                  <td>
                                    <input type="text" name="cmn340BodyParam[${paramIdx}].cacpNameDisp" class="w100" maxlength="50">
                                  </td>
                                  <td>
                                    <input type="text" name="cmn340BodyParam[${paramIdx}].cacpBiko" class="w100" maxlength="100">
                                  </td>
                                  <td class="txt_c">
                                    <label class="toggle-button"><input type="checkbox" name="cmn340BodyParam[${paramIdx}].cacpListKbn" value="1"></label>
                                  </td>
                                  <td class="txt_c">
                                    <label class="toggle-button"><input type="checkbox" name="cmn340BodyParam[${paramIdx}].cacpRequiredKbn" value="1"></label>
                                  </td>
                                </tr>
                            `;
                        }
                        isPrevChild = true;
                    }
                }
                $(".js_bodyParam").remove();
                $(".js_bodyParamTable").append(insertHtml);
            } else {
                $(".js_reqBodyError").append(`<div class="mb5">${data["error"]}</div>`);
            }
        });
    }

    function displayBaseApiArea(kbn) {
        $(".js_baseApi-up").toggleClass("display_none");
        $(".js_baseApi-down").toggleClass("display_none");
        $(".js_baseApiContent").toggleClass("display_none");
    }

    $(document).on('click', "img[onclick*='attachmentDeleteFile']", function () {
        let area = $(this).closest("div[id^='attachmentFileDetail']");
        let id = area.attr("id");
        let fileNum = id.substring(id.indexOf("_") + 1);

        let deleteTarget = $(`.js_multiParamInfo[data-filesavename="${fileNum}"]`);
        deleteTarget.remove();

        createMultiBody();
    });

    $('.js_okBtnClick').on('click', function () {
        document.forms[0].CMD.value='cmn340Ok';
        paramStr = $(".js_Form").serialize();

        $.ajax({
            async: true,
            url:  "../common/cmn340.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            $(".js_errorMsg").html("");
            if (data["success"]) {
                $('input:hidden[name="org.apache.struts.taglib.html.TOKEN"]').val(data["token"])
                let titleStr = ""
                if ($("input[name='cmn340mode']").val() == 0) {
                    $(".js_decisionMessage").html(msglist_cmn340["cmn.cmn340.46"]);
                    titleStr = msglist_cmn340["cmn.entry"] + msglist_cmn340["cmn.check"]
                } else {
                    $(".js_decisionMessage").html(msglist_cmn340["cmn.cmn340.51"]);
                    titleStr = msglist_cmn340["cmn.edit"] + msglist_cmn340["cmn.check"]
                }

                $('#decisionKakuninPop').dialog({
                    autoOpen: true,  // hide dialog
                    bgiframe: true,   // for IE6
                    resizable: false,
                    modal: true,
                    dialogClass:'dialog_button',
                    height: 200,
                    width: '400',
                    overflow: 'auto',
                    title: titleStr,
                    overlay: {
                        backgroundColor: '#FF0000',
                        opacity: 0.5
                    },
                    buttons: {
                      OK: function() {
                        buttonPush('cmn340Decision');
                      },
                      キャンセル: function() {
                        $(this).dialog('close');
                      }
                    }
                });
            } else {
                var roopFlg = false;
                for (var i = 0; i < data["size"]; i++) {
                    roopFlg = true;
                    $(".js_errorMsg").append("<div>" + data["errorMsg_" + i] + "</div>");
                }
                if (!roopFlg) {
                    alert("エラーが発生しました。画面を開きなおしてください。");
                }
            }
        });
    });

    $('.js_delBtnClick').on('click', function () {
        $(".js_decisionMessage").html(msglist_cmn340["cmn.cmn340.63"]);
        $('#decisionKakuninPop').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            modal: true,
            dialogClass:'dialog_button',
            height: 200,
            width: '400',
            overflow: 'auto',
            title: msglist_cmn340["cmn.delete"] + msglist_cmn340["cmn.check"],
            overlay: {
                backgroundColor: '#FF0000',
                opacity: 0.5
            },
            buttons: {
                OK: function() {
                buttonPush('cmn340DeleteComp');
                },
                キャンセル: function() {
                $(this).dialog('close');
                }
            }
        });
    });

    /*読み込み中ダイアログ*/
    function loadingPop(popTxt) {

        $('#loading_pop').dialog({
            autoOpen: true,  // hide dialog
            dialogClass:"fs_13",
            resizable: false,
            height: 130,
            width: 250,
            modal: true,
            title: popTxt,
            overlay: {
                backgroundColor: '#000000',
                opacity: 0.5
            },
            closeOnEscape:false,
            close: function() {
            },
            open: function() {
            }
        });

        $('.ui-button-text').each(function() {
            if ($(this).text() == 'hideBtn') {
                $(this).parent().parent().parent().addClass('border_top_none');
                $(this).parent().parent().parent().addClass('border_bottom_none');
                $(this).parent().remove();
            }
        })
    }

     //テストdialogオープン判定
     $('.js_testBtn').on('click', function () {
        buttonPush('cmn340Test');
     });

     if ($('#test_dialog.js_testDialog-open').length > 0) {
        createTestUrl();
        if ($("select[name='cmn340CacContent']").val() == 5) {
            createMultiBody();
        } else {
            createTestBody();
        }
        $('#test_dialog.js_testDialog-open').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            modal: true,
            dialogClass:'dialog_button',
            height: 700,
            width: '80%',
            overflow: 'auto',
            title: msglist_cmn340["cmn.connecttest"],
            overlay: {
                backgroundColor: '#FF0000',
                opacity: 0.5
            },
            buttons:[{
                    text: msglist_cmn340['cmn.close'],
                    click:  function() {
                        $(this).dialog('close');
                    }
                }],
            close: function() {
                $( this ).children().remove();
            },
            open: function() {
                // キャンセルボタンにフォーカスをあてる
                $( this ).siblings('.ui-dialog-buttonpane').find('button:eq(0)').focus();
                //接続テスト実行
                $('.js_cmn340test_doBtn').on('click', function () {
                      $('input[name="CMD"]').val('cmn340TestDo');
                      //エラーメッセージの削除
                      $(".js_errorMsg").remove();

                      var param = new Array();
                      param = param.concat($(document.forms[0]).serializeArray());
                      param = param.concat($(document.forms[1]).serializeArray());
                      param = param.concat($(document.forms[2]).serializeArray());
                      loadingPop(msglist["nowLoading"]);

                      $.ajax({
                          async: true,
                          url:  "../common/cmn340.do",
                          type: "post",
                          data: param
                      }).done(function( data ) {
                          if ($('#loading_pop').hasClass('ui-dialog-content')) {
                            $('#loading_pop').dialog('close');
                          }
                          if (data["success"]) {
                             $('.js_cmn340testResponce').val(data["responce"]);
                          } else if ($(data).length > 0) {
                             //画面内のHTMLをエラー画面のHTMLで置き換え
                             $('html').html('');
                             $('body').append($(data));
                             return;
                          }
                      });
                 });
            }

        });
     }

    //トークン画面を別ウィンドウで表示
    $('button.js_cacAuth_sub-token').on('click', function () {
      openTokenKanriWindow();
    });
});

let tokenKanriWindow;
function openTokenKanriWindow() {
    var winWidth = 1024;
    var winHeight = 800;
    var winx = (screen.width - winWidth) / 2;
    var winy = (screen.height - winHeight) / 2;

    var url = '../api/api030.do?CMD=api010Token&api030DspMode=1';
    var opt = 'width=' + winWidth + ', height=' + winHeight + ', resizable=yes , toolbar=no ,' +
                'left=' + winx + ', top=' + winy + ',scrollbars=yes';
    tokenKanriWindow = window.open(url, 'tokenKanri', opt);
    return false;
}

function closeTokenWindow() {
    if (tokenKanriWindow != null) {
        tokenKanriWindow.close();
    }
}

function createMultiBody() {
    if ($("select[name='cmn340CacContent']").val() != 5) {
        return;
    }
    let paramInfo = $(".js_multiParamInfo");
    if (paramInfo.length == 0) {
        //有効なパラメータが存在しない場合
        $(".js_testMultiBodyArea").html("");
        return;
    }

    let multiData = "";

    for (let idx = 0; idx < paramInfo.length; idx++) {
        let name = paramInfo.eq(idx).attr("data-paramname");
        let useToggle = $(`.js_testBodyRow[data-paramname='${name}']`).find(".js_testBodyParamUse");
        if (useToggle.length > 0 && !useToggle.prop("checked")) {
            //未使用の場合はリクエストボディに該当パラメータを表示しない
            continue;
        }

        let paramType = paramInfo.eq(idx).attr("data-paramtype");
        if (paramType == 0) {
            multiData += `<!--
                -->--GroupSessionSeparator<br><!--
                -->Content-Disposition: formdata; name="${name}"
                <br><br><!--
                -->${paramInfo.eq(idx).val()}<br>
            `;
        } else {
            multiData += `<!--
                -->--GroupSessionSeparator<br><!--
                -->Content-Disposition: formdata; name="${name}" filename="${paramInfo.eq(idx).attr("data-filename")}"<br><!--
                -->Content-Type: ${paramInfo.eq(idx).attr("data-filetype")}
                <br><br><!--
                -->[${msglist_cmn340["cmn.cmn340.86"]}]<br>
            `;
        }
    }
    if (multiData.length > 0) {
        multiData += `--GroupSessionSeparator--`;
    }

    $(".js_testMultiBodyArea").html(multiData);
}

function cmn110Updated(window, tempName, tempSaveName, objId) {

    let extension = tempName;
    if (tempName.lastIndexOf(".") > -1) {
        extension = tempName.substring(tempName.lastIndexOf("."));
    }

    let tempId = Number(objId);

    type = "";
    if (extension == ".css") {
        type += "text/css";
    } else if (extension == ".csv") {
        type += "text/csv";
    } else if (extension == ".doc") {
        type += "application/msword";
    } else if (extension == ".gif") {
        type += "image/gif";
    } else if (extension == ".html") {
        type += "text/html";
    } else if (extension == ".ico") {
        type += "image/vnd.microsoft.icon";
    } else if (extension == ".jpeg") {
        type += "image/jpeg";
    } else if (extension == ".jpg") {
        type += "image/jpeg";
    } else if (extension == ".js") {
        type += "text/javascript";
    } else if (extension == ".json") {
        type += "application/json";
    } else if (extension == ".png") {
        type += "image/png";
    } else if (extension == ".pdf") {
        type += "application/pdf";
    } else if (extension == ".ppt") {
        type += "application/vnd.ms-powerpoint";
    } else if (extension == ".pptx") {
        type += "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    } else if (extension == ".txt") {
        type += "text/plain";
    } else if (extension == ".xls") {
        type += "application/vnd.ms-excel";
    } else if (extension == ".xlsx") {
        type += "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    } else if (extension == ".xml") {
        type += "text/xml";
    } else if (extension == ".zip") {
        type += "application/zip";
    } else {
        type += "application/octet-stream";
    }

    let paramName = $(`.js_testBodyRow[data-tempid='${tempId}']`).attr("data-paramname");
    if ($(`.js_testBodyRow[data-tempid='${tempId}']`).find("span[data-tempmode='2']").length > 0) {
        //単一選択の場合、元々あったファイル情報を削除する
        $(`.js_multiParamInfo[data-paramname="${paramName}"]`).remove();
    }
    let paramInfo = `
      <span class="js_multiParamInfo" data-paramtype="1" data-paramname="${paramName}" data-fileName="${tempName}" data-filetype="${type}" data-filesavename="${tempSaveName}"></span>
    `;
    $(".js_fileInfoArea").append(paramInfo);
    createMultiBody();
}
