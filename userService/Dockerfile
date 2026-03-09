# Use the lightweight Java 25 JRE
FROM eclipse-temurin:25-jre-alpine

WORKDIR /app

# Copy the userService JAR into the container
COPY target/userService-0.0.1-SNAPSHOT.jar app.jar

# Document that this container uses port 8081
EXPOSE 8081

# Run with strict memory limits for the 1GB EC2 instance
ENTRYPOINT ["java", "-Xms64m", "-Xmx160m", "-jar", "app.jar"]