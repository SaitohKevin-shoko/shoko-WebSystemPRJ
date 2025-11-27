function fileDownload(mailNum, fileId) {
    var url = "../webmail/wml080.do";
    url += "?CMD=downloadFile";
    url += "&wml080mailNum=" + mailNum;
    url += "&wml080downloadFileId=" + fileId;
    window.open(url);
}
