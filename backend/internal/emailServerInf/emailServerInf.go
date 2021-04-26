package emailServerInf

import (
    "log"
    "fmt"
    "context"
    "github.com/mailgun/mailgun-go/v3"
    "time"
    "github.com/joho/godotenv"
	"os"
)

func SendServerInf(name string, toEmail string , serverAddress string, serverPassword string){
    envError := godotenv.Load("../../.env")
	if envError != nil {
		log.Fatalf("Error loading .env file")
	}

    mg := mailgun.NewMailgun(os.Getenv("mailgunDomain"),os.Getenv("mailgunApiKey"))
    m := mg.NewMessage(
        name + ` <noreply@memeonthego.com>`,
        "Hello",
        "",
        toEmail,
    )
    m.SetHtml(`
    <html>
    <h3>Welcome, ` + name + `!</h3>
    <h4>You can use your server now!</h4>
	<h4>Server address:</h4>
	<h4>`+ serverAddress +`</h4>
	<h4>Server password:</h4>
	<h4>`+ serverPassword +`</h4>
    </html>`)

    ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
    defer cancel()

    resp, id, err := mg.Send(ctx, m)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("ID: %s Resp: %s\n", id, resp)
}