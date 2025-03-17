

function _(element) {
    return document.querySelector(element);
}

// code for dropdown menu.

document.addEventListener('click', e => {
    const isDropdown = e.target.closest('.dropdown');

    let currentDropdown;
    if (isDropdown) {
        console.log('its dropdown');

        currentDropdown = e.target.closest('.dropdown');
        currentDropdown.classList.add('active');
    }

    document.querySelectorAll('.dropdown').forEach(dropdown => {
        if (dropdown === currentDropdown){
            return;
        } else {
            dropdown.classList.remove('active');
        }
    })
});

_('.home-btn').addEventListener('click', () => {
    window.location.href = '/main-page';
})