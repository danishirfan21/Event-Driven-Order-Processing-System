# Stage 1: Build the application using Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Compile and package the application
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime image using a lightweight JRE
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/order-service-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 for web access
EXPOSE 8080

# Execute the application
ENTRYPOINT ["java", "-jar", "app.jar"]
