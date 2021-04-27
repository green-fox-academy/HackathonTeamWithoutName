package createAddress

import (
	"coffeeShop/cmd/dbConn"
	"coffeeShop/internal/jwt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Address struct {
	Country     string `json:"country"`
	ZipCode     uint64 `json:"zip_code"`
	City        string `json:"city"`
	Street      string `json:"street"`
	HouseNumber uint64 `json:"house_number"`
	Phone       uint64 `json:"phone"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
}

func CreateAddress(c *gin.Context) {

	payload, err := jwt.VerifyToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "You are not authorized!"})
		return
	} else {

		var requestBody Address
		if err := c.ShouldBindJSON(&requestBody); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid JSON provided."})
			return
		}

		var codePointer *uint64 = &requestBody.ZipCode
		var numPointer *uint64 = &requestBody.HouseNumber
		if len(requestBody.Country) == 0 || len(requestBody.City) == 0 || len(requestBody.Street) == 0 ||
			codePointer == nil || numPointer == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Missing address field."})
			return
		}
		if len(requestBody.FirstName) == 0 || len(requestBody.LastName) == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Please, give a full name."})
			return
		}

		// phone validation

		db := dbConn.DbConn()

		var isAddressExists uint8
		if err := db.QueryRow(`SELECT EXISTS(SELECT 1 FROM reviews WHERE user_id=(?)AND country=(?) 
	AND city = (?) AND street=(?) AND house_number = (?) AND first_name =(?) AND last_name (?));`,
			payload.User_id, requestBody.Country, requestBody.ZipCode, requestBody.City, requestBody.Street,
			requestBody.HouseNumber, requestBody.FirstName, requestBody.LastName).Scan(&isAddressExists); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		if isAddressExists == 1 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "You already have this address."})
			return
		}

		insData, err := db.Prepare(`INSERT INTO addresses (user_id, country, zip_code, city, street, 
		house_number, phone, first_name, last_name) VALUES (?,?,?,?,?,?,?,?,?,?));`)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"address insert error": err})
			return
		}

		insData.Exec(payload.User_id, requestBody.Country, requestBody.ZipCode, requestBody.City,
			requestBody.Street, requestBody.HouseNumber, requestBody.Phone, requestBody.FirstName, requestBody.LastName)

		c.JSON(http.StatusOK, gin.H{"message": "ok"})
		return
	}
}
