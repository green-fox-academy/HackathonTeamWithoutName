package login

import (
	"coffeeShop/cmd/dbConn"
	"coffeeShop/internal/hash"
	"coffeeShop/internal/jwt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type User struct {
	ID         uint64 `json:"id"`
	Username   string `json:"userName"`
	Password   string `json:"password"`
	isVerified uint
}

func LoginFunction(c *gin.Context) {
	var userFromWeb User

	if err := c.ShouldBindJSON(&userFromWeb); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": "Invalid json provided"})
		return
	}

	var isUsernameExists int

	db := dbConn.DbConn()
	if err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE username = (?));", userFromWeb.Username).Scan(&isUsernameExists); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "database error11"})
		return
	}
	if userFromWeb.Username == "" && userFromWeb.Password == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "All fields are required"})
		return
	}
	if userFromWeb.Username == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Username is required."})
		return
	}
	if isUsernameExists == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Username or password is incorrect."})
		return

	} else {

		var userFromDB User
		if err := db.QueryRow("SELECT id, username, password, is_verified FROM users WHERE username = (?);", userFromWeb.Username).Scan(&userFromDB.ID, &userFromDB.Username, &userFromDB.Password, &userFromDB.isVerified); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "database error3"})
			return
		}
		if userFromWeb.Password == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Password is required."})
			return
		}
		if userFromDB.Username == userFromWeb.Username && !hash.Match(userFromWeb.Password, userFromDB.Password) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Username or password is incorrect."})
			return
		}
		if userFromDB.isVerified == 0 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Please verify your account."})
			return
		}
		token, err := jwt.CreateToken(userFromDB.ID)
		if err != nil {
			c.JSON(http.StatusUnprocessableEntity, err.Error())
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "ok", "accessToken": token, "id": userFromDB.ID})
	}
}
