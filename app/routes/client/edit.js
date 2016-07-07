import Ember from 'ember';

export default Ember.Route.extend({
	// beforeModel(){
		// return this.get( 'session' ).fetch().catch( function(){} );
	// },

	model( params ){
		return this.store.find( 'client', params.id );
	},

	init(){
		console.log( 'ClientsClientEditRoute' );
	}
});