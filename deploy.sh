#!/bin/sh

HOST="walltec.net.br"
USER="wallace"
PASSWD="Forro008"
FILEAPI="sysfinanc-api.war"
FILEWEB="sysfinanc-web.war"
DIR="/appservers/wildfly-9.0.1.Final/standalone/deployments"

rm ${FILEAPI}
rm ${FILEWEB}

cp ./sysfinanc-api/target/${FILEAPI} ./${FILEAPI}
cp ./sysfinanc-web/target/${FILEWEB} ./${FILEWEB}

--verificar se está dandoproblemas de timeout
ftp -n ${HOST} <<EOF
quote user ${USER}
quote PASS ${PASSWD}
cd ${DIR}
del sysfinanc-api.war.deployed
ren sysfinanc-api.war sysfinanc-api.war.bkp
del sysfinanc-web.war.deployed
ren sysfinanc-web.war sysfinanc-web.war.bkp
put ${FILEAPI}
put ${FILEWEB}
EOF


#ftp -n ${HOST} <<EOF
#quote user ${USER}
#quote PASS ${PASSWD}
#cd ${DIR}
#del sysfinanc-web.war.deployed
#ren sysfinanc-web.war sysfinanc-web.war.bkp
#put ${FILEWEB}
#quit
#EOF

rm ${FILEAPI}
rm ${FILEWEB}

