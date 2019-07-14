var express = require('express')
var hbs = require('hbs')
var app = express() 
var fs = require('fs')
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs')


hbs.registerHelper('currentYear',()=>
{
    return new Date().getFullYear()  
})

app.use((req,res,next)=>{

    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.path}`;
  
    fs.appendFileSync('server.log',log+'\n')
    console.log(log)
    next();

})

// app.use((req,res,next)=>{

//    res.render('maintainance.hbs')
//     

// })


app.use(express.static(__dirname +'/public'))

app.get("/",(req,res)=>
{

    // res.send({
    //     name:'Pranav',
    //     likes:['music','games']

    // })

    res.render('home.hbs',{

        title: 'welcome to my web',
        

    })

})


app.get("/about",(req,res)=>
{

    //res.send("Its About Page")
    res.render('about.hbs',{
        title:'About Page passed dynamic',
        
    })

})


app.get("/error",(req,res)=>
{

    res.send({
        error:"Unable to Load page.."
    })

})

app.listen(port,()=>{
    console.log("server is up & running on ..",`${port}`)
});