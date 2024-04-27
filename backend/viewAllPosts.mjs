import db from "./dbconfig.mjs";
import mysql from "mysql";

export const allPostsRoute = async (req, res) => {
    try {
        db.getConnection(async (err, connection) => {
            if (err) {
                console.error("Error getting connection:", err);
                return res.status(500).json({ error: "Server error" });
            }

            const sqlFetchPosts = "SELECT photo, itemtitle, itemdescription, itemprice FROM item_listing";
            connection.query(sqlFetchPosts, (err, posts) => {
                connection.release();
                if (err) {
                    console.error("Error fetching posts:", err);
                    return res.status(500).json({ error: "Server error" });
                }

                console.log("Fetched posts successfully");
                return res.status(200).json(posts);
            });
        });
    } catch (error) {
        console.error("An error occurred while fetching posts:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

