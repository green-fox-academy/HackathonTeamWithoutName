package main

import (
	"log"

	"coffeeShop/cmd/changePass"
	"coffeeShop/cmd/createAddress"
	"coffeeShop/cmd/deleteOrder"
	"coffeeShop/cmd/forgottenPass"
	"coffeeShop/cmd/login"
	"coffeeShop/cmd/postReview"
	"coffeeShop/cmd/productFeed"
	"coffeeShop/cmd/register"
	"coffeeShop/cmd/updateAddress"
	"coffeeShop/cmd/updateQuantity"
	"coffeeShop/cmd/verify"
	"coffeeShop/internal/corsMiddle"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.New()
	router.Use(corsMiddle.CORSMiddleware())
	router.Use(static.Serve("/", static.LocalFile("../../../Frontend/public", true)))
	router.GET("/user/verify", verify.VerifyUserByEmail)
	router.POST("/user/forgottenpass", forgottenPass.ForgottenPass)
	router.POST("/user/register", register.RegisterTheUser)
	router.POST("/user/login", login.LoginFunction)
	router.POST("/user/address", createAddress.CreateAddress)
	router.PUT("/user/address", updateAddress.UpdateAddress)
	router.PUT("/user/pass", changePass.ChangePass)

	router.GET("/product", productFeed.GetAllProducts)
	router.POST("/product/review", postReview.PostReview)

	// router.PUT("/order",)
	router.PUT("/order/quantity", updateQuantity.UpdateQuantity)
	router.DELETE("/order", deleteOrder.DeleteOrder)
	log.Fatal(router.Run(":8080"))
}
