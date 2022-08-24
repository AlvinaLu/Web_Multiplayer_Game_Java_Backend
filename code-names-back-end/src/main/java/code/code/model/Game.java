package code.code.model;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Game {
    private String gameId;
    private Card[][] pole;
    private String teamTurn;
    private Integer team1Points;
    private Integer team2Points;
    private Boolean win;
    private Boolean fail;
    private List<Gamer> team1 = new LinkedList<>();
    private List<Gamer> team2 = new LinkedList<>();
    private long lastActivity;
    public static final int FIELD_SIZE = 25;

    public Game(String name) {
        this.gameId = name;
        this.teamTurn = "1";
        this.team1Points = 9;
        this.team2Points = 8;
        this.win = false;
        this.fail = false;
        this.pole = makePole();
        activity();
    }

    public Boolean getWin() {
        return win;
    }

    public void setWin(Boolean win) {
        this.win = win;
    }

    public Boolean getFail() {
        return fail;
    }

    public void setFail(Boolean fail) {
        this.fail = fail;
    }

    public Integer getTeam1Points() {
        return team1Points;
    }

    public void setTeam1Points(Integer team1Points) {
        this.team1Points = team1Points;
    }

    public Integer getTeam2Points() {
        return team2Points;
    }

    public void setTeam2Points(Integer team2Points) {
        this.team2Points = team2Points;
    }

    public String getTeamTurn() {
        return teamTurn;
    }

    public void setTeamTurn(String teamTurn) {
        this.teamTurn = teamTurn;
    }

    public List<Gamer> getTeam1() {
        return team1;
    }

    public void setTeam1(List<Gamer> team1) {
        this.team1 = team1;
    }

    public List<Gamer> getTeam2() {
        return team2;
    }

    public void setTeam2(List<Gamer> team2) {
        this.team2 = team2;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public Card[][] getPole() {
        return pole;
    }

    public void setPole(Card[][] pole) {
        this.pole = pole;
    }

    public void activity() {
        this.lastActivity = System.currentTimeMillis();
    }

    public long getLastActivity() {
        return lastActivity;
    }

    @Override
    public String toString() {
        return "Game{" +
                "gameId='" + gameId + '\'' +
                ", pole=" + Arrays.toString(pole) +
                ", firstTeam='" + teamTurn + '\'' +
                ", team1Points=" + team1Points +
                ", team2Points=" + team2Points +
                ", team1=" + team1 +
                ", team2=" + team2 +
                '}';
    }

    public Card[][] makePole() {
        List<String> words = getNouns(FIELD_SIZE);
        Iterator<String> wordIterator = words.iterator();
        if (new Random().nextFloat() > 0.5) {
            teamTurn = "2";
            team1Points = 8;
            team2Points = 9;
        } else {
            teamTurn = "1";
            team1Points = 9;
            team2Points = 8;
        }
        List<CardColor> colors = new ArrayList<>();

        colors.addAll(IntStream.range(0, team1Points).mapToObj(it -> CardColor.BLUE_COLOR).collect(Collectors.toList()));
        colors.addAll(IntStream.range(0, team2Points).mapToObj(it -> CardColor.RED_COLOR).collect(Collectors.toList()));
        colors.add(CardColor.BLACK_COLOR);
        colors.addAll(IntStream.range(0, FIELD_SIZE - colors.size()).mapToObj(it -> CardColor.WHITE_COLOR).collect(Collectors.toList()));
        Collections.shuffle(colors);

        Iterator<CardColor> colorIterator = colors.iterator();

        int id = 0;
        Card[][] cards = new Card[5][5];
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                Card card = new Card(id++, wordIterator.next(), colorIterator.next().getStrVal(), false);
                cards[i][j] = card;

            }

        }

        return cards;
    }

    private List<String> getNouns(int size) {
        try (InputStream resource = getClass().getClassLoader().getResourceAsStream("nounlist.txt")) {
            List<String> lines = new BufferedReader(new InputStreamReader(resource, StandardCharsets.UTF_8))
                    .lines()
                    .collect(Collectors.toList());
            Random random = new Random();
            List<String> result = new ArrayList<>();
            Set<Integer> indexes = new HashSet<>();
            while (result.size() < size) {
                int i = random.nextInt(lines.size());
                if (!indexes.contains(i)) {
                    indexes.add(i);
                    if (lines.get(i).length() <= 6) {
                        result.add(lines.get(i));
                    }
                }
            }
            return result;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}


