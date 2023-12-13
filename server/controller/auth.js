import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import User from '../model/user.js';
import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'musthafa.id78@gmail.com',
    pass: '',
  },
});

export const  register=async(req,res)=>{
    
    try{
        const{
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation

        }=req.body;

        
       const salt=await bcrypt.genSalt();
       const passwordHash=await bcrypt.hash(password,salt);
       
       const newUser=new User({
        firstName,
        lastName,
        email,
        password:passwordHash,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile:Math.floor(Math.random()*1000),
        impression:Math.floor(Math.random()*10000)
       })
       const savedUser=await newUser.save();
       sendWelcomeEmail(email);
       res.status(201).json(savedUser);
    }catch (err){
  res.status(500).json({error:err.message})
    }
}


export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist  " });
  
    
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
   
      delete user.password;
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  function sendWelcomeEmail(to) {
    const mailOptions = {
      from: 'musthafa.id78@gmail.com',
      to,
      subject: 'Welcome to YourApp!',
      text: 'Thank you for registering with YourApp. We are excited to have you on board!',
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Welcome email sent: ' + info.response);
      }
    });
  }
  