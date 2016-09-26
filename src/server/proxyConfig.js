/**
 * @file
 * @author zdying
 */
'use strict';

var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

var PAC_PATH = 'file://' + path.resolve(__dirname, '..', 'proxy', 'pac', 'hiipack.pac');

module.exports = {
    chrome: function(dataDir, url){
        return [
            '--proxy-pac-url="' + PAC_PATH + '"',
            '--user-data-dir="'+ dataDir + '/chrome-cache' +'"',
            '--lang=local',
            url
        ].join(' ');
    },

    opera: function(dataDir, url){
        return [
            '--proxy-pac-url="' + PAC_PATH + '"',
            '--user-data-dir="'+ dataDir + '/opera-cache' +'"',
            '--lang=local',
            url
        ].join(' ');
    },

    safari: function(dataDir, url){
        return ''
    },

    firefox: function(dataDir, url, firefoxPath){
        // Firefox pac set
        // http://www.indexdata.com/connector-platform/enginedoc/proxy-auto.html
        // http://kb.mozillazine.org/Network.proxy.autoconfig_url
        // user_pref("network.proxy.autoconfig_url", "http://us2.indexdata.com:9005/id/cf.pac");
        // user_pref("network.proxy.type", 2);

        var dir = path.join(dataDir, 'firefox_cache');
        var prefsPath = path.join(dir, 'prefs.js');

        if(!fs.existsSync(prefsPath)){
            // 自动代理
            var prefs = [
                'user_pref("network.proxy.autoconfig_url", "' + PAC_PATH + '");',
                'user_pref("network.proxy.type", 2);'
            ];

            // 直接代理
            // var prefs = [
            //     'user_pref("network.proxy.http", "127.0.0.1");',
            //     'user_pref("network.proxy.http_port", 4936);',
            //     'user_pref("network.proxy.type", 1);'
            // ];

            // https://developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options
            child_process.execSync(firefoxPath + ' -CreateProfile "firefox_hii_pref ' + dir + '"');
            fs.writeFileSync(prefsPath, prefs.join('\n'));
        }

        return [
            '-P firefox_hii_pref',
            '-no-remote',
            url
        ].join(' ');
    }
};