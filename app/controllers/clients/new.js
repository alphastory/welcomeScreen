import Ember from 'ember';

export default Ember.Controller.extend({
	firebaseApp: Ember.inject.service(),
	actions: {
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

		createClient(){
			// let name = this.get( 'clientName' );
			let name = document.getElementById( 'client-name' ).value;
			let image = document.getElementById( 'client-image' );
			let storeName = name.replace( / /g, '' );

			const storageRef = this.get( 'firebaseApp' ).storage().ref();

			let file = image.files[0];
			let metadata = {
				'contentType' : file.type
			};

			let uploadTask = storageRef.child( `uploads/${storeName}/${file.name}` ).put( file, metadata );

			uploadTask.on( 'state_changed', null, ( error ) => {

				console.error( 'Upload Failed:', error );

			}, () => {
				// Where can we find it?
				let uploadUrl = uploadTask.snapshot.metadata.downloadURLs[0];

				// Create the client.
				let client = this.store.createRecord( 'client', {
					name: name,
					image: uploadUrl,
					isActive: false,
					timestamp: new Date().getTime()
				} );
				client.save();

			} );
			// Tell the route to hide the client form.
			this.transitionToRoute( 'clients.index' );
		}
	}
});
