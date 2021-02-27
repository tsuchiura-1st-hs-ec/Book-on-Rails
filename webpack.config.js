const path = require('path');

module.exports = {
    entry: './src/job.js.erb',
    rules: 'babel-loader',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'main.js'
    },
};
