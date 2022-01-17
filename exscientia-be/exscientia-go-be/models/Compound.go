/*
	models package defines the shape of data used in business logic of the application.
*/
package models

type Compound struct {
	CompoundID   int64         `bson:"compound_id"`
	Smiles       string        `bson:"smiles"`
	MolWeight    float64       `bson:"molecular_weight"`
	MolFormula   string        `bson:"molecular_formula"`
	AssayResults []AssayResult `bson:"assay_results"`
}
