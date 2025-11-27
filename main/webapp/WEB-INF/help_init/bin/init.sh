#!/bin/bash
#
# Create Help Index
#
EXECUTABLE=init.sh
LOGDIR=../log
if [ -z "$JAVA_HOME" ]
then
    echo "Please set the JAVA_HOME"
    exit 0
fi

#dirCheck
if [ -f "init.sh" ]
then
    echo "Directory OK"
else
    echo "Please change directory with the init.sh"
    exit 0
fi

echo "CLASSPATH=" $CLASSPATH
CLASSPATH="$CLASSPATH"

export CLASSPATH="$CLASSPATH":../conf
export CLASSPATH="$CLASSPATH":../classes
export CLASSPATH="$CLASSPATH":../../classes
export CLASSPATH="$CLASSPATH":../../convert/lib/jsp-api.jar
export CLASSPATH="$CLASSPATH":../../convert/lib/servlet-api.jar
export CLASSPATH="$CLASSPATH":../../lib/activation.jar
export CLASSPATH="$CLASSPATH":../../lib/commons-beanutils-1.8.3.jar
export CLASSPATH="$CLASSPATH":../../lib/commons-codec-1.16.0.jar
export CLASSPATH="$CLASSPATH":../../lib/commons-collections-3.2.1.jar
export CLASSPATH="$CLASSPATH":../../lib/commons-dbcp-1.2.1.jar
export CLASSPATH="$CLASSPATH":../../lib/commons-digester-1.8.jar
export CLASSPATH="$CLASSPATH":../../lib/commons-io-2.4.jar
export CLASSPATH="$CLASSPATH":../../lib/commons-logging-1.3.0.jar
export CLASSPATH="$CLASSPATH":../../lib/commons-validator-1.4.0.jar
export CLASSPATH="$CLASSPATH":../../lib/struts.jar
export CLASSPATH="$CLASSPATH":../../lib/velocity-engine-core-2.3.jar
export CLASSPATH="$CLASSPATH":../../lib/junit.jar
export CLASSPATH="$CLASSPATH":../../lib/mail_1.4.3.jar
export CLASSPATH="$CLASSPATH":../../lib/mailapi_1.4.3.jar
export CLASSPATH="$CLASSPATH":../../lib/oro-2.0.8.jar
export CLASSPATH="$CLASSPATH":../../lib/log4j-api-2.22.0.jar
export CLASSPATH="$CLASSPATH":../../lib/log4j-core-2.22.0.jar
export CLASSPATH="$CLASSPATH":../../lib/log4j-jcl-2.22.0.jar
export CLASSPATH="$CLASSPATH":../../lib/log4j-slf4j-impl-2.22.0.jar
export CLASSPATH="$CLASSPATH":../../lib/log4j-web-2.22.0.jar
export CLASSPATH="$CLASSPATH":../../lib/commons-fileupload-1.4.jar
export CLASSPATH="$CLASSPATH":../../lib/quartz-2.1.7.jar
export CLASSPATH="$CLASSPATH":../../lib/commons-httpclient-3.1.jar
export CLASSPATH="$CLASSPATH":../../lib/sen.jar
export CLASSPATH="$CLASSPATH":../../lib/poi-3.7-20101029.jar
export CLASSPATH="$CLASSPATH":../../lib/lucene-core-3.1.0.jar
export CLASSPATH="$CLASSPATH":../../lib/lucene-analyzers-3.1.0.jar
export CLASSPATH="$CLASSPATH":../../lib/h2_1.3.jar

export CLASSPATH
echo "CLASSPATH=" $CLASSPATH
echo "LOGDIR=" $LOGDIR
set __LOGDIR=$LOGDIR
if [ -d $LOGDIR ]
then
  echo "LOG Directory is Exist"
else
  mkdir $LOGDIR
fi

$JAVA_HOME/bin/java -classpath $CLASSPATH jp.groupsession.v2.help_init.Init $PWD/../../../
