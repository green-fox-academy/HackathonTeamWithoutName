package productFeed

import (
	"coffeeShop/cmd/dbConn"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ReviewData struct {
	Id        uint64 `json:"id"`
	ProductId uint64 `json:"productId"`
	Username  string `json:"userName"`
	Rating    int    `json:"rating"`
	Text      string `json:"text"`
}

type ProductData struct {
	Id          uint64       `json:"id"`
	Title       string       `json:"title"`
	Price       float32      `json:"price"`
	Category    string       `json:"category"`
	Descriptoin string       `json:"description"`
	Image       string       `json:"image"`
	InStock     uint64       `json:"inStock"`
	Reviews     []ReviewData `json:"reviews"`
}

func GetAllProducts(c *gin.Context) {
	db := dbConn.DbConn()
	defer db.Close()

	rowsForReviews, err := db.Query("SELECT reviews.id, product_id, rating, text, users.username FROM reviews JOIN users ON reviews.user_id=users.id;")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	defer rowsForReviews.Close()

	var reviewDataArray []ReviewData
	for rowsForReviews.Next() {

		var reviewData ReviewData
		err = rowsForReviews.Scan(&reviewData.Id, &reviewData.ProductId, &reviewData.Rating, &reviewData.Text, &reviewData.Username)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		reviewDataArray = append(reviewDataArray, reviewData)

	}
	err = rowsForReviews.Err()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	rowsForProducts, err := db.Query("SELECT id, title, price, category, description, image, in_stock FROM products;")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	defer rowsForProducts.Close()

	var allProductData []ProductData
	for rowsForProducts.Next() {

		var productData ProductData
		err := rowsForProducts.Scan(&productData.Id, &productData.Title, &productData.Price, &productData.Category, &productData.Descriptoin, &productData.Image, &productData.InStock)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		for i := 0; i < len(reviewDataArray); i++ {
			if productData.Id == reviewDataArray[i].ProductId {
				productData.Reviews = append(productData.Reviews, reviewDataArray[i])
			}

		}

		allProductData = append(allProductData, productData)
	}
	err = rowsForProducts.Err()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ok", "productList": allProductData})
	return
}
