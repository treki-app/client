package com.client;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.imagepicker.ImagePickerPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.jamesisaac.rnbackgroundtask.BackgroundTaskPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.polidea.reactnativeble.BlePackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.wix.reactnativenotifications.RNNotificationsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            new ImagePickerPackage(),
            new BackgroundTimerPackage(),
            new BackgroundTaskPackage(),
          new VectorIconsPackage(),
          new RNFirebasePackage(),
          new FacebookLoginPackage(),
          new BlePackage(),
          new MapsPackage(),
          new RNNotificationsPackage(MainApplication.this)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    BackgroundTaskPackage.useContext(this);
  }
}
