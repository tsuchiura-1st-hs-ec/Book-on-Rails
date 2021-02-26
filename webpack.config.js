const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/job.js.erb',
    loader: 'babel-loader',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'main.js'
    },
};
