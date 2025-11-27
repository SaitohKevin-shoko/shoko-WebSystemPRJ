@echo off

if exist "%JAVA_HOME%" goto okJava
goto ngJava

:ngJava
echo JAVA_HOME���w�肵�Ă�������
goto end

:okJava
goto dirCheck

:dirCheck
if exist "%cd%\user_pass.bat" goto okDir
echo user_pass.bat�t�@�C���̂���ꏊ�ֈړ������s���Ă��������B
goto end

:okDir
set CLASSPATH=..\classes
set CLASSPATH=%CLASSPATH%;..\conf
set CLASSPATH=%CLASSPATH%;..\..\classes
set CLASSPATH=%CLASSPATH%;..\lib\servlet-api.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-logging-1.3.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-digester-1.8.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-collections-3.2.1.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\commons-beanutils-1.8.3.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\oro-2.0.8.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\h2_1.3.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\velocity-engine-core-2.3.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\log4j-api-2.22.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\log4j-core-2.22.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\log4j-jcl-2.22.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\log4j-slf4j-impl-2.22.0.jar
set CLASSPATH=%CLASSPATH%;..\..\lib\log4j-web-2.22.0.jar

rem echo CLASSPATH %CLASSPATH%
set __LOGDIR=.\..\log
if exist "%__LOGDIR%" goto javaExe
mkdir %__LOGDIR%
goto javaExe

:javaExe
set GSROOT=.\..\..\..\
set EXE_JAVACMD="%JAVA_HOME%\bin\java"

%EXE_JAVACMD% -classpath %CLASSPATH% jp.co.sjts.gsession.dsedit.DataSourceEdit %GSROOT%
:end