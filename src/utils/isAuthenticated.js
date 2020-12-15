import Cookie from 'js-cookie';

export default function IsAuthenticated() {
  if(Cookie.get('token')) return true;
  else return false;
}