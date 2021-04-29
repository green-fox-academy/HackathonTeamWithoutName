package updateQuantity

import (
	"coffeeShop/cmd/dbConn"
	"coffeeShop/internal/jwt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type NewQuantity struct {
	OrderId  uint64 `json:"order_id"`
	Quantity int8   `json:"new_quantity"`
}

func UpdateQuantity(c *gin.Context) {

	payload, err := jwt.VerifyToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "You are not authorized!"})
		return

	} else {

		var newQuantity NewQuantity
		if err := c.ShouldBindJSON(&newQuantity); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid JSON provided.", "error": err})
			return
		}

		if newQuantity.Quantity != 1 && newQuantity.Quantity != -1 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Quantity must be 1 or -1"})
			return
		}

		db := dbConn.DbConn()

		var isOrderExists uint8
		if err := db.QueryRow(`SELECT EXISTS(SELECT 1 FROM orders WHERE user_id = (?) AND id= (?) AND status = 'in_cart');`, payload.User_id, newQuantity.OrderId).Scan(&isOrderExists); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		if isOrderExists != 1 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "There is no such item in your cart!"})
			return
		}

		var inStock uint64
		var productId uint64
		if err = db.QueryRow("SELECT in_stock, products.id FROM products JOIN orders ON products.id=orders.product_id WHERE orders.id= (?);", newQuantity.OrderId).Scan(&inStock, &productId); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		if newQuantity.Quantity == 1 && inStock < 1 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "We are out of stock"})
			return
		}

		upDataForOrder, err := db.Prepare(`UPDATE orders SET quantity=quantity+(?) WHERE id=(?);`)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		upDataForOrder.Exec(newQuantity.Quantity, newQuantity.OrderId)

		upDataForProduct, err := db.Prepare(`UPDATE products SET in_stock=in_stock+(-?) WHERE id=(?);`)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		upDataForProduct.Exec(newQuantity.Quantity, productId)

		c.JSON(http.StatusOK, gin.H{"message": "ok"})
		return
	}
}
