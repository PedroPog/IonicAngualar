"use strict";
exports.__esModule = true;
exports.routes = void 0;
exports.routes = [
    {
        path: 'home',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./home/home.page'); }).then(function (m) { return m.HomePage; }); }
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'details/:id',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./details/details.page'); }).then(function (m) { return m.DetailsPage; }); }
    },
    {
        path: 'home-defer',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./home-defer/home-defer.page'); }).then(function (m) { return m.HomeDeferPage; }); }
    },
];
