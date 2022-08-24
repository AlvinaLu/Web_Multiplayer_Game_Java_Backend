package code.code.messagingstompwebsocket;

public class Message {

    private String from;
    private String gameId;

    public Message() {
    }

    public Message(String from, String text) {
        this.from = from;
        this.gameId = text;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    @Override
    public String toString() {
        return "Message{" +
                "from='" + from + '\'' +
                ", text='" + gameId + '\'' +
                '}';
    }
}
