package jwt

import (
	"log"
	"os"
	"strings"

	"github.com/dgrijalva/jwt-go"
	jwtV3 "github.com/gbrlsnchs/jwt/v3"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var (
	router = gin.Default()
)

func CreateToken(userId uint64) (string, error) {
	var err error
	envError := godotenv.Load("../../.env")
	if envError != nil {
		log.Fatalf("Error loading .env file")
	}

	tokenSecretKey := os.Getenv("tokenSecretKey")

	atClaims := jwt.MapClaims{}
	//atClaims["authorized"] = true
	atClaims["user_id"] = userId
	//atClaims["exp"] = time.Now().Add(time.Minute * 15).Unix()
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	token, err := at.SignedString([]byte(tokenSecretKey))
	if err != nil {
		return "", err
	}
	return token, nil
}

func ExtractToken(c *gin.Context) string {
	bearToken := c.Request.Header.Get("Authorization")
	//normally Authorization the_token_xxx
	strArr := strings.Split(bearToken, " ")
	if len(strArr) == 2 {
		return strArr[1]
	}
	return ""
}

type CustomPayload struct {
	User_id int `json:"user_id"`
}

func VerifyToken(c *gin.Context) (CustomPayload, error) {

	var token string
	if c.Query("token") != "" {
		token = c.Query("token")
	} else {
		token = ExtractToken(c)

	}

	envError := godotenv.Load("../../.env")
	if envError != nil {
		log.Fatalf("Error loading .env file")
	}

	var payload CustomPayload
	tokenSecretKey := os.Getenv("tokenSecretKey")

	hs := jwtV3.NewHS256([]byte(tokenSecretKey))

	_, err := jwtV3.Verify([]byte(token), hs, &payload)
	if err != nil {
		return payload, err
	}
	return payload, nil
}
