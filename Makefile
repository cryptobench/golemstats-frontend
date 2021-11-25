 
REPO   := phillipjensen/golem-stats-frontend
IMG   := golem-stats-frontend:${GITHUB_SHA}
LATEST := ${REPO}:${GITHUB_SHA}

build:
	@docker build -t ${IMG} .
 
push:
	@docker push ${REPO}:${GITHUB_SHA}
 
login:
	@docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}
	