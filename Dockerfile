from tomcat

MAINTAINER m2mbob fuxiao@qunhemail.com

CMD rm -rf /usr/local/tomcat/webapps/ROOT && catalina.sh run

COPY ./target/js-perfs.war /usr/local/tomcat/webapps/ROOT.war