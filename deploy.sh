#!/bin/sh

HOST="walltec.net.br"
USER="wallace"
PASSWD="Forro008"
FILEAPI="./sysfinanc-api.war"
FILEWEB="./sysfinanc-web.war"
DIR="/appservers/wildfly-9.0.1.Final/standalone/deployments"

cd ./sysfinanc-api/target

ftp -n ${HOST} <<EOF
quote user ${USER}
quote PASS ${PASSWD}
cd ${DIR}
del sysfinanc-api.war.deployed
ren sysfinanc-api.war sysfinanc-api.war.bkp
put ${FILEAPI}
EOF

cd ../../sysfinanc-web/target

ftp -n ${HOST} <<EOF
quote user ${USER}
quote PASS ${PASSWD}
cd ${DIR}
del sysfinanc-api.war.deployed
ren sysfinanc-web.war sysfinanc-web.war.bkp
put ${FILEWEB}
quit
EOF

