const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/job.js.erb',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'main.js'
    },
};
