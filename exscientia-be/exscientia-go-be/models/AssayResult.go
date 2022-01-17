/*
	models package defines the shape of data used in business logic of the application.
*/
package models

type AssayResult struct {
	ResultID int64  `bson:"result_id"`
	Target   string `bson:"target"`
	Result   string `bson:"result"`
	Operator string `bson:"operator"`
	Value    int64  `bson:"value,truncate"`
	Unit     string `bson:"unit"`
}
