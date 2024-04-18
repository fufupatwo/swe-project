const RegisterForm = () =>  {

  const nav = useNavigate();

  const [formData, setFormData] = useState({
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      passwordConfirm:'',
  });

  // handle input
  const handleInput = (e) => {
      const {name, value} = e.target;
      setFormData({
          ...formData,
          [name]: value,
      });
  };

      // handle submission
      const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:4000/register", {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                password: formData.password,
                passwordConfirm: formData.passwordConfirm,
            });
            nav('/dashboard')
            console.log(response.data);
        } catch(error){
            nav('/dashboard')
            console.log('Error', error);
        }

       console.log(formData)


        setFormData({
            firstname:'',
            lastname:'',
            email:'',
            password:'',
            passwordConfirm:'',
        });
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstname" value={formData.firstname} onChange={handleInput} placeholder="First Name" />
                <input type="text" name="lastname" value={formData.lastname} onChange={handleInput} placeholder="Last Name" />
                <input type="email" name="email" value={formData.email} onChange={handleInput} placeholder="Email" />
                <input type="password" name="password" value={formData.password} onChange={handleInput} placeholder="Password" />
                <input type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleInput} placeholder="Confirm Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
  }