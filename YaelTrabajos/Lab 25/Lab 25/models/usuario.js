const bcrypt = require("bcryptjs");
const db = require("../util/database");

module.exports = class Usuario {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  save() {
    return db.execute("INSERT INTO User (username, password) VALUES(?, ?)", [
      this.username,
      this.password,
    ]);
  }

  update() {
    db.execute("UPDATE User SET username = ?, password = ? WHERE id = ?", [
      this.username,
      this.password,
      this.id,
    ]);
  }

  static searchByUsername(username) {
    return db.execute("SELECT * FROM User WHERE username = ?", [username]);
  }

  static encriptarPassword(password) {
    return bcrypt.hash(password, 12);
  }

  static delete(id) {
    return db.execute("DELETE FROM User WHERE id = ?", [id]);
  }

  static search(id) {
    return db.execute("SELECT * FROM User WHERE id = ?", [id]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM User");
  }
};
