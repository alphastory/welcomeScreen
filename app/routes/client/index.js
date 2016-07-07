import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel(){
		return this.get( 'session' ).fetch().catch( function(){} );
	},
	
	model( params ){
		return this.store.query( 'client', params.id );
	},

	serialize( client ){
		return { client_id: client.id };
	}
});
