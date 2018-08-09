pipeline {
  agent any
  environment
  { 
      REPOSITORY='nexus.teamdigitale.test/data-portal'
  }
  stages {
    stage('Build') {
      steps { 
        script {          
        sh 'COMMIT_ID=$(echo ${GIT_COMMIT} | cut -c 1-6); docker build . -f Dockerfile/test/Dockerfile --no-cache -t $REPOSITORY:$BUILD_NUMBER-$COMMIT_ID' 
        }
      }
    }
    stage('Test') {
      steps { //sh' != sh'' only one sh command  
      script {         
        sh '''
	COMMIT_ID=$(echo ${GIT_COMMIT} | cut -c 1-6); 
        CONTAINERID=$(docker run -d $REPOSITORY:$BUILD_NUMBER-$COMMIT_ID);
        sleep 5s;
        docker stop ${CONTAINERID}; 
        docker rm ${CONTAINERID}
	''' 
      }
    }
    }
    stage('Upload'){
      steps {
        script { 
          if(env.BRANCH_NAME == 'citest'  || env.BRANCH_NAME=='newSecurity'){ 
            sh 'COMMIT_ID=$(echo ${GIT_COMMIT} | cut -c 1-6); docker push $REPOSITORY:$BUILD_NUMBER-$COMMIT_ID' 
            sh 'COMMIT_ID=$(echo ${GIT_COMMIT} | cut -c 1-6); docker rmi $REPOSITORY:$BUILD_NUMBER-$COMMIT_ID'  
          }       
        }
      }
    }
   stage('Staging') {
      steps { 
        script {
          if(env.BRANCH_NAME=='citest' || env.BRANCH_NAME=='newSecurity'){
          sh ''' COMMIT_ID=$(echo ${GIT_COMMIT}|cut -c 1-6); cd kubernetes/test;
              sed "s#image: nexus.teamdigitale.test/data-.*#image: nexus.teamdigitale.test/data-portal:$BUILD_NUMBER-$COMMIT_ID#" daf_data-portal.yml > daf-dataportal1.yaml ;kubectl apply -f daf-dataportal1.yaml --validate=false '''             
          }
        }
      }
    }  
  }
}