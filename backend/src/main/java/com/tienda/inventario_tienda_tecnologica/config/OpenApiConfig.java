package com.tienda.inventario_tienda_tecnologica.config;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.OpenAPI;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration //indica que esta clase contiene configuración de spring
public class OpenApiConfig {

    @Bean //registra un componente en el contexto de spring
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Tienda de Tecnología Api") //título de la documentación
                        .version("1.0") //versión de la api
                        .description("Api para gestionar productos tecnológicos") //descripción general
                        .contact(new Contact()
                                .name("Tienda-Tecno") //nombre del autor
                                .email("name@gmail.com"))); //correo de contacto
    }

    @Bean
    public UserDetailsService users() {
        UserDetails user = User.builder()
            .username("admin")
            .password("{noop}admin123")
            .roles("USER")
            .build();
        return new InMemoryUserDetailsManager(user);
    }

    @Configuration
    @EnableWebSecurity
    public class SecurityConfig {

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/swagger-ui/**", "/v1/api-tienda/**").permitAll()
                    .requestMatchers("/api/**").permitAll() // permite acceso a los endpoints de la api sin autenticación
                    .anyRequest().permitAll() // permite acceso a cualquier otra ruta sin autenticación
                );
            return http.build();
        }
    }


}
