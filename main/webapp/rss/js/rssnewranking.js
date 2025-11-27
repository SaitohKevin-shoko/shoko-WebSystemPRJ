function rssAdd(rssSid, rssTitle) {
    document.forms['rssNewRankingForm'].CMD.value='rssAdd';
    document.forms['rssNewRankingForm'].rssSid.value=rssSid;
    document.forms['rssNewRankingForm'].rssTitle.value=rssTitle;
    document.forms['rssNewRankingForm'].submit();
    return false;
}
