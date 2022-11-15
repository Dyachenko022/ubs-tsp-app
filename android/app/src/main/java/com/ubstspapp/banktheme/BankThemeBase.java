package com.ubstspapp.banktheme;

import android.app.Activity;
import android.graphics.Color;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatDelegate;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.ubstspapp.R;

import java.util.HashMap;
import java.util.Map;

public abstract class BankThemeBase extends ReactContextBaseJavaModule {

    protected BankThemeColors bankThemeColors;

    private String serverUrl;

    protected abstract String getAppName();

    protected abstract String getLatitude();
    protected abstract String getLongitude();

    @Override
    public String getName() {
        return "BankTheme";
    }

    public BankThemeBase(ReactApplicationContext context) {
        super(context);
        serverUrl = context.getString(R.string.ServerUrl);
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("colors", bankThemeColors.ToHashMap());
        constants.put("serverUrl", serverUrl);
        constants.put("appName", getAppName());
        constants.put("latitude", getLatitude());
        constants.put("longitude", getLongitude());
        return constants;
    }

}
