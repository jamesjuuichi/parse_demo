import Parse from 'parse'
import constants from '@/constants'

Parse.initialize(constants.PARSE_ID)

Parse.serverURL = `http://localhost:${constants.PARSE_PORT}${
  constants.PARSE_END_POINT
}`

window.fbAsyncInit = () => {
  Parse.FacebookUtils.init({
    appId: constants.FACEBOOK_APP_ID,
    status: true,
    cookie: true,
    xfbml: true,
    version: 'v3.1',
  })
}

/* eslint-disable */
(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = '//connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
