#!/bin/sh

LOGDIR=../log


if [ -z "$JAVA_HOME" ]
then
    echo "JAVA_HOME���w�肵�Ă�������"
    exit 0
fi

#dirCheck
if [ -f "unZip.sh" ]
then
    echo "Directory OK"
else
    echo "�t�@�C���̂���ꏊ�ֈړ������s���Ă�������"
    exit 0
fi

export CLASSPATH="$CLASSPATH":./conf
export CLASSPATH="$CLASSPATH":../classes
export CLASSPATH="$CLASSPATH":../lib/commons-logging-1.3.0.jar
export CLASSPATH="$CLASSPATH":../lib/commons-compress-1.25.0.jar
export CLASSPATH="$CLASSPATH":../lib/commons-io-2.4.jar


echo "CLASSPATH=" $CLASSPATH
set __LOGDIR=$LOGDIR
if [ -d $LOGDIR ]
then
    echo "LOG�f�B���N�g�������݂��܂�"
  else
    mkdir $LOGDIR
fi

$JAVA_HOME/bin/java -Xmx256M -classpath $CLASSPATH jp.groupsession.v3.tools.UnZip
exit 0
