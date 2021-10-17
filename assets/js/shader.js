var config = {};
$(function () {
    var $body = $(document.body), $window = $(window);
    var canvas = document.createElement('canvas');
    backgroundEnabled = canvas.getContext && canvas.getContext('2d') && $('#background-container').css('display') != 'none';
    if (backgroundEnabled) {
        config.background = {
            enabled: true,
            RENDER: {renderer: 'canvas'},
            MESH: {
                ambient: '#040404',
                diffuse: '#818181',
                width: 1.2,
                height: 1.2,
                depth: 18,
                segments: 16,
                slices: 13,
                xRange: 0.05,
                yRange: 0.05,
                zRange: 1.0,
                speed: 0.0015
            },
            LIGHT: {
                autopilot: true,
                ambient: '#737373',
                diffuse: '#737373',
                count: 1.1,
                zOffset: 500,
                xyScalar: 1,
                speed: 0.001,
                gravity: 1200,
                dampening: 0.15,
                minLimit: 8,
                maxLimit: null,
                minDistance: 20,
                maxDistance: 400,
                draw: false
            }
        }
        if ($body.hasClass('theme-ice')) {
            config.background.LIGHT.ambient = '#1165A4';
            config.background.LIGHT.diffuse = '#514311'
        } else if ($body.hasClass('theme-nature')) {
            config.background.LIGHT.ambient = '#00935B';
            config.background.LIGHT.diffuse = '#02480A'
        } else if ($body.hasClass('theme-sea')) {
            config.background.LIGHT.ambient = '#76E4CE';
            config.background.LIGHT.diffuse = '#0E411F';
            config.background.LIGHT.zOffset = 100
        } else if ($body.hasClass('theme-candy')) {
            config.background.LIGHT.ambient = '#A42D71';
            config.background.LIGHT.diffuse = '#4E2F1B'
        } else if ($body.hasClass('theme-peach')) {
            config.background.LIGHT.ambient = '#FF7171';
            config.background.LIGHT.diffuse = '#895321';
            config.background.LIGHT.zOffset = 100
        } else if ($body.hasClass('theme-light')) {
            config.background.LIGHT.ambient = '#DBAA95';
            config.background.LIGHT.diffuse = '#4F460B'
        } else if ($body.hasClass('theme-darkness')) {
            config.background.LIGHT.ambient = '#3C3C3C';
            config.background.LIGHT.diffuse = '#494949';
            config.background.LIGHT.zOffset = 200
        }
        initBackground()
    }
});