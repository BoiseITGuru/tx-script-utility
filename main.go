package main

import (
	"embed"
	"fmt"
	"log"
	"net/http"
	"runtime/pprof"

	"github.com/bjartek/overflow/overflow"
)

var nextFS embed.FS

func main() {
	o := overflow.NewOverflow().Start()
	fmt.Printf("%v", o.State.Accounts())

	fileServer := http.FileServer(http.Dir("./nextjs/out"))

	// The static Next.js app will be served under `/`.
	http.Handle("/", fileServer)
	// The API will be served under `/api`.
	http.HandleFunc("/api", handleAPI)

	// Start HTTP server at :8080.
	log.Println("Starting HTTP server at http://localhost:4000 ...")
	log.Fatal(http.ListenAndServe(":4000", nil))
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
