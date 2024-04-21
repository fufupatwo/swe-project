import db from "./dbconfig.mjs";
import mysql from "mysql";

export const allPostsRoute = async (req, res) => {
    const sql = "SELECT itemtitle, itemdescription, itemprice FROM item_listing";
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json(result);
      }
    });
  };
