package models

// AuthInput struct accepts Username and Password (both required)
type AuthInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}
