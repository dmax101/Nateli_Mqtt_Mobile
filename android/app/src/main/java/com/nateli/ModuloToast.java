package com.nateli;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ModuloToast extends ReactContextBaseJavaModule {
    public ModuloToast(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MeuToast";
    }

    @ReactMethod
    public void show(String mensagem) {
        Toast toast = Toast.makeText(getReactApplicationContext(), mensagem, Toast.LENGTH_LONG);
        toast.show();
    }
}