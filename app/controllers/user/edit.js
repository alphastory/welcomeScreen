import Ember from 'ember';

export default Ember.Controller.extend({
	firebaseApp: Ember.inject.service(),
	session: Ember.inject.service(),
	current: '',
	displayName: '',
	userEmail: '',
	
	actions: {
		updateUser(){
			let user = this.get( 'current' );
			// let newPass = this.get( 'newPass' );
			// let confPass = this.get( 'confPass' );
			
			// let valid = true;

			user.updateProfile({
				displayName: this.get( 'displayName' ),
				email: this.get( 'userEmail' )
			});

			this.transitionToRoute( 'clients' );
		}
	},

	init(){
		this.set( 'current', this.get( 'firebaseApp' ).auth().currentUser );
		
		let current = this.get( 'current' );
		this.set( 'displayName', current.displayName );
		this.set( 'userEmail', current.email );
	}
});
