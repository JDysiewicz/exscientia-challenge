/*
	mongodb package holds implementation details for
	business logic functions specific to MongoDB
*/
package mongodb

import (
	"context"
	"exscientia-go-be/database"
	"exscientia-go-be/models"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoClient struct {
	Client   *mongo.Client
	DBString string
}

func NewMongoClient(user, password, host, port, database string) (database.DatabaseClient, error) {
	connStr := fmt.Sprintf("mongodb://%s:%s@%s:%s/%s", user, password, host, port, database)
	ctx := context.TODO()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(connStr))
	if err != nil {
		return nil, err
	}

	mongoClient := &MongoClient{
		Client:   client,
		DBString: database,
	}

	return mongoClient, nil
}

// Cleanup prevents memory leaks by cleaning up connections to client
func (m *MongoClient) Cleanup() {
	ctx := context.TODO()
	m.Client.Disconnect(ctx)
}

func (m *MongoClient) GetAllCompounds() (*[]models.Compound, error) {

	collection := m.Client.Database(m.DBString).Collection("compounds")

	// document pointer
	cursor, err := collection.Find(context.Background(), bson.D{})
	if err != nil {
		return nil, err
	}

	// error check document
	var compounds []models.Compound
	if err = cursor.All(context.Background(), &compounds); err != nil {
		return nil, err
	}

	return &compounds, nil
}
