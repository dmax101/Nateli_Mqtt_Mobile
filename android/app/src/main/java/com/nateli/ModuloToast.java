package com.nateli;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.eclipse.paho.android.service.MqttAndroidClient;

import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttClientPersistence;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttSecurityException;
import org.eclipse.paho.client.mqttv3.internal.security.SSLSocketFactoryFactory;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.Properties;

public class ModuloToast extends ReactContextBaseJavaModule {
    ReactApplicationContext contexto;
    public ModuloToast(ReactApplicationContext reactContext) {
        super(reactContext);
        this.contexto = reactContext;
    }

    @Override
    public String getName() {
        return "MeuToast";
    }

    public void info(String m) {
        Toast toast = Toast.makeText(getReactApplicationContext(), m, Toast.LENGTH_LONG);
        toast.show();
    }

    @ReactMethod
    public void show(String mensagem) {
        String clientId = MqttClient.generateClientId();

        String topic = "aslfdk/sfjhkl";
        String payload = mensagem;

        MqttConnectOptions options = new MqttConnectOptions();

        MqttAndroidClient client = new MqttAndroidClient(
            getReactApplicationContext(),
            "ssl://csilab-broker.inatel.br:8883",
            clientId
        );

        InputStream input = null;
        
        try {
            input = getReactApplicationContext().getAssets().open("server.bks");
            info(Integer.toString(input.available()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            options.setSocketFactory(client.getSSLSocketFactory(input, "WhoAmI#2020"));
        } catch (MqttSecurityException e) {
            e.printStackTrace();
        }
        options.setUserName("csilab");
            options.setPassword("WhoAmI#2020".toCharArray());
            //options.setMqttVersion(3);
            options.setCleanSession(true);
            //Properties props = new Properties();
            //options.setSSLProperties(props);


        try {
            IMqttToken token = client.connect(options);
            token.setActionCallback(new IMqttActionListener() {
                @Override
                public void onSuccess(IMqttToken asyncActionToken) {
                    // We are connected
                    info("onSuccess");

                    byte[] encodedPayload = new byte[0];

                    try {
                        encodedPayload = payload.getBytes("UTF-8");
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                    }
                    MqttMessage message = new MqttMessage(encodedPayload);
                    try {
                        client.publish(topic, message);
                    } catch (MqttException e) {
                        e.printStackTrace();
                    }
                    try {
                        client.disconnect();
                    } catch (MqttException e) {
                        e.printStackTrace();
                    }
                }

                @Override
                public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
                    // Something went wrong e.g. connection timeout or firewall problems
                    System.out.println("onFailure");

                }
            });
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
}