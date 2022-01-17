package utils

import "testing"

func TestBuildAddr(t *testing.T) {
	type args struct {
		host string
		port string
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		{"localhost returns without host (just ':port')", args{host: "localhost", port: "8080"}, ":8080"},
		{"other hosts return as 'host:port'", args{host: "someserver.net", port: "8080"}, "someserver.net:8080"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := BuildAddr(tt.args.host, tt.args.port); got != tt.want {
				t.Errorf("BuildAddr() = %v, want %v", got, tt.want)
			}
		})
	}
}
