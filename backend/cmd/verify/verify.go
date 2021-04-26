package verify

import (
	"coffeeShop/cmd/dbConn"
	"coffeeShop/internal/jwt"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CustomPayload struct {
	User_id int `json:"user_id"`
}

func VerifyUserByEmail(c *gin.Context) {

	payload, err := jwt.VerifyToken(c)

	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "You are not authorized!"})
	} else {
		db := dbConn.DbConn()

		updData, err := db.Prepare("UPDATE users SET is_verified=1 WHERE id=(?);")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"database error at user verification": err})
			return
		}

		updData.Exec(payload.User_id)

		c.JSON(http.StatusOK, gin.H{"message": "ok"})
		return
	}

}
