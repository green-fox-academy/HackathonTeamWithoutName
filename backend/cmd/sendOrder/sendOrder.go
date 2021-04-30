package sendOrder

import (
	"coffeeShop/cmd/dbConn"
	"coffeeShop/internal/jwt"
	"coffeeShop/internal/orderEmail"
	"coffeeShop/internal/randomStringGenerator"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SendOrder(c *gin.Context) {

	payload, err := jwt.VerifyToken(c)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "You are not authorized!"})
	} else {

		order_code := randomStringGenerator.GenerateRandomString(20)

		db := dbConn.DbConn()
		defer db.Close()

		updateData, err := db.Prepare(`UPDATE orders SET status = 'ordered', order_code = ? WHERE user_id = ? AND status = 'in_cart';`)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"UPDATE error": err})
			return
		}

		updateData.Exec(order_code, payload.User_id)
		defer updateData.Close()

		var username string
		var email string

		if err := db.QueryRow(`SELECT username, email FROM users WHERE id = ?`, payload.User_id).Scan(&username, &email); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"database error: user not found": err})
			return
		}

		orderEmail.SendOrderEmail(username, email, order_code)

		c.JSON(http.StatusOK, gin.H{"message": "Thank you for shopping at CoffeeToGo!"})

	}

}
