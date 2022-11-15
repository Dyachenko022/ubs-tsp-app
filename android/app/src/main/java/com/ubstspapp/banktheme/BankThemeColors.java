package com.ubstspapp.banktheme;

import java.util.HashMap;

public class BankThemeColors {
    public String TextLight;
    public String TextDark;
    public String Link;
    public String ButtonFilled;
    public String GradientLight[][];
    public String GradientDark[][];

    public HashMap<String, Object> ToHashMap() {
        HashMap<String, Object> result = new HashMap<>();
        result.put("textLight", TextLight);
        result.put("textDark", TextDark);
        result.put("link", Link);
        result.put("buttonFilled", ButtonFilled);
        result.put("gradientLight", GradientLight);
        result.put("gradientDark", GradientDark);
        return result;
    }
}
