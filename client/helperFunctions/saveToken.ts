function saveToken(token:string):void {
  localStorage.setItem('token', token);
}

export default saveToken;