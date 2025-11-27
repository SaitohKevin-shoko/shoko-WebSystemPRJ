@echo off

set PROTOCOL=http
set HOST=127.0.0.1
set GS_URI=gsession

set REQUEST_URL=%PROTOCOL%://%HOST%/%GS_URI%/user/usr900.do

echo request URL=%REQUEST_URL%

cscript "%~dp0\reloadUserLimit.vbs" "%REQUEST_URL%"