/** @var boolean */
let proxyIsEnabled;
/** @var string[] */
let proxiedDomains;
/**
 * NB: Failover doesn't work in Firefox :(
 * @see https://bugzilla.mozilla.org/show_bug.cgi?id=273258
 * @var string[] [proxy1, proxy2]
 */
let proxies;

/**
 * @param domains string[]
 */
function setProxiedDomains(domains) {
	proxiedDomains = domains;
}

//noinspection JSIgnoredPromiseFromCall
browser.runtime.sendMessage(['from_proxy_script', 'init_proxy_script']);

browser.runtime.onMessage.addListener(async (message) => {
	const task = message[0];
	const data = message[1];
	switch (task) {
		case 'set_proxied_domains':
			setProxiedDomains(data);
			break;
		case 'set_state':
			proxyIsEnabled = data;
			break;
		case 'set_proxies':
			proxies = data;
			break;
		default:
			// Logging
			await browser.runtime.sendMessage(['from_proxy_script', `ERROR: invalid task '${task}'`]);
	}
	// Logging
	await browser.runtime.sendMessage(['from_proxy_script', `ACK: ${task} ${data}`]);
});

function getProxy() {
	return proxies.join('; ');
}

function findProxyForDomain(domain) {
	const direct = 'DIRECT';
	if (!proxyIsEnabled) {
		return direct;
	}
	const isProxiedDomain = proxiedDomains.includes(domain);
	if (!isProxiedDomain) {
		return direct;
	}
	const proxy = getProxy();
	//noinspection JSIgnoredPromiseFromCall
	browser.runtime.sendMessage(['from_proxy_script', [proxy, domain]]); // Logging
	return proxy;
}

//noinspection JSUnusedGlobalSymbols
function FindProxyForURL(url, host) {
	const proxy = findProxyForDomain(host);
	//noinspection JSConstructorReturnsPrimitive
	return proxy;
}
