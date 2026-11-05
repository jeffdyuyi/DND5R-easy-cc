package com.nogubird.easycc;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(android.os.Bundle savedInstanceState) {
        registerPlugin(ResourceFilesPlugin.class);
        registerPlugin(DocumentExportPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
