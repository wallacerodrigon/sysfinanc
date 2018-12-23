#!/bin/sh

HOST="walltec.net.br"
USER="wallace"
PASSWD="Forro008"
FILEAPI="./sysfinanc-api/target/sysfinanc-api.war"
FILEWEB="./sysfinanc-web/target/sysfinanc-web.war"
DIR="/appservers/wildfly-9.0.1.Final/standalone/deployments"

ftp -n ${HOST} <<EOF
quote user ${USER}
quote PASS ${PASSWD}
cd ${DIR}
put ${FILEAPI}
put ${FILEWEB}
quit
EOF
