package com.ubstspapp.banktheme;

import android.graphics.Color;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class BankTheme extends BankThemeBase {

    public static int[] SplashScreenGradient = new int[] {
            Color.parseColor("#8689F5"),
            Color.parseColor("#4549B4")
    };

    @Override
    protected String getAppName() {
        return "Крокус-Банк ТСП";
    }

    public BankTheme(ReactApplicationContext context) {
        super(context);
        super.bankThemeColors = new BankThemeColors();
        super.bankThemeColors.TextDark = "#FFFFFF";
        super.bankThemeColors.TextLight = "#2E3D49";
        super.bankThemeColors.Link = "#7E93FF";
        super.bankThemeColors.ButtonFilled = "#3F5EFF";
        super.bankThemeColors.GradientLight = new String[4][2];
        super.bankThemeColors.GradientLight[0] = new String[] { "rgba(36, 118, 250, 0.6)", "rgba(0, 122, 160, 0.7)" };
        super.bankThemeColors.GradientLight[1] = new String[] { "rgba(66, 90, 216, 0.6)", "rgba(124, 49, 183, 0.7)" };
        super.bankThemeColors.GradientLight[2] = new String[] { "rgba(113, 51, 244, 0.6)", "rgba(153, 28, 197, 0.7)" };
        super.bankThemeColors.GradientLight[3] = new String[] { "rgba(244, 65, 100, 0.6)", "rgba(151, 0, 0, 0.7)" };

        super.bankThemeColors.GradientDark = new String[4][2];
        super.bankThemeColors.GradientDark[0] = new String[] {"rgba(36, 118, 250, 0.6)", "rgba(0, 122, 160, 0.7)"};
        super.bankThemeColors.GradientDark[1] = new String[] {"rgba(66, 90, 216, 0.6)", "rgba(124, 49, 183, 0.7)"};
        super.bankThemeColors.GradientDark[2] = new String[] {"rgba(113, 51, 244, 0.6)", "rgba(153, 28, 197, 0.7)"};
        super.bankThemeColors.GradientDark[3] = new String[] {"rgba(244, 65, 100, 0.6)", "rgba(151, 0, 0, 0.7)"};
    }

    @Override
    protected String getLatitude() {
        return "55.824430";
    }
    
    @Override
    protected String getLongitude() {
        return "37.388902";
    }
}
