import db from "./dbconfig.mjs";
import mysql from "mysql";

export const viewCartRoute = async (req, res) => {
    // Extract user ID from session
    const userID = req.session.userid;

    // Validate input
    if (!userID) {
        return res.status(400).json({ error: 'Missing user ID' });
    }

    try {
        // Get a connection from the pool
        db.getConnection((err, connection) => {
            if (err) {
                console.error("Error getting database connection:", err);
                return res.status(500).json({ error: "Server error" });
            }

            // Query to retrieve all items in the user's cart with details
            const sqlQuery = `
                SELECT cart.cart_id, item_listing.itemtitle, item_listing.itemprice
                FROM cart
                INNER JOIN item_listing ON cart.item_id = item_listing.item_id
                WHERE cart.userid = ?
            `;
            const query = mysql.format(sqlQuery, [userID]);

            // Execute the query
            connection.query(query, (err, results) => {
                connection.release();
                if (err) {
                    console.error("Error retrieving items from cart:", err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                // Send the retrieved items in the response
                res.json({ items: results.map(({ itemtitle, itemprice }) => ({ itemtitle, itemprice })) });
            });
        });
    } catch (error) {
        console.error('Error retrieving items from cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
