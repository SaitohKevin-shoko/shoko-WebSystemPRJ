function lmtEnableDisable(selnum) {
	var ctext1 = document.getElementById("lmtinput1");
    var ctext2 = document.getElementById("lmtinput2");
    var ctext3 = document.getElementById("lmtinput3");
    var ctext4 = document.getElementById("lmtinput4");
    if (selnum == 0) {
    	ctext1.setAttribute('class', 'display_if');
    	ctext2.setAttribute('class', 'display_n');
    	ctext3.setAttribute('class', 'display_n');
    	ctext4.setAttribute('class', 'display_n');
    } else if (selnum == 1) {
    	ctext1.setAttribute('class', 'display_n');
    	ctext2.setAttribute('class', 'display_if');
    	ctext3.setAttribute('class', 'display_n');
    	ctext4.setAttribute('class', 'display_n');
    } else if (selnum == 2) {
    	ctext1.setAttribute('class', 'display_n');
    	ctext2.setAttribute('class', 'display_n');
    	ctext3.setAttribute('class', 'display_if');
    	ctext4.setAttribute('class', 'display_n');
    } else if (selnum == 3) {
    	ctext1.setAttribute('class', 'display_n');
    	ctext2.setAttribute('class', 'display_n');
    	ctext3.setAttribute('class', 'display_n');
    	ctext4.setAttribute('class', 'display_if');
    }
}