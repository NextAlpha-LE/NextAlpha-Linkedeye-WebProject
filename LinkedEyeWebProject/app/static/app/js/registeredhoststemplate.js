var _0x306256 = _0x51e8;
(function (_0x2d8a3f, _0x4cab67) {
    var _0x125a79 = _0x51e8,
        _0xd07b5 = _0x2d8a3f();
    while (!![]) {
        try {
            var _0x153f03 = -parseInt(_0x125a79(0x89)) / 0x1 + parseInt(_0x125a79(0xa8)) / 0x2 * (-parseInt(_0x125a79(0xa7)) / 0x3) + parseInt(_0x125a79(0x98)) / 0x4 + -parseInt(_0x125a79(0x8a)) / 0x5 * (-parseInt(_0x125a79(0x9a)) / 0x6) + -parseInt(_0x125a79(0x8b)) / 0x7 * (-parseInt(_0x125a79(0x99)) / 0x8) + parseInt(_0x125a79(0x91)) / 0x9 + parseInt(_0x125a79(0xb5)) / 0xa * (-parseInt(_0x125a79(0x95)) / 0xb);
            if (_0x153f03 === _0x4cab67) break;
            else _0xd07b5['push'](_0xd07b5['shift']());
        } catch (_0x41c02b) {
            _0xd07b5['push'](_0xd07b5['shift']());
        }
    }
}(_0x5e80, 0x3fb6f));

function _0x5e80() {
    var _0x4b89c5 = ['contact_email', '</b></p>', 'text', '<p\x20class=\x22mb-2\x20col-4\x20pl-0\x22>Application\x20:<b>\x20', 'friend', 'length', 'application', 'click', 'location', '80yhdkaz', '/allonboard/?', 'server_type', '</a>', '/allonboard/gethostservicedata', '453205QLOpov', '2280895aaaCNV', '4445hXDObW', '<div\x20class=\x22col-12\x22>', '</b>\x20</p>', 'host_name', 'origin', 'forEach', '3665619mJiTRx', ')</b>\x20</p>', '<a\x20style=\x22cursor:\x20pointer;\x22\x20onclick=\x22editHostsRegistered(this)\x22\x20data-ipaddress=\x22', 'append', '663718EExEdi', '<p\x20class=\x22mb-2\x20col-4\x20pl-0\x22>Contact\x20Email\x20:<b>', '</div>', '1113624OZgFHk', '5000VgtWrj', '6fKPrJb', 'ready', '.add-host', 'status', '<div\x20class=\x22row\x22>', '<p\x20class=\x22text-center\x20size12\x22>No\x20Registered\x20Hosts\x20Data...</p>', '!redirectToEditRegisteredHostsPage', '<p\x20class=\x22mb-2\x20col-4\x20pl-0\x22>IP\x20Address\x20:<b>', 'GET', '<div\x20class=\x22card\x20col-4\x20item\x22>', '#reg-host-data', '<p\x20class=\x22mb-2\x20col-4\x20pl-0\x22>Name\x20:\x20<b>', 'data', '53979bazfHd', '38gkBMsE', '#totalHosts', '/allonboard/?redirectToAddhostPage', 'href'];
    _0x5e80 = function () {
        return _0x4b89c5;
    };
    return _0x5e80();
}
var totalHosts = 0x0;
$(document)[_0x306256(0x9b)](function () {
    var _0x1c1375 = _0x306256;
    getHostDetails(), $(_0x1c1375(0x9c))[_0x1c1375(0xb3)](function () {
        addHost();
    });
});

function getHostDetails() {
    var _0x166c56 = _0x306256;
    requestDataFromServer(_0x166c56(0x88), {}, _0x166c56(0xa2))['done'](getHostResponse);
}

function _0x51e8(_0x836941, _0x378856) {
    var _0x5e8029 = _0x5e80();
    return _0x51e8 = function (_0x51e838, _0x3b392a) {
        _0x51e838 = _0x51e838 - 0x86;
        var _0x58283b = _0x5e8029[_0x51e838];
        return _0x58283b;
    }, _0x51e8(_0x836941, _0x378856);
}

function getHostResponse(_0x5ca4de) {
    var _0x36a506 = _0x306256;
    res = JSON['parse'](_0x5ca4de), $(_0x36a506(0xa4))['empty']();
    var _0x20c58c = '';
    if (res[_0x36a506(0x9d)] == 0xc8) {
        var _0x4defc3 = res[_0x36a506(0xa6)];
        _0x4defc3[_0x36a506(0xb1)] > 0x0 ? (totalHosts = _0x4defc3['length'], $(_0x36a506(0xa9))['text'](totalHosts), _0x4defc3[_0x36a506(0x90)](function (_0x2c2c34) {
            var _0x458e47 = _0x36a506;
            _0x20c58c += _0x458e47(0xa3), _0x20c58c += _0x458e47(0x8c), _0x20c58c += _0x458e47(0x93) + _0x2c2c34['address'] + '\x22>', _0x20c58c += _0x458e47(0x9e), _0x20c58c += _0x458e47(0xa5) + _0x2c2c34[_0x458e47(0xb0)] + _0x458e47(0xad), _0x20c58c += _0x458e47(0x97), _0x20c58c += _0x458e47(0x9e), _0x20c58c += _0x458e47(0xa1) + _0x2c2c34[_0x458e47(0x8e)] + '\x20(' + _0x2c2c34[_0x458e47(0x86)] + _0x458e47(0x92), _0x20c58c += _0x458e47(0x97), _0x20c58c += _0x458e47(0x9e), _0x20c58c += _0x458e47(0xaf) + _0x2c2c34[_0x458e47(0xb2)] + '</b></p>', _0x20c58c += '</div>', _0x20c58c += _0x458e47(0x9e), _0x20c58c += _0x458e47(0x96) + _0x2c2c34[_0x458e47(0xac)] + _0x458e47(0x8d), _0x20c58c += _0x458e47(0x97), _0x20c58c += _0x458e47(0x87), _0x20c58c += '</div>', _0x20c58c += _0x458e47(0x97);
        })) : ($('#totalHosts')[_0x36a506(0xae)](totalHosts), _0x20c58c += _0x36a506(0x9f)), $('#reg-host-data')[_0x36a506(0x94)](_0x20c58c);
    }
}

function addHost() {
    var _0x310647 = _0x306256;
    window[_0x310647(0xb4)]['href'] = window[_0x310647(0xb4)][_0x310647(0x8f)] + _0x310647(0xaa);
}

function editHostsRegistered(_0x3d92e8) {
    var _0xe894f7 = _0x306256,
        _0x1a34ae = $(_0x3d92e8)['attr']('data-ipaddress');
    window[_0xe894f7(0xb4)][_0xe894f7(0xab)] = window[_0xe894f7(0xb4)][_0xe894f7(0x8f)] + _0xe894f7(0xb6) + _0x1a34ae + _0xe894f7(0xa0);
}