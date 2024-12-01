var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    return function( obj, callback ){
        if( !obj || obj.nodeType !== 1 ) return;
        if( MutationObserver ){
            // define a new observer
            var mutationObserver = new MutationObserver(callback)
            // have the observer observe for changes in children
            mutationObserver.observe( obj, { childList:true, subtree:true })
            return mutationObserver
        }
        // browser support fallback
        else if( window.addEventListener ){
            obj.addEventListener('DOMNodeInserted', callback, false)
            obj.addEventListener('DOMNodeRemoved', callback, false)
        }
    }
})()

var listElm = null;

const questionObserver = function(m){

    var addedNodes = [], removedNodes = [];
    m.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))
    m.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes))
    //console.clear();
    console.log('Added:', addedNodes, 'Removed:', removedNodes);

    for (nd of addedNodes) {
        const content = nd.innerText;
        if (content.includes("· 0 关注")) {
            nd.style.display = 'none'
            console.log("Hide 0 follow question: " + nd.textContent);
        }
        var nodeLength = nd.firstChild.firstChild.children.length
        if (nodeLength === 3) {
            nd.firstChild.firstChild.firstChild.style.display = 'none'
            nd.firstChild.firstChild.children[1].style.whiteSpace = 'nowrap'
            console.log("Hide text: " + nd.firstChild.firstChild.firstChild.textContent);
        } else if (nodeLength === 2) {
            nd.firstChild.firstChild.children[0].style.whiteSpace = 'nowrap'
        }
    }
}

const observeUrlChange = () => {
    let oldHref = document.location.href;
    const body = document.querySelector("body");
    const observer = new MutationObserver(mutations => {
        if (oldHref !== document.location.href) {
            oldHref = document.location.href;

            listElm = document.querySelector("div.css-0[role=list]");
            observeDOM(listElm, questionObserver);
        }
    });
    observer.observe(body, { childList: true, subtree: true });
};

window.onload = observeUrlChange;


