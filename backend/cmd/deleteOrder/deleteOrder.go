package deleteOrder

import (
	"coffeeShop/cmd/dbConn"
	"coffeeShop/internal/jwt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type DeletionCommand struct {
	OrderID uint64 `json:"order_id"`
}

func DeleteOrder(c *gin.Context) {

	payload, err := jwt.VerifyToken(c)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "You are not authorized!"})
		return
	}

	var requestBody DeletionCommand

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid JSON provided.", "error": err})
		return
	}

	var orderExists uint8
	var dbUser uint
	var quantity uint64
	var productID uint64

	db := dbConn.DbConn()

	if err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM orders WHERE id = (?));", requestBody.OrderID).Scan(&orderExists); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"database - order does not exist - check": err})
		return
	}
	if orderExists == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Non-existing order."})
		return
	}

	if err := db.QueryRow("SELECT user_id, product_id, quantity FROM orders	WHERE id = (?) AND status ='in_cart';", requestBody.OrderID).Scan(&dbUser, &productID, &quantity); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"database - order does not exist/quantity - check": err})
		return
	}

	if dbUser != uint(payload.User_id) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "That's not your order."})
		return
	}

	if orderExists == 1 {
		deleteData, err := db.Prepare("DELETE FROM orders WHERE id=(?)")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"database - delete error": err})
			return
		}
		deleteData.Exec(requestBody.OrderID)

		updateData, err := db.Prepare("UPDATE products SET in_stock=in_stock+(?)  WHERE id=(?)")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"database - quantity-update error": err})
			return
		}
		updateData.Exec(quantity, productID)

		c.JSON(http.StatusOK, gin.H{"message": "ok"})
		return
	}

}
