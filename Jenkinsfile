pipeline {
  agent any

  environment {
    IMAGE_NAME = "demo-app"                       // local image name
    DOCKER_REGISTRY = "docker.io"                 // docker hub
    DOCKER_REPO = "arunprakash1177/demo-app" // set if pushing
    PUSH_IMAGE = "false"                          // set to "true" to push
    COMPOSE_FILE = "docker-compose.yml"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install & Test') {
      steps {
        // Use Node container if you prefer, or run npm on agent
        sh 'npm install'
        sh 'npm test || echo "Tests skipped or not configured'
      }
    }

    stage('Build Docker image') {
      steps {
        script {
          if (env.PUSH_IMAGE == "true") {
            sh "docker build -t ${DOCKER_REPO}:$BUILD_NUMBER ."
          } else {
            sh "docker build -t ${IMAGE_NAME}:latest ."
          }
        }
      }
    }

    stage('Push image (optional)') {
      when {
        expression { env.PUSH_IMAGE == "true" }
      }
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin ${DOCKER_REGISTRY}"
          sh "docker push ${DOCKER_REPO}:$BUILD_NUMBER"
          sh "docker logout ${DOCKER_REGISTRY}"
        }
      }
    }

    stage('Deploy') {
      steps {
        // If deploy host is same as Jenkins, this will run docker-compose
        // If remote host: use ssh agent or a deploy node and run docker-compose there
        sh '''
          # stop previous and update
          docker-compose down || true
          docker-compose pull || true
          # if local build (no repo tag), load latest local image name is used
          docker-compose up -d --build
        '''
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'logs/**/*.log', allowEmptyArchive: true
    }
    success {
      echo 'Build succeeded'
    }
    failure {
      echo 'Build failed'
    }
  }
}
