# Pre-requisites
- **Minikube** - For running local k8s cluster, optional if deploying to public cloud
- **Kubectl** - For k8s cluster management
- **Node.js** - For using `newman` package for automation and regression testing
- **Postman** - For test development

# Local Setup in Kubernetes with Minikube
```
# Start minikube with 4GB RAM and 4 CPU cores
minikube start --memory 4096 --cpus 4
# Deploy microservices demo to minikube k8s cluster
kubectl create -f microservices-demo-k8s.yaml
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

# Cleanup steps
minikube stop
minikube delete
```

# Local Setup in Docker
```
# Start, -d frees terminal by running in deattached mode
docker-compose -f microservices-demo-docker.yml up -d
# Run without -d flag to see live logs

# Cleanup steps
docker-compose -f microservices-demo-docker.yml down
```

# Optional
Setup weavescope for cluster visualization. Follow specific section for k8s or docker based on your setup.
https://www.weave.works/oss/scope/

# Exploring API Specs and Test Reports
Run `npm start` to start the application. It hosts OpenAPI specs for all microservices
using swagger. Test reports are generated at `public/report.html`. Test report for last run is also accessible at http://localhost:4004/report.html

# Source Code
Full source code for microservice demo example is available at https://github.com/microservices-demo

# Application Architecture
TODO: Add diagram and write basic information about architecture of microservices demo

# Tested Flows
TODO: Add diagrams for all the tested flows with name

# Advantages of our approach
The techniques used to test Microservices API can be broadly classified as Black Box Testing. Knowledge on how the internal code operates is not necessary, we are only using tools to interact with the APIs that have been exposed to us by the service. Black Box Testing is ideal in circumstances where the source code is unavailable for viewing and/or is proprietary in nature, thus having a strict need-to-know hierarchy. Often legacy codebases and monolithic codebases are enormously complex, and can comprise patented/protected technology. The testing methods thus employed in this case are ideal for preserving security from IP theft and prevent changes in the codebase that can hinder its operation. Other than that, for the testing techniques used, no prerequisite knowledge about the code is required. Therefore anyone aware of how the basic testing tools applied herein will be able to quickly setup an environment and test the service with very little overhead. It is thus easier for a Tester to transition from one codebase to another with minimal difficulty. Newman is being used to automate the testing process, this enables us to fit the whole gamut of testing scenarios into a robust automated pipeline that does not require manual oversight all the time. Newman also generates a highly descriptive output of the test cases that pass or fail and other details that may be relevant to troubleshooting when some kind of error appears. Techniques like constructing the dataflow graphs for the service, testing logic coverage criteria and whether control flow graphs are traversed for the codebase will be exponentially more time consuming and often result in approximately similar degree of improvement which can be achieved in significantly less time. Overall, it is a fairly robust testing methodology that can be used to reduce friction between development and testing teams, decreasing the reliance on in-depth knowledge of the codebase for testing different cases on it.

# Disadvantages of our approach
Since Black Box Testing methods have been employed, no prerequisite knowledge of the code itself has been utilized. This can lead to internal errors going unchecked. Primarily, unused variables, faulty logic and memory allocation errors will not be caught by these techniques. There may be cases where there are dangling pointers or unused variables that are not at all used and affect the overall performance of the service. In many cases these internal errors that cannot be detected by Black Box Testing may be catastrophic in nature. To ensure a more thorough testing process, more rigorous auditing and White Box Testing methods can be employed. They may lead to a more rigorous testing phase. Black Box Testing methods are ideal after Unit Testing has been performed rigorously.

# Why we went with this approach?
TODO: Add concrete reasons why we picked this approach over others

# Contributors
TODO: Add mail/contact info

# Test Scenarios
1. Existing Users can place an order successfully.
2. User Login fails for non-existent user, New user can register and login.
3. Payment is declined when order value is above 100$ and order isn't placed.
4. Order cannot be placed when shipping address or card information is missing.
5. Order cannot be placed with empty cart.
