package code.code.messagingstompwebsocket;

import code.code.model.Game;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Component
public class GamesMap {
    public static final int CLEANUP_THRESHOLD = 1000 * 60 * 60 * 3;
    Map<String, Game> gameMap = new ConcurrentHashMap<>();

    public GamesMap() {
    }

    public Map<String, Game> getGameMap() {
        this.gameMap = cleanUp();
        return gameMap;
    }

    public void setGameMap(Map<String, Game> gameMap) {
        this.gameMap = gameMap;
    }

    private Map<String, Game> cleanUp() {
        return new ConcurrentHashMap<>(gameMap.entrySet().stream()
                .filter(it -> it.getValue().getLastActivity() >= System.currentTimeMillis() - CLEANUP_THRESHOLD)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue)));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof GamesMap)) return false;
        GamesMap gamesMap = (GamesMap) o;
        return Objects.equals(getGameMap(), gamesMap.getGameMap());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getGameMap());
    }

    @Override
    public String toString() {
        return "GamesMap{" +
                "gameMap=" + gameMap +
                '}';
    }
}
