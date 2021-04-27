package main

import (
	"log"

	"coffeeShop/cmd/forgottenPass"
	"coffeeShop/cmd/login"
	"coffeeShop/cmd/postReview"
	"coffeeShop/cmd/productFeed"
	"coffeeShop/cmd/register"
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
	// router.POST("/user/address", )
	// router.PUT("/user/address", )
	// router.PUT("/user/pass", )

	router.GET("/product", productFeed.GetAllProducts)
	router.POST("/product/review", postReview.PostReview)

	// router.PUT("/order",)
	// router.PUT("/order/quantity",)
	// router.DELETE("/order", deleteOrder.DeleteOrder)
	log.Fatal(router.Run(":8080"))
}
