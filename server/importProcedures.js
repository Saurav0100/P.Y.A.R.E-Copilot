const mongoose = require("mongoose");
const fs = require("fs");

require("dotenv").config();


// ===============================
// PROCEDURE SCHEMA
// ===============================

const procedureSchema = new mongoose.Schema({
    filename: String,
    content: String
});

const Procedure = mongoose.model("Procedure", procedureSchema);


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose.connect(process.env.MONGO_URI)

    .then(async () => {

        console.log("MongoDB connected successfully");

        try {

            const proceduresPath = "../data/procedures";

            const files = fs.readdirSync(proceduresPath);

            const procedures = [];

            files.forEach((file) => {

                if (file.endsWith(".md")) {

                    const content = fs.readFileSync(
                        `${proceduresPath}/${file}`,
                        "utf8"
                    );

                    procedures.push({
                        filename: file,
                        content: content
                    });

                }

            });

            await Procedure.deleteMany({});

            await Procedure.insertMany(procedures);

            console.log(
                `${procedures.length} procedure records imported successfully!`
            );

            mongoose.connection.close();

        } catch (error) {

            console.log(
                "Import failed:",
                error.message
            );

            mongoose.connection.close();

        }

    })

    .catch((error) => {

        console.log(
            "MongoDB connection failed:",
            error.message
        );

    });