import db from "./dbconfig.mjs";
import mysql from "mysql";


export const postCreationRoute = async (req, res) => {
    const { itemtitle, itemdescription, itemprice, useremail } = req.body;

    if (!useremail || !itemtitle || !itemdescription || !itemprice) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
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
                const sqlInsert = "INSERT INTO item_listing (userid, itemtitle, itemdescription, itemprice) VALUES (?, ?, ?, ?)";
                const insertQuery = mysql.format(sqlInsert, [userid, itemtitle, itemdescription, itemprice]);

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
};

