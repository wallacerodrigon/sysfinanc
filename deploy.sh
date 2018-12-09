#!/bin/sh

HOST="10.199.199.2"
USER="user01"
PASSWD="pass01"
FILE="filebkp.rar"
DIR="/backup"

cd ${DIR}

ftp -n ${HOST} <<EOF
quote user ${USER}
quote PASS ${PASSWD}
put ${FILE}
quit
EOF
