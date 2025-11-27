@echo off

if exist "%JAVA_HOME%" goto okJava
goto ngJava

:ngJava
echo JAVA_HOME���w�肵�Ă�������
goto end

:okJava
goto dirCheck

:dirCheck
if exist "%cd%\init.bat" goto okDir
echo init.bat�t�@�C���̂���ꏊ�ֈړ������s���Ă��������B
goto end

:okDir
set CLASSPATH=%CLASSPATH%;..\conf
set CLASSPATH=%CLASSPATH%;..\classes
set CLASSPATH=%CLASSPATH%;..\..\classes
set CLASSPATH=%CLASSPATH%;..\..\convert\lib\jsp-api.jar
set CLASSPATH=%CLASSPATH%;..\..\convert\lib\servlet-api.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\activation.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-beanutils-1.8.3.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-codec-1.16.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-collections-3.2.1.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-dbcp-1.2.1.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-digester-1.8.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-io-2.4.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-logging-1.3.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-validator-1.4.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\struts.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\velocity-engine-core-2.3.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\junit.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\mail_1.4.3.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\mailapi_1.4.3.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\oro-2.0.8.jar
set CLASSPATH=%CLASSPATH%;..\lib\log4j-api-2.22.0.jar
set CLASSPATH=%CLASSPATH%;..\lib\log4j-core-2.22.0.jar
set CLASSPATH=%CLASSPATH%;..\lib\log4j-jcl-2.22.0.jar
set CLASSPATH=%CLASSPATH%;..\lib\log4j-slf4j-impl-2.22.0.jar
set CLASSPATH=%CLASSPATH%;..\lib\log4j-web-2.22.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-fileupload-1.4.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\quartz-2.1.7.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-httpclient-3.1.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\sen.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\poi-3.7-20101029.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\lucene-core-3.1.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\lucene-analyzers-3.1.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\h2_1.3.jar

rem echo CLASSPATH %CLASSPATH%
set __LOGDIR=%cd%\..\log
if exist "%__LOGDIR%" goto javaExe
mkdir %__LOGDIR%
goto javaExe

:javaExe
cmd /k "%JAVA_HOME%\bin\java" -classpath %CLASSPATH% jp.groupsession.v2.help_init.Init .\..\..\..\
:end