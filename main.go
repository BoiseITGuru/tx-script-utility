package main

import (
	"embed"
	"log"
	"net/http"
	"runtime/pprof"
)

var nextFS embed.FS

func main() {
	fileServer := http.FileServer(http.Dir("./nextjs/out"))

	// The static Next.js app will be served under `/`.
	http.Handle("/", fileServer)
	// The API will be served under `/api`.
	http.HandleFunc("/api", handleAPI)

	// Start HTTP server at :8080.
	log.Println("Starting HTTP server at http://localhost:8888 ...")
	log.Fatal(http.ListenAndServe(":8888", nil))
}

func handleAPI(w http.ResponseWriter, _ *http.Request) {
	// Gather memory allocations profile.
	profile := pprof.Lookup("allocs")

	// Write profile (human readable, via debug: 1) to HTTP response.
	err := profile.WriteTo(w, 1)
	if err != nil {
		log.Printf("Error: Failed to write allocs profile: %v", err)
	}
}
