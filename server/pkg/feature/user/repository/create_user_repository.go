package repository

import (
	"context"
	"errors"
	"time"

	"github.com/one-planet/pkg/helper"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (ur *userRepository) CreateUser(user *models.User) error {
	user_collection := ur.mongo_database.Collection("users")

	if user.Password == "" {
		return errors.New("password is required")
	}

	if user.Email == "" {
		return errors.New("email is required")
	}

	if user.Username == "" {
		return errors.New("username is required")
	}

	if ok := helper.ValidateUsername(user.Username); !ok {
		return errors.New("username is not allowed")
	}

	if _, err := ur.GetUserByUsername(user.Username); err == nil {
		return errors.New("username already exists")
	}

	password_hasing, err := helper.Hashing(user.Password)
	if err != nil {
		return err
	}

	user.CreateAt = time.Now()
	user.UpdatedAt = time.Now()
	user.Verified = false
	user.Password = password_hasing
	user.Role = "user"
	user.Follower = []primitive.ObjectID{}
	user.Following = []primitive.ObjectID{}

	res, err := user_collection.InsertOne(context.TODO(), user)

	if err != nil {
		return err
	}

	insertedID, ok := res.InsertedID.(primitive.ObjectID)
	if !ok {
		return errors.New("failed to convert inserted ID to ObjectID")
	}
	idString := insertedID.Hex()
	token, err := helper.GenerateToken(5*time.Minute, idString, user.Email, user.Username, user.Verified)

	if err != nil {
		return err
	}

	if err != nil {
		return err
	}

	link := helper.GetENV("SERVER_BASE_URL") + "/api/users/verify/" + token
	helper.SendMail(user.Email, link)

	return nil
}
