#!/bin/sh

LOGDIR=../log
GSROOT=../../

if [ -z "$JAVA_HOME" ]
then
    echo "Please set the JAVA_HOME"
    exit 0
fi

#dirCheck
if [ -f "reset_adminpass.sh" ]
then
    echo "Directory OK"
else
    echo "Please change directory with the reset_otpconf.sh"
    exit 0
fi

export CLASSPATH="$CLASSPATH":./conf
export CLASSPATH="$CLASSPATH":../classes
export CLASSPATH="$CLASSPATH":../dsedit/lib/servlet-api.jar
export CLASSPATH="$CLASSPATH":../lib/commons-logging-1.3.0.jar
export CLASSPATH="$CLASSPATH":../lib/commons-digester-1.8.jar
export CLASSPATH="$CLASSPATH":../lib/commons-codec-1.16.0.jar
export CLASSPATH="$CLASSPATH":../lib/commons-collections-3.2.1.jar
export CLASSPATH="$CLASSPATH":../lib/commons-beanutils-1.8.3.jar
export CLASSPATH="$CLASSPATH":../lib/oro-2.0.8.jar
export CLASSPATH="$CLASSPATH":../lib/h2_1.3.jar
export CLASSPATH="$CLASSPATH":../lib/velocity-engine-core-2.3.jar
export CLASSPATH="$CLASSPATH":../lib/javax.mail.jar
export CLASSPATH="$CLASSPATH":../lib/log4j-api-2.22.0.jar
export CLASSPATH="$CLASSPATH":../lib/log4j-core-2.22.0.jar
export CLASSPATH="$CLASSPATH":../lib/log4j-jcl-2.22.0.jar
export CLASSPATH="$CLASSPATH":../lib/log4j-slf4j-impl-2.22.0.jar
export CLASSPATH="$CLASSPATH":../lib/log4j-web-2.22.0.jar

echo "CLASSPATH=" $CLASSPATH
set __LOGDIR=$LOGDIR
if [ -d $LOGDIR ]
then
    echo "LOG Directory is Exist"
  else
    mkdir $LOGDIR
fi

$JAVA_HOME/bin/java -Xmx256M -classpath $CLASSPATH jp.groupsession.v3.tools.ResetOtpConf $GSROOT
exit 0
