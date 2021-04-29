package changePass

import (
	"coffeeShop/cmd/dbConn"
	"coffeeShop/internal/hash"
	"coffeeShop/internal/jwt"

	"net/http"

	"github.com/gin-gonic/gin"
)

type User struct {
	OldPass string `json:"oldpass"`
	NewPass string `json: "newpass"`
	DBPass  string `json: "dbpass"`
}

func ChangePass(c *gin.Context) {

	var user User

	payload, err := jwt.VerifyToken(c)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "You are not authorized!"})
	} else {
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid JSON provided."})
			return
		}

		db := dbConn.DbConn()

		if err := db.QueryRow("SELECT password FROM users WHERE id = (?);", payload.User_id).Scan(&user.DBPass); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"database error at reading pass from db": err})
			return
		}

		if !hash.Match(user.OldPass, user.DBPass) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Incorrect password."})
			return
		}

		insData, err := db.Prepare("UPDATE users SET password = (?) WHERE id = (?);")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "database error during UPDATE"})
			return
		}

		newPassword := user.NewPass
		hashedPassword, _ := hash.Password(newPassword)

		insData.Exec(hashedPassword, payload.User_id)
		defer insData.Close()

		c.JSON(http.StatusOK, gin.H{"message": "Your password has been changed"})
		return

	}
}
