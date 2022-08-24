package code.code.model;

public class Card {
    Integer id;
    String title;
    String color;
    Boolean justOpen = false;
    Boolean open;

    public Card(Integer id, String title, String color, Boolean open) {
        this.id = id;
        this.title = title;
        this.color = color;
        this.open = open;
    }

    public Integer getId() {
        return id;
    }

    public Boolean getJustOpen() {
        return justOpen;
    }

    public void setJustOpen(Boolean justOpen) {
        this.justOpen = justOpen;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Boolean getOpen() {
        return open;
    }

    public void setOpen(Boolean open) {
        this.open = open;
    }

    @Override
    public String toString() {
        return "Card{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", color='" + color + '\'' +
                ", justOpen=" + justOpen +
                ", open=" + open +
                '}';
    }
}
