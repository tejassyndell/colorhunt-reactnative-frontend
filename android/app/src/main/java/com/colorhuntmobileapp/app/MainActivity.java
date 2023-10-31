package com.colorhuntmobileapp.app;

import android.os.Build;
import android.os.Bundle;
import android.view.View;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import expo.modules.ReactActivityDelegateWrapper;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import androidx.core.view.WindowCompat;

public class MainActivity extends ReactActivity {

    protected void onCreate(Bundle savedInstanceState) {
    // Set the theme to AppTheme BEFORE onCreate to support 
    // coloring the background, status bar, and navigation bar.
    // This is required for expo-splash-screen.
    setTheme(R.style.AppTheme);
    super.onCreate(null);

    // Initialize the WindowInsetsController for hiding and showing system bars
    WindowInsetsControllerCompat windowInsetsController =
            WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
    // Configure the behavior of the hidden system bars.
    windowInsetsController.setSystemBarsBehavior(
            WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);

    // Add a listener to update the behavior of the toggle fullscreen button when
    // the system bars are hidden or revealed.
    getWindow().getDecorView().setOnApplyWindowInsetsListener((view, windowInsets) -> {
        // You can hide the caption bar even when the other system bars are visible.
        // To account for this, explicitly check the visibility of navigationBars()
        // and statusBars() rather than checking the visibility of systemBars().
        if (windowInsets.isVisible(WindowInsetsCompat.Type.navigationBars())
                || windowInsets.isVisible(WindowInsetsCompat.Type.statusBars())) {
            binding.toggleFullscreenButton.setOnClickListener(v -> {
                // Hide both the status bar and the navigation bar.
                windowInsetsController.hide(WindowInsetsCompat.Type.systemBars());
            });
        } else {
            binding.toggleFullscreenButton.setOnClickListener(v -> {
                // Show both the status bar and the navigation bar.
                windowInsetsController.show(WindowInsetsCompat.Type.systemBars());
            });
        }

        // Return the updated view with window insets applied
        return view.onApplyWindowInsets(windowInsets);
    });
  }


  @Override
  protected void onCreate(Bundle savedInstanceState) {
    // Set the theme to AppTheme BEFORE onCreate to support 
    // coloring the background, status bar, and navigation bar.
    // This is required for expo-splash-screen.
    setTheme(R.style.AppTheme);
    super.onCreate(null);
  }
  

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "main";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled()));
  }

  /**
   * Align the back button behavior with Android S
   * where moving root activities to background instead of finishing activities.
   * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
   */
  @Override
  public void invokeDefaultOnBackPressed() {
    if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
      if (!moveTaskToBack(false)) {
        // For non-root activities, use the default implementation to finish them.
        super.invokeDefaultOnBackPressed();
      }
      return;
    }

    // Use the default back button implementation on Android S
    // because it's doing more than {@link Activity#moveTaskToBack} in fact.
    super.invokeDefaultOnBackPressed();
  }
}
