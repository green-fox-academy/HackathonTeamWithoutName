package login

import (
	"coffeeShop/cmd/dbConn"
	"coffeeShop/internal/hash"
	"coffeeShop/internal/jwt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Address struct {
	ID          uint64 `json:"id"`
	UserID      uint64 `json:"user_id"`
	Country     string `json:"country"`
	ZipCode     string `json:"zip_code"`
	City        string `json:"city"`
	Street      string `json:"street"`
	HouseNumber uint64 `json:"house_number"`
	Phone       uint64 `json:"phone"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
}

type Order struct {
	ID        uint64 `json:"id"`
	UserID    uint64 `json:"user_id"`
	ProductID uint64 `json:"product_id"`
	Quantity  uint64 `json:"quantity"`
	Status    string `json:"status"`
}

type User struct {
	ID         uint64  `json:"id"`
	Username   string  `json:"userName"`
	Password   string  `json:"password"`
	Orders     []Order `json:"orders"`
	isVerified uint
}

func LoginFunction(c *gin.Context) {
	var userFromWeb User

	if err := c.ShouldBindJSON(&userFromWeb); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": "Invalid json provided"})
		return
	}

	var isUsernameExists int

	if userFromWeb.Username == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Username is required."})
		return
	}
	if userFromWeb.Password == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Password is required."})
		return
	}
	if userFromWeb.Username == "" && userFromWeb.Password == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "All fields are required"})
		return
	}

	db := dbConn.DbConn()
	if err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE username = (?));", userFromWeb.Username).Scan(&isUsernameExists); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"database error - user already exists check": err})
		return
	}
	if isUsernameExists == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Username or password is incorrect."})
		return

	}

	var userFromDB User
	if err := db.QueryRow("SELECT id, username, password, is_verified FROM users WHERE username = (?);", userFromWeb.Username).Scan(&userFromDB.ID, &userFromDB.Username, &userFromDB.Password, &userFromDB.isVerified); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"database error at filling userFromDB": err})
		return
	}
	if userFromDB.Username == userFromWeb.Username && !hash.Match(userFromWeb.Password, userFromDB.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Username or password is incorrect."})
		return
	}
	if userFromDB.isVerified == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Please verify your account."})
		return
	}

	if len(userFromWeb.Orders) != 0 {

		insData, err := db.Prepare(`INSERT INTO orders (user_id, product_id, quantity, status) VALUES (?,?,?, "in_cart");`)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		for i := 0; i < len(userFromWeb.Orders); i++ {
			insData.Exec(userFromDB.ID, userFromWeb.Orders[i].ProductID, userFromWeb.Orders[i].Quantity)
		}

	}

	rowsForOrders, err := db.Query(`SELECT id, user_id, product_id, quantity, status FROM orders WHERE status = "in_cart" AND user_id = ?`, userFromDB.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"orders query error": err})
		return
	}
	defer rowsForOrders.Close()

	var ordersDataArray []Order
	for rowsForOrders.Next() {

		var orderData Order
		err2 := rowsForOrders.Scan(&orderData.ID, &orderData.UserID, &orderData.ProductID, &orderData.Quantity, &orderData.Status)
		if err2 != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"errorScan2orders": err2})
			return
		}

		ordersDataArray = append(ordersDataArray, orderData)

	}
	err = rowsForOrders.Err()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error3orders": err})
		return
	}

	rowsForAddresses, err := db.Query(`SELECT * FROM addresses WHERE user_id = ?`, userFromDB.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"addresses query error": err})
		return
	}
	defer rowsForAddresses.Close()

	var addressesDataArray []Address
	// if rowsForAddresses != nil {
	for rowsForAddresses.Next() {

		var addressesData Address
		err2 := rowsForAddresses.Scan(&addressesData.ID, &addressesData.UserID, &addressesData.Country,
			&addressesData.ZipCode, &addressesData.City, &addressesData.Street, &addressesData.HouseNumber,
			&addressesData.Phone, &addressesData.FirstName, &addressesData.LastName)
		if err2 != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"errorScan2addresses": err2})
			return
		}

		addressesDataArray = append(addressesDataArray, addressesData)

	}
	err = rowsForAddresses.Err()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error3addresses": err})
		return
	}
	// }
	token, err := jwt.CreateToken(userFromDB.ID)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, err.Error())
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "ok", "accessToken": token,
		"addresses": addressesDataArray, "orders": ordersDataArray})
}
