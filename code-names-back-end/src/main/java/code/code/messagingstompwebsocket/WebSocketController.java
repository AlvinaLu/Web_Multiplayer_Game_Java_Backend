package code.code.messagingstompwebsocket;


import code.code.model.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    @Autowired
    private GamesMap gamesMap;

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/game")
    public Game sendGame(Message message) throws Exception {
        System.out.println(message);
        Game game = gamesMap.getGameMap().computeIfAbsent(message.getGameId(), Game::new);
        game.activity();
        messagingTemplate.convertAndSend(message.getFrom(), game);
        return game;
    }

}
