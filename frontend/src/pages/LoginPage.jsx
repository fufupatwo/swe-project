
const setFormData = (event) => {
  const { name, value } = event.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};
const handleSubmit = (event) => {
  event.preventDefault();
  // Process form data
  console.log(formData);
  // Reset form after submission
  setFormData({
    email: '',
    password: ''
  });
};
export default function Example() {
  return (
    <div className="flex min-h-full items-center justify-center px-6 py-12 lg:px-8">
      <div className="w-96 p-6 shadow-lg bg-orange-500 rounded-md">
        <div className="sm:w-full">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 text-gray-900">
            Sign in
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-50">Email</label>
            <input onChange={setFormData} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-50">Password</label>
            <input onChange={setFormData} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>

          <div className="mt-6">
            <button type="submit" className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href="/CreateAccount" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Create Account</a>
        </p>
      </div>
    </div>
  );
}
