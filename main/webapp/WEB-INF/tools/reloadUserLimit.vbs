Option Explicit

Dim request
Dim URL
Dim httpStatus

URL = Wscript.Arguments(0)

Set request = WScript.CreateObject("MSXML2.XMLHTTP.3.0")
Call request.Open("GET", URL, False)
Call request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

On Error Resume Next

Call request.Send
httpStatus = request.Status

If Err.Number <> 0 Then
  WScript.Echo "エラー: 指定されたrequest URLへのアクセスに失敗しました。"
ElseIf httpStatus <> 200 Then
  WScript.Echo "エラー: 指定されたrequest URLへのアクセスに失敗しました。"
Else
  WScript.Echo "ユーザ数上限の再設定を完了しました。"
End If

Set request = Nothing