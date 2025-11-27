 function hideExtDomainArea() {
        if (document.forms[0].man430ExtPageDspKbn[1].checked) {
            $("#extDomainArea").addClass("display_n");
            $(".js_warnMessage").removeClass("display_n");
        } else {
            $("#extDomainArea").removeClass("display_n");
            $(".js_warnMessage").addClass("display_n");
        }
    }