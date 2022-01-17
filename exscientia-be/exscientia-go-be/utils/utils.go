/*
	utils package holds misc. helper functions
	which may be used across the application;
	should have no dependencies on other packages in the application.
*/
package utils

import "fmt"

// BuildAddr builds hostname:port string
func BuildAddr(host string, port string) string {
	// listen on all available hosts if localhost; avoids docker-compose networking issues
	if host == "localhost" {
		return fmt.Sprintf(":%s", port)
	}
	return fmt.Sprintf("%s:%s", host, port)
}
