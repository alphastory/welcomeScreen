import Ember from 'ember';
import TweenLite from 'tweenlite';
import Back from 'tweenlite';
import config from '../../config/environment';

export default Ember.Route.extend({
	session: Ember.inject.service( 'session' ),

	beforeModel(){
		// if( !this.get( 'session' ).get( 'isAuthenticated' ) ){
		// 	this.transitionTo( 'index' );
		// }
		return this.get( 'session' ).fetch().catch( function(){} );
	},

	model(){
		if( this.get( 'session' ).get( 'isAuthenticated' ) ){
			return this.store.findAll( 'client' );
		}
	},

	actions: {
		// ==================================================
		// Show the New Client form
		// ==================================================
		showAddClientForm(){
			let newClientWindow = document.getElementById( 'newClient' );
			let overlay = document.getElementById( 'new-overlay' );

			newClientWindow.style.display = 'block';
			overlay.style.display = 'block';

			TweenLite.to( overlay, 0.3, { opacity: 0.7 } );
			TweenLite.to( newClientWindow, 0.7, { opacity: 1, marginTop: '0px', ease: Back.easeOut } );
		},

		// =======================================================
		// Hide the New Client Form
		// =======================================================
		hideAddClientForm(){
			var newClientWindow = document.getElementById( 'newClient' );
			var overlay = document.getElementById( 'new-overlay' );

			document.getElementById( 'client-name' ).value = '';
			document.getElementById( 'client-image' ).value = '';

			newClientWindow.style.display = 'block';
			overlay.style.display = 'block';

			TweenLite.to( overlay, 0.3, { delay: 0.2, opacity: 0, onComplete: function(){
				overlay.style.display = 'none';
			} } );
			TweenLite.to( newClientWindow, 0.7, { opacity: 0, marginTop: '-20px', ease: Back.easeIn, onComplete: function(){
				newClientWindow.style.display = 'none';
			} } );
		},

		// =======================================================
		// When a user clicks the delete button, request that they
		// confirm the deletion. This function simply shows the
		// remove client modal.
		// =======================================================
		confirmRemoveClient(client_id){
			// Get the appropriate elements
			let overlay = document.getElementById( `remove-overlay-${client_id}` );
			let modal = document.getElementById( `remove-confirm-${client_id}` );
			// Make them visible
			overlay.style.display = 'block';
			modal.style.display = 'block';
			// Animate them in
			TweenLite.to( overlay, 0.3, { opacity: 0.9 } );
			TweenLite.to( modal, 0.7, { opacity: 1, marginTop: '0px', ease: Back.easeOut } );
		},

		// =======================================================
		// When the user cancels the remove option.
		// =======================================================
		cancelRemove(client_id){
			// Get the appropriate elements
			let overlay = document.getElementById( `remove-overlay-${client_id}` );
			let modal = document.getElementById( `remove-confirm-${client_id}` );
			
			// Animate the elements out, then hide them.
			TweenLite.to( overlay, 0.3, { delay: 0.5, opacity: 0, onComplete:function(){
				overlay.style.display = 'none';
			} } );
			
			TweenLite.to( modal, 0.7, { opacity: 0, marginTop: '-20px', ease: Back.easeIn, onComplete: function(){
				modal.style.display = 'none';
			} } );
		},

		// Handle the sign out
		signOut(){
			this.get( 'session' ).close();
			window.location = config.baseURL;
		}
	},

	renderTemplate(){
		// Render the Clients template to the default outlet.
		this.render( 'clients/index' );
	},

	serialize( client ){
		client.set( 'image', decodeURIComponent( client.image ) );
	}
});
