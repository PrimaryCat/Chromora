const Debugger = (() => {
    const DEBUG = false;

    function debugMessage(){
        if(DEBUG){
            fetch('./data/version.json')
            .then((response) => response.json())
            .then((json) => {
                const version = json["version"];
                const changes = json["changelog"];
                let msg = "Color Thing by Fırat Usta v" + version + "\nChangelog:";
                changes.forEach(change => {
                    msg += "\n    -" + change;
                })
                console.log(msg);
        
                const debugText = document.createElement("p");
                debugText.classList.add("debugLabel");
                debugText.innerText = "DEBUG BUILD VERSION v" + version;
                document.body.appendChild(debugText);
            });
        }
    }
    
    function log(message){
        if(DEBUG){
            console.log(message);
        };
    }

    function refresh(){
        (async () => {
            try {
                if ("serviceWorker" in navigator) {
                    const regs = await navigator.serviceWorker.getRegistrations();
                    await Promise.all(regs.map(r => r.unregister()));
                    log("Service worker unregistered.");
                }
                if ("caches" in window) {
                    const names = await caches.keys();
                    await Promise.all(names.map(n => caches.delete(n)));
                    log("Caches cleared.");
                }
            } finally {
                window.location.reload();
            }
        })();
    }

    return{
        debugMessage,
        log,
        refresh
    }
})();

export{Debugger}