function fileLinkClick(imssid, binSid){
    url = "../main/man310.do?CMD=fileDownload&imssid=" + imssid + "&man310binSid=" + binSid;
    navframe.location=url;
}