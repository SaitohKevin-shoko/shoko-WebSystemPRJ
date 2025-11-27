@echo off

set PROTOCOL=http
set HOST=127.0.0.1
set GS_URI=gsession

set REQUEST_URL=%PROTOCOL%://%HOST%/%GS_URI%/common/cmn390.do?CMD=reset

echo request URL=%REQUEST_URL%

cscript "%~dp0\resetFirewall.vbs" "%REQUEST_URL%"