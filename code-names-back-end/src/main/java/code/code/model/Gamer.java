package code.code.model;

public class Gamer {
    String id;
    String name;
    String team;
    Boolean capitan = false;

    public Boolean getCapitan() {
        return capitan;
    }

    public void setCapitan(Boolean capitan) {
        this.capitan = capitan;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public Gamer(String id, String name, String team) {
        this.id = id;
        this.name = name;
        this.team = team;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Gamer{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", team='" + team + '\'' +
                ", capitan=" + capitan +
                '}';
    }
}
