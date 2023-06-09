package db

import (
	"context"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestCreateUser(t *testing.T) {
	arg := CreateUserParams{
		Username:  "patrick",
		Password:  "password",
		FirstName: "Patrick",
		LastName:  "Black",
	}

	user, err := testQueries.CreateUser(context.Background(), arg)

	require.NoError(t, err)
	require.NotEmpty(t, user)
	require.NotZero(t, user.ID)
	require.NotZero(t, user.CreatedAt)
	require.Exactly(t, arg.Username, user.Username)
	require.Exactly(t, arg.FirstName, user.FirstName)
	require.Exactly(t, arg.LastName, user.LastName)
}
