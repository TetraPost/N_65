const elForm = document.forms['loginForm'];

elForm.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  console.log(formData);
  const { data } = await axios.post('auth/local', formData);

})