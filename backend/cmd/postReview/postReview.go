package postReview

import (
	"coffeeShop/cmd/dbConn"
	"coffeeShop/internal/jwt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ReviewData struct {
	ProductId uint64 `json:"productId"`
	Rating    uint8  `json:"rating"`
	Text      string `json:"text"`
}

func PostReview(c *gin.Context) {

	payload, err := jwt.VerifyToken(c)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "You are not authorized!"})
		return

	} else {

		var reviewData ReviewData

		if err := c.ShouldBindJSON(&reviewData); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid JSON provided."})
			return
		}

		if len(reviewData.Text) == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Please write a review."})
			return
		}

		if len(reviewData.Text) > 512 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Your text is too long. Max: 512 charaters."})
			return
		}

		if reviewData.Rating < 1 || reviewData.Rating > 5 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Rating must be between 1 and 5"})
			return
		}

		if reviewData.Rating%1 != 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Rating must be an integer"})
			return
		}

		db := dbConn.DbConn()

		var isProductExists int
		if err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM product WHERE id = (?));", reviewData.ProductId).Scan(&isProductExists); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		if isProductExists != 1 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "No product with id:" + strconv.FormatUint(uint64(reviewData.ProductId), 10)})
			return
		}

		insData, err := db.Prepare("INSERT INTO reviews (user_id, product_id, rating, text) VALUES (?,?,?, ?);")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		insData.Exec(payload.User_id, reviewData.ProductId, reviewData.Rating, reviewData.Text)

		c.JSON(http.StatusOK, gin.H{"message": "ok"})
		return
	}
}
