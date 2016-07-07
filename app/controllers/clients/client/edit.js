import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service( 'session' ),
	firebaseApp: Ember.inject.service(),
	
	actions: {
		saveUpdates(){
			// Get the necessary details
			let client = this.get( 'model' );
			let name = client.get( 'name' );
			let image = document.getElementById( 'client-image' );
			let storeName = name.replace( / /g, '' );

			if( image.files.length > 0 ){

				const storageRef = this.get( 'firebaseApp' ).storage().ref();

				let file = image.files[0];
				let metadata = {
					'contentType' : file.type
				};

				let uploadTask = storageRef.child( `uploads/${storeName}/${file.name}` ).put( file, metadata );

				uploadTask.on( 'state_changed', null, (error) => {
					console.error( 'Upload Failed:', error );
				}, () => {
					let uploadUrl = uploadTask.snapshot.metadata.downloadURLs[0];
					
					client.set( 'name', name );
					client.set( 'image', uploadUrl );
					client.save();
				} );

			} else {

				// Update the model and save it.
				client.set( 'name', name );
				client.save();

			}

			// Go to the clients route.
			this.transitionToRoute( 'clients' );
		},
		
		updateFileText(){
			let file = document.getElementById( 'client-image' );
			if( file.files && file.files[0] ){
				console.log( 'Updating File Text' );
				let reader = new FileReader();
				reader.onload = (e) => {
					document.getElementById( 'previewImage' ).src = e.target.result;
				};

				reader.readAsDataURL( file.files[0] );

				let fileName = file.files[0].name;
				console.log( file.files[0] );
				document.getElementById( 'fileName' ).innerHTML = fileName;
			} else {
				document.getElementById( 'previewImage' ).src = 'images/wtbLogo.png';
				document.getElementById( 'fileName' ).innerHTML = 'File Name';
			}
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
