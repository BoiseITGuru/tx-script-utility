.PHONY: build-nextjs
build-nextjs:
	cd nextjs; \
	npm install; \
	npm run build

.PHONY: build
build: build-nextjs
	go build .