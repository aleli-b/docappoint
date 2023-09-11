require("dotenv").config({ path: "./.env" });
const { Turno, User, Labtest } = require("../db");
const { aws_upload_pdf } = require("../utils/S3")

async function getLabtests(req, res) {
    try {
        const { userId, doctorId, labId } = req.query;
        if (userId === undefined && doctorId === undefined && labId === undefined) {
            return res.status(400).send('No se ha enviado la información adecuada');
        }

        let test;
        if (userId) {
            test = await Labtest.findAll({
                where: {
                  userId: userId
                },
                include: [
                  {
                    model: User,
                    as: "labtestDoctor"
                  },
                  {
                    model: User,
                    as: "labtestLab",
                    include: [
                      {
                        model: Turno,
                        as: "labTurno"
                      }
                    ]
                  }
                ]
              });
        } else if (doctorId) {
            test = await Labtest.findAll({
                where: {
                    doctorId: doctorId
                },
                include: ["labtestLab", "labtestPatient"],
            });
        } else if (labId) {
            test = await Labtest.findAll({
                where: {
                    labId: labId
                },
                include: ["labtestDoctor", "labtestPatient"],
            });
        }

        if (test) {
            return res.status(200).send(test);
        } else {
            return res.status(404).send('No se encontró ningún resultado');
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send('Ha habido un error');
    }
}

async function addOrder(req, res) {
    try {
        const { labId, userId, doctorId, } = req.body;
        const labtest = new Labtest({
            labId: labId,
            userId: userId,
            doctorId: doctorId,
        })
        await labtest.save();
        return res.status(200).send('exitos')
    } catch (error) {
        console.log(error);
        return res.status(400).send('Ha habido un error')
    }
}

async function uploadLabtest(req, res) {
    try {
        const { labId, userId, doctorId, } = req.body;
        const url = await aws_upload_pdf(req.body);
        const labtest = new Labtest({
            lab_test_url: url.url,
            labId: labId,
            userId: userId,
            doctorId: doctorId,
        })
        await labtest.save();
        return res.status(200).send('SUBIDO PDF');
    } catch (error) {
        console.log(error);
        return res.status(400).send('Ha habido un error');
    }
}

module.exports = {
    getLabtests,
    addOrder,
    uploadLabtest,
}