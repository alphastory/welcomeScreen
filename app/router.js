import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route( 'index', { path: '/' } );
  this.route( 'clients', { path: '/clients' }, function() {
      this.route('new', { path: '/new' } );
      this.route('client', { path: '/:client_id' }, function() {
          this.route('edit', { path: '/edit' } );
      } );
  } );
  this.route('display');

  this.route('users', function() {
    this.route('new');
  });

  this.route('user', function() {
    this.route('edit');
  });
} );

export default Router;
