package com.ubstspapp.splashScreen;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.ubstspapp.MainActivity;

public class SplashScreenModule extends ReactContextBaseJavaModule {


    @Override
    public String getName() {
        return "SplashScreen";
    }

    public SplashScreenModule(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public void hide() {
        MainActivity activity = (MainActivity)this.getCurrentActivity();
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                activity.closeSplashView();
            }
        });
    }

}
