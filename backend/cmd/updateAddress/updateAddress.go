package updateAddress

import (
	"coffeeShop/cmd/dbConn"
	"coffeeShop/internal/jwt"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type NewAddress struct {
	AddressID   uint64 `json:"address_id"`
	Country     string `json:"country"`
	ZipCode     string `json:"zip_code"`
	City        string `json:"city"`
	Street      string `json:"street"`
	HouseNumber string `json:"house_number"`
	Phone       uint64 `json:"phone"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
}

func UpdateAddress(c *gin.Context) {

	payload, err := jwt.VerifyToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "You are not authorized!"})
		return
	} else {

		var requestBody NewAddress
		if err := c.ShouldBindJSON(&requestBody); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid JSON provided.", "error": err})
			return
		}

		if requestBody.AddressID == 0 {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unknown address - cannot update"})
			return
		}

		if len(requestBody.Country) == 0 || len(requestBody.City) == 0 || len(requestBody.Street) == 0 ||
			len(requestBody.ZipCode) == 0 || len(requestBody.HouseNumber) == 0 || requestBody.Phone == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Missing address field."})
			return
		}
		if len(requestBody.FirstName) == 0 || len(requestBody.LastName) == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Please, give a full name."})
			return
		}

		phoneCheck := fmt.Sprintf(`%T`, requestBody.Phone)
		if phoneCheck != "uint64" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Wrong phone number format", "format": phoneCheck})
			return
		}

		var a string = fmt.Sprint(requestBody.Phone)
		if len(a) > 18 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Too many phone number digits", "Max. num. of digits": 18, "Digits given": len(a)})
			return
		}

		db := dbConn.DbConn()

		updateData, err := db.Prepare(`UPDATE addresses SET country=(?), zip_code=(?), city=(?), street=(?), 
		house_number=(?), phone=(?), first_name=(?), last_name=(?) WHERE id = (?) AND user_id = (?);`)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"address update error": err})
			return
		}

		updateData.Exec(requestBody.Country, requestBody.ZipCode, requestBody.City,
			requestBody.Street, requestBody.HouseNumber, requestBody.Phone, requestBody.FirstName,
			requestBody.LastName, requestBody.AddressID, payload.User_id)
		defer updateData.Close()

		c.JSON(http.StatusOK, gin.H{"message": "ok"})
		return
	}
}
