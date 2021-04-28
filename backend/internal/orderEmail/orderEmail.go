package orderEmail

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/mailgun/mailgun-go/v3"
)

func SendOrderEmail(name string, toEmail string, orderID string) {
	envError := godotenv.Load("../../.env")
	if envError != nil {
		log.Fatalf("Error loading .env file")
	}

	mg := mailgun.NewMailgun(os.Getenv("mailgunDomain"), os.Getenv("mailgunApiKey"))
	m := mg.NewMessage(
		name+` <noreply@coffeetogo.com>`,
		"Thank you for shopping at CoffeeToGo",
		"",
		toEmail,
	)
	m.SetHtml(`
    <html>
    <h3>Dear, ` + name + `!</h3>
    <h4>Thank you for shopping at CoffeeToGo.</h4>
	<p>Your order ID is <strong>` + orderID + `</strong></p>
	<a href="` + os.Getenv("actualIP") + `:8080/user/login">Log in here to see your orders.</a>
	<br>
    <a href="` + os.Getenv("actualIP") + `:8080/">Or check out our latest offers here!</a>
    </html>`)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()

	resp, id, err := mg.Send(ctx, m)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("ID: %s Resp: %s\n", id, resp)
}
