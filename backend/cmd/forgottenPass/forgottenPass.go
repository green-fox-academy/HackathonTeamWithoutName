package forgottenPass

import (
	"coffeeShop/cmd/dbConn"
	"coffeeShop/internal/emailValidation"
	"coffeeShop/internal/hash"
	"coffeeShop/internal/passResetEmail"
	"coffeeShop/internal/randomStringGenerator"
	"net/http"

	"github.com/gin-gonic/gin"
)

type User struct {
	Username string `json:"username"`
	Email    string `json:"email"`
}

func ForgottenPass(c *gin.Context) {

	var user User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid JSON provided."})
		return
	}

	if e := user.Email; !emailValidation.IsEmailValid(e) {
		c.JSON(http.StatusBadRequest, gin.H{"error": user.Email + "is not a valid email."})
		return
	}

	var isEmailExists int
	db := dbConn.DbConn()

	if err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE email = (?));", user.Email).Scan(&isEmailExists); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "database error"})
		return
	}

	if isEmailExists == 1 {
		insData, err := db.Prepare("UPDATE users SET password = (?) WHERE email = (?);")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "database error"})
			return
		}

		newPassword := randomStringGenerator.GenerateRandomString(12)
		hashedPassword, _ := hash.Password(newPassword)

		insData.Exec(hashedPassword, user.Email)

		if err := db.QueryRow("SELECT username FROM users WHERE email = (?);", user.Email).Scan(&user.Username); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "database error"})
			return
		}

		passResetEmail.SendNewPasswordEmail(user.Username, newPassword, user.Email)

		c.JSON(http.StatusOK, gin.H{"message": "Your password has been reset, you can find your new password in the email sent to " + user.Email})
		return

	} else if isEmailExists == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email address not found."})
		return
	}
}
