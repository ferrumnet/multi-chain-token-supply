#!/bin/bash

source /root/set_env.sh
export AccountId=$(aws sts get-caller-identity | jq -r ".Account")
docker stop ${AppName}-${Environment}-chain || true
docker system prune -a -f || true
aws ecr get-login-password --region ${Region} | docker login --username AWS --password-stdin ${AccountId}.dkr.ecr.${Region}.amazonaws.com/${REPO}
docker run -d -it --name ${AppName}-${Environment}-chain  -p 80:8080 --restart unless-stopped ${AccountId}.dkr.ecr.${Region}.amazonaws.com/${REPO}:latest