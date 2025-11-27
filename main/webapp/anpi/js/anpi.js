var dbaHandleEvent = {
    start:function(event,httpObj) {
      document.getElementById("resultData").innerHTML = '<div class="ajax-loader"><img src="images/ajax-loader.gif"></div>';
    },
    success:function(event,httpObj) {
      document.getElementById("resultData").innerHTML = httpObj[0].responseText;
    }
}

var dbaCallback = {
    customevents: {
        onStart: dbaHandleEvent.start,
        onSuccess: dbaHandleEvent.success
    }
}

function downloadDaomodel(tname){
    document.getElementsByName('dba001Form')[0].CMD.value='001_gen';
    document.getElementsByName('dba001Form')[0].dba001GenTableName.value=tname;
    document.getElementsByName('dba001Form')[0].submit();
}


function doSql() {
  var param = document.getElementById("dba001SqlStringTextArea").value;
  document.getElementById("dba001SqlString").value = param;

  var formObject = document.getElementsByName('dba001Form')[0];
  document.getElementsByName('dba001Form')[0].CMD.value = '001_ok';
  document.getElementsByName('dba001Form')[0].dba001SqlString.value = param;
  YAHOO.util.Connect.setForm(formObject);

  document.getElementsByName('dba001Form')[0].dba001GenTableName.value='';
  var conObj = YAHOO.util.Connect.asyncRequest("post", "./dba002.do"
                                                , dbaCallback
                                              );
}

function selectData(tname) {
  var sqlstr = document.getElementById(tname + "_select").value;
  var array = sqlstr.split("where");
  document.getElementById("dba001SqlStringTextArea").value=array[0];

  var param = document.getElementById("dba001SqlStringTextArea").value;
  document.getElementById("dba001SqlString").value = param;

  displayTable('001_ok',param);
}

function selectSeq(tname) {
  var sqlstr = "select * from INFORMATION_SCHEMA.SEQUENCES where SEQUENCE_NAME = " + "'" + tname + "'";
  
  if (tname == null) {
  var array = sqlstr.split(" where ");
  document.getElementById("dba001SqlStringTextArea").value=array[0];  
  } else {
  document.getElementById("dba001SqlStringTextArea").value=sqlstr;
  }

  var param = document.getElementById("dba001SqlStringTextArea").value;
  document.getElementById("dba001SqlString").value = param;

  displayTable('001_ok',param);
}

function selectSetting() {
  var sqlstr = "select * from INFORMATION_SCHEMA.SETTINGS";
  
  document.getElementById("dba001SqlStringTextArea").value=sqlstr;

  var param = document.getElementById("dba001SqlStringTextArea").value;
  document.getElementById("dba001SqlString").value = param;

  displayTable('001_ok',param);
}

function selectIndex(tname) {
  var sqlstr = "select * from INFORMATION_SCHEMA.INDEXES where INDEX_NAME = " + "'" + tname + "'";
  
  if (tname == null) {
  var array = sqlstr.split(" where ");
  document.getElementById("dba001SqlStringTextArea").value=array[0];  
  } else {
  document.getElementById("dba001SqlStringTextArea").value=sqlstr;
  }


  var param = document.getElementById("dba001SqlStringTextArea").value;
  document.getElementById("dba001SqlString").value = param;

  displayTable('001_ok',param);
}

function displayTable(CMD, SQL){

  document.getElementsByName('dba001Form')[0].dba001GenTableName.value='';

  var conObj = YAHOO.util.Connect.asyncRequest("post", "./dba002.do"
                                                , dbaCallback
                                                ,  "CMD=" + CMD + "&dba001SqlString=" + SQL
                                              );

}