package addOrder

import (
	"coffeeShop/cmd/dbConn"
	"coffeeShop/internal/jwt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Order struct {
	UserID     int `json:"userId"`
	ProductID  int `json:"productId"`
}


func AddOrder(c *gin.Context) {

	payload, err := jwt.VerifyToken(c)

	var order Order
	
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "You are not authorized!"})
		} else {
			if err := c.ShouldBindJSON(&order); err != nil {
				c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid JSON provided."})
				return
			}
			
			db := dbConn.DbConn()

			var stock int
			if err := db.QueryRow(`SELECT in_stock FROM products WHERE id = ?`, order.ProductID).Scan(&stock); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"database error: product not found": err})
				return
			}
 
			if stock < 1 {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Item is out of stock"})
				return
			}

			insData, err := db.Prepare(`INSERT INTO orders (user_id, product_id, quantity) VALUES (?,?,1) ;`)
			if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"INSERT error": err})
			return
			}
		
			insData.Exec(payload.User_id, order.ProductID)
			defer insData.Close()
		
			updateData, err := db.Prepare(`UPDATE products SET in_stock = in_stock-1 WHERE id = ? ;`)
			if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"UPDATE error": err})
			return
			}
		
			updateData.Exec(order.ProductID)
			defer updateData.Close()
            
			c.JSON(http.StatusOK, gin.H{"message": "Item added to cart"})
			
        }

}