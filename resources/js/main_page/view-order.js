
function _(element) {
    return document.querySelector(element);
}

_('.test').addEventListener('click', () => {
    console.log('test');
});