import Ember from 'ember';

export default Ember.Controller.extend({
	firebaseApp: Ember.inject.service(),
	actions: {
		createUser(){
			let fbApp = this.get( 'firebaseApp' );
			let userEmail = this.get( 'useremail' );
			let userPass = this.get( 'userpass' );

			fbApp.auth().createUserWithEmailAndPassword( userEmail, userPass ).catch( function( error ){
				console.log( 'Something went wrong', error );
			} );

			this.transitionToRoute( 'clients' );
		}
	}
});
