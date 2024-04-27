import db from "./dbconfig.mjs";
import mysql from "mysql";
import multer from "multer";

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("photo");

export const postCreationRoute = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error("Error uploading image:", err);
            return res.status(500).json({ error: "Error uploading image." });
        }

        const { itemtitle, itemdescription, itemprice, useremail } = req.body;

        if (!useremail || !itemtitle || !itemdescription || !itemprice) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            if (!req.file) {
                // No file uploaded, handle accordingly
                console.error("No file uploaded");
                return res.status(400).json({ error: "No file uploaded" });
            }

            db.getConnection(async (err, connection) => {
                if (err) {
                    console.error("Error getting connection:", err);
                    return res.status(500).json({ error: "Server error" });
                }
   

                // Retrieve userid based on useremail
                const sqlSearchUser = "SELECT userid FROM userinfo WHERE useremail = ?";
                const searchUserQuery = mysql.format(sqlSearchUser, [useremail]);


                connection.query(searchUserQuery, (err, userResult) => {
                    if (err) {
                        console.error("Error retrieving user:", err);
                        connection.release();
                        return res.status(500).json({ error: "Server error" });
                    }

                    if (userResult.length === 0) {
                        console.log("User not found");
                        connection.release();
                        return res.status(404).json({ error: "User not found" });
                    }

                    const userid = userResult[0].userid;

                    // Insert item listing with retrieved userid
                    const sqlInsert = "INSERT INTO item_listing (userid, itemtitle, itemdescription, itemprice, photo) VALUES (?, ?, ?, ?, ?)";
                    const insertQuery = mysql.format(sqlInsert, [userid, itemtitle, itemdescription, itemprice, req.file.buffer]);

                    connection.query(insertQuery, (err, result) => {
                        connection.release();
                        if (err) {
                            console.error("Error executing insert query:", err);
                            return res.status(500).json({ error: "Server error" });
                        }

                        console.log("New item listing created");
                        return res.status(201).json({ message: "Item listing creation successful", itemId: result.insertId });
                    });
                });
            });
        } catch (error) {
            console.error("Error creating item listing:", error);
            return res.status(500).json({ error: "Server error" });
        }
    });
};
