const router = require("express").Router();
const verify = require("./verifyToken");

router.get('/', verify, (req, res) => {
    // res.json({
    //     test: {
    //         title: 'test',
    //         description: 'private route test'
    //     }
    // });
    res.send(req.user);
});

module.exports = router;