.PHONY: up down logs ps db-generate db-migrate db-studio

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f postgres

ps:
	docker compose ps

db-generate:
	pnpm prisma generate

db-migrate:
	pnpm prisma migrate dev

db-studio:
	pnpm prisma studio
