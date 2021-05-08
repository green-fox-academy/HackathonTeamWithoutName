package hash

import (
	"golang.org/x/crypto/bcrypt"
)

//Password returns with hashed string of the pssword
func Password(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// Match returns with a boolean
func Match(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
