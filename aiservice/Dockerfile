FROM eclipse-temurin:25-jre-alpine

WORKDIR /app

COPY target/aiservice-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8083

ENTRYPOINT ["java","-Xms64m","-Xmx160m","-jar","app.jar"]