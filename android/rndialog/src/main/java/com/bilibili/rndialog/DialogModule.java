package com.bilibili.rndialog;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

/**
 * Created by desmond on 5/3/16.
 */
public class DialogModule extends ReactContextBaseJavaModule{
    public DialogModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "BiliDialog";
    }

    @ReactMethod
    public void show(ReadableMap bundle, Callback positive, Callback negative){

    }

    @ReactMethod
    public void dismiss(){

    }


}
