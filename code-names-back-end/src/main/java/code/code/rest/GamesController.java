package code.code.rest;

import code.code.messagingstompwebsocket.*;
import code.code.model.Card;
import code.code.model.Game;
import code.code.model.Gamer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
public class GamesController {
    @Autowired
    private GamesMap gamesMap;
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    private static final Logger LOG = LoggerFactory.getLogger(GamesController.class);

    @GetMapping("/createGame")
    public NewGame createGame() {
        String response = UUID.randomUUID().toString();
        LOG.info(response);
        return new NewGame(response);
    }

    @GetMapping("/createGamer")
    public Gamer createGamer(@RequestParam String gameId, @RequestParam String gamerName, @RequestParam String teamId) {
        String gamerId = UUID.randomUUID().toString();
        Gamer gamer = new Gamer(gamerId, gamerName, teamId);
        Game game = gamesMap.getGameMap().get(gameId);
        game.activity();
        flippedFalse(game);
        if (teamId.equals("1")) {
            if (game.getTeam1().size() == 0) {
                gamer.setCapitan(true);
            }
            game.getTeam1().add(gamer);
        } else {
            if (game.getTeam2().size() == 0) {
                gamer.setCapitan(true);
            }
            game.getTeam2().add(gamer);
        }
        messagingTemplate.convertAndSend("/topic/game" + game.getGameId(), game);
        LOG.info(gamer.toString());
        return gamer;
    }


    @GetMapping("/removeGamer")
    public Message removeGamer(@RequestParam String gameId, @RequestParam String gamerId, @RequestParam String teamId) {
        Gamer gamer = new Gamer(null, null, null);
        Game game = gamesMap.getGameMap().get(gameId);
        game.activity();
        flippedFalse(game);
        if (teamId.equals("1")) {
            List<Gamer> team1 = game.getTeam1();
            team1.removeIf(next -> next.getId().equals(gamerId));
            if (!team1.isEmpty()) {
                team1.get(0).setCapitan(true);
            }
        } else {
            List<Gamer> team2 = game.getTeam2();
            team2.removeIf(next -> next.getId().equals(gamerId));
            if (!team2.isEmpty()) {
                team2.get(0).setCapitan(true);
            }
        }
        gamesMap.getGameMap().put(gameId, game);
        messagingTemplate.convertAndSend("/topic/game" + game.getGameId(), game);
        return new Message("remove Gamer", "success");
    }
    private void flippedFalse(Game game){
        Card[][] pole = game.getPole();
        for (int i = 0; i < pole.length; i++) {
            for (int j = 0; j < pole[i].length; j++) {
                pole[i][j].setJustOpen(false);
            }
        }
    }

    @GetMapping("/flipCard")
    public Message flipCard(@RequestParam String gameId, @RequestParam String gamerId, @RequestParam String teamId, @RequestParam Integer cardId) {
        LOG.info("Request from FlipCard" + gameId.toString() + gamerId.toString() + teamId.toString() + cardId.toString());
        Game game = gamesMap.getGameMap().get(gameId);
        flippedFalse(game);
        game.activity();
        Card[][] pole = game.getPole();
        if(game.getTeamTurn().equals(teamId)){
            for (int i = 0; i < pole.length; i++) {
                for (int j = 0; j < pole[i].length; j++) {
                    pole[i][j].setJustOpen(false);
                }
            }
            for (int i = 0; i < pole.length; i++) {
                for (int j = 0; j < pole[i].length; j++) {
                    if (pole[i][j].getId().equals(cardId)) {
                        pole[i][j].setOpen(true);
                        pole[i][j].setJustOpen(true);

                        if (pole[i][j].getColor().equals("blueColor") && game.getTeamTurn().equals("1")) {
                            Integer points = game.getTeam1Points();
                            if (points == 1) {
                                game.setWin(true);
                            }
                            game.setTeam1Points(points - 1);
                        } else if (pole[i][j].getColor().equals("redColor") && game.getTeamTurn().equals("2")) {
                            Integer points = game.getTeam2Points();
                            if (points == 1) {
                                game.setWin(true);
                            }
                            game.setTeam2Points(points - 1);
                        }else if (pole[i][j].getColor().equals("blueColor") && game.getTeamTurn().equals("2")) {
                            game.setTeamTurn("1");
                        }else if (pole[i][j].getColor().equals("whiteColor") && game.getTeamTurn().equals("2")) {
                            game.setTeamTurn("1");
                        } else if (pole[i][j].getColor().equals("redColor") && game.getTeamTurn().equals("1")) {
                            game.setTeamTurn("2");
                        }else if (pole[i][j].getColor().equals("whiteColor") && game.getTeamTurn().equals("1")) {
                            game.setTeamTurn("2");
                        }else if (pole[i][j].getColor().equals("blackColor")) {
                            game.setFail(true);
                        }else{
                        }
                    }
                }
            }
            gamesMap.getGameMap().put(gameId, game);
            messagingTemplate.convertAndSend("/topic/game" + game.getGameId(), game);
            return new Message("FlipCard", "success");
        }else{
            return new Message("FlipCard", "gamer is in the opposite team");
        }


    }

    @GetMapping("/endTurn")
    public Message endTurn(@RequestParam String gameId) {
        LOG.info("Request from endTurn" + gameId.toString() );
        Game game = gamesMap.getGameMap().get(gameId);
        game.activity();
        flippedFalse(game);
        String teamTurn = game.getTeamTurn();
        if(teamTurn.equals("1")){
            game.setTeamTurn("2");
        }else{
            game.setTeamTurn("1");
        }
        System.out.println(game.getTeamTurn());
        gamesMap.getGameMap().put(gameId, game);
        messagingTemplate.convertAndSend("/topic/game" + game.getGameId(), game);
        return new Message("endTurn", "success");
    }

    @GetMapping("/newGame")
    public Message newGame(@RequestParam String gameId) {
        LOG.info("Request from newGame" + gameId);
        Game game = gamesMap.getGameMap().get(gameId);
        game.activity();
        game.setPole(game.makePole());
        game.setTeamTurn(game.getTeamTurn());
        game.setWin(false);
        game.setFail(false);
        gamesMap.getGameMap().put(gameId, game);
        messagingTemplate.convertAndSend("/topic/game" + game.getGameId(), game);
        return new Message("newGame", "success");
    }
}
