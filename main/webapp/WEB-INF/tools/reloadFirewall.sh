#!/bin/bash

PROTOCOL=http
HOST=127.0.0.1
GS_URI=gsession

REQUEST_URL=$PROTOCOL://$HOST/$GS_URI/common/cmn980.do?

echo 'request URL='$REQUEST_URL

HTTP_RES=`curl -L $REQUEST_URL -w '\n%{http_code}' -s`
HTTP_RES_BODY=`echo "HTTP_RES" | sed '$d'`
HTTP_RES_STATUS=`echo "$HTTP_RES" | tail -n 1`

if [ $HTTP_RES_STATUS == 200 ] ; then
  echo 'ファイアウォール設定の再読み込みを完了しました。'
else
  echo 'エラー: 指定されたrequest URLへのアクセスに失敗しました。'
fi
