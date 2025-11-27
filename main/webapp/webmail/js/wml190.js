function changeSendServerAuth(auth) {
	if (document.getElementById('wml190sendServerUser') != null) {
		$('#wml190sendServerUser')[0].disabled = (auth != 1);
		$('#wml190sendServerPassword')[0].disabled = (auth != 1);
	}
}