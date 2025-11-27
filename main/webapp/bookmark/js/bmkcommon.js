function setPageParam(pageParamName, pageCmbName){
    var page = document.getElementsByName(pageCmbName)[0].value;
    document.getElementsByName(pageParamName)[0].value = page;
}
