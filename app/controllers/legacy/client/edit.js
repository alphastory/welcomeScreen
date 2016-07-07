import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service( 'session' ),
	
	actions: {
		saveUpdates(){
			// Get the necessary details
			let client = this.get( 'model' );
			let details = {
				name: client.get( 'name' ),
				image: client.get( 'image' )
			};

			// Update the model and save it.
			client.set( 'name', details.name );
			client.set( 'image', details.image );
			client.save();

			// Go to the clients route.
			this.transitionToRoute( 'clients' );
		},

		// Handle the sign out
		signOut(){
			this.get( 'session' ).close();
			this.transitionToRoute( 'index' );
		}
	},

	init(){
		if( !this.get( 'session' ).get( 'isAuthenticated' ) ){
			this.transitionToRoute( 'index' );
		}
	}
});
