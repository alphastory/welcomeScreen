import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel(){
		// if( !this.get( 'session' ).get( 'isAuthenticated' ) ){
		// 	this.transitionTo( 'index' );
		// }
		return this.get( 'session' ).fetch().catch( function(){} );
	}
});
