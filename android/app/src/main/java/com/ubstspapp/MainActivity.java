package com.ubstspapp;

import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.facebook.react.ReactActivity;
import com.ubstspapp.banktheme.BankTheme;

public class MainActivity extends ReactActivity {

  private View splashView;
  private boolean wasPaused = false;

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ubsTspApp";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setSplash();
  }

  @Override
  protected void onPause() {
      super.onPause();
      wasPaused = true;
      if (splashView == null) {
          setSplash();
      }
  }

  @Override
  protected void onResume() {
      super.onResume();
      if (wasPaused) {
          closeSplashView();
      }
  }

  public void closeSplashView() {
      if (splashView != null) {
          ((ViewGroup) splashView.getParent()).removeView(splashView);
          splashView = null;
          wasPaused = false;
      }
  }

  private void setSplash() {
      ImageView img = new ImageView(this);
      img.setImageDrawable(getResources().getDrawable(R.drawable.logo_splash));
      int uiOptions = getWindow().getDecorView().getSystemUiVisibility();
      img.setScaleType(ImageView.ScaleType.FIT_CENTER);
      int newUiOptions = uiOptions;

      newUiOptions ^= View.SYSTEM_UI_FLAG_FULLSCREEN;
      newUiOptions ^= View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;

      getWindow().getDecorView().setSystemUiVisibility(newUiOptions);

      LinearLayout rlmain = new LinearLayout(this);
      LinearLayout.LayoutParams llp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.FILL_PARENT,LinearLayout.LayoutParams.FILL_PARENT);
      LinearLayout   ll1 = new LinearLayout (this);

      GradientDrawable gd = new GradientDrawable(
              GradientDrawable.Orientation.TOP_BOTTOM,
              BankTheme.SplashScreenGradient);
      gd.setCornerRadius(0f);
      rlmain.setBackgroundDrawable(gd);
      ll1.setGravity(Gravity.CENTER);

      LinearLayout .LayoutParams lp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);

      img.setLayoutParams(lp);
      ll1.addView(img);
      rlmain.setGravity(Gravity.CENTER);
      rlmain.addView(ll1);
      splashView = rlmain;
      addContentView(rlmain, llp);
  }

    @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
      return new ReactActivityDelegate(this, getMainComponentName()) {
     @Override
      protected ReactRootView createRootView() {
             return new RNGestureHandlerEnabledRootView(MainActivity.this);
              }
    };
  }
}
