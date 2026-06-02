## GitHub Copilot Chat

- Extension: 0.49.0 (prod)
- VS Code: 1.121.0 (f6cfa2ea2403534de03f069bdf160d06451ed282)
- OS: win32 10.0.26200 x64
- GitHub Account: 8mileverse

## Network

User Settings:
```json
  "http.systemCertificatesNode": true,
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: Error (10 ms): getaddrinfo ENOTFOUND api.github.com
- DNS ipv6 Lookup: Error (0 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (0 ms)
- Electron fetch (configured): Error (3 ms): Error: net::ERR_INTERNET_DISCONNECTED
    at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
    at SimpleURLLoaderWrapper.emit (node:events:519:28)
    at SimpleURLLoaderWrapper.emit (node:domain:489:12)
    at SimpleURLLoaderWrapper.topLevelDomainCallback (node:domain:161:15)
    at SimpleURLLoaderWrapper.callbackTrampoline (node:internal/async_hooks:128:24)
  {"is_request_error":true,"network_process_crashed":false}
- Node.js https: Error (14 ms): Error: getaddrinfo ENOTFOUND api.github.com
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
    at GetAddrInfoReqWrap.callbackTrampoline (node:internal/async_hooks:130:17)
- Node.js fetch: Error (18 ms): TypeError: fetch failed
    at node:internal/deps/undici/undici:14902:13
    at processTicksAndRejections (node:internal/process/task_queues:103:5)
    at n._fetch (c:\Users\ayode\AppData\Local\Programs\Microsoft VS Code\f6cfa2ea24\resources\app\extensions\copilot\dist\extension.js:5484:5278)
    at n.fetch (c:\Users\ayode\AppData\Local\Programs\Microsoft VS Code\f6cfa2ea24\resources\app\extensions\copilot\dist\extension.js:5484:4590)
    at u (c:\Users\ayode\AppData\Local\Programs\Microsoft VS Code\f6cfa2ea24\resources\app\extensions\copilot\dist\extension.js:5516:186)
    at Sg._executeContributedCommand (file:///c:/Users/ayode/AppData/Local/Programs/Microsoft%20VS%20Code/f6cfa2ea24/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:502:48807)
  Error: getaddrinfo ENOTFOUND api.github.com
      at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
      at GetAddrInfoReqWrap.callbackTrampoline (node:internal/async_hooks:130:17)

Connecting to https://api.githubcopilot.com/_ping:
- DNS ipv4 Lookup: Error (10 ms): getaddrinfo ENOTFOUND api.githubcopilot.com
- DNS ipv6 Lookup: Error (2 ms): getaddrinfo ENOTFOUND api.githubcopilot.com
- Proxy URL: None (2 ms)
- Electron fetch (configured): Error (5 ms): Error: net::ERR_INTERNET_DISCONNECTED
    at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
    at SimpleURLLoaderWrapper.emit (node:events:519:28)
    at SimpleURLLoaderWrapper.emit (node:domain:489:12)
    at SimpleURLLoaderWrapper.topLevelDomainCallback (node:domain:161:15)
    at SimpleURLLoaderWrapper.callbackTrampoline (node:internal/async_hooks:128:24)
  {"is_request_error":true,"network_process_crashed":false}
- Node.js https: Error (26 ms): Error: getaddrinfo ENOTFOUND api.githubcopilot.com
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
    at GetAddrInfoReqWrap.callbackTrampoline (node:internal/async_hooks:130:17)
- Node.js fetch: Error (51 ms): TypeError: fetch failed
    at node:internal/deps/undici/undici:14902:13
    at processTicksAndRejections (node:internal/process/task_queues:103:5)
    at n._fetch (c:\Users\ayode\AppData\Local\Programs\Microsoft VS Code\f6cfa2ea24\resources\app\extensions\copilot\dist\extension.js:5484:5278)
    at n.fetch (c:\Users\ayode\AppData\Local\Programs\Microsoft VS Code\f6cfa2ea24\resources\app\extensions\copilot\dist\extension.js:5484:4590)
    at u (c:\Users\ayode\AppData\Local\Programs\Microsoft VS Code\f6cfa2ea24\resources\app\extensions\copilot\dist\extension.js:5516:186)
    at Sg._executeContributedCommand (file:///c:/Users/ayode/AppData/Local/Programs/Microsoft%20VS%20Code/f6cfa2ea24/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:502:48807)
  Error: getaddrinfo ENOTFOUND api.githubcopilot.com
      at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
      at GetAddrInfoReqWrap.callbackTrampoline (node:internal/async_hooks:130:17)

Connecting to https://copilot-proxy.githubusercontent.com/_ping:
- DNS ipv4 Lookup: Error (2 ms): getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
- DNS ipv6 Lookup: Error (1 ms): getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
- Proxy URL: None (3 ms)
- Electron fetch (configured): Error (5 ms): Error: net::ERR_INTERNET_DISCONNECTED
    at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
    at SimpleURLLoaderWrapper.emit (node:events:519:28)
    at SimpleURLLoaderWrapper.emit (node:domain:489:12)
    at SimpleURLLoaderWrapper.topLevelDomainCallback (node:domain:161:15)
    at SimpleURLLoaderWrapper.callbackTrampoline (node:internal/async_hooks:128:24)
  {"is_request_error":true,"network_process_crashed":false}
- Node.js https: Error (27 ms): Error: getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
    at GetAddrInfoReqWrap.callbackTrampoline (node:internal/async_hooks:130:17)
- Node.js fetch: Error (48 ms): TypeError: fetch failed
    at node:internal/deps/undici/undici:14902:13
    at processTicksAndRejections (node:internal/process/task_queues:103:5)
    at n._fetch (c:\Users\ayode\AppData\Local\Programs\Microsoft VS Code\f6cfa2ea24\resources\app\extensions\copilot\dist\extension.js:5484:5278)
    at n.fetch (c:\Users\ayode\AppData\Local\Programs\Microsoft VS Code\f6cfa2ea24\resources\app\extensions\copilot\dist\extension.js:5484:4590)
    at u (c:\Users\ayode\AppData\Local\Programs\Microsoft VS Code\f6cfa2ea24\resources\app\extensions\copilot\dist\extension.js:5516:186)
    at Sg._executeContributedCommand (file:///c:/Users/ayode/AppData/Local/Programs/Microsoft%20VS%20Code/f6cfa2ea24/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:502:48807)
  Error: getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
      at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
      at GetAddrInfoReqWrap.callbackTrampoline (node:internal/async_hooks:130:17)

Connecting to https://mobile.events.data.microsoft.com: Error (10 ms): Error: net::ERR_INTERNET_DISCONNECTED
    at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
    at SimpleURLLoaderWrapper.emit (node:events:519:28)
    at SimpleURLLoaderWrapper.emit (node:domain:489:12)
    at SimpleURLLoaderWrapper.topLevelDomainCallback (node:domain:161:15)
    at SimpleURLLoaderWrapper.callbackTrampoline (node:internal/async_hooks:128:24)
  {"is_request_error":true,"network_process_crashed":false}
Connecting to https://dc.services.visualstudio.com: Error (3 ms): Error: net::ERR_INTERNET_DISCONNECTED
    at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
    at SimpleURLLoaderWrapper.emit (node:events:519:28)
    at SimpleURLLoaderWrapper.emit (node:domain:489:12)
    at SimpleURLLoaderWrapper.topLevelDomainCallback (node:domain:161:15)
    at SimpleURLLoaderWrapper.callbackTrampoline (node:internal/async_hooks:128:24)
  {"is_request_error":true,"network_process_crashed":false}
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: HTTP 200 (6076 ms)
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: HTTP 200 (959 ms)
Connecting to https://default.exp-tas.com: HTTP 400 (1228 ms)

Number of system certificates: 104

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).