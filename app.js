const express = require("express");
const jwt = require("jsonwebtoken");
const clave = "sape";

const moviesRouter = require("./routes/moviesRoute");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>El servidor te saluda</h1>");
});

app.post("/login", (req, res)=>{
    const {username, password} = req.body;
    if(username ==="admin" && password ==="admin"){
        const token = jwt.sign({username}, clave);
        res.status(200).json({token});
    }
    else{
        res.status(401).json({message: "Usuario y/o contraseña incorrectos"});
    }
});

app.use("/pelist", (req, res, next)=>{
    try{
        const decoded = jwt.verify(req.headers["access-token"], clave);
        console.log(decoded);
        next();
    } 
    catch(err){
        res.status(401).json({message: "Usuario no autorizado"});
    }
});

app.use("/pelist", moviesRouter);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});  