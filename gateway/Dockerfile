# Use the lightweight Java 25 JRE
FROM eclipse-temurin:25-jre-alpine

WORKDIR /app

# Copy the gateway JAR into the container
COPY target/gateway-0.0.1-SNAPSHOT.jar app.jar

# Document that this container uses port 8080
EXPOSE 8080

# Run with strict memory limits for the 1GB EC2 instance
ENTRYPOINT ["java", "-Xms64m", "-Xmx160m", "-jar", "app.jar"]