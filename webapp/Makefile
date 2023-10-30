up:
	docker-compose up -d

down:
	docker-compose down

build:
	docker build --no-cache -t pocket-menu-webapp -f Dockerfile .

run-db-ci:
	docker run -d --name pocket-menu-db \
		-e POSTGRES_PASSWORD=getyourown \
		-e POSTGRES_DB=pocket_menu_db \
		-e POSTGRES_USER=postgres \
		-e PGDATA=/pgdata \
		postgres:15.3-alpine

# build-dev:
# 	docker build -t pocket-menu-webapp$(VERSION) -f Dockerfile.dev .

run:
	docker run --name pocket-menu-webapp --detach --tty pocket-menu-webapp

# run-dev:
# 	docker run --name pocket-menu-webapp --detach $(EXTRA_ARGS) pocket-menu-webapp$(VERSION)

check:
	docker exec -t web bash -c "pwd && ls -la"
	docker exec -t web black --check "/var/task"
	docker exec -t web isort --check "/var/task"
	docker exec -t web flake8 "/var/task"
	# docker exec -t web poetry export -f requirements.txt --output requirements.txt
	docker exec -t web safety check -r requirements.txt --full-report
	docker exec -t web bandit -ll -r "/var/task"

test:
	docker exec -t web pytest "/var/task"

test-cov:
	docker exec -t pocket-menu-webapp pytest --cov "/var/task/" --cov-fail-under $(MIN_COVERAGE) "/var/task" \
	--html coverage/pytest_report.html --self-contained-html --junit-xml coverage/test-results/junit.xml

cov-report:
	docker exec -t web coverage html -d "/var/task/coverage/test-reports/"
	docker exec -t web coverage xml -o "/var/task/coverage/coverage.xml"

copy-cov-report:
	docker cp web:/var/task/coverage/ $(COVERAGE_TARGET_DIR)
