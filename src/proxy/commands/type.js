/**
 * @file
 * @author zdying
 */

'use strict';

/**
 * 作用域指令列表
 * @type {{request: string[], response: string[], domain: string[], global: string[], location: string[]}}
 */
module.exports = {
    request: [
        'proxy_set_header',
        'proxy_hide_header',
        'proxy_set_cookie',
        'proxy_hide_cookie'
    ],
    response: [
        'set_header',
        'set_cookie',
        'hide_header',
        'hide_cookie'
    ],
    domain : ['set'],
    global : ['set'],
    location : [
        'set',
        'proxy_pass',
        'alias',
        'root'
    ]
};
