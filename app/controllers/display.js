import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service( 'session' ),
	activated: [],
	activeList: Ember.observer( 'model.@each', 'model.@each.isActive', function(){
		let model = this.get( 'model' );
		if( model ){
			Ember.set( this, 'activated', model.filter( function( client ){
				return client.get( 'isActive' ) === true;
			} ) );
		}
	} ),
});
