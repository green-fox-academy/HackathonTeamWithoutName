package dbConn

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

func DbConn() (db *sql.DB) {
	envError := godotenv.Load("../../.env")
	if envError != nil {
		log.Fatalf("Error loading .env file")
	}

	dbDriver := os.Getenv("dbDriver")
	dbUser := os.Getenv("dbUser")
	dbPass := os.Getenv("dbPass")
	dbHost := os.Getenv("dbHost")
	dbName := os.Getenv("dbName")
	db, err := sql.Open(dbDriver, dbUser+":"+dbPass+"@"+dbHost+"/"+dbName)
	if err != nil {
		panic(err.Error())
	}

	return db
}
