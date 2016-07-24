var express = require('express');
var router = express.Router();

var emailHandler = require('../routes/emailHandler');

///////////////////////////////////////////////////////////////////////////
// GET page - SendMail

router.get('/', function(req, res, next)
{
   res.render( 'sendmail', { title: 'Send Mail' } );
});

///////////////////////////////////////////////////////////////////////////
// POST - SendMail

router.post('/', function(req, res)
{
    var db = req.db;

    var dtStart = new Date(req.body.StartDate);
    var dtEnd   = new Date(req.body.EndDate);

    dtStart.setHours(0,0,0);
    dtEnd.setHours(23,59,59);

    emailHandler.sendAlbumsToAllUsers(res, db, dtStart, dtEnd, function(err)
    {
        if(err)
        {
            var sErrorText = err.message;
            var sErrorPath = err.path;

            res.send(sErrorText);
        }
        else
        {
            res.send('Emails sent');
        }
    });
});

///////////////////////////////////////////////////////////////////////////

module.exports = router;
