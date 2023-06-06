package repository

import (
	"context"

	"github.com/one-planet/pkg/helper"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

func (ur *userRepository) PasswordReset(email, password string) error {
	user_collection := ur.mongo_database.Collection("users")

	hash, err := helper.Hashing(password)
	if err != nil {
		return err
	}

	filter := bson.M{"email": email}
	update := bson.M{"$set": bson.M{"password": hash}}

	var user models.User

	if err = user_collection.FindOneAndUpdate(context.TODO(), filter, update).Decode(&user); err != nil {
		return err
	}

	return nil
}
