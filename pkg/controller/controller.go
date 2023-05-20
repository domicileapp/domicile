package controller

// Controller ...
type Controller struct{}

// NewController creates a new controller
func NewController() *Controller {
	return &Controller{}
}

// Message ...
type Message struct {
	Message string `json:"message"`
}
