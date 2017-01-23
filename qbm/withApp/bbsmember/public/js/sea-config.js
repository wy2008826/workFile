seajs.config({
    alias: {
        'zepto': 'plugin/zepto/zepto.min.js',
        'fastclick': 'plugin/fastclick.min.js',
        'zeptoTouch': 'plugin/zepto/touch.js',
        'dropload': 'plugin/dropload.min.js',
        'artTemplate': 'plugin/artTemplate/template.js',
        'artTemplateHelper': 'plugin/artTemplate/helper.js',
        'swiper': 'plugin/swiper/swiper.min.js',
        'layer': 'plugin/layer.m/layer.m.js',
        'layerCss': 'plugin/layer.m/need/layer.css'
    },

    map: [[/^(.*\.(?:css|js))(.*)$/i, '$1?v=20160419']],
    charset: 'utf-8'
});

