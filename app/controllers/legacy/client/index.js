import Ember from 'ember';

export default Ember.Controller.extend({
	// ================================================================
	// Allow us access to the methods of the clients/index controller.
	// ================================================================
	allClientsController: Ember.inject.controller( 'clients/index' ),
	session: Ember.inject.service( 'session' ),

	actions: {
		// =========================================
		// Set the specified client as active.
		// =========================================
		setActive(){
			// Tell the clients/index controller to deactive everything
			this.get( 'allClientsController' ).send( 'deactivateAll' );

			// Activate this one.
			this.get( 'model' ).set( 'isActive', true );
			this.get( 'model' ).save();
		},
		// =========================================
		// Set the specified client as inactive.
		// =========================================
		setInactive(){
			this.get( 'model' ).set( 'isActive', false );
			this.get( 'model' ).save();
		},

		// =========================================
		// Delete the client from the database.
		// =========================================
		deleteClient(){
			this.get( 'model' ).deleteRecord();
			this.get( 'model' ).save();
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
