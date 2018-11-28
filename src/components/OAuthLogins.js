import React from 'react'
import { connect } from 'react-redux'

const oauthLogin = () => {
  return (
    <form method='get' action='/api/google'>
      <button type='submit'>Login with Google</button>
    </form>
  )
};

export default connect(null, null)(oauthLogin)
