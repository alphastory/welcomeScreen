import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service( 'session' ),
	
	actions: {
		// Handle the sign in.
		signIn(){
			let subEmail = this.get( 'submittedEmail' );
			let subPass = this.get( 'submittedPassword' );

			this.get( 'session' ).open( 'firebase', {
				provider: 'password',
				email: subEmail,
				password: subPass
			}).then( () => {
				
				this.transitionToRoute( 'clients' );

			}, ( error ) => {
				
				if( error.code ){
					console.error( error.code );
				} else {
					console.error( error );
				}

			});
		}
	},

	init(){
		// if( this.get( 'session' ).get( 'isAuthenticated' ) ){
		// 	this.transitionToRoute( 'clients' );
		// }
	}
});
