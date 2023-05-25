const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getAllTes = (req, res, next) => {
    conn.query("SELECT * FROM tes", function (err, data, fields) {
        if (err) return next(new AppError(err))
        res.status(200).json({
            status: "success",
            length: data ?.length,
            data: data,
        });
    });
};

exports.createTes = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    var jumlah = 0;
    conn.query("SELECT COUNT(id) AS jumlah FROM tes LIMIT 1", function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        jumlah = data[0].jumlah; 
        console.log(data); 
        
        const values = [jumlah + 1, req.body.pesan];
        conn.query(
            "INSERT INTO tes (id, pesan) VALUES(?)",
            [values],
            function (err, data, fields) {
                if (err) return next(new AppError(err, 500));
                res.status(201).json({
                    status: "success",
                    message: "tes created!",
                });
            }
        );
    });
};

exports.getTes = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No tes id found", 404));
    }
    conn.query(
        "SELECT * FROM tes WHERE id = ?",
        [req.params.id],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
                status: "success keknya",
                length: data ?.length,
                coba: req.params.coba,
                data: data,
            });
        }
    );
};

exports.updateTes = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No tes id found", 404));
    }
    console.log(req);
    conn.query(
        "UPDATE tes SET pesan=? WHERE id=?",
        [req.body.pesan, req.params.id],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "todo updated!",
            });
        }
    );
};

exports.deleteTes = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No tes id found", 404));
    }
    conn.query(
        "DELETE FROM tes WHERE id=?",
        [req.params.id],
        function (err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "todo deleted!",
            });
        }
    );
}