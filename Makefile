start-frontend:
	make -C frontend start-frontend

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend
