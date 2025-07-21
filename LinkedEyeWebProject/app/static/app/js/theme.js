

$(document).ready(function () {
    var style = null;
});

let switches = document.getElementsByClassName('switch');

 style = localStorage.getItem('style');

if (style == null) {
    setTheme('green');
} else {
    setTheme(style);
}

for (let i of switches) {
    i.addEventListener('click', function () {
        let theme = this.dataset.theme;
        setTheme(theme);
    });
}

function setTheme(theme) {
    if (theme == 'green') {
       // console.log("green theme ")
       // console.log('Current directory: ' + window.location.pathname);
       // console.log(document.getElementById('switcher-id'))
        document.getElementById('switcher-id').href = '../static/app/themes/green_theme.css';
    } else if (theme == 'grey') {
        document.getElementById('switcher-id').href = '../static/app/themes/lightgrey_theme.css';
    } else if (theme == 'brown') {
        document.getElementById('switcher-id').href = '../static/app/themes/brown_theme.css';
    } else if (theme == 'dark') {
        document.getElementById('switcher-id').href = '../static/app/themes/goldenbrown_theme.css';
    } else if (theme == 'purple') {
        document.getElementById('switcher-id').href = '../static/app/themes/purple_theme.css';
    } else if (theme == 'red') {
        document.getElementById('switcher-id').href = '../static/app/themes/greenorange_theme.css';
    } else if (theme == 'pink') {
        document.getElementById('switcher-id').href = '../static/app/themes/pink_theme.css';
    }
    localStorage.setItem('style', theme);
}