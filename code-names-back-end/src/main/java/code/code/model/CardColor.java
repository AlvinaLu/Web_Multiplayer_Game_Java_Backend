package code.code.model;

public enum CardColor {

    BLUE_COLOR("blueColor"),
    WHITE_COLOR("whiteColor"),
    RED_COLOR("redColor"),
    BLACK_COLOR("blackColor");
    private String strVal;

    CardColor(String strVal) {
        this.strVal = strVal;
    }

    public String getStrVal() {
        return strVal;
    }
}
