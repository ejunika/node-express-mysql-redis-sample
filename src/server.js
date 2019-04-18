const express = require('express');
const app = express();
const dbUtils = require('./db-utils');

app.use(express.json());

app.get('/sahaz/records', (req, res) => {
    let queryString = `
        SELECT id, name, class FROM records;
    `;
    dbUtils.pool.getConnection((err, connection) => {
        if (err) {
            next(err);
        }
        connection.query(queryString, (err, results, fields) => {
            if (err) {
                next(err);
            } else {
                res.send({
                    status: 'success',
                    data: results
                });
            }
        });
    });
});

app.get('/sahaz/records/:id', (req, res) => {
    let id = req.params.id;
    let queryString = `
        SELECT id, name, class FROM records WHERE id = '${id}';
    `;
    dbUtils.pool.getConnection((err, connection) => {
        if (err) {
            connection.release();
            next(err);
        }
        connection.query(queryString, (err, results, fields) => {
            connection.release();
            if (err) {
                next(err);
            } else {
                res.send({
                    status: 'success',
                    data: results
                });
            }
        });
    });
});

app.post('/sahaz/records', (req, res, next) => {
    let payload = req.body;
    dbUtils.pool.getConnection((err, connection) => {
        if (err) {
            connection.release();
            next(err);
        }
        connection.query(`INSERT INTO records(id, name, class) VALUES ('${payload.id}', '${payload.name}', '${payload.class}')`, (err, results, fields) => {
            connection.release();
            if (err) {
                next(err);
            } else {
                res.send({
                    status: 'success'
                });
            }
        });
    });
});

app.put('/sahaz/records/:id', () => {
    let palyload = req.body;
    console.log(palyload);
    res.send({
        status: 'success'
    });
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({
        error: err
    });
})

app.listen(2233, () => {
    console.log('Server is listening at port 2233');
});
