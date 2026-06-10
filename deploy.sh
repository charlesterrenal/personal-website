#!/bin/bash

# Portfolio Docker Deployment Script
# Usage: ./deploy.sh [build|push|pull|restart]

set -e

REGISTRY="${DOCKER_REGISTRY:-localhost:5000}"  # Change to your registry
IMAGE_NAME="portfolio"
IMAGE_TAG="latest"
CONTAINER_NAME="portfolio"

case "${1:-build}" in
  build)
    echo "🔨 Building Docker image..."
    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
    echo "✅ Build complete: ${IMAGE_NAME}:${IMAGE_TAG}"
    ;;
  
  push)
    echo "📤 Pushing image to registry..."
    docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
    docker push ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
    echo "✅ Push complete"
    ;;
  
  pull)
    echo "📥 Pulling image from registry..."
    docker pull ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
    docker tag ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:${IMAGE_TAG}
    echo "✅ Pull complete"
    ;;
  
  restart)
    echo "🔄 Restarting container..."
    docker-compose down
    docker-compose up -d
    echo "✅ Container restarted"
    docker-compose logs -f
    ;;
  
  *)
    echo "Usage: $0 {build|push|pull|restart}"
    echo ""
    echo "Commands:"
    echo "  build    - Build Docker image locally"
    echo "  push     - Push image to registry (requires DOCKER_REGISTRY env var)"
    echo "  pull     - Pull image from registry"
    echo "  restart  - Restart container via docker-compose"
    exit 1
    ;;
esac
