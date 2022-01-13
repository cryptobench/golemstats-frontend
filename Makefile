 
REPO   := phillipjensen/golem-stats-frontend
IMG   := golem-stats-frontend:${GITHUB_SHA}
IMG_LATEST   := golem-stats-frontend:latest
LATEST := ${REPO}:${GITHUB_SHA}

build:
	@docker build -t ${IMG} .
	@docker build -t ${IMG_LATEST} .
	@docker tag ${IMG} ${LATEST}
	@docker tag ${IMG_LATEST} ${REPO}:latest
 
push:
	@docker push ${REPO}:${GITHUB_SHA}
	@docker push ${REPO}:latest
 
login:
	@docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}
	