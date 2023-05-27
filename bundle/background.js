(function (modules)
{ // webpackBootstrap
    // The module cache
    var installedModules = {};

    // The require function
    function __webpack_require__(moduleId)
    {

        // Check if module is in cache
        if (installedModules[moduleId])
        {
            return installedModules[moduleId].exports;
        }
        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };

        // Execute the module function
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        // Flag the module as loaded
        module.l = true;

        // Return the exports of the module
        return module.exports;
    }
    // expose the modules object (__webpack_modules__)
    __webpack_require__.m = modules;

    // expose the module cache
    __webpack_require__.c = installedModules;

    // define getter function for harmony exports
    __webpack_require__.d = function (exports, name, getter)
    {
        if (!__webpack_require__.o(exports, name))
        {
            Object.defineProperty(exports, name, {
                configurable: false,
                enumerable: true,
                get: getter
            });
        }
    };

    // getDefaultExport function for compatibility with non-harmony modules
    __webpack_require__.n = function (module)
    {
        var getter = module && module.__esModule ?
            function getDefault() { return module['default']; } :
            function getModuleExports() { return module; };
        __webpack_require__.d(getter, 'a', getter);
        return getter;
    };

    // Object.prototype.hasOwnProperty.call
    __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

    // __webpack_public_path__
    __webpack_require__.p = "";

    // Load entry module and return exports
    return __webpack_require__(__webpack_require__.s = 1);

})
    ([
        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const qs = __webpack_require__(11);
            const types_1 = __webpack_require__(2);
            class Promisify
            {
                static noArgs(thisArg, chromeApiFn)
                {
                    return function promisified()
                    {
                        return new Promise((resolve, reject) =>
                        {
                            chromeApiFn.call(thisArg, (result) =>
                            {
                                const err = chrome.runtime.lastError;
                                return err ? reject(err) : resolve(result);
                            });
                        });
                    };
                }
                static oneArg(thisArg, chromeApiFn)
                {
                    return function promisified(_arg1)
                    {
                        return new Promise((resolve, reject) =>
                        {
                            chromeApiFn.call(thisArg, _arg1, (result) =>
                            {
                                const err = chrome.runtime.lastError;
                                return err ? reject(err) : resolve(result);
                            });
                        });
                    };
                }
                static twoArgs(thisArg, chromeApiFn)
                {
                    return function promisified(_arg1, _arg2)
                    {
                        return new Promise((resolve, reject) =>
                        {
                            chromeApiFn.call(thisArg, _arg1, _arg2, (result) =>
                            {
                                const err = chrome.runtime.lastError;
                                return err ? reject(err) : resolve(result);
                            });
                        });
                    };
                }
            }
            exports.Promisify = Promisify;
            function extractDomain(url)
            {
                return url.split('/')[2];
            }
            exports.extractDomain = extractDomain;
            function registerEventListener(event, listener)
            {
                event.removeListener(listener);
                event.addListener(listener);
                Assert.eventHasListener(event, listener);
            }
            exports.registerEventListener = registerEventListener;
            function registerBrowserEventListener(event, listener)
            {
                event.removeListener(listener);
                event.addListener(listener);
                Assert.browserEventHasListener(event, listener);
            }
            exports.registerBrowserEventListener = registerBrowserEventListener;
            function unregisterEventListener(event, listener)
            {
                event.removeListener(listener);
                Assert.eventDoesNotHaveListener(event, listener);
            }
            exports.unregisterEventListener = unregisterEventListener;
            function registerWebRequestListener(event, listener, filter, spec)
            {
                event.removeListener(listener);
                event.addListener(listener, filter, spec);
                Assert.eventHasListener(event, listener);
            }
            exports.registerWebRequestListener = registerWebRequestListener;
            function isEqual(one, other)
            {
                if (one === other)
                {
                    return true;
                }
                if (one === null || one === undefined || other === null || other === undefined)
                {
                    return false;
                }
                if (typeof one !== typeof other)
                {
                    return false;
                }
                if (typeof one !== 'object')
                {
                    return false;
                }
                if ((Array.isArray(one)) !== (Array.isArray(other)))
                {
                    return false;
                }
                let i;
                let key;
                if (Array.isArray(one))
                {
                    if (one.length !== other.length)
                    {
                        return false;
                    }
                    for (i = 0; i < one.length; i++)
                    {
                        if (!isEqual(one[i], other[i]))
                        {
                            return false;
                        }
                    }
                }
                else
                {
                    const oneKeys = [];
                    for (key in one)
                    {
                        oneKeys.push(key);
                    }
                    oneKeys.sort();
                    const otherKeys = [];
                    for (key in other)
                    {
                        otherKeys.push(key);
                    }
                    otherKeys.sort();
                    if (!isEqual(oneKeys, otherKeys))
                    {
                        return false;
                    }
                    for (i = 0; i < oneKeys.length; i++)
                    {
                        if (!isEqual(one[oneKeys[i]], other[oneKeys[i]]))
                        {
                            return false;
                        }
                    }
                }
                return true;
            }
            exports.isEqual = isEqual;
            class Assert
            {
                static browserEventHasListener(event, listener)
                {
                    if (!event.hasListener(listener))
                    {
                        throw new Error(`Assert "event.hasListener(${listener.name})" failed`);
                    }
                }
                static eventDoesNotHaveListener(event, listener)
                {
                    if (event.hasListener(listener))
                    {
                        throw new Error(`Assert "event.hasListener(${listener.name})" failed`);
                    }
                }
                static eventHasListener(event, listener)
                {
                    if (!event.hasListener(listener))
                    {
                        throw new Error(`Assert "event.hasListener(${listener.name})" failed`);
                    }
                }
            }
            exports.Assert = Assert;
            var StorageKey;
            (function (StorageKey)
            {
                StorageKey["AddonUid"] = "addonUid";
                StorageKey["AddonVersion"] = "addonVersion";
                StorageKey["Debug"] = "debug";
                StorageKey["HiddenWarnings"] = "hiddenWarnings";
                StorageKey["LiveReloadDisabled"] = "liveReloadDisabled";
                StorageKey["ReopenAfterReload"] = "reopenAfterReload";
                StorageKey["Settings"] = "settings";
                StorageKey["SettingsVersion"] = "settingsVersion";
                StorageKey["UseDevDomain"] = "useDevDomain";
                StorageKey["WelcomePageOpened"] = "welcomePageOpened";
            })(StorageKey = exports.StorageKey || (exports.StorageKey = {}));
            class LocalStorage
            {
                static clear()
                {
                    try
                    {
                        localStorage.clear();
                    }
                    catch (error)
                    {
                        console.error(error);
                    }
                }
                static get(key)
                {
                    try
                    {
                        return JSON.parse(localStorage.getItem(key));
                    }
                    catch (error)
                    {
                        console.error(error);
                        return null;
                    }
                }
                static remove(key)
                {
                    try
                    {
                        localStorage.removeItem(key);
                    }
                    catch (error)
                    {
                        console.error(error);
                    }
                }
                static set(key, value)
                {
                    try
                    {
                        localStorage.setItem(key, JSON.stringify(value));
                    }
                    catch (error)
                    {
                        console.error(error);
                    }
                }
            }
            LocalStorage.supported = typeof localStorage !== 'undefined';
            exports.LocalStorage = LocalStorage;
            class ChromeStorage
            {
                constructor()
                {
                    this.get = Promisify.oneArg(chrome.storage.local, chrome.storage.local.get);
                    this.remove = Promisify.oneArg(chrome.storage.local, chrome.storage.local.remove);
                    this.set = Promisify.oneArg(chrome.storage.local, chrome.storage.local.set);
                }
            }
            exports.ChromeStorage = ChromeStorage;
            class Supports
            {
                constructor()
                {
                    this.browserApi = typeof window.browser !== 'undefined';
                    this.proxyOnRequest = this.browserApi && typeof browser.proxy !== 'undefined'
                        && typeof browser.proxy.onRequest !== 'undefined';
                    this.proxyScript = !this.proxyOnRequest && this.browserApi && typeof browser.proxy !== 'undefined'
                        && typeof browser.proxy.register !== 'undefined';
                    this.webExtProxy = this.proxyOnRequest || this.proxyScript;
                }
            }
            exports.Supports = Supports;
            class PromisifiedChromeManagement
            {
                constructor()
                {
                    this.getSelf = Promisify.noArgs(chrome.management, chrome.management.getSelf);
                }
            }
            class PromisifiedChromePermissions
            {
                constructor()
                {
                    this.getAll = Promisify.noArgs(chrome.permissions, chrome.permissions.getAll);
                }
            }
            class PromisifiedChromeTabs
            {
                constructor()
                {
                    this.get = Promisify.oneArg(chrome.tabs, chrome.tabs.get);
                    this.query = Promisify.oneArg(chrome.tabs, chrome.tabs.query);
                    this.reload = Promisify.twoArgs(chrome.tabs, chrome.tabs.reload);
                    this.update = Promisify.twoArgs(chrome.tabs, chrome.tabs.update);
                }
            }
            class PromisifiedChrome
            {
                constructor()
                {
                    this.management = new PromisifiedChromeManagement();
                    this.permissions = new PromisifiedChromePermissions();
                    this.tabs = new PromisifiedChromeTabs();
                }
            }
            exports.PromisifiedChrome = PromisifiedChrome;
            class QueryString
            {
                constructor(queryString = window.location.search, options)
                {
                    this.parsed = qs.parse(queryString, options);
                }
                get(paramName)
                {
                    return this.parsed[paramName];
                }
                getOptionalString(paramName)
                {
                    const value = this.parsed[paramName];
                    if (value === undefined)
                    {
                        return '';
                    }
                    if (typeof value !== 'string')
                    {
                        throw new Error(`Invalid type of param '${paramName}': ${typeof value}`);
                    }
                    return value;
                }
                getRequiredNumber(paramName)
                {
                    let value = this.parsed[paramName];
                    if (value === undefined)
                    {
                        throw new Error(`Missing required param '${paramName}'`);
                    }
                    if (typeof value !== 'string')
                    {
                        throw new Error(`Invalid type of param '${paramName}': ${typeof value}`);
                    }
                    value = parseInt(value, 10);
                    if (isNaN(value))
                    {
                        throw new Error(`Invalid value of param '${paramName}': not a number`);
                    }
                    return value;
                }
                getRequiredString(paramName)
                {
                    const value = this.parsed[paramName];
                    if (value === undefined)
                    {
                        throw new Error(`Missing required param '${paramName}'`);
                    }
                    if (typeof value !== 'string')
                    {
                        throw new Error(`Invalid type of param '${paramName}': ${typeof value}`);
                    }
                    if (value.length === 0)
                    {
                        throw new Error(`Invalid value of param '${paramName}': not a string`);
                    }
                    return value;
                }
            }
            exports.QueryString = QueryString;
            class Url
            {
                constructor(url, options)
                {
                    const parsed = qs.parseUrl(url, options);
                    this.url = parsed.url;
                    this.query = parsed.query;
                }
                addParams(params, options)
                {
                    const query = qs.stringify(Object.assign({}, this.query, params), options);
                    return `${this.url}?${query}`;
                }
            }
            exports.Url = Url;
            class DOM
            {
                static hide(element, hide = true)
                {
                    if (hide)
                    {
                        element.classList.add('hidden');
                    }
                    else
                    {
                        element.classList.remove('hidden');
                    }
                }
                static setHtml(element, html)
                {
                    element.innerHTML = html;
                }
                static show(element, show = true)
                {
                    if (show)
                    {
                        element.classList.remove('hidden');
                    }
                    else
                    {
                        element.classList.add('hidden');
                    }
                }
                static toggle(element)
                {
                    DOM.show(element, element.classList.contains('hidden'));
                }
            }
            exports.DOM = DOM;
            class BrowserDetails
            {
                constructor(_userAgent)
                {
                    this.version = 0;
                    this._name = types_1.BrowserName.Chrome;
                    const userAgent = _userAgent || '';
                    this.parseUserAgent(userAgent);
                }
                get name()
                {
                    return this._name;
                }
                get isChrome()
                {
                    return this._name === types_1.BrowserName.Chrome;
                }
                get isFirefox()
                {
                    return this._name === types_1.BrowserName.Firefox;
                }
                parseUserAgent(userAgent)
                {
                    const match = /(Chrome|Firefox)\/(\d+)/.exec(userAgent);
                    if (match)
                    {
                        const name = match[1].toLowerCase();
                        const version = parseInt(match[2], 10);
                        this.version = isNaN(version) ? 0 : version;
                        if (Object.values(types_1.BrowserName).includes(name))
                        {
                            this._name = name;
                        }
                        else
                        {
                            console.error(`Unknown browserName: ${name}`);
                        }
                    }
                }
            }
            exports.BrowserDetails = BrowserDetails;
            function sleep(ms)
            {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            exports.sleep = sleep;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const App_1 = __webpack_require__(9);
            window.addonPagePathname = window.location.pathname;
            exports.app = new App_1.App();
            (async () =>
            {
                try
                {
                    await exports.app.init();
                    window.addonBackgroundApp = exports.app;
                }
                catch (error)
                {
                    console.error(error);
                }
            })();
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            var RedirectorAction;
            (function (RedirectorAction)
            {
                RedirectorAction["DisableProxy"] = "disableProxy";
                RedirectorAction["EnableProxy"] = "enableProxy";
                RedirectorAction["ShowProxyError"] = "showProxyError";
            })(RedirectorAction = exports.RedirectorAction || (exports.RedirectorAction = {}));
            var ErrorCode;
            (function (ErrorCode)
            {
                ErrorCode["InvalidProxyDetected"] = "InvalidProxyDetected";
                ErrorCode["MissingAccessToAllUrls"] = "MissingAccessToAllUrls";
                ErrorCode["ProxyPacConflict"] = "ProxyPacConflict";
                ErrorCode["UnexpectedError"] = "UnexpectedError";
            })(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
            class AddonError extends Error
            {
                constructor(code = ErrorCode.UnexpectedError, message = 'AddonError')
                {
                    super(message);
                    this.code = code;
                    this.message = message;
                    Object.setPrototypeOf(this, AddonError.prototype);
                }
            }
            exports.AddonError = AddonError;
            var Page;
            (function (Page)
            {
                Page["Background"] = "/background.html";
                Page["Options"] = "/pages/options.html";
                Page["Popup"] = "/pages/popup.html";
                Page["Redirector"] = "/pages/redirector.html";
                Page["Solution"] = "/pages/solution.html";
            })(Page = exports.Page || (exports.Page = {}));
            var Icons;
            (function (Icons)
            {
                Icons["Default"] = "/images/addon-128.png";
                Icons["Dimmed"] = "/images/addon-128-dimmed.png";
            })(Icons = exports.Icons || (exports.Icons = {}));
            var ProxyMode;
            (function (ProxyMode)
            {
                ProxyMode["ON"] = "on";
                ProxyMode["OFF"] = "off";
                ProxyMode["AUTO"] = "auto";
            })(ProxyMode = exports.ProxyMode || (exports.ProxyMode = {}));
            var Schema;
            (function (Schema)
            {
                Schema["Http"] = "http";
                Schema["Https"] = "https";
            })(Schema = exports.Schema || (exports.Schema = {}));
            var WebStoreURL;
            (function (WebStoreURL)
            {
                WebStoreURL["Chrome"] = "https://chrome.google.com/webstore/detail/fddjpichkajmnkjhcmpbbjdmmcodnkej?hl=ru";
                WebStoreURL["ChromeDev"] = "https://chrome.google.com/webstore/detail/akhjaahaikfamildeibdbmlgimfekanm?hl=ru";
                WebStoreURL["Firefox"] = "https://addons.mozilla.org/firefox/addon/rutracker-add-on/";
            })(WebStoreURL = exports.WebStoreURL || (exports.WebStoreURL = {}));
            var BrowserName;
            (function (BrowserName)
            {
                BrowserName["Chrome"] = "chrome";
                BrowserName["Firefox"] = "firefox";
            })(BrowserName = exports.BrowserName || (exports.BrowserName = {}));
            var BuildType;
            (function (BuildType)
            {
                BuildType["Dev"] = "dev";
                BuildType["Prod"] = "prod";
            })(BuildType = exports.BuildType || (exports.BuildType = {}));
            var HeaderNames;
            (function (HeaderNames)
            {
                HeaderNames["AddonData"] = "BB-WebExt";
                HeaderNames["AddonProxyValidity"] = "BB-Addon-Proxy";
                HeaderNames["AddonSiteId"] = "X-BB-ID";
            })(HeaderNames = exports.HeaderNames || (exports.HeaderNames = {}));
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const instances_1 = __webpack_require__(7);
            class AbstractModule
            {
                get log()
                {
                    if (!this._log)
                    {
                        this._log = instances_1.createLogger(this.moduleName);
                    }
                    return this._log;
                }
                constructor(moduleName)
                {
                    this.moduleName = moduleName;
                }
            }
            exports.AbstractModule = AbstractModule;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const utils_1 = __webpack_require__(0);
            exports.manifest = chrome.runtime.getManifest();
            exports.pchrome = new utils_1.PromisifiedChrome();
            exports.supports = new utils_1.Supports();
            exports.chromeStorage = new utils_1.ChromeStorage();
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const common_1 = __webpack_require__(4);
            const config_domain_1 = __webpack_require__(8);
            const types_1 = __webpack_require__(2);
            const utils_1 = __webpack_require__(0);
            exports.DEBUG = !!utils_1.LocalStorage.get(utils_1.StorageKey.Debug);
            const defaultSettings = {
                addContextMenu: true,
                proxyMode: types_1.ProxyMode.ON,
                schema: config_domain_1.schema,
                sld: config_domain_1.sld,
                tld: config_domain_1.tld,
            };
            exports.config = {
                defaultSettings,
                devUrlRegex: config_domain_1.devUrlRegex,
                isDevVersion: common_1.manifest.name.endsWith('(dev)'),
                mainDomain: config_domain_1.mainDomain,
                mainSLD: config_domain_1.sld,
                mainTLD: config_domain_1.tld,
                proxiedDomains: config_domain_1.proxiedDomains,
                proxies: config_domain_1.proxies,
                proxyScriptURL: 'proxyScript.js',
                redirectorURL: chrome.extension.getURL(types_1.Page.Redirector),
                settingsVersion: 2,
                supportPageUrl: `https://${config_domain_1.mainDomain}/forum/addon.php`,
                useDevDomain: config_domain_1.useDevDomain,
                warnIfMissingPermissions: false,
            };
            exports.refLinks = {
                optionsVpn: `https://${config_domain_1.mainDomain}/forum/go2.php?pl=9`,
                popupVpn: `https://${config_domain_1.mainDomain}/forum/go2.php?pl=8`,
            };
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const AbstractModule_1 = __webpack_require__(3);
            const utils_1 = __webpack_require__(0);
            class AbstractPageApp extends AbstractModule_1.AbstractModule
            {
                constructor(moduleName, win)
                {
                    super(moduleName);
                    this.querySelector = document.querySelector;
                    this.querySelectorAll = document.querySelectorAll;
                    this.window = win;
                    this.chrome = win.chrome;
                    this.document = win.document;
                    this.querySelector = win.document.querySelector.bind(win.document);
                    this.querySelectorAll = win.document.querySelectorAll.bind(win.document);
                    const rawQueryString = win.location.search;
                    this.queryString = new utils_1.QueryString(rawQueryString);
                }
            }
            exports.AbstractPageApp = AbstractPageApp;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const config_1 = __webpack_require__(5);
            const Logger_1 = __webpack_require__(15);
            exports.logger = new Logger_1.Logger(config_1.DEBUG);
            const loggers = {};
            function createLogger(label)
            {
                if (!loggers.hasOwnProperty(label))
                {
                    loggers[label] = exports.logger.create(label);
                }
                return loggers[label];
            }
            exports.createLogger = createLogger;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const types_1 = __webpack_require__(2);
            const utils_1 = __webpack_require__(0);
            exports.useDevDomain = utils_1.LocalStorage.supported ? !!utils_1.LocalStorage.get(utils_1.StorageKey.UseDevDomain) : false;
            exports.devUrlRegex = /^https?:\/\/(\w+\.)?torrents\.loc\//;
            exports.schema = types_1.Schema.Https;
            exports.sld = exports.useDevDomain ? 'torrents' : 'rutracker';
            exports.tld = exports.useDevDomain ? 'loc' : 'org';
            exports.proxies = exports.useDevDomain ? ['HTTPS proxy71.torrents.loc:443'] : ['HTTPS ps1.blockme.site:443'];
            exports.mainDomain = `${exports.sld}.${exports.tld}`;
            exports.proxiedDomains = [
                exports.mainDomain,
                'skladchik.com',
            ];
            exports.origins = {
                allUrls: [
                    '<all_urls>',
                ],
                mainDomain: [
                    `*://${exports.mainDomain}/*`,
                ],
            };
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const random_string_1 = __webpack_require__(10);
            const background_1 = __webpack_require__(1);
            const AbstractModule_1 = __webpack_require__(3);
            const AddonLiveReload_1 = __webpack_require__(19);
            const BrowserAction_1 = __webpack_require__(20);
            const common_1 = __webpack_require__(4);
            const config_1 = __webpack_require__(5);
            const ContextMenu_1 = __webpack_require__(21);
            const ErrorHandler_1 = __webpack_require__(22);
            const instances_1 = __webpack_require__(7);
            const Messaging_1 = __webpack_require__(23);
            const OptionsPage_1 = __webpack_require__(24);
            const Permissions_1 = __webpack_require__(25);
            const PopupPage_1 = __webpack_require__(26);
            const ProxyAuto_1 = __webpack_require__(27);
            const ProxyController_1 = __webpack_require__(29);
            const ProxyOnRequest_1 = __webpack_require__(30);
            const ProxyPAC_1 = __webpack_require__(31);
            const ProxyScript_1 = __webpack_require__(32);
            const RedirectorPage_1 = __webpack_require__(33);
            const Settings_1 = __webpack_require__(34);
            const SolutionPage_1 = __webpack_require__(35);
            const types_1 = __webpack_require__(2);
            const utils_1 = __webpack_require__(0);
            const WebRequest_1 = __webpack_require__(36);
            class App extends AbstractModule_1.AbstractModule
            {
                constructor()
                {
                    super(App.name);
                    this.AddonError = types_1.AddonError;
                    this.browser = new utils_1.BrowserDetails(navigator.userAgent);
                    this.browserAction = new BrowserAction_1.BrowserAction();
                    this.contextMenu = new ContextMenu_1.ContextMenu();
                    this.errorHandler = new ErrorHandler_1.ErrorHandler();
                    this.messaging = new Messaging_1.Messaging();
                    this.permissions = new Permissions_1.Permissions();
                    this.proxy = new ProxyController_1.ProxyController();
                    this.proxyAuto = new ProxyAuto_1.ProxyAuto();
                    this.proxyOnRequest = new ProxyOnRequest_1.ProxyOnRequest();
                    this.proxyPAC = new ProxyPAC_1.ProxyPAC();
                    this.proxyScript = new ProxyScript_1.ProxyScript();
                    this.settings = new Settings_1.Settings();
                    this.webRequest = new WebRequest_1.WebRequest();
                    this._proxyIsEnabled = false;
                    if ('addonBackgroundApp' in window)
                    {
                        throw new Error('Unexpected call to App.constructor(): App is already initialized');
                    }
                    this.messagingResponseCallback = this.messaging.responseCallback.bind(this.messaging);
                }
                get proxyIsEnabled()
                {
                    return this._proxyIsEnabled;
                }
                set proxyIsEnabled(value)
                {
                    this._proxyIsEnabled = value;
                    this.log(`proxyIsEnabled: ${value}`);
                    this.browserAction.reload();
                }
                async createPageApp(pageName, pageWindow)
                {
                    switch (pageName)
                    {
                        case types_1.Page.Options:
                            return new OptionsPage_1.OptionsPage(pageWindow);
                        case types_1.Page.Popup:
                            return new PopupPage_1.PopupPage(pageWindow);
                        case types_1.Page.Redirector:
                            return new RedirectorPage_1.RedirectorPage(pageWindow);
                        case types_1.Page.Solution:
                            return new SolutionPage_1.SolutionPage(pageWindow);
                        default:
                            throw new Error(`Invalid pageName: ${pageName}`);
                    }
                }
                getAddonVersionText()
                {
                    let version = common_1.manifest.version;
                    if (config_1.config.isDevVersion)
                    {
                        version = `${version}.dev`;
                    }
                    if (this.extensionInfo.installType === 'development')
                    {
                        version = `${version}.TMP`;
                    }
                    return version;
                }
                getSupportPageUrl(params)
                {
                    const url = new utils_1.Url(config_1.config.supportPageUrl);
                    const commonParams = {
                        addonUid: background_1.app.addonUid,
                        addonVersion: common_1.manifest.version,
                        browserName: background_1.app.browser.name,
                        browserVersion: background_1.app.browser.version,
                        proxyMode: background_1.app.settings.get('proxyMode'),
                    };
                    const result = url.addParams(Object.assign({}, commonParams, params));
                    return result;
                }
                async init()
                {
                    instances_1.logger.consoleClear();
                    instances_1.logger.consoleGroup('Background [init]');
                    utils_1.registerEventListener(chrome.runtime.onInstalled, this.firstInstallHandler.bind(this));
                    this.log('browser: %o', this.browser);
                    await this.initExtensionInfo();
                    await this.initAddonUid();
                    this.errorHandler.init();
                    await this.permissions.init();
                    this.messaging.init();
                    await this.initSettings();
                    instances_1.logger.initBackgroundLogging();
                    this.webRequest.init();
                    await this.initProxy();
                    this.contextMenu.init();
                    await instances_1.logger.enableDebugInDevelopmentEnv();
                    await this.initLiveReload();
                    this.reopenTabAfterReload();
                    this.handleVersionUpgrades();
                    this.log('Background loaded [%s]', new Date());
                    instances_1.logger.consoleGroupEnd();
                }
                openOptionsPage()
                {
                    chrome.runtime.openOptionsPage();
                }
                async reloadProxiedTabs()
                {
                    this.log('Reloading proxied tabs');
                    if (this.proxyIsEnabled)
                    {
                        if (this.errorHandler.hasProxyError())
                        {
                            this.log('reloadProxiedTabs(): hasProxyError');
                            return;
                        }
                    }
                    const queryInfo = {};
                    queryInfo.active = true;
                    const tabs = await common_1.pchrome.tabs.query(queryInfo);
                    for (const tab of tabs)
                    {
                        if (tab.url && this.settings.isProxiedUrl(tab.url))
                        {
                            this.log(`Reloading tab ${tab.id}: ${tab.url}`);
                            await common_1.pchrome.tabs.reload(tab.id, { bypassCache: true });
                        }
                    }
                }
                firstInstallHandler(details)
                {
                    console.log(`chrome.runtime.onInstalled: { reason: ${details.reason} }`);
                    if (details.reason === 'install')
                    {
                        const welcomePageOpened = utils_1.LocalStorage.get(utils_1.StorageKey.WelcomePageOpened);
                        if (!welcomePageOpened)
                        {
                            utils_1.LocalStorage.set(utils_1.StorageKey.WelcomePageOpened, true);
                            const delayMs = 3000;
                            console.log(`setTimeout(openWelcomePage, ${delayMs})`);
                            setTimeout(() =>
                            {
                                this.openWelcomePage();
                            }, delayMs);
                        }
                    }
                }
                handleVersionUpgrades()
                {
                    let isUpgraded = false;
                    const actualVersion = this.extensionInfo.version;
                    const previousVersion = utils_1.LocalStorage.get(utils_1.StorageKey.AddonVersion);
                    if (previousVersion !== null)
                    {
                        if (actualVersion !== previousVersion)
                        {
                            isUpgraded = true;
                        }
                    }
                    if (isUpgraded)
                    {
                        this.log(`Addon was upgraded from ${previousVersion} to ${actualVersion}: %o`, Object.assign({}, this.extensionInfo));
                    }
                    utils_1.LocalStorage.set(utils_1.StorageKey.AddonVersion, actualVersion);
                }
                async initAddonUid()
                {
                    const pattern = /^[a-zA-Z0-9]{12}$/;
                    const { [utils_1.StorageKey.AddonUid]: loadedAddonUid } = await common_1.chromeStorage.get(utils_1.StorageKey.AddonUid);
                    if (loadedAddonUid !== undefined && pattern.test(loadedAddonUid))
                    {
                        this.addonUid = loadedAddonUid;
                        return;
                    }
                    const addonUid = random_string_1.generateRandomString(12);
                    if (!pattern.test(addonUid))
                    {
                        console.error(`Invalid addonUid: ${addonUid}`);
                        return;
                    }
                    this.addonUid = addonUid;
                    this.log(`Saving generated addonUid: ${this.addonUid}`);
                    await common_1.chromeStorage.set({ [utils_1.StorageKey.AddonUid]: this.addonUid });
                }
                async initExtensionInfo()
                {
                    this.extensionInfo = await common_1.pchrome.management.getSelf();
                }
                async initLiveReload()
                {
                    if (this.extensionInfo.installType !== 'development')
                    {
                        return;
                    }
                    if (typeof chrome.runtime.getPackageDirectoryEntry !== 'function')
                    {
                        return;
                    }
                    if (utils_1.LocalStorage.get(utils_1.StorageKey.LiveReloadDisabled))
                    {
                        this.log('Live reload is disabled');
                        return;
                    }
                    this.liveReloader = new AddonLiveReload_1.AddonLiveReload();
                    this.liveReloader.init();
                }
                async initProxy()
                {
                    try
                    {
                        await this.proxy.init();
                    }
                    catch (error)
                    {
                        this.errorHandler.handle(error);
                    }
                    finally
                    {
                        this.browserAction.reload();
                    }
                }
                async initSettings()
                {
                    instances_1.logger.consoleGroup('Settings [init]');
                    await this.settings.init();
                    instances_1.logger.consoleGroupEnd();
                }
                openWelcomePage()
                {
                    const url = this.getSupportPageUrl({
                        addonEvent: 'installed',
                        addonSrc: 'bg',
                    });
                    console.log(url);
                    chrome.tabs.create({ url });
                }
                reopenTabAfterReload()
                {
                    const url = utils_1.LocalStorage.get(utils_1.StorageKey.ReopenAfterReload);
                    utils_1.LocalStorage.remove(utils_1.StorageKey.ReopenAfterReload);
                    if (!url || !/^https?:\/\//.test(url))
                    {
                        return;
                    }
                    setTimeout(() =>
                    {
                        chrome.tabs.create({ url, active: true });
                    }, 1000);
                }
            }
            exports.App = App;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            /**
             * Generate a random string from a range of 62 characters.
             * @param {number} length - The length of the desired string.
             * @return {string} - The randomly generated string.
             */
            function generateRandomString(length)
            {
                if (length < 0)
                {
                    throw new Error('Length must be a positive number.');
                }
                if (!Number.isInteger(length))
                {
                    throw new Error(`Length must be an integer.`);
                }
                const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let output = '';
                for (let i = 0; i < length; i++)
                {
                    output += possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)];
                }
                return output;
            }
            exports.generateRandomString = generateRandomString;
            //# sourceMappingURL=index.js.map
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            const strictUriEncode = __webpack_require__(12);
            const decodeComponent = __webpack_require__(13);
            const splitOnFirst = __webpack_require__(14);

            function encoderForArrayFormat(options)
            {
                switch (options.arrayFormat)
                {
                    case 'index':
                        return key => (result, value) =>
                        {
                            const index = result.length;
                            if (value === undefined)
                            {
                                return result;
                            }

                            if (value === null)
                            {
                                return [...result, [encode(key, options), '[', index, ']'].join('')];
                            }

                            return [
                                ...result,
                                [encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
                            ];
                        };

                    case 'bracket':
                        return key => (result, value) =>
                        {
                            if (value === undefined)
                            {
                                return result;
                            }

                            if (value === null)
                            {
                                return [...result, [encode(key, options), '[]'].join('')];
                            }

                            return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
                        };

                    case 'comma':
                        return key => (result, value, index) =>
                        {
                            if (value === null || value === undefined || value.length === 0)
                            {
                                return result;
                            }

                            if (index === 0)
                            {
                                return [[encode(key, options), '=', encode(value, options)].join('')];
                            }

                            return [[result, encode(value, options)].join(',')];
                        };

                    default:
                        return key => (result, value) =>
                        {
                            if (value === undefined)
                            {
                                return result;
                            }

                            if (value === null)
                            {
                                return [...result, encode(key, options)];
                            }

                            return [...result, [encode(key, options), '=', encode(value, options)].join('')];
                        };
                }
            }

            function parserForArrayFormat(options)
            {
                let result;

                switch (options.arrayFormat)
                {
                    case 'index':
                        return (key, value, accumulator) =>
                        {
                            result = /\[(\d*)\]$/.exec(key);

                            key = key.replace(/\[\d*\]$/, '');

                            if (!result)
                            {
                                accumulator[key] = value;
                                return;
                            }

                            if (accumulator[key] === undefined)
                            {
                                accumulator[key] = {};
                            }

                            accumulator[key][result[1]] = value;
                        };

                    case 'bracket':
                        return (key, value, accumulator) =>
                        {
                            result = /(\[\])$/.exec(key);
                            key = key.replace(/\[\]$/, '');

                            if (!result)
                            {
                                accumulator[key] = value;
                                return;
                            }

                            if (accumulator[key] === undefined)
                            {
                                accumulator[key] = [value];
                                return;
                            }

                            accumulator[key] = [].concat(accumulator[key], value);
                        };

                    case 'comma':
                        return (key, value, accumulator) =>
                        {
                            const isArray = typeof value === 'string' && value.split('').indexOf(',') > -1;
                            const newValue = isArray ? value.split(',') : value;
                            accumulator[key] = newValue;
                        };

                    default:
                        return (key, value, accumulator) =>
                        {
                            if (accumulator[key] === undefined)
                            {
                                accumulator[key] = value;
                                return;
                            }

                            accumulator[key] = [].concat(accumulator[key], value);
                        };
                }
            }

            function encode(value, options)
            {
                if (options.encode)
                {
                    return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
                }

                return value;
            }

            function decode(value, options)
            {
                if (options.decode)
                {
                    return decodeComponent(value);
                }

                return value;
            }

            function keysSorter(input)
            {
                if (Array.isArray(input))
                {
                    return input.sort();
                }

                if (typeof input === 'object')
                {
                    return keysSorter(Object.keys(input))
                        .sort((a, b) => Number(a) - Number(b))
                        .map(key => input[key]);
                }

                return input;
            }

            function removeHash(input)
            {
                const hashStart = input.indexOf('#');
                if (hashStart !== -1)
                {
                    input = input.slice(0, hashStart);
                }

                return input;
            }

            function extract(input)
            {
                input = removeHash(input);
                const queryStart = input.indexOf('?');
                if (queryStart === -1)
                {
                    return '';
                }

                return input.slice(queryStart + 1);
            }

            function parse(input, options)
            {
                options = Object.assign({
                    decode: true,
                    sort: true,
                    arrayFormat: 'none',
                    parseNumbers: false,
                    parseBooleans: false
                }, options);

                const formatter = parserForArrayFormat(options);

                // Create an object with no prototype
                const ret = Object.create(null);

                if (typeof input !== 'string')
                {
                    return ret;
                }

                input = input.trim().replace(/^[?#&]/, '');

                if (!input)
                {
                    return ret;
                }

                for (const param of input.split('&'))
                {
                    let [key, value] = splitOnFirst(param.replace(/\+/g, ' '), '=');

                    // Missing `=` should be `null`:
                    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
                    value = value === undefined ? null : decode(value, options);

                    if (options.parseNumbers && !Number.isNaN(Number(value)))
                    {
                        value = Number(value);
                    } else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false'))
                    {
                        value = value.toLowerCase() === 'true';
                    }

                    formatter(decode(key, options), value, ret);
                }

                if (options.sort === false)
                {
                    return ret;
                }

                return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) =>
                {
                    const value = ret[key];
                    if (Boolean(value) && typeof value === 'object' && !Array.isArray(value))
                    {
                        // Sort object keys, not values
                        result[key] = keysSorter(value);
                    } else
                    {
                        result[key] = value;
                    }

                    return result;
                }, Object.create(null));
            }

            exports.extract = extract;
            exports.parse = parse;

            exports.stringify = (object, options) =>
            {
                if (!object)
                {
                    return '';
                }

                options = Object.assign({
                    encode: true,
                    strict: true,
                    arrayFormat: 'none'
                }, options);

                const formatter = encoderForArrayFormat(options);
                const keys = Object.keys(object);

                if (options.sort !== false)
                {
                    keys.sort(options.sort);
                }

                return keys.map(key =>
                {
                    const value = object[key];

                    if (value === undefined)
                    {
                        return '';
                    }

                    if (value === null)
                    {
                        return encode(key, options);
                    }

                    if (Array.isArray(value))
                    {
                        return value
                            .reduce(formatter(key), [])
                            .join('&');
                    }

                    return encode(key, options) + '=' + encode(value, options);
                }).filter(x => x.length > 0).join('&');
            };

            exports.parseUrl = (input, options) =>
            {
                return {
                    url: removeHash(input).split('?')[0] || '',
                    query: parse(extract(input), options)
                };
            };
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            module.exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            var token = '%[a-f0-9]{2}';
            var singleMatcher = new RegExp(token, 'gi');
            var multiMatcher = new RegExp('(' + token + ')+', 'gi');

            function decodeComponents(components, split)
            {
                try
                {
                    // Try to decode the entire string first
                    return decodeURIComponent(components.join(''));
                } catch (err)
                {
                    // Do nothing
                }

                if (components.length === 1)
                {
                    return components;
                }

                split = split || 1;

                // Split the array in 2 parts
                var left = components.slice(0, split);
                var right = components.slice(split);

                return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
            }

            function decode(input)
            {
                try
                {
                    return decodeURIComponent(input);
                } catch (err)
                {
                    var tokens = input.match(singleMatcher);

                    for (var i = 1; i < tokens.length; i++)
                    {
                        input = decodeComponents(tokens, i).join('');

                        tokens = input.match(singleMatcher);
                    }

                    return input;
                }
            }

            function customDecodeURIComponent(input)
            {
                // Keep track of all the replacements and prefill the map with the `BOM`
                var replaceMap = {
                    '%FE%FF': '\uFFFD\uFFFD',
                    '%FF%FE': '\uFFFD\uFFFD'
                };

                var match = multiMatcher.exec(input);
                while (match)
                {
                    try
                    {
                        // Decode as big chunks as possible
                        replaceMap[match[0]] = decodeURIComponent(match[0]);
                    } catch (err)
                    {
                        var result = decode(match[0]);

                        if (result !== match[0])
                        {
                            replaceMap[match[0]] = result;
                        }
                    }

                    match = multiMatcher.exec(input);
                }

                // Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
                replaceMap['%C2'] = '\uFFFD';

                var entries = Object.keys(replaceMap);

                for (var i = 0; i < entries.length; i++)
                {
                    // Replace all decoded components
                    var key = entries[i];
                    input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
                }

                return input;
            }

            module.exports = function (encodedURI)
            {
                if (typeof encodedURI !== 'string')
                {
                    throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
                }

                try
                {
                    encodedURI = encodedURI.replace(/\+/g, ' ');

                    // Try the built in decoder first
                    return decodeURIComponent(encodedURI);
                } catch (err)
                {
                    // Fallback to a more advanced decoder
                    return customDecodeURIComponent(encodedURI);
                }
            };
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";
            module.exports = (string, separator) =>
            {
                if (!(typeof string === 'string' && typeof separator === 'string'))
                {
                    throw new TypeError('Expected the arguments to be of type `string`');
                }

                if (separator === '')
                {
                    return [string];
                }

                const separatorIndex = string.indexOf(separator);

                if (separatorIndex === -1)
                {
                    return [string];
                }

                return [
                    string.slice(0, separatorIndex),
                    string.slice(separatorIndex + separator.length)
                ];
            };
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const debugLogger = __webpack_require__(16);
            const common_1 = __webpack_require__(4);
            const utils_1 = __webpack_require__(0);
            const colors = [
                '#00C78C',
                '#33A1C9',
                '#388E8E',
                '#6495ED',
                '#6E7B8B',
                '#7171C6',
                '#7D9EC0',
                '#8B5F65',
                '#9AC0CD',
                '#B0C4DE',
                '#B8860B',
                '#BA55D3',
                '#C5C1AA',
                '#C67171',
                '#CD8C95',
                '#D8BFD8',
                '#DA70D6',
                '#DAA520',
                '#DB7093',
                '#FF3E96',
                '#FF83FA',
            ];
            const colorsCount = colors.length;
            let colorIndex = 0;
            function getColor()
            {
                const color = colors[colorIndex];
                colorIndex += 1;
                if (colorIndex >= colorsCount)
                {
                    colorIndex = 0;
                }
                return color;
            }
            debugLogger.formatters.t = (value) =>
            {
                return !!value ? '✓' : '✖✖✖ FAIL ✖✖✖';
            };
            debugLogger.enable('*');
            function noopLogger()
            {
                return function noop() { };
            }
            class Logger
            {
                constructor(enabled)
                {
                    this.enabled = enabled;
                }
                consoleClear()
                {
                    if (this.enabled)
                    {
                        console.clear();
                    }
                }
                consoleGroup(groupTitle, collapse = false)
                {
                    if (this.enabled)
                    {
                        collapse ? console.groupCollapsed(groupTitle) : console.group(groupTitle);
                    }
                }
                consoleGroupEnd()
                {
                    if (this.enabled)
                    {
                        console.groupEnd();
                    }
                }
                create(label)
                {
                    if (!this.enabled)
                    {
                        return noopLogger;
                    }
                    const color = getColor();
                    const namespacedLogger = debugLogger(label);
                    namespacedLogger.color = color;
                    return namespacedLogger;
                }
                async enableDebugInDevelopmentEnv()
                {
                    const extensionInfo = await common_1.pchrome.management.getSelf();
                    if (extensionInfo.installType !== 'development')
                    {
                        return;
                    }
                    const alreadyInitialized = utils_1.LocalStorage.get(utils_1.StorageKey.Debug) !== null;
                    if (!alreadyInitialized)
                    {
                        this.enableDebugMode();
                    }
                }
                initBackgroundLogging()
                {
                    if (!this.enabled)
                    {
                        return;
                    }
                    chrome.storage.onChanged.addListener((changes, namespace) =>
                    {
                        for (const key of Object.keys(changes))
                        {
                            const oldValue = changes[key].oldValue;
                            const newValue = changes[key].newValue;
                            if (!utils_1.isEqual(oldValue, newValue))
                            {
                                console.log('storage.onChanged {Info} %s[%s]: %o -> %o', namespace, key, oldValue, newValue);
                            }
                        }
                    });
                }
                enableDebugMode()
                {
                    utils_1.LocalStorage.set(utils_1.StorageKey.Debug, 1);
                    if (utils_1.LocalStorage.get(utils_1.StorageKey.Debug) !== null)
                    {
                        console.log('Debug mode was enabled: reload addon to see logs');
                        return;
                    }
                    console.error('Cannot enable debug mode');
                }
            }
            exports.Logger = Logger;
        }),

        (function (module, exports, __webpack_require__)
        {

            /**
             * This is the web browser implementation of `debug()`.
             *
             * Expose `debug()` as the module.
             */

            exports = module.exports = __webpack_require__(17);
            exports.log = log;
            exports.formatArgs = formatArgs;
            exports.save = save;
            exports.load = load;
            exports.useColors = useColors;
            exports.storage = 'undefined' != typeof chrome
                && 'undefined' != typeof chrome.storage
                ? chrome.storage.local
                : localstorage();

            /**
             * Colors.
             */

            exports.colors = [
                '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
                '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
                '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
                '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
                '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
                '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
                '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
                '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
                '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
                '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
                '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
            ];

            /**
             * Currently only WebKit-based Web Inspectors, Firefox >= v31,
             * and the Firebug extension (any Firefox version) are known
             * to support "%c" CSS customizations.
             *
             * TODO: add a `localStorage` variable to explicitly enable/disable colors
             */

            function useColors()
            {
                // NB: In an Electron preload script, document will be defined but not fully
                // initialized. Since we know we're in Chrome, we'll just detect this case
                // explicitly
                if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer')
                {
                    return true;
                }

                // Internet Explorer and Edge do not support colors.
                if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
                {
                    return false;
                }

                // is webkit? http://stackoverflow.com/a/16459606/376773
                // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
                return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
                    // is firebug? http://stackoverflow.com/a/398120/376773
                    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
                    // is firefox >= v31?
                    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
                    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
                    // double check webkit in userAgent just in case we are in a worker
                    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
            }

            /**
             * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
             */

            exports.formatters.j = function (v)
            {
                try
                {
                    return JSON.stringify(v);
                } catch (err)
                {
                    return '[UnexpectedJSONParseError]: ' + err.message;
                }
            };
            /**
             * Colorize log arguments if enabled.
             *
             * @api public
             */

            function formatArgs(args)
            {
                var useColors = this.useColors;

                args[0] = (useColors ? '%c' : '')
                    + this.namespace
                    + (useColors ? ' %c' : ' ')
                    + args[0]
                    + (useColors ? '%c ' : ' ')
                    + '+' + exports.humanize(this.diff);

                if (!useColors) return;

                var c = 'color: ' + this.color;
                args.splice(1, 0, c, 'color: inherit')

                // the final "%c" is somewhat tricky, because there could be other
                // arguments passed either before or after the %c, so we need to
                // figure out the correct index to insert the CSS into
                var index = 0;
                var lastC = 0;
                args[0].replace(/%[a-zA-Z%]/g, function (match)
                {
                    if ('%%' === match) return;
                    index++;
                    if ('%c' === match)
                    {
                        // we only are interested in the *last* %c
                        // (the user may have provided their own)
                        lastC = index;
                    }
                });

                args.splice(lastC, 0, c);
            }

            /**
             * Invokes `console.log()` when available.
             * No-op when `console.log` is not a "function".
             *
             * @api public
             */

            function log()
            {
                // this hackery is required for IE8/9, where
                // the `console.log` function doesn't have 'apply'
                return 'object' === typeof console
                    && console.log
                    && Function.prototype.apply.call(console.log, console, arguments);
            }

            /**
             * Save `namespaces`.
             *
             * @param {String} namespaces
             * @api private
             */

            function save(namespaces)
            {
                try
                {
                    if (null == namespaces)
                    {
                        exports.storage.removeItem('debug');
                    } else
                    {
                        exports.storage.debug = namespaces;
                    }
                } catch (e) { }
            }

            /**
             * Load `namespaces`.
             *
             * @return {String} returns the previously persisted debug modes
             * @api private
             */

            function load()
            {
                var r;
                try
                {
                    r = exports.storage.debug;
                } catch (e) { }

                // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
                if (!r && "undefined" !== 'undefined' && 'env' in undefined)
                {
                    r = undefined.env.DEBUG;
                }

                return r;
            }

            /**
             * Enable namespaces listed in `localStorage.debug` initially.
             */

            exports.enable(load());

            /**
             * Localstorage attempts to return the localstorage.
             *
             * This is necessary because safari throws
             * when a user disables cookies/localstorage
             * and you attempt to access it.
             *
             * @return {LocalStorage}
             * @api private
             */

            function localstorage()
            {
                try
                {
                    return window.localStorage;
                } catch (e) { }
            }
        }),

        (function (module, exports, __webpack_require__)
        {
            /**
             * This is the common logic for both the Node.js and web browser
             * implementations of `debug()`.
             *
             * Expose `debug()` as the module.
             */

            exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
            exports.coerce = coerce;
            exports.disable = disable;
            exports.enable = enable;
            exports.enabled = enabled;
            exports.humanize = __webpack_require__(18);

            /**
             * Active `debug` instances.
             */
            exports.instances = [];

            /**
             * The currently active debug mode names, and names to skip.
             */

            exports.names = [];
            exports.skips = [];

            /**
             * Map of special "%n" handling functions, for the debug "format" argument.
             *
             * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
             */

            exports.formatters = {};

            /**
             * Select a color.
             * @param {String} namespace
             * @return {Number}
             * @api private
             */

            function selectColor(namespace)
            {
                var hash = 0, i;

                for (i in namespace)
                {
                    hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
                    hash |= 0; // Convert to 32bit integer
                }

                return exports.colors[Math.abs(hash) % exports.colors.length];
            }

            /**
             * Create a debugger with the given `namespace`.
             *
             * @param {String} namespace
             * @return {Function}
             * @api public
             */

            function createDebug(namespace)
            {

                var prevTime;

                function debug()
                {
                    // disabled?
                    if (!debug.enabled) return;

                    var self = debug;

                    // set `diff` timestamp
                    var curr = +new Date();
                    var ms = curr - (prevTime || curr);
                    self.diff = ms;
                    self.prev = prevTime;
                    self.curr = curr;
                    prevTime = curr;

                    // turn the `arguments` into a proper Array
                    var args = new Array(arguments.length);
                    for (var i = 0; i < args.length; i++)
                    {
                        args[i] = arguments[i];
                    }

                    args[0] = exports.coerce(args[0]);

                    if ('string' !== typeof args[0])
                    {
                        // anything else let's inspect with %O
                        args.unshift('%O');
                    }

                    // apply any `formatters` transformations
                    var index = 0;
                    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format)
                    {
                        // if we encounter an escaped % then don't increase the array index
                        if (match === '%%') return match;
                        index++;
                        var formatter = exports.formatters[format];
                        if ('function' === typeof formatter)
                        {
                            var val = args[index];
                            match = formatter.call(self, val);

                            // now we need to remove `args[index]` since it's inlined in the `format`
                            args.splice(index, 1);
                            index--;
                        }
                        return match;
                    });

                    // apply env-specific formatting (colors, etc.)
                    exports.formatArgs.call(self, args);

                    var logFn = debug.log || exports.log || console.log.bind(console);
                    logFn.apply(self, args);
                }

                debug.namespace = namespace;
                debug.enabled = exports.enabled(namespace);
                debug.useColors = exports.useColors();
                debug.color = selectColor(namespace);
                debug.destroy = destroy;

                // env-specific initialization logic for debug instances
                if ('function' === typeof exports.init)
                {
                    exports.init(debug);
                }

                exports.instances.push(debug);

                return debug;
            }

            function destroy()
            {
                var index = exports.instances.indexOf(this);
                if (index !== -1)
                {
                    exports.instances.splice(index, 1);
                    return true;
                } else
                {
                    return false;
                }
            }

            /**
             * Enables a debug mode by namespaces. This can include modes
             * separated by a colon and wildcards.
             *
             * @param {String} namespaces
             * @api public
             */

            function enable(namespaces)
            {
                exports.save(namespaces);

                exports.names = [];
                exports.skips = [];

                var i;
                var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
                var len = split.length;

                for (i = 0; i < len; i++)
                {
                    if (!split[i]) continue; // ignore empty strings
                    namespaces = split[i].replace(/\*/g, '.*?');
                    if (namespaces[0] === '-')
                    {
                        exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
                    } else
                    {
                        exports.names.push(new RegExp('^' + namespaces + '$'));
                    }
                }

                for (i = 0; i < exports.instances.length; i++)
                {
                    var instance = exports.instances[i];
                    instance.enabled = exports.enabled(instance.namespace);
                }
            }

            /**
             * Disable debug output.
             *
             * @api public
             */

            function disable()
            {
                exports.enable('');
            }

            /**
             * Returns true if the given mode name is enabled, false otherwise.
             *
             * @param {String} name
             * @return {Boolean}
             * @api public
             */

            function enabled(name)
            {
                if (name[name.length - 1] === '*')
                {
                    return true;
                }
                var i, len;
                for (i = 0, len = exports.skips.length; i < len; i++)
                {
                    if (exports.skips[i].test(name))
                    {
                        return false;
                    }
                }
                for (i = 0, len = exports.names.length; i < len; i++)
                {
                    if (exports.names[i].test(name))
                    {
                        return true;
                    }
                }
                return false;
            }

            /**
             * Coerce `val`.
             *
             * @param {Mixed} val
             * @return {Mixed}
             * @api private
             */

            function coerce(val)
            {
                if (val instanceof Error) return val.stack || val.message;
                return val;
            }
        }),

        (function (module, exports)
        {

            /**
             * Helpers.
             */

            var s = 1000;
            var m = s * 60;
            var h = m * 60;
            var d = h * 24;
            var y = d * 365.25;

            /**
             * Parse or format the given `val`.
             *
             * Options:
             *
             *  - `long` verbose formatting [false]
             *
             * @param {String|Number} val
             * @param {Object} [options]
             * @throws {Error} throw an error if val is not a non-empty string or a number
             * @return {String|Number}
             * @api public
             */

            module.exports = function (val, options)
            {
                options = options || {};
                var type = typeof val;
                if (type === 'string' && val.length > 0)
                {
                    return parse(val);
                } else if (type === 'number' && isNaN(val) === false)
                {
                    return options.long ? fmtLong(val) : fmtShort(val);
                }
                throw new Error(
                    'val is not a non-empty string or a valid number. val=' +
                    JSON.stringify(val)
                );
            };

            /**
             * Parse the given `str` and return milliseconds.
             *
             * @param {String} str
             * @return {Number}
             * @api private
             */

            function parse(str)
            {
                str = String(str);
                if (str.length > 100)
                {
                    return;
                }
                var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
                    str
                );
                if (!match)
                {
                    return;
                }
                var n = parseFloat(match[1]);
                var type = (match[2] || 'ms').toLowerCase();
                switch (type)
                {
                    case 'years':
                    case 'year':
                    case 'yrs':
                    case 'yr':
                    case 'y':
                        return n * y;
                    case 'days':
                    case 'day':
                    case 'd':
                        return n * d;
                    case 'hours':
                    case 'hour':
                    case 'hrs':
                    case 'hr':
                    case 'h':
                        return n * h;
                    case 'minutes':
                    case 'minute':
                    case 'mins':
                    case 'min':
                    case 'm':
                        return n * m;
                    case 'seconds':
                    case 'second':
                    case 'secs':
                    case 'sec':
                    case 's':
                        return n * s;
                    case 'milliseconds':
                    case 'millisecond':
                    case 'msecs':
                    case 'msec':
                    case 'ms':
                        return n;
                    default:
                        return undefined;
                }
            }

            /**
             * Short format for `ms`.
             *
             * @param {Number} ms
             * @return {String}
             * @api private
             */

            function fmtShort(ms)
            {
                if (ms >= d)
                {
                    return Math.round(ms / d) + 'd';
                }
                if (ms >= h)
                {
                    return Math.round(ms / h) + 'h';
                }
                if (ms >= m)
                {
                    return Math.round(ms / m) + 'm';
                }
                if (ms >= s)
                {
                    return Math.round(ms / s) + 's';
                }
                return ms + 'ms';
            }

            /**
             * Long format for `ms`.
             *
             * @param {Number} ms
             * @return {String}
             * @api private
             */

            function fmtLong(ms)
            {
                return plural(ms, d, 'day') ||
                    plural(ms, h, 'hour') ||
                    plural(ms, m, 'minute') ||
                    plural(ms, s, 'second') ||
                    ms + ' ms';
            }

            /**
             * Pluralization helper.
             */

            function plural(ms, n, name)
            {
                if (ms < n)
                {
                    return;
                }
                if (ms < n * 1.5)
                {
                    return Math.floor(ms / n) + ' ' + name;
                }
                return Math.ceil(ms / n) + ' ' + name + 's';
            }
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            class AddonLiveReload
            {
                constructor()
                {
                    this.currentDump = '';
                    this.debug = false;
                    this.detectOngoingChangesInterval = 350;
                    this.generatedDir = '/bundle/';
                    this.generatedFiles = [];
                    this.referenceDump = '';
                    this.reloadDelay = 1000;
                    this.storageKey = 'liveReloadRestoreData';
                    this.timestampRegExp = /:lmt:\d+:/g;
                    this.watchInterval = 1000;
                }
                init()
                {
                    setTimeout(this.restoreClosedTabsAfterReload.bind(this), 500);
                    setTimeout(this.startWatching.bind(this), 3000);
                }
                addTimestamp(filePath, timestamp)
                {
                    return `${filePath}:lmt:${timestamp}:`;
                }
                async getDirEntries(entry)
                {
                    const reader = entry.createReader();
                    return new Promise(resolve =>
                    {
                        reader.readEntries(entries =>
                        {
                            resolve(entries);
                        });
                    });
                }
                async getExtensionDirDump()
                {
                    const rootDirEntry = await this.getExtensionDirEntry();
                    const fileList = await this.getExtensionFileList(rootDirEntry);
                    if (!this.referenceDump)
                    {
                        this.generatedFiles = this.getGeneratedFiles(fileList);
                    }
                    const dump = fileList.join();
                    return dump;
                }
                async getExtensionDirEntry()
                {
                    return new Promise((resolve, reject) =>
                    {
                        chrome.runtime.getPackageDirectoryEntry(result =>
                        {
                            return chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(result);
                        });
                    });
                }
                async getExtensionFileList(dirEntry, list = [])
                {
                    const entries = await this.getDirEntries(dirEntry);
                    for (const entry of entries)
                    {
                        if (entry.isDirectory)
                        {
                            await this.getExtensionFileList(entry, list);
                        }
                        else
                        {
                            const lastModifiedTime = await this.getLastModifiedTime(entry);
                            const filePath = this.normalizePath(entry.fullPath);
                            if (filePath === '/manifest.json')
                            {
                                continue;
                            }
                            const filePathWithTimestamp = this.addTimestamp(filePath, lastModifiedTime);
                            list.push(filePathWithTimestamp);
                        }
                    }
                    return list;
                }
                getGeneratedFiles(fileList)
                {
                    const result = [];
                    for (const filePathWithTimestamp of fileList)
                    {
                        if (filePathWithTimestamp.startsWith(this.generatedDir))
                        {
                            const filePath = this.stripTimestamp(filePathWithTimestamp);
                            result.push(filePath);
                        }
                    }
                    return result;
                }
                async getLastModifiedTime(entry)
                {
                    return new Promise(resolve =>
                    {
                        entry.file((fileInfo) =>
                        {
                            resolve(fileInfo.lastModified.toString());
                        });
                    });
                }
                getOptionsPageUrl()
                {
                    const manifest = chrome.runtime.getManifest();
                    return 'options_ui' in manifest ? chrome.extension.getURL(manifest.options_ui.page) : '';
                }
                getPopupUrl()
                {
                    const manifest = chrome.runtime.getManifest();
                    return 'browser_action' in manifest && 'default_popup' in manifest.browser_action
                        ? chrome.extension.getURL(manifest.browser_action.default_popup)
                        : '';
                }
                hasAllGeneratedFiles(fileDump)
                {
                    for (const file of this.generatedFiles)
                    {
                        if (!fileDump.includes(file))
                        {
                            return false;
                        }
                    }
                    return true;
                }
                normalizePath(extensionFilePath)
                {
                    const normalized = extensionFilePath.replace(/\/crxfs\//g, '/');
                    return normalized;
                }
                reloadAddon()
                {
                    clearTimeout(this.watcherTimeoutId);
                    const reloadUrls = [];
                    const reopenUrls = [];
                    const addonPages = [this.getOptionsPageUrl(), this.getPopupUrl()];
                    if (this.debug)
                    {
                        console.log('reload');
                    }
                    chrome.tabs.query({}, tabs =>
                    {
                        for (const tab of tabs)
                        {
                            if (addonPages.includes(tab.url))
                            {
                                reopenUrls.push(tab.url);
                                continue;
                            }
                            if (tab.active && !tab.url.startsWith('chrome://extensions'))
                            {
                                reloadUrls.push(tab.url);
                            }
                        }
                        this.saveBeforeReload({ reloadUrls, reopenUrls });
                        chrome.runtime.reload();
                    });
                }
                restoreClosedTabsAfterReload()
                {
                    const data = JSON.parse(localStorage.getItem(this.storageKey));
                    localStorage.removeItem(this.storageKey);
                    if (data == null)
                    {
                        return;
                    }
                    for (const reloadUrl of data.reloadUrls)
                    {
                        chrome.tabs.query({ url: reloadUrl }, tabs =>
                        {
                            for (const reloadTab of tabs)
                            {
                                chrome.tabs.reload(reloadTab.id, { bypassCache: true });
                            }
                        });
                    }
                    for (const reopenUrl of data.reopenUrls)
                    {
                        chrome.tabs.create({ url: reopenUrl, active: true });
                    }
                }
                saveBeforeReload(data)
                {
                    localStorage.setItem(this.storageKey, JSON.stringify(data));
                }
                async startWatching()
                {
                    this.referenceDump = await this.getExtensionDirDump();
                    console.log('ExtensionReloader: start watching');
                    await this.watchForChanges();
                }
                stripTimestamp(filePathWithTimestamp)
                {
                    return filePathWithTimestamp.replace(this.timestampRegExp, '');
                }
                async watchForChanges()
                {
                    this.currentDump = await this.getExtensionDirDump();
                    if (this.currentDump !== this.referenceDump && this.hasAllGeneratedFiles(this.currentDump))
                    {
                        this.referenceDump = (' ' + this.currentDump).slice(1);
                        this.watchInterval = this.detectOngoingChangesInterval;
                        clearTimeout(this.reloadTimeoutId);
                        this.reloadTimeoutId = window.setTimeout(this.reloadAddon.bind(this), this.reloadDelay);
                        if (this.debug)
                        {
                            console.log('timeout-RELOAD');
                        }
                    }
                    this.watcherTimeoutId = window.setTimeout(this.watchForChanges.bind(this), this.watchInterval);
                    if (this.debug)
                    {
                        console.log('timeout-watch');
                    }
                }
            }
            exports.AddonLiveReload = AddonLiveReload;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const background_1 = __webpack_require__(1);
            const AbstractModule_1 = __webpack_require__(3);
            const types_1 = __webpack_require__(2);
            class BrowserAction extends AbstractModule_1.AbstractModule
            {
                constructor()
                {
                    super(BrowserAction.name);
                    this.hasError = false;
                    this.hasVisibleWarnings = false;
                    this.supported =
                        'setIcon' in chrome.browserAction &&
                        'setBadgeText' in chrome.browserAction &&
                        'setBadgeBackgroundColor' in chrome.browserAction;
                }
                reload()
                {
                    const hasProxyError = background_1.app.errorHandler.hasProxyError();
                    this.hasError = hasProxyError;
                    this.hasVisibleWarnings = background_1.app.errorHandler.hasVisibleWarnings();
                    if (background_1.app.proxyIsEnabled)
                    {
                        if (hasProxyError)
                        {
                            this.setDimmedIcon();
                        }
                        else
                        {
                            this.setDefaultIcon();
                        }
                    }
                    else
                    {
                        this.setDimmedIcon();
                    }
                    if (this.hasError)
                    {
                        this.setErrorBadge();
                    }
                    else if (this.hasVisibleWarnings)
                    {
                        this.setWarningBadge();
                    }
                    else
                    {
                        this.setDefaultBadge();
                    }
                }
                removeBadge()
                {
                    if (this.supported)
                    {
                        chrome.browserAction.setBadgeText({ text: '' });
                        this.log('removeBadge()');
                    }
                }
                setBadge(text, color)
                {
                    if (this.supported)
                    {
                        chrome.browserAction.setBadgeText({ text });
                        chrome.browserAction.setBadgeBackgroundColor({ color });
                    }
                }
                setDefaultBadge()
                {
                    this.removeBadge();
                }
                setDefaultIcon()
                {
                    if (this.supported)
                    {
                        chrome.browserAction.setIcon({ path: types_1.Icons.Default });
                        this.log('setDefaultIcon()');
                    }
                }
                setDimmedIcon()
                {
                    if (this.supported)
                    {
                        chrome.browserAction.setIcon({ path: types_1.Icons.Dimmed });
                        this.log('setDimmedIcon()');
                    }
                }
                setErrorBadge()
                {
                    this.setBadge(' ERR ', '#e60000');
                    this.log('setErrorBadgeText()');
                }
                setWarningBadge()
                {
                    this.setBadge('WRN', '#e60000');
                    this.log('setWarningBadge()');
                }
            }
            exports.BrowserAction = BrowserAction;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const background_1 = __webpack_require__(1);
            const AbstractModule_1 = __webpack_require__(3);
            var MenuIds;
            (function (MenuIds)
            {
                MenuIds["Search"] = "search";
            })(MenuIds || (MenuIds = {}));
            class ContextMenu extends AbstractModule_1.AbstractModule
            {
                constructor()
                {
                    super(ContextMenu.name);
                    this.maxQueryLength = 100;
                    this.menus = new Set();
                    this.supported =
                        'contextMenus' in chrome &&
                        'create' in chrome.contextMenus &&
                        'removeAll' in chrome.contextMenus;
                }
                createSearchTab(searchQuery)
                {
                    const query = encodeURIComponent(searchQuery);
                    const preferredUrl = background_1.app.settings.getPreferredUrl();
                    let url = `${preferredUrl}forum/tracker.php`;
                    if (query.length)
                    {
                        url = `${url}?nm=${query}`;
                    }
                    chrome.tabs.create({ url });
                }
                init()
                {
                    this.reload();
                }
                reload()
                {
                    this.remove();
                    const isEnabled = background_1.app.settings.get('addContextMenu');
                    if (isEnabled)
                    {
                        this.create();
                    }
                }
                cleanSearchQuery(selectedText)
                {
                    let query = selectedText;
                    query = query.replace(/[*"|]/g, ' ');
                    query = query.replace(/\s+/g, ' ');
                    query = query.trim().substr(0, this.maxQueryLength);
                    return query;
                }
                create()
                {
                    if (!this.supported)
                    {
                        return;
                    }
                    chrome.contextMenus.create({
                        contexts: ['selection'],
                        id: MenuIds.Search,
                        onclick: this.searchMenuClickHandler.bind(this),
                        title: '在 Rutracker 上搜索',
                    }, () =>
                    {
                        this.menus.add(MenuIds.Search);
                        this.log(`menu created: ${MenuIds.Search}`);
                    });
                }
                remove()
                {
                    if (!this.supported)
                    {
                        return;
                    }
                    if (this.menus.size)
                    {
                        chrome.contextMenus.removeAll(() =>
                        {
                            this.menus.clear();
                            this.log('context menus removed');
                        });
                    }
                }
                searchMenuClickHandler(info)
                {
                    const query = this.cleanSearchQuery(info.selectionText);
                    this.createSearchTab(query);
                }
            }
            exports.ContextMenu = ContextMenu;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const background_1 = __webpack_require__(1);
            const AbstractModule_1 = __webpack_require__(3);
            const types_1 = __webpack_require__(2);
            const utils_1 = __webpack_require__(0);
            const openSolutionButton1 = '<div class="error-handler open-solution-button">Что делать и как исправить?</div>';
            const hideWarningButton = '<button class="error-handler hide-warning" title="Скрыть и больше не показывать">✖</button>';
            const errorMessages = Object.create(null);
            errorMessages[types_1.ErrorCode.UnexpectedError] = 'Unexpected error';
            let c;
            c = types_1.ErrorCode.ProxyPacConflict;
            errorMessages[c] = `
	<div id="${c}">Невозможно включить прокси! Настройки браузера контролируются другим плагином</div>
	${openSolutionButton1}
`;
            c = types_1.ErrorCode.InvalidProxyDetected;
            errorMessages[c] = `
	<div id="${c}">Обнаружено использование неизвестного прокси</div>
	${openSolutionButton1}
`;
            c = types_1.ErrorCode.MissingAccessToAllUrls;
            errorMessages[c] = `
	<div id="${c}">${hideWarningButton}
		Плагин работает в ограниченном режиме.<br>
		Для включения всех функций необходимо получить разрешение.
	</div>
	${openSolutionButton1}
`;
            class ErrorHandler extends AbstractModule_1.AbstractModule
            {
                constructor()
                {
                    super(ErrorHandler.name);
                    this.proxyErrors = [types_1.ErrorCode.ProxyPacConflict, types_1.ErrorCode.InvalidProxyDetected];
                    this.errors = new Set();
                    this.hiddenWarnings = new Set();
                    this.warnings = new Set();
                }
                addWarning(code)
                {
                    this.warnings.add(code);
                    background_1.app.browserAction.reload();
                }
                clearAllHiddenWarnings()
                {
                    this.hiddenWarnings.clear();
                    utils_1.LocalStorage.remove(utils_1.StorageKey.HiddenWarnings);
                    background_1.app.browserAction.reload();
                }
                clearError(code)
                {
                    if (this.hasError(code))
                    {
                        this.errors.delete(code);
                        background_1.app.browserAction.reload();
                    }
                }
                clearWarning(code)
                {
                    if (this.hasWarning(code))
                    {
                        this.warnings.delete(code);
                        this.hiddenWarnings.delete(code);
                        this.saveHiddenWarnings();
                        background_1.app.browserAction.reload();
                    }
                }
                getErrorMessageHTML(code)
                {
                    return errorMessages[code];
                }
                getErrorMessagesHTML(errorCodes = [])
                {
                    const messages = [];
                    this.errors.forEach(code =>
                    {
                        if (errorCodes.length && !errorCodes.includes(code))
                        {
                            return;
                        }
                        messages.push(this.getErrorMessageHTML(code));
                    });
                    return '<ul><li class="error-message">' + messages.join('</li><li>') + '</li></ul>';
                }
                getWarningMessagesHTML(errorCodes)
                {
                    const messages = [];
                    this.warnings.forEach(code =>
                    {
                        if (errorCodes.length && !errorCodes.includes(code))
                        {
                            return;
                        }
                        messages.push(this.getErrorMessageHTML(code));
                    });
                    return '<ul><li class="warning-message">' + messages.join('</li><li>') + '</li></ul>';
                }
                handle(error)
                {
                    if (!(error instanceof Error))
                    {
                        console.error(error);
                        return;
                    }
                    if (!this.isAddonError(error))
                    {
                        console.error(error);
                        return;
                    }
                    const code = error.code;
                    if (code === types_1.ErrorCode.InvalidProxyDetected)
                    {
                        if (this.hasError(types_1.ErrorCode.ProxyPacConflict))
                        {
                            return;
                        }
                    }
                    this.addError(code);
                    switch (code)
                    {
                        case types_1.ErrorCode.UnexpectedError:
                            console.error(error);
                            break;
                        default:
                            this.log('Error handled: %s', code);
                            chrome.runtime.sendMessage(['error_handled'], background_1.app.messagingResponseCallback);
                    }
                }
                hasError(code)
                {
                    return this.errors.has(code);
                }
                hasErrors()
                {
                    return !!this.errors.size;
                }
                hasHiddenWarnings()
                {
                    return !!this.hiddenWarnings.size;
                }
                hasProxyError()
                {
                    return this.errors.has(types_1.ErrorCode.ProxyPacConflict) || this.errors.has(types_1.ErrorCode.InvalidProxyDetected);
                }
                hasVisibleWarnings()
                {
                    return !!this.filterWarnings('visible').length;
                }
                hasWarning(code)
                {
                    return this.warnings.has(code);
                }
                init()
                {
                    this.loadHiddenWarnings();
                }
                isAddonError(error)
                {
                    return error instanceof Error && error.constructor.name === types_1.AddonError.name;
                }
                registerButtonListeners(pageWindow, url = '')
                {
                    pageWindow.document.body.addEventListener('click', this.buttonClickHandler.bind(this, pageWindow, url));
                }
                renderErrorsHtml(element, errorCodes = [])
                {
                    const html = this.getErrorMessagesHTML(errorCodes);
                    utils_1.DOM.setHtml(element, html);
                }
                renderWarningsHTML(element, visibility)
                {
                    const errorCodes = this.filterWarnings(visibility);
                    if (errorCodes.length)
                    {
                        const html = this.getWarningMessagesHTML(errorCodes);
                        utils_1.DOM.setHtml(element, html);
                    }
                }
                addError(code)
                {
                    this.errors.add(code);
                    background_1.app.browserAction.reload();
                }
                buttonClickHandler(pageWindow, url = '', event)
                {
                    const clickedElement = event.target;
                    if (!clickedElement.classList.contains('error-handler'))
                    {
                        return;
                    }
                    const isPopupPage = pageWindow.addonPagePathname === types_1.Page.Popup;
                    let closeWindow = false;
                    if (clickedElement.classList.contains('open-solution-button'))
                    {
                        const errorCode = clickedElement.previousElementSibling.id;
                        this.openSolutionPage(errorCode, url);
                        closeWindow = isPopupPage;
                    }
                    if (clickedElement.classList.contains('hide-warning'))
                    {
                        const errorCode = clickedElement.parentElement.id;
                        this.hideWarning(errorCode);
                        closeWindow = isPopupPage;
                    }
                    if (clickedElement.classList.contains('request-permission'))
                    {
                        const functionality = clickedElement.dataset.functionality;
                        background_1.app.permissions.requestFor(functionality, pageWindow);
                    }
                    if (closeWindow)
                    {
                        pageWindow.close();
                    }
                }
                filterWarnings(visibility)
                {
                    switch (visibility)
                    {
                        case 'all':
                            return Array.from(this.warnings);
                        case 'hidden':
                            return Array.from(this.hiddenWarnings);
                        case 'visible':
                            return Array.from(this.warnings).filter(code => !this.hiddenWarnings.has(code));
                        default:
                            throw new Error(`Invalid visibility: ${visibility}`);
                    }
                }
                getSolutionUrl(errorCode, url = '')
                {
                    return chrome.extension.getURL(`${types_1.Page.Solution}?errorCode=${errorCode}&url=${encodeURIComponent(url)}`);
                }
                hideWarning(errorCode)
                {
                    this.hiddenWarnings.add(errorCode);
                    this.saveHiddenWarnings();
                    background_1.app.browserAction.reload();
                    chrome.runtime.sendMessage(['hidden_warnings_changed'], background_1.app.messagingResponseCallback);
                }
                loadHiddenWarnings()
                {
                    const hiddenWarnings = utils_1.LocalStorage.get(utils_1.StorageKey.HiddenWarnings);
                    if (!Array.isArray(hiddenWarnings))
                    {
                        return;
                    }
                    const errorCodes = Object.values(types_1.ErrorCode);
                    for (const code of hiddenWarnings)
                    {
                        if (errorCodes.includes(code))
                        {
                            this.hiddenWarnings.add(code);
                        }
                    }
                }
                openSolutionPage(errorCode, url)
                {
                    switch (errorCode)
                    {
                        case types_1.ErrorCode.MissingAccessToAllUrls:
                            background_1.app.openOptionsPage();
                            break;
                        case types_1.ErrorCode.InvalidProxyDetected:
                        case types_1.ErrorCode.ProxyPacConflict:
                            const solutionUrl = this.getSolutionUrl(errorCode, url);
                            chrome.tabs.create({ url: solutionUrl });
                            break;
                        default:
                            throw new Error(`Invalid errorCode: ${errorCode}`);
                    }
                }
                saveHiddenWarnings()
                {
                    utils_1.LocalStorage.set(utils_1.StorageKey.HiddenWarnings, Array.from(this.hiddenWarnings));
                }
            }
            exports.ErrorHandler = ErrorHandler;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const background_1 = __webpack_require__(1);
            const AbstractModule_1 = __webpack_require__(3);
            const instances_1 = __webpack_require__(7);
            const utils_1 = __webpack_require__(0);
            const logProxyScript = instances_1.logger.create('proxyScript.js');
            class Messaging extends AbstractModule_1.AbstractModule
            {
                constructor()
                {
                    super(Messaging.name);
                }
                init()
                {
                    utils_1.registerEventListener(chrome.runtime.onMessage, this.messageListener.bind(this));
                }
                responseCallback(response)
                {
                    let errorMessage = chrome.runtime.lastError ? chrome.runtime.lastError.message : '';
                    if (response === undefined)
                    {
                        const ignored = [
                            'Could not establish connection. Receiving end does not exist.',
                        ];
                        if (ignored.includes(errorMessage))
                        {
                            errorMessage = '';
                        }
                    }
                    if (errorMessage)
                    {
                        console.error(errorMessage);
                    }
                }
                async messageListener(message, sender, sendResponse)
                {
                    const task = message[0];
                    const data = message[1];
                    switch (task)
                    {
                        case 'from_proxy_script':
                            logProxyScript('%O', data);
                            if (data === 'init_proxy_script')
                            {
                                await background_1.app.proxy.reload();
                            }
                            break;
                        default:
                            this.log('%j, %o', [task, data], sender);
                            sendResponse([this.moduleName, message, sender]);
                    }
                }
            }
            exports.Messaging = Messaging;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const background_1 = __webpack_require__(1);
            const AbstractPageApp_1 = __webpack_require__(6);
            const common_1 = __webpack_require__(4);
            const config_1 = __webpack_require__(5);
            const types_1 = __webpack_require__(2);
            const utils_1 = __webpack_require__(0);
            let elements;
            class OptionsPage extends AbstractPageApp_1.AbstractPageApp
            {
                constructor(pageWindow)
                {
                    super(OptionsPage.name, pageWindow);
                    this.log(`${this.constructor.name} loaded [%s]`, new Date());
                }
                async init()
                {
                    await background_1.app.settings.adjustCurrentSettings();
                    this.initHtmlElements();
                    this.reloadHtmlElements();
                    this.registerEventListeners();
                    utils_1.registerEventListener(this.chrome.runtime.onMessage, this.messageListener.bind(this));
                    utils_1.DOM.show(elements.body);
                    this.log(`${this.constructor.name} loaded [%s]`, new Date());
                }
                adjustElementsAccordingToPermissions()
                {
                    if (!background_1.app.permissions.granted('accessToAllUrls'))
                    {
                        Array.from(this.querySelectorAll('.missing-permission.accessToAllUrls')).forEach(element => utils_1.DOM.show(element));
                    }
                    utils_1.DOM.show(elements.restoreHiddenWarnings, background_1.app.errorHandler.hasHiddenWarnings());
                    background_1.app.permissions.printAllActive(elements.activePermissions);
                }
                handleProxyToggling(proxyMode)
                {
                    elements.proxyMode.classList.remove('has-proxy-error');
                    utils_1.DOM.hide(elements.proxyErrorDesc);
                    const proxyIsEnabled = proxyMode !== types_1.ProxyMode.OFF;
                    if (proxyIsEnabled)
                    {
                        if (background_1.app.errorHandler.hasProxyError())
                        {
                            elements.proxyMode.classList.add('has-proxy-error');
                            utils_1.DOM.show(elements.proxyErrorDesc);
                            background_1.app.errorHandler.renderErrorsHtml(elements.proxyErrorDesc, background_1.app.errorHandler.proxyErrors);
                        }
                    }
                    for (const elementName of ['schema', 'sld', 'tld'])
                    {
                        const element = elements[elementName];
                        if (proxyIsEnabled || !background_1.app.permissions.granted('accessToAllUrls'))
                        {
                            element.value = element.dataset.default;
                            element.disabled = true;
                        }
                        else
                        {
                            element.disabled = false;
                        }
                    }
                    const autoProxyOption = this.querySelector('#autoProxyOption');
                    if (autoProxyOption)
                    {
                        autoProxyOption.disabled = !background_1.app.permissions.granted('accessToAllUrls');
                    }
                }
                initHtmlElements()
                {
                    elements = {
                        activePermissions: this.querySelector('#activePermissions'),
                        addContextMenu: this.querySelector('#addContextMenu'),
                        body: this.querySelector('body'),
                        exceptionMessage: this.querySelector('#exceptionMessage'),
                        proxyErrorDesc: this.querySelector('#proxy-error-desc'),
                        proxyMode: this.querySelector('#proxyMode'),
                        restoreHiddenWarnings: this.querySelector('#restoreHiddenWarnings'),
                        save: this.querySelector('#save'),
                        schema: this.querySelector('#schema'),
                        sld: this.querySelector('#sld'),
                        tld: this.querySelector('#tld'),
                    };
                    if (common_1.supports.webExtProxy)
                    {
                        this.querySelector('#autoProxyOption').remove();
                        this.querySelector('#proxy-mode-desc').remove();
                    }
                    this.querySelector('#addonVersion').innerText = background_1.app.getAddonVersionText();
                    for (const element of this.querySelectorAll('a.supportPageUrl'))
                    {
                        element.href = background_1.app.getSupportPageUrl({
                            addonEvent: 'click',
                            addonSrc: 'options',
                        });
                    }
                    this.querySelector('#optionsVpn').href = config_1.refLinks.optionsVpn;
                    this.showBrowserSpecificElements();
                }
                isCheckbox(element)
                {
                    return element.type === 'checkbox';
                }
                messageListener(message, sender, sendResponse)
                {
                    const event = message[0];
                    switch (event)
                    {
                        case 'chrome_proxy_settings_changed':
                        case 'error_handled':
                        case 'hidden_warnings_changed':
                        case 'permission_changed':
                        case 'setting_changed':
                            this.log(`messageListener: { event: ${event} }`);
                            this.reloadHtmlElements();
                            break;
                    }
                    sendResponse([this.moduleName, message, sender]);
                }
                registerEventListeners()
                {
                    elements.save.addEventListener('click', this.saveSettings.bind(this));
                    elements.restoreHiddenWarnings.addEventListener('click', this.restoreHiddenWarnings.bind(this));
                    elements.proxyMode.addEventListener('change', this.toggleProxy.bind(this));
                    background_1.app.errorHandler.registerButtonListeners(this.window);
                    this.querySelector('#explain-accessToAllUrls').addEventListener('click', () =>
                    {
                        utils_1.DOM.hide(this.querySelector('#explain-accessToAllUrls'));
                        utils_1.DOM.show(this.querySelector('#accessToAllUrls-desc-long'));
                    });
                    this.querySelector('#toggleActivePermissions').addEventListener('click', () =>
                    {
                        utils_1.DOM.toggle(elements.activePermissions);
                    });
                    this.querySelector('#proxyModeTipTitle').addEventListener('click', () =>
                    {
                        utils_1.DOM.toggle(this.querySelector('#proxyModeTipBody'));
                    });
                }
                reloadHtmlElements()
                {
                    this.resetElementState();
                    this.setElementValues();
                }
                resetElementState()
                {
                    elements.save.classList.remove('saved');
                    for (const element of this.querySelectorAll('.invalid'))
                    {
                        element.classList.remove('invalid');
                    }
                    for (const element of this.querySelectorAll('.missing-permission'))
                    {
                        utils_1.DOM.hide(element);
                    }
                }
                restoreHiddenWarnings()
                {
                    background_1.app.errorHandler.clearAllHiddenWarnings();
                    this.reloadHtmlElements();
                }
                async saveSettings()
                {
                    const newSettings = {};
                    const invalidInputs = [];
                    for (const key of Object.keys(config_1.config.defaultSettings))
                    {
                        const element = elements[key];
                        element.classList.remove('invalid');
                        const value = this.isCheckbox(element) ? element.checked : element.value;
                        if (!background_1.app.settings.isValid(key, value))
                        {
                            invalidInputs.push(element);
                            continue;
                        }
                        newSettings[key] = value;
                    }
                    if (invalidInputs.length)
                    {
                        for (const invalidInput of invalidInputs)
                        {
                            invalidInput.classList.add('invalid');
                        }
                        invalidInputs[0].focus();
                        return;
                    }
                    try
                    {
                        elements.exceptionMessage.innerHTML = '';
                        await background_1.app.settings.set(newSettings);
                        await background_1.app.settings.adjustCurrentSettings();
                        await background_1.app.reloadProxiedTabs();
                    }
                    catch (error)
                    {
                        background_1.app.errorHandler.handle(error);
                        switch (error.code)
                        {
                            case types_1.ErrorCode.ProxyPacConflict:
                            case types_1.ErrorCode.InvalidProxyDetected:
                                break;
                            default:
                                console.error(error);
                                utils_1.DOM.show(elements.exceptionMessage);
                                elements.exceptionMessage.innerText = error.toString();
                        }
                    }
                    finally
                    {
                        this.reloadHtmlElements();
                        if (!background_1.app.errorHandler.hasErrors())
                        {
                            elements.save.classList.add('saved');
                            setTimeout(() =>
                            {
                                elements.save.classList.remove('saved');
                            }, 2000);
                        }
                    }
                }
                setElementValues()
                {
                    elements.addContextMenu.checked = background_1.app.settings.get('addContextMenu');
                    elements.addContextMenu.dataset.default = config_1.config.defaultSettings.addContextMenu.toString();
                    elements.proxyMode.value = background_1.app.settings.get('proxyMode');
                    elements.proxyMode.dataset.default = config_1.config.defaultSettings.proxyMode;
                    this.handleProxyToggling(elements.proxyMode.value);
                    elements.schema.value = background_1.app.settings.get('schema');
                    elements.schema.dataset.default = config_1.config.defaultSettings.schema;
                    elements.sld.value = background_1.app.settings.get('sld');
                    elements.sld.dataset.default = config_1.config.defaultSettings.sld;
                    elements.tld.value = background_1.app.settings.get('tld');
                    elements.tld.dataset.default = config_1.config.defaultSettings.tld;
                    this.adjustElementsAccordingToPermissions();
                }
                showBrowserSpecificElements()
                {
                    const nodeList = this.querySelectorAll(`.${background_1.app.browser.name}`);
                    Array.from(nodeList).forEach(element => utils_1.DOM.show(element));
                }
                toggleProxy(event)
                {
                    const element = event.target;
                    this.handleProxyToggling(element.value);
                }
            }
            exports.OptionsPage = OptionsPage;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const background_1 = __webpack_require__(1);
            const AbstractModule_1 = __webpack_require__(3);
            const common_1 = __webpack_require__(4);
            const config_1 = __webpack_require__(5);
            const config_domain_1 = __webpack_require__(8);
            const types_1 = __webpack_require__(2);
            const utils_1 = __webpack_require__(0);
            class Permissions extends AbstractModule_1.AbstractModule
            {
                constructor()
                {
                    super(Permissions.name);
                    this.active = {};
                    this.permission = {
                        accessToAllUrls: {
                            errorCode: types_1.ErrorCode.MissingAccessToAllUrls,
                            granted: false,
                            permissions: { origins: config_domain_1.origins.allUrls },
                        },
                    };
                }
                granted(functionality)
                {
                    return this.permission[functionality].granted;
                }
                async init()
                {
                    this.registerEventListeners();
                    await this.reload();
                }
                printAllActive(element)
                {
                    const permissions = this.active;
                    permissions.origins = permissions.origins.filter(item =>
                    {
                        return !(item.startsWith('moz-extension://') || item.startsWith('chrome://'));
                    });
                    let text = JSON.stringify(permissions, null, '  ');
                    text = text.replace(/"/g, '');
                    element.innerText = text;
                    element.innerHTML = element.innerHTML.replace(/origins|permissions/g, '<b>$&</b>');
                }
                async reload()
                {
                    this.active = await common_1.pchrome.permissions.getAll();
                    this.log('active: %o', Object.assign({}, this.active));
                    this.reloadGrantedStatus();
                    if (config_1.config.warnIfMissingPermissions)
                    {
                        this.warnIfMissingImportantPermission();
                    }
                }
                requestFor(functionality, pageWindow)
                {
                    const permissions = this.permission[functionality].permissions;
                    pageWindow.chrome.permissions.request(permissions, async (granted) =>
                    {
                        await this.functionalityPermissionRequestHandler(functionality, granted);
                    });
                }
                async functionalityPermissionRequestHandler(functionality, granted)
                {
                    this.log(`requested for '${functionality}':${granted ? '' : ' NOT'} granted`);
                    if (granted)
                    {
                        switch (functionality)
                        {
                            case 'accessToAllUrls':
                                await background_1.app.settings.setDefaultSettings();
                                break;
                        }
                        await this.reloadAfterChange();
                    }
                }
                getFunctionalities()
                {
                    return Object.keys(this.permission);
                }
                isGranted(chromePermissions)
                {
                    if ('origins' in chromePermissions)
                    {
                        for (const origin of chromePermissions.origins)
                        {
                            if (!this.active.origins.includes(origin))
                            {
                                return false;
                            }
                        }
                    }
                    if ('permissions' in chromePermissions)
                    {
                        for (const permission of chromePermissions.permissions)
                        {
                            if (!this.active.permissions.includes(permission))
                            {
                                return false;
                            }
                        }
                    }
                    return true;
                }
                async permissionAddedListener(permissions)
                {
                    this.log('chrome.permissions.onAdded: %o', permissions);
                    await this.reloadAfterChange();
                }
                async permissionRemovedListener(permissions)
                {
                    this.log('chrome.permissions.onRemoved: %o', permissions);
                    await this.reloadAfterChange();
                }
                registerEventListeners()
                {
                    if ('onRemoved' in chrome.permissions)
                    {
                        utils_1.registerEventListener(chrome.permissions.onRemoved, this.permissionRemovedListener.bind(this));
                    }
                    if ('onAdded' in chrome.permissions)
                    {
                        utils_1.registerEventListener(chrome.permissions.onAdded, this.permissionAddedListener.bind(this));
                    }
                }
                async reloadAfterChange()
                {
                    await this.reload();
                    await background_1.app.settings.adjustCurrentSettings();
                    chrome.runtime.sendMessage(['permission_changed'], background_1.app.messagingResponseCallback);
                }
                reloadGrantedStatus()
                {
                    for (const functionality of this.getFunctionalities())
                    {
                        const permissions = this.permission[functionality].permissions;
                        this.permission[functionality].granted = this.isGranted(permissions);
                    }
                }
                warnIfMissingImportantPermission()
                {
                    for (const functionality of this.getFunctionalities())
                    {
                        switch (functionality)
                        {
                            case 'accessToAllUrls':
                                const permission = this.permission[functionality];
                                if (!permission.granted)
                                {
                                    background_1.app.errorHandler.addWarning(permission.errorCode);
                                }
                                else
                                {
                                    background_1.app.errorHandler.clearWarning(permission.errorCode);
                                }
                                break;
                        }
                    }
                }
            }
            exports.Permissions = Permissions;
        }),

        (function (module, exports, __webpack_require__)
        {
            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const background_1 = __webpack_require__(1);
            const AbstractPageApp_1 = __webpack_require__(6);
            const common_1 = __webpack_require__(4);
            const config_1 = __webpack_require__(5);
            const types_1 = __webpack_require__(2);
            const utils_1 = __webpack_require__(0);
            let elements;
            class PopupPage extends AbstractPageApp_1.AbstractPageApp
            {
                constructor(pageWindow)
                {
                    super(PopupPage.name, pageWindow);
                    this.log(`${this.constructor.name} loaded [%s]`, new Date());
                }
                async init()
                {
                    await background_1.app.settings.adjustCurrentSettings();
                    this.initHtmlElements();
                    this.reloadHtmlElements();
                    this.registerEventListeners();
                    utils_1.DOM.show(elements.body);
                    elements.searchQuery.focus();
                }
                initHtmlElements()
                {
                    elements = {
                        body: this.querySelector('body'),
                        errorMessages: this.querySelector('.errorMessages'),
                        exceptionMessage: this.querySelector('#exceptionMessage'),
                        main: this.querySelector('main'),
                        openOptionsPage: this.querySelector('#openOptionsPage'),
                        openSiteHomePage: this.querySelector('#openSiteHomePage'),
                        openSupportPage: this.querySelector('#openSupportPage'),
                        openVpnLink: this.querySelector('#openVpnLink'),
                        proxyMode: this.querySelector('#proxyMode'),
                        searchForm: this.querySelector('.searchForm'),
                        searchQuery: this.querySelector('.searchQuery'),
                        warningMessages: this.querySelector('.warningMessages'),
                    };
                    if (common_1.supports.webExtProxy)
                    {
                        elements.proxyMode.querySelector(`option[value="${types_1.ProxyMode.AUTO}"]`).remove();
                    }
                    elements.openOptionsPage.title += ` [${background_1.app.getAddonVersionText()}]`;
                }
                messageListener(message, sender, sendResponse)
                {
                    const event = message[0];
                    switch (event)
                    {
                        case 'chrome_proxy_settings_changed':
                        case 'error_handled':
                        case 'setting_changed':
                            this.log(`messageListener: { event: ${event} }`);
                            this.reloadHtmlElements();
                            break;
                    }
                    sendResponse([this.moduleName, message, sender]);
                }
                openOptionsPage()
                {
                    background_1.app.openOptionsPage();
                    this.window.close();
                }
                openSiteHomePage()
                {
                    const preferredUrl = background_1.app.settings.getPreferredUrl();
                    let url = `${preferredUrl}forum/index.php`;
                    const proxyIsDisabled = background_1.app.settings.proxyModeIs(types_1.ProxyMode.OFF);
                    const isProxiedUrl = background_1.app.settings.isProxiedUrl(url);
                    if (!proxyIsDisabled && isProxiedUrl)
                    {
                        url = `${url}?addon_rnd=${Math.random()}`;
                    }
                    chrome.tabs.create({ url });
                    this.window.close();
                }
                openSupportPage()
                {
                    const url = background_1.app.getSupportPageUrl({
                        addonEvent: 'click',
                        addonSrc: 'popup',
                    });
                    chrome.tabs.create({ url });
                    this.window.close();
                }
                openVpnLink()
                {
                    chrome.tabs.create({ url: config_1.refLinks.popupVpn });
                    this.window.close();
                }
                registerEventListeners()
                {
                    utils_1.registerEventListener(this.chrome.runtime.onMessage, this.messageListener.bind(this));
                    elements.openOptionsPage.addEventListener('click', this.openOptionsPage.bind(this));
                    elements.openSiteHomePage.addEventListener('click', this.openSiteHomePage.bind(this));
                    elements.openSupportPage.addEventListener('click', this.openSupportPage.bind(this));
                    elements.openVpnLink.addEventListener('click', this.openVpnLink.bind(this));
                    elements.searchForm.addEventListener('submit', this.searchHandler.bind(this));
                    elements.proxyMode.addEventListener('change', this.toggleProxy.bind(this));
                    background_1.app.errorHandler.registerButtonListeners(this.window);
                }
                reloadHtmlElements()
                {
                    this.resetElementState();
                    this.setElementValues();
                    this.setElementsVisibility();
                }
                resetElementState()
                {
                    elements.main.classList.remove('hasError');
                    elements.proxyMode.classList.remove('has-proxy-error');
                    elements.errorMessages.innerHTML = '';
                    elements.warningMessages.innerHTML = '';
                    elements.searchQuery.value = '';
                    elements.proxyMode.value = background_1.app.settings.get('proxyMode');
                }
                async saveSettings(newSettings)
                {
                    elements.exceptionMessage.innerHTML = '';
                    try
                    {
                        await background_1.app.settings.set(newSettings);
                        await background_1.app.settings.adjustCurrentSettings();
                        await background_1.app.reloadProxiedTabs();
                    }
                    catch (error)
                    {
                        background_1.app.errorHandler.handle(error);
                        switch (error.code)
                        {
                            case types_1.ErrorCode.ProxyPacConflict:
                            case types_1.ErrorCode.InvalidProxyDetected:
                                break;
                            default:
                                console.error(error);
                                utils_1.DOM.show(elements.exceptionMessage);
                                elements.exceptionMessage.innerText = error.toString();
                        }
                    }
                    finally
                    {
                        this.reloadHtmlElements();
                    }
                }
                searchHandler(event)
                {
                    event.preventDefault();
                    const query = elements.searchQuery.value;
                    background_1.app.contextMenu.createSearchTab(query);
                    this.window.close();
                }
                setElementValues()
                {
                    if (background_1.app.errorHandler.hasErrors())
                    {
                        background_1.app.errorHandler.renderErrorsHtml(elements.errorMessages);
                        elements.main.classList.add('hasError');
                    }
                    if (background_1.app.errorHandler.hasVisibleWarnings())
                    {
                        background_1.app.errorHandler.renderWarningsHTML(elements.warningMessages, 'visible');
                        elements.main.classList.add('hasError');
                    }
                }
                setElementsVisibility()
                {
                    const preferredDomain = background_1.app.settings.getPreferredDomain();
                    if (!background_1.app.settings.isProxiedDomain(preferredDomain))
                    {
                        elements.proxyMode.disabled = true;
                        elements.proxyMode.title = `不适用于${preferredDomain}`;
                    }
                }
                async toggleProxy(event)
                {
                    const element = event.target;
                    const proxyMode = element.value;
                    if (proxyMode === types_1.ProxyMode.AUTO)
                    {
                        if (!background_1.app.permissions.granted('accessToAllUrls'))
                        {
                            this.openOptionsPage();
                            return;
                        }
                    }
                    await this.saveSettings({ proxyMode });
                }
            }
            exports.PopupPage = PopupPage;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            var __decorate = (this && this.__decorate) || function (decorators, target, key, desc)
            {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            Object.defineProperty(exports, "__esModule", { value: true });
            const background_1 = __webpack_require__(1);
            const AbstractModule_1 = __webpack_require__(3);
            const common_1 = __webpack_require__(4);
            const decorators_1 = __webpack_require__(28);
            const utils_1 = __webpack_require__(0);
            class ProxyAuto extends AbstractModule_1.AbstractModule
            {
                constructor()
                {
                    super(ProxyAuto.name);
                    this.enabled = false;
                    this.tabActivatedHandler = this.tabActivated.bind(this);
                    this.windowFocusChangedHandler = this.windowFocusChanged.bind(this);
                }
                disable()
                {
                    if (!this.enabled)
                    {
                        return;
                    }
                    utils_1.unregisterEventListener(chrome.tabs.onActivated, this.tabActivatedHandler);
                    utils_1.unregisterEventListener(chrome.windows.onFocusChanged, this.windowFocusChangedHandler);
                    this.enabled = false;
                    this.log('disabled');
                }
                async enable(reloadActiveTab)
                {
                    if (this.enabled)
                    {
                        return;
                    }
                    utils_1.registerEventListener(chrome.tabs.onActivated, this.tabActivatedHandler);
                    utils_1.registerEventListener(chrome.windows.onFocusChanged, this.windowFocusChangedHandler);
                    this.enabled = true;
                    this.log('enabled');
                    if (!reloadActiveTab)
                    {
                        return;
                    }
                    const queryInfo = { active: true, lastFocusedWindow: true };
                    const tabs = await common_1.pchrome.tabs.query(queryInfo);
                    const tab = tabs[0];
                    if (!tab || !tab.id)
                    {
                        return;
                    }
                    await this.tabActivated({
                        tabId: tab.id,
                        windowId: tab.windowId,
                    });
                }
                async tabActivated(activeInfo)
                {
                    const tab = await common_1.pchrome.tabs.get(activeInfo.tabId);
                    this.log('tabActivated: %o', tab);
                    if (!tab || !tab.active || !tab.url)
                    {
                        return;
                    }
                    if (tab.url.startsWith('chrome-extension'))
                    {
                        return;
                    }
                    const isProxiedUrl = background_1.app.settings.isProxiedUrl(tab.url);
                    if (isProxiedUrl)
                    {
                        if (!background_1.app.proxyIsEnabled)
                        {
                            try
                            {
                                await background_1.app.proxyPAC.registerProxyPAC();
                            }
                            catch (error)
                            {
                                this.log(error);
                            }
                        }
                    }
                    else
                    {
                        if (background_1.app.proxyIsEnabled)
                        {
                            await background_1.app.proxyPAC.unregisterProxyPAC();
                        }
                    }
                }
                async windowFocusChanged(windowId)
                {
                    this.log('windowFocusChanged: %o', windowId);
                    if (windowId < 1)
                    {
                        return;
                    }
                    const queryInfo = { active: true, currentWindow: true };
                    const tabs = await common_1.pchrome.tabs.query(queryInfo);
                    const tab = tabs[0];
                    if (!tab || !tab.id)
                    {
                        return;
                    }
                    await this.tabActivated({
                        tabId: tab.id,
                        windowId: tab.windowId,
                    });
                }
            }
            __decorate([
                decorators_1.debounce(250)
            ], ProxyAuto.prototype, "tabActivated", null);
            exports.ProxyAuto = ProxyAuto;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            function createDecorator(mapFn)
            {
                return (_target, key, descriptor) =>
                {
                    let fnKey = null;
                    let fn = null;
                    if (typeof descriptor.value === 'function')
                    {
                        fnKey = 'value';
                        fn = descriptor.value;
                    }
                    else if (typeof descriptor.get === 'function')
                    {
                        fnKey = 'get';
                        fn = descriptor.get;
                    }
                    if (!fn)
                    {
                        throw new Error('not supported');
                    }
                    descriptor[fnKey] = mapFn(fn, key);
                };
            }
            function debounce(delay, reducer, initialValueProvider)
            {
                return createDecorator((fn, key) =>
                {
                    const timerKey = `$debounce$${key}`;
                    let result = initialValueProvider ? initialValueProvider() : void 0;
                    return function (...args)
                    {
                        clearTimeout(this[timerKey]);
                        if (reducer)
                        {
                            result = reducer(result, ...args);
                            args = [result];
                        }
                        this[timerKey] = setTimeout(() =>
                        {
                            fn.apply(this, args);
                            result = initialValueProvider ? initialValueProvider() : void 0;
                        }, delay);
                    };
                });
            }
            exports.debounce = debounce;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const background_1 = __webpack_require__(1);
            const AbstractModule_1 = __webpack_require__(3);
            const common_1 = __webpack_require__(4);
            const utils_1 = __webpack_require__(0);
            function proxyErrorHandler(error)
            {
                console.error(`Proxy error: ${error.message}; %o`, error);
            }
            class ProxyController extends AbstractModule_1.AbstractModule
            {
                constructor()
                {
                    super(ProxyController.name);
                }
                async init()
                {
                    this.registerErrorHandler();
                    await this.registerProxyHandler();
                }
                async reload()
                {
                    if (common_1.supports.proxyOnRequest)
                    {
                        await background_1.app.proxyOnRequest.reload();
                    }
                    else if (common_1.supports.proxyScript)
                    {
                        await background_1.app.proxyScript.reload();
                    }
                    else
                    {
                        await background_1.app.proxyPAC.reload();
                    }
                }
                registerErrorHandler()
                {
                    if (common_1.supports.proxyOnRequest)
                    {
                        utils_1.registerBrowserEventListener(browser.proxy.onError, proxyErrorHandler);
                        this.log('browser.proxy.onError: registered');
                    }
                    else
                    {
                        utils_1.registerEventListener(chrome.proxy.onProxyError, proxyErrorHandler);
                        this.log('chrome.proxy.onProxyError: registered');
                    }
                }
                async registerProxyHandler()
                {
                    if (common_1.supports.proxyOnRequest)
                    {
                        await background_1.app.proxyOnRequest.init();
                    }
                    else if (common_1.supports.proxyScript)
                    {
                        await background_1.app.proxyScript.init();
                    }
                    else
                    {
                        await background_1.app.proxyPAC.init();
                    }
                }
            }
            exports.ProxyController = ProxyController;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const background_1 = __webpack_require__(1);
            const AbstractModule_1 = __webpack_require__(3);
            const common_1 = __webpack_require__(4);
            const config_1 = __webpack_require__(5);
            const types_1 = __webpack_require__(2);
            const utils_1 = __webpack_require__(0);
            class ProxyOnRequest extends AbstractModule_1.AbstractModule
            {
                constructor()
                {
                    super(ProxyOnRequest.name);
                    this.initialized = false;
                    this.proxyInfos = [];
                    this.registered = false;
                    this.requestFilter = { urls: ['*://*/*'] };
                }
                async init()
                {
                    if (this.initialized)
                    {
                        throw new Error('Unexpected call to ProxyOnRequest.init(): already initialized');
                    }
                    this.buildProxyInfo();
                    this.register();
                    await this.reload();
                    this.initialized = true;
                    this.log('initialized');
                }
                reload()
                {
                    if (!this.registered)
                    {
                        throw new Error('Unexpected call to reload(): ProxyOnRequest is not registered');
                    }
                    const proxyIsEnabled = background_1.app.settings.proxyModeIs(types_1.ProxyMode.ON);
                    if (!proxyIsEnabled)
                    {
                        background_1.app.errorHandler.clearError(types_1.ErrorCode.InvalidProxyDetected);
                    }
                    background_1.app.proxyIsEnabled = proxyIsEnabled;
                }
                buildProxyInfo()
                {
                    config_1.config.proxies.forEach(proxy =>
                    {
                        const m = proxy.match(/^(\S+) (\S+):(\d+)$/);
                        const type = m[1];
                        const host = m[2];
                        const port = m[3];
                        const proxyInfo = { host, port, type };
                        this.proxyInfos.push(proxyInfo);
                    });
                }
                proxyOnRequestHandler(details)
                {
                    const direct = { type: 'direct' };
                    if (!background_1.app.proxyIsEnabled)
                    {
                        return direct;
                    }
                    const proxiedDomains = background_1.app.settings.getProxiedDomains();
                    const requestUrl = details.url;
                    const domain = utils_1.extractDomain(requestUrl);
                    if (proxiedDomains.includes(domain))
                    {
                        this.log('Proxying: %o %o', requestUrl, ...this.proxyInfos);
                        return this.proxyInfos;
                    }
                    return direct;
                }
                register()
                {
                    if (!common_1.supports.proxyOnRequest)
                    {
                        throw new Error('Unexpected call to ProxyOnRequest.register');
                    }
                    if (this.registered)
                    {
                        throw new Error('ProxyOnRequest is already registered');
                    }
                    this.registerProxyOnRequestHandler();
                    this.registered = true;
                }
                registerProxyOnRequestHandler()
                {
                    browser.proxy.onRequest.addListener(this.proxyOnRequestHandler.bind(this), this.requestFilter);
                    this.log('browser.proxy.onRequest listener registered');
                }
            }
            exports.ProxyOnRequest = ProxyOnRequest;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            var _a;
            const background_1 = __webpack_require__(1);
            const AbstractModule_1 = __webpack_require__(3);
            const common_1 = __webpack_require__(4);
            const config_1 = __webpack_require__(5);
            const types_1 = __webpack_require__(2);
            const utils_1 = __webpack_require__(0);
            const chromeProxySettings = common_1.supports.webExtProxy ? null : chrome.proxy.settings;
            const pChromeProxySettings = common_1.supports.webExtProxy ? null : (_a = class
            {
            },
                _a.clear = utils_1.Promisify.oneArg(chromeProxySettings, chromeProxySettings.clear),
                _a.get = utils_1.Promisify.oneArg(chromeProxySettings, chromeProxySettings.get),
                _a.set = utils_1.Promisify.oneArg(chromeProxySettings, chromeProxySettings.set),
                _a);
            class ProxyPAC extends AbstractModule_1.AbstractModule
            {
                constructor()
                {
                    super(ProxyPAC.name);
                    this.initialized = false;
                    this.settingsChangeHandler = this.externalProxySettingsChangeHandler.bind(this);
                }
                async init()
                {
                    if (this.initialized)
                    {
                        throw new Error('ProxyPAC is already initialized');
                    }
                    try
                    {
                        await this.reload();
                    }
                    catch (error)
                    {
                        throw error;
                    }
                    finally
                    {
                        this.initialized = true;
                        this.log('initialized');
                        this.registerExternalSettingsChangeHandler();
                    }
                }
                async registerProxyPAC()
                {
                    if (common_1.supports.webExtProxy)
                    {
                        throw new Error('Unexpected call to registerProxyPAC()');
                    }
                    let proxySettings = await this.getBrowserProxySettings();
                    this.logProxySettings('before change', proxySettings);
                    if (!this.canRegister(proxySettings.levelOfControl))
                    {
                        throw new types_1.AddonError(types_1.ErrorCode.ProxyPacConflict);
                    }
                    const addonProxySettings = this.buildProxySettings();
                    await this.setBrowserProxySettings(addonProxySettings);
                    proxySettings = await this.getBrowserProxySettings();
                    if (proxySettings.levelOfControl !== 'controlled_by_this_extension')
                    {
                        throw new types_1.AddonError(types_1.ErrorCode.ProxyPacConflict);
                    }
                    background_1.app.errorHandler.clearError(types_1.ErrorCode.ProxyPacConflict);
                    background_1.app.proxyIsEnabled = true;
                }
                async reload()
                {
                    const proxyMode = background_1.app.settings.get('proxyMode');
                    switch (proxyMode)
                    {
                        case types_1.ProxyMode.OFF:
                            background_1.app.proxyAuto.disable();
                            await this.unregisterProxyPAC();
                            break;
                        case types_1.ProxyMode.ON:
                            background_1.app.proxyAuto.disable();
                            await this.registerProxyPAC();
                            break;
                        case types_1.ProxyMode.AUTO:
                            await this.unregisterProxyPAC();
                            const reloadActiveTab = true;
                            const timeout = this.initialized ? 0 : 2000;
                            setTimeout(async () =>
                            {
                                await background_1.app.proxyAuto.enable(reloadActiveTab);
                            }, timeout);
                            break;
                    }
                }
                async unregisterProxyPAC()
                {
                    const proxySettings = await this.getBrowserProxySettings();
                    if (proxySettings.levelOfControl === 'controlled_by_this_extension')
                    {
                        await this.clearBrowserProxySettings();
                    }
                    background_1.app.errorHandler.clearError(types_1.ErrorCode.ProxyPacConflict);
                    background_1.app.proxyIsEnabled = false;
                }
                buildPAC()
                {
                    const proxiedDomains = background_1.app.settings.getProxiedDomains();
                    const proxies = config_1.config.proxies.join('; ');
                    const pac = `
			const proxiedDomains = ${JSON.stringify(proxiedDomains)};
			const proxies = ${JSON.stringify(proxies)};
			function FindProxyForURL(url, host) {
				return proxiedDomains.includes(host) ? proxies : "DIRECT";
			}
		`.trim().replace(/\t+/g, ' ');
                    if (!this.initialized)
                    {
                        this.log('PAC Script: \n%o\n', pac);
                    }
                    return pac;
                }
                buildProxySettings()
                {
                    return {
                        scope: 'regular',
                        value: {
                            mode: 'pac_script',
                            pacScript: {
                                data: this.buildPAC(),
                            },
                        },
                    };
                }
                canRegister(levelOfControl)
                {
                    return [
                        'controllable_by_this_extension',
                        'controlled_by_this_extension',
                    ].includes(levelOfControl);
                }
                async clearBrowserProxySettings()
                {
                    this.unregisterExternalSettingsChangeHandler();
                    await pChromeProxySettings.clear({ scope: 'regular' });
                    this.log('PAC unregistered');
                    const proxySettings = await this.getBrowserProxySettings();
                    this.logProxySettings('after PAC unregistered', proxySettings);
                    this.registerExternalSettingsChangeHandler();
                }
                async externalProxySettingsChangeHandler(proxySettings)
                {
                    this.logProxySettings('after external change', proxySettings);
                    try
                    {
                        await this.reload();
                    }
                    catch (error)
                    {
                        background_1.app.errorHandler.handle(error);
                    }
                    finally
                    {
                        chrome.runtime.sendMessage(['chrome_proxy_settings_changed'], background_1.app.messagingResponseCallback);
                    }
                }
                async getBrowserProxySettings(details = {})
                {
                    return await pChromeProxySettings.get(details);
                }
                logProxySettings(label, settings)
                {
                    const pac = settings.value.pacScript || '';
                    this.log(`Proxy settings [${label}]: [%o, %o] %o`, settings.levelOfControl, settings.value.mode, pac);
                }
                registerExternalSettingsChangeHandler()
                {
                    if (!this.initialized)
                    {
                        return;
                    }
                    utils_1.registerEventListener(chromeProxySettings.onChange, this.settingsChangeHandler);
                }
                async setBrowserProxySettings(addonProxySettings)
                {
                    this.unregisterExternalSettingsChangeHandler();
                    await pChromeProxySettings.set(addonProxySettings);
                    const proxySettings = await this.getBrowserProxySettings();
                    this.logProxySettings('after change', proxySettings);
                    this.registerExternalSettingsChangeHandler();
                }
                unregisterExternalSettingsChangeHandler()
                {
                    if (!this.initialized)
                    {
                        return;
                    }
                    utils_1.unregisterEventListener(chromeProxySettings.onChange, this.settingsChangeHandler);
                }
            }
            exports.ProxyPAC = ProxyPAC;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const background_1 = __webpack_require__(1);
            const AbstractModule_1 = __webpack_require__(3);
            const common_1 = __webpack_require__(4);
            const config_1 = __webpack_require__(5);
            const types_1 = __webpack_require__(2);
            class ProxyScript extends AbstractModule_1.AbstractModule
            {
                constructor()
                {
                    super(ProxyScript.name);
                    this.initialized = false;
                    this.registered = false;
                }
                async init()
                {
                    await this.register();
                }
                async reload()
                {
                    if (!this.registered)
                    {
                        throw new Error('Unexpected call to reload(): proxyScript is not registered');
                    }
                    const toProxyScript = { toProxyScript: true };
                    const proxyIsEnabled = background_1.app.settings.proxyModeIs(types_1.ProxyMode.ON);
                    if (!proxyIsEnabled)
                    {
                        background_1.app.errorHandler.clearError(types_1.ErrorCode.InvalidProxyDetected);
                    }
                    const proxiedDomains = background_1.app.settings.getProxiedDomains();
                    await browser.runtime.sendMessage(['set_state', proxyIsEnabled], toProxyScript);
                    await browser.runtime.sendMessage(['set_proxies', config_1.config.proxies], toProxyScript);
                    await browser.runtime.sendMessage(['set_proxied_domains', proxiedDomains], toProxyScript);
                    background_1.app.proxyIsEnabled = proxyIsEnabled;
                    if (!this.initialized)
                    {
                        this.initialized = true;
                        this.log('initialized');
                    }
                }
                async register()
                {
                    if (!common_1.supports.proxyScript)
                    {
                        throw new Error('Unexpected call to ProxyScript.register');
                    }
                    if (this.registered)
                    {
                        throw new Error('ProxyScript is already registered');
                    }
                    await browser.proxy.register(config_1.config.proxyScriptURL);
                    this.registered = true;
                    this.log(`browser.proxy.register(${config_1.config.proxyScriptURL})`);
                }
            }
            exports.ProxyScript = ProxyScript;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const background_1 = __webpack_require__(1);
            const AbstractPageApp_1 = __webpack_require__(6);
            const common_1 = __webpack_require__(4);
            const types_1 = __webpack_require__(2);
            const utils_1 = __webpack_require__(0);
            let elements;
            class RedirectorPage extends AbstractPageApp_1.AbstractPageApp
            {
                constructor(pageWindow)
                {
                    super(RedirectorPage.name, pageWindow);
                    this.log(`${this.constructor.name} loaded [%s]`, new Date());
                }
                async init()
                {
                    try
                    {
                        this.initHtmlElements();
                        this.initRequestParams();
                        this.registerEventListeners(this.url);
                        await this.run(this.action, this.tabId, this.url);
                    }
                    catch (error)
                    {
                        this.handleError(error);
                    }
                }
                displayAddonErrors(errorCodes = [])
                {
                    utils_1.DOM.show(elements.main);
                    utils_1.DOM.show(elements.errorMessages);
                    background_1.app.errorHandler.renderErrorsHtml(elements.errorMessages, errorCodes);
                }
                handleError(error)
                {
                    background_1.app.errorHandler.handle(error);
                    if (background_1.app.errorHandler.isAddonError(error))
                    {
                        this.displayAddonErrors();
                        return;
                    }
                    if ('message' in error)
                    {
                        utils_1.DOM.show(elements.main);
                        utils_1.DOM.show(elements.exceptionMessage);
                        elements.exceptionMessage.innerText = error.message;
                    }
                }
                initHtmlElements()
                {
                    elements = {
                        errorMessages: this.querySelector('.errorMessages'),
                        exceptionMessage: this.querySelector('#exceptionMessage'),
                        main: this.querySelector('main'),
                    };
                }
                initRequestParams()
                {
                    this.action = this.queryString.getRequiredString('action');
                    if (!Object.values(types_1.RedirectorAction).includes(this.action))
                    {
                        throw new Error(`Invalid action: ${this.action}`);
                    }
                    this.tabId = this.queryString.getRequiredNumber('tabId');
                    if (this.tabId < 1)
                    {
                        throw new Error(`Invalid tabId: ${this.tabId}`);
                    }
                    this.url = this.queryString.getRequiredString('url');
                    if (!/^https?:\/\//.test(this.url))
                    {
                        throw new Error(`Invalid url: ${this.url}`);
                    }
                }
                registerEventListeners(url)
                {
                    background_1.app.errorHandler.registerButtonListeners(this.window, url);
                }
                async run(action, tabId, url)
                {
                    const tab = await common_1.pchrome.tabs.get(tabId);
                    this.log('%s: tab %o', action, tab);
                    switch (action)
                    {
                        case types_1.RedirectorAction.EnableProxy:
                            await background_1.app.proxyPAC.registerProxyPAC();
                            await this.updateTab(tab, { url });
                            break;
                        case types_1.RedirectorAction.DisableProxy:
                            await background_1.app.proxyPAC.unregisterProxyPAC();
                            await this.updateTab(tab, { url });
                            break;
                        case types_1.RedirectorAction.ShowProxyError:
                            const noLongerValid = !background_1.app.errorHandler.hasProxyError();
                            if (noLongerValid)
                            {
                                await this.updateTab(tab, { url });
                                return;
                            }
                            this.displayAddonErrors(background_1.app.errorHandler.proxyErrors);
                            break;
                    }
                }
                async updateTab(tab, properties)
                {
                    await utils_1.sleep(150);
                    const updatedTab = await common_1.pchrome.tabs.update(tab.id, properties);
                    this.log('updateTab: %o->%o', tab, updatedTab);
                }
            }
            exports.RedirectorPage = RedirectorPage;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const background_1 = __webpack_require__(1);
            const AbstractModule_1 = __webpack_require__(3);
            const common_1 = __webpack_require__(4);
            const config_1 = __webpack_require__(5);
            const types_1 = __webpack_require__(2);
            const utils_1 = __webpack_require__(0);
            class Settings extends AbstractModule_1.AbstractModule
            {
                constructor()
                {
                    super(Settings.name);
                    this.initialized = false;
                }
                async adjustCurrentSettings()
                {
                    await this.adjustSchema();
                    await this.adjustProxyMode();
                    await this.adjustAccordingToPermissions();
                }
                get(name)
                {
                    return this.settings[name];
                }
                getPreferredDomain()
                {
                    return `${this.settings.sld}.${this.settings.tld}`;
                }
                getPreferredUrl()
                {
                    const domain = this.getPreferredDomain();
                    const schema = this.getActualSchemaForDomain(domain);
                    return `${schema}://${domain}/`;
                }
                getProxiedDomains()
                {
                    return config_1.config.proxiedDomains;
                }
                async init()
                {
                    this.registerStorageChangeHandler();
                    this.settings = Object.assign({}, config_1.config.defaultSettings);
                    this.log('config: %o', Object.assign({}, config_1.config));
                    this.log('default: %o', Object.assign({}, this.settings));
                    await this.loadSettingsFromStorage();
                    await this.validateCurrentSettings();
                    this.log('*merged: %o', Object.assign({}, this.settings));
                    await this.handleVersionUpdates();
                    await this.adjustCurrentSettings();
                    await this.saveSettingsVersion();
                    this.initialized = true;
                }
                isMainDomain(domain)
                {
                    return domain === config_1.config.mainDomain;
                }
                isPreferredDomain(domain)
                {
                    const preferredDomain = this.getPreferredDomain();
                    return domain === preferredDomain;
                }
                isPreferredUrl(url)
                {
                    const preferredUrl = this.getPreferredUrl();
                    return url.startsWith(preferredUrl);
                }
                isProxiedDomain(domain)
                {
                    const proxiedDomains = this.getProxiedDomains();
                    return proxiedDomains.includes(domain);
                }
                isProxiedUrl(url)
                {
                    const domain = utils_1.extractDomain(url);
                    return this.isProxiedDomain(domain);
                }
                isValid(key, value)
                {
                    switch (key)
                    {
                        case 'addContextMenu':
                            return value === true || value === false;
                        case 'proxyMode':
                            return common_1.supports.webExtProxy
                                ? [types_1.ProxyMode.ON, types_1.ProxyMode.OFF].includes(value)
                                : [types_1.ProxyMode.ON, types_1.ProxyMode.OFF, types_1.ProxyMode.AUTO].includes(value);
                        case 'schema':
                            return /^https?$/.test(value);
                        case 'sld':
                            return /^[a-z0-9-]+$/i.test(value);
                        case 'tld':
                            return /^\w{2,24}$/.test(value);
                        default:
                            throw new Error(`Invalid key: ${key}`);
                    }
                }
                proxyModeIs(...proxyMode)
                {
                    return proxyMode.includes(this.settings.proxyMode);
                }
                rewriteToMatchPreferred(url)
                {
                    const preferredUrl = this.getPreferredUrl();
                    const rewrittenUrl = url.replace(/^https?:\/\/[^\/]+\//i, preferredUrl);
                    return rewrittenUrl;
                }
                async set(newSettings)
                {
                    const oldSettings = Object.assign({}, this.settings);
                    for (const key of Object.keys(newSettings))
                    {
                        const value = newSettings[key];
                        if (!this.isValid(key, value))
                        {
                            throw new Error(`Invalid setting { ${key}: ${JSON.stringify(value)} }`);
                        }
                    }
                    const mergedSettings = Object.assign({}, this.settings, newSettings);
                    await common_1.chromeStorage.set({ [utils_1.StorageKey.Settings]: mergedSettings });
                    if (background_1.app.browser.isFirefox)
                    {
                        await utils_1.sleep(250);
                        this.log('sleep(250)');
                    }
                    await common_1.chromeStorage.get(utils_1.StorageKey.Settings);
                    this.log('Validating saved settings: %o', Object.assign({}, this.settings));
                    if (!utils_1.isEqual(this.settings, mergedSettings))
                    {
                        console.error('Got: %O Expected: %O', Object.assign({}, this.settings), Object.assign({}, mergedSettings));
                        throw new Error('Cannot save setting. Objects are not equal');
                    }
                    if (this.initialized)
                    {
                        try
                        {
                            await this.handleSettingsChange(oldSettings, this.settings);
                        }
                        catch (error)
                        {
                            throw error;
                        }
                        finally
                        {
                            chrome.runtime.sendMessage(['setting_changed'], background_1.app.messagingResponseCallback);
                        }
                    }
                }
                async setDefaultSettings()
                {
                    await this.set(Object.assign({}, config_1.config.defaultSettings));
                }
                switchToHttps()
                {
                    this.settings.schema = types_1.Schema.Https;
                    this.log(`Switching settings.schema to ${types_1.Schema.Https}`);
                    setTimeout(async () =>
                    {
                        await this.set({ schema: types_1.Schema.Https });
                    }, 0);
                }
                async adjustAccordingToPermissions()
                {
                    if (this.settings.proxyMode === types_1.ProxyMode.AUTO && !background_1.app.permissions.granted('accessToAllUrls'))
                    {
                        await this.set({
                            proxyMode: types_1.ProxyMode.ON,
                            schema: config_1.config.defaultSettings.schema,
                            sld: config_1.config.defaultSettings.sld,
                            tld: config_1.config.defaultSettings.tld,
                        });
                    }
                }
                async adjustProxyMode()
                {
                    const proxyMode = this.settings.proxyMode;
                    if (proxyMode === types_1.ProxyMode.OFF)
                    {
                        return;
                    }
                    let adjustedValue;
                    const preferredDomain = this.getPreferredDomain();
                    if (!this.isProxiedDomain(preferredDomain))
                    {
                        adjustedValue = types_1.ProxyMode.OFF;
                        this.log('Adjusting "proxyMode": %o -> %o', proxyMode, adjustedValue);
                    }
                    if (adjustedValue !== undefined)
                    {
                        await this.set({ proxyMode: adjustedValue });
                    }
                }
                async adjustSchema()
                {
                    if (this.settings.schema === types_1.Schema.Http)
                    {
                        const domain = this.getPreferredDomain();
                        if (this.forceHttps(domain))
                        {
                            this.log(`Adjusting "schema": ${types_1.Schema.Http} -> ${types_1.Schema.Https}`);
                            await this.set({ schema: types_1.Schema.Https });
                        }
                    }
                }
                forceHttps(domain)
                {
                    return this.settings.proxyMode !== types_1.ProxyMode.OFF || this.isMainDomain(domain);
                }
                getActualSchemaForDomain(domain)
                {
                    return this.forceHttps(domain) ? types_1.Schema.Https : this.settings.schema;
                }
                async getSettingsVersion()
                {
                    let { [utils_1.StorageKey.SettingsVersion]: version } = await common_1.chromeStorage.get(utils_1.StorageKey.SettingsVersion);
                    version = parseInt(version, 10);
                    return isNaN(version) ? 0 : version;
                }
                async handleSettingsChange(old, current)
                {
                    if (old.addContextMenu !== current.addContextMenu)
                    {
                        background_1.app.contextMenu.reload();
                    }
                    if (old.proxyMode !== current.proxyMode)
                    {
                        await background_1.app.proxy.reload();
                    }
                }
                async handleVersionUpdates()
                {
                    const currentVersion = await this.getSettingsVersion();
                    const targetVersion = config_1.config.settingsVersion;
                    if (currentVersion === targetVersion)
                    {
                        return;
                    }
                    if (currentVersion > targetVersion)
                    {
                        console.error('Unexpected settings version: %o -> %o', currentVersion, targetVersion);
                        await this.removeSettings();
                        await this.setDefaultSettings();
                        return;
                    }
                }
                async loadSettingsFromStorage()
                {
                    const { [utils_1.StorageKey.Settings]: loadedSettings } = await common_1.chromeStorage.get(utils_1.StorageKey.Settings);
                    this.log('storage: %o', loadedSettings);
                    if (loadedSettings !== undefined)
                    {
                        Object.assign(this.settings, loadedSettings);
                    }
                    else
                    {
                        await this.saveSettingsVersion();
                    }
                }
                registerStorageChangeHandler()
                {
                    chrome.storage.onChanged.addListener(changes =>
                    {
                        for (const key of Object.keys(changes))
                        {
                            if (key === utils_1.StorageKey.Settings)
                            {
                                this.settings = changes[key].newValue;
                                this.log('storage.onChanged {Assignment}: this.settings = %o', changes[key].newValue);
                                return;
                            }
                        }
                    });
                }
                async removeSettings()
                {
                    await common_1.chromeStorage.remove(utils_1.StorageKey.Settings);
                }
                async saveSettingsVersion()
                {
                    await common_1.chromeStorage.set({ [utils_1.StorageKey.SettingsVersion]: config_1.config.settingsVersion });
                }
                async validateCurrentSettings()
                {
                    const valid = Object.assign({}, config_1.config.defaultSettings);
                    for (const key of Object.keys(this.settings))
                    {
                        const value = this.settings[key];
                        try
                        {
                            if (this.isValid(key, value))
                            {
                                valid[key] = value;
                                continue;
                            }
                            console.error('Unexpected setting value: { %O: %O }', key, value);
                        }
                        catch (error)
                        {
                            console.error('Unexpected setting key: { %O: %O }', key, value);
                        }
                    }
                    if (!utils_1.isEqual(this.settings, valid))
                    {
                        await this.removeSettings();
                        await this.setDefaultSettings();
                    }
                }
            }
            exports.Settings = Settings;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const background_1 = __webpack_require__(1);
            const AbstractPageApp_1 = __webpack_require__(6);
            const config_1 = __webpack_require__(5);
            const types_1 = __webpack_require__(2);
            const utils_1 = __webpack_require__(0);
            let elements;
            class SolutionPage extends AbstractPageApp_1.AbstractPageApp
            {
                constructor(pageWindow)
                {
                    super(SolutionPage.name, pageWindow);
                    this.log(`${this.constructor.name} loaded [%s]`, new Date());
                }
                init()
                {
                    this.webStoreURL = this.getWebStoreURL();
                    this.edgeStoreURL = "https://microsoftedge.microsoft.com/addons/detail/%D1%80%D0%B0%D0%B7%D0%B1%D0%BB%D0%BE%D0%BA%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C-%D1%80%D1%83%D1%82%D1%80%D0%B5%D0%BA%D0%B5%D1%80-/lhpldjemmjahpokjediaopipffngnnie";
                    this.githubURL = "https://github.com/KaiHuaDou/Rutracker-Ext-CHS/releases";
                    this.crxSoSoURL = "https://www.crxsoso.com/webstore/detail/fddjpichkajmnkjhcmpbbjdmmcodnkej";
                    this.initHtmlElements();
                    this.registerEventListeners();
                    try
                    {
                        this.run();
                    }
                    catch (error)
                    {
                        this.handleError(error);
                    }
                }
                adjustSolutionHTML(errorCode)
                {
                    switch (errorCode)
                    {
                        case types_1.ErrorCode.ProxyPacConflict:
                        case types_1.ErrorCode.InvalidProxyDetected:
                            const browserName = background_1.app.browser.name;
                            const nodeList = this.querySelectorAll(`.proxy-error.${browserName}`);
                            Array.from(nodeList).forEach(element => utils_1.DOM.show(element));
                            elements.openWebStorePage.href = this.webStoreURL;
                            elements.openCRXSoSoPage.href = this.crxSoSoURL;
                            elements.openGithubPage.href = this.githubURL;
                            elements.openEdgeStorePage.href = this.edgeStoreURL;
                            break;
                        default:
                            throw new Error(`Invalid errorCode: ${errorCode}`);
                    }
                }
                getWebStoreURL()
                {
                    if (background_1.app.browser.isFirefox)
                    {
                        return types_1.WebStoreURL.Firefox;
                    }
                    if (background_1.app.browser.isChrome)
                    {
                        return config_1.config.isDevVersion ? types_1.WebStoreURL.ChromeDev : types_1.WebStoreURL.Chrome;
                    }
                }
                handleError(error)
                {
                    if ('message' in error)
                    {
                        utils_1.DOM.show(elements.exceptionMessage);
                        elements.exceptionMessage.innerText = error.message;
                    }
                }
                initHtmlElements()
                {
                    elements = {
                        exceptionMessage: this.querySelector('#exceptionMessage'),
                        openWebStorePage: this.querySelector('#openWebStorePage'),
                        openCRXSoSoPage: this.querySelector('#openCRXSoSoPage'),
                        openEdgeStorePage: this.querySelector('#openEdgeStorePage'),
                        openGithubPage: this.querySelector('#openGithubPage'),
                        reloadSelfButton: this.querySelector('#reloadSelfButton'),
                    };
                }
                registerEventListeners()
                {
                    elements.reloadSelfButton.addEventListener('click', this.reloadSelf.bind(this));
                    chrome.runtime.setUninstallURL(this.webStoreURL);
                }
                reloadSelf()
                {
                    const url = this.queryString.getOptionalString('url');
                    if (/^https?:\/\//.test(url))
                    {
                        utils_1.LocalStorage.set(utils_1.StorageKey.ReopenAfterReload, url);
                    }
                    chrome.runtime.reload();
                }
                run()
                {
                    const errorCode = this.queryString.getRequiredString('errorCode');
                    this.adjustSolutionHTML(errorCode);
                }
            }
            exports.SolutionPage = SolutionPage;
        }),

        (function (module, exports, __webpack_require__)
        {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            const background_1 = __webpack_require__(1);
            const AbstractModule_1 = __webpack_require__(3);
            const common_1 = __webpack_require__(4);
            const config_1 = __webpack_require__(5);
            const config_domain_1 = __webpack_require__(8);
            const types_1 = __webpack_require__(2);
            const utils_1 = __webpack_require__(0);
            var wr = chrome.webRequest;
            class WebRequest extends AbstractModule_1.AbstractModule
            {
                constructor()
                {
                    super(WebRequest.name);
                    this.ignoreInvalidProxy = true;
                    this.requestFilter = {
                        types: [
                            'main_frame',
                            'sub_frame',
                            'xmlhttprequest',
                        ],
                        urls: config_domain_1.origins.allUrls,
                    };
                    this.urlRegExp = {
                        allRtoDomains: new RegExp(`^https?:\\/\\/${config_1.config.mainSLD}\\.(?!me|news|wiki)\\w+\\/`, 'i'),
                    };
                }
                init()
                {
                    this.setStartupTimers();
                    utils_1.registerWebRequestListener(wr.onBeforeRequest, this.beforeRequestHandler.bind(this), this.requestFilter, [
                        'blocking',
                    ]);
                    utils_1.registerWebRequestListener(wr.onBeforeSendHeaders, this.beforeSendHeadersHandler.bind(this), this.requestFilter, [
                        'blocking',
                        'requestHeaders',
                    ]);
                    utils_1.registerWebRequestListener(wr.onHeadersReceived, this.headersReceivedHandler.bind(this), this.requestFilter, [
                        'blocking',
                        'responseHeaders',
                    ]);
                }
                addExtensionIdHeader(details)
                {
                    const name = types_1.HeaderNames.AddonData;
                    const value = JSON.stringify(this.getAddonInfo());
                    details.requestHeaders.push({ name, value });
                    this.log('Extension header added: %o %o', details.tabId, details.url);
                }
                beforeRequestHandler(details)
                {
                    const tabId = details.tabId;
                    const isMainFrame = details.type === 'main_frame';
                    const requestUrl = details.url;
                    if (!requestUrl.startsWith('http'))
                    {
                        return;
                    }
                    const proxyModeIsAUTO = background_1.app.settings.proxyModeIs(types_1.ProxyMode.AUTO);
                    const proxyModeIsOFF = background_1.app.settings.proxyModeIs(types_1.ProxyMode.OFF);
                    const proxyIsEnabled = background_1.app.proxyIsEnabled;
                    if (isMainFrame)
                    {
                        const isProxiedUrl = background_1.app.settings.isProxiedUrl(requestUrl);
                        if (!proxyModeIsOFF)
                        {
                            if (isProxiedUrl && background_1.app.errorHandler.hasProxyError())
                            {
                                return this.redirect(tabId, requestUrl, types_1.RedirectorAction.ShowProxyError);
                            }
                        }
                        if (proxyModeIsAUTO)
                        {
                            if (isProxiedUrl && !proxyIsEnabled)
                            {
                                return this.redirect(tabId, requestUrl, types_1.RedirectorAction.EnableProxy);
                            }
                            if (!isProxiedUrl && proxyIsEnabled)
                            {
                                if (this.dontUseRedirect(details))
                                {
                                    background_1.app.proxyPAC.unregisterProxyPAC();
                                }
                                else
                                {
                                    return this.redirect(tabId, requestUrl, types_1.RedirectorAction.DisableProxy);
                                }
                            }
                        }
                    }
                    const redirectUrl = this.getRedirectUrlBeforeRequest(details);
                    if (redirectUrl)
                    {
                        this.log('redirect [beforeRequest]: %o %o->%o', tabId, requestUrl, redirectUrl);
                        const isProxiedUrl = background_1.app.settings.isProxiedUrl(redirectUrl);
                        if (isMainFrame && proxyModeIsAUTO)
                        {
                            if (isProxiedUrl && !proxyIsEnabled)
                            {
                                return this.redirect(tabId, redirectUrl, types_1.RedirectorAction.EnableProxy);
                            }
                        }
                        return { redirectUrl };
                    }
                }
                beforeSendHeadersHandler(details)
                {
                    const requestHeaders = this.setHeaders(details);
                    return requestHeaders;
                }
                cancelRedirect(url)
                {
                    const useProductionDomain = !config_1.config.useDevDomain;
                    const isDevelopmentUrl = config_1.config.devUrlRegex.test(url);
                    if (useProductionDomain && isDevelopmentUrl)
                    {
                        return true;
                    }
                    return false;
                }
                detectInvalidProxy(headers)
                {
                    if (background_1.app.settings.proxyModeIs(types_1.ProxyMode.OFF))
                    {
                        background_1.app.errorHandler.clearError(types_1.ErrorCode.InvalidProxyDetected);
                        return false;
                    }
                    if (this.ignoreInvalidProxy)
                    {
                        return false;
                    }
                    const value = this.getHeader(headers, types_1.HeaderNames.AddonProxyValidity);
                    if (!value)
                    {
                        return false;
                    }
                    const proxyIsInvalid = value === 'invalid';
                    if (proxyIsInvalid)
                    {
                        if (!background_1.app.errorHandler.hasError(types_1.ErrorCode.ProxyPacConflict))
                        {
                            this.log('Invalid proxy detected');
                            background_1.app.errorHandler.handle(new types_1.AddonError(types_1.ErrorCode.InvalidProxyDetected));
                        }
                    }
                    else
                    {
                        background_1.app.errorHandler.clearError(types_1.ErrorCode.InvalidProxyDetected);
                    }
                    return proxyIsInvalid;
                }
                dontUseRedirect(details)
                {
                    if (details.method === 'POST')
                    {
                        return true;
                    }
                    return false;
                }
                getAddonInfo()
                {
                    return {
                        auid: background_1.app.addonUid,
                        browser: `${background_1.app.browser.name}-${background_1.app.browser.version}`,
                        proxy: !background_1.app.settings.proxyModeIs(types_1.ProxyMode.OFF),
                        version: common_1.manifest.version,
                    };
                }
                getHeader(headers, headerName)
                {
                    const name = headerName.toUpperCase();
                    for (const header of headers)
                    {
                        if (header.name.toUpperCase() === name)
                        {
                            return header.value;
                        }
                    }
                    return '';
                }
                getRedirectUrlAfterHeadersReceived(details)
                {
                    const requestUrl = details.url;
                    const domain = utils_1.extractDomain(requestUrl);
                    if (background_1.app.settings.isPreferredDomain(domain))
                    {
                        if (this.isRedirectToHttps(details, domain))
                        {
                            background_1.app.settings.switchToHttps();
                            return;
                        }
                    }
                    if (background_1.app.settings.isPreferredUrl(requestUrl))
                    {
                        return;
                    }
                    if (!this.isResponseFromCustomMirror(details.responseHeaders))
                    {
                        return;
                    }
                    if (this.cancelRedirect(requestUrl))
                    {
                        return;
                    }
                    const redirectUrl = background_1.app.settings.rewriteToMatchPreferred(requestUrl);
                    if (requestUrl !== redirectUrl)
                    {
                        this.log('redirect [afterHeaders]: %o %o->%o', details.tabId, requestUrl, redirectUrl);
                        return redirectUrl;
                    }
                }
                getRedirectUrlBeforeRequest(details)
                {
                    const requestUrl = details.url;
                    const domain = utils_1.extractDomain(requestUrl);
                    if (background_1.app.settings.isPreferredUrl(requestUrl))
                    {
                        return;
                    }
                    const ourDomain = this.urlRegExp.allRtoDomains.test(requestUrl) || background_1.app.settings.isPreferredDomain(domain);
                    if (!ourDomain)
                    {
                        return;
                    }
                    const redirectUrl = background_1.app.settings.rewriteToMatchPreferred(requestUrl);
                    if (requestUrl !== redirectUrl)
                    {
                        return redirectUrl;
                    }
                }
                headersReceivedHandler(details)
                {
                    const tabId = details.tabId;
                    const isMainFrame = details.type === 'main_frame';
                    const requestUrl = details.url;
                    if (!requestUrl.startsWith('http'))
                    {
                        return;
                    }
                    if (isMainFrame)
                    {
                        const isProxiedUrl = background_1.app.settings.isProxiedUrl(requestUrl);
                        if (isProxiedUrl)
                        {
                            const proxyIsInvalid = this.detectInvalidProxy(details.responseHeaders);
                            if (proxyIsInvalid)
                            {
                                return this.redirect(tabId, requestUrl, types_1.RedirectorAction.ShowProxyError);
                            }
                        }
                    }
                    const redirectUrl = this.getRedirectUrlAfterHeadersReceived(details);
                    if (redirectUrl)
                    {
                        const proxyModeIsAUTO = background_1.app.settings.proxyModeIs(types_1.ProxyMode.AUTO);
                        const proxyIsDisabled = !background_1.app.proxyIsEnabled;
                        const isProxiedUrl = background_1.app.settings.isProxiedUrl(redirectUrl);
                        if (isMainFrame)
                        {
                            if (proxyModeIsAUTO)
                            {
                                if (isProxiedUrl && proxyIsDisabled)
                                {
                                    return this.redirect(tabId, redirectUrl, types_1.RedirectorAction.EnableProxy);
                                }
                            }
                        }
                        return { redirectUrl };
                    }
                }
                isRedirectToHttps(details, domain)
                {
                    const isRedirect = [301, 302].includes(details.statusCode);
                    if (!isRedirect)
                    {
                        return false;
                    }
                    const oldUrl = details.url;
                    const newUrl = this.getHeader(details.responseHeaders, 'Location');
                    const result = oldUrl.startsWith(`http://${domain}/`) && newUrl.startsWith(`https://${domain}/`);
                    if (result)
                    {
                        this.log('isRedirectToHttps: %o %o %o->%o', result, details.tabId, oldUrl, newUrl);
                    }
                    return result;
                }
                isResponseFromCustomMirror(headers)
                {
                    const value = this.getHeader(headers, types_1.HeaderNames.AddonSiteId);
                    return value === 'rto';
                }
                redirect(tabId, requestUrl, action)
                {
                    this.log('Canceling tab %o to %o %o', tabId, action, requestUrl);
                    const url = `${config_1.config.redirectorURL}?tabId=${tabId}&action=${action}&url=${encodeURIComponent(requestUrl)}`;
                    setTimeout(async () =>
                    {
                        for (let i = 0; i < 20; i++)
                        {
                            const tab = await common_1.pchrome.tabs.get(tabId);
                            if (tab)
                            {
                                const updatedTab = await common_1.pchrome.tabs.update(tabId, { url });
                                this.log('Updating tabs: %o -> %o', tab, updatedTab);
                                return;
                            }
                            this.log('Waiting for tab %o: i=%o', tabId, i);
                            await utils_1.sleep(10);
                        }
                        console.error('Cannot find tab %o', tabId);
                    }, 10);
                    return { cancel: true };
                }
                setHeaders(details)
                {
                    let modified = false;
                    const requestUrl = details.url;
                    const matchesAllRtoDomains = this.urlRegExp.allRtoDomains.test(requestUrl);
                    const isPreferredUrl = background_1.app.settings.isPreferredUrl(requestUrl);
                    if (matchesAllRtoDomains || isPreferredUrl)
                    {
                        this.addExtensionIdHeader(details);
                        modified = true;
                    }
                    if (modified)
                    {
                        return { requestHeaders: details.requestHeaders };
                    }
                }
                setStartupTimers()
                {
                    setTimeout(() =>
                    {
                        this.ignoreInvalidProxy = false;
                        this.log(`WebRequest.ignoreInvalidProxy was set to: ${this.ignoreInvalidProxy}`);
                    }, 10 * 1000);
                }
            }
            exports.WebRequest = WebRequest;
        })
    ]);