/*
	database package defines the db Client interface allowing the application
	to not be reliant upon a single DB provider. Also contains sub-packages
	detailing db-specific implementation (e.g. `mongodb`).
*/
package database

import "exscientia-go-be/models"

type DatabaseClient interface {
	GetAllCompounds() (*[]models.Compound, error)
	Cleanup()
}
