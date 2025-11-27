@echo off

if exist "%JAVA_HOME%" goto okJava
goto ngJava

:ngJava
echo JAVA_HOMEを指定してください
goto end

:okJava
goto dirCheck

:dirCheck
if exist "%cd%\convert.bat" goto okDir
echo convert.batファイルのある場所へ移動し実行してください。
goto end

:okDir
set CLASSPATH=..\..\classes
set CLASSPATH=%CLASSPATH%;..\conf
set CLASSPATH=%CLASSPATH%;..\lib\servlet-api.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-logging-1.3.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-digester-1.8.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-collections-3.2.1.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-beanutils-1.8.3.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-dbcp2-2.11.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-pool2-2.12.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-codec-1.16.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-lang-2.3.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\ezmorph-1.0.6.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\xml-apis.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\oro-2.0.8.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\h2_1.3.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\lucene-analyzers-3.1.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\lucene-core-3.1.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\velocity-engine-core-2.3.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\log4j-api-2.22.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\log4j-core-2.22.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\log4j-jcl-2.22.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\log4j-slf4j-impl-2.22.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\log4j-web-2.22.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\quartz-2.3.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\struts-core-1.3.10.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\postgresql.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\javax.mail.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\nekohtml.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\xercesImpl.jar
set CLASSPATH=%CLASSPATH%;..\log4j\

rem echo CLASSPATH %CLASSPATH%
set __LOGDIR=.\..\log
if exist "%__LOGDIR%" goto javaExe
mkdir %__LOGDIR%
goto javaExe

:javaExe
set GSROOT=.\..\..\..\
set EXE_JAVACMD="%JAVA_HOME%\bin\java"

%EXE_JAVACMD% -Xmx768M -classpath %CLASSPATH% jp.groupsession.v2.convert.ConvertGsListenerImpl %GSROOT%
:end