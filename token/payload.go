package token

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

var (
	// ErrInvalidToken returns a new error for invalid tokens
	ErrInvalidToken = errors.New("Token is invalid")
	// ErrExpiredToken returns a new error for expired tokens
	ErrExpiredToken = errors.New("Token is expired")
)

// Payload struct represents a decoded JWT payload
type Payload struct {
	ID        uuid.UUID `json:"id"`
	Username  string    `json:"username"`
	IssuedAt  time.Time `json:"issued_at"`
	ExpiredAt time.Time `json:"expired_at"`
}

// NewPayload creates a new token payload. Accepts a username and duration.
func NewPayload(username string, duration time.Duration) (*Payload, error) {
	tokenID, err := uuid.NewRandom()
	if err != nil {
		return nil, err
	}

	payload := &Payload{
		ID:        tokenID,
		Username:  username,
		IssuedAt:  time.Now(),
		ExpiredAt: time.Now().Add(duration),
	}
	return payload, nil
}

// Valid checks if the token payload is expired (valid)
func (payload *Payload) Valid() error {
	if time.Now().After(payload.ExpiredAt) {
		return ErrExpiredToken
	}
	return nil
}
