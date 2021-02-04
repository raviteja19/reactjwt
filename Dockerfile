FROM openjdk:8-jdk-alpine
ADD target/ReactJwt-0.0.1-SNAPSHOT.jar ReactJwt-0.0.1-SNAPSHOT.jar
EXPOSE 8089
ENTRYPOINT ["java","-jar","ReactJwt-0.0.1-SNAPSHOT.jar"]