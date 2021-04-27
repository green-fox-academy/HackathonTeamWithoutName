package email

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/mailgun/mailgun-go/v3"
)

func SendVerifyEmail(name string, token string, toEmail string) {
	envError := godotenv.Load("../../.env")
	if envError != nil {
		log.Fatalf("Error loading .env file")
	}

	mg := mailgun.NewMailgun(os.Getenv("mailgunDomain"), os.Getenv("mailgunApiKey"))
	m := mg.NewMessage(
		name+` <noreply@coffeetogo.com>`,
		"Hello",
		"",
		toEmail,
	)
	m.SetHtml(`
    <html>
    <h3>Welcome, ` + name + `!</h3>
    <h4>Account Verification</h4>
    <a href="` + os.Getenv("actualIP") + `:8080/user/verify?token=` + token + `"><button >Verify your email address</button></a>
    </html>`)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()

	resp, id, err := mg.Send(ctx, m)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("ID: %s Resp: %s\n", id, resp)
}
