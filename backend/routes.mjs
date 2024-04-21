import bcrypt from "bcrypt";
import db from "./dbconfig.mjs";
import mysql from "mysql";

// Create user route
export const createUserRoute = async (req, res) => {
    const { user_fname, user_lname, useremail, password, passwordConfirm } = req.body;

    if (!user_fname || !user_lname || !useremail || !password || !passwordConfirm) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== passwordConfirm) {
        console.log("Passwords don't match");
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.getConnection(async (err, connection) => {
            if (err) {
                console.error("Error getting connection:", err);
                return res.status(500).json({ error: "Server error" });
            }

            const sqlSearch = "SELECT * FROM userinfo WHERE useremail = ?";
            const searchQuery = mysql.format(sqlSearch, [useremail]);

            connection.query(searchQuery, async (err, result) => {
                if (err) {
                    console.error("Error executing search query:", err);
                    connection.release();
                    return res.status(500).json({ error: "Server error" });
                }

                if (result.length > 0) {
                    console.log("User already exists");
                    connection.release();
                    return res.status(409).json({ error: "User already exists" });
                } else {
                    const sqlInsert = "INSERT INTO userinfo (user_fname, user_lname, useremail, password) VALUES (?, ?, ?, ?)";
                    const insertQuery = mysql.format(sqlInsert, [user_fname, user_lname, useremail, hashedPassword]);

                    connection.query(insertQuery, (err, result) => {
                        connection.release();
                        if (err) {
                            console.error("Error executing insert query:", err);
                            return res.status(500).json({ error: "Server error" });
                        }

                        console.log("New user created");
                        return res.status(201).json({ message: "User creation successful", userId: result.insertId });
                    });
                }
            });
        });
    } catch (error) {
        console.error("Error hashing password:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

// Login logic for authenticating a user
export const loginRoute = async (req, res) => {
    const user = req.body.name;
    const password = req.body.password;

    db.getConnection(async (err, connection) => {
        if (err) throw err;
        const sqlSearch = "SELECT * FROM userinfo WHERE user = ?";
        const search_query = mysql.format(sqlSearch, [user]);

        await connection.query(search_query, async (err, result) => {
            connection.release();
            if (err) throw err;

            if (result.length === 0) {
                console.log("---> user does not exist");
                return res.sendStatus(404);
            } else {
                const hashedPassword = result[0].password;
                if (await bcrypt.compare(password, hashedPassword)) {
                    console.log("---> login was successful");
                    return res.send(`${user} is logged in!`);
                } else {
                    console.log("---> pass was incorrect");
                    return res.send("Password incorrect");
                }
            }
        });
    });
};
// Admin login route
export const adminLoginRoute = async (req, res) => {
    const adminName = req.body.adminName;
    const adminPassword = req.body.adminPassword;

    db.getConnection(async (err, connection) => {
        if (err) {
            console.error("Error getting database connection:", err);
            return res.status(500).json({ error: "Server error" });
        }

        // Query the database to get admin data by username
        const sqlSearch = "SELECT * FROM admin_information WHERE admin_username = ?";
        const searchQuery = mysql.format(sqlSearch, [adminName]);

        connection.query(searchQuery, async (err, result) => {
            connection.release();
            if (err) {
                console.error("Error executing search query:", err);
                return res.status(500).json({ error: "Server error" });
            }

            // If no admin found or incorrect password, return unauthorized
            if (result.length === 0 || result[0].admin_password !== adminPassword) {
                console.log("---> admin authentication failed");
                return res.sendStatus(401); // Unauthorized access
            }

            // If authenticated, return admin data in JSON format
            console.log("---> admin login successful");
            const adminData = {
                admin_id: result[0].admin_id,
                admin_username: result[0].admin_username,
                admin_email: result[0].admin_email
            };
            return res.status(200).json(adminData);
        });
    });
};

