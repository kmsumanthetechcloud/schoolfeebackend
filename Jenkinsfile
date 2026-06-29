pipeline {
	agent any 
	stages {
		stage ('checkout') {
			steps {
				echo 'code checkout successful'
				}
			}
			stage{'workspace'){
				steps {
				sh 'pwd'
				sh 'ls -la'
				}
			}
			
		}
	}
