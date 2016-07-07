import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service( 'session' ),
	beforeModel(){
		if( !this.get( 'session' ).get( 'isAuthenticated' ) ){
			this.transitionTo( 'index' );
		}
		return this.get( 'session' ).fetch().catch( function(){} );
	},

	model( params ){
		return this.store.query( 'client', params.id );
	},

	serialize( client ){
		return { client_id: client.id };
	},

	init(){
		console.log( 'ClientsEditRoute' );
	}
});
