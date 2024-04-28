import db from "./dbconfig.mjs";
import mysql from "mysql";

export const getPostByIdRoute = async (req, res) => {
    try {
        const { itemid } = req.params; // Retrieve itemid from URL parameters

        db.getConnection(async (err, connection) => {
            if (err) {
                console.error("Error getting connection:", err);
                return res.status(500).json({ error: "Server error" });
            }

            const sqlFetchPostById = "SELECT * FROM item_listing WHERE item_id = ?";
            connection.query(sqlFetchPostById, [itemid], (err, post) => {
                connection.release();
                if (err) {
                    console.error("Error fetching post:", err);
                    return res.status(500).json({ error: "Server error" });
                }

                if (!post || post.length === 0) {
                    return res.status(404).json({ error: "Post not found" });
                }

                console.log("Fetched post successfully");
                return res.status(200).json(post[0]); // Assuming itemid is unique, return the first (and only) result
            });
        });
    } catch (error) {
        console.error("An error occurred while fetching post:", error);
        return res.status(500).json({ error: "Server error" });
    }
};
