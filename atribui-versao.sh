mvn versions:set -DnewVersion=$1
mvn clean package -U
