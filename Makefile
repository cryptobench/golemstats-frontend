 
REPO   := phillipjensen/golem-stats-frontend
IMG   := ${REPO}:${GITHUB_SHA}
LATEST := ${REPO}:${GITHUB_SHA}

build:
	@docker build -t ${IMG} .
	@docker tag ${IMG} ${LATEST}

 
push:
	@docker push ${REPO}
 
login:
	@docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}
	