package code.code;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat");
        registry.addEndpoint("/chat").withSockJS();
        registry.addEndpoint("/game");
        registry.addEndpoint("/game").withSockJS();
        registry.addEndpoint("/gamer");
        registry.addEndpoint("/gamer").withSockJS();
        registry.addEndpoint("/remove");
        registry.addEndpoint("/remove").withSockJS();
        registry.addEndpoint("/team");
        registry.addEndpoint("/team").withSockJS();
    }

}
