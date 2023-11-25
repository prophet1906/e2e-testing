# Pre-requisites
- **Minikube** - For running local k8s cluster, optional if deploying to public cloud
- **Kubectl** - For k8s cluster management
- **Node.js** - For using `newman` package for automation and regression testing
- **Postman** - For test development

# Local Setup with Minikube
```
# Start minikube with 4GB RAM and 4 CPU cores
minikube start --memory 4096 --cpus 4
# Deploy microservices demo to minikube k8s cluster
kubectl create -f microservices-demo.yaml
# Wait for deployment to complete
kubectl get pods -n "sock-shop" --watch
# Setup weavescope
kubectl apply -f https://github.com/weaveworks/scope/releases/download/v1.13.2/k8s-scope.yaml
# Port forward weavescope
kubectl port-forward -n weave "$(kubectl get -n weave pod --selector=weave-scope-component=app -o jsonpath='{.items..metadata.name}')" 4040
# Tunnel clusterIP for local accessibility
minikube tunnel --cleanup
# Install all dependencies to run test
npm install
# Run tests
npm test
```
# Optional
Setup weavescope for cluster visualization.
https://www.weave.works/oss/scope/

# Exploring tests
Test reports are generated in newman folder.

# Exploring API Specs
```
# Start express server to host OpenAPI specs with swagger
npm start
```

# Source Code
Full source code for microservice demo example is available at https://github.com/microservices-demo

# Application Architecture
TODO: Add diagram and write basic information about architecture of microservices demo

# Tested Flows
TODO: Add diagrams for all the tested flows with name

# Advantages of our approach
TODO: List characteristics which make this approach useful

# Disadvantages of our approach
TODO: List characteristics which make this approach infeasible

# Why we went with this approach?
TODO: Add concrete reasons why we picked this approach over others

# Contributors
TODO: Add mail/contact info