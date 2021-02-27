const path = require('path');

module.exports = {
    entry: './src/job.js.erb',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'main.js'
    },
    node: false
};
