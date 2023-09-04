package com.weathergo;

import com.tencent.mmkv.MMKV;

import org.json.JSONObject;

public class SharedStore {

    private static SharedStore instance = null;

    public void SharedStore() {
    };

    public static SharedStore getInstance() {
        if (instance == null) {
            instance = new SharedStore();
        }
        return instance;
    }

    public String getMMKV() {
        System.out.println("called");
        MMKV mmkv = MMKV.defaultMMKV();
        String locations = mmkv.decodeString("persist:root");

        try {
            JSONObject reader = new JSONObject(locations);
            System.out.println(reader);

            return reader.getString("locations");
        } catch (Exception e) {
            System.out.println(e);
            return "wrong";
        }
    }
}
