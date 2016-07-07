import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  name: attr( 'string' ),
  image: attr( 'string' ),
  isActive: attr( 'boolean' )
});
