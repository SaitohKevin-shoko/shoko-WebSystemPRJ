@echo off

if exist "%JAVA_HOME%" goto okJava
goto ngJava

:ngJava
echo JAVA_HOME���w�肵�Ă�������
goto end

:okJava
goto dirCheck

:dirCheck
if exist "%cd%\unZip.bat" goto okDir
echo unZip.bat�t�@�C���̂���ꏊ�ֈړ������s���Ă�������
goto end

:okDir

set CLASSPATH=..\classes
set CLASSPATH=%CLASSPATH%;.\conf
set CLASSPATH=%CLASSPATH%;..\classes
set CLASSPATH=%CLASSPATH%;..\lib\commons-logging-1.3.0.jar
set CLASSPATH=%CLASSPATH%;..\lib\commons-compress-1.25.0.jar
set CLASSPATH=%CLASSPATH%;..\lib\commons-io-2.4.jar

rem echo CLASSPATH %CLASSPATH%
set __LOGDIR=.\..\log
if exist "%__LOGDIR%" goto javaExe
mkdir %__LOGDIR%
goto javaExe

:javaExe

set EXE_JAVACMD="%JAVA_HOME%\bin\java"

%EXE_JAVACMD% -classpath %CLASSPATH% jp.groupsession.v3.tools.UnZip
:end