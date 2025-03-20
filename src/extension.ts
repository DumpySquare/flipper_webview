import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import nsJson from '../applications/fn2187.ns.json';
import { AdcApp } from './models';
import fast from '@f5devcentral/f5-fast-core';
// import { logger } from './utils/logger';

export function activate(context: vscode.ExtensionContext) {



    const localPath = context.asAbsolutePath('templates');
    const fastEngine = new fast.FsTemplateProvider(localPath)

    
    context.subscriptions.push(
        vscode.commands.registerCommand('flipperWebview.start', () => {
            // Create and show a new webview panel
            const title = `${nsJson.name} - ${nsJson.protocol}` || 'Flipper Webview';

            const panel = vscode.window.createWebviewPanel(
                'flipperWebview',
                title,
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))]
                }
            );


            const mediaPath = path.join(context.extensionPath, 'media');
            const htmlPath = path.join(mediaPath, 'index.html');
            let htmlContent = fs.readFileSync(htmlPath, 'utf8');

            const monacoCssUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(mediaPath, 'style.css')));
            htmlContent = htmlContent.replace(
                /<link rel="stylesheet" type="text\/css" href="style.css">/,
                `<link rel="stylesheet" type="text/css" href="${monacoCssUri}">`
            );



            // const tmpHtml = renderHTML(nsJson, fastTemplate);

            panel.webview.html = htmlContent;
        })


    );
    
    // Automatically start the webview when the extension is activated
    vscode.commands.executeCommand('flipperWebview.start');
}



    // /**
    //  * Renders the output of a FAST template with the provided parameters
    //  * @param tempParams FAST Template parameters
    //  * @param template FAST Template to render
    //  * @returns 
    //  */
    // function renderAS3(tempParams: unknown, template?: string) {
    //     /**
    //      * take params from panel submit button
    //      * process through fast with template
    //      * then display in new editor to the right...
    //      */

    //     // const nsAppProtocol = tempParams.protocol;

    //     // if (nsAppProtocol) {

    //     //     template = `as3/${nsAppProtocol}`
    //     // }

    //     // logger.info(`ns app FAST Template params: `, tempParams);

    //     const as3 = fastEngine.fetch(template)
    //         .then((template) => {
    //             const as3 = template.render(tempParams);
    //             return as3;
    //         });

    //     return as3;

    // }


    // load the fast template from the ../templates/HTTP.yaml file into a variable
    const fastTemplate = fs.readFileSync(path.join(__dirname, '../templates/HTTP.yaml'), 'utf8');


    // /**
    //  * Renders FAST template HTML output with NS app details as input parameters
    //  * @param doc vscode document object
    //  * @param template FAST template to render HTML
    //  */
    // function renderHTML(app: AdcApp, template: string) {

    //     const nsAppProtocol = app.protocol;

    //     if (nsAppProtocol) {

    //         template = `as3/${nsAppProtocol}`
    //     }

    //     // merget document values with template values/defaults

    //     // save template name so we can fetch it during render
    //     // this.selectedTemplate = template;

    //     // logger.debug(`converting ns app ${app.name} with FAST Template ${template}`)

    //     // invalidate the cache to load any template changes
    //     fastEngine.invalidateCache();

    //     // load the fast template
    //     let html = fastEngine.fetch(template)
    //         .then((template) => {
    //             // get the schema for the template
    //             const schema = template.getParametersSchema();
    //             // get the default values for the template
    //             const defaultParams = template.getCombinedParameters();

    //             // // get ns app params from the document
    //             // const nsAppParams = JSON.parse(doc.getText());

    //             // mutate ns app params into a better format for FAST templates
    //             const temp = app.fastTempParams;

    //             // merge with FAST template default params (overwriting default)
    //             const fastParams = Object.assign(defaultParams, temp)

    //             // logger.debug(`ns app ${app.name} FAST Template params: `, fastParams);

    //             // generate the html preview
    //             let html: string = fast.guiUtils.generateHtmlPreview(schema, fastParams)

    //             return html;
    //         })
    //         .catch(e => {
    //             // logger.error(e);
    //             console.log(e);
    //         });

    //     }

export function deactivate() {}
