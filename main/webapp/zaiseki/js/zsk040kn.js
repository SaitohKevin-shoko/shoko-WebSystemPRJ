function fileLinkClick(fileId){
    url = "../zaiseki/zsk040kn.do?CMD=fileDownload&zsk040knTmpFileId=" + fileId;
    navframe.location=url;
}
