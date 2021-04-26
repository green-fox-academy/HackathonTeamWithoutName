package passResetEmail

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/mailgun/mailgun-go/v3"
)

func SendNewPasswordEmail(name string, password string, toEmail string) {
	envError := godotenv.Load("../../.env")
	if envError != nil {
		log.Fatalf("Error loading .env file")
	}

	mg := mailgun.NewMailgun(os.Getenv("mailgunDomain"), os.Getenv("mailgunApiKey"))
	m := mg.NewMessage(
		name+` <noreply@coffeeonthego.com>`,
		"Your new credentials are ready",
		"",
		toEmail,
	)
	m.SetHtml(`
    <html>
    <h3>Dear, ` + name + `!</h3>
    <h4>Your new login credentials are the following:</h4>
	<p><strong>Username: </strong>` + name + `</p>
	<p><strong>Password: </strong>` + password + `</p>
    <a href="` + os.Getenv("actualIP") + `:8080/login">Click here to login!</a>
	<p> This password can be changed in the User Profile after you logged in. </p>
    </html>`)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()

	resp, id, err := mg.Send(ctx, m)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("ID: %s Resp: %s\n", id, resp)
}
