function setAllReadOnly(document, flg) {

    var delements = document.getElementsByTagName('input');

    for(i=0; i< delements.length; i++) {
       var elm = delements[i];
       if (elm.type == 'text'
           ||
           elm.type == 'password'
           ) {
           setReadOnlyText(elm, flg);
       } else if (
           elm.type == 'checkbox'
           ) {
           setReadOnlyCheckbox(elm, flg);
       } else if (
           elm.type == 'radio'
           ||
           elm.type == 'select-one'
           ) {
           setReadOnlySelect(elm, flg);
       } else if (
           elm.type == 'button'
           ) {
           setReadOnlyButtonSan(elm, flg);
       }
    }

    delements = document.getElementsByTagName('textarea');
    for(i=0; i< delements.length; i++) {
       var elm = delements[i];
       setReadOnlyText(elm, flg);
    }

    delements = document.getElementsByTagName('select');
    for(i=0; i< delements.length; i++) {
       var elm = delements[i];
       setReadOnlySelect(elm, flg);
    }
}

function setReadOnlyText(elm, flg) {
    if (flg) {
        elm.readOnly=true;
    } else {
        elm.readOnly=false;
    }
}

function setReadOnlyCheckbox(elm, flg) {
    if (flg) {
        elm.disabled=true;
    } else {
        elm.disabled=false;
    }
}

function setReadOnlySelect(elm, flg) {
    if (flg) {
        elm.disabled=true;
    } else {
        elm.disabled=false;
    }
}

function setReadOnlyButtonSan(elm, flg) {
    if (flg) {
        elm.disabled=true;
    } else {
        elm.disabled=false;
    }
}
