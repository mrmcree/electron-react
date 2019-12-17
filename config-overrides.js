const {override, fixBabelImports} = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
    })
);
// module.exports = function override(config) {
//     config.target = 'electron-renderer'
//     return config;
// }
