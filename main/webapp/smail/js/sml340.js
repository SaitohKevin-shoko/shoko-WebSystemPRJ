function changePage(id){
    if (id == 1) {
        $('#sml340mailListPageTop')[0].value = $('#sml340mailListPageBottom')[0].value;
    } else {
        $('#sml340mailListPageBottom')[0].value = $('#sml340mailListPageTop')[0].value;
    }

    $('#CMD')[0].value = 'init';
    document.forms[0].submit();
    return false;
}

function changeFilterInput() {
    var index;
    for (index = 1; index <= 5; index++) {
        if (getElement('sml340condition' + index).checked) {
            getElement('sml340conditionType' + index).disabled = false;
            getElement('sml340conditionExs' + index).disabled = false;
            getElement('sml340conditionText' + index).disabled = false;
        } else {
            getElement('sml340conditionType' + index).disabled = true;
            getElement('sml340conditionExs' + index).disabled = true;
            getElement('sml340conditionText' + index).disabled = true;
        }
    }
}
function getElement(name) {
    return document.getElementsByName(name)[0];
}

function sml340Sort(sortKey, order) {
    document.getElementsByName('sml340mailListSortKey')[0].value = sortKey;
    document.getElementsByName('sml340mailListOrder')[0].value = order;
    document.forms[0].submit();
    return false;
}

function addFwAddress() {
    var fwAddressTbl = document.getElementById('sml340fwAddressArea');
    fwAddressTbl.innerHTML
        += '<tr>'
        + '<td><img src=\"../common/images/delete.gif\" alt=\"' + msglist['delet'] + '" border=\"0\" onClick="\deleteFwAddress(' + fwAddressTbl.rows.length + ');\"></td>'
        +'<td><input type=\"text\" name=\"sml340actionSendValue\" value=\"\"  maxlength=\"256\" class=\"w60\"></td></tr>';
}

function deleteFwAddress(rowIdx) {
    document.forms['sml340Form'].sml340actionSendValueDelIdx.value=rowIdx;
    return buttonPush('delFwAddress');
}


function htmlEscape(s){
    s=s.replace(/&/g,'&amp;');
    s=s.replace(/>/g,'&gt;');
    s=s.replace(/</g,'&lt;');
    return s;
}