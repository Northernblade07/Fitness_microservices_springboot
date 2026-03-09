# Use the lightweight Java 25 JRE
FROM eclipse-temurin:25-jre-alpine

WORKDIR /app

# Copy the configServer JAR into the container
COPY target/configServer-0.0.1-SNAPSHOT.jar app.jar

# Document that this container uses port 8888
EXPOSE 8888

# Run with strict memory limits for the 1GB EC2 instance
ENTRYPOINT ["java", "-Xms64m", "-Xmx128m", "-jar", "app.jar"]