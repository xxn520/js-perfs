## Js-perfs

A system that record and analyse memory and rate of js frameworks.

### Enable Memory API 

#### MacOS
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --enable-precise-memory-info --enable-memory-info

### run system

1. go to `src/main/webapp/static`
2. `npm install` or `yarn`
3. in dev `yarn run dev`, in prod `yarn run prod`
4. modify mysql config、server port and spring profile in application.yml
5. run mysql with docker 
    ```
    docker pull mysql
    docker run --name m2mysql -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=jsperfs -p 3333:3306 -d mysql
    ```
6. run tomcat with docker
    ```
    docker pull tomcat
    docker build -t js-perfs .
    docker run --name js-perfs -d -p 8080:8080 -it js-perfs
    ```