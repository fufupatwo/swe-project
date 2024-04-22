import db from "./dbconfig.mjs";
import mysql from "mysql";

export const addCartRoute = async (req, res) => {
    // Extract user ID from session
    const userID = req.session.userid;

    // Extract item title from request body
    const { itemtitle } = req.body;

    // Validate input
    if (!userID || !itemtitle) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        // Get a connection from the pool
        db.getConnection((err, connection) => {
            if (err) {
                console.error("Error getting database connection:", err);
                return res.status(500).json({ error: "Server error" });
            }

            // Query itemid based on itemtitle
            const sqlSearch = "SELECT item_id FROM item_listing WHERE itemtitle = ?";
            const searchQuery = mysql.format(sqlSearch, [itemtitle]);

            // Execute the search query
            connection.query(searchQuery, async (err, result) => {
                if (err) {
                    console.error("Error executing search query:", err);
                    connection.release();
                    return res.status(500).json({ error: "Server error" });
                }

                // Check if item exists
                if (result.length === 0) {
                    connection.release();
                    return res.status(404).json({ error: 'Item not found' });
                }

                // Extract itemid from the result
                const itemID = result[0].item_id;

                // Insert item into cart table
                const sqlInsert = "INSERT INTO cart (userid, item_id) VALUES (?, ?)";
                const insertQuery = mysql.format(sqlInsert, [userID, itemID]);

                // Execute the insert query
                connection.query(insertQuery, (err, result) => {
                    connection.release();
                    if (err) {
                        console.error("Error adding item to cart:", err);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    res.json({ message: 'Item added to cart successfully' });
                });
            });
        });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
