require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' }});
require(['vs/editor/editor.main'], function() {
    var editor = monaco.editor.create(document.getElementById('JSON'), {
        language: 'json',
        theme: "vs-dark"
    });

    let originalNsJson, appName, appProtocol;

    fetch('fn2187.ns.json')
        .then(response => response.json())
        .then(data => {
            originalNsJson = data;
            appName = data.name; // Correct property name
            appProtocol = data.protocol; // Correct property name

            editor.setValue(JSON.stringify(data, null, 2));

            // Update the webpage title to show the appName - appProtocol variables
            document.title = appName + ' - ' + appProtocol;
            // document.title = "Flipper Webview";
            console.log('document.title:', document.title);
        })
        .catch(error => console.error('Error loading example dataset:', error));
});


