var express = require('express');
var app = express();

require('./router/main')(app);

app.use(express.static('public'));
app.set('port', (process.env.PORT || 5000));
app.set('views',__dirname + '/');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


