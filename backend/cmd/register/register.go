package register

import (
	"coffeeShop/cmd/dbConn"
	"coffeeShop/internal/email"
	"coffeeShop/internal/emailValidation"
	"coffeeShop/internal/hash"
	"coffeeShop/internal/jwt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserForRegister struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

type UserForResult struct {
	Id       uint64 `json:"id"`
	Username string `json:"username"`
}

func RegisterTheUser(c *gin.Context) {

	var user UserForRegister

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid JSON provided."})
		return
	}

	if user.Username == "" && user.Password == "" && user.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username, password and email are required."})
		return
	}

	if user.Username == "" && user.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username and email are required."})
		return
	}

	if user.Password == "" && user.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Password and email are required."})
		return
	}

	if user.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email is required."})
		return
	}

	if user.Username == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username is required."})
		return
	}

	if user.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Password is required."})
		return
	}

	if len(user.Password) < 8 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Password must be 8 characters long."})
		return
	}

	if e := user.Email; !emailValidation.IsEmailValid(e) {
		c.JSON(http.StatusBadRequest, gin.H{"error": user.Email + "is not a valid email."})
		return
	}

	var isUsernameExists int
	var isEmailExists int
	db := dbConn.DbConn()
	defer db.Close()

	if err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE username = (?));", user.Username).Scan(&isUsernameExists); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"database error at username-check": err})
		return
	}

	if err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE email = (?));", user.Email).Scan(&isEmailExists); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"database error at email-check": err})
		return
	}

	if isUsernameExists == 0 && isEmailExists == 0 {
		insData, err := db.Prepare("INSERT INTO users (username, password, email) VALUES (?,?,?);")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"database error at new user insertion": err})
			return
		}

		hashedPassword, _ := hash.Password(user.Password)
		insData.Exec(user.Username, hashedPassword, user.Email)
		defer insData.Close()

		var userResult UserForResult
		if err := db.QueryRow("SELECT id, username FROM users WHERE id = LAST_INSERT_ID();").Scan(&userResult.Id, &userResult.Username); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"database error at userForResult": err})
			return
		}
		token, err := jwt.CreateToken(userResult.Id)
		if err != nil {
			c.JSON(http.StatusUnprocessableEntity, err.Error())
			return
		}

		email.SendVerifyEmail(user.Username, token, user.Email)
		c.JSON(http.StatusOK, gin.H{"message": "ok", "id": userResult.Id, "username": userResult.Username})
		return

	} else if isUsernameExists != 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username is already taken."})
		return
	} else if isEmailExists != 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email is already taken."})
		return
	}

}
