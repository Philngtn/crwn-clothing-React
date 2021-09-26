import React from 'react';
import './directory.style.scss';

import { connect } from 'react-redux';

import { selectDirectorySections } from '../../redux/directory/directory.selector';

import { createStructuredSelector } from 'reselect';

import MenuItem from '../menu-item/menu-item.component'

const Directory = ({ sections }) => (

  <div className='directory-menu'>
    {/* Using the otherSectionProps to save space  */}
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
)

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);