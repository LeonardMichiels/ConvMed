window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
}, false);

window.onload = function () {
    const html = document.documentElement;
    const vh = Math.max(html.clientHeight || 0, window.innerHeight || 0)
    var height = Math.max(document.body.scrollHeight, document.body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    document.body.style.setProperty('--nvh', height / vh);
};