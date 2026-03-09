# Lightweight Java runtime image
FROM eclipse-temurin:25-jre-alpine

# Working directory inside container
WORKDIR /app

# Copy the Spring Boot jar
COPY target/eureka-0.0.1-SNAPSHOT.jar app.jar

# Eureka port
EXPOSE 8761

# Run the application with safe heap limits
ENTRYPOINT ["java","-Xms64m","-Xmx128m","-jar","app.jar"]