import Ember from 'ember';

export default Ember.Controller.extend({
	// ==================================================
	// Controller Properties
	// ==================================================
	sortProps: ['isActive:desc'],
	sorted: Ember.computed.sort( 'filtered', 'sortProps' ),
	session: Ember.inject.service( 'session' ),
	firebaseApp: Ember.inject.service(),
	usersName: '',
	// usersNameObserver: Ember.observer( 'theUser', 'theUser.displayName', function(){
	// 	this.set( 'usersName', theUser.displayName );
	// }),

	// ==================================================
	// Controller Actions
	// ==================================================
	actions: {
		// Deactivate all active clients. This limits us to just 1 active client.
		deactivateAll(){
			let model = this.get( 'model' );
			model.forEach( function( client ){
				if( client.get( 'isActive' ) === true ){
					client.set( 'isActive', false );
					client.save();
				}
			} );
		}
	},
	
	// ==================================================
	// Controller Methods
	// ==================================================
	filtered: [],
	filteredList: Ember.observer( 'filter', 'model.@each', 'model.@each.isActive', function(){
		let filter = this.get( 'filter' );
		let model = this.get( 'model' );

		if( filter ){
			if( model ){
				Ember.set( this, 'filtered', model.filter( function( client ){
					var clientName = client.get( 'name' ).toLowerCase();
					return ( ( clientName.indexOf( filter.toLowerCase() ) !== -1 ) && ( client.get( 'isActive' ) !== true ) );
				} ) );
			}
		} else {
			if( model ){
				Ember.set( this, 'filtered', model.filter( function( client ){
					return client;
				} ) );
			}
		}
	} ),

	activated: [],
	activeList: Ember.observer( 'model.@each', 'model.@each.isActive', function(){
		let model = this.get( 'model' );
		if( model ){
			Ember.set( this, 'activated', model.filter( function( client ){
				return client.get( 'isActive' ) === true;
			} ) );
		}
	} ),

	init(){
		if( !this.get( 'session' ).get( 'isAuthenticated' ) ){
			this.transitionToRoute( 'index' );
		}

		let user = this.get( 'firebaseApp' ).auth().currentUser;
		if( user.displayName !== null ){
			this.set( 'usersName', user.displayName );
		} else {
			this.set( 'usersName', 'Dweller' );
		}
	}
});