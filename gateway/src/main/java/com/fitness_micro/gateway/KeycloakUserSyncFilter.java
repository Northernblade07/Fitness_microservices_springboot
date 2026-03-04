package com.fitness_micro.gateway;

import com.fitness_micro.gateway.userConfig.RegisterRequest;
import com.fitness_micro.gateway.userConfig.UserService;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
@Slf4j
@RequiredArgsConstructor
public class KeycloakUserSyncFilter implements WebFilter {

    private final UserService userService;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain){
        String token = exchange.getRequest().getHeaders().getFirst("Authorization");
        String userId = exchange.getRequest().getHeaders().getFirst("X-USER-ID");
        if (token == null || !token.startsWith("Bearer ")) {
            return chain.filter(exchange);
        }
        RegisterRequest registerRequest = getUserDetails(token);

        if (userId==null){
            userId = registerRequest.getKeycloakId();
        }

        if(userId !=null && token !=null){
            String finalUserId = userId;
            return userService.validateUser(userId)
                    .onErrorReturn(false) // If validateUser throws "User Not Found", treat it as false
                    .flatMap(exists->{
                        if (!exists){
//                            register the user
                            if(registerRequest!=null){

                                log.info("User not found in DB. Initiating registration for: {}", registerRequest.getEmail());
                                return userService.registerUser(registerRequest)
                                        .then();
                            } else {
                                return Mono.empty();
                            }
                        } else{
                            log.info("User already exists , skipping sync");
                        }
                        return Mono.empty();
                    }).then(Mono.defer(()->{
                        ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                                .header("X-USER-ID", finalUserId)
                                .build();
                         return chain.filter(exchange.mutate().request(mutatedRequest).build());
                    }));
        }
        return chain.filter(exchange);
    }

    private RegisterRequest getUserDetails(String token) {

        try{
            String tokenWithoutBearer = token.replace("Bearer ","").trim();
            SignedJWT signedJWT = SignedJWT.parse(tokenWithoutBearer);
            JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();

            RegisterRequest registerRequest = new RegisterRequest();
            registerRequest.setEmail(claimsSet.getStringClaim("email"));
            registerRequest.setKeycloakId(claimsSet.getStringClaim("sub"));
            registerRequest.setPassword("dummy@123");
            registerRequest.setFirstName(claimsSet.getStringClaim("given_name"));
            registerRequest.setLastName(claimsSet.getStringClaim("family_name"));

            log.info("KEYCLOAK ID: {}", claimsSet.getStringClaim("sub"));
            return registerRequest;
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
